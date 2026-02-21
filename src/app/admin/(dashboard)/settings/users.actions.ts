'use server'

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import { UserRole } from "@/types"

/**
 * Ensures the caller is authenticated AND has 'super_admin' role.
 * Throws if unauthorized.
 */
async function enforceSuperAdmin() {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        throw new Error("Unauthorized")
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profileError || !profile || profile.role !== 'super_admin') {
        throw new Error("Permission Denied: Super Admin access required.")
    }

    return { user, supabase }
}

export async function createAdminUser(formData: FormData) {
    try {
        await enforceSuperAdmin()

        const fullName = formData.get("full_name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const role = formData.get("role") as UserRole
        const isActive = formData.get("is_active") === "true"

        if (!email || !password || !role || !fullName) {
            return { error: "Missing required fields." }
        }

        // 1. Initialize Admin Auth Client
        const adminAuthClient = createAdminClient()

        // 2. Create User in Supabase Auth (Identity)
        const { data: authData, error: createError } = await adminAuthClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm for admin-created accounts
            user_metadata: {
                full_name: fullName
            }
        })

        if (createError) {
            return { error: createError.message }
        }

        if (!authData.user) {
            return { error: "Failed to create user." }
        }

        // 3. Upsert Profile Data (Bypass RLS using admin client to set strict fields)
        const { error: profileError } = await adminAuthClient
            .from('profiles')
            .upsert({
                id: authData.user.id,
                email: email,
                full_name: fullName,
                role: role,
                is_active: isActive
            })

        if (profileError) {
            // Rollback auth user creation if profile fails
            await adminAuthClient.auth.admin.deleteUser(authData.user.id)
            return { error: `Profile creation failed: ${profileError.message}` }
        }

        revalidatePath('/admin/settings')
        return { success: true }

    } catch (e: any) {
        return { error: e.message || "An unexpected error occurred." }
    }
}

export async function updateUserStatus(userId: string, isActive: boolean) {
    try {
        await enforceSuperAdmin()

        const adminAuthClient = createAdminClient()

        // 1. Update Profile is_active flag
        const { error: profileError } = await adminAuthClient
            .from('profiles')
            .update({ is_active: isActive })
            .eq('id', userId)

        if (profileError) {
            return { error: profileError.message }
        }

        // 2. Ban/Unban user in Supabase Auth to actually prevent login
        // A large ban duration effectively disables the account.
        const banDuration = isActive ? "0h" : "876000h" // 100 years if inactive
        const { error: authError } = await adminAuthClient.auth.admin.updateUserById(
            userId,
            { ban_duration: banDuration }
        )

        if (authError) {
            return { error: `Failed to update auth status: ${authError.message}` }
        }

        revalidatePath('/admin/settings')
        return { success: true }

    } catch (e: any) {
        return { error: e.message || "An unexpected error occurred." }
    }
}

export async function updateUserRole(userId: string, newRole: UserRole) {
    try {
        await enforceSuperAdmin()
        const adminAuthClient = createAdminClient()

        const { error } = await adminAuthClient
            .from('profiles')
            .update({ role: newRole })
            .eq('id', userId)

        if (error) {
            return { error: error.message }
        }

        revalidatePath('/admin/settings')
        return { success: true }
    } catch (e: any) {
        return { error: e.message || "An unexpected error occurred." }
    }
}

export async function deleteAdminUser(userId: string) {
    try {
        const { user } = await enforceSuperAdmin()

        if (user.id === userId) {
            return { error: "You cannot delete your own account." }
        }

        const adminAuthClient = createAdminClient()

        // 1. Delete from Supabase Auth
        // Because profiles.id REFERENCES auth.users(id) ON DELETE CASCADE,
        // this will automatically delete the corresponding profile row.
        const { error } = await adminAuthClient.auth.admin.deleteUser(userId)

        if (error) {
            return { error: error.message }
        }

        revalidatePath('/admin/settings')
        return { success: true }
    } catch (e: any) {
        return { error: e.message || "An unexpected error occurred." }
    }
}

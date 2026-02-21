import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserRole } from "@/types"
import { Permission, hasPermission } from "@/lib/auth-utils"

// Re-export for server components that already import from here
export * from "@/lib/auth-utils"

/**
 * Retrieves the current connected user role asynchronously by actively querying the Supabase profile table.
 * Used for backend Route Handlers and Server Action validation.
 */
export async function getCurrentUserRole(): Promise<UserRole | null> {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    return profile?.role as UserRole | null
}

/**
 * High order middleware-like checker for Server Actions and Page Components.
 * Redirects unauthorized users directly back to the login page if they fail the rank check.
 */
export async function requireRole(allowedRoles: UserRole[]) {
    const role = await getCurrentUserRole()

    if (!role || !allowedRoles.includes(role)) {
        redirect('/admin/login')
    }

    return role
}

/**
 * High order permission checker for Server Actions. 
 * Asserts standard Permissions instead of raw Roles. Returns a boolean payload to handle graceful failures rather than hard redirects.
 */
export async function assertServerPermission(permission: Permission): Promise<{ success: boolean; error?: string; role?: UserRole }> {
    const role = await getCurrentUserRole()

    if (!role) {
        return { success: false, error: 'Unauthorized: No active session.' }
    }

    if (!hasPermission(role, permission)) {
        return { success: false, error: 'Forbidden: You do not possess the required RBAC privileges for this action.', role }
    }

    return { success: true, role }
}

export async function requireSuperAdmin() {
    return requireRole(['super_admin'])
}

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export type UserRole = 'super_admin' | 'editor' | 'content_manager';

export async function getCurrentUserRole() {
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

export async function requireRole(allowedRoles: UserRole[]) {
    const role = await getCurrentUserRole()

    if (!role || !allowedRoles.includes(role)) {
        redirect('/admin/login') // Or a dedicated /unauthorized page
    }

    return role
}

export async function requireSuperAdmin() {
    return requireRole(['super_admin'])
}

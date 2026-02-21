import { UserRole } from "@/types"

// Formal Permission Typings
export type Permission =
    | 'manage_users'        // Super Admin only
    | 'manage_settings'     // Super Admin only
    | 'manage_departments'  // Super Admin, Admin
    | 'manage_treatments'   // Super Admin, Admin
    | 'manage_blogs'        // Super Admin, Admin (Editor handles their own, but this flag allows managing ALL)
    | 'manage_videos'       // Super Admin, Admin
    | 'create_blog'         // Super Admin, Admin, Editor
    | 'edit_blog'           // Super Admin, Admin, Editor (Own)
    | 'create_video'        // Super Admin, Admin, Editor
    | 'edit_video'          // Super Admin, Admin, Editor (Own)
    | 'edit_seo'            // Super Admin, SEO Manager
    | '*'                   // Super Admin wildcard

// Formal System Role Definitions and Capabilities
export const SYSTEM_PERMISSIONS: Record<UserRole, Permission[]> = {
    super_admin: ['*'],
    admin: [
        'manage_departments',
        'manage_treatments',
        'manage_blogs',
        'manage_videos',
        'create_blog',
        'edit_blog',
        'create_video',
        'edit_video'
    ],
    editor: [
        'manage_blogs',
        'manage_videos',
        'create_blog',
        'edit_blog',
        'create_video',
        'edit_video'
    ],
    seo_manager: [
        'edit_seo'
    ]
}

/**
 * Universal synchronous permission checker for UI/Client layouts or pre-fetched user contexts
 */
export function hasPermission(role: UserRole | null | undefined, permission: Permission): boolean {
    if (!role) return false;

    const rolePermissions = SYSTEM_PERMISSIONS[role];
    if (!rolePermissions) return false;

    // Super Admin gets universal bypass via wildcard '*'
    if (rolePermissions.includes('*')) return true;

    return rolePermissions.includes(permission);
}

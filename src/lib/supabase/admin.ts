import { createClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase client with the SERVICE_ROLE key.
 * 
 * WARNING: This client bypasses Row Level Security (RLS).
 * It must ONLY be used in secure Server Actions or Route Handlers
 * after explicit Role-Based Access Control (RBAC) checks!
 */
export function createAdminClient() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
    }

    // We intentionally check for the private server-side ONLY key here.
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY. Cannot perform admin operations.")
    }

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )
}

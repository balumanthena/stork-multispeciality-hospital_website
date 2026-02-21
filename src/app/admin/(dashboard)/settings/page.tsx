import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SettingsForm from "@/components/admin/settings-form"
import { AlertCircle } from "lucide-react"
import { hasPermission } from "@/lib/auth-helpers"
import { UserRole } from "@/types"

// Force dynamic to ensure we always fetch fresh data
export const dynamic = "force-dynamic"

export default async function SettingsPage() {
    const supabase = await createClient()

    // 1. Verify User & Role
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect("/admin/login")
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    // 2. RBAC Guard: Centralized Check
    if (!hasPermission(profile?.role as UserRole, 'manage_settings')) {
        return (
            <div className="h-[50vh] flex flex-col items-center justify-center text-center p-8">
                <div className="bg-red-50 p-4 rounded-full mb-4">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Access Denied</h2>
                <p className="text-slate-500 mt-2 max-w-md">
                    You do not have permission to access global settings. Please contact a Super Admin.
                </p>
                <div className="mt-6 text-sm bg-slate-100 px-4 py-2 rounded-md font-mono text-slate-600">
                    Current Role: {profile?.role || "Unknown"}
                </div>
            </div>
        )
    }

    // 3. Fetch Settings
    let settings: any = null;
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .limit(1)
            .single()

        if (error) {
            console.error("Error fetching site_settings:", error)
            // Don't throw yet, try to recover or show error
        } else {
            settings = data
        }
    } catch (err) {
        console.error("Unexpected error fetching settings:", err)
    }

    // 4. Auto-Seed if empty (fail-safe)
    if (!settings) {
        console.log("No settings found, attempting to seed default...")
        try {
            const { data: newSettings, error } = await supabase
                .from('site_settings')
                .insert({}) // Relies on default values in DB
                .select()
                .single()

            if (error) {
                console.error("Error seeding settings:", error)
                return <div className="p-4 text-red-500">Error creating default settings. Check console logs.</div>
            }
            settings = newSettings
        } catch (err) {
            console.error("Unexpected error seeding settings:", err)
            return <div className="p-4 text-red-500">Unexpected error. Check console logs.</div>
        }
    }

    return <SettingsForm initialData={settings} />
}

'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { SiteSettings } from "@/types"

export async function updateSiteSettings(formData: FormData) {
    const supabase = await createClient()

    // Check auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: "Unauthorized" }
    }

    // Check Role (Super Admin only)
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'super_admin') {
        return { error: "Permission Denied: Super Admin access required." }
    }

    const fields = [
        "hospital_name", "tagline", "emergency_number", "whatsapp_number",
        "email", "address", "google_maps_embed", "default_meta_title",
        "default_meta_description", "logo_url", "favicon_url", "og_image",
        "google_analytics_id", "google_tag_manager_id", "facebook_pixel_id",
        "working_hours", "footer_description", "facebook_url", "instagram_url",
        "twitter_url", "linkedin_url", "youtube_url", "whatsapp_url"
    ]

    const rawData: Record<string, string> = {}
    fields.forEach(field => {
        if (formData.has(field)) {
            rawData[field] = formData.get(field) as string
        }
    })

    // Update the single row (we assume there's only one row, or we target by ID if passed)
    // For simplicity, we update the first row found or specific ID if feasible.
    // Given the migration inserts a default row, we can just update WHERE true limit 1 or update by ID if passed.
    // A safer bet is to fetch component passed ID.

    const id = formData.get("id") as string
    if (!id) return { error: "Settings ID missing" }

    const { error } = await supabase
        .from('site_settings')
        .update(rawData)
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/settings')
    revalidatePath('/', 'layout') // Revalidate global layout
    return { success: true }
}

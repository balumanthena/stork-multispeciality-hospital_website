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

    const rawData = {
        hospital_name: formData.get("hospital_name") as string,
        tagline: formData.get("tagline") as string,
        emergency_number: formData.get("emergency_number") as string,
        whatsapp_number: formData.get("whatsapp_number") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        google_maps_embed: formData.get("google_maps_embed") as string,
        default_meta_title: formData.get("default_meta_title") as string,
        default_meta_description: formData.get("default_meta_description") as string,
        logo_url: formData.get("logo_url") as string,
        favicon_url: formData.get("favicon_url") as string,
        og_image: formData.get("og_image") as string,
        google_analytics_id: formData.get("google_analytics_id") as string,
        google_tag_manager_id: formData.get("google_tag_manager_id") as string,
        facebook_pixel_id: formData.get("facebook_pixel_id") as string,
        working_hours: formData.get("working_hours") as string,
        footer_description: formData.get("footer_description") as string,
    }

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

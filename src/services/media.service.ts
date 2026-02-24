import { createClient } from "@/lib/supabase/server"

export interface Video {
    id: string
    title: string
    youtube_url: string
    youtube_embed_url: string | null
    thumbnail_url: string | null
    show_global: boolean
    is_active: boolean
    created_at: string
}

export interface Blog {
    id: string
    slug: string
    title: string
    excerpt: string
    image_url: string
    category: string
    published_at: string
    show_on_main: boolean
    status: string
}

/**
 * MediaService provides strict relational filtering for blogs and videos.
 * It ensures that content only appears on specific pages if explicitly mapped
 * or if marked with a global visibility flag.
 */
export const MediaService = {
    async getVideosForTreatment(treatmentId: string): Promise<Video[]> {
        const supabase = await createClient()

        // Get ONLY specifically mapped videos.
        // Global videos are strictly reserved for the main gallery.
        const { data: mappedVideos } = await supabase
            .from("treatment_videos")
            .select(`
                *,
                video_treatments!inner(treatment_id)
            `)
            .eq("video_treatments.treatment_id", treatmentId)
            .eq("is_active", true)
            .order("created_at", { ascending: false })

        return mappedVideos || []
    },

    async getVideosForDepartment(departmentId: string): Promise<Video[]> {
        const supabase = await createClient()

        // Get ONLY specifically mapped videos.
        // Global videos are strictly reserved for the main gallery.
        const { data: mappedVideos } = await supabase
            .from("treatment_videos")
            .select(`
                *,
                video_departments!inner(department_id)
            `)
            .eq("video_departments.department_id", departmentId)
            .eq("is_active", true)
            .order("created_at", { ascending: false })

        return mappedVideos || []
    },

    /**
     * Fetches blogs for a specific treatment.
     */
    async getBlogsForTreatment(treatmentId: string): Promise<Blog[]> {
        const supabase = await createClient()

        const { data: blogs } = await supabase
            .from("blogs")
            .select(`
                id, slug, title, excerpt, image_url, category, published_at, show_on_main, status,
                blog_treatments!inner(treatment_id)
            `)
            .eq("blog_treatments.treatment_id", treatmentId)
            .eq("status", "Published")
            .order("published_at", { ascending: false })
            .limit(3)

        return blogs || []
    },

    /**
     * Fetches blogs for a specific department.
     */
    async getBlogsForDepartment(departmentId: string): Promise<Blog[]> {
        const supabase = await createClient()

        const { data: blogs } = await supabase
            .from("blogs")
            .select(`
                id, slug, title, excerpt, image_url, category, published_at, show_on_main, status,
                blog_departments!inner(department_id)
            `)
            .eq("blog_departments.department_id", departmentId)
            .eq("status", "Published")
            .order("published_at", { ascending: false })
            .limit(3)

        return blogs || []
    }
}

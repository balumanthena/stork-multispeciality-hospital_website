export interface Department {
    id: string
    created_at: string
    name: string
    slug: string
    description: string | null
    icon: string
    image_url: string | null
    is_active: boolean
    display_order: number
}

export interface BlogPost {
    id: string
    created_at: string
    title: string
    slug: string
    content: string
    excerpt: string | null
    image_url: string | null
    image?: string // Computed/Aliased
    author: string | null
    category: string | null
    published: boolean
    published_at: string | null
    date?: string // Computed/Aliased
    youtube_url?: string | null
    department_id?: string | null
    treatment_id?: string | null
}

export interface Treatment {
    id: string
    created_at: string
    title: string
    slug: string
    description: string | null
    short_description?: string | null
    summary?: string // Computed/Aliased
    content?: string | null
    videoId?: string | null
    meta_title?: string | null
    meta_description?: string | null
    department_id: string | null
    is_active: boolean
}

// Enterprise Modules

export type UserRole = 'super_admin' | 'editor' | 'content_manager';

export interface Profile {
    id: string
    email: string
    full_name: string | null
    role: UserRole
    permissions: Record<string, boolean>
    created_at: string
}

export interface SiteSettings {
    id: string
    hospital_name: string
    tagline: string | null
    logo_url: string | null
    favicon_url: string | null
    emergency_number: string | null
    whatsapp_number: string | null
    email: string | null
    address: string | null
    google_maps_embed: string | null
    default_meta_title: string | null
    default_meta_description: string | null
    og_image: string | null
    google_analytics_id: string | null
    google_tag_manager_id: string | null
    facebook_pixel_id: string | null
    footer_description: string | null
    working_hours: string | null
    created_at: string
}

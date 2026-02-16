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

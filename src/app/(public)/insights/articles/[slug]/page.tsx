import { notFound } from "next/navigation"
import BlogView from "@/components/blog/blog-view"
import { createClient, createStaticClient } from "@/lib/supabase/server"

export const revalidate = 3600 // Cache for 1 hour

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const supabase = createStaticClient()

    const { data: blog } = await supabase
        .from('blogs')
        .select(`
            *,
            author:author_id (
                email
            )
        `)
        .eq('slug', slug)
        .eq('status', 'Published')
        .single()

    if (!blog) {
        return notFound()
    }

    const formattedPost = {
        ...blog,
        id: blog.id,
        created_at: blog.created_at,
        slug: blog.slug,
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt,
        date: new Date(blog.published_at || blog.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }),
        published: blog.status === 'Published',
        published_at: blog.published_at,
        author: blog.author?.email || "Stork Team",
        category: blog.category || "General Health",
        image_url: blog.image_url,
        image: blog.image_url || "/images/blog-default.jpg",
        youtube_url: blog.youtube_url,
        // New Features
        focus_keyword: blog.focus_keyword,
        enable_toc: blog.enable_toc,
        enable_faq: blog.enable_faq,
        faq_data: blog.faq_data,
        enable_sticky_cta: blog.enable_sticky_cta,
        sticky_cta_text: blog.sticky_cta_text,
        sticky_cta_link: blog.sticky_cta_link,
        meta_title: blog.meta_title,
        meta_description: blog.meta_description
    }

    return <BlogView initialData={formattedPost} />
}

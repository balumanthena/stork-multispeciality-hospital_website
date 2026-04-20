import { notFound } from "next/navigation"
import BlogView from "@/components/blog/blog-view"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const supabase = await createClient()

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
        id: blog.id,
        created_at: blog.created_at,
        slug: blog.slug,
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt,
        date: new Date(blog.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }),
        published: true,
        published_at: blog.published_at,
        author: "Dr. Stork Specialist", // Placeholder
        category: blog.category || "General Health",
        image_url: blog.image_url,
        image: blog.image_url || "/images/blog-default.jpg",
        youtube_url: blog.youtube_url // Pass video URL
    }

    return <BlogView initialData={formattedPost} />
}

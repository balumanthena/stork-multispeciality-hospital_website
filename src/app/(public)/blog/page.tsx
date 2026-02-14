import BlogList from "@/components/blog/blog-list"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0 // Opt out of caching to ensure fresh updates

export default async function BlogListingPage() {
    const supabase = await createClient()

    const { data: blogs } = await supabase
        .from('blogs')
        .select(`
            *,
            author:author_id (
                email
            )
        `)
        .eq('status', 'Published')
        .order('published_at', { ascending: false })

    // Map Supabase data to the format expected by BlogList
    // If author join fails or is null, fallback to "Stork Team"
    const formattedBlogs = (blogs || []).map(blog => ({
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt || blog.content.substring(0, 150) + "...",
        date: new Date(blog.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }),
        author: "Dr. Stork Specialist", // Placeholder as profiles might not have name yet
        category: blog.category || "General Health",
        image: blog.image_url || "/images/blog-default.jpg" // Fallback image
    }))

    return <BlogList initialData={formattedBlogs} />
}

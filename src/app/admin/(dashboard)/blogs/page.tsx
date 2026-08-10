import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AdminBlogsTable from "@/components/admin/blogs-table"
import { createClient } from "@/lib/supabase/server"
import { getCurrentUserRole, hasPermission } from "@/lib/auth-helpers"

export const revalidate = 0

export default async function BlogsPage() {
    const supabase = await createClient()
    const role = await getCurrentUserRole()

    const { data: rawBlogs } = await supabase.from('blogs').select('id, title, slug, category, published_at, created_at, status, author_id').order('created_at', { ascending: false })
    
    // Map the database fields to the UI expected fields
    const blogs = (rawBlogs || []).map(b => ({
        ...b,
        date: new Date(b.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    }))

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-800">Blog Posts</h1>
                {hasPermission(role, 'create_blog') && (
                    <Button asChild className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white">
                        <Link href="/admin/blogs/new">
                            <Plus className="h-4 w-4 mr-2" /> New Post
                        </Link>
                    </Button>
                )}
            </div>

            {/* Pass role down for granular UI row logic in the Client Component */}
            <AdminBlogsTable initialData={blogs || []} currentUserRole={role} />
        </div>
    )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AdminBlogsTable from "@/components/admin/blogs-table"
import { supabase } from "@/lib/supabase/client"

export const revalidate = 0

export default async function BlogsPage() {
    const { data: blogs } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">Blog Posts</h1>
                <Link href="/admin/blogs/new">
                    <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white">
                        <Plus className="h-4 w-4 mr-2" /> New Post
                    </Button>
                </Link>
            </div>

            <AdminBlogsTable initialData={blogs || []} />
        </div>
    )
}

import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus, Video, ExternalLink, Trash2, Edit } from "lucide-react"
import { format } from "date-fns"
import { getCurrentUserRole, hasPermission } from "@/lib/auth-helpers"

export const dynamic = 'force-dynamic'

export default async function AdminVideosPage() {
    const supabase = await createClient()
    const role = await getCurrentUserRole()

    // Check global video permission. Editors can implicitly 'create_video', but only admins can hard 'manage_videos'
    const canManageALL = hasPermission(role, 'manage_videos');
    const canCreate = hasPermission(role, 'create_video');

    const { data: videos, error } = await supabase
        .from("treatment_videos")
        .select(`
            id, 
            title, 
            youtube_url, 
            thumbnail_url, 
            is_active, 
            created_at,
            show_global,
            video_departments (
                department_id
            ),
            video_treatments (
                treatment_id
            )
        `)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Supabase Error Details:", JSON.stringify(error, null, 2))
        return (
            <div className="p-8 text-red-600">
                <h3 className="font-bold">Error loading videos</h3>
                <pre className="mt-2 text-xs bg-red-50 p-4 rounded overflow-auto">
                    {JSON.stringify(error, null, 2)}
                </pre>
            </div>
        )
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Video Management</h1>
                    <p className="text-slate-500 mt-1">Manage YouTube videos linked to treatments</p>
                </div>
                {canCreate && (
                    <Link href="/admin/videos/new">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                            <Plus className="w-4 h-4" />
                            Add New Video
                        </Button>
                    </Link>
                )}
            </div>

            {/* Video List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {videos && videos.length > 0 ? (
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">
                            <tr>
                                <th className="px-6 py-4">Video</th>
                                <th className="px-6 py-4">Distribution</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date Added</th>
                                {(canManageALL || canCreate) && <th className="px-6 py-4 text-right">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {videos.map((video) => {
                                const deptCount = video.video_departments?.length || 0
                                const treatCount = video.video_treatments?.length || 0
                                const isGlobal = video.show_global

                                return (
                                    <tr key={video.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-24 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative border border-slate-200">
                                                    {video.thumbnail_url ? (
                                                        <img
                                                            src={video.thumbnail_url}
                                                            alt={video.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-slate-300">
                                                            <Video className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 line-clamp-1 w-48" title={video.title}>
                                                        {video.title}
                                                    </p>
                                                    <a
                                                        href={video.youtube_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                                                    >
                                                        View on YouTube <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                {isGlobal && (
                                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-orange-600 uppercase">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Global Gallery
                                                    </span>
                                                )}
                                                {deptCount > 0 && (
                                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> {deptCount} Department{deptCount > 1 ? 's' : ''}
                                                    </span>
                                                )}
                                                {treatCount > 0 && (
                                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {treatCount} Treatment{treatCount > 1 ? 's' : ''}
                                                    </span>
                                                )}
                                                {!isGlobal && deptCount === 0 && treatCount === 0 && (
                                                    <span className="text-slate-400 italic text-xs">Unassigned</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${video.is_active
                                                ? "bg-green-100 text-green-800"
                                                : "bg-slate-100 text-slate-600"
                                                }`}>
                                                {video.is_active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {format(new Date(video.created_at), "MMM d, yyyy")}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/videos/${video.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600" title="Edit Video">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                {canManageALL && (
                                                    <form action={async () => {
                                                        "use server"
                                                        const supabase = await createClient()
                                                        await supabase.from("treatment_videos").delete().eq("id", video.id)
                                                    }}>
                                                        <button className="text-slate-400 hover:text-red-500 transition-colors p-2" title="Delete Video">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-12 text-center text-slate-500">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Video className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">No videos found</h3>
                        <p>Get started by adding a new YouTube video.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

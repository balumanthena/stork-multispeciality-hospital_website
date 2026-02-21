"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit2, Trash2, Plus, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { UserRole } from "@/types"
import { hasPermission } from "@/lib/auth-utils"

export default function AdminTreatmentsTable({ initialData, currentUserRole }: { initialData: any[], currentUserRole: UserRole | null }) {
    const [treatments, setTreatments] = useState(initialData)
    const [search, setSearch] = useState("")
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter()

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this treatment?")) return

        setDeletingId(id)
        const { error } = await supabase.from("services").delete().eq("id", id)

        if (error) {
            alert("Error deleting treatment: " + error.message)
            setDeletingId(null)
        } else {
            // Optimistic update
            setTreatments(prev => prev.filter(t => t.id !== id))
            setDeletingId(null)
            router.refresh()
        }
    }

    const filteredTreatments = treatments.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.department?.toLowerCase().includes(search.toLowerCase())
    )

    const canManage = hasPermission(currentUserRole, 'manage_treatments');

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Filter Bar */}
            <div className="p-4 border-b border-slate-100 flex gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search treatments..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Summary</th>
                            <th className="px-6 py-4">Video ID</th>
                            <th className="px-6 py-4">Department</th>
                            {canManage && <th className="px-6 py-4 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredTreatments.length === 0 ? (
                            <tr>
                                <td colSpan={canManage ? 5 : 4} className="px-6 py-8 text-center text-slate-500">
                                    No treatments found.
                                </td>
                            </tr>
                        ) : (
                            filteredTreatments.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-800">{item.title}</td>
                                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{item.summary}</td>
                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">{item.videoId || "-"}</td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            {item.department || "General"}
                                        </span>
                                    </td>
                                    {canManage && (
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-slate-500 hover:text-red-600"
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={deletingId === item.id}
                                                >
                                                    {deletingId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-slate-100 text-xs text-slate-400 text-center">
                Real-time updates enabled
            </div>
        </div>
    )
}

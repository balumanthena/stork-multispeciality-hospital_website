"use client"

import { useState } from "react"
import { Users, Save, Shield, User, MoreVertical, Search, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Profile {
    id: string
    email: string
    full_name: string | null
    role: string
    is_active: boolean
    created_at: string
}

interface UserManagementProps {
    initialUsers: Profile[]
}

export function UserManagement({ initialUsers }: UserManagementProps) {
    const [users, setUsers] = useState<Profile[]>(initialUsers)
    const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({})
    const [isSaving, setIsSaving] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const supabase = createClient()
    const router = useRouter()

    const handleRoleChange = (userId: string, newRole: string) => {
        setPendingChanges({
            ...pendingChanges,
            [userId]: newRole
        })

        // Update local state for immediate feedback
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
    }

    const saveChanges = async () => {
        if (Object.keys(pendingChanges).length === 0) return

        setIsSaving(true)
        try {
            for (const [userId, newRole] of Object.entries(pendingChanges)) {
                const { error } = await supabase
                    .from('profiles')
                    .update({ role: newRole })
                    .eq('id', userId)

                if (error) throw error
            }

            setPendingChanges({})
            alert("Roles updated successfully!")
            router.refresh()
        } catch (error: any) {
            console.error("Error updating roles:", error)
            alert("Error updating roles: " + error.message)
        } finally {
            setIsSaving(false)
        }
    }

    const filteredUsers = users.filter(user =>
        (user.full_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {Object.keys(pendingChanges).length > 0 && (
                    <button
                        onClick={saveChanges}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        Save {Object.keys(pendingChanges).length} Changes
                    </button>
                )}
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">User Details</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Current Role</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Joined Date</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                                <User className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{user.full_name || 'No Name'}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className={cn(
                                                "text-xs font-black uppercase tracking-tight py-1 px-3 rounded border transition-all cursor-pointer outline-none",
                                                user.role === 'super_admin' ? "bg-purple-50 text-purple-700 border-purple-200" :
                                                    user.role === 'admin' ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                        "bg-slate-50 text-slate-700 border-slate-200"
                                            )}
                                        >
                                            <option value="editor">Editor</option>
                                            <option value="content_manager">Admin</option>
                                            <option value="super_admin">Super Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.is_active ? (
                                            <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold uppercase">
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                Active
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-red-600 text-xs font-bold uppercase">
                                                <XCircle className="h-3.5 w-3.5" />
                                                Suspended
                                            </div>
                                        )}
                                    </td>
                                    <td suppressHydrationWarning className="px-6 py-4 text-xs font-medium text-slate-500">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                            <MoreVertical className="h-4 w-4 text-slate-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="p-12 text-center">
                            <Users className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                            <p className="text-sm text-slate-500">No users found matching your search.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

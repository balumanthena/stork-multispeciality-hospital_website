import { Shield, Info } from "lucide-react"
import { getCurrentUserRole } from "@/lib/auth-helpers"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { UserManagement } from "@/components/admin/system/UserManagement"

export default async function UsersManagementPage() {
    const role = await getCurrentUserRole()

    if (role !== 'super_admin') {
        redirect("/admin")
    }

    const supabase = await createClient()
    const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded">
                            Super Admin Only
                        </span>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Permissions</h1>
                    </div>
                    <p className="text-slate-500">Manage administrative access and role assignments.</p>
                </div>
            </div>

            <UserManagement initialUsers={profiles || []} />

            {/* Quick Context */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-400">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Shield className="h-40 w-40" />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="h-5 w-5 text-orange-400" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Security Architecture</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tighter italic">Enterprise RBAC (Role-Based Access Control)</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        Our security model uses strict server-side validation and Row Level Security (RLS) to ensure that only
                        authorized medical and administrative staff can access sensitive hospital data.
                        User roles are audited and logged for compliance.
                    </p>
                </div>
            </div>
        </div>
    )
}

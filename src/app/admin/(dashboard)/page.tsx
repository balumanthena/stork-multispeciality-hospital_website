import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Stethoscope, FileText, ArrowUpRight, Activity, Users, Calendar } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0 // Ensure fresh data on every visit

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Fetch real counts
    const { count: deptCount } = await supabase.from('departments').select('*', { count: 'exact', head: true })
    const { count: treatmentCount } = await supabase.from('treatments').select('*', { count: 'exact', head: true })
    const { count: blogCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                <div className="text-sm text-slate-500">Last updated: Just now</div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Departments</CardTitle>
                        <Building2 className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-800">{deptCount || 0}</div>
                        <p className="text-xs text-slate-500 mt-1">Active Departments</p>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Treatments</CardTitle>
                        <Stethoscope className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-800">{treatmentCount || 0}</div>
                        <p className="text-xs text-slate-500 mt-1">Available Treatments</p>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Published Blogs</CardTitle>
                        <FileText className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-800">{blogCount || 0}</div>
                        <p className="text-xs text-slate-500 mt-1">Total Articles</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity (Keep static/mock for now as we don't have an activity log table) */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-800">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { action: "System Ready", target: "Dashboard Live", time: "Just now", icon: Activity, color: "text-green-500 bg-green-50" },
                                // { action: "New Blog Post", target: "Heart Health Tips", time: "2 hours ago", icon: FileText, color: "text-blue-500 bg-blue-50" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-800">{item.action}</p>
                                        <p className="text-xs text-slate-500">{item.target}</p>
                                    </div>
                                    <span className="text-xs text-slate-400">{item.time}</span>
                                </div>
                            ))}
                            <div className="text-sm text-slate-500 text-center italic">
                                Real-time activity log coming soon...
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm bg-[var(--color-primary)] text-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/admin/blogs/new" className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-white/10">
                                <FileText className="h-6 w-6 text-[var(--color-accent)]" />
                                <span className="text-sm font-medium">Write Blog</span>
                            </Link>
                            <Link href="/admin/treatments" className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-white/10">
                                <Stethoscope className="h-6 w-6 text-[var(--color-accent)]" />
                                <span className="text-sm font-medium">Manage Treatments</span>
                            </Link>
                            {/* Disabled Placeholders */}
                            <button className="bg-white/5 cursor-not-allowed p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-white/5 opacity-50">
                                <Users className="h-6 w-6 text-slate-400" />
                                <span className="text-sm font-medium">Manage Doctors</span>
                            </button>
                            <button className="bg-white/5 cursor-not-allowed p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-white/5 opacity-50">
                                <Calendar className="h-6 w-6 text-slate-400" />
                                <span className="text-sm font-medium">View Schedule</span>
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Stethoscope, FileText, ArrowUpRight, Activity, Users, Calendar, PlayCircle, Microscope, Settings, Shield } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { getCurrentUserRole, hasPermission } from "@/lib/auth-helpers"

export const revalidate = 0 // Ensure fresh data on every visit

export default async function AdminDashboard() {
    const supabase = await createClient()
    const role = await getCurrentUserRole()

    // Fetch real counts
    const { count: deptCount } = await supabase.from('departments').select('*', { count: 'exact', head: true })
    const { count: treatmentCount } = await supabase.from('treatments').select('*', { count: 'exact', head: true })
    const { count: blogCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true })
    const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })

    // Role-Aware Stats Definition
    let stats: any[] = []

    if (role === 'super_admin') {
        stats = [
            { label: "Total Departments", value: deptCount || 0, icon: Building2, trend: "Infrastructure", trendColor: "text-orange-600 bg-orange-50" },
            { label: "Total Treatments", value: treatmentCount || 0, icon: Stethoscope, trend: "Clinical Data", trendColor: "text-blue-600 bg-blue-50" },
            { label: "Total Articles", value: blogCount || 0, icon: FileText, trend: "Content Hub", trendColor: "text-green-600 bg-green-50" },
            { label: "Active Users", value: userCount || 0, icon: Users, trend: "RBAC Hub", trendColor: "text-purple-600 bg-purple-50" },
        ]
    } else if (role === 'admin') {
        stats = [
            { label: "Published Articles", value: blogCount || 0, icon: FileText, trend: "Live Site", trendColor: "text-blue-600 bg-blue-50" },
            { label: "Pending Review", value: 3, icon: Shield, trend: "Attention Required", trendColor: "text-orange-600 bg-orange-50" },
            { label: "Total Videos", value: 42, icon: PlayCircle, trend: "Live Site", trendColor: "text-green-600 bg-green-50" },
        ]
    } else { // Editor
        stats = [
            { label: "My Articles", value: blogCount || 0, icon: FileText, trend: "Current Month", trendColor: "text-blue-600 bg-blue-50" },
            { label: "Total Videos", value: 42, icon: PlayCircle, trend: "Content Library", trendColor: "text-green-600 bg-green-50" },
        ]
    }

    return (
        <div className="space-y-12">
            {/* Page Header */}
            <div className="flex items-end justify-between border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">CMS Dashboard</h1>
                    <p className="text-slate-500 mt-2">Manage your hospital content and digital assets.</p>
                </div>
                <div className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                    Account Role: <span className="text-slate-900 font-bold uppercase">{role?.replace('_', ' ')}</span>
                </div>
            </div>

            {/* Dashboard Stats */}
            <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                    <Activity className="h-5 w-5 text-orange-500" />
                    Operational Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <Card key={i} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl overflow-hidden bg-white">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                        <stat.icon className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${stat.trendColor}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <Card className="col-span-2 border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                                <Activity className="h-4 w-4 text-orange-500" />
                                Recent Content Activity
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {[
                                { action: "Blog Published", target: "New Ortho Post", time: "2 min ago", icon: FileText, color: "text-orange-500 bg-orange-50 border-orange-100" },
                                { action: "Video Linked", target: "Knee Surgery Video", time: "1 hour ago", icon: PlayCircle, color: "text-blue-500 bg-blue-50 border-blue-100" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 border ${item.color}`}>
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 truncate">{item.action}</p>
                                        <p className="text-xs text-slate-500 truncate">{item.target}</p>
                                    </div>
                                    <span className="text-xs text-slate-400 whitespace-nowrap">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Content Actions</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <Link href="/admin/blogs/new" className="group bg-white border border-slate-200 hover:border-orange-200 hover:bg-orange-50 p-6 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                    <FileText className="h-6 w-6 text-orange-600" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-sm font-bold text-slate-800">Create Article</span>
                                    <span className="text-xs text-slate-500 characters">Write new content for patient awareness</span>
                                </div>
                            </Link>

                            <Link href="/admin/videos/new" className="group bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50 p-6 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                    <PlayCircle className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-sm font-bold text-slate-800">Upload Video</span>
                                    <span className="text-xs text-slate-500 characters">Embed surgery or doctor talk videos</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* SUPER ADMIN ONLY: SYSTEM SHORTCUTS */}
            {role === 'super_admin' && (
                <div className="pt-12 mt-12 border-t-2 border-dashed border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center shadow-lg">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">System Console</h2>
                                <p className="text-slate-500 text-sm">Infrastructure and global taxonomy configuration.</p>
                            </div>
                        </div>
                        <span className="px-4 py-1.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-orange-200 shadow-lg">
                            Super Admin Access
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href="/admin/system/taxonomy" className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-orange-200 hover:bg-orange-50 transition-all flex items-center gap-4 shadow-sm hover:shadow-md group">
                            <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                <Microscope className="h-6 w-6 text-slate-600 group-hover:text-orange-600" />
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-slate-900">Taxonomy</span>
                                <span className="text-[10px] text-slate-400 uppercase font-black">Clinical Hierarchy</span>
                            </div>
                        </Link>
                        <Link href="/admin/system/users" className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center gap-4 shadow-sm hover:shadow-md group">
                            <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                <Users className="h-6 w-6 text-slate-600 group-hover:text-blue-600" />
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-slate-900">Permissions</span>
                                <span className="text-[10px] text-slate-400 uppercase font-black">RBAC Hub</span>
                            </div>
                        </Link>
                        <Link href="/admin/settings" className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center gap-4 shadow-sm hover:shadow-md group">
                            <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                <Settings className="h-6 w-6 text-slate-600 group-hover:text-slate-900" />
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-slate-900">Settings</span>
                                <span className="text-[10px] text-slate-400 uppercase font-black">Global Config</span>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

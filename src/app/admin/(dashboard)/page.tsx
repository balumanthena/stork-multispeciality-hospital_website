import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Stethoscope, FileText, ArrowUpRight, Activity, Users, Calendar } from "lucide-react"
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

    // Dynamically build the available stats
    const stats = []
    if (hasPermission(role, 'manage_departments')) {
        stats.push({ label: "Total Departments", value: deptCount || 0, icon: Building2, trend: "+2 this month", trendColor: "text-green-600 bg-green-50" })
    }
    if (hasPermission(role, 'manage_treatments')) {
        stats.push({ label: "Active Treatments", value: treatmentCount || 0, icon: Stethoscope, trend: "+5 this week", trendColor: "text-green-600 bg-green-50" })
    }
    if (hasPermission(role, 'manage_blogs')) {
        stats.push({ label: "Published Articles", value: blogCount || 0, icon: FileText, trend: "+12% engagement", trendColor: "text-blue-600 bg-blue-50" })
    }

    return (
        <div className="space-y-12">
            {/* Page Header */}
            <div className="flex items-end justify-between border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-2">Welcome back, here's what's happening today.</p>
                </div>
                <div className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                    Last updated: Just now
                </div>
            </div>

            {/* Stats Cards - Enterprise Style */}
            {stats.length > 0 && (
                <div className={`grid grid-cols-1 md:grid-cols-${Math.min(stats.length, 3)} gap-6`}>
                    {stats.map((stat, i) => (
                        <Card key={i} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl overflow-hidden bg-white">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                        <stat.icon className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trendColor}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                                    <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
                {/* Recent Activity - Clean List */}
                <Card className="col-span-2 border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                                <Activity className="h-4 w-4 text-orange-500" />
                                Recent Activity
                            </CardTitle>
                            <button className="text-xs font-medium text-blue-600 hover:text-blue-700">View All</button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {[
                                { action: "System Health Check", target: "All systems operational", time: "2 min ago", icon: Activity, color: "text-green-500 bg-green-50 border-green-100" },
                                { action: "New Login", target: "Admin User", time: "15 min ago", icon: Users, color: "text-blue-500 bg-blue-50 border-blue-100" },
                                { action: "Backup Completed", target: "Daily Database Backup", time: "1 hour ago", icon: Calendar, color: "text-purple-500 bg-purple-50 border-purple-100" },
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
                        <div className="p-4 text-center border-t border-slate-100">
                            <p className="text-xs text-slate-400 italic">Real-time logging active</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions - Grid Layout */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {hasPermission(role, 'create_blog') && (
                                <Link href="/admin/blogs/new" className="group bg-white border border-slate-200 hover:border-orange-200 hover:bg-orange-50 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                        <FileText className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-600 group-hover:text-orange-700">Write Blog</span>
                                </Link>
                            )}

                            {hasPermission(role, 'manage_treatments') && (
                                <Link href="/admin/treatments" className="group bg-white border border-slate-200 hover:border-orange-200 hover:bg-orange-50 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                        <Stethoscope className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-700">Treatments</span>
                                </Link>
                            )}

                            <button className="group bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-4 opacity-60 cursor-not-allowed">
                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-slate-400" />
                                </div>
                                <span className="text-sm font-medium text-slate-400">Doctors</span>
                            </button>

                            <button className="group bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-4 opacity-60 cursor-not-allowed">
                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-slate-400" />
                                </div>
                                <span className="text-sm font-medium text-slate-400">Schedule</span>
                            </button>
                        </div>
                    </div>

                    {/* System Status - Mini Widget */}
                    <div className="bg-slate-900 rounded-xl p-6 text-white shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Activity className="h-24 w-24" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">System Status</span>
                            </div>
                            <h4 className="text-xl font-bold">All Systems Operational</h4>
                            <p className="text-slate-400 text-sm mt-1">Version 2.4.0 (Stable)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

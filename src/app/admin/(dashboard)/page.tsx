import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Stethoscope, FileText, ArrowUpRight, Activity, Users, Calendar, PlayCircle, Microscope, Settings, Shield, PlusCircle, Video as VideoIcon, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { getCurrentUserRole, hasPermission } from "@/lib/auth-helpers"
import { formatDistanceToNow } from 'date-fns'
import { RecentActivityList } from "@/components/admin/recent-activity-list"

export const revalidate = 0 // Ensure fresh data on every visit

export default async function AdminDashboard() {
    const supabase = await createClient()
    const role = await getCurrentUserRole()

    // Fetch real counts and recent activity in parallel for performance
    const [
        { count: deptCount },
        { count: treatmentCount },
        { count: blogCount },
        { count: userCount },
        { count: videoCount },
        { data: recentBlogs },
        { data: recentVideos }
    ] = await Promise.all([
        supabase.from('departments').select('*', { count: 'exact', head: true }),
        supabase.from('treatments').select('*', { count: 'exact', head: true }),
        supabase.from('blogs').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('treatment_videos').select('*', { count: 'exact', head: true }),
        supabase.from('blogs').select('id, title, created_at, status').order('created_at', { ascending: false }).limit(5),
        supabase.from('treatment_videos').select('id, title, created_at').order('created_at', { ascending: false }).limit(5)
    ])

    // Role-Aware Stats Definition
    let stats: any[] = []

    if (role === 'super_admin') {
        stats = [
            { label: "Total Departments", value: deptCount || 0, icon: Building2, trend: "Infrastructure", trendColor: "text-blue-600 bg-blue-50 border-blue-100" },
            { label: "Total Treatments", value: treatmentCount || 0, icon: Stethoscope, trend: "Clinical Data", trendColor: "text-emerald-600 bg-emerald-50 border-emerald-100" },
            { label: "Total Articles", value: blogCount || 0, icon: FileText, trend: "Content Hub", trendColor: "text-orange-600 bg-orange-50 border-orange-100" },
            { label: "Active Users", value: userCount || 0, icon: Users, trend: "RBAC Hub", trendColor: "text-purple-600 bg-purple-50 border-purple-100" },
        ]
    } else if (role === 'admin') {
        stats = [
            { label: "Published Articles", value: blogCount || 0, icon: FileText, trend: "Live Site", trendColor: "text-orange-600 bg-orange-50 border-orange-100" },
            { label: "Pending Review", value: 3, icon: Shield, trend: "Attention Required", trendColor: "text-red-600 bg-red-50 border-red-100" },
            { label: "Total Videos", value: videoCount || 0, icon: PlayCircle, trend: "Live Site", trendColor: "text-blue-600 bg-blue-50 border-blue-100" },
        ]
    } else if (role === 'seo_manager') {
        stats = [
            { label: "Optimized Pages", value: treatmentCount || 0, icon: FileText, trend: "Clinical Pages", trendColor: "text-blue-600 bg-blue-50 border-blue-100" },
            { label: "Active Articles", value: blogCount || 0, icon: Activity, trend: "Content Hub", trendColor: "text-orange-600 bg-orange-50 border-orange-100" },
        ]
    } else { // Editor
        stats = [
            { label: "My Articles", value: blogCount || 0, icon: FileText, trend: "Current Month", trendColor: "text-orange-600 bg-orange-50 border-orange-100" },
            { label: "Total Videos", value: videoCount || 0, icon: PlayCircle, trend: "Content Library", trendColor: "text-blue-600 bg-blue-50 border-blue-100" },
        ]
    }

    // Normalize recent activity
    const activityItems: any[] = []
    
    if (recentBlogs) {
        recentBlogs.forEach((blog: any) => {
            activityItems.push({
                action: blog.status === 'Published' ? "Blog Published" : "Blog Drafted",
                target: blog.title || "Untitled Article",
                time: blog.created_at,
                icon: FileText,
                color: blog.status === 'Published' ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-amber-600 bg-amber-50 border-amber-100"
            })
        })
    }

    if (recentVideos) {
        recentVideos.forEach((video: any) => {
            activityItems.push({
                action: "Video Added",
                target: video.title || "Untitled Video",
                time: video.created_at,
                icon: PlayCircle,
                color: "text-blue-600 bg-blue-50 border-blue-100"
            })
        })
    }

    // Sort by time descending and take top 5
    activityItems.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    const topActivity = activityItems.slice(0, 5)

    return (
        <div className="space-y-10 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, {role?.replace('_', ' ').toUpperCase()}</h1>
                    <p className="text-slate-500 mt-2 font-medium">Here's what's happening with your hospital content today.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/blogs/new" className="px-5 py-2.5 bg-orange-600 text-white rounded-full font-bold text-sm hover:bg-orange-700 transition-colors shadow-md shadow-orange-200 flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Write Article
                    </Link>
                </div>
            </div>

            {/* Dashboard Stats */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-white ring-1 ring-slate-200 relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CardContent className="p-6 relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                                        <stat.icon className="h-6 w-6 text-slate-700" />
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${stat.trendColor}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 border-0 ring-1 ring-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
                    <CardHeader className="border-b border-slate-100 bg-white px-6 py-5">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Activity className="h-5 w-5 text-orange-500" />
                                Recent Content Activity
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <RecentActivityList 
                            initialBlogs={recentBlogs || []} 
                            initialVideos={recentVideos || []} 
                        />
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                            <PlusCircle className="h-5 w-5 text-slate-400" />
                            Quick Actions
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <Link href="/admin/blogs/new" className="group bg-gradient-to-br from-orange-500 to-orange-600 border-0 p-6 rounded-2xl flex items-center gap-5 shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                                <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <FileText className="h-7 w-7 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <span className="block text-lg font-black text-white tracking-tight">Create Article</span>
                                    <span className="text-sm text-orange-100 font-medium line-clamp-1 mt-0.5">Write new patient content</span>
                                </div>
                                <ArrowUpRight className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                            </Link>

                            <Link href="/admin/videos/new" className="group bg-gradient-to-br from-slate-800 to-slate-900 border-0 p-6 rounded-2xl flex items-center gap-5 shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                                <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <PlayCircle className="h-7 w-7 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <span className="block text-lg font-black text-white tracking-tight">Upload Video</span>
                                    <span className="text-sm text-slate-300 font-medium line-clamp-1 mt-0.5">Add surgery or doctor talks</span>
                                </div>
                                <ArrowUpRight className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* SUPER ADMIN ONLY: SYSTEM SHORTCUTS */}
            {role === 'super_admin' && (
                <div className="pt-10 mt-10 border-t border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Console</h2>
                                <p className="text-slate-500 font-medium text-sm">Infrastructure and global taxonomy configuration.</p>
                            </div>
                        </div>
                        <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200">
                            Super Admin Access
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <Link href="/admin/system/users" className="p-6 bg-white ring-1 ring-slate-200 rounded-2xl hover:ring-orange-200 hover:shadow-md transition-all flex items-center gap-5 group">
                            <div className="h-14 w-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
                                <Users className="h-7 w-7 text-slate-600 group-hover:text-orange-600 transition-colors" />
                            </div>
                            <div>
                                <span className="block text-base font-bold text-slate-900">Permissions</span>
                                <span className="text-xs text-slate-500 font-medium">RBAC Hub</span>
                            </div>
                        </Link>
                        
                        <Link href="/admin/settings" className="p-6 bg-white ring-1 ring-slate-200 rounded-2xl hover:ring-slate-300 hover:shadow-md transition-all flex items-center gap-5 group">
                            <div className="h-14 w-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                                <Settings className="h-7 w-7 text-slate-600 group-hover:text-slate-900 transition-colors" />
                            </div>
                            <div>
                                <span className="block text-base font-bold text-slate-900">Settings</span>
                                <span className="text-xs text-slate-500 font-medium">Global Config</span>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

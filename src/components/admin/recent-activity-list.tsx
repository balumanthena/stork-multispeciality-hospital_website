"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { FileText, PlayCircle, Clock, Activity } from "lucide-react"
import { formatDistanceToNow } from 'date-fns'

interface ActivityItem {
    id: string
    action: string
    target: string
    time: string
    icon: any
    color: string
}

export function RecentActivityList({ initialBlogs, initialVideos }: { initialBlogs: any[], initialVideos: any[] }) {
    const [activities, setActivities] = useState<ActivityItem[]>([])

    const processActivity = (blogs: any[], videos: any[]) => {
        const items: ActivityItem[] = []
        
        blogs?.forEach((blog: any) => {
            items.push({
                id: `blog-${blog.id}`,
                action: blog.status === 'Published' ? "Blog Published" : "Blog Drafted",
                target: blog.title || "Untitled Article",
                time: blog.created_at,
                icon: FileText,
                color: blog.status === 'Published' ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-amber-600 bg-amber-50 border-amber-100"
            })
        })

        videos?.forEach((video: any) => {
            items.push({
                id: `video-${video.id}`,
                action: "Video Added",
                target: video.title || "Untitled Video",
                time: video.created_at,
                icon: PlayCircle,
                color: "text-blue-600 bg-blue-50 border-blue-100"
            })
        })

        return items.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5)
    }

    useEffect(() => {
        setActivities(processActivity(initialBlogs, initialVideos))

        // Subscribe to real-time changes
        const channel = supabase
            .channel('dashboard-activity')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, async () => {
                const { data: newBlogs } = await supabase.from('blogs').select('id, title, created_at, status').order('created_at', { ascending: false }).limit(5)
                const { data: currentVideos } = await supabase.from('treatment_videos').select('id, title, created_at').order('created_at', { ascending: false }).limit(5)
                setActivities(processActivity(newBlogs || [], currentVideos || []))
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'treatment_videos' }, async () => {
                const { data: currentBlogs } = await supabase.from('blogs').select('id, title, created_at, status').order('created_at', { ascending: false }).limit(5)
                const { data: newVideos } = await supabase.from('treatment_videos').select('id, title, created_at').order('created_at', { ascending: false }).limit(5)
                setActivities(processActivity(currentBlogs || [], newVideos || []))
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [initialBlogs, initialVideos])

    if (activities.length === 0) {
        return (
            <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">No recent activity found.</p>
                <p className="text-sm text-slate-400">Start writing articles or uploading videos to see them here.</p>
            </div>
        )
    }

    return (
        <div className="divide-y divide-slate-100">
            {activities.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-5 hover:bg-slate-50/80 transition-colors group">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${item.color}`}>
                        <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate group-hover:text-orange-600 transition-colors">{item.action}</p>
                        <p className="text-sm text-slate-500 truncate mt-0.5">{item.target}</p>
                    </div>
                    <div className="text-right shrink-0">
                        <span className="text-xs font-medium text-slate-400 whitespace-nowrap bg-slate-100 px-2.5 py-1 rounded-md">
                            {formatDistanceToNow(new Date(item.time), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

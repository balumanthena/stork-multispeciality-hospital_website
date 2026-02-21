"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Building2, Stethoscope, FileText, Settings, LogOut, Microscope, PlayCircle, MessageSquareQuote, Award, Shield, Image, Megaphone } from "lucide-react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { hasPermission } from "@/lib/auth-utils"
import { UserRole } from "@/types"

const sidebarGroups = [
    {
        title: "Overview",
        items: [
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard, permission: null },
        ]
    },
    {
        title: "Services",
        items: [
            { name: "Service Categories", href: "/admin/services/categories", icon: Building2, permission: 'manage_departments' as const },
            { name: "Services", href: "/admin/services", icon: Stethoscope, permission: 'manage_treatments' as const },
        ]
    },
    {
        title: "Content",
        items: [
            { name: "Articles", href: "/admin/blogs", icon: FileText, permission: 'manage_blogs' as const },
            { name: "Videos", href: "/admin/videos", icon: PlayCircle, permission: 'manage_videos' as const },
        ]
    },
    {
        title: "Configuration",
        items: [
            { name: "Global Settings", href: "/admin/settings", icon: Settings, permission: 'manage_settings' as const },
        ]
    }
]

export function AdminSidebar() {
    const pathname = usePathname()
    const [role, setRole] = useState<UserRole | null>(null)

    useEffect(() => {
        const fetchRole = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single()
                if (data) setRole(data.role as UserRole)
            }
        }
        fetchRole()
    }, [])

    return (
        <div className="sticky top-0 flex h-screen w-64 flex-col bg-white border-r border-slate-200 text-slate-600">
            {/* Logo Area */}
            <div className="flex h-16 items-center px-6 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
                    <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-sm">
                        <span className="text-xl font-bold">S</span>
                    </div>
                    Stork Admin
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-6 px-3">
                    {sidebarGroups.map((group) => {
                        const visibleItems = group.items.filter(link => !link.permission || hasPermission(role, link.permission))
                        if (visibleItems.length === 0) return null

                        return (
                            <div key={group.title} className="space-y-1">
                                {group.title !== "Overview" && (
                                    <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                        {group.title}
                                    </h3>
                                )}
                                <nav className="space-y-1">
                                    {visibleItems.map((link) => {
                                        // Update isActive to correctly match sub-routes, except for Dashboard root
                                        const isActive = link.href === "/admin"
                                            ? pathname === "/admin"
                                            : pathname.startsWith(link.href)

                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className={cn(
                                                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out relative",
                                                    isActive
                                                        ? "bg-orange-50 text-orange-600"
                                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                )}
                                            >
                                                {/* Active Indicator Bar */}
                                                {isActive && (
                                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-orange-500 rounded-r-full" />
                                                )}

                                                <link.icon
                                                    className={cn(
                                                        "mr-4 h-5 w-5 flex-shrink-0 transition-colors",
                                                        isActive ? "text-orange-500" : "text-slate-400 group-hover:text-slate-500"
                                                    )}
                                                />
                                                {link.name}
                                            </Link>
                                        )
                                    })}
                                </nav>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Logout Section */}
            <div className="border-t border-slate-100 p-4">
                <button className="group flex w-full items-center px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                    <LogOut className="mr-4 h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-red-500" />
                    Logout
                </button>
            </div>
        </div>
    )
}

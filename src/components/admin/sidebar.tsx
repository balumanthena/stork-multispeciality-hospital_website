"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Building2, Stethoscope, FileText, Settings, LogOut, Microscope } from "lucide-react"

const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Departments", href: "/admin/departments", icon: Building2 },
    { name: "Treatments", href: "/admin/treatments", icon: Stethoscope },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-screen w-64 flex-col bg-[var(--color-primary)] text-white">
            <div className="flex h-16 items-center px-6 border-b border-white/10">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-[var(--color-primary)]">
                        <span className="text-xl">S</span>
                    </div>
                    Stork Admin
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-1 px-3">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                                pathname === link.href
                                    ? "bg-white/10 text-white"
                                    : "text-blue-100 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <link.icon className={cn("mr-3 h-5 w-5 flex-shrink-0", pathname === link.href ? "text-[var(--color-accent)]" : "text-blue-300")} />
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="border-t border-white/10 p-4">
                <button className="group flex w-full items-center px-3 py-2.5 text-sm font-medium text-blue-100 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors">
                    <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                    Logout
                </button>
            </div>
        </div>
    )
}

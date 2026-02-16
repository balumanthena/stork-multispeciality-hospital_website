"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight, LucideIcon } from "lucide-react"

export const MegaMenuGrid = ({ children, cols = 4 }: { children: React.ReactNode, cols?: number }) => {
    return (
        <div className={cn(
            "grid py-8",
            cols === 4 && "grid-cols-4 gap-x-10 gap-y-8",
            cols === 5 && "grid-cols-5 gap-6",
            cols === 3 && "grid-cols-3 gap-6",
        )}>
            {children}
        </div>
    )
}

export const MegaMenuItem = ({ title, href, icon: Icon }: { title: string, href: string, icon?: LucideIcon }) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className="group flex items-center gap-4 p-2 -ml-2 rounded-xl transition-all duration-200 outline-none"
        >
            {Icon && (
                <Icon className={cn("transition-transform duration-200 group-hover:scale-105", isActive && "scale-105")} />
            )}
            <span className={cn(
                "text-[15px] font-medium transition-colors duration-200 line-clamp-2",
                isActive ? "text-[#ff8202]" : "text-slate-800 group-hover:text-[#ff8202]"
            )}>
                {title}
            </span>
        </Link>
    )
}

export const MegaMenuCategory = ({ title, items }: { title: string, items: { title: string, href: string }[] }) => {
    return (
        <div className="space-y-4">
            <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100 pb-2">
                {title}
            </h4>
            <ul className="space-y-2">
                {items.map((item, i) => (
                    <li key={i}>
                        <Link
                            href={item.href}
                            className="text-sm text-slate-600 hover:text-[var(--color-primary)] hover:translate-x-1 transition-all inline-flex items-center gap-1"
                        >
                            <ChevronRight className="w-3 h-3 opacity-0 text-[var(--color-primary)] -ml-4 transition-all hover-target-visible" />
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

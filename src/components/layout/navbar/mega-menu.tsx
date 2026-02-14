"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

export const MegaMenuGrid = ({ children, cols = 4 }: { children: React.ReactNode, cols?: number }) => {
    return (
        <div className={cn(
            "grid gap-6 p-8",
            cols === 4 && "grid-cols-4",
            cols === 5 && "grid-cols-5",
            cols === 3 && "grid-cols-3",
        )}>
            {children}
        </div>
    )
}

export const MegaMenuItem = ({ title, href, icon: Icon }: { title: string, href: string, icon?: any }) => {
    return (
        <Link
            href={href}
            className="group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
        >
            {Icon && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100/50 text-blue-600 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors line-clamp-2">
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

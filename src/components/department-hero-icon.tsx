"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"
import { DEPARTMENTS_LIST } from "@/lib/data/departments"

interface DepartmentHeroIconProps {
    slug: string
    className?: string
    fallbackIcon?: React.ElementType
}

export function DepartmentHeroIcon({ slug, className, fallbackIcon: FallbackIcon }: DepartmentHeroIconProps) {
    const department = DEPARTMENTS_LIST.find(d => d.slug === slug)
    const iconUrl = department?.iconUrl

    // Fallback if no icon found (shouldn't happen if map is complete, but good for safety)
    if (!iconUrl) {
        const Icon = FallbackIcon || Sparkles
        return (
            <div className={cn("hidden lg:flex w-[220px] h-[220px] rounded-2xl bg-gradient-to-br from-[#fff7ed] to-[#eff6ff] border border-gray-100 items-center justify-center flex-shrink-0 shadow-xl relative overflow-hidden group", className)}>
                <div className="absolute w-[80%] h-[80%] bg-[#ff8202] opacity-10 blur-2xl rounded-full pointer-events-none"></div>
                <Icon className="w-20 h-20 text-[#ff8202] stroke-[1.5]" />
            </div>
        )
    }

    return (
        <div className={cn("hidden lg:flex w-56 h-56 bg-white rounded-2xl shadow-[0_10px_40px_rgba(255,130,2,0.15)] items-center justify-center flex-shrink-0 relative overflow-hidden group border border-slate-50", className)}>

            {/* Glow Effect */}
            <div className="absolute w-[80%] h-[80%] bg-[#ff8202] opacity-[0.05] blur-3xl rounded-full pointer-events-none"></div>

            {/* Premium Clinical Icon */}
            <div className="relative w-[130px] h-[130px] transition-all duration-300 ease-in-out group-hover:scale-110">
                <Image
                    src={iconUrl}
                    alt={department?.title || "Department Icon"}
                    fill
                    unoptimized
                    className="object-contain"
                />
            </div>
        </div>
    )
}

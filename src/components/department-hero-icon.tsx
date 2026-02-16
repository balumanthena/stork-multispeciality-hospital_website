"use client"

import { cn } from "@/lib/utils"
import { getDepartmentIcon } from "@/lib/data/department-icons"
import { Sparkles } from "lucide-react"

interface DepartmentHeroIconProps {
    slug: string
    className?: string
    fallbackIcon?: React.ElementType
}

export function DepartmentHeroIcon({ slug, className, fallbackIcon: FallbackIcon }: DepartmentHeroIconProps) {
    const iconPath = getDepartmentIcon(slug)

    // Fallback if no icon found (shouldn't happen if map is complete, but good for safety)
    if (!iconPath) {
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

            {/* Icon with CSS Mask for Color */}
            <div className="relative w-[120px] h-[120px] transition-all duration-300 ease-in-out group-hover:scale-105">
                <div
                    className="w-full h-full bg-[#ff8202]"
                    style={{
                        maskImage: `url('${iconPath}')`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskImage: `url('${iconPath}')`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center"
                    }}
                />
            </div>
        </div>
    )
}

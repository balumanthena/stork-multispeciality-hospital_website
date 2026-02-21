"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ArrowRight } from "lucide-react"

import { DEPARTMENTS, TREATMENTS, PROCEDURES, NavItem } from "./nav-data"
import { MegaMenuGrid, MegaMenuItem, MegaMenuCategory } from "./mega-menu"
import { cn } from "@/lib/utils"
import { getIconByName } from "./icon-map"
import { getDepartmentIcon } from "@/lib/data/department-icons"

import { LucideIcon } from "lucide-react"

import { TreatmentsMegaMenu } from "./treatments-mega-menu"
import { ProceduresMegaMenu } from "./procedures-mega-menu"

function DepartmentIcon({ slug, defaultIcon, className, isActive }: { slug: string, defaultIcon: string | LucideIcon | any, className?: string, isActive?: boolean }) {
    const iconPath = getDepartmentIcon(slug)
    const IconComponent = typeof defaultIcon === 'string' ? getIconByName(defaultIcon) : defaultIcon

    if (iconPath) {
        return (
            <div className={cn(
                "w-12 h-12 flex items-center justify-center rounded-full bg-orange-50 transition-all duration-200 ease-in-out flex-shrink-0",
                "group-hover:bg-[#ff8202] group-hover:shadow-lg group-hover:-translate-y-0.5",
                isActive && "bg-[#ff8202] shadow-md",
                className
            )}>
                <div
                    className={cn(
                        "w-7 h-7 transition-colors duration-200 bg-[#ff8202]",
                        "group-hover:bg-white",
                        isActive && "bg-white"
                    )}
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
        )
    }

    // Fallback Icon
    return (
        <div className={cn(
            "w-12 h-12 flex items-center justify-center rounded-full bg-orange-50 transition-all duration-200 ease-in-out flex-shrink-0",
            "group-hover:bg-[#ff8202] group-hover:shadow-lg group-hover:-translate-y-0.5",
            isActive && "bg-[#ff8202] shadow-md",
            className
        )}>
            {React.createElement(IconComponent, {
                className: cn(
                    "w-6 h-6 text-[#ff8202] transition-colors duration-200",
                    "group-hover:text-white",
                    isActive && "text-white"
                )
            })}
        </div>
    )
}

import { Department } from "@/types"
import { GroupedTreatmentCategory } from "@/lib/data/grouped-treatments"

export function DesktopNav({ departments = [], groupedTreatments = [] }: { departments?: Department[], groupedTreatments?: GroupedTreatmentCategory[] }) {
    const pathname = usePathname()
    const [activeMenu, setActiveMenu] = useState<string | null>(null)

    // ... rest of component

    const isActive = (path: string) => pathname === path

    // Merge static and dynamic departments or just use dynamic if available
    // For now, we'll map dynamic departments to NavItem format
    const dynamicDepartments: NavItem[] = departments.length > 0 ? departments.map(d => {
        return {
            title: d.name,
            href: `/departments/${d.slug}`,
            icon: (props: React.ComponentProps<"svg">) => <DepartmentIcon slug={d.slug} defaultIcon={d.icon || "Activity"} {...props} />
        }
    }) : DEPARTMENTS.map(d => {
        // Extract slug from href
        const slug = d.href.split('/').pop() || ''
        return {
            ...d,
            icon: (props: React.ComponentProps<"svg">) => <DepartmentIcon slug={slug} defaultIcon={d.icon} {...props} />
        }
    })

    return (
        <nav className="hidden lg:flex items-center gap-8 h-full" onMouseLeave={() => setActiveMenu(null)}>

            {/* Home */}
            <Link
                href="/"
                className={cn(
                    "relative flex items-center h-full px-1 text-[16px] font-medium transition-colors group",
                    isActive("/") ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-[var(--color-primary)]"
                )}
            >
                Home
                <span className={cn(
                    "absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-primary)] rounded-t-sm transition-transform origin-left duration-300",
                    isActive("/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}></span>
            </Link>

            {/* About Hospital */}
            <Link
                href="/about"
                className={cn(
                    "relative flex items-center h-full px-1 text-[16px] font-medium transition-colors group",
                    isActive("/about") ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-[var(--color-primary)]"
                )}
            >
                About
                <span className={cn(
                    "absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-primary)] rounded-t-sm transition-transform origin-left duration-300",
                    isActive("/about") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}></span>
            </Link>

            {/* Mega Menu: Departments */}
            <div
                className="h-full flex items-center"
                onMouseEnter={() => setActiveMenu("departments")}
            >
                <Link
                    href="/services"
                    className={cn(
                        "relative flex items-center gap-1.5 px-1 text-[16px] font-medium h-full transition-colors group outline-none",
                        activeMenu === "departments" || pathname.startsWith("/departments") ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-[var(--color-primary)]"
                    )}>
                    Departments <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", activeMenu === "departments" ? "rotate-180" : "opacity-60")} />
                    <span className={cn(
                        "absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-primary)] rounded-t-sm transition-transform origin-left duration-300",
                        activeMenu === "departments" || pathname.startsWith("/departments") ? "scale-x-100" : "scale-x-0"
                    )}></span>
                </Link>
                {/* Dropdown */}
                <div className={cn(
                    "absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 origin-top z-40 transform perspective-1000",
                    activeMenu === "departments" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                )}>
                    <div className="container max-w-[1280px] mx-auto">
                        <MegaMenuGrid cols={4}>
                            {dynamicDepartments.map((dept) => (
                                <MegaMenuItem key={dept.title} {...dept} />
                            ))}
                        </MegaMenuGrid>
                    </div>
                </div>
            </div>

            {/* Mega Menu: Treatments */}
            <div
                className="h-full flex items-center"
                onMouseEnter={() => setActiveMenu("treatments")}
            >
                <Link
                    href="/treatments"
                    className={cn(
                        "relative flex items-center gap-1.5 px-1 text-[16px] font-medium h-full transition-colors group outline-none",
                        activeMenu === "treatments" || pathname.startsWith("/treatments") ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-[var(--color-primary)]"
                    )}>
                    Treatments <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", activeMenu === "treatments" ? "rotate-180" : "opacity-60")} />
                    <span className={cn(
                        "absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-primary)] rounded-t-sm transition-transform origin-left duration-300",
                        activeMenu === "treatments" || pathname.startsWith("/treatments") ? "scale-x-100" : "scale-x-0"
                    )}></span>
                </Link>
                <div className={cn(
                    "absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 origin-top z-40 transform perspective-1000",
                    activeMenu === "treatments" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                )}>
                    <TreatmentsMegaMenu
                        treatments={groupedTreatments.length > 0 ? groupedTreatments : TREATMENTS}
                        onClose={() => setActiveMenu(null)}
                    />
                </div>
            </div>

            {/* Mega Menu: Procedures */}
            <div
                className="h-full flex items-center"
                onMouseEnter={() => setActiveMenu("procedures")}
            >
                <Link
                    href="/procedures"
                    className={cn(
                        "relative flex items-center gap-1.5 px-1 text-[16px] font-medium h-full transition-colors group outline-none",
                        activeMenu === "procedures" || pathname.startsWith("/procedures") ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-[var(--color-primary)]"
                    )}>
                    Procedures <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", activeMenu === "procedures" ? "rotate-180" : "opacity-60")} />
                    <span className={cn(
                        "absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-primary)] rounded-t-sm transition-transform origin-left duration-300",
                        activeMenu === "procedures" || pathname.startsWith("/procedures") ? "scale-x-100" : "scale-x-0"
                    )}></span>
                </Link>
                <div className={cn(
                    "absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 origin-top z-40 transform perspective-1000",
                    activeMenu === "procedures" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                )}>
                    <ProceduresMegaMenu
                        procedures={PROCEDURES}
                        onClose={() => setActiveMenu(null)}
                    />
                </div>
            </div>

            {/* Doctors & Blogs */}
            <Link
                href="/doctors"
                className={cn(
                    "relative flex items-center h-full px-1 text-[16px] font-medium transition-colors group",
                    isActive("/doctors") ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-[var(--color-primary)]"
                )}
            >
                Doctors
                <span className={cn(
                    "absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-primary)] rounded-t-sm transition-transform origin-left duration-300",
                    isActive("/doctors") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}></span>
            </Link>
            <Link
                href="/blog"
                className={cn(
                    "relative flex items-center h-full px-1 text-[16px] font-medium transition-colors group",
                    isActive("/blog") ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-[var(--color-primary)]"
                )}
            >
                Blogs
                <span className={cn(
                    "absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-primary)] rounded-t-sm transition-transform origin-left duration-300",
                    isActive("/blog") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}></span>
            </Link>

        </nav>
    )
}

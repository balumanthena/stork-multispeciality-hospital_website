"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { DEPARTMENTS, TREATMENTS, PROCEDURES, NAV_LINKS, NavItem } from "./nav-data"
import { MegaMenuGrid, MegaMenuItem, MegaMenuCategory } from "./mega-menu"
import { cn } from "@/lib/utils"

export function DesktopNav() {
    const pathname = usePathname()
    const [activeMenu, setActiveMenu] = useState<string | null>(null)

    const isActive = (path: string) => pathname === path

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
                    href="/departments"
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
                    <div className="container max-w-[1280px] mx-auto py-8 px-8">
                        <MegaMenuGrid cols={4}>
                            {DEPARTMENTS.map((dept) => (
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
                <button className={cn(
                    "relative flex items-center gap-1.5 px-1 text-[16px] font-medium h-full transition-colors group outline-none",
                    activeMenu === "treatments" || pathname.startsWith("/treatments") ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-[var(--color-primary)]"
                )}>
                    Treatments <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", activeMenu === "treatments" ? "rotate-180" : "opacity-60")} />
                    <span className={cn(
                        "absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-primary)] rounded-t-sm transition-transform origin-left duration-300",
                        activeMenu === "treatments" || pathname.startsWith("/treatments") ? "scale-x-100" : "scale-x-0"
                    )}></span>
                </button>
                <div className={cn(
                    "absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 origin-top z-40 transform perspective-1000",
                    activeMenu === "treatments" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                )}>
                    <div className="container max-w-[1280px] mx-auto py-8 px-8">
                        <MegaMenuGrid cols={5}>
                            {TREATMENTS.map((section) => (
                                <MegaMenuCategory key={section.title} {...section} />
                            ))}
                        </MegaMenuGrid>
                    </div>
                </div>
            </div>

            {/* Mega Menu: Procedures */}
            <div
                className="h-full flex items-center"
                onMouseEnter={() => setActiveMenu("procedures")}
            >
                <button className={cn(
                    "relative flex items-center gap-1.5 px-1 text-[16px] font-medium h-full transition-colors group outline-none",
                    activeMenu === "procedures" || pathname.startsWith("/procedures") ? "text-[var(--color-primary)]" : "text-slate-600 hover:text-[var(--color-primary)]"
                )}>
                    Procedures <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", activeMenu === "procedures" ? "rotate-180" : "opacity-60")} />
                    <span className={cn(
                        "absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-primary)] rounded-t-sm transition-transform origin-left duration-300",
                        activeMenu === "procedures" || pathname.startsWith("/procedures") ? "scale-x-100" : "scale-x-0"
                    )}></span>
                </button>
                <div className={cn(
                    "absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 origin-top z-40 transform perspective-1000",
                    activeMenu === "procedures" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                )}>
                    <div className="container max-w-[1280px] mx-auto py-8 px-8">
                        <MegaMenuGrid cols={5}>
                            {PROCEDURES.map((section) => (
                                <MegaMenuCategory key={section.title} {...section} />
                            ))}
                        </MegaMenuGrid>
                    </div>
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

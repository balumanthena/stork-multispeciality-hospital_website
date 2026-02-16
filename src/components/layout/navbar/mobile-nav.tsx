"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ChevronDown, Phone, X, Menu, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DEPARTMENTS, TREATMENTS, PROCEDURES, NAV_LINKS } from "./nav-data"
import { cn } from "@/lib/utils"
import { GroupedTreatmentCategory } from "@/lib/data/grouped-treatments"
import { Department } from "@/types"

export function MobileNav({ departments = [], groupedTreatments = [] }: { departments?: Department[], groupedTreatments?: GroupedTreatmentCategory[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

    const toggleMenu = (menu: string) => {
        setExpandedMenu(expandedMenu === menu ? null : menu)
    }

    // Dynamic departments mapping
    const dynamicDepartments = departments.length > 0 ? departments.map(d => ({
        title: d.name,
        href: `/departments/${d.slug}`,
        // icon: d.icon // Mobile menu doesn't show icons in list usually, so we can ignore or use if needed
    })) : DEPARTMENTS

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-md"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu Drawer */}
            {isOpen && (
                <div className="fixed inset-0 top-[76px] bg-white z-40 overflow-y-auto pb-20 animate-in slide-in-from-top-2 duration-200 border-t border-slate-100">
                    <div className="flex flex-col p-6 space-y-4">

                        {/* Static Links Top */}
                        {NAV_LINKS.slice(0, 2).map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-3 text-[15px] font-medium text-slate-800 border-b border-slate-100 active:bg-slate-50"
                            >
                                {link.title}
                            </Link>
                        ))}

                        {/* Accordion: Departments */}
                        <div>
                            <button
                                onClick={() => toggleMenu("departments")}
                                className="w-full flex items-center justify-between px-4 py-3 text-[15px] font-medium text-slate-800 border-b border-slate-100 active:bg-slate-50"
                            >
                                Departments <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", expandedMenu === "departments" && "rotate-180 text-[var(--color-primary)]")} />
                            </button>
                            {expandedMenu === "departments" && (
                                <div className="bg-slate-50 px-4 py-3 space-y-2 rounded-b-lg">
                                    <Link
                                        href="/departments"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
                                    >
                                        View All Departments →
                                    </Link>
                                    {dynamicDepartments.map(dept => (
                                        <Link
                                            key={dept.title}
                                            href={dept.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-4 py-2 text-sm text-slate-600 hover:text-[var(--color-primary)]"
                                        >
                                            {dept.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Accordion: Treatments */}
                        <div>
                            <button
                                onClick={() => toggleMenu("treatments")}
                                className="w-full flex items-center justify-between px-4 py-3 text-[15px] font-medium text-slate-800 border-b border-slate-100 active:bg-slate-50"
                            >
                                Treatments <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", expandedMenu === "treatments" && "rotate-180 text-[var(--color-primary)]")} />
                            </button>
                            {expandedMenu === "treatments" && (
                                <div className="bg-slate-50 px-4 py-4 space-y-6 rounded-b-lg">
                                    {(groupedTreatments.length > 0 ? groupedTreatments : TREATMENTS).map(section => (
                                        <div key={section.title} className="space-y-2">
                                            <h5 className="px-4 text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">{section.title}</h5>
                                            {section.items.map(item => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block px-4 py-1.5 text-sm text-slate-600 hover:text-[var(--color-primary)]"
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Accordion: Procedures */}
                        <div>
                            <button
                                onClick={() => toggleMenu("procedures")}
                                className="w-full flex items-center justify-between px-4 py-3 text-[15px] font-medium text-slate-800 border-b border-slate-100 active:bg-slate-50"
                            >
                                Procedures <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", expandedMenu === "procedures" && "rotate-180 text-[var(--color-primary)]")} />
                            </button>
                            {expandedMenu === "procedures" && (
                                <div className="bg-slate-50 px-4 py-4 space-y-6 rounded-b-lg">
                                    {PROCEDURES.map(section => (
                                        <div key={section.title} className="space-y-2">
                                            <h5 className="px-4 text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">{section.title}</h5>
                                            {section.items.map(item => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block px-4 py-1.5 text-sm text-slate-600 hover:text-[var(--color-primary)]"
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Static Links Bottom */}
                        <Link
                            href="/doctors"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-[15px] font-medium text-slate-800 border-b border-slate-100 active:bg-slate-50"
                        >
                            Doctors
                        </Link>
                        <Link
                            href="/blog"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-[15px] font-medium text-slate-800 border-b border-slate-100 active:bg-slate-50"
                        >
                            Blogs
                        </Link>


                        <div className="pt-6 space-y-3 px-2">
                            <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 gap-2 rounded-full h-12 text-base font-semibold shadow-md">
                                <Calendar className="w-5 h-5" /> Book Appointment
                            </Button>
                            <a href="tel:1066" className="flex items-center justify-center w-full gap-2 rounded-full h-12 text-base font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-colors">
                                <Phone className="w-5 h-5 text-slate-400" /> Emergency: <span className="font-bold">1066</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

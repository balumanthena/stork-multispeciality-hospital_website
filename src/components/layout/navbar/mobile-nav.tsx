"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Phone, X, Menu, Calendar, BookOpen, PlayCircle, Home, Users, Building2, Stethoscope, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DEPARTMENTS, TREATMENTS, PROCEDURES, NAV_LINKS } from "./nav-data"
import { cn } from "@/lib/utils"
import { GroupedTreatmentCategory } from "@/lib/data/grouped-treatments"
import { Department } from "@/types"

export function MobileNav({ departments = [], groupedTreatments = [] }: { departments?: Department[], groupedTreatments?: GroupedTreatmentCategory[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    const toggleMenu = (menu: string) => {
        setExpandedMenu(expandedMenu === menu ? null : menu)
    }

    // Dynamic departments mapping
    const dynamicDepartments = departments.length > 0 ? departments.map(d => ({
        title: d.name,
        href: `/departments/${d.slug}`,
    })) : DEPARTMENTS

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors active:scale-95"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Mobile Menu Drawer */}
            <div className={cn(
                "fixed inset-0 bg-white z-[100] transition-transform duration-300 ease-in-out transform flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {/* Header inside Drawer */}
                <div className="flex items-center justify-between px-6 h-[84px] border-b border-slate-100">
                    <span className="text-xl font-bold text-slate-900 tracking-tight">Menu</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8 pb-32 space-y-8">
                    {/* Primary Links Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 hover:bg-orange-50 hover:border-orange-100 transition-all group"
                        >
                            <Home className="w-6 h-6 mb-2 text-slate-400 group-hover:text-[#ff8202]" />
                            <span className="text-[13px] font-bold">Home</span>
                        </Link>
                        <Link
                            href="/doctors"
                            onClick={() => setIsOpen(false)}
                            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 hover:bg-orange-50 hover:border-orange-100 transition-all group"
                        >
                            <Users className="w-6 h-6 mb-2 text-slate-400 group-hover:text-[#ff8202]" />
                            <span className="text-[13px] font-bold">Doctors</span>
                        </Link>
                    </div>

                    {/* Accordion Sections */}
                    <div className="space-y-2">
                        {/* Departments */}
                        <div className="border-b border-slate-100">
                            <button
                                onClick={() => toggleMenu("departments")}
                                className="w-full flex items-center justify-between py-4 text-[16px] font-bold text-slate-800"
                            >
                                <span className="flex items-center gap-3"><Building2 className="w-5 h-5 text-slate-400" /> Departments</span>
                                <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", expandedMenu === "departments" && "rotate-180 text-[#ff8202]")} />
                            </button>
                            {expandedMenu === "departments" && (
                                <div className="pb-4 space-y-1 animate-in slide-in-from-top-2">
                                    <Link
                                        href="/services"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-8 py-2 text-sm font-bold text-[#ff8202]"
                                    >
                                        View All Departments →
                                    </Link>
                                    {dynamicDepartments.slice(0, 8).map(dept => (
                                        <Link
                                            key={dept.title}
                                            href={dept.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-8 py-2 text-sm text-slate-600 active:text-[#ff8202]"
                                        >
                                            {dept.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Treatments */}
                        <div className="border-b border-slate-100">
                            <button
                                onClick={() => toggleMenu("treatments")}
                                className="w-full flex items-center justify-between py-4 text-[16px] font-bold text-slate-800"
                            >
                                <span className="flex items-center gap-3"><Stethoscope className="w-5 h-5 text-slate-400" /> Treatments</span>
                                <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", expandedMenu === "treatments" && "rotate-180 text-[#ff8202]")} />
                            </button>
                            {expandedMenu === "treatments" && (
                                <div className="pb-4 space-y-4 animate-in slide-in-from-top-2">
                                    <Link
                                        href="/treatments"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-8 py-2 text-sm font-bold text-[#ff8202]"
                                    >
                                        View All Treatments →
                                    </Link>
                                    {(groupedTreatments.length > 0 ? groupedTreatments : TREATMENTS).slice(0, 3).map(section => (
                                        <div key={section.title} className="space-y-1">
                                            <h5 className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">{section.title}</h5>
                                            {section.items.slice(0, 4).map(item => (
                                                <Link
                                                    key={item.title}
                                                    href={`/treatments/${item.href.split("/").pop()}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block px-8 py-1.5 text-sm text-slate-600"
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Procedures */}
                        <div className="border-b border-slate-100">
                            <button
                                onClick={() => toggleMenu("procedures")}
                                className="w-full flex items-center justify-between py-4 text-[16px] font-bold text-slate-800"
                            >
                                <span className="flex items-center gap-3"><Scissors className="w-5 h-5 text-slate-400" /> Procedures</span>
                                <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", expandedMenu === "procedures" && "rotate-180 text-[#ff8202]")} />
                            </button>
                            {expandedMenu === "procedures" && (
                                <div className="pb-4 space-y-1 animate-in slide-in-from-top-2">
                                    <Link
                                        href="/procedures"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-8 py-2 text-sm font-bold text-[#ff8202]"
                                    >
                                        View All Procedures →
                                    </Link>
                                    {PROCEDURES.slice(0, 2).map(section => (
                                        <div key={section.title} className="space-y-1 mt-3">
                                            <h5 className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">{section.title}</h5>
                                            {section.items.slice(0, 4).map(item => (
                                                <Link
                                                    key={item.title}
                                                    href={`/procedures/${item.href.split("/").pop()}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block px-8 py-1.5 text-sm text-slate-600"
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Secondary Links List */}
                    <div className="space-y-4">
                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between p-4 rounded-xl border border-slate-100 text-slate-700"
                        >
                            <span className="font-bold text-[15px]">About Hospital</span>
                            <ChevronDown className="w-4 h-4 -rotate-90 text-slate-300" />
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between p-4 rounded-xl border border-slate-100 text-slate-700"
                        >
                            <span className="font-bold text-[15px]">Contact Us</span>
                            <ChevronDown className="w-4 h-4 -rotate-90 text-slate-300" />
                        </Link>
                    </div>
                </div>

                {/* Footer Fixed Action */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 space-y-4">
                    <Link href="/appointments" onClick={() => setIsOpen(false)}>
                        <Button className="w-full h-14 bg-[#ff8202] hover:bg-[#ff8202]/90 text-white rounded-2xl text-lg font-black shadow-xl shadow-orange-600/10">
                            <Calendar className="w-5 h-5 mr-2" /> Book Appointment
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


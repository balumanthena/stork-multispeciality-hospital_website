"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Phone, X, Menu, Calendar, BookOpen, PlayCircle, Home, Users, Building2, Stethoscope, Scissors, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DEPARTMENTS, TREATMENTS, PROCEDURES, NAV_LINKS } from "./nav-data"
import { cn } from "@/lib/utils"
import { GroupedTreatmentCategory } from "@/lib/data/grouped-treatments"
import { Department } from "@/types"
import { useSettings } from "@/providers/SettingsProvider"

export function MobileNav({ departments = [], groupedTreatments = [] }: { departments?: Department[], groupedTreatments?: GroupedTreatmentCategory[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
    const { settings } = useSettings()

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
        href: `/services/${d.slug}`,
    })) : DEPARTMENTS

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-all active:scale-95"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Mobile Menu Drawer */}
            <div className={cn(
                "fixed inset-0 bg-white z-[9999] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transform flex flex-col",
                isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            )}>
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 h-[72px] border-b border-slate-100 flex-shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <span className="text-lg font-bold text-slate-900 tracking-tight">Navigation</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors active:scale-90"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Primary CTA Section - Dominant at Top */}
                    <div className="p-6 pb-2">
                        <Link href="/appointments" onClick={() => setIsOpen(false)}>
                            <div className="w-full bg-[#ff8202] text-white p-5 rounded-2xl flex items-center justify-between shadow-[0_8px_20px_rgba(255,130,2,0.2)] active:scale-[0.98] transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black text-lg leading-none">Book Appointment</span>
                                        <span className="text-white/80 text-xs mt-1">Select your preferred doctor</span>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    </div>

                    <div className="p-6 space-y-10">
                        {/* Section 1: Services & Expertise */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ff8202]" />
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Services & Expertise</h4>
                            </div>
                            
                            <div className="space-y-3">
                                {/* Departments Accordion Card */}
                                <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden transition-all">
                                    <button
                                        onClick={() => toggleMenu("departments")}
                                        className={cn(
                                            "w-full flex items-center justify-between p-4 text-[15px] font-bold transition-all active:bg-slate-50",
                                            expandedMenu === "departments" ? "text-[#ff8202]" : "text-slate-700"
                                        )}
                                    >
                                        <span className="flex items-center gap-3"><Building2 className="w-5 h-5 opacity-60" /> Departments</span>
                                        <ChevronDown className={cn("w-5 h-5 opacity-30 transition-transform duration-300", expandedMenu === "departments" && "rotate-180 opacity-100")} />
                                    </button>
                                    {expandedMenu === "departments" && (
                                        <div className="px-4 pb-4 space-y-1 bg-slate-50/50 border-t border-slate-50 animate-in slide-in-from-top-2">
                                            <Link href="/services" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-8 py-3 text-[13px] font-bold text-[#ff8202]">
                                                View All Departments <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                            {dynamicDepartments.slice(0, 8).map(dept => (
                                                <Link key={dept.title} href={dept.href} onClick={() => setIsOpen(false)} className="block px-8 py-2.5 text-[14px] text-slate-600 hover:text-[#ff8202] active:px-9 transition-all">
                                                    {dept.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Treatments Accordion Card */}
                                <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden transition-all">
                                    <button
                                        onClick={() => toggleMenu("treatments")}
                                        className={cn(
                                            "w-full flex items-center justify-between p-4 text-[15px] font-bold transition-all active:bg-slate-50",
                                            expandedMenu === "treatments" ? "text-[#ff8202]" : "text-slate-700"
                                        )}
                                    >
                                        <span className="flex items-center gap-3"><Stethoscope className="w-5 h-5 opacity-60" /> Treatments</span>
                                        <ChevronDown className={cn("w-5 h-5 opacity-30 transition-transform duration-300", expandedMenu === "treatments" && "rotate-180 opacity-100")} />
                                    </button>
                                    {expandedMenu === "treatments" && (
                                        <div className="px-4 pb-4 space-y-4 bg-slate-50/50 border-t border-slate-50 animate-in slide-in-from-top-2">
                                            <Link href="/treatments" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-8 py-3 text-[13px] font-bold text-[#ff8202]">
                                                View All Treatments <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                            {(groupedTreatments.length > 0 ? groupedTreatments : TREATMENTS).slice(0, 3).map(section => (
                                                <div key={section.title} className="space-y-1">
                                                    <h5 className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">{section.title}</h5>
                                                    {section.items.slice(0, 4).map(item => (
                                                        <Link key={item.title} href={`/treatments/${item.href.split("/").pop()}`} onClick={() => setIsOpen(false)} className="block px-8 py-2 text-[14px] text-slate-600 active:px-9 transition-all">
                                                            {item.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Doctors Card */}
                                <Link href="/doctors" onClick={() => setIsOpen(false)}>
                                    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between active:bg-slate-50 transition-all active:scale-[0.99]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#ff8202]">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-slate-700">Our Doctors</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 -rotate-90 opacity-20" />
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Section 2: Contact & Information */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ff8202]" />
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact & Information</h4>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <Link href="/about" onClick={() => setIsOpen(false)}>
                                    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between active:bg-slate-50 transition-all">
                                        <div className="flex items-center gap-3">
                                            <Home className="w-5 h-5 text-slate-400" />
                                            <span className="text-[14px] font-bold text-slate-600">About Hospital</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 opacity-10" />
                                    </div>
                                </Link>
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between active:bg-slate-50 transition-all">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-slate-400" />
                                            <span className="text-[14px] font-bold text-slate-600">Contact & Locations</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 opacity-10" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fixed Footer with Help Line */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Emergency Help</span>
                        <a href={`tel:${settings?.emergency_number || "+91 99999 88888"}`} className="text-lg font-black text-slate-900">{settings?.emergency_number || "+91 99999 88888"}</a>
                    </div>
                    <Link href={`tel:${settings?.emergency_number || "+91 99999 88888"}`}>
                        <div className="w-12 h-12 rounded-full bg-[#ff8202] flex items-center justify-center text-white shadow-lg active:scale-90 transition-all">
                            <Phone className="w-5 h-5" />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Global Overlay for when menu is open */}
            {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]" onClick={() => setIsOpen(false)} />}
        </div>
    )
}




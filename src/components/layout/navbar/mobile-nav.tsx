"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Phone, X, Menu, Calendar, BookOpen, PlayCircle, Home, Users, Building2, Stethoscope, Scissors, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react"
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

    const socialLinks = [
        { url: settings?.facebook_url, icon: Facebook },
        { url: settings?.instagram_url, icon: Instagram },
        { url: settings?.linkedin_url, icon: Linkedin },
        { url: settings?.youtube_url, icon: Youtube },
        { url: settings?.whatsapp_url, icon: MessageCircle },
    ].filter(link => link.url)

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
                "fixed inset-0 bg-white z-[9999] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {/* Header inside Drawer */}
                <div className="flex items-center justify-between px-6 h-[84px] border-b border-slate-100 flex-shrink-0">
                    <span className="text-xl font-black text-[#0F172A] tracking-tight uppercase">Menu</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 flex items-center justify-center text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8 pb-32 space-y-10 custom-scrollbar">
                    {/* Primary Links Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 active:scale-95 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-[#ff8202] shadow-sm">
                                <Home className="w-5 h-5" />
                            </div>
                            <span className="text-[14px] font-bold">Home</span>
                        </Link>
                        <Link
                            href="/doctors"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 active:scale-95 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-[#ff8202] shadow-sm">
                                <Users className="w-5 h-5" />
                            </div>
                            <span className="text-[14px] font-bold">Doctors</span>
                        </Link>
                    </div>

                    {/* Navigation Accordion */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Services & Expertise</h4>
                        <div className="space-y-1">
                            {/* Departments */}
                            <div className="rounded-2xl border border-slate-100 overflow-hidden">
                                <button
                                    onClick={() => toggleMenu("departments")}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 text-[15px] font-bold transition-colors",
                                        expandedMenu === "departments" ? "bg-orange-50 text-[#ff8202]" : "text-slate-700 bg-white"
                                    )}
                                >
                                    <span className="flex items-center gap-3"><Building2 className="w-5 h-5 opacity-70" /> Departments</span>
                                    <ChevronDown className={cn("w-5 h-5 opacity-40 transition-transform", expandedMenu === "departments" && "rotate-180 opacity-100")} />
                                </button>
                                {expandedMenu === "departments" && (
                                    <div className="px-4 pb-4 space-y-1 bg-orange-50/30 animate-in slide-in-from-top-2">
                                        <Link href="/services" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-sm font-bold text-[#ff8202] hover:underline">View All →</Link>
                                        {(departments.length > 0 ? departments : DEPARTMENTS).slice(0, 10).map(dept => (
                                            <Link key={dept.title || dept.name} href={`/services/${dept.slug}`} onClick={() => setIsOpen(false)} className="block px-8 py-2 text-sm text-slate-600">
                                                {dept.title || dept.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Treatments */}
                            <div className="rounded-2xl border border-slate-100 overflow-hidden">
                                <button
                                    onClick={() => toggleMenu("treatments")}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 text-[15px] font-bold transition-colors",
                                        expandedMenu === "treatments" ? "bg-orange-50 text-[#ff8202]" : "text-slate-700 bg-white"
                                    )}
                                >
                                    <span className="flex items-center gap-3"><Stethoscope className="w-5 h-5 opacity-70" /> Treatments</span>
                                    <ChevronDown className={cn("w-5 h-5 opacity-40 transition-transform", expandedMenu === "treatments" && "rotate-180 opacity-100")} />
                                </button>
                                {expandedMenu === "treatments" && (
                                    <div className="px-4 pb-4 space-y-4 bg-orange-50/30 animate-in slide-in-from-top-2">
                                        <Link href="/treatments" onClick={() => setIsOpen(false)} className="block px-8 py-2 text-sm font-bold text-[#ff8202] hover:underline">View All →</Link>
                                        {(groupedTreatments.length > 0 ? groupedTreatments : TREATMENTS).slice(0, 3).map(section => (
                                            <div key={section.title} className="space-y-1">
                                                <h5 className="px-8 text-[9px] font-black text-slate-400 uppercase tracking-widest">{section.title}</h5>
                                                {section.items.slice(0, 4).map(item => (
                                                    <Link key={item.title} href={`/treatments/${item.href.split("/").pop()}`} onClick={() => setIsOpen(false)} className="block px-8 py-1.5 text-sm text-slate-600">
                                                        {item.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact & Info */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Contact & Information</h4>
                        <div className="space-y-3">
                            <Link href="/about" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 text-slate-700 active:bg-slate-100 transition-colors">
                                <Building2 className="w-5 h-5 text-slate-400" />
                                <span className="font-bold text-[14px]">About Stork Hospital</span>
                            </Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 text-slate-700 active:bg-slate-100 transition-colors">
                                <Phone className="w-5 h-5 text-slate-400" />
                                <span className="font-bold text-[14px]">Contact & Locations</span>
                            </Link>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="pt-4 flex justify-center gap-4">
                        {socialLinks.map((social, i) => (
                            <Link key={i} href={social.url!} target="_blank" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#ff8202] hover:bg-orange-50 transition-all border border-slate-100">
                                <social.icon className="w-5 h-5" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer Fixed Action */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 backdrop-blur-lg bg-white/90">
                    <Link href="/appointments" onClick={() => setIsOpen(false)}>
                        <Button className="w-full h-14 bg-[#ff8202] hover:bg-[#ff8202]/90 text-white rounded-2xl text-lg font-black shadow-xl shadow-orange-600/20 active:scale-[0.98] transition-all">
                            <Calendar className="w-5 h-5 mr-3" /> Book Appointment
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Backdrop for Header (when menu is open) */}
            {isOpen && <div className="fixed inset-0 bg-white z-[9998]" />}
        </div>
    )
}



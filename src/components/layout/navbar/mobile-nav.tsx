"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Phone, X, Menu, Calendar, Building2, Stethoscope, Users, Info, MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DEPARTMENTS, TREATMENTS, NAV_LINKS } from "./nav-data"
import { cn } from "@/lib/utils"
import { GroupedTreatmentCategory } from "@/lib/data/grouped-treatments"
import { Department } from "@/types"
import { useSettings } from "@/providers/SettingsProvider"

export function MobileNav({ departments = [], groupedTreatments = [] }: { departments?: Department[], groupedTreatments?: GroupedTreatmentCategory[] }) {
    const [isOpen, setIsOpen] = useState(false)
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

    // Dynamic departments mapping
    const dynamicDepartments = departments.length > 0 ? departments.map(d => ({
        title: d.name,
        href: `/services/${d.slug}`,
    })) : DEPARTMENTS

    const MenuCard = ({ href, icon: Icon, label, onClick }: { href: string, icon: any, label: string, onClick?: () => void }) => (
        <Link 
            href={href} 
            onClick={onClick}
            className="flex items-center justify-between px-4 py-4 rounded-xl bg-white border border-gray-100 shadow-sm active:scale-95 transition-all duration-200 group"
        >
            <div className="flex items-center gap-4">
                <div className="bg-gray-50 p-2 rounded-lg text-slate-400 group-hover:text-[#ff8202] group-hover:bg-orange-50 transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
                <span className="text-[15px] font-medium text-slate-700">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#ff8202] transition-colors" />
        </Link>
    )

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-all active:scale-95"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Backdrop Fade */}
            <div 
                className={cn(
                    "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9998] transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Full-Screen Slide-In Menu */}
            <div className={cn(
                "fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-white z-[9999] transition-transform duration-300 ease-in-out transform flex flex-col shadow-2xl",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {/* Header Section */}
                <div className="flex items-center justify-between px-6 h-[72px] border-b border-gray-100 flex-shrink-0">
                    <span className="text-lg font-bold text-slate-900 tracking-tight">Stork Hospital</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 custom-scrollbar">
                    {/* SECTION 1: SERVICES */}
                    <div className="space-y-3">
                        <h4 className="text-xs text-gray-400 font-bold uppercase tracking-widest px-1">Services</h4>
                        <div className="space-y-3">
                            <MenuCard 
                                href="/services" 
                                icon={Building2} 
                                label="Departments" 
                                onClick={() => setIsOpen(false)} 
                            />
                            <MenuCard 
                                href="/treatments" 
                                icon={Stethoscope} 
                                label="Treatments" 
                                onClick={() => setIsOpen(false)} 
                            />
                            <MenuCard 
                                href="/doctors" 
                                icon={Users} 
                                label="Our Doctors" 
                                onClick={() => setIsOpen(false)} 
                            />
                        </div>
                    </div>

                    {/* SECTION 2: INFORMATION */}
                    <div className="space-y-3">
                        <h4 className="text-xs text-gray-400 font-bold uppercase tracking-widest px-1">Information</h4>
                        <div className="space-y-3">
                            <MenuCard 
                                href="/about" 
                                icon={Info} 
                                label="About Hospital" 
                                onClick={() => setIsOpen(false)} 
                            />
                            <MenuCard 
                                href="/contact" 
                                icon={MapPin} 
                                label="Contact & Locations" 
                                onClick={() => setIsOpen(false)} 
                            />
                        </div>
                    </div>

                    {/* Emergency Help Line */}
                    <div className="mt-8 p-5 rounded-2xl bg-orange-50/50 border border-orange-100">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#ff8202] flex items-center justify-center text-white">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">Emergency Help</span>
                                <a href={`tel:${settings?.emergency_number || "+91 99999 88888"}`} className="text-lg font-black text-slate-900 tracking-tight">
                                    {settings?.emergency_number || "+91 99999 88888"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Bottom CTA */}
                <div className="p-4 bg-white border-t border-gray-100 pb-8">
                    <Link href="/appointments" onClick={() => setIsOpen(false)}>
                        <Button className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-lg font-bold shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all">
                            <Calendar className="w-5 h-5 mr-3" /> Book Appointment
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}





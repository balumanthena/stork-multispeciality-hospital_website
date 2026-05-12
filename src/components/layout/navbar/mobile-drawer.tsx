"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { ChevronRight, ChevronDown, Phone, X, Menu, Calendar, Building2, Stethoscope, Users, Info, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DEPARTMENTS, TREATMENTS } from "./nav-data"
import { cn } from "@/lib/utils"
import { GroupedTreatmentCategory } from "@/lib/data/grouped-treatments"
import { MEGA_MENU_TREATMENTS } from "@/lib/data/mega-menu-treatments"
import { Department } from "@/types"
import { useSettings } from "@/providers/SettingsProvider"

export function MobileDrawer({ departments = [], groupedTreatments = [] }: { departments?: Department[], groupedTreatments?: GroupedTreatmentCategory[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false)
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
    const { settings } = useSettings()

    const TARGET_CATEGORIES = [
        "Pain Management",
        "Gynecology & Obstetrics",
        "Orthopedics & Trauma",
        "General Medicine",
        "General Surgery"
    ]

    const displayTreatments = TARGET_CATEGORIES.map(targetTitle => {
        return MEGA_MENU_TREATMENTS.find(cat => cat.title.toLowerCase() === targetTitle.toLowerCase())
    }).filter(Boolean) as GroupedTreatmentCategory[]

    useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

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

    const menuContent = (
        <>
            {/* Backdrop Fade */}
            <div 
                className={cn(
                    "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[10000] transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Full-Screen Slide-In Menu */}
            <div className={cn(
                "fixed top-0 right-0 bottom-0 w-[85%] max-w-[420px] bg-white z-[10001] transition-transform duration-300 ease-in-out transform flex flex-col shadow-2xl",
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
                            {/* Treatments Accordion */}
                            <div className="flex flex-col rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
                                <button
                                    onClick={() => setIsTreatmentsOpen(!isTreatmentsOpen)}
                                    className="flex items-center justify-between px-4 py-4 active:bg-slate-50 transition-colors w-full group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gray-50 p-2 rounded-lg text-slate-400 group-hover:text-[#ff8202] group-hover:bg-orange-50 transition-colors">
                                            <Stethoscope className="w-5 h-5" />
                                        </div>
                                        <span className="text-[15px] font-medium text-slate-700">Treatments</span>
                                    </div>
                                    <motion.div animate={{ rotate: isTreatmentsOpen ? 180 : 0 }}>
                                        <ChevronDown className="w-4 h-4 text-slate-400" />
                                    </motion.div>
                                </button>
                                
                                <AnimatePresence>
                                    {isTreatmentsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-slate-50 border-t border-slate-100"
                                        >
                                            <div className="py-2 px-3 space-y-1">
                                                {displayTreatments.map((category, catIdx) => (
                                                    <div key={`${category.title}-${catIdx}`} className="flex flex-col">
                                                        <button
                                                            onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
                                                            className="flex items-center justify-between p-3 rounded-lg text-left text-[14px] font-bold text-slate-700 hover:bg-white transition-colors"
                                                        >
                                                            <span>{category.title}</span>
                                                            <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", expandedCategory === category.title && "rotate-180")} />
                                                        </button>
                                                        
                                                        <AnimatePresence>
                                                            {expandedCategory === category.title && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden"
                                                                 >
                                                                    <ul className="py-1 px-4 space-y-2 mb-2">
                                                                        {category.items.slice(0, 8).map((item, itemIdx) => {
                                                                            const slug = typeof item.href === 'string' ? item.href.split("/").pop() : "";
                                                                            return (
                                                                                <li key={`${slug}-${itemIdx}`}>
                                                                                    <Link
                                                                                        href={`/treatments/${slug}`}
                                                                                        onClick={() => setIsOpen(false)}
                                                                                        className="block text-[14px] text-slate-500 py-1 hover:text-[#ff8202] hover:pl-1 transition-all"
                                                                                    >
                                                                                        {item.title}
                                                                                    </Link>
                                                                                </li>
                                                                            )
                                                                        })}
                                                                        <li>
                                                                            <Link
                                                                                href="/treatments"
                                                                                onClick={() => setIsOpen(false)}
                                                                                className="block text-[13px] font-bold text-[#ff8202] mt-2 py-1 uppercase tracking-wider"
                                                                            >
                                                                                View All →
                                                                            </Link>
                                                                        </li>
                                                                    </ul>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ))}
                                                <Link 
                                                    href="/treatments"
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex justify-center items-center p-3 text-[13px] font-bold text-slate-500 hover:text-[#ff8202] mt-2 border-t border-slate-200"
                                                >
                                                    Explore All Categories
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
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
                                <a href={`tel:${settings?.emergency_number || "+91 76108 10819"}`} className="text-lg font-black text-slate-900 tracking-tight">
                                    {settings?.emergency_number || "+91 76108 10819"}
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
        </>
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

            {mounted && createPortal(menuContent, document.body)}
        </div>
    )
}





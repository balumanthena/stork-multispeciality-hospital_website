"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Stethoscope, Phone, MessageCircle, MoreHorizontal, Building2, User2, BookOpen, MapPin, Contact, Activity, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { LocationMap } from "./location-map"

export function MobileBottomNav() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [view, setView] = useState<"menu" | "location">("menu")

    // Never render the public bottom nav on admin routes
    if (pathname.startsWith('/admin')) return null

    const navItems = [
        {
            label: "Appointment",
            icon: Calendar,
            href: "/appointments",
            action: null
        },
        {
            label: "Treatments",
            icon: Stethoscope,
            href: "/treatments",
            action: null
        },

        {
            label: "WhatsApp",
            icon: MessageCircle,
            href: "https://wa.me/917610810819", // Updated number
            action: null
        }
    ]

    const exploreLinks = [
        { label: "Departments", icon: Building2, href: "/services" },
        { label: "Doctors", icon: User2, href: "/doctors" },
        { label: "Articles", icon: BookOpen, href: "/insights/articles" },
        { label: "Procedures", icon: Activity, href: "/procedures" },
        { label: "About Us", icon: Info, href: "/about" },
        { label: "Contact Us", icon: Phone, href: "/contact" },
    ];

    return (
        <>
            {/* Spacer to prevent content overlap at the bottom of pages */}
            <div className="h-[64px] md:hidden" />

            {/* Bottom Nav Bar - Truly Full Width Viewport Spanning */}
            <nav
                className={cn(
                    "fixed bottom-0 left-0 w-[100vw] z-50 bg-white/90 backdrop-blur-md border-t border-slate-100 md:hidden pb-safe"
                )}
            >
                <div className="flex items-center justify-around h-16 w-full">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "relative flex flex-col items-center justify-center flex-1 h-full min-h-[48px] transition-all duration-300 active:scale-95 group text-[#ff8202]",
                                    "hover:drop-shadow-[0_0_8px_rgba(255,130,2,0.8)]",
                                    isActive && "drop-shadow-[0_0_8px_rgba(255,130,2,0.8)]"
                                )}
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <item.icon
                                        className={cn("w-5 h-5 transition-transform", isActive ? "scale-110" : "group-hover:scale-110")}
                                        strokeWidth={isActive ? 2.5 : 2}
                                    />
                                    <span className="text-[10px] font-medium tracking-tight">
                                        {item.label}
                                    </span>
                                </div>
                                {isActive && (
                                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#ff8202] animate-in fade-in zoom-in duration-300 shadow-[0_0_6px_rgba(255,130,2,1)]" />
                                )}
                            </Link>
                        )
                    })}

                    {/* "More" Sheet Trigger */}
                    <Sheet open={isOpen} onOpenChange={(open) => {
                        setIsOpen(open)
                        if (!open) setTimeout(() => setView("menu"), 300)
                    }}>
                        <SheetTrigger asChild>
                            <button className="flex flex-col items-center justify-center flex-1 h-full min-h-[48px] transition-all duration-300 active:scale-95 text-[#ff8202] group hover:drop-shadow-[0_0_8px_rgba(255,130,2,0.8)]">
                                <div className="flex flex-col items-center gap-1">
                                    <MoreHorizontal className="w-5 h-5 transition-transform group-hover:scale-110 group-active:scale-110" />
                                    <span className="text-[10px] font-medium tracking-tight">More</span>
                                </div>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="rounded-t-3xl pb-8 z-[100]">
                            {view === "menu" ? (
                                <>
                                    <SheetHeader className="mb-6 text-left">
                                        <SheetTitle className="text-xl font-bold text-slate-900">Explore Stork Hospital</SheetTitle>
                                    </SheetHeader>
                                    <div className="grid grid-cols-3 gap-6">
                                        {exploreLinks.map((item: any, i: number) => (
                                            <Link
                                                key={i}
                                                href={item.href!}
                                                onClick={() => setIsOpen(false)}
                                                className="flex flex-col items-center gap-3 active:scale-95 transition-transform group hover:drop-shadow-[0_0_8px_rgba(255,130,2,0.8)]"
                                            >
                                                <div className="w-14 h-14 rounded-2xl bg-[#ff8202]/10 border border-[#ff8202]/20 flex items-center justify-center text-[#ff8202] transition-colors shadow-sm">
                                                    <item.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                                                </div>
                                                <span className="text-xs font-medium text-[#ff8202] text-center">{item.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-slate-100">
                                        <Link href="/appointments" onClick={() => setIsOpen(false)} className="w-full block">
                                            <Button className="w-full bg-[#ff8202] hover:bg-[#e07200] text-white rounded-xl py-6 font-bold text-lg">
                                                Book an Appointment
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <LocationMap onBack={() => setView("menu")} />
                            )}
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </>
    )
}

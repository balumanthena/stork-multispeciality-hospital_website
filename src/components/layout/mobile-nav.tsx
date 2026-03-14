"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Stethoscope, Phone, MessageCircle, MoreHorizontal, Building2, User2, BookOpen, MapPin, Contact } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { LocationMap } from "./location-map"

export function MobileNav() {
    const pathname = usePathname()
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
            href: "https://wa.me/919999999999", // Replace with actual number
            action: null
        }
    ]

    const exploreLinks = [
        { label: "Departments", icon: Building2, href: "/services" },
        { label: "Doctors", icon: User2, href: "/search" }, // Assuming User2 is intended as Users is not imported
        { label: "Blogs", icon: BookOpen, href: "/blog" },
        { label: "Locations", icon: MapPin, href: "/contact" },
        { label: "Contact Us", icon: Phone, href: "/contact" },
    ];

    return (
        <>
            {/* Spacer to prevent content overlap */}
            <div className="h-16 md:hidden" />

            {/* Bottom Nav Bar */}
            <nav
                className={cn(
                    "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden pb-safe"
                )}
            >
                <div className="flex items-center justify-around h-16 w-full max-w-md mx-auto px-1">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center w-full h-full py-1 active:scale-95 transition-transform",
                                    isActive ? "text-orange-500" : "text-slate-500 hover:text-slate-900"
                                )}
                            >
                                <item.icon
                                    className={cn("w-6 h-6 mb-1", isActive && "fill-current/20")}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                <span className="text-[10px] font-medium leading-none">{item.label}</span>
                            </Link>
                        )
                    })}

                    {/* "More" Sheet Trigger */}
                    <Sheet onOpenChange={(open) => {
                        if (!open) setTimeout(() => setView("menu"), 300)
                    }}>
                        <SheetTrigger asChild>
                            <button className="flex flex-col items-center justify-center w-full h-full py-1 active:scale-95 transition-transform text-slate-500 hover:text-slate-900">
                                <MoreHorizontal className="w-6 h-6 mb-1" />
                                <span className="text-[10px] font-medium leading-none">More</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="rounded-t-3xl pb-8">
                            {view === "menu" ? (
                                <>
                                    <SheetHeader className="mb-6 text-left">
                                        <SheetTitle className="text-xl font-bold text-slate-900">Explore Stork Hospital</SheetTitle>
                                    </SheetHeader>
                                    <div className="grid grid-cols-3 gap-6">
                                        {exploreLinks.map((item: any, i: number) => {
                                            if (item.action) {
                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            item.action();
                                                        }}
                                                        className="flex flex-col items-center gap-3 active:scale-95 transition-transform group"
                                                    >
                                                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-100 transition-colors shadow-sm">
                                                            <item.icon className="w-6 h-6" />
                                                        </div>
                                                        <span className="text-xs font-medium text-slate-600 text-center">{item.label}</span>
                                                    </button>
                                                )
                                            }
                                            return (
                                                <Link
                                                    key={i}
                                                    href={item.href!}
                                                    className="flex flex-col items-center gap-3 active:scale-95 transition-transform group"
                                                >
                                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-100 transition-colors shadow-sm">
                                                        <item.icon className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-600 text-center">{item.label}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-slate-100">
                                        <Link href="/appointments" className="w-full block">
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

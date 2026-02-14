"use client"

import * as React from "react"
import Link from "next/link"
import { Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DesktopNav } from "./navbar/desktop-nav"
import { MobileNav } from "./navbar/mobile-nav"

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out border-b border-slate-100 bg-white/95 backdrop-blur-sm",
                isScrolled ? "h-[80px] shadow-sm" : "h-[80px]"
            )}
        >
            <div className="container max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-50 group">
                    <span className="font-bold text-slate-900 text-3xl tracking-tight leading-none group-hover:text-[var(--color-primary)] transition-colors">
                        Stork<span className="text-[var(--color-primary)]">.</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <DesktopNav />

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Emergency - Secondary Blue (#3E7DCA) */}
                    <a href="tel:1066" className="flex items-center gap-3 group px-2">
                        <div className="bg-blue-50 text-[var(--color-secondary)] w-9 h-9 rounded-full flex items-center justify-center transition-colors group-hover:bg-[var(--color-secondary)] group-hover:text-white">
                            <Phone className="w-4 h-4 fill-current" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none mb-0.5">Emergency</span>
                            <span className="text-lg font-bold text-slate-900 leading-none group-hover:text-[var(--color-secondary)] transition-colors">1066</span>
                        </div>
                    </a>

                    {/* CTA - Primary Orange (#FF8202) */}
                    <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white rounded-full px-6 py-2.5 h-auto text-base font-semibold shadow-md shadow-orange-500/10 transition-transform hover:-translate-y-0.5">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                    </Button>
                </div>

                {/* Mobile Navigation Toggle */}
                <MobileNav />
            </div>
        </header>
    )
}


"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DesktopNav } from "./navbar/desktop-nav"
import { MobileNav } from "./navbar/mobile-nav"
import { useSettings } from "@/providers/SettingsProvider"

export interface HeaderProps {
    departments?: any[] // Todo: Import Department type
}

export function Header({ departments = [] }: HeaderProps) {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const { settings } = useSettings()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Default emergency number if not yet loaded or set
    const emergencyNumber = settings?.emergency_number || "1066"

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out border-b border-[#eaeef3] bg-white",
                isScrolled ? "h-[76px] shadow-sm" : "h-[76px]"
            )}
        >
            <div className="container max-w-[1440px] mx-auto px-10 h-full flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-50 group">
                    <Image
                        src="/images/c06d2292-c0f5-47ea-9456-7069e85be4bd_20260130_131840_0000.png"
                        alt={settings?.hospital_name || "Stork Hospital Logo"}
                        width={200}
                        height={56}
                        className="h-[52px] w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <DesktopNav departments={departments} />

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Emergency - Secondary Blue (#3E7DCA) */}
                    {/* Emergency Badge - Soft Gray Pill (#F1F5F9) */}
                    <a href={`tel:${emergencyNumber}`} className="flex items-center gap-3 px-4 py-2 bg-[#F1F5F9] rounded-full hover:bg-slate-200 transition-colors">
                        <Phone className="w-5 h-5 text-[#3E7DCA] fill-current" />
                        <div className="flex flex-col leading-none">
                            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Emergency</span>
                            <span className="text-base font-bold text-slate-900">{emergencyNumber}</span>
                        </div>
                    </a>

                    {/* CTA - Primary Orange (#FF8202) */}
                    <Button className="bg-[#FF8202] hover:bg-[#e67600] text-white rounded-lg px-6 h-[42px] text-[15px] font-semibold transition-colors shadow-none">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                    </Button>
                </div>

                {/* Mobile Navigation Toggle */}
                <MobileNav departments={departments} />
            </div>
        </header>
    )
}


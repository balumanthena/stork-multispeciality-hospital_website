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

import { Department } from "@/types"
import { GroupedTreatmentCategory } from "@/lib/data/grouped-treatments"

export interface HeaderProps {
    departments?: Department[]
    groupedTreatments?: GroupedTreatmentCategory[]
}

export function Header({ departments = [], groupedTreatments = [] }: HeaderProps) {
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
                <DesktopNav departments={departments} groupedTreatments={groupedTreatments} />

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Emergency - Secondary Blue (#3E7DCA) */}
                    {/* CTA - Primary Orange (#FF8202) */}
                    <Link href="/appointments">
                        <Button className="bg-[#FF8202] hover:bg-[#e67600] text-white rounded-lg px-6 h-[42px] text-[15px] font-semibold transition-colors shadow-none">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Appointment
                        </Button>
                    </Link>
                </div>

                {/* Mobile Navigation Toggle */}
                <MobileNav departments={departments} groupedTreatments={groupedTreatments} />
            </div>
        </header>
    )
}


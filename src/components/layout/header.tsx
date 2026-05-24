"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Calendar, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DesktopNav } from "./navbar/desktop-nav"
import { MobileDrawer } from "./navbar/mobile-drawer"
import { useSettings } from "@/providers/SettingsProvider"

import { Department } from "@/types"
import { GroupedTreatmentCategory } from "@/lib/data/grouped-treatments"
import { Container } from "@/components/layout/container"

export interface HeaderProps {
    departments?: Department[]
    groupedTreatments?: GroupedTreatmentCategory[]
}

export function Header({ departments = [], groupedTreatments = [] }: HeaderProps) {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const { settings } = useSettings()

    React.useEffect(() => {
        let ticking = false
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 40)
                    ticking = false
                })
                ticking = true
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            {/* Top Bar - Removed to prevent scroll flickering */}

            <header
                className={cn(
                    "sticky top-0 z-50 w-full h-[76px] transition-all duration-300 ease-in-out border-b bg-white/95 backdrop-blur-md",
                    isScrolled ? "shadow-md border-slate-200" : "border-[#eaeef3]"
                )}
            >
                <Container className="px-4 lg:px-6 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center flex-shrink-0 max-w-[140px] md:max-w-[160px] z-50 group">
                        <Image
                            src="/images/c06d2292-c0f5-47ea-9456-7069e85be4bd_20260130_131840_0000.png"
                            alt={settings?.hospital_name || "Stork Hospital Logo"}
                            width={220}
                            height={62}
                            className={cn(
                                "transition-transform duration-300 object-contain origin-left h-[48px]",
                                isScrolled ? "scale-90" : "scale-100"
                            )}
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex flex-1 justify-center items-center h-full">
                        <DesktopNav departments={departments} groupedTreatments={groupedTreatments} />
                    </div>

                    {/* Right Actions */}
                    <div className="hidden lg:flex items-center ml-auto pl-6">
                        <Link href="/appointments">
                            <Button className="bg-[#FF8202] hover:bg-[#e67600] text-white rounded-lg px-6 h-[44px] text-[15px] font-bold transition-all shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20 active:scale-[0.98]">
                                <Calendar className="w-4 h-4 mr-2" />
                                Book Appointment
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Navigation Toggle */}
                    <MobileDrawer departments={departments} groupedTreatments={groupedTreatments} />
                </Container>
            </header>
        </>
    )
}


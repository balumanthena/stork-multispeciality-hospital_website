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
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            {/* Top Bar - Removed to prevent scroll flickering */}

            <header
                className={cn(
                    "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out border-b bg-white/95 backdrop-blur-md",
                    isScrolled ? "h-[72px] shadow-md border-slate-200" : "h-[84px] border-[#eaeef3]"
                )}
            >
                <Container className="px-4 lg:px-10 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-50 group">
                        <Image
                            src="/images/c06d2292-c0f5-47ea-9456-7069e85be4bd_20260130_131840_0000.png"
                            alt={settings?.hospital_name || "Stork Hospital Logo"}
                            width={220}
                            height={62}
                            className={cn(
                                "transition-all duration-300 object-contain",
                                isScrolled ? "h-[44px]" : "h-[52px]"
                            )}
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <DesktopNav departments={departments} groupedTreatments={groupedTreatments} />

                    {/* Right Actions */}
                    <div className="hidden lg:flex items-center gap-6">
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


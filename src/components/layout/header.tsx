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
            {/* Top Bar - Hidden on Mobile, Hides on Scroll for Desktop */}
            <div className={cn(
                "w-full bg-[#f8fafc] border-b border-slate-200 py-2.5 hidden lg:block transition-all duration-300 overflow-hidden",
                isScrolled ? "h-0 py-0 border-none opacity-0" : "h-[40px]"
            )}>
                <Container className="px-10 flex justify-between items-center text-[13px] text-slate-600 font-medium tracking-wide">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="w-6 h-6 rounded-md bg-orange-50 flex items-center justify-center text-[#ff8202] group-hover:bg-[#ff8202] group-hover:text-white transition-colors">
                                <Phone className="w-3.5 h-3.5" />
                            </div>
                            <span>Emergency: <a href={`tel:${settings?.emergency_number || "+91 99999 88888"}`} className="text-slate-900 font-bold hover:text-[#ff8202] transition-colors">{settings?.emergency_number || "+91 99999 88888"}</a></span>
                        </div>
                        <div className="flex items-center gap-2 group">
                            <MapPin className="w-3.5 h-3.5 text-[#ff8202]" />
                            <span className="truncate max-w-[400px]">{settings?.address || "Survey No 14 & 15, NH44, Kompally, Hyderabad"}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 group">
                            <Clock className="w-3.5 h-3.5 text-[#ff8202]" />
                            <span>OP: 9:00 AM - 8:00 PM</span>
                        </div>
                    </div>
                </Container>
            </div>

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


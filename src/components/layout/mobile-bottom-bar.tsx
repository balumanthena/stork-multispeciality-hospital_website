"use client"

import Link from "next/link"
import { Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useSettings } from "@/providers/SettingsProvider"

export function MobileBottomBar() {
    const { settings } = useSettings()
    const emergencyNumber = settings?.emergency_number || "1066"

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-3 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] safe-area-bottom">
            <div className="flex gap-3">
                <a href={`tel:${emergencyNumber}`} className="flex-1">
                    <Button variant="outline" className="w-full rounded-full border-slate-300 text-slate-700 hover:bg-slate-50 h-11 font-semibold">
                        <Phone className="w-4 h-4 mr-2 text-red-600" />
                        Call {emergencyNumber}
                    </Button>
                </a>
                <Link href="/book-appointment" className="flex-[2]">
                    <Button className="w-full rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white h-11 font-bold shadow-lg shadow-orange-500/20">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                    </Button>
                </Link>
            </div>
        </div>
    )
}

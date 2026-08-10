"use client"

import Link from "next/link"
import { Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useSettings } from "@/providers/SettingsProvider"

export function MobileBottomBar() {
    const { settings } = useSettings()


    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-3 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] safe-area-bottom">
            <div className="flex gap-3">
                <Button asChild className="flex-[2] w-full rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white h-11 font-bold shadow-lg shadow-orange-500/20">
                    <Link href="/appointments">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                    </Link>
                </Button>
            </div>
        </div>
    )
}

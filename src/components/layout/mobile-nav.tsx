"use client"

import { Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileBottomBar() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 p-4 z-[60] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe">
            <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Call Now
                </Button>
                <Button variant="default" className="w-full gap-2">
                    <Calendar className="h-4 w-4" />
                    Book
                </Button>
            </div>
        </div>
    )
}

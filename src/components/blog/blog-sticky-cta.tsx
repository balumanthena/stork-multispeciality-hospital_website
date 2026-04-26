"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface BlogStickyCTAProps {
    text: string
    link: string
}

export function BlogStickyCTA({ text, link }: BlogStickyCTAProps) {
    if (!text || !link) return null

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:hidden bg-white/80 backdrop-blur-md border-t border-slate-200 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-full py-6 font-bold shadow-md shadow-orange-200">
                <Link href={link}>
                    {text} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
            </Button>
        </div>
    )
}

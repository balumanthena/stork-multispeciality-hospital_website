"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function TreatmentScrollspy() {
    const [activeId, setActiveId] = useState<string>("overview")

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: "-30% 0px -40% 0px", // Middle viewport focus
                threshold: 0
            }
        )

        const ids = ["overview", "conditions", "procedure", "benefits", "faq"]
        ids.forEach((id) => {
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => observer.disconnect()
    }, [])

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setActiveId(id)
        }
    }

    const navItems = [
        { id: "overview", label: "Overview" },
        { id: "conditions", label: "Conditions" },
        { id: "procedure", label: "Procedure Steps" },
        { id: "benefits", label: "Benefits" },
        { id: "faq", label: "FAQ" },
    ]

    return (
        <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff8202]" />
                Contents
            </h4>
            <nav className="flex flex-col gap-1 text-sm font-medium text-slate-500 border-l border-slate-200 ml-1 pl-4">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={cn(
                            "py-3 block relative pl-4 -ml-[17px] border-l-2 transition-all duration-300 ease-in-out text-sm",
                            activeId === item.id
                                ? "border-[#ff8202] bg-[#ff8202]/5 text-[#ea580c] font-bold scale-[1.02] origin-left shadow-sm"
                                : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50"
                        )}
                    >
                        {item.label}
                        {activeId === item.id && (
                            <span className="absolute inset-y-0 left-0 w-[2px] bg-[#ff8202] shadow-[0_0_8px_rgba(255,130,2,0.4)]" />
                        )}
                    </a>
                ))}
            </nav>
        </div>
    )
}

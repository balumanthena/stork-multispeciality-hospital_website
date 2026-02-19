"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function TreatmentScrollspy() {
    const [activeId, setActiveId] = useState<string>("overview")

    useEffect(() => {
        // Observer callback: Detect which section is most visible in the "active region"
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id)
                }
            })
        }

        // Observer options:
        // rootMargin: Negative top margin creates an offset for the sticky header (~100px).
        // Negative bottom margin ensures we only trigger when the element enters the top portion of the viewport.
        // This prevents multiple sections being active at once on large screens.
        const observerOptions = {
            rootMargin: "-100px 0px -60% 0px",
            threshold: 0
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        const ids = ["overview", "conditions", "procedure", "benefits", "faq"]
        ids.forEach((id) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        // Optimized scroll handler for bottom-of-page detection
        // Ensures the last section (FAQ) activates even if it's short or at the very bottom
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement
            // If we are within 50px of the bottom, force activate the last section
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                setActiveId("faq")
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            observer.disconnect()
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            // Scroll with offset for the sticky header
            const headerOffset = 100
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.scrollY - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })

            // Optimistically set active state for instant feedback
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
        <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 sticky top-32">
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

"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TOCItem {
    id: string
    text: string
    level: number
}

export function BlogTOC() {
    const [headings, setHeadings] = useState<TOCItem[]>([])
    const [activeId, setActiveId] = useState<string>("")

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('.prose h2, .prose h3, .prose h4'))
        
        const items = elements.map((elem, index) => {
            // Ensure elements have IDs for scrolling
            if (!elem.id) {
                elem.id = `heading-${index}-${elem.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
            }
            let level = 2;
            if (elem.tagName === 'H3') level = 3;
            if (elem.tagName === 'H4') level = 4;

            return {
                id: elem.id,
                text: elem.textContent || "",
                level: level
            }
        })
        
        setHeadings(items)

        // Setup Intersection Observer to highlight active heading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '0px 0px -80% 0px' }
        )

        elements.forEach((elem) => observer.observe(elem))
        return () => observer.disconnect()
    }, [])

    if (headings.length === 0) return null

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
            <h4 className="font-bold text-slate-900 mb-4 tracking-tight">Table of Contents</h4>
            <nav className="space-y-1 text-sm font-medium">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={cn(
                            "block py-1 transition-colors hover:text-orange-600",
                            heading.level === 3 ? "pl-4 text-slate-500" : 
                            heading.level === 4 ? "pl-8 text-slate-400 italic" : "text-slate-700",
                            activeId === heading.id && "text-orange-600 font-bold"
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        {heading.text}
                    </a>
                ))}
            </nav>
        </div>
    )
}

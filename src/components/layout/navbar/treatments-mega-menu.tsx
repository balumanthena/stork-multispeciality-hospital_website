"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { GroupedTreatmentCategory } from "@/lib/data/grouped-treatments"
import { MEGA_MENU_TREATMENTS } from "@/lib/data/mega-menu-treatments"
import { MegaMenuSection } from "./nav-data"

interface TreatmentsMegaMenuProps {
    onClose?: () => void
    title?: "Treatments" | "Procedures"
    viewAllHref?: string
}

const TARGET_CATEGORIES = [
    "Pain Management",
    "Gynecology & Obstetrics",
    "Orthopedics & Trauma",
    "General Medicine",
    "General Surgery"
]

export function TreatmentsMegaMenu({ onClose, title = "Treatments", viewAllHref = "/treatments" }: TreatmentsMegaMenuProps) {
    const router = useRouter()

    // Dynamically fetch the 5 exact target categories from the data, preserving order
    const displayTreatments = TARGET_CATEGORIES.map(targetTitle => {
        return MEGA_MENU_TREATMENTS.find(cat => cat.title.toLowerCase() === targetTitle.toLowerCase())
    }).filter(Boolean) as GroupedTreatmentCategory[]

    return (
        <div className="container max-w-[1300px] mx-auto py-10 px-8">
            <div className="bg-white rounded-[16px]">
                
                {/* 5-Column Layout Desktop, 2-Column Tablet */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
                    {displayTreatments.map((category, index) => (
                        <div
                            key={category.title}
                            className={cn(
                                "flex flex-col relative",
                                // Vertical divider for desktop (all columns except last)
                                index !== displayTreatments.length - 1 && "lg:after:content-[''] lg:after:absolute lg:after:top-2 lg:after:bottom-2 lg:after:-right-6 lg:after:w-[1px] lg:after:bg-slate-100"
                            )}
                        >
                            {/* Column Header */}
                            <Link
                                href={category.slug ? `/services/${category.slug}` : "#"}
                                onClick={onClose}
                                className="inline-block mb-4"
                            >
                                <h3 className="text-[13px] font-bold text-[#ff8202] uppercase tracking-[1.5px] hover:text-[#e67502] transition-colors">
                                    {category.title}
                                </h3>
                            </Link>

                            {/* Treatment Items */}
                            <ul className="flex flex-col space-y-2.5">
                                {category.items.slice(0, 10).map((item, idx) => {
                                    // Extract final part of href
                                    const slug = typeof item.href === 'string' ? item.href.split("/").pop() : "";
                                    
                                    return (
                                        <li key={idx}>
                                            <Link
                                                href={`/treatments/${slug}`}
                                                onClick={onClose}
                                                className="block text-[14px] font-medium text-slate-600 hover:text-[#ff8202] hover:translate-x-1 transition-all duration-200 ease-in-out cursor-pointer"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center w-full">
                    <button
                        onClick={() => {
                            onClose?.()
                            router.push(viewAllHref)
                        }}
                        className="group/cta inline-flex items-center text-[14px] font-bold text-[#ff8202] hover:text-[#e67502] transition-colors cursor-pointer uppercase tracking-wider"
                    >
                        View All {title}
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    )
}

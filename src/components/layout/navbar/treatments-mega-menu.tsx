"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GroupedTreatmentCategory } from "@/lib/data/grouped-treatments"
import { MegaMenuSection } from "./nav-data"

interface TreatmentsMegaMenuProps {
    treatments: MegaMenuSection[] | GroupedTreatmentCategory[]
    onClose?: () => void
}

export function TreatmentsMegaMenu({ treatments, onClose }: TreatmentsMegaMenuProps) {
    // Take only first 5 categories to maintain the 5-column layout
    const displayTreatments = treatments.slice(0, 5)

    return (
        <div className="container max-w-[1300px] mx-auto py-10 px-8">
            <div className="bg-white rounded-[16px]">
                {/* Main Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
                    {displayTreatments.map((category, index) => (
                        <div
                            key={category.title}
                            className={cn(
                                "group/column flex flex-col",
                                // Add border to all except the last column on desktop
                                index !== displayTreatments.length - 1 && "xl:border-r xl:border-slate-100"
                            )}
                        >
                            {/* Department Title */}
                            <Link
                                href={category.slug ? `/departments/${category.slug}` : "#"}
                                onClick={onClose}
                                className="inline-block"
                            >
                                <h3 className="text-[14px] font-bold text-[#1E40AF] uppercase tracking-[1px] border-b border-gray-100 pb-4 mb-4 hover:text-[#F97316] transition-colors">
                                    {category.title}
                                </h3>
                            </Link>

                            {/* Treatments List */}
                            <ul className="flex flex-col space-y-1">
                                {category.items.slice(0, 8).map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className="group/item flex items-center text-[15px] text-[#374151] leading-[34px] hover:text-[#F97316] transition-all duration-200 ease-in-out hover:pl-1.5"
                                        >
                                            <span className="opacity-0 w-0 -ml-2 group-hover/item:opacity-100 group-hover/item:w-auto group-hover/item:text-[#F97316] group-hover/item:mr-2 transition-all duration-200">
                                                <ChevronRight className="w-3 h-3" />
                                            </span>
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center w-full">
                    <Link
                        href="/treatments"
                        onClick={onClose}
                        className="group/cta inline-flex items-center text-[15px] font-semibold text-[#F97316] hover:text-[#ea580c] transition-colors"
                    >
                        View All Treatments
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

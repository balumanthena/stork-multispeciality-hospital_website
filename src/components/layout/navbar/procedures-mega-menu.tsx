"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { MegaMenuSection } from "./nav-data"
import { GroupedTreatmentCategory } from "@/lib/data/grouped-treatments"

interface ProceduresMegaMenuProps {
    procedures: MegaMenuSection[] | GroupedTreatmentCategory[]
    onClose?: () => void
}

export function ProceduresMegaMenu({ procedures, onClose }: ProceduresMegaMenuProps) {
    // Group everything into 5 distinct columns for perfect visual balance
    const findCat = (slug: string) => procedures.find(p => p.slug === slug)

    const columns = [
        [findCat('general-laparoscopic'), findCat('vascular-surgery')], // Col 1
        [findCat('orthopedics'), findCat('spine-surgery')], // Col 2
        [findCat('urology'), findCat('oncology')], // Col 3
        [findCat('gynecology')], // Col 4
        [findCat('ent'), findCat('pain-management'), findCat('plastic-surgery')] // Col 5
    ];

    return (
        <div className="container max-w-[1300px] mx-auto py-10 px-8">
            <div className="bg-white rounded-[16px]">
                {/* Main Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
                    {columns.map((columnData, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group/column flex flex-col gap-10",
                                // Add border to all except the last column on desktop
                                index !== columns.length - 1 && "xl:border-r xl:border-slate-100"
                            )}
                        >
                            {columnData.map((category) => {
                                if (!category) return null;
                                return (
                                    <div key={category.title} className="flex flex-col">
                                        {/* Department Title */}
                                        <Link
                                            href={category.href || "#"}
                                            onClick={onClose}
                                            className="inline-block"
                                        >
                                            <h3 className="text-[14px] font-bold text-[#1E40AF] uppercase tracking-[1px] border-b border-gray-100 pb-4 mb-4 hover:text-[#F97316] transition-colors">
                                                {category.title}
                                            </h3>
                                        </Link>

                                        {/* Procedures List */}
                                        <ul className="flex flex-col space-y-1">
                                            {category.items.map((item, idx) => (
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
                                )
                            })}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center w-full">
                    <Link
                        href="/procedures"
                        onClick={onClose}
                        className="group/cta inline-flex items-center text-[15px] font-semibold text-[#F97316] hover:text-[#ea580c] transition-colors"
                    >
                        View All Procedures
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

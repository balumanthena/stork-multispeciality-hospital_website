"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { m, AnimatePresence } from "framer-motion"
import { DepartmentListItem } from "@/lib/data/departments"
import { Container } from "@/components/layout/container"

export function HomepageDepartments({ departments }: { departments: DepartmentListItem[] }) {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <section className="bg-slate-50 py-12 md:py-16 font-sans">
            <Container>
                
                <div className="flex flex-col justify-center items-center mb-10 gap-4">
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 text-center">
                        Our Specialties
                    </h2>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <m.div
                        animate={{
                            height: expanded ? "auto" : 480
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.23, 1, 0.32, 1]
                        }}
                        className="relative overflow-hidden will-change-height"
                    >
                        <div className="w-full pb-8">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                                {departments.map((dept, index) => (
                                    <Link
                                        key={index}
                                        href={`/services/${dept.slug}`}
                                        className="bg-white border-[1.5px] border-slate-200/80 rounded-[20px] pt-6 pb-4 px-3 flex flex-col items-center justify-center transition-all duration-300 hover:border-orange-500 hover:shadow-[0_4px_15px_-4px_rgba(249,115,22,0.15)] group"
                                    >
                                        <div className="w-20 h-20 md:w-24 md:h-24 mb-4 flex items-center justify-center relative">
                                            <Image 
                                                src={dept.iconUrl} 
                                                alt={dept.title} 
                                                width={96} 
                                                height={96} 
                                                className="object-contain transition-transform duration-300 group-hover:scale-105" 
                                                priority={index < 4}
                                            />
                                        </div>
                                        <h3 className="text-[14px] md:text-[15px] font-bold text-slate-800 group-hover:text-orange-600 text-center transition-colors">
                                            {dept.title}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Fade Overlay when collapsed */}
                        <AnimatePresence>
                            {!expanded && (
                                <m.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent z-10 pointer-events-none"
                                />
                            )}
                        </AnimatePresence>
                    </m.div>
                </div>

                <div className="mt-8 flex justify-center relative z-20">
                    <button
                        onClick={handleToggle}
                        className="group flex items-center gap-4 px-12 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-[#ff8202] transition-all shadow-xl active:scale-95 active:translate-y-1"
                    >
                        <span className="text-[15px]">{expanded ? "Show Less" : `View All Departments`}</span>
                        <m.div
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <ChevronDown className="w-5 h-5" />
                        </m.div>
                    </button>
                </div>
            </Container>
        </section>
    )
}

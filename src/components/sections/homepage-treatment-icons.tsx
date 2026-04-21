"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { TREATMENTS_MASTER } from "@/lib/data/treatments"
import { getTreatmentIcon } from "@/lib/data/treatment-icons-map"

function TreatmentIconBox({ treatment, slug }: { treatment: { name: string }, slug: string }) {
    const iconPath = getTreatmentIcon(treatment.name)
    
    return (
        <Link
            href={`/treatments/${slug}`}
            className="flex flex-col items-center justify-start p-2 w-[110px] sm:w-[130px] md:w-[145px] group transition-all duration-300 hover:-translate-y-1"
        >
            <div className="w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] rounded-[18px] bg-white border border-slate-100 shadow-sm flex items-center justify-center p-1 group-hover:border-[#ff8202]/30 group-hover:shadow-md transition-all duration-500 relative">
                <Image
                    src={iconPath}
                    alt={treatment.name}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-110 filter-orange"
                    sizes="68px"
                />
            </div>
            <span className="mt-2 text-[11px] sm:text-[12px] font-bold text-slate-700 text-center leading-tight group-hover:text-[#ff8202] transition-colors line-clamp-2">
                {treatment.name}
            </span>
        </Link>
    )
}

export function HomepageTreatmentIcons({ allTreatments }: { allTreatments: any[] }) {
    const [expanded, setExpanded] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Initial view: show ~3 rows
    // On desktop (7 cols) -> 21 items
    // On mobile (3 cols) -> 9 items
    // We'll use a height-based approach for maximum smoothness

    const handleToggle = () => {
        if (expanded) {
            // Smoothly scroll to section top before/during collapse
            const yOffset = -100; // Offset for fixed header
            const element = sectionRef.current;
            if (element) {
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
        setExpanded(!expanded);
    };

    return (
        <section ref={sectionRef} className="py-20 bg-[#f8fafc] border-t border-slate-100 font-sans scroll-mt-24">
            <div className="container max-w-[1280px] mx-auto px-4">
                
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block bg-[#ff8202]/10 text-[#ff8202] px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4"
                    >
                        Unified Care System
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">Expert Care for Every Need</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Explore our comprehensive range of 105 specialized treatments across expert departments.
                    </p>
                </div>

                <div className="relative overflow-hidden">
                    <motion.div
                        animate={{ 
                            height: expanded ? "auto" : 480 // Approx 3-4 rows height
                        }}
                        transition={{ 
                            duration: 0.6, 
                            ease: [0.23, 1, 0.32, 1] // Apple-style quintic ease-out
                        }}
                        className="relative overflow-hidden"
                    >
                        <div ref={contentRef} className="flex justify-center">
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-y-10 gap-x-2 sm:gap-x-4 pb-10">
                                {TREATMENTS_MASTER.map((treatment) => (
                                    <TreatmentIconBox key={treatment.id} treatment={treatment} slug={treatment.slug} />
                                ))}
                            </div>
                        </div>

                        {/* Fade Overlay when collapsed */}
                        <AnimatePresence>
                            {!expanded && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10 pointer-events-none"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                <div className="mt-12 flex justify-center relative z-20">
                    <button
                        onClick={handleToggle}
                        className="group flex items-center gap-4 px-10 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-[#ff8202] transition-all shadow-xl active:scale-95 active:translate-y-1"
                    >
                        <span>{expanded ? "Show Less" : `View All 105 Treatments`}</span>
                        <motion.div 
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <ChevronDown className="w-5 h-5" />
                        </motion.div>
                    </button>
                </div>
            </div>
        </section>
    )
}

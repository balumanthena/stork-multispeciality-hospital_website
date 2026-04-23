"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { TREATMENTS_MASTER } from "@/lib/data/treatments"
import { getTreatmentIcon } from "@/lib/treatmentIcons"
import { Container } from "@/components/layout/container"

// Icons whose artwork is extremely tiny within their SVG viewBox
const TINY_ICONS = new Set([
    "High risk pregnancy",
])

// Icons whose artwork is drawn small within their SVG viewBox — need moderate scaling
const SMALL_ICONS = new Set([
    "Antepartum and intrapartum",
    "Elbow pain",
    "Neck pain",
])

function TreatmentIconBox({ treatment, slug, priority = false }: { treatment: { name: string }, slug: string, priority?: boolean }) {
    const iconPath = getTreatmentIcon(treatment.name)
    const isSvg = decodeURIComponent(iconPath).endsWith(".svg")
    const isTiny = TINY_ICONS.has(treatment.name)
    const isSmall = SMALL_ICONS.has(treatment.name)

    return (
        <Link
            href={`/treatments/${slug}`}
            className="flex flex-col items-center justify-start w-[100px] sm:w-[140px] group transition-all duration-300 hover:-translate-y-1 will-change-transform"
        >
            <div className="w-[84px] h-[84px] sm:w-[110px] sm:h-[110px] rounded-lg bg-white border border-slate-200 flex items-center justify-center p-2 group-hover:border-[#ff8202] group-hover:shadow-md transition-all duration-300 relative mb-3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={iconPath}
                    alt={treatment.name}
                    width={80}
                    height={80}
                    className={`object-contain transition-transform duration-500 ${isTiny ? "p-0 scale-[2] group-hover:scale-[2.2]" : isSmall ? "p-0 scale-[1.3] group-hover:scale-[1.45]" : isSvg ? "p-0 group-hover:scale-110" : "p-2 group-hover:scale-110"}`}
                    loading={priority ? "eager" : "lazy"}
                    onError={(e) => {
                        e.currentTarget.src = "/images/default-icon.svg";
                    }}
                />
            </div>
            <span className="text-[12px] sm:text-[14px] font-medium text-slate-700 text-center leading-[1.3] group-hover:text-[#ff8202] transition-colors line-clamp-2 min-h-[2.6em] px-1 w-full">
                {treatment.name}
            </span>
        </Link>
    )
}

export function HomepageTreatmentIcons({ allTreatments }: { allTreatments: any[] }) {
    const [expanded, setExpanded] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-[#f8fafc] border-t border-slate-100 font-sans scroll-mt-24">
            <Container>

                <div className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block bg-[#ff8202]/10 text-[#ff8202] px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4"
                    >
                        Unified Care System
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Expert Care for Every Need</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-medium opacity-80">
                        Explore our comprehensive specialized treatments across expert departments.
                    </p>
                </div>

                <div className="relative">
                    <motion.div
                        animate={{
                            height: expanded ? "auto" : 580
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.23, 1, 0.32, 1]
                        }}
                        className="relative overflow-hidden will-change-height"
                    >
                        <div ref={contentRef} className="w-full">
                            <div className="flex flex-wrap justify-center gap-y-8 sm:gap-y-10 gap-x-4 sm:gap-x-6 pb-16">
                                {TREATMENTS_MASTER.slice(0, 63).map((treatment, index) => (
                                    <TreatmentIconBox
                                        key={treatment.id}
                                        treatment={treatment}
                                        slug={treatment.slug}
                                        priority={index < 18} // Priority load first 2 rows
                                    />
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
                                    className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/95 to-transparent z-10 pointer-events-none"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                <div className="mt-6 flex justify-center relative z-20">
                    <button
                        onClick={handleToggle}
                        className="group flex items-center gap-4 px-12 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-[#ff8202] transition-all shadow-xl active:scale-95 active:translate-y-1"
                    >
                        <span className="text-[15px]">{expanded ? "Show Less" : `View All Treatments`}</span>
                        <motion.div
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <ChevronDown className="w-5 h-5" />
                        </motion.div>
                    </button>
                </div>
            </Container>
        </section>
    )
}

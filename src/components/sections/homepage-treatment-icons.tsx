"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Treatment {
    title: string
    href: string
}

// Hardcoded set of all verified uploaded icons in public/images/icons/treatments
const AVAILABLE_ICONS = new Set([
    "adenoidectomy", "anal-fissure", "anal-fistula", "antepartum-monitoring", "appendicitis",
    "arthroscopy-surgery", "back-pain", "balanitis", "balanoposthitis", "bariatric-surgery",
    "cancer-care", "chronic-disease-management", "circumcision", "corn-removal",
    "diabetic-foot-ulcer", "diagnostic-procedure", "dvt-treatment", "ear-surgery",
    "elbow-pain", "enlarged-prostate", "eswl", "fertility-services", "fissure-surgery",
    "foot-or-ankle-pain", "foreskin-infection", "frenuloplasty-surgery", "gallstone",
    "gastrointestinal-issues", "headache-or-migraine", "hernia", "high-risk-pregnancy",
    "hip-pain", "hip-replacement-surgery", "hoodecomy", "hydrocele", "hymenoplasty",
    "incisional-hernia", "inguinal-hernia", "intragastric-balloon", "kidney-stones",
    "knee-arthroscopy", "knee-pain", "labiaplasty", "labor-delivery", "management-of-infections",
    "mastoidectomy", "meniscus-tear", "mental-health", "metabolic-endocrine-disorders",
    "minimally-invasive-surgery", "monsplasty", "myringotomy", "nasal-polyps", "neck-pain",
    "paraphimosis", "pcnl", "pelvic-floor-disorders", "perianal-abscess", "phimosis",
    "piles-hemorrhoids", "pilonidal-sinus", "postpartum-care", "prenatal-care",
    "prostatectomy", "rectal-prolapse", "respiratory", "rhinoplasty", "rirs",
    "rotator-cuff-repair", "septoplasty", "shoulder-arthroscopy", "shoulder-dislocation",
    "shoulder-pain", "shoulder-replacement", "sinus-treatment", "spine-surgery",
    "sports-injury", "stapedectomy", "stapler-circumcision", "surgical-interventions",
    "swollen-penis", "throat-surgery", "thyroidectomy", "tonsillectomy",
    "total-knee-replacement", "turbinate-reduction", "tympanoplasty", "umbilical-hernia",
    "ursl", "uterine-fibroids", "vaginoplasty", "varicocele", "varicose-veins",
    "vestoplasty", "vocal-cord-polyps"
])

function TreatmentIconBox({ treatment, slug }: { treatment: Treatment, slug: string }) {
    return (
        <Link
            href={`/treatments/${slug}`}
            className="flex flex-col items-center justify-start p-3 w-full sm:w-[130px] md:w-[150px] lg:w-[165px] group transition-all duration-300 hover:-translate-y-1.5"
        >
            <div className="w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-[24px] bg-white border border-slate-100 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] flex items-center justify-center p-1.5 group-hover:border-[#ff8202]/30 group-hover:shadow-[0_12px_24px_-8px_rgba(249,115,22,0.2)] group-active:scale-95 transition-all duration-500 relative overflow-hidden">
                {/* Soft backdrop glow on hover */}
                <div className="absolute inset-0 bg-[#3e7dca]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Image
                    src={`/images/icons/treatments/${slug}.png`}
                    alt={treatment.title}
                    fill
                    quality={100}
                    unoptimized={true}
                    priority={true}
                    loading="eager"
                    className="object-contain p-1 transition-all duration-500 group-hover:scale-115 z-10"
                    sizes="84px"
                />
            </div>
            
            <div className="mt-4 flex flex-col items-center gap-1.5">
                <span className="text-[13px] sm:text-sm font-bold text-slate-800 text-center leading-[1.3] group-hover:text-[#ff8202] transition-colors duration-300 line-clamp-2 px-1">
                    {treatment.title}
                </span>
                {/* Subtle underline indicator */}
                <div className="h-0.5 w-0 bg-[#ff8202] rounded-full group-hover:w-8 transition-all duration-300 opacity-0 group-hover:opacity-100" />
            </div>
        </Link>
    )
}

export function HomepageTreatmentIcons({ allTreatments }: { allTreatments: Treatment[] }) {
    const [expanded, setExpanded] = useState(false)

    // Pre-filter to eliminate layout jumping and empty boxes
    const validTreatments = allTreatments.filter(t => {
        const slug = t.href.split("/").pop() || ""
        return AVAILABLE_ICONS.has(slug)
    })

    // Showing exactly 14 items initially (2 rows on wider screens)
    const initialCount = 14; 
    const displayedTreatments = expanded ? validTreatments : validTreatments.slice(0, initialCount);

    return (
        <section className="py-20 sm:py-32 bg-[#f8fafc] border-t border-slate-100 relative overflow-hidden font-sans">
            <div className="container max-w-[1280px] mx-auto px-4 sm:px-6">
                
                {/* Header Section */}
                <div className="text-center mb-16 sm:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 bg-white/80 border border-slate-200/60 px-4 py-1.5 rounded-full mb-6 shadow-sm backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e7dca]/40 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3e7dca]"></span>
                        </span>
                        <span className="text-[#3e7dca] font-bold tracking-widest uppercase text-[10px] sm:text-[11px]">
                            Conditions & Treatments
                        </span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
                    >
                        Expert Care for All Medical Needs
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
                    >
                        Experience world-class treatment from top specialists. We utilize advanced technologies to provide comprehensive care for your health conditions.
                    </motion.p>
                </div>

                {/* Centered Grid Implementation */}
                {/* Mobile: 2 columns grid | Tablet/Desktop: Centered flex-wrap for perfectly balanced rows */}
                <motion.div 
                    layout
                    initial={false}
                    animate={{ height: "auto" }}
                    transition={{ 
                        layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                    }}
                    className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-x-3 gap-y-10 sm:gap-x-1 sm:gap-y-14 sm:max-w-[1200px] mx-auto px-1 sm:px-0 overflow-hidden"
                >
                    <AnimatePresence initial={false}>
                        {displayedTreatments.map((treatment, idx) => {
                            const slug = treatment.href.split("/").pop() || "";
                            return (
                                <motion.div 
                                    key={slug} 
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ 
                                        opacity: 0, 
                                        scale: 0.9, 
                                        y: 10,
                                        transition: { duration: 0.2 } 
                                    }}
                                    transition={{ 
                                        duration: 0.4,
                                        delay: expanded ? (idx >= initialCount ? (idx - initialCount) * 0.015 : 0) : 0 
                                    }}
                                    className="flex justify-center"
                                >
                                    <TreatmentIconBox treatment={treatment} slug={slug} />
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* View All Button */}
                {validTreatments.length > initialCount && (
                    <motion.div layout className="mt-20 sm:mt-28 flex justify-center">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="group flex items-center gap-3 px-12 py-5 rounded-full bg-slate-900 text-white font-bold hover:bg-[#ff8202] transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.35)] active:scale-95"
                        >
                            <span className="text-[15px] sm:text-base">
                                {expanded ? "Show Less" : "View All Conditions"}
                            </span>
                            <div className={`p-1 bg-white/20 rounded-full transition-transform duration-700 ${expanded ? "-rotate-90" : "rotate-90"} group-hover:bg-white/30`}>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    )
}

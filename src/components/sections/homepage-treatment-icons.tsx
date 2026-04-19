"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { TREATMENTS_MASTER } from "@/lib/data/treatments"

interface Treatment {
    name: string
    slug: string
    id: number
    department: string
}

const AVAILABLE_ICONS = new Set([
    "ablation-therapy", "abdominal-pain", "adenoidectomy", "anal-fissure", "anal-fistula", "antepartum-and-intrapartum-monitoring", "appendicitis",
    "arthroscopy-surgery", "asthma", "back-pain", "balanitis", "balanoposthitis", "bariatric-surgery",
    "bronchoscopy", "bronchoscopy-guided-foreign-body-removal", "cancer-care", "chronic-disease-management", "circumcision", "copd", "corn-removal",
    "diabetic-foot-ulcer", "diagnostic-procedures", "dvt-deep-vein-thrombosis", "ear-surgery",
    "elbow-pain", "endoscopic-interlaminar-discectomy", "enlarged-prostate", "eswl", "fess-surgery", "fertility-services", "fissure-surgery",
    "foot-and-ankle-pain", "foreskin-infection", "frenuloplasty-surgery", "gallstones",
    "gastrointestinal-issues", "headache-migraine", "hernia", "high-risk-pregnancy-management",
    "hip-pain", "hip-replacement-surgery", "hoodectomy", "hydrocele", "hymenoplasty",
    "incisional-hernia", "inguinal-hernia", "intragastric-balloon", "kidney-stones",
    "knee-arthroscopy", "knee-pain", "labiaplasty", "labor-delivery", "lung-biopsy", "lung-cancer-care", "management-of-infections",
    "mastoidectomy", "meniscus-tear", "mental-health", "metabolic-and-endocrine-disorders",
    "minimally-invasive-surgery", "monsplasty", "myringotomy", "nasal-polyps", "neck-pain",
    "paraphimosis", "parental-care", "pcnl", "pelvic-floor-disorders", "perianal-abscess", "phimosis",
    "piles", "pilonidal-sinus", "pleural-tapping", "post-covid-recovery", "postpartum-care", "prenatal-care",
    "prostatectomy", "rectal-prolapse", "regenerative-therapies", "respiratory-conditions", "rirs",
    "rotator-cuff-repair", "septoplasty", "shoulder-arthroscopy", "shoulder-dislocation",
    "shoulder-pain", "shoulder-replacement", "sinus-surgery", "spine-surgery",
    "sports-pain", "stapedectomy", "stapler-circumcision", "surgical-interventions",
    "swollen-penis", "tb-management", "throat-surgery", "thyroidectomy", "tonsillectomy",
    "total-knee-replacement", "transforaminal-endoscopic-lumbar-discectomy", "turbinate-reduction", "tympanoplasty",
    "ursl", "vaginoplasty", "varicocele", "varicose-veins", "vocal-cord-polyps"
])

function TreatmentIconBox({ treatment, slug }: { treatment: { name: string }, slug: string }) {
    return (
        <Link
            href={`/treatments/${slug}`}
            className="flex flex-col items-center justify-start p-2 w-[110px] sm:w-[130px] md:w-[145px] group transition-all duration-300 hover:-translate-y-1"
        >
            <div className="w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] rounded-[18px] bg-white border border-slate-100 shadow-sm flex items-center justify-center p-1 group-hover:border-[#ff8202]/30 group-hover:shadow-md transition-all duration-500 relative">
                <Image
                    src={`/images/icons/treatments/${slug}.png`}
                    alt={treatment.name}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                    sizes="68px"
                    onError={(e) => {
                        (e.target as any).src = '/images/icons/treatments/diagnostic-procedure.png'
                    }}
                />
            </div>
            <span className="mt-2 text-[11px] sm:text-[12px] font-bold text-slate-700 text-center leading-tight group-hover:text-[#ff8202] transition-colors line-clamp-2">
                {treatment.name}
            </span>
        </Link>
    )
}

export function HomepageTreatmentIcons({ allTreatments: initialTreatments }: { allTreatments: any[] }) {
    const [expanded, setExpanded] = useState(false);

    // Initial view: show a subset of treatments (e.g., first 21 items)
    const initialItemCount = 21;
    const itemsToShow = expanded ? TREATMENTS_MASTER : TREATMENTS_MASTER.slice(0, initialItemCount);

    return (
        <section className="py-20 bg-[#f8fafc] border-t border-slate-100 font-sans">
            <div className="container max-w-[1280px] mx-auto px-4">
                
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block bg-[#3e7dca]/10 text-[#3e7dca] px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4"
                    >
                        Unified Care System
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">Expert Care for Every Need</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Explore our comprehensive range of 105 specialized treatments across expert departments.
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-y-10 gap-x-2 sm:gap-x-4">
                        <AnimatePresence mode="popLayout">
                            {itemsToShow.map((treatment) => (
                                <motion.div 
                                    key={treatment.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex justify-center"
                                >
                                    <TreatmentIconBox treatment={treatment} slug={treatment.slug} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-20 flex justify-center">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="group flex items-center gap-4 px-10 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-[#ff8202] transition-all shadow-xl active:scale-95"
                    >
                        <span>{expanded ? "Show Less" : `View All 105 Treatments`}</span>
                        <div className={`transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}>
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
}

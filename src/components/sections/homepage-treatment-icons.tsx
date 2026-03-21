"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface Treatment {
    title: string
    href: string
}

// Hardcoded set of all verified uploaded icons in public/images/icons/treatments
const AVAILABLE_ICONS = new Set([
    "adenoidectomy", "anal-fissure", "anal-fistula", "antepartum-monitoring", "appendicitis", "arthroscopy-surgery", "back-pain", "balanoposthitis", "bariatric-surgery", "cancer-care", "chronic-disease-management", "circumcision", "corn-removal", "diabetic-foot-ulcer", "diagnostic-procedure", "dvt-treatment", "ear-surgery", "elbow-pain", "enlarged-prostate", "eswl", "fertility-services", "fissure-surgery", "foot-or-ankle-pain", "foreskin-infection", "frenuloplasty-surgery", "gallstone", "gastrointestinal-issues", "headache-or-migraine", "hernia", "high-risk-pregnancy", "hip-pain", "hip-replacement-surgery", "hoodecomy", "hydrocele", "hymenoplasty", "incisional-hernia", "inguinal-hernia", "intragastric-balloon", "kidney-stones", "knee-arthroscopy", "knee-pain", "labiaplasty", "labor-delivery", "management-of-infections", "mastoidectomy", "meniscus-tear", "mental-health", "minimally-invasive-surgery", "monsplasty", "myringotomy", "nasal-polyps", "neck-pain", "paraphimosis", "pcnl", "pelvic-floor-disorders", "perianal-abscess", "phimosis", "piles-hemorrhoids", "pilonidal-sinus", "postpartum-care", "prenatal-care", "prostatectomy", "rectal-prolapse", "respiratory", "rhinoplasty", "rirs", "rotator-cuff-repair", "septoplasty", "shoulder-arthroscopy", "shoulder-dislocation", "shoulder-pain", "shoulder-replacement", "sinus-treatment", "spine-surgery", "sports-injury", "stapedectomy", "stapler-circumcision", "surgical-interventions", "throat-surgery", "thyroidectomy", "tonsillectomy", "total-knee-replacement", "turbinate-reduction", "tympanoplasty", "umbilical-hernia", "ursl", "uterine-fibroids", "vaginoplasty", "varicocele", "varicose-veins", "vocal-cord-polyps"
])

function TreatmentIconBox({ treatment, slug }: { treatment: Treatment, slug: string }) {
    return (
        <Link
            href={`/treatments/${slug}`}
            className="flex flex-col items-center justify-center p-4 gap-3 group transition-transform hover:-translate-y-1"
        >
            <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-[16px] bg-white border border-slate-100 shadow-sm flex items-center justify-center p-2 group-hover:border-[#ff8202] group-hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.2)] transition-all duration-300 relative overflow-hidden">
                <Image
                    src={`/images/icons/treatments/${slug}.png`}
                    alt={treatment.title}
                    fill
                    quality={100}
                    unoptimized={true}
                    priority={true}
                    loading="eager"
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                    sizes="64px"
                />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 text-center group-hover:text-[#ff8202] transition-colors line-clamp-2 max-w-[110px] leading-tight mt-1">
                {treatment.title}
            </span>
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

    const initialCount = 14; // Showing exactly 2 rows on lg layout (7 per row if adjusted)

    // Calculate which elements to render
    const displayedTreatments = expanded ? validTreatments : validTreatments.slice(0, initialCount);

    return (
        <section className="py-20 sm:py-28 bg-[#f8fafc] border-t border-slate-100 relative">
            <div className="container max-w-[1280px] mx-auto px-4 sm:px-6">
                <div className="text-center mb-14 sm:mb-20">
                    <span className="text-[#3e7dca] font-bold tracking-wider uppercase text-xs mb-3 block">Conditions & Treatments</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Comprehensive Care for Various Conditions
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-[15px] sm:text-lg leading-relaxed">
                        Get expert consultation and advanced treatment from top specialists for a wide range of diseases and health conditions.
                    </p>
                </div>

                <div 
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-y-12 gap-x-2 sm:gap-x-6 justify-items-center transition-all duration-700 ease-in-out"
                >
                    {displayedTreatments.map((treatment, idx) => {
                        const slug = treatment.href.split("/").pop() || "";
                        return (
                            <div 
                                key={slug} 
                                className="animate-in fade-in zoom-in duration-500 ease-out fill-mode-both"
                                style={{ animationDelay: `${(idx % 7) * 50}ms` }}
                            >
                                <TreatmentIconBox treatment={treatment} slug={slug} />
                            </div>
                        )
                    })}
                </div>

                {validTreatments.length > initialCount && (
                    <div className="mt-20 flex justify-center">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-2 px-10 py-4 rounded-full border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 hover:border-[#ff8202] hover:text-[#ff8202] transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            {expanded ? "View Less" : "View All"}
                            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${expanded ? "-rotate-90" : "rotate-90"}`} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

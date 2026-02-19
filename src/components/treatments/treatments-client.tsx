"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Search, ChevronDown, ChevronUp, ArrowRight, RotateCcw } from "lucide-react"
import { GroupedTreatmentCategory, BodyRegion } from "@/lib/data/grouped-treatments"
import { BodySelector } from "./body-selector"

interface TreatmentsClientProps {
    groupedTreatments: GroupedTreatmentCategory[]
}

const REGION_LABELS: Record<BodyRegion, string> = {
    "head": "Head & Brain",
    "ent": "ENT (Ear, Nose, Throat)",
    "chest": "Chest & Lungs",
    "heart": "Heart & Vascular",
    "abdomen": "Abdomen & Digestive",
    "pelvis": "Pelvis & Urology",
    "womens-health": "Women's Health",
    "spine": "Spine & Back",
    "arms": "Arms & Shoulders",
    "legs": "Legs & Joints",
    "skin-oncology": "Skin & Oncology",
    "mental-health": "Mental Health",
    "oncology": "Oncology",
    "vascular": "Vascular",
    "plastic-surgery": "Plastic Surgery",
    "pain-management": "Pain Management"
}

export function TreatmentsClient({ groupedTreatments }: TreatmentsClientProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedRegion, setSelectedRegion] = useState<BodyRegion | null>(null)
    const [isMobile, setIsMobile] = useState(false)

    // Helper to flatten treatments for region filtering
    const allTreatments = useMemo(() => {
        return groupedTreatments.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.title })))
    }, [groupedTreatments])

    // Filter Logic
    const filteredTreatments = useMemo(() => {
        let results = allTreatments

        // 1. Region Filter
        if (selectedRegion) {
            results = results.filter(t => t.body_region === selectedRegion)
        }

        // 2. Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            results = results.filter(t =>
                t.title.toLowerCase().includes(query) ||
                t.category.toLowerCase().includes(query)
            )
        }

        return results
    }, [allTreatments, selectedRegion, searchQuery])


    // Check mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <section className="py-12 bg-[#f8fafc] min-h-screen">
            <div className="container max-w-7xl mx-auto px-4 md:px-6">

                {/* HEADLINE */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Find Your Treatment</h2>
                    <p className="text-slate-600 text-lg">Select a body part or search to find the right care for you.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT: BODY SELECTOR (Desktop) / TOP (Mobile) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3e7dca] to-[#ff8202]" />

                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#ff8202]" />
                                Select Body Region
                            </h3>

                            {/* Mobile Grid Fallback */}
                            <div className="lg:hidden grid grid-cols-2 gap-3 mb-8">
                                {(Object.keys(REGION_LABELS) as BodyRegion[]).map(region => (
                                    <button
                                        key={region}
                                        onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
                                        className={cn(
                                            "px-4 py-3 rounded-xl text-sm font-medium transition-all text-left border",
                                            selectedRegion === region
                                                ? "bg-[#3e7dca] text-white border-[#3e7dca] shadow-md"
                                                : "bg-slate-50 text-slate-600 border-slate-100 hover:border-[#3e7dca]"
                                        )}
                                    >
                                        {REGION_LABELS[region]}
                                    </button>
                                ))}
                            </div>

                            {/* Desktop SVG Selector */}
                            <div className="hidden lg:block relative py-8">
                                <BodySelector
                                    selectedRegion={selectedRegion}
                                    onSelect={(r) => setSelectedRegion(r === selectedRegion ? null : r)}
                                />

                                {/* Non-Locational Tags (Floating below body) */}
                                <div className="mt-8 flex flex-wrap gap-2 justify-center">
                                    {(["womens-health", "mental-health", "skin-oncology", "spine"] as BodyRegion[]).map(r => (
                                        <button
                                            key={r}
                                            onClick={() => setSelectedRegion(r === selectedRegion ? null : r)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                                                selectedRegion === r
                                                    ? "bg-[#3e7dca] text-white border-[#3e7dca]"
                                                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-[#3e7dca]"
                                            )}
                                        >
                                            {REGION_LABELS[r]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: RESULTS GRID */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* SEARCH BAR */}
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search treatments..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#3e7dca]/10 text-lg shadow-sm"
                            />
                        </div>

                        {/* RESULTS HEADER */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-800">
                                {selectedRegion ? REGION_LABELS[selectedRegion] : searchQuery ? "Search Results" : "All Treatments"}
                            </h3>
                            {selectedRegion && (
                                <button
                                    onClick={() => { setSelectedRegion(null); setSearchQuery("") }}
                                    className="text-sm font-medium text-[#ff8202] flex items-center gap-1 hover:underline"
                                >
                                    <RotateCcw className="w-3 h-3" /> Reset Filter
                                </button>
                            )}
                        </div>

                        {/* GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {filteredTreatments.length > 0 ? (
                                filteredTreatments.map((treatment) => (
                                    <Link
                                        key={treatment.title}
                                        href={treatment.href}
                                        className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-[#3e7dca] hover:shadow-lg transition-all duration-300 flex flex-col items-start"
                                    >
                                        <span className="text-xs font-bold text-[#ff8202] uppercase tracking-wider mb-2">
                                            {treatment.category}
                                        </span>
                                        <h4 className="text-lg font-bold text-slate-800 group-hover:text-[#3e7dca] transition-colors mb-1">
                                            {treatment.title}
                                        </h4>
                                        <div className="mt-auto pt-4 flex items-center text-sm font-medium text-slate-400 group-hover:text-[#3e7dca] transition-colors">
                                            Learn More <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center text-slate-400">
                                    <p>No treatments found. Try adjusting your search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ArrowRight, RotateCcw } from "lucide-react"
import { MASTER_TREATMENTS, slugify } from "@/lib/data/master-treatments"

export function TreatmentsClient() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredTreatments = useMemo(() => {
        if (!searchQuery) return MASTER_TREATMENTS
        return MASTER_TREATMENTS.filter(t =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    return (
        <section className="py-12 bg-[#f8fafc] min-h-screen">
            <div className="container max-w-7xl mx-auto px-4 md:px-6">

                {/* SEARCH BAR (Center) */}
                <div className="max-w-2xl mx-auto mb-16 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search treatments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#3e7dca]/10 text-lg shadow-sm bg-white"
                    />
                </div>

                {/* RESULTS HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-800">
                        {searchQuery ? `Found ${filteredTreatments.length} Results` : "All Treatments"}
                    </h3>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="text-sm font-medium text-[#ff8202] flex items-center gap-1 hover:underline"
                        >
                            <RotateCcw className="w-3 h-3" /> Reset Search
                        </button>
                    )}
                </div>

                {/* GRID (3 Col Desktop, 2 Tablet, 1 Mobile) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTreatments.length > 0 ? (
                        filteredTreatments.map((name) => {
                            const slug = slugify(name)
                            return (
                                <Link
                                    key={name}
                                    href={`/treatments/${slug}`}
                                    className="group bg-white p-8 rounded-2xl border border-slate-100 hover:border-[#3e7dca] hover:shadow-xl transition-all duration-300 flex flex-col items-start gap-4"
                                >
                                    <h4 className="text-[19px] font-bold text-slate-900 group-hover:text-[#3e7dca] transition-colors leading-snug">
                                        {name}
                                    </h4>
                                    <div className="mt-auto flex items-center text-sm font-bold text-[#ff8202] group-hover:text-[#3e7dca] transition-colors uppercase tracking-wider">
                                        Learn More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            )
                        })
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-slate-500 text-lg">No treatments found matching "{searchQuery}"</p>
                            <button
                                onClick={() => setSearchQuery("")}
                                className="mt-4 text-[#3e7dca] font-semibold hover:underline"
                            >
                                View All Treatments
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

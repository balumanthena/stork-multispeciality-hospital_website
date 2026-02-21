import { Metadata } from "next"
import { HARDCODED_TREATMENTS } from "@/lib/data/hardcoded-treatments"
import { ProceduresClient } from "@/components/treatments/procedures-client"
import { Activity } from "lucide-react"
import { Section } from "@/components/layout/section"

export const metadata: Metadata = {
    title: "Treatments | Stork Multispecialty Hospital",
    description: "Browse our comprehensive list of specialized treatments and medical care.",
}

export default function TreatmentsPage() {
    // We reuse the ProceduresClient logic since the UI is identical
    const groupedTreatments = HARDCODED_TREATMENTS

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">

            {/* 1. HERO SECTION (Authority-Focused, Matching Procedures) */}
            <Section className="bg-[#3e7dca]/5 border-b border-[#3e7dca]/10 pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233e7dca' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                <div className="container max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Left Side */}
                        <div className="max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#3e7dca]/20 text-[#3e7dca] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                                <Activity className="w-3 h-3" />
                                <span>Comprehensive Treatments</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-6 leading-tight tracking-tight">
                                Our <span className="text-[#3e7dca]">Clinical</span> & <span className="text-[#ff8202]">Specialized</span> Treatments
                            </h1>

                            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                                Explore over 90+ specialized medical treatments and therapeutic solutions delivered by our expert clinical team.
                            </p>
                        </div>

                        {/* Right Side */}
                        <div className="hidden md:block opacity-80">
                            <div className="relative w-64 h-64">
                                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                                <Activity className="absolute inset-0 m-auto w-32 h-32 text-[#3e7dca] opacity-20" />
                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff8202] rounded-full blur-2xl opacity-40"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Reusing the ProceduresClient but pointing to /treatments */}
            <ProceduresClient groupedProcedures={groupedTreatments} hrefPrefix="/treatments" />

        </div>
    )
}

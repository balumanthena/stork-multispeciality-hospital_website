import { HARDCODED_TREATMENTS } from "@/lib/data/hardcoded-treatments"
import { TreatmentsClient } from "@/components/treatments/treatments-client"
import { Activity } from "lucide-react"
import { Section } from "@/components/layout/section"

// Metadata
export const metadata = {
    title: "Treatments & Procedures | Stork Multispecialty Hospital",
    description: "Browse our comprehensive list of medical treatments for every department.",
}

export default async function TreatmentsIndexPage() {
    // Use Hardcoded Data as requested
    const groupedTreatments = HARDCODED_TREATMENTS

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">

            {/* 1. HERO SECTION (Compact, Authority-Focused) */}
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
                                <span>Comprehensive Care</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-6 leading-tight tracking-tight">
                                Our <span className="text-[#ff8202]">Treatments</span> & <span className="text-[#3e7dca]">Procedures</span>
                            </h1>

                            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                                World-class medical care across 15+ specialties. Explore our extensive range of advanced treatments designed for your recovery.
                            </p>
                        </div>

                        {/* Right Side - Abstract Medical Illustration Replacement */}
                        <div className="hidden md:block opacity-80">
                            {/* Abstract graphic using CSS/SVG combination to keep it lightweight */}
                            <div className="relative w-64 h-64">
                                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                                <Activity className="absolute inset-0 m-auto w-32 h-32 text-[#3e7dca] opacity-20" />
                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff8202] rounded-full blur-2xl opacity-40"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Client Side Filter & Grid */}
            <TreatmentsClient groupedTreatments={groupedTreatments} />

        </div>
    )
}

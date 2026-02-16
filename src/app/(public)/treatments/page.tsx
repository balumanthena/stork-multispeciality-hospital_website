import { Section } from "@/components/layout/section"
import { PAGE_TREATMENTS } from "@/lib/data/page-treatments"
import Link from "next/link"
import { ArrowRight, Activity } from "lucide-react"

// Metadata - using static client if needed, or just hardcoded
export const metadata = {
    title: "All Treatments | Stork Multispecialty Hospital",
    description: "Browse our comprehensive list of medical treatments and surgical procedures.",
}

export default async function TreatmentsIndexPage() {
    // Using static data matching user request for "Page Only"
    const groupedTreatments = PAGE_TREATMENTS

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">

            {/* 1. HERO SECTION */}
            <Section className="bg-white border-b border-slate-100 pt-32 pb-16">
                <div className="container max-w-[1280px] mx-auto px-4">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-[var(--color-primary)] text-sm font-semibold mb-6">
                            <Activity className="w-4 h-4" />
                            <span>Comprehensive Care</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Our Treatments & <span className="text-[var(--color-primary)]">Procedures</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                            We offer advanced medical treatments across multiple specialties, delivering
                            world-class healthcare with precision and compassion.
                        </p>
                    </div>
                </div>
            </Section>

            {/* 2. TREATMENTS GRID */}
            <Section className="py-20">
                <div className="container max-w-[1280px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                        {groupedTreatments.map((category) => (
                            <div key={category.title} className="flex flex-col gap-5 group">
                                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors">
                                        {category.title}
                                    </h2>
                                </div>
                                <ul className="space-y-3">
                                    {category.items.map((item) => (
                                        <li key={item.title}>
                                            <Link
                                                href={item.href}
                                                className="flex items-start gap-2 text-[15px] text-slate-600 hover:text-[var(--color-primary)] transition-colors group/item"
                                            >
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-[var(--color-primary)] transition-colors shrink-0" />
                                                <span className="leading-snug">{item.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    )
}

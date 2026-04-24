import { getTreatmentDetail, getAllTreatmentSlugs } from "@/lib/data/treatment-detail-data"
import { getTreatmentIcon } from "@/lib/data/treatment-icons"
import { notFound } from "next/navigation"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TreatmentScrollspy } from "@/components/treatments/treatment-scrollspy"
import {
    Calendar, CheckCircle2, AlertCircle, Clock,
    ArrowRight, ChevronRight, Activity, ShieldCheck,
    Star, User, Sparkles, UserCheck
} from "lucide-react"
import { RelatedMedia } from "@/components/shared/related-media"
import { MediaService } from "@/services/media.service"
import { createClient } from "@/lib/supabase/server"

// Generate Static Params for all treatments to enable static export if needed
export async function generateStaticParams() {
    const slugs = getAllTreatmentSlugs()
    return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const treatment = getTreatmentDetail(slug)
    if (!treatment) return { title: "Procedure Not Found" }

    return {
        title: `${treatment.title} | Stork Multispecialty Hospital`,
        description: treatment.shortDescription,
    }
}

async function getTreatmentMedia(slug: string) {
    const supabase = await createClient()

    // 1. Get Treatment ID
    const { data: treatData } = await supabase
        .from("treatments")
        .select("id")
        .eq("slug", slug)
        .single()

    if (!treatData?.id) return { blogs: [], videos: [] }

    const [blogs, videos] = await Promise.all([
        MediaService.getBlogsForTreatment(treatData.id),
        MediaService.getVideosForTreatment(treatData.id)
    ])

    return {
        blogs,
        videos
    }
}

export default async function ProcedureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const treatment = getTreatmentDetail(slug)

    if (!treatment) {
        notFound()
    }

    // Resolve Icon
    const TreatmentIcon = getTreatmentIcon(treatment.slug, treatment.category)
    const media = await getTreatmentMedia(slug)

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">

            {/* 1. HERO SECTION */}
            <Section className="bg-gradient-to-b from-slate-50 to-white pt-12 md:pt-16 pb-16 relative overflow-hidden">
                <div className="container max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
                        <Link href="/procedures" className="hover:text-[#ff8202] transition-colors">Procedures</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href={treatment.departmentHref} className="hover:text-[#ff8202] transition-colors">{treatment.category}</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-900 font-semibold">{treatment.breadcrumbTitle || treatment.title}</span>
                    </div>

                    <div className="w-full">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-[#ff8202] text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                            <Activity className="w-3 h-3" />
                            {treatment.category} Department
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] mb-6 leading-[1.1] tracking-tight">{treatment.title}</h1>
                        {treatment.subheading && <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-3 leading-snug">{treatment.subheading}</h2>}
                        {treatment.tagline && <p className="text-lg text-[#ff8202] font-medium mb-8">{treatment.tagline}</p>}
                        <p className="text-lg text-slate-600 leading-relaxed mb-10">{treatment.shortDescription}</p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Button className="bg-[#ff8202] hover:bg-[#d96d00] text-white px-8 py-7 rounded-xl text-lg font-bold shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02]">
                                Book Appointment<ArrowRight className="w-5 h-5 ml-2" />
                            </Button>

                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><ShieldCheck className="w-5 h-5 text-green-600" /><span>Medically Reviewed</span></div>
                            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" />
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><UserCheck className="w-5 h-5 text-[#ff8202]" /><span>Top Specialists</span></div>
                            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" />
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><CheckCircle2 className="w-5 h-5 text-[#ff8202]" /><span>Insurance Accepted</span></div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 3. MAIN CONTENT LAYOUT */}
            <Section className="py-24">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

                        {/* LEFT: CONTENT (8 Cols) */}
                        <div className="md:col-span-8 space-y-24">

                            {/* Dynamic Content sections */}
                            <div id="overview" className="scroll-mt-32">
                                {treatment.overview ? (
                                    <>
                                        <h2 className="text-3xl font-bold text-[#0f172a] mb-8 relative inline-block">
                                            {treatment.overview.heading}
                                            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#ff8202] rounded-full"></span>
                                        </h2>
                                        <p className="text-xl text-slate-700 mb-8 font-medium leading-relaxed">{treatment.overview.intro}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {treatment.overview.items.map((item: string, i: number) => (
                                                <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-md hover:-translate-y-1 duration-300">
                                                    <div className="mt-1 w-6 h-6 rounded-full bg-[#ff8202]/10 flex items-center justify-center shrink-0 text-[#ff8202]">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-slate-700 font-medium">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-bold text-[#0f172a] mb-8">About The Treatment</h2>
                                        <div className="prose prose-lg text-slate-600 space-y-6">
                                            {treatment.fullDescription.map((desc: string, i: number) => (
                                                <p key={i}>{desc}</p>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div id="conditions" className="scroll-mt-32">
                                <h3 className="text-2xl font-bold text-[#0f172a] mb-8">{treatment.conditionsHeading || "Conditions Treated"}</h3>
                                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                                    <ul className="space-y-4">
                                        {treatment.conditionsTreated.map((condition: string, i: number) => (
                                            <li key={i} className="flex items-center gap-4 group">
                                                <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-100 transition-colors shrink-0">
                                                    <AlertCircle className="w-4 h-4" />
                                                </div>
                                                <span className="text-lg text-slate-700 font-medium">{condition}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div id="procedure" className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-[#0f172a] mb-10">{treatment.procedureHeading || "How It Works"}</h2>
                                <div className="space-y-0 relative border-l-2 border-slate-100 ml-5 md:ml-8 pl-8 md:pl-12 py-4">
                                    {treatment.procedureSteps.map((step: { title: string; description: string }, i: number) => (
                                        <div key={i} className="relative mb-12 last:mb-0 group">
                                            <div className="absolute -left-[45px] md:-left-[61px] top-0 w-10 h-10 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center z-10 group-hover:border-[#ff8202] transition-colors">
                                                <span className="text-[#ff8202] font-bold text-sm">{i + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#ff8202] transition-colors">{step.title}</h4>
                                                <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div id="benefits" className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-[#0f172a] mb-8">{treatment.benefitsHeading || "Benefits"}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {treatment.benefits.map((benefit: string, i: number) => (
                                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-[#ff8202]/20 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 text-green-600">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <span className="text-lg text-slate-800 font-medium pt-1">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div id="faq" className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-[#0f172a] mb-8">{treatment.faqHeading || "Frequently Asked Questions"}</h2>
                                <div className="space-y-4">
                                    {treatment.faqs.map((faq: { question: string; answer: string }, i: number) => (
                                        <div key={i} className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-[#ff8202]/50 transition-colors group">
                                            <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-start gap-3">
                                                <span className="text-[#ff8202] mt-0.5">Q.</span>
                                                {faq.question}
                                            </h4>
                                            <div className="pl-7">
                                                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="md:col-span-4 space-y-8 relative">
                            <div className="sticky top-32 space-y-8">
                                <TreatmentScrollspy 
                                    navItems={[
                                        { id: "overview", label: "Overview" },
                                        { id: "conditions", label: treatment.conditionsHeading || "Conditions Treated" },
                                        { id: "procedure", label: treatment.procedureHeading || "How It Works" },
                                        { id: "benefits", label: treatment.benefitsHeading || "Benefits" },
                                        { id: "faq", label: treatment.faqHeading || "FAQ" }
                                    ]}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </Section>

            <RelatedMedia blogs={media.blogs} videos={media.videos} />

            {/* CTA SECTION */}
            <Section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#1e3a8a] z-0"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff8202]/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ff8202]/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>

                <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-bold tracking-wider mb-6 border border-white/10">PREMIUM HEALTHCARE</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
                        {treatment.customCta?.heading || "Start Your Journey to Better Health"}
                    </h2>
                    <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
                        {treatment.customCta?.description || "Book your consultation today with Hyderabad's leading specialists."}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button className="h-auto bg-[#ff8202] hover:bg-[#e07200] text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl shadow-orange-500/20 w-full sm:w-auto">
                            {treatment.customCta?.buttonText || "Book Appointment Now"}
                        </Button>

                    </div>

                    <p className="mt-8 text-sm text-slate-400 font-medium flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        No-Wait Booking Confirmed Instantly
                    </p>
                </div>
            </Section>

        </div>
    )
}

import { getTreatmentDetail, getAllTreatmentSlugs } from "@/lib/data/treatment-detail-data"
import { getTreatmentIcon } from "@/lib/data/treatment-icons"
import { notFound } from "next/navigation"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TreatmentScrollspy } from "@/components/treatments/treatment-scrollspy"
import { VideoSection } from "@/components/treatments/video-section"
import { createClient } from "@/lib/supabase/server"
import {
    Calendar, CheckCircle2, AlertCircle, Clock,
    ArrowRight, ChevronRight, Activity, ShieldCheck,
    Star, User, Sparkles, UserCheck
} from "lucide-react"

// Generate Static Params for all treatments to enable static export if needed
export async function generateStaticParams() {
    const slugs = getAllTreatmentSlugs()
    return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const treatment = getTreatmentDetail(slug)
    if (!treatment) return { title: "Treatment Not Found" }

    return {
        title: `${treatment.title} | Stork Multispecialty Hospital`,
        description: treatment.shortDescription,
    }
}

async function getTreatmentVideos(slug: string) {
    const supabase = await createClient()

    // 1. Get Treatment ID by Slug
    const { data: treatmentData } = await supabase
        .from("treatments")
        .select("id")
        .eq("slug", slug)
        .single()

    if (!treatmentData?.id) return []

    // 2. Get Videos
    const { data: videos } = await supabase
        .from("treatment_videos")
        .select("*")
        .eq("treatment_id", treatmentData.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false })

    return videos || []
}

export default async function TreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const treatment = getTreatmentDetail(slug)

    if (!treatment) {
        notFound()
    }

    // Resolve Icon
    const TreatmentIcon = getTreatmentIcon(treatment.slug, treatment.category)

    // Fetch Videos (Server Side)
    const videos = await getTreatmentVideos(slug)

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">

            {/* 1. HERO SECTION */}
            <Section className="bg-gradient-to-b from-slate-50 to-white pt-32 pb-16 relative overflow-hidden">
                <div className="container max-w-6xl mx-auto px-6 relative z-10">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
                        <Link href="/treatments" className="hover:text-[#3e7dca] transition-colors">Treatments</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href={treatment.departmentHref} className="hover:text-[#3e7dca] transition-colors">{treatment.category}</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-900 font-semibold">{treatment.breadcrumbTitle || treatment.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
                        {/* LEFT CONTENT (60%) */}
                        <div className="lg:col-span-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#3e7dca] text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                                <Activity className="w-3 h-3" />
                                {treatment.category} Department
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] mb-6 leading-[1.1] tracking-tight">
                                {treatment.title}
                            </h1>

                            {treatment.subheading && (
                                <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-3 leading-snug">
                                    {treatment.subheading}
                                </h2>
                            )}

                            {treatment.tagline && (
                                <p className="text-lg text-[#3e7dca] font-medium mb-8">
                                    {treatment.tagline}
                                </p>
                            )}

                            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-2xl">
                                {treatment.shortDescription}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <Button className="bg-[#ff8202] hover:bg-[#d96d00] text-white px-8 py-7 rounded-xl text-lg font-bold shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02]">
                                    Book Consultation
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-7 rounded-xl text-lg font-semibold">
                                    Call 108 for Emergency
                                </Button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                    <span>Medically Reviewed</span>
                                </div>
                                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" />
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <UserCheck className="w-5 h-5 text-[#3e7dca]" />
                                    <span>Top Specialists</span>
                                </div>
                                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" />
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-[#3e7dca]" />
                                    <span>Insurance Accepted</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT ILLUSTRATION (40%) */}
                        <div className="lg:col-span-2 hidden lg:flex justify-center relative">
                            <div className="absolute inset-0 bg-[#3e7dca]/5 rounded-full blur-3xl transform scale-90 translate-y-4"></div>
                            <div className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 rotate-1 hover:rotate-0 transition-transform duration-700 w-full max-w-sm">
                                <div className="bg-slate-50 rounded-3xl h-64 w-full flex items-center justify-center mb-6 overflow-hidden">
                                    {/* Dynamic Treatment Icon */}
                                    <TreatmentIcon className="w-24 h-24 text-[#3e7dca]/20" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <Star className="w-5 h-5 text-green-600 fill-current" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">Patient Satisfaction</p>
                                            <p className="text-lg font-bold text-slate-900">4.9/5.0</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <User className="w-5 h-5 text-[#3e7dca] fill-current" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">Patients Treated</p>
                                            <p className="text-lg font-bold text-slate-900">10,000+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>



            {/* 3. MAIN CONTENT LAYOUT */}
            <Section className="py-24">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

                        {/* LEFT COLUMN (Content) - 8 Cols */}
                        <div className="md:col-span-8 space-y-20">

                            {/* OVERVIEW / WHY STORK */}
                            <div id="overview" className="scroll-mt-32">
                                {treatment.overview ? (
                                    <>
                                        <h2 className="text-3xl font-bold text-[#0f172a] mb-8 relative inline-block">
                                            {treatment.overview.heading}
                                            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#ff8202] rounded-full"></span>
                                        </h2>
                                        <p className="text-xl text-slate-700 mb-8 font-medium leading-relaxed">{treatment.overview.intro}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {treatment.overview.items.map((item, i) => (
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
                                            {treatment.fullDescription.map((desc, i) => (
                                                <p key={i}>{desc}</p>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>



                            {/* SYMPTOMS - Checklist UI */}
                            <div id="conditions" className="scroll-mt-32">
                                <h3 className="text-2xl font-bold text-[#0f172a] mb-8">{treatment.conditionsHeading || "Conditions Treated"}</h3>
                                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                                    <ul className="space-y-4">
                                        {treatment.conditionsTreated.map((condition, i) => (
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

                            {/* PROCEDURE - Vertical Timeline */}
                            <div id="procedure" className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-[#0f172a] mb-10">{treatment.procedureHeading || "How It Works"}</h2>
                                <div className="space-y-0 relative border-l-2 border-slate-100 ml-5 md:ml-8 pl-8 md:pl-12 py-4">
                                    {treatment.procedureSteps.map((step, i) => (
                                        <div key={i} className="relative mb-12 last:mb-0 group">
                                            <div className="absolute -left-[45px] md:-left-[61px] top-0 w-10 h-10 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center z-10 group-hover:border-[#3e7dca] transition-colors">
                                                <span className="text-[#3e7dca] font-bold text-sm">{i + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#3e7dca] transition-colors">{step.title}</h4>
                                                <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* BENEFITS - Hover Cards */}
                            <div id="benefits" className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-[#0f172a] mb-8">{treatment.benefitsHeading || "Benefits"}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {treatment.benefits.map((benefit, i) => (
                                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-[#3e7dca]/20 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 text-green-600">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <span className="text-lg text-slate-800 font-medium pt-1">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* DOCTOR REVIEW BLOCK */}


                            {/* VIDEO SECTION (Integrated) */}
                            {videos.length > 0 && (
                                <div id="video" className="scroll-mt-32">
                                    <VideoSection videos={videos} variant="compact" />
                                </div>
                            )}

                            {/* FAQ - Accordion */}
                            <div id="faq" className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-[#0f172a] mb-8">{treatment.faqHeading || "Frequently Asked Questions"}</h2>
                                <div className="space-y-4">
                                    {treatment.faqs.map((faq, i) => (
                                        <div key={i} className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-[#3e7dca]/50 transition-colors group">
                                            <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-start gap-3">
                                                <span className="text-[#3e7dca] mt-0.5">Q.</span>
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

                        {/* RIGHT SIDEBAR (Sticky) - 4 Cols */}
                        <div className="md:col-span-4 space-y-8 relative">
                            <div className="sticky top-32 space-y-8">

                                {/* On This Page Navigation */}
                                <TreatmentScrollspy />

                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* FINAL CTA REDESIGN */}
            <Section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#1e3a8a] z-0"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3e7dca]/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ff8202]/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>

                <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-bold tracking-wider mb-6 border border-white/10">
                        PREMIUM HEALTHCARE
                    </span>
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
                        <Button variant="outline" className="h-auto border-2 border-white/20 text-white hover:bg-white/10 px-10 py-5 rounded-full text-xl font-bold w-full sm:w-auto">
                            <span className="mr-2 opacity-80">or Call</span> 108
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

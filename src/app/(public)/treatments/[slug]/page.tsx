import { notFound } from "next/navigation"
import { getTreatmentBySlug, getAllTreatments } from "@/lib/data/treatments-server"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, Calendar, Phone, CheckCircle2, ArrowRight } from "lucide-react"
import type { Metadata } from 'next'

// Generate static params for all known treatments to enable ISR/Static generation where possible
export async function generateStaticParams() {
    const treatments = await getAllTreatments()
    return treatments.map((treatment) => ({
        slug: treatment.slug!,
    }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const { slug } = params;
    const treatment = await getTreatmentBySlug(slug)

    if (!treatment) {
        return {
            title: 'Treatment Not Found',
        }
    }

    return {
        title: treatment.meta_title || `${treatment.title} Treatment in Hyderabad | Stork Hospital`,
        description: treatment.meta_description || `Expert care for ${treatment.title} at Stork Multispecialty Hospital. Best specialists, advanced diagnostics, and personalized treatment plans.`,
    }
}

export default async function TreatmentPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const treatment = await getTreatmentBySlug(slug)

    if (!treatment) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 bg-slate-50 border-b border-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

                <div className="container mx-auto px-6 relative z-10">
                    <nav className="flex items-center text-sm font-medium text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
                        <Link href="/" className="hover:text-[#ff8202] transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300 flex-shrink-0" />
                        <Link href="/treatments" className="hover:text-[#ff8202] transition-colors">Treatments</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300 flex-shrink-0" />
                        <span className="text-slate-900 font-semibold">{treatment.title}</span>
                    </nav>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#3e7dca] text-xs font-bold uppercase tracking-wider mb-6">
                            {treatment.departments?.name || 'General'}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                            {treatment.title}
                        </h1>
                        {treatment.short_description && (
                            <p className="text-xl text-slate-600 max-w-3xl leading-relaxed font-light">
                                {treatment.short_description}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-4 mt-8">
                            <Button className="h-12 px-8 text-base font-bold bg-[#ff8202] hover:bg-[#e67600] text-white rounded-full shadow-lg shadow-orange-500/20">
                                Book Consultation
                            </Button>
                            <Button variant="outline" className="h-12 px-8 text-base font-bold border-slate-200 text-slate-700 hover:text-[#3e7dca] hover:bg-blue-50 hover:border-blue-100 rounded-full bg-white">
                                Call 1066
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <Section className="py-20">
                <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12">

                    {/* Left Column: Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Treatment Content */}
                        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-strong:text-slate-900">
                            {/*  
                                Ideally this would be a Rich Text renderer. 
                                For now, we accept basic HTML or text from the DB. 
                                Since we seeded text, we display it simply.
                           */}
                            <div dangerouslySetInnerHTML={{ __html: treatment.content || '' }} />
                        </div>

                        {/* Why Choose Us Block */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Choose Stork for {treatment.title}?</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    "Expert specialists with years of experience",
                                    "Advanced diagnostic and treatment technologies",
                                    "Personalized care plans tailored to your needs",
                                    "Comprehensive post-treatment support",
                                    "State-of-the-art operation theaters",
                                    "24/7 Emergency and critical care backup"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#ff8202] mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Sticky Card */}
                        <div className="sticky top-24 space-y-6">

                            {/* Consultation Card */}
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Need a Consultation?</h3>
                                <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                                    Speak to our experts today to find the best treatment plan for you.
                                </p>
                                <div className="space-y-4">
                                    <Button className="w-full h-14 text-base font-bold bg-[#3e7dca] hover:bg-[#2d62a3] text-white rounded-xl shadow-lg shadow-blue-500/20 group">
                                        <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                        Book Appointment
                                    </Button>
                                    <Button variant="outline" className="w-full h-14 text-base font-bold border-slate-200 text-slate-700 hover:text-[#ff8202] hover:bg-orange-50 hover:border-orange-200 rounded-xl bg-transparent">
                                        <Phone className="w-5 h-5 mr-2" />
                                        Call 24/7: 1066
                                    </Button>
                                </div>
                            </div>

                            {/* Emergency Helper */}
                            <div className="bg-[#1e293b] p-6 rounded-2xl text-white">
                                <h4 className="font-bold text-lg mb-2">Not sure what you need?</h4>
                                <p className="text-slate-300 text-sm mb-4">
                                    Our medical counselors can help guide you to the right specialist.
                                </p>
                                <Link href="/contact" className="inline-flex items-center text-[#ff8202] font-bold text-sm hover:underline">
                                    Contact Support <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}

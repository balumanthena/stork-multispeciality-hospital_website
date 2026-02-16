import { notFound } from "next/navigation"
import { TREATMENTS_DATA } from "@/lib/data/treatments"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, Calendar, Phone } from "lucide-react"

// Generate static params for all known treatments
export async function generateStaticParams() {
    return Object.keys(TREATMENTS_DATA).map((slug) => ({
        slug: slug,
    }))
}

export default async function TreatmentPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const treatment = TREATMENTS_DATA[slug]

    if (!treatment) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* HER */}
            <section className="relative pt-32 pb-20 bg-slate-50 border-b border-slate-100">
                <div className="container mx-auto px-6 relative z-10">
                    <nav className="flex items-center text-sm font-medium text-slate-500 mb-8">
                        <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <span className="text-slate-900 font-semibold">Treatments</span>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <span className="text-[var(--color-primary)] font-semibold">{treatment.title}</span>
                    </nav>

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        {treatment.title}
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
                        {treatment.description}
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <Section className="py-20">
                <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="prose prose-lg prose-slate max-w-none">
                            <p className="text-lg leading-relaxed text-slate-700">
                                {treatment.content}
                            </p>

                            <h3>Why Choose Us?</h3>
                            <ul>
                                <li>Expert specialists with years of experience.</li>
                                <li>Advanced diagnostic and treatment technologies.</li>
                                <li>Personalized care plans tailored to your needs.</li>
                                <li>Comprehensive post-treatment support.</li>
                            </ul>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className="space-y-8">
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Need a Consultation?</h3>
                            <p className="text-slate-600 mb-6">
                                Speak to our experts today to find the best treatment plan for you.
                            </p>
                            <div className="space-y-4">
                                <Button className="w-full h-12 text-base font-semibold bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 gap-2">
                                    <Calendar className="w-4 h-4" /> Book Appointment
                                </Button>
                                <Button variant="outline" className="w-full h-12 text-base font-semibold border-slate-200 text-slate-700 hover:text-[var(--color-primary)] hover:bg-white gap-2">
                                    <Phone className="w-4 h-4" /> Call 1066
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}

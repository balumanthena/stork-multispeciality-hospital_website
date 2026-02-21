import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    CheckCircle2, ChevronRight, HeartPulse, ClipboardCheck, ArrowRight, Calendar
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"

export const GeneralMedicineContent = ({ blogs }: { blogs: any[] }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
            {/* SECTION 1: HERO */}
            <section className="relative pt-32 pb-24 border-b border-slate-100 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-6 relative z-10">
                    <nav className="flex items-center text-sm font-medium text-slate-500 mb-8">
                        <Link href="/" className="hover:text-[#3E7DCA] transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <Link href="/services" className="hover:text-[#3E7DCA] transition-colors">Centers of Excellence</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <span className="text-[#0F172A] font-semibold">General Medicine</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Your First Stop for <br />
                                <span className="text-[#FF8202]">Everyday Health Concerns</span>
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                Whether it's fever, fatigue, or long-term conditions like diabetes or BP, our general physicians guide your care with clarity, calm, and compassion.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Fever, BP, Diabetes & Daily Health Issues Managed",
                                    "Senior Physicians with Clear Diagnosis & Care",
                                    "Routine Check-ups & Lifestyle Guidance"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center text-[#3E7DCA]">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </div>
                                        <span className="text-lg font-medium text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5">
                                <Button className="h-14 px-10 text-base font-bold bg-[#FF8202] hover:bg-[#e67600] text-white rounded-full shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1">
                                    Book Consultation
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-[#3E7DCA] text-[#3E7DCA] hover:bg-blue-50 rounded-full">
                                    Schedule Health Check
                                </Button>
                            </div>
                        </div>

                        <DepartmentHeroIcon slug="general-medicine" />
                    </div>
                </div>
            </section>

            {/* SECTION 2: INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Not All Illnesses Shout. Some Just Whisper. <br />
                        <span className="text-[#3E7DCA]">We Listen to Both.</span>
                    </h2>

                    <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed mb-12">
                        <p>Sometimes it’s a lingering fatigue.</p>
                        <p>A dry cough that’s overstayed its welcome.</p>
                        <p>A blood sugar reading that caught you off guard.</p>
                        <p className="font-medium text-slate-800">General medicine isn’t just about treating diseases — it’s about understanding patterns, preventing complications, and making sense of symptoms before they become emergencies.</p>
                    </div>

                    <p className="text-xl text-slate-800 font-medium max-w-3xl mx-auto leading-relaxed">
                        At Stork Multispecialty Hospital, Hyderabad, our General Medicine Department is the first stop for patients who want answers, guidance, or just reassurance. From unexplained fever to long-term conditions like diabetes, we care for everyday health concerns with consistency, compassion, and medical clarity.
                    </p>
                </div>
            </Section>

            {/* SECTION 3: WHY CHOOSE STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Choose Stork for <span className="text-[#FF8202]">General Medicine?</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            Because not every illness needs a specialist. But every patient deserves one-on-one attention, the right tests, and the right advice.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Highly experienced general physicians in Hyderabad",
                            "Same-day consultation, evaluation, and blood work",
                            "Expert management of fever, infections, fatigue, headaches, and chronic conditions",
                            "Trusted diagnosis when symptoms are vague or confusing",
                            "Ongoing care for hypertension, diabetes, thyroid disorders, and asthma",
                            "Strong focus on preventive care and early warning signs",
                            "Seamless coordination with other specialists when needed",
                            "Centrally located in Kompally, near DMart — walk in or book online"
                        ].map((point, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-blue-100 transition-colors">
                                <div className="mt-1 h-5 w-5 rounded-full bg-blue-50 text-[#3E7DCA] flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-slate-700 font-medium">{point}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center border-t border-slate-200 pt-12">
                        <p className="text-2xl font-serif italic text-slate-800">
                            We don’t just check your vitals. <br />
                            <span className="font-bold not-italic text-[#3E7DCA] block mt-2">We check your story because that’s where real healing begins.</span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4: CONDITIONS WE MANAGE */}
            <Section className="py-24 bg-white">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            Conditions We Regularly Manage
                        </h2>
                        <p className="text-lg text-slate-500">
                            Our physicians act as primary care providers for a wide range of health concerns, including:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            "Fever, flu, viral infections",
                            "Cough, cold, throat pain, and seasonal allergies",
                            "Headache, body aches, or unexplained fatigue",
                            "Gastric issues – acidity, bloating, nausea",
                            "Lifestyle diseases – diabetes, high blood pressure, high cholesterol",
                            "Thyroid imbalances – hypothyroidism, hyperthyroidism",
                            "Respiratory conditions – asthma, bronchitis, breathlessness",
                            "General infections – urinary tract, skin, or digestive tract",
                            "Routine check-ups and health screening for all age groups"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="h-2 w-2 rounded-full bg-[#FF8202]"></div>
                                <span className="text-slate-700 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-lg text-slate-600 font-medium max-w-4xl mx-auto">
                            We also help patients with multi-symptom presentations where the root cause is unclear bringing diagnosis and direction without the stress of over-referrals.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5: PREVENTION & LONG-TERM CARE */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Holistic Health</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Prevention, <br /> Not Just Prescription
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                At Stork, we believe the best treatment is often early detection and lifestyle alignment. That’s why our general medicine team is also your long-term health ally.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <p className="text-lg font-bold text-white mb-6">We help with:</p>
                            <ul className="space-y-5">
                                {[
                                    "Annual health check-ups for men, women, and senior citizens",
                                    "Diabetes and blood pressure monitoring",
                                    "Diet, sleep, and stress counseling",
                                    "Timely referrals to cardiology, endocrinology, or pulmonology when necessary",
                                    "Vaccinations, travel health guidance, and post-illness recovery monitoring"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <HeartPulse className="h-6 w-6 text-[#FF8202] flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-200 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            {/* RELATED BLOGS SECTION */}
            {blogs.length > 0 && (
                <Section className="py-24 bg-white border-t border-slate-200">
                    <div className="container max-w-7xl mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-3 block">Expert Insights</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Related Articles</h2>
                            </div>
                            <Link href="/blog">
                                <Button variant="ghost" className="hidden sm:flex items-center text-[#3E7DCA] hover:text-[#2d62a3] hover:bg-blue-50">
                                    View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <Link href={`/blog/${blog.slug}`} key={blog.id} className="group flex flex-col h-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-[16/10] relative overflow-hidden bg-slate-200">
                                        {blog.image_url ? (
                                            <Image src={blog.image_url} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                                <span>No image</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#3E7DCA] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#3E7DCA] transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                                            {blog.excerpt}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-slate-100">
                                            <span className="text-sm font-semibold text-[#FF8202] flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read Article <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            {/* SECTION 6: FAQ */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "When should I see a general physician instead of a specialist?",
                                a: "Start with a general physician when your symptoms are new, mild, or unclear. They’ll guide you toward the right treatment or refer you if needed."
                            },
                            {
                                q: "Can I manage diabetes or blood pressure without a specialist?",
                                a: "Yes. Many patients rely on general medicine doctors for chronic condition management, with specialist input only when required."
                            },
                            {
                                q: "Do you offer full body check-ups?",
                                a: "Absolutely. We offer health screening packages for different age groups and needs including reports, doctor review, and follow-up."
                            },
                            {
                                q: "Is this covered by insurance?",
                                a: "Yes, many consultations, tests, and chronic disease treatments are covered. Our billing desk can assist with plan details and documentation."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 p-8 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                                <h3 className="text-lg font-bold text-[#0F172A] mb-3 flex items-start gap-3">
                                    <span className="text-[#FF8202] font-black">Q.</span>
                                    {faq.q}
                                </h3>
                                <p className="text-slate-600 leading-relaxed pl-7 border-l-2 border-slate-200 ml-1">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* FOOTER CTA */}
            <section className="bg-[#FF8202] py-24 text-center">
                <div className="container max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                        Good Health Starts Here.
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Compassionate care for your everyday medical needs.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button size="lg" className="h-16 px-12 text-lg font-bold bg-[#3E7DCA] hover:bg-[#2d62a3] text-white rounded-full shadow-xl">
                            Book Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent">
                            Call 1066
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

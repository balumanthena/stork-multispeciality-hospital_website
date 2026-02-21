import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Scissors, Activity, ShieldCheck, CheckCircle2,
    Phone, Calendar, Star, Quote, MapPin, Clock, ChevronRight, Microscope,
    Stethoscope, FileText
, ArrowRight } from "lucide-react"
import Link from "next/link"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"

export const GeneralSurgeryContent = ({ blogs }: { blogs: any[] }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
            {/* SECTION 1: HERO */}
            <section className="relative pt-32 pb-24 border-b border-slate-100 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-6 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm font-medium text-slate-500 mb-8">
                        <Link href="/" className="hover:text-[#3E7DCA] transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <Link href="/departments" className="hover:text-[#3E7DCA] transition-colors">Centers of Excellence</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <span className="text-[#0F172A] font-semibold">General & Laparoscopic Surgery</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Trusted Surgeons for <br />
                                <span className="text-[#FF8202]">Painless, Precision Procedures</span>
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                Get expert care for hernia, gallbladder, piles, and more — with minimal scars and faster recovery. Book your consultation with Hyderabad’s leading surgical team.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Minimally Invasive Surgery with Faster Recovery",
                                    "Expert Surgeons for Hernia, Gallbladder & More",
                                    "Daycare Surgery Options with Insurance Support"
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
                                    Book Surgical Consultation
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-[#3E7DCA] text-[#3E7DCA] hover:bg-blue-50 rounded-full">
                                    Explore Procedures
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <DepartmentHeroIcon slug="general-surgery" />
                    </div>
                </div>
            </section>

            {/* SECTION 2: INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Expert Surgical Solutions with a <span className="text-[#3E7DCA]">Personal Touch</span>
                    </h2>

                    <p className="text-xl text-slate-800 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                        At Stork Multispecialty Hospital, we believe surgical care should be precise, efficient, and deeply human. Our General & Laparoscopic Surgery Department brings together seasoned surgeons, cutting-edge technology, and a commitment to safety offering you the best possible outcome with the least disruption to your life.
                    </p>

                    <p className="text-lg text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
                        We specialize in laparoscopic (minimally invasive) surgeries that prioritize comfort and recovery. With smaller cuts, lower infection risk, and faster healing, this modern approach has become the standard of care for many surgical needs.
                    </p>
                </div>
            </Section>

            {/* SECTION 3: WHY STORK IS TRUSTED */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Stork is a Trusted Choice for <span className="text-[#FF8202]">Surgery in Hyderabad</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            Patients choose us not just for our surgical skills, but for how we treat them with respect, transparency, and constant support.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Senior laparoscopic and general surgeons with vast hands-on experience",
                            "Fully equipped modular operation theaters with HD laparoscopy units",
                            "Skilled anesthesiology, nursing, and post-op support teams",
                            "Clear, step-by-step surgical guidance from consultation to recovery",
                            "24x7 ICU, trauma, and emergency response availability",
                            "Transparent estimates and insurance-accepted surgery packages",
                            "Hygienic, patient-friendly recovery rooms and day-care surgery options",
                            "Located in Kompally – easily reachable for patients across Hyderabad"
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
                            We don’t just perform surgeries <br />
                            <span className="font-bold not-italic text-[#3E7DCA] block mt-2">we help you walk in strong and walk out stronger.</span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4: WHAT WE TREAT & OPERATE */}
            <Section className="py-24 bg-white">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            What We Treat & Operate
                        </h2>
                        <p className="text-lg text-slate-500">
                            Our department covers a wide range of surgical conditions, including:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            "Gallbladder Stones – treated via laparoscopic cholecystectomy",
                            "Appendicitis – laparoscopic removal with rapid recovery",
                            "Hernias – all types (inguinal, umbilical, incisional, femoral)",
                            "Piles, Fissures, Fistula – laser and conventional treatments",
                            "Thyroid Swelling – safe and clean surgical excision",
                            "Breast Lumps – surgical removal with lab analysis",
                            "Abscess, Cysts & Minor Skin Surgeries",
                            "Pilonidal Sinus & Varicose Veins"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="h-2 w-2 rounded-full bg-[#FF8202]"></div>
                                <span className="text-slate-700 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-lg text-slate-600 font-medium">
                            We also provide emergency interventions and trauma wound care with surgical precision.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5: THE LAPAROSCOPIC ADVANTAGE */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Modern Surgery</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                The Laparoscopic <br /> Advantage
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                Choosing laparoscopic surgery means:
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "Tiny incisions with minimal scarring",
                                    "Lower risk of wound infection",
                                    "Less post-surgery discomfort",
                                    "Shorter hospital stay (often discharged within a day)",
                                    "Faster return to work and daily life"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <Microscope className="h-6 w-6 text-[#FF8202] flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-200 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-16 pt-12 border-t border-white/10">
                        <p className="text-2xl font-medium text-white">
                            For patients seeking minimally invasive surgery in Hyderabad, <br />
                            <span className="text-[#3E7DCA]">Stork Hospital delivers the ideal combination of technical skill and patient-centered recovery.</span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6: PATIENT SUPPORT & CARE */}
            <Section className="py-24 bg-white border-b border-slate-100">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">
                        We Make Surgery Feel <span className="text-[#3E7DCA]">Less Overwhelming</span>
                    </h2>

                    <p className="text-lg text-slate-600 font-light leading-relaxed mb-12">
                        Undergoing surgery can be emotionally challenging. That’s why we focus on:
                    </p>

                    <div className="text-left bg-slate-50 rounded-2xl p-10 border border-slate-200 max-w-3xl mx-auto mb-12">
                        <ul className="space-y-4">
                            {[
                                "One-on-one discussions with your surgeon before and after surgery",
                                "Complete explanation of the procedure, risks, and aftercare",
                                "Guidance with pre-operative lab tests and medical clearance",
                                "Physical and emotional readiness for every patient",
                                "Support with insurance paperwork and post-discharge care"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700">
                                    <ShieldCheck className="h-5 w-5 text-[#3E7DCA]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xl font-medium text-slate-800 max-w-3xl mx-auto">
                        Whether it’s a routine hernia repair or laparoscopic gallbladder removal, <span className="text-[#FF8202]">we ensure your comfort and clarity at every step.</span>
                    </p>
                </div>
            </Section>

            {/* SECTION 7: FAQ */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Frequently Asked Questions (FAQs)</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "What are the benefits of laparoscopic over traditional open surgery?",
                                a: "Laparoscopic procedures offer faster recovery, less pain, and smaller scars. They are also associated with reduced infection rates and quicker return to routine life."
                            },
                            {
                                q: "How long will I need to stay in the hospital after my surgery?",
                                a: "Most laparoscopic surgeries allow for discharge within 24 hours. Some are even done as day-care procedures."
                            },
                            {
                                q: "Do you accept health insurance for surgery?",
                                a: "Yes, we support both cashless and reimbursement options with most leading insurance providers. Feel free to contact us to check your eligibility."
                            },
                            {
                                q: "What happens if my case is an emergency?",
                                a: "Our surgical team is on standby 24/7 for emergency procedures. Just call our emergency number or visit us directly."
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

            
            {/* RELATED BLOGS SECTION */}
            {blogs && blogs.length > 0 && (
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

            {/* FOOTER CTA */}
            <section className="bg-[#FF8202] py-24 text-center">
                <div className="container max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                        Ready for Expert Surgical Care?
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Book a consultation with our experienced surgeons today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button size="lg" className="h-16 px-12 text-lg font-bold bg-[#3E7DCA] hover:bg-[#2d62a3] text-white rounded-full shadow-xl">
                            Book Surgical Consultation
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

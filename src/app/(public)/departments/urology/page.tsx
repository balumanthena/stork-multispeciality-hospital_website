"use client"

import Link from "next/link"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Activity, CheckCircle2, ChevronRight, Droplet, User, Shield, Target, Clock, LucideIcon
} from "lucide-react"

export default function UrologyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">

            {/* SECTION 1 — HERO (Identical Layout to Cosmetic Page) */}
            <section className="relative pt-32 pb-24 border-b border-slate-100 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-6 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm font-medium text-slate-500 mb-8">
                        <Link href="/" className="hover:text-[#3E7DCA] transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <Link href="/departments" className="hover:text-[#3E7DCA] transition-colors">Centers of Excellence</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <span className="text-[#0F172A] font-semibold">Urology</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Expert Urologists in Hyderabad <span className="text-[#FF8202]">for Men’s & Women’s Health</span>
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                Treat urinary problems, kidney stones, prostate concerns, and more with complete privacy and world-class technology. Book a discreet urology consultation today.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Complete Care for Kidney, Bladder & Prostate Issues",
                                    "Expert Urologists in a Discreet Environment",
                                    "Painless Laser Procedures, Quick Recovery"
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
                                    Book Urology Consultation
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#3E7DCA] hover:text-[#3E7DCA] rounded-full">
                                    Consult Urologist
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <DepartmentHeroIcon slug="urology" />
                    </div>
                </div>
            </section>

            {/* SECTION 2 — INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Urology Concerns Deserve <br />
                        <span className="text-[#3E7DCA]">More Than Silence. Get Answers Today</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-8 space-y-6">
                        <p>
                            Discomfort while urinating. Pain that won’t pass. Questions you’re too hesitant to ask. Urology concerns often go unspoken not because they’re minor, but because they’re personal.
                        </p>
                        <p className="font-medium text-slate-800">
                            At Stork Multispecialty Hospital, Hyderabad, we understand that urological issues come with more than just physical symptoms they come with hesitation, silence, and sometimes even shame. That’s why our Urology Department offers more than just treatment. we offer reassurance, privacy, and a pathway to relief that feels safe, respectful, and empowering.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 3 — WHY CHOOSE STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Patients Choose <span className="text-[#3E7DCA]">Stork for Urology</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            You’re not just a case to us. You’re a person who deserves to feel normal again without judgment or delay.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Dedicated, experienced urologists in Hyderabad",
                            "Quiet, private consultation spaces designed for comfort",
                            "Advanced diagnostics: uroflowmetry, cystoscopy, ultrasound, and imaging",
                            "Laser and endoscopic procedures that reduce recovery time",
                            "Day-care urology surgeries. no long hospital stays",
                            "Support for male reproductive health, fertility, and sexual function",
                            "Insurance-ready billing and easy access for families in Kompally and beyond",
                            "24/7 assistance for urinary emergencies or sudden pain episodes"
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
                            "When you're ready to talk, we're ready to help. no awkwardness, no assumptions."
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4 — CONDITIONS WE TREAT (Cosmetic Procedures Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            What We Treat, <span className="text-[#FF8202]">Quietly and Confidently</span>
                        </h2>
                        <p className="text-lg text-slate-500">
                            Our Urology Department manages a wide range of conditions, including:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Common Urology - Orange theme */}
                        <div className="bg-[#FFF7ED] rounded-3xl p-10 border border-orange-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#FF8202] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Core Conditions</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Kidney stones – from mild to complex cases requiring URS or PCNL",
                                    "Prostate enlargement (BPH) – managed with medication or surgery (TURP)",
                                    "Recurrent UTIs – in men, women, and elderly patients",
                                    "Bladder control issues – incontinence, urgency, dribbling",
                                    "Blood in urine or suspected bladder/kidney tumors"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF8202] mt-2 flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Men's Health & Specialized - Blue theme */}
                        <div className="bg-[#F0F9FF] rounded-3xl p-10 border border-blue-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#3E7DCA] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <User className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Specialized Health</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Sexual health concerns – erectile dysfunction, premature ejaculation",
                                    "Male fertility problems – low sperm count, varicocele, hormonal imbalances",
                                    "Hydrocele, testicular pain, undescended testis",
                                    "Urethral stricture or slow urine flow"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#3E7DCA] mt-2 flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-16 max-w-3xl mx-auto">
                        <p className="text-lg text-slate-500 font-light italic border-l-4 border-[#3E7DCA] pl-6 py-2 bg-slate-50 rounded-r-lg">
                            Each condition is approached with sensitivity, clarity, and a focus on making the patient feel safe throughout.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5 — PROCEDURES (Dark Section) */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Our Approach</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Small Procedures, <br />
                                Big Relief
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                At Stork, urology surgery doesn’t mean big cuts or long recovery. We use minimally invasive procedures wherever possible:
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "URS (Ureteroscopy) – for removing stones from ureter or kidney",
                                    "PCNL – for large or impacted stones",
                                    "TURP – safe and effective prostate surgery",
                                    "Cystoscopy – to diagnose and treat bladder conditions",
                                    "Laser circumcision and hydrocele repair",
                                    "Pediatric procedures with minimal trauma and fast recovery"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <Target className="h-6 w-6 text-[#FF8202] flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-200 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-16 pt-12 border-t border-white/10">
                        <p className="text-2xl font-medium text-white">
                            Many of these are done as same-day procedures. You walk in, <span className="text-[#3E7DCA]">walk out with relief</span> and clarity.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6 — PATIENT EXPERIENCE (Modified Introduction Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        A Space Built for <br />
                        <span className="text-[#3E7DCA]">Privacy and Peace of Mind</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-12 space-y-6">
                        <p>
                            We’ve created a setting where difficult conversations become just a little easier:
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-left max-w-3xl mx-auto shadow-sm">
                        <ul className="space-y-4">
                            {[
                                "One-patient-one-room consultations",
                                "Gender-sensitive staff for intimate issues",
                                "Honest explanations in everyday language",
                                "Fully private diagnostic and treatment areas",
                                "Quiet follow-up system with flexible timing"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 text-[#3E7DCA] flex items-center justify-center flex-shrink-0">
                                        <Shield className="h-3 w-3" />
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xl font-medium text-slate-800 mt-12">
                        Because it’s not just about treating the problem. it’s about preserving your dignity while doing it.
                    </p>
                </div>
            </Section>

            {/* SECTION 7 — FAQ (Card Implementation) */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Frequently Asked Questions (FAQs)</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "How do I know if I need to see a urologist?",
                                a: "If you're experiencing pain while urinating, increased frequency, weak urine stream, blood in urine, or any sexual health issues, it's best to consult early."
                            },
                            {
                                q: "Can kidney stones pass without surgery?",
                                a: "Small stones may pass naturally with medication. Others may require laser or endoscopic removal for long-term relief."
                            },
                            {
                                q: "Are my fertility consultations confidential?",
                                a: "Absolutely. All records, tests, and discussions are handled with the utmost discretion."
                            },
                            {
                                q: "Does my insurance cover these treatments?",
                                a: "Yes, most of our procedures are covered under major health insurance plans. We assist with claim submissions and approvals."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg hover:border-blue-100 transition-all duration-300">
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
                        Ready to Schedule Your Visit?
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button size="lg" className="h-16 px-12 text-lg font-bold bg-[#3E7DCA] hover:bg-[#2d62a3] text-white rounded-full shadow-xl">
                            Book Urology Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent">
                            Consult Urologist
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

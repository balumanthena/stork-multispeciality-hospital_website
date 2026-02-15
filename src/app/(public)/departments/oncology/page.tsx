"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Dna, CheckCircle2, ChevronRight, Activity, HeartPulse, User,
    Shield, Stethoscope, Heart
} from "lucide-react"

export default function OncologyPage() {
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
                        <span className="text-[#0F172A] font-semibold">Oncology (Cancer Care)</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Cancer Care That Combines <span className="text-[#FF8202]">Science with Strength</span>
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                From diagnosis to survivorship, you’ll never walk alone. Get expert oncology care that’s clinical, compassionate, and completely focused on you.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Complete Cancer Care from Diagnosis to Recovery",
                                    "Expert Oncologists with Personalized Treatment Plans",
                                    "Daycare Chemo, Emotional & Family Support"
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
                                    Book Oncology Consultation
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#3E7DCA] hover:text-[#3E7DCA] rounded-full">
                                    Request Second Opinion
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <div className="hidden lg:flex h-64 w-64 rounded-3xl bg-white border border-slate-100 items-center justify-center flex-shrink-0 shadow-sm">
                            <Dna className="h-32 w-32 text-[#FF8202]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Expert Cancer Care That Sees the Person, <br />
                        <span className="text-[#3E7DCA]">Not Just the Diagnosis.</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-8 space-y-6">
                        <p>
                            Cancer doesn’t just arrive with test reports it arrives with a hundred emotions. Shock. Silence. Urgency. Uncertainty. But at Stork Multispecialty Hospital, we believe you deserve something stronger than fear: a team that stands with you, from day one.
                        </p>
                        <p className="font-medium text-slate-800">
                            Our Oncology Department offers more than a treatment plan. we offer clarity in the chaos. Whether you’re newly diagnosed or mid-journey, we walk with you gently, steadily, and confidently toward healing, relief, and life beyond cancer.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 3 — WHY CHOOSE STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            What Makes Cancer Care at <span className="text-[#3E7DCA]">Stork So Different?</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            We don’t just treat cells, we care for humans. Real people with families, futures, and fears. At Stork, you’re not just a patient. You’re a partner in your fight.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Thoughtful, experienced medical, surgical & radiation oncologists",
                            "Transparent, collaborative tumor board discussions for each case",
                            "A calm, non-intimidating environment designed for healing",
                            "Personalized, stage-wise treatment strategies",
                            "Minimally invasive cancer surgeries with a recovery-first focus",
                            "Gentle chemotherapy and immunotherapy delivery often in a day-care setting",
                            "End-to-end insurance support with guided paperwork",
                            "Based in Kompally accessible but away from the clinical noise of big city centers"
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
                            "This is not a cancer ward. This is your recovery ground."
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4 — CONDITIONS WE TREAT (Cosmetic Procedures Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            Cancers We Treat with <span className="text-[#FF8202]">Compassion and Clarity</span>
                        </h2>
                        <p className="text-lg text-slate-500">
                            We provide evidence-based treatment for:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Common Cancers - Orange theme */}
                        <div className="bg-[#FFF7ED] rounded-3xl p-10 border border-orange-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#FF8202] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <HeartPulse className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Common Cancers</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Breast cancer – with full reconstruction and aesthetic recovery options",
                                    "Lung cancer – with biopsy, staging, and targeted therapy",
                                    "Head, neck & oral cancers – common but beatable when caught early",
                                    "Gastrointestinal cancers – including liver, colon, stomach, and pancreas",
                                    "Gynecologic cancers – ovarian, cervical, endometrial"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF8202] mt-2 flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Complex & Specialized Cancers - Blue theme */}
                        <div className="bg-[#F0F9FF] rounded-3xl p-10 border border-blue-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#3E7DCA] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Specialized Care</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Prostate, bladder & kidney cancers",
                                    "Leukemia & lymphomas – including adult and pediatric blood cancers",
                                    "Thyroid, soft tissue, and rare tumors",
                                    "Palliative oncology care – because quality of life matters too"
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
                            Every care plan is unique built around your condition, your strength, your life.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5 — TREATMENT APPROACH (Dark Section) */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Our Approach</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Our Treatment Philosophy: <br />
                                Healing with Heart
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                At Stork, treatment is never rushed or robotic. It’s paced with precision and powered by presence. Our approach includes:
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "Chemotherapy, immunotherapy, and biologic therapies",
                                    "Organ-preserving surgeries where possible",
                                    "Minimally invasive tumor resections",
                                    "Access to top radiation therapy partners",
                                    "Day-care infusion center with personalized support",
                                    "Post-treatment planning for hormonal recovery, nutrition, and fatigue care",
                                    "Second opinions for peace of mind with respect, not pressure"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <CheckCircle2 className="h-6 w-6 text-[#FF8202] flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-200 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-16 pt-12 border-t border-white/10">
                        <p className="text-2xl font-medium text-white">
                            We know what to fight. But more importantly, we know how to <span className="text-[#3E7DCA]">fight with you</span>.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6 — SUPPORT SYSTEM (Modified Introduction Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        The Support You Didn’t Know <br />
                        <span className="text-[#3E7DCA]">You’d Need But Deserve</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-12 space-y-6">
                        <p>
                            Cancer doesn’t just affect the body. It alters how you see yourself. How your family sleeps. How the days stretch and shrink.
                        </p>
                        <p className="font-medium text-slate-800">
                            That’s why our support includes:
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-left max-w-3xl mx-auto shadow-sm">
                        <ul className="space-y-4">
                            {[
                                "Psycho-oncology counseling for both patients and caregivers",
                                "Nutrition planning for appetite loss, fatigue, and immunity",
                                "Gentle physiotherapy post-surgery or post-therapy",
                                "Palliative and pain relief support when cure isn't the goal, but comfort is",
                                "Support groups, if you want them. Quiet space, if you don’t."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 text-[#3E7DCA] flex items-center justify-center flex-shrink-0">
                                        <Heart className="h-3 w-3" />
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xl font-medium text-slate-800 mt-12">
                        You don’t have to hold it all together. We’re trained to carry the weight with you.
                    </p>
                </div>
            </Section>

            {/* SECTION 7 — FAQ (Card Implementation) */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "How soon should I begin treatment after diagnosis?",
                                a: "Once your full workup is done, we help you begin promptly ensuring you're emotionally ready and medically prepared."
                            },
                            {
                                q: "What if I’ve already started treatment elsewhere?",
                                a: "We offer respectful second opinions, or treatment continuation plans if you wish to transition to Stork."
                            },
                            {
                                q: "Do I have to stay in the hospital for chemotherapy?",
                                a: "Not always. Many patients receive chemotherapy in our day-care infusion unit and return home the same evening."
                            },
                            {
                                q: "Will my insurance cover this?",
                                a: "Most likely, yes. Cancer care is covered under most major plans, and our insurance team handles everything quietly and swiftly."
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
                            Book Oncology Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent">
                            Request Second Opinion
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Wind, CheckCircle2, ChevronRight, Flower2, Moon, Leaf, AlertCircle, Shield, LucideIcon
} from "lucide-react"

export default function PulmonologyPage() {
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
                        <span className="text-[#0F172A] font-semibold">Pulmonology</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Breathe Easier with <span className="text-[#FF8202]">Hyderabad’s Best</span> Lung Specialists
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                From asthma to post-COVID breathlessness, get clear answers and long-term lung support from our compassionate pulmonology team. Relief starts now.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Feel the Freedom of a Full, Deep Breath Again",
                                    "Lung Healing That Goes Beyond Inhalers and X-rays",
                                    "Post-COVID Recovery & Sleep Apnea Support Available"
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
                                    Book Pulmonology Consultation
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#3E7DCA] hover:text-[#3E7DCA] rounded-full">
                                    Consult Lung Specialist
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <div className="hidden lg:flex h-64 w-64 rounded-3xl bg-white border border-slate-100 items-center justify-center flex-shrink-0 shadow-sm">
                            <Wind className="h-32 w-32 text-[#FF8202]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        When Breathing Feels Like a Struggle, <br />
                        <span className="text-[#3E7DCA]">We Help You Catch Your Calm</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-8 space-y-6">
                        <p>
                            You shouldn’t have to measure your steps. Or plan your day around a cough. Or feel your chest tighten just because the weather changed.
                        </p>
                        <p className="font-medium text-slate-800">
                            If breathing has become a struggle quiet or loud. you deserve more than a diagnosis. You deserve to breathe with ease, without fear, and without wondering if it’s “just in your head.”
                        </p>
                        <p>
                            At Stork Multispecialty Hospital, Hyderabad, our Pulmonology Department is built to help you reclaim what should come naturally. your breath, your calm, and your energy.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 3 — WHY CHOOSE STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Patients With <span className="text-[#3E7DCA]">Breathing Trouble Choose Stork</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            Because we don’t just ask “what’s wrong with your lungs?” We ask: “What’s this taking away from your life and how can we help get it back?”
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Experienced lung and respiratory specialists in Hyderabad",
                            "Quiet, comfortable diagnostics space. no rush, no pressure",
                            "Real answers for chronic cough, breathlessness, and wheezing",
                            "Advanced care for asthma, COPD, bronchitis, and interstitial lung disease",
                            "Sleep apnea diagnosis and breathing support devices",
                            "Post-COVID lung recovery programs tailored to your baseline",
                            "Smoking damage reversal strategies and counselling",
                            "Allergy-focused care for recurring respiratory flare-ups",
                            "Located in peaceful Kompally, close to home and care"
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
                            "This isn’t just lung treatment. It’s life rebalanced one breath at a time."
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4 — CONDITIONS WE TREAT (Cosmetic Procedures Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            Conditions We <span className="text-[#FF8202]">Specialize In</span>
                        </h2>
                        <p className="text-lg text-slate-500">
                            We treat patients who are tired of gasping, guessing, and Googling symptoms. Our focus includes:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Common Respiratory - Orange theme */}
                        <div className="bg-[#FFF7ED] rounded-3xl p-10 border border-orange-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#FF8202] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <Wind className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Core Lung Care</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Unexplained chronic cough or tightness in the chest",
                                    "Asthma in children, adults, and elderly",
                                    "Chronic Obstructive Pulmonary Disease (COPD)",
                                    "Recurrent respiratory infections and long flu recovery",
                                    "Interstitial Lung Disease (ILD) and fibrosis"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF8202] mt-2 flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sleep & Specialized - Blue theme */}
                        <div className="bg-[#F0F9FF] rounded-3xl p-10 border border-blue-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#3E7DCA] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Moon className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Specialized Issues</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Sleep apnea & snoring impacting your energy and heart health",
                                    "Allergy-related breathing issues and seasonal wheezing",
                                    "Post-COVID breathing fatigue and oxygen dependency",
                                    "Tuberculosis (TB) – both active and post-treatment follow-up",
                                    "Environmental and occupational lung diseases"
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
                            Even if your scans are clear, if your breath isn’t we investigate further. Because “normal tests” shouldn’t mean ignored symptoms.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5 — DIAGNOSTIC & TECHNOLOGY APPROACH (Dark Section) */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Our Approach</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Tools That Go Beyond <br />
                                Guesswork
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                We combine technology with thoughtful interpretation. No rushing. No oversimplifying. Just focused answers.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "Pulmonary Function Testing (PFT) to understand how your lungs really perform",
                                    "Bronchoscopy minimally invasive airway exam when needed",
                                    "Sleep study (polysomnography) for diagnosing nighttime breathing problems",
                                    "Chest X-ray, high-resolution CT (HRCT), and ABG under one roof",
                                    "Oxygen therapy setup and BiPAP/CPAP devices for home use",
                                    "Trigger identification and allergy panels"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <AlertCircle className="h-6 w-6 text-[#FF8202] flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-200 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-16 pt-12 border-t border-white/10">
                        <p className="text-2xl font-medium text-white">
                            Our aim isn’t to scare or medicate. It’s to <span className="text-[#3E7DCA]">empower</span> with clear reports, real results, and respectful plans.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6 — PATIENT SUPPORT (Modified Introduction Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        We Don't Just Restore Lungs. <br />
                        <span className="text-[#3E7DCA]">We Rebuild Peace of Mind.</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-12 space-y-6">
                        <p>
                            Because breathlessness doesn’t just affect the lungs it affects confidence, sleep, emotions, and day-to-day joy.
                        </p>
                        <p className="font-medium text-slate-800">
                            That’s why we:
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-left max-w-3xl mx-auto shadow-sm">
                        <ul className="space-y-4">
                            {[
                                "Guide families on home ventilation and rescue care",
                                "Personalize inhaler routines and explain them patiently",
                                "Help smokers transition with lung detox support",
                                "Offer post-COVID lung function rebuilding plans",
                                "Teach lifestyle and environment adjustments that protect recovery"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 text-[#3E7DCA] flex items-center justify-center flex-shrink-0">
                                        <Leaf className="h-3 w-3" />
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xl font-medium text-slate-800 mt-12">
                        You’ll never leave with unanswered questions. Only with a plan and a little more air in your lungs than you walked in with.
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
                                q: "What if my reports look normal, but I still can’t breathe deeply?",
                                a: "That’s exactly why our team listens beyond the reports. Breathing discomfort can come from subtle airway inflammation, allergies, or post-viral fatigue."
                            },
                            {
                                q: "Is asthma lifelong?",
                                a: "Yes, but with correct diagnosis and consistent care, asthma can be invisible in your daily life even in athletes and performers."
                            },
                            {
                                q: "Do you help with sleep apnea and snoring?",
                                a: "Yes. Our sleep studies and CPAP/BiPAP therapy have helped many patients regain restful sleep and prevent long-term complications."
                            },
                            {
                                q: "Can I come here after recovering from COVID or TB?",
                                a: "Absolutely. We manage post-infection lung weakness and help you wean off oxygen or medications safely over time."
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
                            Book Pulmonology Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent">
                            Consult Lung Specialist
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

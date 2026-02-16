"use client"

import Link from "next/link"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Activity, CheckCircle2, ChevronRight, Zap, Target, Brain, Shield, LucideIcon
} from "lucide-react"

export default function PainManagementPage() {
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
                        <span className="text-[#0F172A] font-semibold">Pain Management</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Live Beyond the Pain. <span className="text-[#FF8202]">Expert Relief</span> Without Dependency
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                From back pain to migraines and arthritis, we help you regain control with personalized, non-invasive pain management plans. Move freely again.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Personalized Plans for Chronic Back, Joint & Nerve Pain",
                                    "Non-Surgical Relief by Expert Pain Specialists",
                                    "Minimal Medication, Maximum Mobility"
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
                                    Book Pain Consultation
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#3E7DCA] hover:text-[#3E7DCA] rounded-full">
                                    Consult Pain Specialist
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <DepartmentHeroIcon slug="pain-management" />
                    </div>
                </div>
            </section>

            {/* SECTION 2 — INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Relief Is Possible. <br />
                        <span className="text-[#3E7DCA]">You Don’t Have to Live with Pain Forever.</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-8 space-y-6">
                        <p>
                            You’ve learned to walk slower. Sleep lighter. Smile through it. But pain whether dull, sharp, or constant changes how you move, think, and feel every single day.
                        </p>
                        <p className="font-medium text-slate-800">
                            At Stork Multispecialty Hospital, Hyderabad, our Pain Management Department offers dedicated care for those who’ve been told to “live with it.” Whether it’s post-surgical pain, arthritis, migraines, or nerve issues, we design personalized, long-term strategies to manage pain without overmedicating, overlooking, or rushing you.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 3 — WHY CHOOSE STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Chronic Pain Needs a <span className="text-[#3E7DCA]">Different Kind of Attention</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            Pain isn’t always visible. But it’s real. At Stork, we take the time to understand not just where it hurts but how it affects your life.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Specialist-led pain management doctors in Hyderabad",
                            "Careful diagnosis of pain origin not just symptom suppression",
                            "Non-surgical and minimally invasive treatments",
                            "Integration of physiotherapy, medications, counselling, and lifestyle therapy",
                            "Targeted pain blocks, injections, and nerve modulation techniques",
                            "Safe management of arthritis, neuropathy, back pain, and migraine",
                            "Palliative support for cancer-related or terminal illness pain",
                            "Personalized, step-by-step plans designed for relief without dependency"
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
                            "Pain might be common but suffering silently doesn’t have to be."
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4 — CONDITIONS WE TREAT (Cosmetic Procedures Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            Conditions We <span className="text-[#FF8202]">Help You Manage</span>
                        </h2>
                        <p className="text-lg text-slate-500">
                            Our pain team works with patients at different stages from early aches to long-term conditions that haven’t responded to traditional treatment.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Chronic & Joint Pain - Orange theme */}
                        <div className="bg-[#FFF7ED] rounded-3xl p-10 border border-orange-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#FF8202] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Chronic & Joint Pain</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Chronic back pain and cervical spondylosis",
                                    "Knee arthritis and joint degeneration",
                                    "Frozen shoulder and repetitive strain injuries",
                                    "Pelvic pain, facial pain, and TMJ disorders",
                                    "Post-operative pain after spine, abdominal, or orthopedic surgeries"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF8202] mt-2 flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Nerve & Specialized Pain - Blue theme */}
                        <div className="bg-[#F0F9FF] rounded-3xl p-10 border border-blue-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#3E7DCA] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Nerve & Systemic Pain</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Nerve pain (neuropathy, sciatica, neuralgia)",
                                    "Migraine, tension headaches, cluster headaches",
                                    "Cancer-related pain",
                                    "Fibromyalgia or full-body sensitivity"
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
                            If your pain is affecting your focus, sleep, movement, or relationships, we’re ready to step in.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5 — OUR APPROACH (Dark Section) */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Our Approach</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Restore, Not Just Relieve
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                Pain care at Stork isn’t about masking symptoms it’s about interrupting the cycle of pain, inflammation, and limitation.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "Trigger point and nerve block injections",
                                    "Epidural and spinal injections for lower back or neck pain",
                                    "Radiofrequency ablation for long-term nerve pain relief",
                                    "Advanced physiotherapy for mobility and muscle control",
                                    "Cognitive & behavioral support to handle pain-related anxiety",
                                    "Guided rehabilitation after joint surgery or spinal trauma",
                                    "Non-opioid medication options to prevent dependency"
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
                            We focus on function: helping you return to work, walk longer, <span className="text-[#3E7DCA]">sleep deeper</span> and enjoy life without flinching.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6 — PERSONALIZED CARE (Modified Introduction Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Pain Looks Different on Everyone <br />
                        <span className="text-[#3E7DCA]">So Does Our Treatment</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-12 space-y-6">
                        <p>
                            No two patients describe pain the same way. That’s why your plan is built just for you:
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-left max-w-3xl mx-auto shadow-sm">
                        <ul className="space-y-4">
                            {[
                                "Comprehensive evaluation of pain type, history, and lifestyle",
                                "Collaborative care with orthopedics, neuro, physio, and mental wellness teams",
                                "Regular reviews so plans evolve as your body does",
                                "Options for interventional or supportive care only, as per your preference",
                                "Family education and caregiver involvement, where needed"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 text-[#3E7DCA] flex items-center justify-center flex-shrink-0">
                                        <Brain className="h-3 w-3" />
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xl font-medium text-slate-800 mt-12">
                        You’ll never be told “it’s in your head.” You’ll be asked, “Where does it hurt, and what does it stop you from doing?”
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
                                q: "When should I see a pain specialist?",
                                a: "If pain has lasted for more than 3 weeks, is recurring, or not responding to usual treatments. pain management consult is the right next step."
                            },
                            {
                                q: "Will I be put on heavy medication?",
                                a: "Not necessarily. We use a multimodal approach combining safe medication, targeted therapy, and procedures. Many plans are completely drug-light or drug-free."
                            },
                            {
                                q: "Is chronic pain curable?",
                                a: "Some causes are curable; others are manageable. The goal is always better quality of life, mobility, and control over flare-ups."
                            },
                            {
                                q: "Do you offer care for elderly or cancer patients in pain?",
                                a: "Yes. We provide compassionate pain relief for geriatric and palliative patients, with home-based care options if needed."
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
                            Book Pain Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent">
                            Consult Pain Specialist
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

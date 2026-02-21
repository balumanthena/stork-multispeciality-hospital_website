"use client"
import Image from "next/image"


import Link from "next/link"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    CircleSlash, CheckCircle2, ChevronRight, Zap, Target, Heart, Shield, Scale, Clock
, ArrowRight } from "lucide-react"

export const ProctologyContent = ({ blogs }: { blogs: any[] }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">

            {/* SECTION 1 — HERO (Identical Layout to Cosmetic Page) */}
            <section className="relative pt-32 pb-24 border-b border-slate-100 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-6 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm font-medium text-slate-500 mb-8">
                        <Link href="/" className="hover:text-[#3E7DCA] transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <Link href="/services" className="hover:text-[#3E7DCA] transition-colors">Centers of Excellence</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <span className="text-[#0F172A] font-semibold">Proctology</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Painless Relief from <span className="text-[#FF8202]">Piles, Fissures & Fistula</span> Starts Here
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                Say goodbye to discomfort and embarrassment with modern, daycare proctology procedures. No cuts. No stitches. Just fast healing and freedom.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Advanced Laser Treatment for Piles, Fissure & Fistula",
                                    "No Cuts, No Stitches, Same-Day Discharge",
                                    "Free Consult & Fast Recovery Plans"
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
                                    Book Proctology Consultation
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#3E7DCA] hover:text-[#3E7DCA] rounded-full">
                                    Consult Proctologist
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <DepartmentHeroIcon slug="proctology" />
                    </div>
                </div>
            </section>

            {/* SECTION 2 — INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Relief from Piles & Pain <br />
                        <span className="text-[#3E7DCA]">Without Embarrassment, Delay, or Discomfort</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-8 space-y-6">
                        <p>
                            There are some problems we try to ignore pain while sitting, bleeding during bowel movements, or itching that won’t go away. You don’t mention it to anyone, and hope it just disappears.
                        </p>
                        <p className="font-medium text-slate-800">
                            At Stork Multispecialty Hospital, Hyderabad, we understand how deeply personal these concerns can be. Our Proctology Department offers modern, minimally invasive care for conditions like piles, fissures, and fistulas in a space where you’ll be heard, not rushed. Treated, not judged.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 3 — WHY CHOOSE STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Stork Is the <span className="text-[#3E7DCA]">Right Place for Proctology Care</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            We’ve helped hundreds of patients get relief from conditions they were too embarrassed to talk about. You’ll find:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Highly trained proctologists and colorectal surgeons in Hyderabad",
                            "Use of laser procedures for faster healing with less pain",
                            "No-cut, no-stitch options for piles and fistula where possible",
                            "Same-day discharge, most patients return home within hours",
                            "Thoughtfully designed consultation spaces for complete privacy",
                            "Dedicated support for insurance coverage and approvals",
                            "Quick access from anywhere in Kompally, Petbasheerabad, and surrounding areas"
                        ].map((point, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-blue-100 transition-colors">
                                <div className="mt-1 h-5 w-5 rounded-full bg-blue-50 text-[#3E7DCA] flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-slate-700 font-medium">{point}</span>
                            </div>
                        ))}

                        <div className="col-span-1 md:col-span-2 mt-4 pt-6 border-t border-slate-200">
                            <p className="text-xl text-center font-serif italic text-slate-800">
                                "We don’t just treat your symptoms we make the process feel safe from the first visit to the last follow-up."
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* SECTION 4 — CONDITIONS WE TREAT (Cosmetic Procedures Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            What We Treat With <span className="text-[#FF8202]">Quiet Confidence</span>
                        </h2>
                        <p className="text-lg text-slate-500">
                            Proctology problems are often dismissed as “common” but can impact your daily life in frustrating ways. We help you deal with:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Piles, Fissures & Fistulas - Orange theme */}
                        <div className="bg-[#FFF7ED] rounded-3xl p-10 border border-orange-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#FF8202] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <Target className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Core Conditions</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Bleeding or painful piles (internal and external)",
                                    "Anal fissures that cause burning or tearing pain during motions",
                                    "Fistulas that lead to pus discharge and skin irritation",
                                    "Perianal abscesses – sudden, painful lumps near the anus"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF8202] mt-2 flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* General Discomfort - Blue theme */}
                        <div className="bg-[#F0F9FF] rounded-3xl p-10 border border-blue-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#3E7DCA] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Scale className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Related Issues</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Chronic constipation or straining",
                                    "Itching, skin tags, hygiene-related discomfort",
                                    "Rectal prolapse and age-related anorectal issues"
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
                            No unnecessary tests. No scare tactics. Just honest care and timely solutions.
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
                                Laser Precision, <br />
                                Minimal Pain, Maximum Relief
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                Many of our procedures are performed using modern laser or minimally invasive techniques that reduce downtime and discomfort:
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "Laser piles treatment – quick, bloodless, and scar-free",
                                    "Fistula surgery – laser-assisted or sphincter-sparing for full control",
                                    "Fissure management – gentle procedures with targeted relief",
                                    "Abscess drainage – done under safe, short sedation",
                                    "Advanced proctoscopy for diagnosis in less than 5 minutes"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <Zap className="h-6 w-6 text-[#FF8202] flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-200 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-16 pt-12 border-t border-white/10">
                        <p className="text-2xl font-medium text-white">
                            Most patients are back on their feet the <span className="text-[#3E7DCA]">next day</span>. no stitches, no overnight hospital stay, no repeated visits.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6 — PATIENT EXPERIENCE (Modified Introduction Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Our Promise: <br />
                        <span className="text-[#3E7DCA]">Privacy, Patience & Clarity</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-12 space-y-6">
                        <p>
                            People often live with proctology issues longer than they should not because they’re minor, but because they feel uncomfortable asking for help.
                        </p>
                        <p className="font-medium text-slate-800">
                            Here’s how we change that:
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-left max-w-3xl mx-auto shadow-sm">
                        <ul className="space-y-4">
                            {[
                                "Every consultation is private and unhurried",
                                "We explain procedures in clear, simple language",
                                "You choose the pace we support, not pressure",
                                "All your records are confidential",
                                "Female and male doctors available for gender-sensitive comfort"
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
                        At Stork, you don’t have to pretend everything’s okay. We already know it’s not and we’re here to fix it.
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
                                q: "Is piles treatment painful?",
                                a: "Not with modern methods. Our laser treatment for piles is quick, painless, and allows most patients to go home the same day."
                            },
                            {
                                q: "Will I need a long recovery period?",
                                a: "Most patients return to normal activities within 1–2 days, especially after minimally invasive surgery."
                            },
                            {
                                q: "Is this covered by insurance?",
                                a: "Yes. Many proctology procedures are covered. Our team helps with cashless authorizations and claim processing."
                            },
                            {
                                q: "How do I know if I need to see a proctologist?",
                                a: "If you’ve experienced bleeding, pain, itching, or any persistent discomfort near the rectal area, it’s time to consult. Early treatment prevents complications."
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
                        Ready to Schedule Your Visit?
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button size="lg" className="h-16 px-12 text-lg font-bold bg-[#3E7DCA] hover:bg-[#2d62a3] text-white rounded-full shadow-xl">
                            Book Proctology Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent">
                            Consult Proctologist
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

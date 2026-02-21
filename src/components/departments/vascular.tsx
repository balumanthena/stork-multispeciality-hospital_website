"use client"
import Image from "next/image"


import Link from "next/link"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Activity, CheckCircle2, ChevronRight, Droplet, User, Shield, Target, Clock, HeartPulse, Scale, AlertCircle
, ArrowRight } from "lucide-react"

export const VascularSurgeryContent = ({ blogs }: { blogs: any[] }) => {
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
                        <span className="text-[#0F172A] font-semibold">Vascular Surgery</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Best Vascular Specialists for <span className="text-[#FF8202]">Varicose Veins & Artery Care</span>
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                Treat varicose veins, DVT, and poor circulation without open surgery. We bring blood flow back safely and beautifully.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Modern Treatment for Varicose Veins & DVT",
                                    "Minimally Invasive Laser Procedures",
                                    "Walk-in, Walk-out Same-Day Surgeries"
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
                                    Book Vascular Consultation
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#3E7DCA] hover:text-[#3E7DCA] rounded-full">
                                    Consult Vascular Specialist
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <DepartmentHeroIcon slug="vascular" />
                    </div>
                </div>
            </section>

            {/* SECTION 2 — INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Expert Vascular Care That <br />
                        <span className="text-[#3E7DCA]">Restores Flow, Relieves Pain, and Prevents Complications</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-8 space-y-6">
                        <p>
                            You may notice heaviness in your legs, a change in skin color, or a sore that won’t heal. These aren’t just surface issues. they’re signs your circulatory system may need attention.
                        </p>
                        <p className="font-medium text-slate-800">
                            At Stork Multispecialty Hospital, Hyderabad, our Vascular Surgery Department focuses on the health of your arteries, veins, and lymph vessels. With early detection, advanced laser and endovascular techniques, and a team that treats patients with dignity, we help restore proper circulation before complications set in.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 3 — WHY CHOOSE STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Vascular Patients <span className="text-[#3E7DCA]">Feel Safe at Stork</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            Vascular conditions are often overlooked until pain or visible signs appear. At Stork, we make it easy to act before it’s too late.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Skilled vascular surgeons with hands-on experience in complex and day-care procedures",
                            "On-site Doppler scan, CT angiography, and diagnostic vascular lab",
                            "Expertise in laser therapy, angioplasty, and catheter-based treatments",
                            "Fast-track care for emergencies like DVT or limb-threatening ischemia",
                            "Patient-centered counselling for long-term vascular wellness",
                            "Supportive diabetic limb care with wound healing experts",
                            "Insurance guidance and full assistance with claims",
                            "Located in Kompally, easy to reach from all parts of Hyderabad"
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
                            "From chronic swelling to acute clots, we address each vascular issue with a plan that’s effective, minimally invasive, and easy to follow."
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4 — CONDITIONS WE TREAT (Cosmetic Procedures Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            What We <span className="text-[#FF8202]">Treat</span>
                        </h2>
                        <p className="text-lg text-slate-500">
                            Vascular conditions don’t just affect blood flow they impact mobility, skin health, wound healing, and long-term independence. We treat:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Veins & Arteries - Orange theme */}
                        <div className="bg-[#FFF7ED] rounded-3xl p-10 border border-orange-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#FF8202] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Essential Vascular Care</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Varicose veins and spider veins – with laser therapy and sclerotherapy",
                                    "Deep vein thrombosis (DVT) – emergency clot care to prevent complications",
                                    "Peripheral artery disease (PAD) – causing leg cramps, pain while walking",
                                    "Non-healing foot ulcers – common in diabetics with poor circulation",
                                    "Carotid artery stenosis – reducing stroke risk through timely intervention"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF8202] mt-2 flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Complex Vascular - Blue theme */}
                        <div className="bg-[#F0F9FF] rounded-3xl p-10 border border-blue-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#3E7DCA] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Scale className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Complex Care</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Aneurysms – silent artery bulges that need screening and care",
                                    "Chronic limb swelling (lymphatic or venous origin)",
                                    "Dialysis access procedures – AV fistula creation and revisions",
                                    "Venous insufficiency and post-thrombotic syndrome"
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
                            Every patient is different we personalize treatment with both clinical accuracy and emotional support.
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
                                Smart, Less Invasive <br />
                                Solutions
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                At Stork, we prefer procedures that heal faster and interrupt life less. These include:
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "Endovenous Laser Therapy (EVLT) for varicose veins",
                                    "Balloon angioplasty + stenting for narrowed arteries",
                                    "Clot extraction (thrombectomy) for acute DVT cases",
                                    "Bypass graft surgery when blockages require rerouting",
                                    "Sclerotherapy injections for spider veins",
                                    "Compression-based therapy + wound care for ulcers"
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
                            We aim for same-day or short-stay procedures wherever possible helping patients recover faster, with fewer <span className="text-[#3E7DCA]">complications</span>.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6 — PREVENTION & LONG-TERM CARE (Modified Introduction Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Early Warnings Matter. <br />
                        <span className="text-[#3E7DCA]">So Does Prevention.</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-12 space-y-6">
                        <p>
                            At Stork, we’re just as focused on stopping problems before they start. That means:
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-left max-w-3xl mx-auto shadow-sm">
                        <ul className="space-y-4">
                            {[
                                "Routine vascular screenings for at-risk groups especially diabetics and smokers",
                                "Education around foot care, mobility, hydration, and post-surgical circulation",
                                "Ongoing follow-up for patients with stents, previous DVT, or bypass history",
                                "Coordination with wound care, endocrinology, and cardiology teams"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 text-[#3E7DCA] flex items-center justify-center flex-shrink-0">
                                        <AlertCircle className="h-3 w-3" />
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xl font-medium text-slate-800 mt-12">
                        You shouldn’t wait for ulcers, pain, or infection to take vascular health seriously.
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
                                q: "Do varicose veins need to be treated if they don’t hurt?",
                                a: "Yes. Even painless veins can worsen over time or cause complications like clots or skin damage. Early treatment is safer and more effective."
                            },
                            {
                                q: "What are signs of a circulation issue in the legs?",
                                a: "Look for cramping while walking, color changes, coldness, numbness, or wounds that don’t heal these may indicate PAD."
                            },
                            {
                                q: "Is laser vein treatment safe and permanent?",
                                a: "Absolutely. It’s a widely used outpatient method with lasting results and minimal side effects."
                            },
                            {
                                q: "Is insurance applicable for vascular procedures?",
                                a: "Yes. Most procedures including EVLT, angioplasty, and bypass are covered. Our billing team helps from verification to claims."
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
                            Book Vascular Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent">
                            Consult Vascular Specialist
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

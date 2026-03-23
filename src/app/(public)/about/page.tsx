import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ShieldCheck, Target, HeartPulse, Building2, Users, Award, FileText, ArrowRight, Activity, HandHeart, CheckCircle2, ChevronRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"

export const metadata: Metadata = {
    title: "About Us | Stork Multispeciality Hospital, Kompally",
    description: "Your Trusted Family Hospital in Kompally, Hyderabad. Welcome to Stork Multispecialty Hospital — a premier healthcare destination delivering comprehensive, affordable, and compassionate medical care.",
}

const stats = [
    { label: "Years of Trust", value: "15+" },
    { label: "Happy Patients", value: "100k+" },
    { label: "Expert Doctors", value: "50+" },
    { label: "Beds Capacity", value: "200+" },
]

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-slate-50">

            {/* 1. HERO SECTION (Institutional Split - Corporate Look matching Home) */}
            <section className="w-full bg-[#f8fafc] overflow-hidden border-b border-slate-200">
                <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-12 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                        {/* LEFT CONTENT */}
                        <div className="w-full lg:w-[55%] flex flex-col justify-center relative z-10 space-y-8">

                            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm w-fit">
                                <Building2 className="w-4 h-4 text-[#FF8202]" />
                                <span className="text-slate-700 font-semibold tracking-wide uppercase text-[11px] md:text-xs">
                                    About Our Institution
                                </span>
                            </div>

                            <div className="space-y-4 max-w-2xl">
                                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-slate-900 leading-[1.25] tracking-[-0.02em]">
                                    Your Trusted Family Hospital <br className="hidden lg:block" />
                                    in Kompally, Hyderabad
                                </h1>
                                <p className="text-base md:text-lg text-[#5F6B7A] leading-relaxed max-w-xl pr-4">
                                    Welcome to Stork Multispecialty Hospital, Kompally — a premier healthcare destination in Hyderabad renowned for delivering comprehensive, affordable, and compassionate medical care. We are committed to providing world-class healthcare services across a wide range of specialties, including Gynecology, Obstetrics, Pediatrics, Orthopedics, General Medicine, Surgery, and Critical Care, all conveniently located under one roof.
                                </p>
                                <p className="text-base text-[#5F6B7A] leading-relaxed max-w-xl pr-4">
                                    At Stork, we integrate cutting-edge technology, modern infrastructure, and the expertise of seasoned medical professionals to ensure optimal outcomes for our patients. Our team is dedicated to delivering personalized, ethical, and patient-centered care, ensuring you feel safe, understood, and well-cared for.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button asChild className="bg-[#FF8202] hover:bg-[#e67600] text-white rounded-full shadow-md h-12 px-8 font-medium transition-all text-base">
                                    <Link href="/appointments">Book an Appointment</Link>
                                </Button>
                                <Button asChild variant="outline" className="bg-transparent border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 h-12 px-8 rounded-full font-medium transition-all text-base">
                                    <Link href="/services">Our Departments</Link>
                                </Button>
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="w-full lg:w-[45%] relative mt-8 lg:mt-0 flex justify-center items-center">
                            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                                <Image
                                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
                                    alt="Modern Hospital Building"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Floating Stat Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-slate-100 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 hidden md:flex">
                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">JCI</p>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Accredited</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. STATS BAR (Clean & Minimal) */}
            <section className="bg-white border-b border-slate-100 py-12">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-slate-100">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center justify-center text-center">
                                <div className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-2">{stat.value}</div>
                                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. MISSION & VISION */}
            <Section className="py-20 lg:py-28 bg-slate-50">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Vision Card */}
                        <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8">
                                <Target className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To be the leading multispecialty hospital in Kompally, recognized for excellence in clinical outcomes, patient satisfaction, and advanced medical technology.
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF8202] mb-8">
                                <HeartPulse className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To provide quality, affordable, and ethical healthcare to individuals and families in Kompally and surrounding areas, fostering healing through compassion, innovation, and medical excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 4. CORE VALUES / WHY STORK */}
            <Section className="py-20 lg:py-28 bg-white border-y border-slate-200">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-[#FF8202] font-semibold tracking-wider uppercase text-xs mb-3 block">The Stork Advantage</span>
                        <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-slate-900 mb-6 leading-tight">
                            Why Families Trust Us
                        </h2>
                        <p className="text-lg text-[#5F6B7A] leading-relaxed">
                            We combine deep medical expertise with a hospitality-first approach to ensure every patient feels safe, heard, and deeply cared for during their recovery journey.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: HeartPulse, title: "Compassion", desc: "Delivering care with empathy and respect." },
                            { icon: ShieldCheck, title: "Integrity", desc: "Upholding transparency and honesty in all interactions." },
                            { icon: CheckCircle2, title: "Excellence", desc: "Pursuing continuous improvement in quality and care delivery." },
                            { icon: Zap, title: "Innovation", desc: "Adopting technology and evidence-based medicine." },
                            { icon: Users, title: "Community Care", desc: "Promoting a healthier Kompally through awareness and prevention." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-8 hover:bg-white hover:shadow-lg hover:border-slate-200 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:text-[#FF8202] transition-colors">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-lg mb-3">{item.title}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center max-w-2xl mx-auto mb-16 pt-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Why Choose Stork Multispecialty Hospital?</h2>
                    </div>

                   <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                            { title: "Comprehensive Multispecialty Care", desc: "Offering services in Gynecology, Pediatrics, Orthopedics, Pain Management, General Medicine, and more." },
                            { title: "State-of-the-Art Facilities", desc: "Featuring 24x7 Emergency, ICU, NICU, Operation Theatres, and advanced diagnostic support." },
                            { title: "Experienced Specialists", desc: "Providing expert care from highly qualified doctors and surgeons." },
                            { title: "Affordable & Ethical Treatment", desc: "Ensuring quality healthcare is accessible to everyone." },
                            { title: "Patient-Centric Approach", desc: "Our dedicated staff, transparent treatment plans, and personalized care ensure a superior healthcare experience." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-slate-900 text-sm mb-2">{item.title}</h4>
                                <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* 5. DIRECTOR'S DESK */}
            <Section className="py-20 lg:py-32 bg-slate-50">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 grid lg:grid-cols-2">
                        <div className="relative h-[400px] lg:h-auto order-2 lg:order-1">
                            <Image
                                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1200"
                                alt="Medical Director"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="p-10 md:p-14 order-1 lg:order-2 flex flex-col justify-center">
                            <span className="text-[#FF8202] font-semibold tracking-wider uppercase text-xs mb-3 block">Leadership Insight</span>
                            <h3 className="text-3xl font-bold text-slate-900 mb-8">Message From The Director</h3>
                            <div className="relative">
                                <FileText className="absolute -top-4 -left-6 w-12 h-12 text-slate-100 -z-10" />
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Compassionate Care Delivery</h3>
                                <div className="space-y-6">
                                    <p className="text-lg text-slate-600 leading-relaxed italic">
                                        "From safe deliveries and emergency treatments to advanced surgeries and chronic disease management, Stork Multispecialty Hospital in Kompally is committed to supporting you at every stage. We are proud to be a trusted community hospital that families depend on for comprehensive healthcare services."
                                    </p>
                                    <p className="text-lg text-slate-900 font-semibold leading-relaxed">
                                        At Stork, your health and well-being are our utmost priorities. Together, we are fostering a healthier and happier Kompally.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-auto pt-8 border-t border-slate-100">
                                <h4 className="font-bold text-slate-900 text-xl">Clinical Excellence</h4>
                                <p className="text-slate-500 font-medium text-sm mt-1">Stork Multispecialty Hospital, Kompally</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 6. CTA / FOOTER OVERRIDE */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')] bg-repeat" />
                <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold mb-6 leading-tight">
                        Fostering a Healthier & Happier Kompally
                    </h2>
                    <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        At Stork, your health and well-being are our utmost priorities. Our dedicated staff, transparent treatment plans, and personalized care ensure a superior healthcare experience.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild className="bg-[#FF8202] hover:bg-[#e67600] text-white rounded-full shadow-lg h-14 px-10 font-medium transition-all text-base w-full sm:w-auto border-none">
                            <Link href="/appointments">
                                Book an Appointment <ChevronRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-800 hover:text-white rounded-full h-14 px-10 font-medium transition-all text-base w-full sm:w-auto">
                            <Link href="/contact">
                                Contact Us
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    )
}

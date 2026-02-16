"use client"

import Link from "next/link"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Baby, Activity, ShieldCheck, CheckCircle2, ChevronRight,
    Stethoscope, Heart, Siren, User
} from "lucide-react"

export default function GynaecologyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">

            {/* SECTION 1: HERO (Matching Cosmetic Layout) */}
            <section className="relative pt-32 pb-24 border-b border-slate-100 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-6 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm font-medium text-slate-500 mb-8">
                        <Link href="/" className="hover:text-[#3E7DCA] transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <Link href="/departments" className="hover:text-[#3E7DCA] transition-colors">Centers of Excellence</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <span className="text-[#0F172A] font-semibold">Gynaecology & Obstetrics</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Best Gynecologist in <span className="text-[#FF8202]">Hyderabad</span>
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                From puberty to pregnancy to menopause, receive compassionate gynecology support in a safe, family-friendly environment.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Comprehensive Women’s Health from Puberty to Motherhood",
                                    "Female Gynecologists with 10+ Years of Experience",
                                    "Safe & Private Consultations, Pregnancy to Menopause"
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
                                    Book Appointment
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#3E7DCA] hover:text-[#3E7DCA] rounded-full">
                                    Consult a Specialist
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <DepartmentHeroIcon slug="gynaecology" />
                    </div>
                </div>
            </section>

            {/* SECTION 2: INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Compassionate Women’s Care <br />
                        <span className="text-[#3E7DCA]">Through Every Life Stage</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-8">
                        <p className="mb-6">
                            At Stork Multispecialty Hospital, Hyderabad, our Gynecology & Obstetrics Department is dedicated to supporting women’s health with expert care, modern technology, and a personalized approach. From adolescence to menopause and beyond, we provide a full spectrum of services from routine checkups and preventive screenings to advanced gynecological surgeries and high-risk pregnancy care.
                        </p>
                        <p className="font-medium text-slate-800">
                            We understand that a woman’s health journey is deeply personal. Our specialists ensure every patient feels heard, respected, and supported at every step.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 3: WHY CHOOSE STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Choose Stork Hospital for <span className="text-[#3E7DCA]">Gynecology & Obstetrics?</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Experienced gynecologists and obstetricians in Hyderabad",
                            "Expertise in handling high-risk pregnancies",
                            "Safe and advanced procedures including laparoscopic surgeries",
                            "In-house diagnostic center for fast and accurate reports",
                            "Private rooms for delivery and postnatal care",
                            "24/7 emergency care and on-call specialists",
                            "Insurance accepted for maternity and gynecology services",
                            "Compassionate nursing and support staff to make your stay stress-free"
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
                            "Patients often search for the best hospital for delivery in Hyderabad and find assurance in our track record of care, safety, and comfort."
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4: SERVICES/PROCEDURES */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            Services Offered Under <span className="text-[#FF8202]">Gynecology & Obstetrics</span>
                        </h2>
                        <p className="text-lg text-slate-500">
                            Our team is ready to support you with timely consultations and prompt care.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Maternity & Obstetrics */}
                        <div className="bg-[#FFF7ED] rounded-3xl p-10 border border-orange-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#FF8202] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <Baby className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Maternity & Care</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Pregnancy care & antenatal checkups",
                                    "Normal delivery & Cesarean section",
                                    "High-risk pregnancy monitoring",
                                    "Fertility evaluations",
                                    "Menopause care",
                                    "PCOS/PCOD management"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF8202]"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Surgical & Procedures */}
                        <div className="bg-[#F0F9FF] rounded-3xl p-10 border border-blue-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#3E7DCA] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Surgical & Advanced</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Menstrual disorder treatments",
                                    "Fibroid, ovarian cyst, and endometriosis treatments",
                                    "Uterine and vaginal surgeries",
                                    "Laparoscopic gynecology procedures",
                                    "Pap smear, HPV testing & cancer screening"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#3E7DCA]"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            {/* SECTION 5: PATIENT CENTRIC (Dark Section equivalent) */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Our Philosophy</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Patient-Centric <br />
                                Experience
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                We pride ourselves on having some of the best obstetricians and gynecologists in Hyderabad, backed by modern labor rooms, fetal monitors, and 24/7 ICU support.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "Providing family-friendly and comfortable facilities",
                                    "Maintaining complete confidentiality and sensitivity",
                                    "Allowing same-day doctor appointments when available",
                                    "Offering maternity packages with insurance coverage",
                                    "Guiding patients from pregnancy tests to postnatal recovery"
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
                            Our patients describe us as the <span className="text-[#3E7DCA]">most trusted maternity hospital</span> in the city.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6: FAQ */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "How early should I start antenatal checkups?",
                                a: "We recommend starting your antenatal visits as soon as you confirm your pregnancy, ideally within the first 6–8 weeks."
                            },
                            {
                                q: "Do you offer painless or epidural-assisted deliveries?",
                                a: "Yes, we provide pain-free labor and delivery options including epidural and other pain management methods."
                            },
                            {
                                q: "Can I consult a gynecologist online?",
                                a: "Yes, we offer online doctor consultation for non-emergency concerns."
                            },
                            {
                                q: "Does Stork Hospital accept insurance for gynecology procedures?",
                                a: "Absolutely. We work with major insurers, including Star Health Insurance, for maternity and surgical care."
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
                        Ready to Schedule Your Visit?
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button size="lg" className="h-16 px-12 text-lg font-bold bg-[#3E7DCA] hover:bg-[#2d62a3] text-white rounded-full shadow-xl">
                            Book Appointment
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

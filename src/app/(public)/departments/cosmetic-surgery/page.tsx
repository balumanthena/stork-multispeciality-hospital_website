import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Sparkles, User, ShieldCheck, Activity, Search, ArrowRight, CheckCircle2,
    Phone, Calendar, Star, Quote, MapPin, Clock, ChevronRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"

export default function CosmeticSurgeryPage() {
    // Force rebuild
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
                        <span className="text-[#0F172A] font-semibold">Cosmetic & Plastic Surgery</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Subtle Enhancements. <span className="text-[#FF8202]">Natural Results.</span> Total Confidence.
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                Whether it’s a transformation or a restoration, we help you feel good in your skin again with artistry, precision, and privacy.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Face, Body & Reconstructive Surgery Options",
                                    "Natural Results by Top Cosmetic Surgeons",
                                    "Private Consults & Post-Surgery Recovery Support"
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
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <DepartmentHeroIcon slug="cosmetic-surgery" />
                    </div>
                </div>
            </section>

            {/* SECTION 2: INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Reclaim Confidence. Restore Comfort. <br />
                        <span className="text-[#3E7DCA]">Redefine You On Your Terms.</span>
                    </h2>

                    <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed mb-12">
                        <p>Sometimes, change is a choice.</p>
                        <p>Sometimes, it’s the result of injury, illness, or time.</p>
                        <p className="font-medium text-slate-800">But every time your decision to restore or enhance your appearance should be treated with respect, not judgment.</p>
                    </div>

                    <p className="text-xl text-slate-800 font-medium max-w-3xl mx-auto leading-relaxed">
                        At Stork Multispecialty Hospital, Hyderabad, our Cosmetic & Plastic Surgery Department offers subtle transformations, natural-looking results, and life-restoring procedures with one core belief: <span className="text-[#FF8202]">you have the right to feel confident in your skin.</span>
                    </p>
                </div>
            </Section>

            {/* SECTION 3: WHY CHOOSE STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Choose Stork for <span className="text-[#3E7DCA]">Cosmetic & Reconstructive Surgery?</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            Because you're not just changing how you look you’re changing how you feel. And that deserves care beyond the surface.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Skilled cosmetic and plastic surgeons in Hyderabad with artistic precision",
                            "Expertise in both aesthetic enhancements and reconstructive surgery",
                            "Emphasis on natural outcomes and minimal scarring techniques",
                            "Safe, private environment with one-on-one consultation",
                            "Customized surgical plans that match your body and your goals",
                            "Post-procedure recovery support, including scar care and physiotherapy",
                            "Insurance coverage guidance for trauma and reconstructive cases",
                            "Discreet, centrally located facility in Kompally for full privacy"
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
                            We’re here to enhance what’s already there—not to change who you are.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4: PROCEDURES */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            What We Help You <span className="text-[#FF8202]">Transform or Rebuild</span>
                        </h2>
                        <p className="text-lg text-slate-500">
                            Our department performs a wide range of both elective and medically indicated procedures, including:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Cosmetic Surgery */}
                        <div className="bg-[#FFF7ED] rounded-3xl p-10 border border-orange-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#FF8202] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Cosmetic Surgery</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Rhinoplasty (nose reshaping)",
                                    "Liposuction and body contouring",
                                    "Tummy tuck (abdominoplasty)",
                                    "Breast augmentation, lift, or reduction",
                                    "Gynecomastia correction (male chest reshaping)",
                                    "Facial sculpting – chin, cheeks, jawline",
                                    "Blepharoplasty (eyelid surgery)",
                                    "Dimple creation and scar refinement"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF8202]"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Reconstructive Surgery */}
                        <div className="bg-[#F0F9FF] rounded-3xl p-10 border border-blue-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#3E7DCA] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Reconstructive & Restorative</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Post-trauma facial reconstruction",
                                    "Burn injury care and contracture release",
                                    "Cleft lip and palate repair",
                                    "Skin grafting and wound closure",
                                    "Post-weight loss skin correction",
                                    "Hand surgery and tendon repair",
                                    "Ear reconstruction (microtia)",
                                    "Tumor or cyst excision with cosmetic preservation"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#3E7DCA]"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-16 max-w-3xl mx-auto">
                        <p className="text-lg text-slate-500 font-light italic border-l-4 border-[#3E7DCA] pl-6 py-2 bg-slate-50 rounded-r-lg">
                            Every surgery is backed by precision, planning, and empathy because it’s not just skin-deep.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5: OUR APPROACH */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Our Philosophy</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Our Approach: <br />
                                Balance. Subtlety. Safety.
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                We take your decision seriously. Whether it’s for beauty, symmetry, recovery, or repair, we:
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "Explain realistic results, risks, and timelines",
                                    "Offer pre-visualizations when possible (for facial/body work)",
                                    "Choose techniques that minimize trauma, scars, and downtime",
                                    "Monitor healing closely with scheduled reviews",
                                    "Provide skin, hair, and body guidance for long-term results",
                                    "Keep every conversation confidential and supportive"
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
                            We’re not here to sell a “new you.” We’re here to bring back your <span className="text-[#3E7DCA]">confidence</span>, <span className="text-[#3E7DCA]">comfort</span>, and <span className="text-[#3E7DCA]">control</span>.
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
                                q: "How do I know if I’m a good candidate for cosmetic surgery?",
                                a: "If you’re in good general health and have realistic expectations, you may be eligible. We conduct full evaluations before offering any procedures."
                            },
                            {
                                q: "Are all procedures permanent?",
                                a: "Most offer long-lasting results. Lifestyle, aging, and health conditions can influence outcomes, and we’ll guide you on maintaining them."
                            },
                            {
                                q: "What if I’ve had previous surgery elsewhere?",
                                a: "We offer revision surgery consultations and corrective work, with honest feasibility feedback."
                            },
                            {
                                q: "Are any procedures covered by insurance?",
                                a: "Yes. Reconstructive surgeries (e.g. post-injury, burns, congenital anomalies) are often covered. Our team handles approvals and paperwork."
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

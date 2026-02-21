"use client"
import Image from "next/image"


import Link from "next/link"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Brain, CheckCircle2, ChevronRight, Activity, Microscope, HeartPulse, User,
    Shield, Stethoscope
, ArrowRight } from "lucide-react"

export const NeurosurgeryContent = ({ blogs }: { blogs: any[] }) => {
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
                        <span className="text-[#0F172A] font-semibold">Neurosurgery</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Brain & Spine Surgery <span className="text-[#FF8202]">You Can Trust</span> with Your Life
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                Whether it’s a slipped disc, tumor, or trauma — our neurosurgeons treat you with skill, sensitivity, and real clarity. Book a consult today.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Brain & Spine Surgery with Microsurgical Precision",
                                    "Treatment for Disc, Tumors, Injuries & More",
                                    "Advanced ICU & Neuro Navigation Technology"
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
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#3E7DCA] hover:text-[#3E7DCA] rounded-full">
                                    Consult Neurosurgeon
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <DepartmentHeroIcon slug="neurosurgery" />
                    </div>
                </div>
            </section>

            {/* SECTION 2 — INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Brain & Spine Surgery Redefined <br />
                        <span className="text-[#3E7DCA]">With Accuracy, Empathy, and Results</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-8 space-y-6">
                        <p>
                            When something goes wrong with the brain or spine, everything else pauses. Your ability to move, speak, think, or even feel it all depends on one system working silently, seamlessly.
                        </p>
                        <p className="font-medium text-slate-800">
                            At Stork Multispecialty Hospital, Hyderabad, our Neurosurgery Department is built around this understanding. We offer highly specialized care for complex neurological conditions with a simple goal: to protect what makes you feel like yourself, your balance, your independence, your mind.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 3 — WHY CHOOSE STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            What Makes Our <span className="text-[#3E7DCA]">Neurosurgery Team Different?</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            We believe brain and spine care should inspire confidence, not fear. That’s why patients trust Stork not just for our surgical skill, but for how we guide, explain, and stand by them.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Accomplished neurosurgeons in Hyderabad with a calm, calculated approach",
                            "Minimally invasive procedures designed to shorten recovery and preserve function",
                            "State-of-the-art imaging: MRI, CT, EEG, digital neuro-navigation",
                            "24/7 access for stroke, head injury, or spine emergencies",
                            "Highly sterile OT environment with advanced intra-op monitoring",
                            "Neuro-focused ICU care with low noise, high vigilance",
                            "Dedicated rehabilitation pathways for mobility, memory, and speech",
                            "Located in Kompally accessible, private, and peaceful"
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
                            "We don’t just operate. We restore lives one nerve, one movement, one patient at a time."
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4 — CONDITIONS WE TREAT (Cosmetic Procedures Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            Conditions We Treat With <span className="text-[#FF8202]">Accuracy, Calm, and Clarity</span>
                        </h2>
                        <p className="text-lg text-slate-500">
                            Our department handles everything from sudden trauma to long-standing neural disorders, including:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Brain & Cranial Conditions */}
                        <div className="bg-[#FFF7ED] rounded-3xl p-10 border border-orange-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#FF8202] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <Brain className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Brain & Cranial</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Brain tumors – pituitary, meningioma, glioma, acoustic neuroma",
                                    "Stroke and brain hemorrhage requiring surgical relief",
                                    "Trigeminal neuralgia and facial nerve syndromes",
                                    "Hydrocephalus and congenital neurological conditions",
                                    "Seizure disorders not responding to medication"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF8202] mt-2 flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Spine & Nerve Conditions */}
                        <div className="bg-[#F0F9FF] rounded-3xl p-10 border border-blue-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#3E7DCA] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Spine & Nerve</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Disc prolapse and spinal cord compression",
                                    "Degenerative spine disorders – cervical and lumbar canal stenosis",
                                    "Post-traumatic head and spine injuries",
                                    "Peripheral nerve compression – including carpal tunnel, foot drop",
                                    "Pediatric neurosurgical needs – with age-sensitive approaches"
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
                            If it affects your control, coordination, or cognition we’re here to correct, relieve, and rebuild.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5 — PROCEDURES / OUR APPROACH (Dark Section) */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Our Approach</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                What We Do Differently <br />
                                Gentle Hands, Grounded Technology
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                Our neurosurgeons are trained not just in technique, but in discretion knowing when less is more.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "Endoscopic and keyhole brain surgeries for deep or delicate tumors",
                                    "Microsurgical spinal decompression and fusion",
                                    "Craniotomies with real-time neuro-navigation",
                                    "Burr hole procedures for bleeding and fluid relief",
                                    "Shunt placement for hydrocephalus (adults & children)",
                                    "Image-guided biopsies and neuro-critical care support",
                                    "Minimally invasive nerve decompressions with local anesthesia"
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
                            Our focus is always on preserving what matters most <span className="text-[#3E7DCA]">speech</span>, <span className="text-[#3E7DCA]">sensation</span>, <span className="text-[#3E7DCA]">balance</span>, memory, and movement.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6 — PATIENT SUPPORT (Layout adapted from "Introduction" style but with list) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Healing Begins With Trust <br />
                        <span className="text-[#3E7DCA]">Not Just Surgery</span>
                    </h2>

                    <p className="text-lg text-slate-600 font-light leading-relaxed mb-12">
                        We know the words “brain” and “spine” can feel intimidating. That’s why we treat every patient and family with:
                    </p>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-left max-w-3xl mx-auto shadow-sm">
                        <ul className="space-y-4">
                            {[
                                "Step-by-step clarity about what’s happening and what comes next",
                                "Options for conservative care when surgery isn’t urgent",
                                "Involvement of trusted caregivers in every key decision",
                                "Dedicated post-op care for neuro-rehab, cognitive support, and mobility training",
                                "Long-term monitoring, because true healing doesn’t end at discharge"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 text-[#3E7DCA] flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="h-3 w-3" />
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xl font-medium text-slate-800 mt-12">
                        When you choose Stork, you’re choosing a slower, safer, steadier way forward because that’s what the brain and spine need.
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
                                q: "Do all neurological issues require surgery?",
                                a: "Not at all. Many symptoms like back pain, mild numbness, or dizziness are treatable through medication, physiotherapy, or observation. Surgery is considered only when necessary."
                            },
                            {
                                q: "Is neurosurgery safe?",
                                a: "When performed with modern techniques by experienced hands yes. At Stork, we use technology to reduce risk, improve precision, and shorten recovery time."
                            },
                            {
                                q: "How long does recovery take?",
                                a: "Recovery varies by condition, but most spinal procedures allow walking within 24–48 hours. Brain surgery recovery focuses on protecting functions like memory, speech, and balance."
                            },
                            {
                                q: "Is neurosurgery covered by insurance?",
                                a: "Yes. Most brain and spine procedures are covered under health insurance. Our team helps with approvals and hassle-free claims."
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

"use client"
import Image from "next/image"


import Link from "next/link"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Bone, CheckCircle2, ChevronRight, Activity, PersonStanding, User,
    Shield, Move
, ArrowRight } from "lucide-react"

export const OrthopaedicsContent = ({ blogs }: { blogs: any[] }) => {
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
                        <span className="text-[#0F172A] font-semibold">Orthopaedics</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Walk Stronger, Live Freer. <span className="text-[#FF8202]">Advanced Ortho Care</span> in Hyderabad
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                From joint pain to fractures and replacements, get back to motion with expert orthopedic diagnosis and minimally invasive treatment. Your mobility is our priority.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Joint Pain, Fractures & Replacement Solutions",
                                    "Experienced Ortho Surgeons & Physiotherapy Support",
                                    "Advanced Imaging & Same-Day Diagnosis"
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
                                    Book Orthopedic Consultation
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#3E7DCA] hover:text-[#3E7DCA] rounded-full">
                                    Consult Ortho Specialist
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <DepartmentHeroIcon slug="orthopaedics" />
                    </div>
                </div>
            </section>

            {/* SECTION 2 — INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Bones, Joints, and Everything Between <br />
                        <span className="text-[#3E7DCA]">Expert Ortho Care That Gets You Back to Life</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-8 space-y-6">
                        <p>
                            Movement is life. At Stork Multispecialty Hospital, we believe no one should have to live with joint pain, restricted motion, or the fear of falling. Our Orthopedics Department is where modern surgical science meets compassionate, customized care designed to get you back on your feet, doing what you love, with renewed confidence.
                        </p>
                        <p className="font-medium text-slate-800">
                            From fractures and ligament tears to joint replacements and spinal issues, we offer complete orthopedic care that’s precise, personal, and proven.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 3 — WHY CHOOSE STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why People Trust Stork for <span className="text-[#3E7DCA]">Bone & Joint Care</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            Our patients don’t just recover they rediscover motion, stability, and peace of mind. Here’s why we’re the orthopedic hospital of choice in Kompally and across Hyderabad:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Skilled, senior orthopedic surgeons with years of clinical experience",
                            "Precision-driven joint replacement and keyhole surgery expertise",
                            "Fully equipped trauma unit with 24/7 orthopedic emergency support",
                            "On-site MRI, CT, digital X-ray, and lab facilities for faster diagnosis",
                            "In-house physiotherapy & rehabilitation center tailored to orthopedic recovery",
                            "Insurance-compatible surgery packages with transparent estimates",
                            "Personalized consultations with clear guidance and no rush"
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
                            "Our mission is simple: to help you move freely, without fear or pain at any age, and at any stage."
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4 — CONDITIONS WE TREAT (Cosmetic Procedures Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            Conditions We Treat with <span className="text-[#FF8202]">Confidence</span>
                        </h2>
                        <p className="text-lg text-slate-500">
                            We handle a full range of orthopedic issues, from everyday injuries to complex surgical needs:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Joint & Replacement - Orange theme */}
                        <div className="bg-[#FFF7ED] rounded-3xl p-10 border border-orange-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#FF8202] text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <PersonStanding className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Joints & Replacement</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Knee and hip replacement (Total/Partial, unilateral or bilateral)",
                                    "Arthroscopic surgeries for ACL tears, meniscus injury, shoulder dislocations",
                                    "Chronic joint stiffness & arthritis",
                                    "Tendon inflammation – frozen shoulder, bursitis, plantar fasciitis"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF8202] mt-2 flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Trauma & Spine - Blue theme */}
                        <div className="bg-[#F0F9FF] rounded-3xl p-10 border border-blue-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-[#3E7DCA] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F172A]">Trauma, Spine & Rehab</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Spine issues – herniated discs, spinal canal narrowing, postural deformities",
                                    "Bone fractures, trauma & dislocations – all age groups",
                                    "Pediatric bone deformities & developmental concerns",
                                    "Post-surgery rehab and strengthening programs"
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
                            No shortcuts. No guesswork. Just scientifically guided, outcome-focused orthopedic care.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5 — SURGICAL APPROACH (Dark Section) */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Our Approach</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Orthopedic Surgery – <br />
                                With Less Pain and Better Precision
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                When surgery is necessary, we make it as smooth and predictable as possible. Our orthopedic OTs are built for:
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "High-definition arthroscopy systems",
                                    "Computer-assisted joint replacements",
                                    "Minimally invasive spine and shoulder procedures",
                                    "Advanced sterilization and patient monitoring standards",
                                    "Coordinated care with anesthetists, ICU, and pain specialists"
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
                            We’re known for helping patients get back to walking within <span className="text-[#3E7DCA]">24–48 hours</span> after major joint surgeries and doing it with confidence.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6 — TOTAL HEALING APPROACH (Modified Introduction Layout) */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        More Than Surgery: <br />
                        <span className="text-[#3E7DCA]">Total Healing Approach</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-12 space-y-6">
                        <p>
                            At Stork, orthopedic care goes beyond fixing bones. We believe in long-term mobility, lifestyle planning, and preventing recurrence.
                        </p>
                        <p className="font-medium text-slate-800">
                            That’s why we also offer:
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-left max-w-3xl mx-auto shadow-sm">
                        <ul className="space-y-4">
                            {[
                                "Personalized pre-surgical fitness and nutrition advice",
                                "Emotional readiness counselling for major surgeries",
                                "Post-discharge rehab goals tracking and progress reviews",
                                "Home-exercise planning for long-term results",
                                "Ongoing physiotherapy right at our facility"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 text-[#3E7DCA] flex items-center justify-center flex-shrink-0">
                                        <Move className="h-3 w-3" />
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xl font-medium text-slate-800 mt-12">
                        Our holistic orthopedic care model ensures patients heal faster and live stronger.
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
                                q: "How do I know if I need joint replacement?",
                                a: "When joint pain severely limits your daily activities, doesn’t respond to medication or therapy, and affects sleep or mobility, a replacement may be advised after clinical review and imaging."
                            },
                            {
                                q: "Can I walk soon after joint replacement surgery?",
                                a: "Yes. Most of our patients begin walking with support within a day or two, under close physiotherapy supervision."
                            },
                            {
                                q: "Do you offer non-surgical treatment for joint pain?",
                                a: "Always. Surgery is recommended only when conservative treatments like physiotherapy, medication, or injections aren’t effective."
                            },
                            {
                                q: "Is orthopedic surgery covered by insurance?",
                                a: "We accept most insurance providers and assist with cashless authorizations and paperwork. Speak to our team for personalized guidance."
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
                            Book Orthopedic Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent">
                            Consult Ortho Specialist
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

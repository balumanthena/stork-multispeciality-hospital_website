import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import { CheckCircle2, ChevronRight, Activity, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"
import { RelatedMedia } from "@/components/shared/related-media"

export const SpineCareContent = ({ blogs, videos }: { blogs: any[], videos: any[] }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
            {/* SECTION 1: HERO */}
            <section className="relative pt-32 pb-24 border-b border-slate-100 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-6 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm font-medium text-slate-500 mb-8">
                        <Link href="/" className="hover:text-[#ff8202] transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <Link href="/services" className="hover:text-[#ff8202] transition-colors">Centers of Excellence</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <span className="text-[#0F172A] font-semibold">Spine Care</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Advanced Spine Care. <br />
                                <span className="text-[#FF8202]">Lasting Relief without Open Surgery</span>
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                From slipped discs to sciatica and chronic back pain, we help you regain control with personalized, minimally invasive spine care plans. Move freely again.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Personalized Spine Care for Back, Neck & Nerve Pain",
                                    "Minimally Invasive Spine Treatments by Expert Specialists",
                                    "Advanced Endoscopic Procedures for Faster Recovery",
                                    "Transforaminal & Endoscopic Interlaminar Discectomy Experts"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="h-6 w-6 rounded-full bg-orange-50 flex items-center justify-center text-[#ff8202] flex-shrink-0">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </div>
                                        <span className="text-lg font-medium text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5">
                                <Button asChild className="h-14 px-10 text-base font-bold bg-[#FF8202] hover:bg-[#e67600] text-white rounded-full shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1">
                                    <Link href="/appointments">
                                        Book Spine Consultation
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#ff8202] hover:text-[#ff8202] rounded-full">
                                    <Link href="/second-opinion">Get a Second Opinion</Link>
                                </Button>
                            </div>
                        </div>

                        <DepartmentHeroIcon slug="spine-care" />
                    </div>
                </div>
            </section>

            {/* SECTION 2: INTRODUCTION */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        Relief Is Possible. You Don’t Have to Live with <br />
                        <span className="text-[#ff8202]">Spine Pain Forever.</span>
                    </h2>

                    <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed mb-12">
                        <p>You’ve learned to sit carefully. Bend slowly. Avoid sudden movements. But spine pain—whether sharp, radiating, or constant—affects how you move, work, and live every day.</p>
                        <p>At Stork Multispecialty Hospital, Hyderabad, our Spine Care Department offers dedicated treatment for patients who’ve been told to “manage the pain.”</p>
                    </div>

                    <p className="text-xl text-slate-800 font-medium max-w-3xl mx-auto leading-relaxed">
                        Whether it’s a slipped disc, sciatica, or spinal degeneration, we design targeted, long-term solutions using advanced endoscopic spine techniques—without unnecessary open surgery.
                    </p>
                </div>
            </Section>

            {/* SECTION 3: WHY SPINE PROBLEMS NEED A DIFFERENT KIND OF ATTENTION */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Spine Problems Need a <span className="text-[#FF8202]">Different Kind of Attention</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            Spine pain isn’t just muscular—it often involves nerves, discs, and structural changes. At Stork, we focus on treating the root cause, not just symptoms:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Specialist-led spine surgeons in Hyderabad",
                            "Accurate diagnosis of disc herniation and nerve compression",
                            "Minimally invasive and endoscopic spine procedures",
                            "Reduced hospital stay and faster recovery timelines",
                            "Integration of physiotherapy, rehabilitation, and lifestyle care",
                            "Targeted nerve decompression and pain relief techniques",
                            "Safe management of sciatica, slipped disc, and cervical issues",
                            "Personalized treatment plans designed for long-term mobility"
                        ].map((point, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-blue-100 transition-colors">
                                <div className="mt-1 h-5 w-5 rounded-full bg-orange-50 text-[#ff8202] flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-slate-700 font-medium">{point}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center border-t border-slate-200 pt-12">
                        <p className="text-2xl font-serif italic text-slate-800">
                            Back pain may be common—<span className="font-bold not-italic text-[#ff8202]">but living with it shouldn’t be.</span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4: CONDITIONS WE HELP YOU MANAGE */}
            <Section className="py-24 bg-white">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            Conditions We Help You Manage
                        </h2>
                        <p className="text-lg text-slate-500">
                            Our spine specialists treat patients across all stages—from early discomfort to chronic, disabling pain:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            "Slipped disc (Herniated disc)",
                            "Sciatica (radiating leg pain)",
                            "Chronic lower back pain",
                            "Cervical spondylosis (neck pain)",
                            "Spinal canal stenosis",
                            "Degenerative disc disease",
                            "Post-surgical spine pain",
                            "Nerve compression syndromes"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="h-2 w-2 rounded-full bg-[#FF8202]"></div>
                                <span className="text-slate-700 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-lg text-slate-600 font-medium max-w-4xl mx-auto">
                            If your pain affects your walking, sitting, sleep, or daily routine—we’re ready to help.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5: OUR APPROACH & PROCEDURES */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Our Approach</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                Restore Function, <br /> Not Just Reduce Pain
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                Spine care at Stork is focused on precision treatment and long-term recovery. We focus on outcomes: helping you walk better, sit longer, and live pain-free.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Minimally invasive endoscopic spine surgeries",
                                    "Targeted nerve decompression procedures",
                                    "Image-guided diagnosis for accuracy",
                                    "Advanced physiotherapy for strength and mobility",
                                    "Guided rehabilitation after spine procedures",
                                    "Non-surgical treatment options when suitable",
                                    "Drug-minimizing approach to avoid dependency"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <Activity className="h-6 w-6 text-[#FF8202] flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-200 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-8">Advanced Spine Procedures We Offer</h3>
                            
                            <div className="mb-8">
                                <h4 className="text-[#ff8202] text-xl font-bold mb-3">Transforaminal Endoscopic Lumbar Discectomy (TELD)</h4>
                                <p className="text-slate-300 mb-4 text-sm leading-relaxed">A cutting-edge keyhole spine surgery performed through a small side-entry approach.</p>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li>• Removes herniated disc pressing on nerves</li>
                                    <li>• Highly effective for sciatica and slipped disc</li>
                                    <li>• Performed with minimal muscle damage</li>
                                    <li>• Often done under local anesthesia</li>
                                    <li>• Faster recovery with minimal downtime</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-[#ff8202] text-xl font-bold mb-3">Endoscopic Interlaminar Discectomy</h4>
                                <p className="text-slate-300 mb-4 text-sm leading-relaxed">A direct and precise technique through the natural space between spinal bones.</p>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li>• Ideal for lower lumbar disc herniation</li>
                                    <li>• Provides direct nerve decompression</li>
                                    <li>• Minimal tissue disruption</li>
                                    <li>• Early mobilization and shorter hospital stay</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* SECTION 6: FULLY PERSONALIZED CARE */}
            <Section className="py-24 bg-white border-b border-slate-100">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">
                        Spine Pain Looks Different for Everyone—<br />
                        <span className="text-[#ff8202]">So Does Our Treatment</span>
                    </h2>

                    <p className="text-lg text-slate-600 font-light leading-relaxed mb-12">
                        No two spine conditions are the same. That’s why your care is fully personalized:
                    </p>

                    <div className="text-left bg-slate-50 rounded-2xl p-10 border border-slate-200 max-w-3xl mx-auto mb-12">
                        <ul className="space-y-4">
                            {[
                                "Detailed evaluation of symptoms, imaging, and lifestyle",
                                "Collaborative care with orthopedics, pain specialists, and physiotherapy",
                                "Regular follow-ups to track recovery progress",
                                "Options for surgical or non-surgical care based on your needs",
                                "Patient education and guided recovery support"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700">
                                    <ShieldCheck className="h-5 w-5 text-[#ff8202]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xl font-medium text-slate-800 max-w-3xl mx-auto">
                        You’ll never be told to “just adjust.” <span className="text-[#FF8202]">You’ll be guided toward real, lasting relief.</span>
                    </p>
                </div>
            </Section>

            {/* SECTION 7: FAQ */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "When should I consult a spine specialist?",
                                a: "If back or neck pain lasts more than 3–4 weeks, radiates to arms/legs, or causes numbness or weakness."
                            },
                            {
                                q: "Is endoscopic spine surgery safe?",
                                a: "Yes. It is a highly advanced, minimally invasive technique with smaller incisions, less pain, and quicker recovery."
                            },
                            {
                                q: "How long does recovery take?",
                                a: "Most patients resume daily activities within a few days to weeks, depending on the condition."
                            },
                            {
                                q: "Can spine problems be treated without surgery?",
                                a: "Yes. Many cases improve with physiotherapy, medications, and targeted pain procedures. Surgery is recommended only when necessary."
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

            <RelatedMedia blogs={blogs} videos={videos} />

            {/* FOOTER CTA */}
            <section className="bg-[#FF8202] py-24 text-center">
                <div className="container max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                        Ready to Find Relief?
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Take the first step towards a pain-free, active life.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button asChild size="lg" className="h-16 px-12 text-lg font-bold bg-white text-[#ff8202] hover:bg-slate-100 rounded-full shadow-xl">
                            <Link href="/appointments">
                                Book Spine Consultation
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent">
                            <Link href="/second-opinion">Get a Second Opinion</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

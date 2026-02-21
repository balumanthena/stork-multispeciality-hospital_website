import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Ear, Wind, Activity, Mic2, Search, ArrowRight, CheckCircle2,
    Phone, Calendar, Star, Quote, MapPin, Clock, ChevronRight, Stethoscope
} from "lucide-react"
import Link from "next/link"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"

export const ENTContent = ({ blogs }: { blogs: any[] }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
            {/* SECTION 1: HERO */}
            <section className="relative pt-32 pb-24 border-b border-slate-100 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-6 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm font-medium text-slate-500 mb-8">
                        <Link href="/" className="hover:text-[#3E7DCA] transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <Link href="/services" className="hover:text-[#3E7DCA] transition-colors">Centers of Excellence</Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <span className="text-[#0F172A] font-semibold">ENT (Ear, Nose & Throat)</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Hyderabad’s Top ENT Specialists for <br />
                                <span className="text-[#FF8202]">Clear Breathing & Better Hearing</span>
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                From sinus to snoring, voice loss to ear pain find precise diagnosis and lasting relief. Book ENT care that listens to you.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Sinus, Hearing, Snoring — All Under One Roof",
                                    "Pediatric & Adult ENT Specialists Available",
                                    "Quick Relief Through Endoscopic ENT Care"
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
                                    Book ENT Consultation
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-[#3E7DCA] text-[#3E7DCA] hover:bg-blue-50 rounded-full">
                                    Find Our Specialists
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <DepartmentHeroIcon slug="ent" />
                    </div>
                </div>
            </section>

            {/* SECTION 2: INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        The Sounds, Smells, and Words of Life. <br />
                        <span className="text-[#3E7DCA]">Don’t Let Them Fade</span>
                    </h2>

                    <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed mb-12">
                        <p>A whisper you can’t quite catch. A laugh that feels muted. A breath that’s heavier than it should be.</p>
                        <p className="font-medium text-slate-800">ENT problems aren’t just clinical. They quietly chip away at how we experience life.</p>
                    </div>

                    <p className="text-xl text-slate-800 font-medium max-w-3xl mx-auto leading-relaxed">
                        At Stork Multispecialty Hospital, Hyderabad, we don’t see ear, nose, and throat issues as minor. We see them for what they are: daily disruptions that deserve deep attention. Whether it’s a child with chronic throat infections, a professional with voice strain, or an elder struggling to hear the television, our ENT department blends modern science with personal care to bring you lasting relief.
                    </p>
                </div>
            </Section>

            {/* SECTION 3: WHY PEOPLE COME TO STORK */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why People Come to Stork <span className="text-[#3E7DCA]">And Recommend It Quietly</span>
                        </h2>
                        <div className="text-lg text-slate-600 leading-relaxed font-light space-y-2">
                            <p>There are hospitals that treat. And then there are hospitals that understand.</p>
                            <p className="font-medium text-slate-800">Here’s why ENT patients choose Stork:</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "ENT specialists who listen first, then diagnose",
                            "Advanced tools in-house: video endoscopy, audiology lab, nasal imaging",
                            "Treatments focused on restoration not just symptom control",
                            "No “one-size-fits-all” surgery only need-based, precision procedures",
                            "Safe, gentle care for children, performers, elderly, and anxious patients",
                            "Total support for insurance approvals and paperwork",
                            "Private, quiet consultations in Kompally, away from city chaos"
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
                            We’ve helped people get back their sleep, their sound, and their voice <br />
                            <span className="font-bold not-italic text-[#3E7DCA] block mt-2">and that changes more than just health. It changes confidence.</span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4: WHAT WE TREAT */}
            <Section className="py-24 bg-white">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            What We Treat <span className="text-[#FF8202]">Because You’re Not Imagining It</span>
                        </h2>
                        <p className="text-lg text-slate-500 max-w-3xl mx-auto">
                            Many people live for years thinking: “It’s just sinus,” or “It’ll go away.” But when left untreated, these issues can become chronic, even damaging.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            "Persistent sinus congestion & facial pressure",
                            "Recurring sore throat, tonsillitis, or vocal hoarseness",
                            "Hearing issues from earwax buildup to age-related loss",
                            "Vertigo or balance trouble caused by inner ear dysfunction",
                            "Nasal polyps, deviated septum, and breathing difficulties",
                            "Snoring & mild-to-moderate sleep apnea",
                            "Voice strain, cracks, and fatigue especially in teachers, singers, and speakers",
                            "Thyroid, parotid, and neck masses diagnosed with precision and care",
                            "Allergies that feel like year-round colds"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="h-2 w-2 rounded-full bg-[#FF8202]"></div>
                                <span className="text-slate-700 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-lg text-slate-600 font-medium">
                            You’re not being dramatic. You’re just tired of being uncomfortable. Let’s fix it properly.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5: SMALL PROCEDURES */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Minimally Invasive Care</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Small Procedures. <br /> Big Relief.
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                Many ENT solutions aren’t complex they’re just carefully timed and correctly done. We offer:
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "FESS (Functional Endoscopic Sinus Surgery) – clears sinus pathways with no external scars",
                                    "Tonsil & adenoid removal – for better sleep, speech, and immunity in kids",
                                    "Septoplasty – finally breathe freely through both nostrils",
                                    "Myringotomy with grommets – stops recurring ear fluid in children",
                                    "Microsurgery for hearing loss or perforated eardrums",
                                    "Snoring correction – soft palate or nasal procedures depending on cause",
                                    "Thyroid & salivary gland surgeries – safe, accurate, and minimally invasive",
                                    "Vocal cord therapies – for those who speak for a living"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <Activity className="h-6 w-6 text-[#FF8202] flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-200 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-16 pt-12 border-t border-white/10">
                        <p className="text-2xl font-medium text-white">
                            These aren’t just treatments. <br />
                            <span className="text-[#3E7DCA]">They’re the turning point between “putting up with it” and actually feeling better.</span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6: RESTORED NORMALCY */}
            <Section className="py-24 bg-white border-b border-slate-100">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">
                        Not Just Treatment <br />
                        <span className="text-[#3E7DCA]">A Sense of Normalcy, Restored</span>
                    </h2>

                    <div className="text-lg text-slate-600 font-light leading-relaxed mb-12">
                        <p>ENT care at Stork is designed for real people with real lives:</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
                        {[
                            { title: "Children", desc: "Gentle diagnostics and quick recovery plans" },
                            { title: "Adults", desc: "Flexible scheduling, low-downtime procedures" },
                            { title: "Professionals", desc: "Vocal preservation and post-treatment care" },
                            { title: "Elders", desc: "Help hearing, sleeping, and speaking better again" }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="text-lg font-bold text-[#0F172A] mb-2">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-xl font-medium text-slate-800 max-w-2xl mx-auto">
                        We partner with audiologists, sleep experts, speech therapists, and endocrinologists because <span className="text-[#FF8202]">ENT healing is never just ENT alone.</span>
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
                                q: "I’ve had sinus issues for years. Can it actually be cured?",
                                a: "Yes. If medical treatment hasn’t worked, modern sinus surgery can provide long-term relief without traditional cutting or long recovery."
                            },
                            {
                                q: "Will my child’s snoring go away with age?",
                                a: "Not always. It may be linked to enlarged tonsils or adenoids which affect sleep, behavior, and learning. An ENT check can help early."
                            },
                            {
                                q: "Do I need surgery for hearing issues?",
                                a: "Not necessarily. We first test for treatable causes like wax, infection, or middle-ear fluid. Surgery is a last, not first, step."
                            },
                            {
                                q: "Can insurance cover ENT treatment?",
                                a: "Yes. Procedures like septoplasty, tonsillectomy, and thyroid surgeries are often covered. Our team guides you through approvals smoothly."
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
                        Breathe Better. Hear Clearer.
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Don't let ENT issues silence your life.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button size="lg" className="h-16 px-12 text-lg font-bold bg-[#3E7DCA] hover:bg-[#2d62a3] text-white rounded-full shadow-xl">
                            Book ENT Consultation
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

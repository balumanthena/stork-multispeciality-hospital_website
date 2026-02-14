import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Scale, Activity, ShieldCheck, CheckCircle2,
    Phone, Calendar, Star, Quote, MapPin, Clock, ChevronRight, Utensils,
    HeartPulse, ClipboardCheck, Dumbbell
} from "lucide-react"
import Link from "next/link"

export default function BariatricPage() {
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
                        <span className="text-[#0F172A] font-semibold">GI & Bariatric Surgery</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                Trusted GI Surgeons for <br />
                                <span className="text-[#FF8202]">Digestive Health & Bariatric Care</span>
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                Whether it’s gallbladder, appendix, or obesity-related surgery — we help you eat better, move easier, and live lighter. Personalized care that lasts.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "Safe Solutions for Digestive & Obesity Concerns",
                                    "GI & Bariatric Experts with Proven Results",
                                    "Laparoscopic Surgery with Minimal Downtime"
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
                                    Book GI Consultation
                                </Button>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-[#3E7DCA] text-[#3E7DCA] hover:bg-blue-50 rounded-full">
                                    Explore Bariatric Options
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <div className="hidden lg:flex h-64 w-64 rounded-3xl bg-white border border-slate-100 items-center justify-center flex-shrink-0 shadow-sm">
                            <Scale className="h-32 w-32 text-[#FF8202]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        When Digestion Feels Like a Daily Battle — <br />
                        <span className="text-[#3E7DCA]">And the Scale Won’t Budge</span>
                    </h2>

                    <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed mb-12">
                        <p>Some health issues whisper others shout.</p>
                        <p>A bloated stomach after every meal. Constant heartburn. Clothes that don’t fit like they used to. Energy that disappears by noon. Whether it’s your digestive system acting up or your weight slowing you down, you don’t have to just live with it.</p>
                    </div>

                    <p className="text-xl text-slate-800 font-medium max-w-3xl mx-auto leading-relaxed">
                        At Stork Multispecialty Hospital, Hyderabad, our GI Surgery & Weight Loss Department is here to help you reset your system safely, respectfully, and with real results. From long-standing gastric issues to advanced bariatric surgery, we offer a compassionate, personalized path back to wellness.
                    </p>
                </div>
            </Section>

            {/* SECTION 3: WHY STORK IS THE RIGHT PLACE */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Stork Is the Right Place to <span className="text-[#FF8202]">Start Over</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            You’ve probably tried diets, antacids, or ignoring the symptoms altogether. At Stork, we go deeper treating the root of the problem, not just the surface symptoms.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Experienced gastrointestinal and bariatric surgeons in Hyderabad",
                            "Laparoscopic and scar-minimizing surgeries that speed up recovery",
                            "Diagnostics that dig deep endoscopy, imaging, and labs all under one roof",
                            "Non-judgmental approach to obesity, metabolic conditions, and gut disorders",
                            "Multidisciplinary team: gastroenterology, surgery, diet, and psychology",
                            "Tailored support for long-term digestion and weight management",
                            "Insurance-compatible GI and bariatric treatment packages",
                            "Conveniently located in Kompally, with smooth access and friendly care staff"
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
                            Our patients don’t just heal <br />
                            <span className="font-bold not-italic text-[#3E7DCA] block mt-2">they regain control of their bodies, habits, and confidence.</span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4: WHAT WE HELP WITH */}
            <Section className="py-24 bg-white">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            What We Help With
                        </h2>
                        <p className="text-lg text-slate-500">
                            If you’ve lived with “stomach issues” or weight struggles long enough, here’s what we can treat and transform:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            "Acid reflux (GERD), heartburn, and chronic bloating",
                            "Gallbladder stones and gallbladder infections",
                            "Appendicitis – emergencies and chronic pain",
                            "Hernias – umbilical, hiatal, inguinal, incisional",
                            "Obesity-related complications – PCOS, diabetes, hypertension, fatigue",
                            "Fatty liver disease and slow digestion",
                            "Irritable Bowel Syndrome (IBS) and inflammatory conditions",
                            "Constipation, painful motions, and rectal discomfort",
                            "Post-weight loss skin folding and abdominal laxity (select cases)"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="h-2 w-2 rounded-full bg-[#FF8202]"></div>
                                <span className="text-slate-700 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-lg text-slate-600 font-medium max-w-4xl mx-auto">
                            These aren’t problems you should have to “manage forever” they’re problems we help solve.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5: SURGERY THAT RESPECTS YOUR BODY */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Advanced Tech</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Surgery That <br /> Respects Your Body
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                Many patients avoid surgery out of fear. At Stork, we show you how the right procedure can feel like a new beginning not an ending.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <p className="text-lg font-bold text-white mb-6">We offer:</p>
                            <ul className="space-y-5">
                                {[
                                    "Keyhole surgeries for gallbladder, appendix, hernias, and reflux",
                                    "Sleeve gastrectomy – for weight loss with appetite control",
                                    "Mini gastric bypass – when hormonal support is also needed",
                                    "Endoscopic interventions – for diagnosis, biopsies, and bleeding control",
                                    "Reflux surgery (fundoplication) – for patients with chronic GERD",
                                    "Metabolic surgeries – helping with PCOS, Type 2 diabetes, and more"
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
                            Most procedures require minimal cuts, shorter hospital stays, <br />
                            <span className="text-[#3E7DCA]">and faster return to normal life.</span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6: WEIGHT LOSS WITHOUT JUDGMENT */}
            <Section className="py-24 bg-white border-b border-slate-100">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">
                        Weight Loss <span className="text-[#3E7DCA]">Without Judgment</span>
                    </h2>

                    <p className="text-lg text-slate-600 font-light leading-relaxed mb-12">
                        If you’ve been made to feel like your weight is a failure. let us remind you: it’s a health condition, not a weakness.
                    </p>

                    <div className="text-left bg-slate-50 rounded-2xl p-10 border border-slate-200 max-w-3xl mx-auto mb-12">
                        <ul className="space-y-4">
                            {[
                                "Safe, evidence-based weight loss surgeries with measurable outcomes",
                                "Full metabolic assessment not just weight, but hormones, sugar, blood flow",
                                "Pre- and post-op diet and behavior coaching",
                                "Emotional support from nutritionists and mental wellness coaches",
                                "Monitoring to help prevent weight regain or nutritional gaps",
                                "Long-term follow-up because your journey doesn’t end after surgery"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700">
                                    <ShieldCheck className="h-5 w-5 text-[#3E7DCA]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xl font-medium text-slate-800 max-w-3xl mx-auto">
                        You’ll never walk this path alone. From the first visit to your strongest self <span className="text-[#FF8202]">we’re with you.</span>
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
                                q: "Is surgery the only way to treat GI problems or obesity?",
                                a: "Not always. We explore all medical and lifestyle options first. Surgery is only recommended when it provides a clear, lasting advantage."
                            },
                            {
                                q: "Will I lose weight immediately after bariatric surgery?",
                                a: "Yes, but the best results come with your commitment and our support. Most patients lose 50–70% of excess weight within a year."
                            },
                            {
                                q: "Are the procedures safe?",
                                a: "Extremely. We follow strict safety protocols and offer minimally invasive methods with proven outcomes and lower complication rates."
                            },
                            {
                                q: "Can I claim insurance for these treatments?",
                                a: "Yes. Many GI and bariatric surgeries are covered today. We’ll guide you through eligibility, documentation, and claims."
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
                        Ready to Live Lighter?
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Take the first step towards digestive health and wellness.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button size="lg" className="h-16 px-12 text-lg font-bold bg-[#3E7DCA] hover:bg-[#2d62a3] text-white rounded-full shadow-xl">
                            Book GI Consultation
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

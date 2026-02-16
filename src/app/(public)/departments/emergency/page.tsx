import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import {
    Phone, Ambulance, Clock, Heart, ShieldCheck, CheckCircle2,
    Siren, Stethoscope, Activity, MapPin, ChevronRight, User
} from "lucide-react"
import Link from "next/link"
import { DepartmentHeroIcon } from "@/components/department-hero-icon"

export default function EmergencyPage() {
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
                        <span className="text-[#0F172A] font-semibold">Emergency & Trauma</span>
                    </nav>

                    <div className="flex items-start justify-between gap-12">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                                24x7 Emergency Response <br />
                                That’s <span className="text-[#FF8202]">Fast, Focused & Human</span>
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                When seconds count, trust a team trained for calm, care, and life-saving decisions. Walk in or call now — we’re always ready.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {[
                                    "24x7 Emergency & ICU Support for All Critical Cases",
                                    "Trained Trauma Team for Accidents & Heart Attacks",
                                    "Ambulance, Surgery & ICU — All in One Place"
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
                                <a href="tel:1066">
                                    <Button className="h-14 px-10 text-base font-bold bg-[#FF8202] hover:bg-[#e67600] text-white rounded-full shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1">
                                        <Phone className="h-4 w-4 mr-2" />
                                        Call Emergency Now
                                    </Button>
                                </a>
                                <Button variant="outline" className="h-14 px-10 text-base font-bold border-[#3E7DCA] text-[#3E7DCA] hover:bg-blue-50 rounded-full">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Find Us
                                </Button>
                            </div>
                        </div>

                        {/* Hero Icon (Desktop) */}
                        <DepartmentHeroIcon slug="emergency" />
                    </div>
                </div>
            </section>

            {/* SECTION 2: INTRODUCTION BLOCK */}
            <Section className="py-24 bg-white">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 leading-tight">
                        When Life Changes in a Moment — <br />
                        <span className="text-[#3E7DCA]">We Respond with Everything We Have</span>
                    </h2>

                    <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed mb-12">
                        <p>You don’t plan for the siren.</p>
                        <p>You don’t expect the fall, the crash, the phone call that wakes the whole house.</p>
                        <p className="font-medium text-slate-800">But when the moment comes — and it always does without warning — what happens next can change everything.</p>
                    </div>

                    <p className="text-xl text-slate-800 font-medium max-w-3xl mx-auto leading-relaxed">
                        At Stork Multispecialty Hospital, Hyderabad, our Emergency, Trauma & Critical Care Department is built to take over the second life gets unpredictable. From the first shout for help to the last IV drip, we bring structure, skill, and steady hands to moments that feel like they’re falling apart.
                    </p>
                </div>
            </Section>

            {/* SECTION 3: WHY STORK FEELS DIFFERENT */}
            <Section className="py-24 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                            Why Stork Feels Different in an <span className="text-[#FF8202]">Emergency</span>
                        </h2>
                        <div className="text-lg text-slate-600 leading-relaxed font-light space-y-2">
                            <p>In your most vulnerable moment, you don’t want loud voices or long waits.</p>
                            <p className="font-medium text-slate-800">You want eye contact. Fast action. A voice that says, “We’ve got this.”</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                        {[
                            "Dedicated 24/7 emergency team trained for calm under pressure",
                            "Zero-delay trauma care for accidents, burns, and blunt injuries",
                            "Critical care doctors, anesthetists, surgeons, and nurses all on standby",
                            "Access to advanced ICU, ventilators, crash carts, and rapid imaging",
                            "Thoughtfully zoned areas for critical, semi-critical, and walk-in patients",
                            "ICU and operating room access within 90 seconds of arrival",
                            "Efficient ambulance coordination and fast-track admission",
                            "Located in Kompally — no traffic, no waiting for what matters"
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
                            This is not a “casualty room.” <br />
                            <span className="font-bold not-italic text-[#3E7DCA] block mt-2">This is a life-defense system.</span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 4: WHAT WE TREAT */}
            <Section className="py-24 bg-white">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                            What We Treat <span className="text-[#FF8202]">Without Delay</span>
                        </h2>
                        <p className="text-lg text-slate-500">
                            We handle all kinds of emergencies, including:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            "Major and minor road accidents",
                            "Severe head injuries and internal bleeding",
                            "Sudden chest pain or suspected heart attack",
                            "Stroke, paralysis, or unexplained slurred speech",
                            "High-grade fever, convulsions, or unconsciousness",
                            "Severe asthma attacks or difficulty breathing",
                            "Electrical shock, burns, or poisoning",
                            "Trauma from falls, workplace injuries, or sports incidents",
                            "Pediatric emergencies or elderly collapse",
                            "Sepsis, infections, and post-operative complications"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="h-2 w-2 rounded-full bg-[#FF8202]"></div>
                                <span className="text-slate-700 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-lg text-slate-600 font-medium">
                            And we treat them not just fast but thoroughly, respectfully, and with zero chaos.
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 5: CRITICAL CARE */}
            <Section className="py-24 bg-[#0F172A] text-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-4 block">Intensive Care Unit</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Critical Care That <br /> Never Sleeps
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                                When a patient moves from the ER to ICU, our care shifts gears — not urgency.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ul className="space-y-5">
                                {[
                                    "Round-the-clock ICU teams trained in advanced critical care",
                                    "Ventilators, dialysis, infusion monitoring, and post-operative support",
                                    "Neurological, cardiac, and surgical ICU zones",
                                    "Safe space for family updates, with clear, compassionate guidance",
                                    "Strict infection control & bedside monitoring",
                                    "Step-down recovery pathways for post-ICU discharge",
                                    "Dedicated palliative and end-of-life care planning, when needed"
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
                            Whether we’re saving a life or preserving dignity — <span className="text-[#3E7DCA]">we never stop watching over our patients.</span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* SECTION 6: HUMAN PROTECTION */}
            <Section className="py-24 bg-white border-b border-slate-100">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">
                        More Than Emergency Treatment.<br />
                        <span className="text-[#3E7DCA]">It’s Human Protection</span>
                    </h2>

                    <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed mb-12">
                        <p>The people who come through our emergency doors aren’t just patients.</p>
                        <p>They’re parents, workers, friends, travelers, children.</p>
                        <p className="font-medium text-slate-800">And the people who treat them? They’re trained to lead when seconds blur and emotions spike.</p>
                    </div>

                    <div className="text-left bg-slate-50 rounded-2xl p-10 border border-slate-200 max-w-3xl mx-auto mb-12">
                        <h3 className="text-xl font-bold text-[#0F172A] mb-6">At Stork:</h3>
                        <ul className="space-y-4">
                            {[
                                "We act without noise and always with purpose",
                                "We explain what’s happening, while it’s happening",
                                "We don't leave you alone after the critical part is over",
                                "We treat families with the same care as patients",
                                "We document, guide, and help you recover emotionally too"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700">
                                    <ShieldCheck className="h-5 w-5 text-[#3E7DCA]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-2xl font-medium text-slate-800">
                        You won’t find shouting, chaos, or cold corridors here. <br />
                        <span className="text-[#FF8202] text-xl block mt-2">You’ll find a team that moves like one because your life depends on it.</span>
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
                                q: "What if I’m unsure whether something is an emergency?",
                                a: "If you're asking that it’s best to come. We’re trained to assess quickly and act only if needed. You lose nothing by being safe."
                            },
                            {
                                q: "Can someone get admitted from emergency without prior documents?",
                                a: "Yes. Emergency admission is immediate. Paperwork follows once the patient is stable."
                            },
                            {
                                q: "What happens after ER stabilization?",
                                a: "We’ll either admit, refer, discharge with a safety plan, or shift to ICU based on clinical priority. You’ll be kept informed at every step."
                            },
                            {
                                q: "Will insurance cover emergency or ICU costs?",
                                a: "Yes, most policies cover emergency care and ICU stays. Our emergency billing team will assist your family through claims or approvals."
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
                        Emergency? Don't Wait.
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Our rapid response team is ready 24/7.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a href="tel:1066">
                            <Button size="lg" className="h-16 px-12 text-lg font-bold bg-[#3E7DCA] hover:bg-[#2d62a3] text-white rounded-full shadow-xl">
                                Call 1066 Now
                            </Button>
                        </a>
                        <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent">
                            Get Directions
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

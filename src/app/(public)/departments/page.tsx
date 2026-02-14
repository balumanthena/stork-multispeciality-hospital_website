import Link from "next/link"
import { departmentsData } from "@/lib/data/departments"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import { Search, ArrowRight, ChevronRight, Phone, Clock, ShieldCheck, Stethoscope, Medal } from "lucide-react"

export default function DepartmentsIndexPage() {
    // Exact order as requested by user
    const orderedKeys = [
        "cardiology", "neurology", "orthopaedics", "pediatrics",
        "oncology", "gastroenterology", "nephrology", "emergency",
        "gynaecology", "ent", "pulmonology", "urology",
        "dermatology", "general-surgery", "mother-and-child", "neurosurgery"
    ]

    const departmentsList = orderedKeys
        .map(key => {
            const data = departmentsData[key]
            return data ? { ...data, slug: key } : null
        })
        .filter(dept => dept !== null)

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">

            {/* 1. HERO SECTION (Minimal & Clean) */}
            <section className="bg-white pt-24 pb-16 relative overflow-hidden text-center">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(62,125,202,0.1)] text-[#3E7DCA] text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#3E7DCA]"></span>
                            World-Class Healthcare
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6 tracking-tight leading-tight">
                            Our Centers of <span className="text-[#FF8202]">Excellence</span>
                        </h1>

                        <p className="text-slate-500 text-lg mb-10 leading-relaxed font-light">
                            Experience comprehensive medical care with our specialized departments,
                            equipped with advanced technology and expert teams.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-lg mx-auto group">
                            <input
                                type="text"
                                placeholder="Search for specialized departments..."
                                className="w-full h-14 pl-6 pr-14 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:border-[#3E7DCA] focus:ring-1 focus:ring-[#3E7DCA] transition-all placeholder:text-slate-400 text-slate-700"
                            />
                            <button className="absolute right-2 top-2 h-10 w-10 bg-[#FF8202] hover:bg-[#e67600] text-white rounded-lg flex items-center justify-center transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 1.5. SECOND OPINION SECTION (Premium Enterprise) */}
            <section className="py-12 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden border border-slate-100">
                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50/50 to-transparent rounded-bl-full opacity-60 -z-10" />

                        {/* Content Side */}
                        <div className="flex-1 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(62,125,202,0.1)] text-[#3E7DCA] text-xs font-bold uppercase tracking-wider mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3E7DCA]"></span>
                                Expert Medical Review
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 tracking-tight">
                                Get a Free <span className="text-[#FF8202]">Second Opinion</span>
                            </h2>

                            <p className="text-slate-500 text-lg mb-8 leading-relaxed font-light">
                                Uncertainty about a diagnosis or treatment plan can be stressful.
                                Upload your reports and receive an expert evaluation from our senior specialists within 24 hours.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 mb-10">
                                <Button className="h-12 px-8 bg-[#FF8202] hover:bg-[#e67600] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 text-base">
                                    Upload Reports
                                </Button>
                                <Link href="#" className="flex items-center justify-center h-12 px-6 text-[#3E7DCA] font-semibold hover:text-[#2d62a3] transition-colors group">
                                    Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap gap-6 border-t border-slate-100 pt-6">
                                {[
                                    { icon: Medal, text: "Board Certified Specialists" },
                                    { icon: Clock, text: "24 Hour Response" },
                                    { icon: ShieldCheck, text: "100% Confidential" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        <item.icon className="w-5 h-5 text-[#3E7DCA]" />
                                        <span className="text-sm font-medium text-slate-600">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Side (Illustration/Graphic) */}
                        <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end relative">
                            {/* Abstract Medical Visual */}
                            <div className="relative w-full max-w-md aspect-[4/3] bg-slate-50/50 rounded-2xl border border-slate-100 p-8 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                                <div className="text-center relative z-10 w-full">
                                    <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-6 border border-slate-100">
                                        <Stethoscope className="w-10 h-10 text-[#3E7DCA]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">Senior Specialist Review</h3>
                                    <p className="text-sm text-slate-500 max-w-xs mx-auto">Our multidisciplinary team reviews every case extensively for the best outcome.</p>
                                </div>

                                {/* Floating Badges */}
                                <div className="absolute top-8 right-8 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 text-xs font-semibold text-[#3E7DCA] animate-pulse">
                                    24hr Turnaround
                                </div>
                                <div className="absolute bottom-8 left-8 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 text-xs font-semibold text-[#FF8202]">
                                    No Cost
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. DEPARTMENTS GRID (Apollo Style) */}
            <Section className="py-20 bg-[#F8FAFC]">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {departmentsList.map((dept: any) => (
                            <Link
                                href={`/departments/${dept.slug}`}
                                key={dept.slug}
                                className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-sm"
                            >
                                {/* Icon Container - Soft Blue Circle */}
                                <div className="h-16 w-16 flex-shrink-0 rounded-full bg-[rgba(62,125,202,0.08)] text-[#3E7DCA] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <dept.icon className="h-8 w-8" />
                                </div>

                                <div className="flex-1 pt-1 transition-transform duration-300 group-hover:translate-x-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#FF8202] transition-colors">
                                            {dept.title}
                                        </h3>
                                        {/* Subtle Arrow on Hover */}
                                        <ChevronRight className="h-4 w-4 text-[#3E7DCA] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed font-light">
                                        {dept.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>

            {/* 3. CTA BANNER (Enterprise Style) */}
            <div className="container max-w-7xl mx-auto px-6 pb-24">
                <div className="bg-[#3E7DCA] rounded-2xl p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
                    {/* Background Pattern Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3E7DCA] to-[#2d62a3] opacity-50" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Need Expert Medical Consultation?
                        </h2>
                        <p className="text-blue-100 text-lg mb-10 leading-relaxed font-light">
                            Our specialists are here to guide you. Book an appointment today for a comprehensive health assessment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="h-12 px-8 bg-[#FF8202] hover:bg-[#e67600] text-white font-bold rounded-xl shadow-lg border-none text-base">
                                Book Appointment
                            </Button>
                            <Button variant="outline" className="h-12 px-8 bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white font-bold rounded-xl text-base">
                                <Phone className="w-4 h-4 mr-2" /> Call 1066
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

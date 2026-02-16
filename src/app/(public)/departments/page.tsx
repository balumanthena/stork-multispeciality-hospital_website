import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import { getActiveDepartments } from "@/lib/data/departments-server"
import * as Icons from "lucide-react"

export default async function DepartmentsIndexPage() {
    // Fetch active departments from DB
    const departments = await getActiveDepartments()

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">

            {/* 1. INSTITUTIONAL HEADER */}
            <section className="bg-white pt-24 pb-12">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-slate-100 pb-8">
                        <div>
                            <span className="text-[#3E7DCA] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
                                Clinical Specialties
                            </span>
                            <h1 className="text-4xl font-semibold text-[#111827] tracking-tight">
                                Our Specialties
                            </h1>
                        </div>
                        <Link
                            href="/departments"
                            className="text-[#3E7DCA] font-medium hover:text-[#FF8202] transition-colors flex items-center gap-2 text-sm"
                        >
                            View All Departments <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* 2. STRICT 4-COLUMN GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {departments.length > 0 ? (
                            departments.map((dept: any) => {
                                const isFeatured = dept.slug === "cardiology"
                                // Dynamic Icon Resolution
                                const IconComponent = (Icons as any)[dept.icon] || Icons.Activity

                                return (
                                    <Link
                                        href={`/departments/${dept.slug}`}
                                        key={dept.id}
                                        className={`group flex flex-col items-center text-center transition-all duration-200 ${isFeatured
                                            ? "relative p-8 -m-8 rounded-sm bg-[rgba(255,130,2,0.06)] border-t-[3px] border-[#FF8202]"
                                            : "hover:scale-[1.03]"
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div className={`mb-6 transition-colors duration-200 ${isFeatured ? "text-[#FF8202]" : "text-[#3E7DCA] group-hover:text-[#FF8202]"
                                            }`}>
                                            <IconComponent strokeWidth={1.5} className="w-12 h-12" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-medium text-[#1f2937] group-hover:text-[#FF8202] transition-colors relative">
                                            {dept.name}
                                            <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF8202] transition-all duration-200 ${isFeatured ? "w-8" : "group-hover:w-full"
                                                }`}></span>
                                        </h3>
                                    </Link>
                                )
                            })
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-slate-500">No departments found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

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

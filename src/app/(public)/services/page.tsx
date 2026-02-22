import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import { getActiveDepartments } from "@/lib/data/departments-server"
import { getDepartmentIcon } from "@/lib/data/department-icons"




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
                        {/* 'View All Departments' link removed as requested */}
                    </div>

                    {/* 2. PREMIUM RESPONSIVE GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
                        {departments.length > 0 ? (
                            departments.map((dept: any) => {
                                const isFeatured = dept.slug === "cardiology"
                                // PNG Icon Resolution
                                const iconPath = getDepartmentIcon(dept.slug) || "/images/general-medicine.png"


                                return (
                                    <Link
                                        href={`/services/${dept.slug}`}
                                        key={dept.id}
                                        className={`group bg-white rounded-[16px] p-6 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 ${isFeatured ? "border border-[#F97316] bg-orange-50/10" : "border border-transparent hover:border-orange-100"
                                            }`}
                                    >
                                        {/* Icon Container */}
                                        <div className="mb-6 w-16 h-16 rounded-full bg-[#F6F1E8] flex items-center justify-center transition-all duration-300 group-hover:bg-[#F97316] group-hover:shadow-lg group-hover:scale-110">
                                            <div className="relative w-[30px] h-[30px] transition-all duration-300">
                                                <Image
                                                    src={iconPath}
                                                    alt={dept.name}
                                                    fill
                                                    className="object-contain transition-all duration-300 filter group-hover:brightness-0 group-hover:invert"
                                                />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1F2937] transition-colors duration-200 group-hover:text-[#F97316]">
                                            {dept.name}
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

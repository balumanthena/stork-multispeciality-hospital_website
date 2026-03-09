import type { Metadata } from "next"
import Link from "next/link"
import { GraduationCap, Stethoscope, Calendar, UserRound } from "lucide-react"

export const metadata: Metadata = {
    title: "Our Doctors | Stork Multispeciality Hospital",
    description: "Meet our experienced team of specialist doctors at Stork Multispeciality Hospital, Kompally, Hyderabad.",
}

const doctors = [
    {
        name: "Dr. D. Narendar Reddy",
        qualification: "MD, DA, FIPM",
        specialization: "Consultant Anaesthesiologist & Critical Care Specialist",
        department: "Critical Care",
    },
    {
        name: "Dr. Dasari Jyothi Reddy",
        qualification: "MBBS, DNB, FICG",
        specialization: "Consultant Obstetrician & Gynecologist",
        department: "Obstetrics & Gynaecology",
    },
    {
        name: "Dr. Yaggadi Guru Aravind Varma",
        qualification: "MBBS, MS Ortho, FIJR",
        specialization: "Orthopedic & Joint Replacement Surgeon",
        department: "Orthopaedics",
    },
]

export default function DoctorsPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc]">

            {/* Page Header */}
            <section className="bg-white border-b border-slate-100 py-12">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Our Doctors</h1>
                    <p className="text-slate-500 text-base max-w-lg mx-auto">
                        Experienced consultants committed to providing world-class, compassionate healthcare.
                    </p>
                </div>
            </section>

            {/* Doctor Grid */}
            <section className="max-w-6xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor.name}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                        >
                            {/* Avatar Area */}
                            <div className="flex flex-col items-center justify-center bg-slate-50 border-b border-slate-100 py-8 px-4 gap-3">
                                <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center">
                                    <UserRound className="w-12 h-12 text-slate-400" />
                                </div>
                                <span className="text-xs font-semibold text-[#FF8202] uppercase tracking-wider bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
                                    {doctor.department}
                                </span>
                            </div>

                            {/* Doctor Details */}
                            <div className="p-5 space-y-3">
                                <h2 className="text-base font-bold text-slate-800 leading-snug">
                                    {doctor.name}
                                </h2>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-sm text-slate-600">
                                        <GraduationCap className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                        <span>{doctor.qualification}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-slate-700">
                                        <Stethoscope className="w-4 h-4 text-[#FF8202] mt-0.5 shrink-0" />
                                        <span>{doctor.specialization}</span>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-slate-100">
                                    <Link
                                        href="/appointments"
                                        className="flex items-center justify-center gap-2 w-full h-10 bg-[#FF8202] hover:bg-[#e67600] text-white text-sm font-semibold rounded-lg transition-colors"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        Book Appointment
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}

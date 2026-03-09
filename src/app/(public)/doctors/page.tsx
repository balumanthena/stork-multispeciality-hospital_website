import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { GraduationCap, Stethoscope, Calendar } from "lucide-react"

export const metadata: Metadata = {
    title: "Our Doctors | Stork Multispeciality Hospital",
    description: "Meet our experienced team of specialist doctors at Stork Multispeciality Hospital, Kompally, Hyderabad.",
}

const doctors = [
    {
        name: "Dr. D. Narendar Reddy",
        qualification: "MD, DA, FIPM",
        specialization: "Consultant Anaesthesiologist & Critical Care Specialist",
        department: "Anaesthesiology & Critical Care",
        photo: "/images/doctor-placeholder.jpg",
    },
    {
        name: "Dr. Dasari Jyothi Reddy",
        qualification: "MBBS, DNB, FICG",
        specialization: "Consultant Obstetrician & Gynecologist",
        department: "Obstetrics & Gynaecology",
        photo: "/images/doctor-placeholder-f.jpg",
    },
    {
        name: "Dr. Yaggadi Guru Aravind Varma",
        qualification: "MBBS, MS Ortho, FIJR",
        specialization: "Orthopedic & Joint Replacement Surgeon",
        department: "Orthopaedics",
        photo: "/images/doctor-placeholder.jpg",
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
                            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                        >
                            {/* Doctor Photo */}
                            <div className="relative w-full h-56 bg-slate-100">
                                <Image
                                    src={doctor.photo}
                                    alt={doctor.name}
                                    fill
                                    className="object-cover object-top"
                                    onError={(e) => {
                                        // fallback if photo doesn't exist
                                        (e.target as HTMLImageElement).style.display = "none"
                                    }}
                                />
                                {/* Subtle gradient bottom overlay */}
                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/60 to-transparent" />
                                {/* Department tag */}
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white/90 text-[#FF8202] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-orange-100 shadow-sm">
                                        {doctor.department}
                                    </span>
                                </div>
                            </div>

                            {/* Doctor Details */}
                            <div className="p-5 space-y-3">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800 leading-tight">
                                        {doctor.name}
                                    </h2>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-sm text-slate-600">
                                        <GraduationCap className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                        <span>{doctor.qualification}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-slate-700 font-medium">
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

import type { Metadata } from "next"
import { Stethoscope, GraduationCap, Award } from "lucide-react"

export const metadata: Metadata = {
    title: "Our Doctors | Stork Multispeciality Hospital",
    description: "Meet our experienced team of specialist doctors at Stork Multispeciality Hospital, Kompally, Hyderabad.",
}

const doctors = [
    {
        name: "Dr. D. Narendar Reddy",
        qualification: "MD, DA, FIPM",
        specialization: "Critical Care Specialist",
        department: "Anaesthesiology & Critical Care",
        initials: "NR",
        color: "from-blue-600 to-blue-700",
    },
    {
        name: "Dr. Dasari Jyothi Reddy",
        qualification: "MBBS, DNB, FICG",
        specialization: "Obstetrician & Gynecologist",
        department: "Obstetrics & Gynaecology",
        initials: "JR",
        color: "from-pink-500 to-rose-600",
    },
    {
        name: "Dr. Yaggadi Guru Aravind Varma",
        qualification: "MBBS, MS Ortho, FIJR",
        specialization: "Orthopedic & Joint Replacement Surgeon",
        department: "Orthopaedics",
        initials: "AV",
        color: "from-emerald-500 to-teal-600",
    },
]

export default function DoctorsPage() {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero */}
            <section className="bg-white border-b border-slate-200 py-14">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#FF8202] mb-3">
                        Expert Care
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Our Doctors
                    </h1>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto">
                        Experienced specialists dedicated to delivering compassionate, evidence-based care.
                    </p>
                </div>
            </section>

            {/* Doctor Cards */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor.name}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                        >
                            {/* Avatar Banner */}
                            <div className={`bg-gradient-to-br ${doctor.color} h-36 flex items-center justify-center relative`}>
                                <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">{doctor.initials}</span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#FF8202] transition-colors">
                                        {doctor.name}
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-0.5">{doctor.department}</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        <span>{doctor.qualification}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                                        <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                                            <Stethoscope className="w-3.5 h-3.5 text-[#FF8202]" />
                                        </div>
                                        <span>{doctor.specialization}</span>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-slate-100">
                                    <a
                                        href="/appointments"
                                        className="flex items-center justify-center gap-2 w-full h-10 rounded-xl bg-[#FF8202] hover:bg-[#e67600] text-white text-sm font-semibold transition-colors"
                                    >
                                        <Award className="w-4 h-4" />
                                        Book Appointment
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}

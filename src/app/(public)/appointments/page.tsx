import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import { Calendar, Phone, MapPin, Clock, MessageCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Book an Appointment | Stork Multispeciality Hospital",
    description: "Schedule consultations across 25+ specialties with experienced doctors at Stork Multispeciality Hospital, Kompally.",
}

export default function BookAppointmentPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">

            {/* 1. HERO SECTION */}
            <section className="bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200 py-16 lg:py-24 overflow-hidden relative">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content */}
                        <div className="max-w-2xl relative z-10">
                            <h1 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-6 leading-tight tracking-tight">
                                Book an Appointment with Our Specialists
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                                Schedule consultations across 25+ specialties with experienced doctors. Seamless confirmation. Compassionate care.
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <Button className="bg-[#FF8202] hover:bg-[#e67600] text-white rounded-xl shadow-md h-12 px-8 font-medium transition-all text-base">
                                    Confirm Appointment
                                </Button>
                                <Button variant="outline" className="bg-transparent border-slate-300 text-slate-700 hover:bg-slate-100 h-12 px-8 rounded-xl font-medium transition-all text-base">
                                    Learn More
                                </Button>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border border-slate-200">
                            <img
                                src="https://images.unsplash.com/photo-1551076805-e18690c5e5ce?auto=format&fit=crop&q=80&w=1600&h=1200"
                                alt="Medical Consultation"
                                className="object-cover w-full h-full"
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. FORM SECTION */}
            <section className="py-20 lg:py-24">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Form Column */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 md:p-10">
                                <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-8 tracking-tight">
                                    Appointment Details
                                </h2>

                                <form className="space-y-6">

                                    {/* Personal Info */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="fullName" className="text-sm font-medium text-slate-700">Full Name</label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                placeholder="e.g. John Doe"
                                                className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all text-slate-800"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                placeholder="+91"
                                                className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all text-slate-800"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="john@example.com"
                                            className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all text-slate-800"
                                        />
                                    </div>

                                    <div className="h-px bg-slate-100 w-full my-8"></div>

                                    {/* Appointment Details */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="department" className="text-sm font-medium text-slate-700">Select Department</label>
                                            <select
                                                id="department"
                                                className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all text-slate-800 appearance-none"
                                            >
                                                <option value="">Choose Department</option>
                                                <option value="cardiology">Cardiology</option>
                                                <option value="neurology">Neurology</option>
                                                <option value="orthopedics">Orthopedics</option>
                                                <option value="pediatrics">Pediatrics</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="doctor" className="text-sm font-medium text-slate-700">Select Doctor</label>
                                            <select
                                                id="doctor"
                                                className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all text-slate-800 appearance-none"
                                            >
                                                <option value="">Choose Doctor (Optional)</option>
                                                <option value="dr-rajesh">Dr. Rajesh Kumar</option>
                                                <option value="dr-anjali">Dr. Anjali Desai</option>
                                                <option value="dr-vikram">Dr. Vikram Singh</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="date" className="text-sm font-medium text-slate-700">Preferred Date</label>
                                            <input
                                                type="date"
                                                id="date"
                                                className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all text-slate-800"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="time" className="text-sm font-medium text-slate-700">Preferred Time</label>
                                            <select
                                                id="time"
                                                className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all text-slate-800 appearance-none"
                                            >
                                                <option value="">Select Time</option>
                                                <option value="morning">Morning (9 AM - 12 PM)</option>
                                                <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                                                <option value="evening">Evening (5 PM - 8 PM)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="message" className="text-sm font-medium text-slate-700">Message (Optional)</label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            placeholder="Briefly describe your symptoms or reason for visit..."
                                            className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all text-slate-800 resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="pt-4">
                                        <Button type="button" className="w-full bg-[#FF8202] hover:bg-[#e67600] text-white rounded-xl shadow-md h-14 font-semibold text-lg transition-all">
                                            Confirm Appointment
                                        </Button>
                                        <p className="text-xs text-slate-500 text-center mt-4">
                                            By arranging this appointment, you agree to our standard hospital protocols and communication terms.
                                        </p>
                                    </div>

                                </form>
                            </div>
                        </div>

                        {/* Right Side Info Panel */}
                        <div className="lg:col-span-4 flex flex-col gap-6">

                            {/* Box 1: Emergency */}
                            <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                                    <AlertCircle className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-red-900 mb-2">Emergency Care</h3>
                                <p className="text-red-700 font-medium mb-4">Available 24/7 for trauma and critical care.</p>
                                <div className="text-3xl font-bold text-red-600 tracking-tight">1066</div>
                            </div>

                            {/* Box 2: Contact Info */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                                <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4">Contact Information</h3>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-800 mb-1">Hospital Address</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            Survey No 14 & 15, NH44, Kompally,
                                            Hyderabad, Telangana 500014
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-800 mb-1">OP Timings</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            Mon - Sat: 9:00 AM - 8:00 PM <br />
                                            Sun: 10:00 AM - 2:00 PM
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-800 mb-1">WhatsApp Connect</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed mb-2">
                                            For instant queries and report sharing.
                                        </p>
                                        <a href="#" className="text-green-600 font-medium text-sm hover:underline">
                                            +91 99999 88888
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}

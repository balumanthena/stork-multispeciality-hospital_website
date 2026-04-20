"use client"

import React from "react"
import Image from "next/image"
import { Calendar, Phone, MapPin, Clock, MessageCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookAppointment } from "@/components/forms/BookAppointment"
import { useSettings } from "@/providers/SettingsProvider"

export default function BookAppointmentPage() {
    const { settings } = useSettings()

    const address = settings?.address || "Survey No 14 & 15, NH44, Kompally, Hyderabad, Telangana 500014"
    const timings = settings?.working_hours || "Mon - Sat: 9:00 AM - 8:00 PM\nSun: 10:00 AM - 2:00 PM"
    const whatsappNum = settings?.whatsapp_number || "+91 99999 88888"
    const whatsappUrl = settings?.whatsapp_url || `https://wa.me/${whatsappNum.replace(/\D/g, '')}`

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">

            {/* 1. HERO SECTION */}
            <section className="bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200 py-16 lg:py-24 overflow-hidden relative">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Content */}
                        <div className="max-w-3xl mx-auto text-center relative z-10 lg:col-span-2">
                            <h1 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-6 leading-tight tracking-tight">
                                Book an Appointment with Our Specialists
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
Schedule consultations across 25+ specialties with experienced doctors. Seamless confirmation. Compassionate care.
                            </p>
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
                            <BookAppointment />
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
                                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                            {address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-800 mb-1">OP Timings</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                            {timings}
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
                                        <a 
                                            href={whatsappUrl} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 font-medium text-sm hover:underline"
                                        >
                                            {whatsappNum}
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


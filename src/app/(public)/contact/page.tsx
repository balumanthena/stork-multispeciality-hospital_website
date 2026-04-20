"use client"

import React from "react"
import { MapPin, Phone, Mail, Clock, ShieldAlert, ArrowRight } from "lucide-react"
import { useSettings } from "@/providers/SettingsProvider"

export default function ContactPage() {
    const { settings, isLoading } = useSettings()

    // Fallback values if settings aren't loaded yet
    const address = settings?.address || "Survey No 14 & 15, NH44, Kompally, Hyderabad, Telangana 500014"
    const phone = settings?.whatsapp_number || "+91 94944 08050"
    const email = settings?.email || "info@storkhospital.com"
    const workingHours = settings?.working_hours || "Mon - Sat: 9:00 AM - 8:00 PM | Sunday: 10:00 AM - 2:00 PM"
    const emergencyNumber = settings?.emergency_number || "+91 76108 10819"

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">

            {/* 1. TOP SECTION (HERO) */}
            <section className="pt-20 pb-12 bg-white border-b border-slate-100">
                <div className="container max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col items-center lg:items-start">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                        Visit {settings?.hospital_name || "Stork Hospital"}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
                        We are here to serve you with compassionate and advanced care.
                    </p>
                </div>
            </section>

            {/* 2. EMERGENCY HIGHLIGHT BANNER */}
            <section className="container max-w-7xl mx-auto px-6 -mt-8 relative z-10">
                <div className="bg-red-50 border border-red-100/50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-red-500 shrink-0 shadow-sm">
                            <ShieldAlert className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-red-900 mb-1">
                                24/7 Emergency Services
                            </h2>
                            <p className="text-red-700/80 font-medium text-sm">
                                Call for immediate assistance: <a href={`tel:${emergencyNumber}`} className="underline decoration-red-300 hover:decoration-red-500 transition-all">{emergencyNumber}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MAIN CONTACT SECTION (TWO-COLUMN) */}
            <section className="py-20 lg:py-24">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

                        {/* LEFT SIDE: Information Card (5 Cols) */}
                        <div className="lg:col-span-5 w-full">
                            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">

                                <h3 className="text-2xl font-bold text-slate-900 mb-8 pb-6 border-b border-slate-100">
                                    Contact Details
                                </h3>

                                <div className="space-y-8">
                                    {/* Location */}
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-slate-900 text-lg mb-1">Hospital Address</h4>
                                            {isLoading ? (
                                                <div className="space-y-2 animate-pulse">
                                                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                                                    <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                                                </div>
                                            ) : (
                                                <p className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-line">
                                                    {address}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Timings */}
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-slate-900 text-lg mb-1">OP Timings</h4>
                                            {isLoading ? (
                                                <div className="space-y-2 animate-pulse">
                                                    <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                                </div>
                                            ) : (
                                                <div className="text-slate-600 text-[15px] space-y-1 whitespace-pre-line italic">
                                                    {workingHours}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Phone & WhatsApp */}
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-slate-900 text-lg mb-1">Direct Line & WhatsApp</h4>
                                            {isLoading ? (
                                                <div className="space-y-2 animate-pulse">
                                                    <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                                                    <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                                                </div>
                                            ) : (
                                                <>
                                                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-slate-600 text-[15px] hover:text-green-600 font-bold transition-colors block mb-1">
                                                        {phone}
                                                    </a>
                                                    <a href={`mailto:${email}`} className="text-slate-500 hover:text-orange-600 transition-colors text-sm flex items-center gap-2 mt-2">
                                                        <Mail className="w-4 h-4" /> {email}
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Get Directions Button */}
                                <div className="mt-10 pt-8 border-t border-slate-100">
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-all shadow-md active:scale-[0.98] text-[15px]"
                                    >
                                        Get Directions <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>

                            </div>
                        </div>

                        {/* RIGHT SIDE: Map Embed (7 Cols) */}
                        <div className="lg:col-span-7 w-full h-full min-h-[400px]">
                            <div className="bg-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 h-[400px] lg:h-[500px] w-full border border-slate-100 relative group">
                                <div className="absolute inset-0 bg-slate-100 animate-pulse -z-10" />

                                <iframe
                                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}&q=${encodeURIComponent(address)}`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Stork Hospital Google Map Location"
                                    className="w-full h-full grayscale-[0.05] contrast-[1.05] opacity-95 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 block"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}

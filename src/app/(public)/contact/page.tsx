import React from "react"
import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock, ShieldAlert, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Visit Us | Stork Multispeciality Hospital",
    description: "Location and contact information for Stork Multispeciality Hospital in Kompally, Hyderabad.",
}

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">

            {/* 1. TOP SECTION (HERO) */}
            <section className="pt-20 pb-12 bg-white border-b border-slate-100">
                <div className="container max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col items-center lg:items-start">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                        Visit Stork Hospital
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
                                Immediate care for trauma and critical medical needs.
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0">
                        <a
                            href="tel:1066"
                            className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-black text-2xl tracking-wider py-4 px-10 rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95"
                        >
                            1066
                        </a>
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
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 text-lg mb-1">Hospital Address</h4>
                                            <p className="text-slate-600 leading-relaxed text-[15px]">
                                                Survey No 14 & 15, NH44, Kompally,<br />
                                                Hyderabad, Telangana 500014
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timings */}
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 text-lg mb-1">OP Timings</h4>
                                            <div className="text-slate-600 text-[15px] space-y-1">
                                                <p>Mon - Sat: <span className="font-medium text-slate-800">9:00 AM - 8:00 PM</span></p>
                                                <p>Sunday: <span className="font-medium text-slate-800">10:00 AM - 2:00 PM</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone & WhatsApp */}
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 text-lg mb-1">Direct Line & WhatsApp</h4>
                                            <a href="tel:+919494408050" className="text-slate-600 text-[15px] hover:text-green-600 transition-colors block mb-1">
                                                +91 94944 08050
                                            </a>
                                            <a href="mailto:info@storkhospital.com" className="text-slate-500 hover:text-blue-600 transition-colors text-sm flex items-center gap-2 mt-2">
                                                <Mail className="w-4 h-4" /> info@storkhospital.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Get Directions Button */}
                                <div className="mt-10 pt-8 border-t border-slate-100">
                                    <a
                                        href="https://maps.app.goo.gl/roNgtXcEgrSNqoLG9"
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
                                {/* Map loading skeleton/placeholder overlay */}
                                <div className="absolute inset-0 bg-slate-100 animate-pulse -z-10" />

                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8329606821217!2d78.4846977!3d17.5216607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8553bec3ec41%3A0x17a108279643ccdf!2sStork%20Multispecialty%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
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

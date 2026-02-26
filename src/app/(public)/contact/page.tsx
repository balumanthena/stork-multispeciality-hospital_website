import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, MessageSquare, AlertCircle, ArrowRight, Building2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/forms/ContactForm"

export const metadata: Metadata = {
    title: "Contact Us | Stork Multispeciality Hospital",
    description: "Get in touch with Stork Multispeciality Hospital for appointments, emergency care, and general inquiries. Located in Kompally, Hyderabad.",
}

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-slate-50">

            {/* 1. HERO PAGE HEADER */}
            <section className="bg-white border-b border-slate-200 py-16 md:py-24">
                <div className="container max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm mb-6">
                        <MessageSquare className="w-4 h-4 text-[#FF8202]" />
                        <span className="text-slate-700 font-semibold tracking-wide uppercase text-xs">
                            We're Here To Help
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
                        Contact Stork Hospital
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Whether it's an emergency, a general inquiry, or booking a consultation, our dedicated staff is available 24/7.
                    </p>
                </div>
            </section>

            {/* 2. CORE CONTACT INFO GRID */}
            <section className="py-20 lg:py-28">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Emergency Card */}
                        <div className="bg-red-50 border border-red-100 rounded-3xl p-10 flex flex-col items-center text-center shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
                            <div className="absolute top-0 inset-x-0 h-1 bg-red-500" />
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <AlertCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-red-900 mb-2">Emergency Care</h3>
                            <p className="text-red-700/80 font-medium mb-6">Available 24/7 for trauma & critical care.</p>
                            <a href="tel:1066" className="text-5xl font-black text-red-600 tracking-tight mt-auto hover:text-red-700 transition-colors">
                                1066
                            </a>
                        </div>

                        {/* Direct Support Card */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col items-center text-center shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                            <div className="absolute top-0 inset-x-0 h-1 bg-green-500" />
                            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                                <Phone className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp / Phone</h3>
                            <p className="text-slate-500 mb-6 text-sm leading-relaxed">For quick inquiries, appointments, or report sharing, text our support desk instantly.</p>
                            <div className="mt-auto flex flex-col gap-3 w-full">
                                <Button asChild variant="outline" className="w-full h-12 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 font-semibold rounded-xl">
                                    <a href="https://wa.me/919494408050" target="_blank" rel="noopener noreferrer">
                                        Chat on WhatsApp
                                    </a>
                                </Button>
                                <Button asChild variant="ghost" className="w-full text-slate-600 hover:text-slate-900 h-12">
                                    <a href="tel:+919494408050">+91 94944 08050</a>
                                </Button>
                            </div>
                        </div>

                        {/* Location Details */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col shadow-sm relative group hover:shadow-md transition-all lg:col-span-1 md:col-span-2">
                            <div className="absolute top-0 inset-x-0 h-1 bg-blue-500" />
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">Hospital Location</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        Survey No 14 & 15, NH44, Kompally,<br />
                                        Hyderabad, Telangana 500014
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF8202] shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">OP Timings</h3>
                                    <p className="text-slate-600 text-sm">Mon - Sat: 9:00 AM - 8:00 PM</p>
                                    <p className="text-slate-600 text-sm">Sun: 10:00 AM - 2:00 PM</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">General Inquiries</h3>
                                    <a href="mailto:info@storkhospital.com" className="text-[var(--color-accent)] font-medium text-sm hover:underline">
                                        info@storkhospital.com
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. CONTACT FORM SECTION */}
            <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm mb-6">
                                <MessageSquare className="w-4 h-4 text-[#FF8202]" />
                                <span className="text-slate-700 font-semibold tracking-wide uppercase text-xs">
                                    Direct Inquiry
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                                Have questions? <br /> Let us help you.
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                Please feel free to send us any inquiries regarding health checkups, corporate partnerships, secondary opinions, or any other non-emergency clinical needs.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                Our dedicated support staff reviews submissions continuously and will respond to your queries as quickly as possible.
                            </p>

                            <div className="flex flex-col gap-4 border-t border-slate-200 pt-8 mt-8">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-600" /> Response Time
                                </h3>
                                <p className="text-slate-600">General Inquiries: <span className="font-semibold text-slate-800">Within 24 Hours</span></p>
                                <p className="text-slate-600">Emergency: <span className="font-semibold text-red-600">Please Call 1066</span></p>
                            </div>
                        </div>

                        <div className="relative">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. INTERACTIVE MAP SECTION */}
            <section className="bg-white border-y border-slate-200 relative">
                <div className="w-full h-[500px] lg:h-[600px] bg-slate-200 relative flex items-center justify-center">
                    {/* Placeholder for Google Maps iframe - Replace src with actual Maps Embed URL */}
                    <div className="absolute inset-0 w-full h-full bg-slate-300">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8329606821217!2d78.4846977!3d17.5216607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8553bec3ec41%3A0x17a108279643ccdf!2sStork%20Multispecialty%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full grayscale-[0.2] contrast-125 opacity-90"
                            title="Stork Hospital Location Map"
                        ></iframe>
                    </div>

                    {/* Floating Info Overlay for Map */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-11/12 text-center hidden sm:block">
                        <Building2 className="w-8 h-8 text-[#FF8202] mx-auto mb-3" />
                        <h4 className="font-bold text-slate-900 text-lg mb-1">Stork Hospital</h4>
                        <p className="text-slate-500 text-sm">Survey No 14 & 15, NH44, Kompally, Hyderabad, TS 500014</p>
                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION TO BOOKING SYSTEM */}
            <section className="py-24 bg-blue-900 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')] bg-repeat" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to book an appointment?
                    </h2>
                    <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed font-light">
                        Skip the waiting lines. Use our integrated realtime booking system to reserve your slot with our specialists instantly.
                    </p>
                    <Button asChild className="bg-[#FF8202] hover:bg-[#e67600] text-white rounded-full shadow-xl shadow-orange-900/30 h-16 px-12 font-bold transition-all text-lg border-none">
                        <Link href="/appointments">
                            Proceed to Booking <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </section>

        </div>
    )
}

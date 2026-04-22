"use client"

import React, { useState } from "react"
import { ShieldCheck, Clock, Users, ChevronRight, FileBadge, CheckCircle2, Loader2 } from "lucide-react"

const specialties = [
    "Cosmetic & Plastic Surgery",
    "Emergency, Trauma & Critical Care",
    "ENT",
    "General Surgery",
    "General Medicine",
    "GI & Bariatric Surgery",
    "Gynaecology & Obstetrics",
    "Neurosurgery",
    "Oncology",
    "Orthopaedics",
    "Pain Management",
    "Proctology",
    "Pulmonology",
    "Urology",
    "Vascular Surgery"
]

export default function SecondOpinionPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        specialty: "",
        message: "",
    })
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMsg, setErrorMsg] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")
        setErrorMsg("")

        try {
            const res = await fetch("/api/second-opinion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Something went wrong")
            }

            setStatus("success")
            setFormData({ name: "", phone: "", email: "", specialty: "", message: "" })
        } catch (err: any) {
            setStatus("error")
            setErrorMsg(err.message || "Failed to submit. Please try again.")
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">

            {/* 1. HERO SECTION */}
            <section className="bg-slate-900 border-b border-slate-800 py-16 lg:py-24 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF8202]/10 to-transparent opacity-50 pointer-events-none" />
                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md mb-6">
                            <ShieldCheck className="w-4 h-4 text-[#FF8202]" />
                            <span className="text-white/90 font-medium tracking-wide uppercase text-xs">
                                Expert Medical Review
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
                            Get clarity with a <span className="text-[#FF8202]">Second Opinion.</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed font-light">
                            Make confident decisions about your health. Have your diagnosis and treatment plan reviewed by our committee of senior specialists.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. MAIN CONTENT - TWO COLUMN LAYOUT */}
            <section className="py-16">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                        {/* LEFT COLUMN - WHY / BENEFITS */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">Why seek a second opinion?</h2>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    A second opinion can confirm your diagnosis, explore alternative treatment options, or simply provide peace of mind before proceeding with a major medical decision.
                                </p>
                            </div>

                            <div className="flex flex-col gap-8">
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                                        <Users className="w-6 h-6 text-[#FF8202]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Multi-Disciplinary Board</h3>
                                        <p className="text-slate-600 leading-relaxed">Your case is reviewed not just by one doctor, but by a specialized tumor board or committee depending on the condition.</p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 border border-blue-100">
                                        <FileBadge className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Evidence-Based Pathways</h3>
                                        <p className="text-slate-600 leading-relaxed">Our clinical recommendations adhere strictly to international medical protocols and latest JCI standards.</p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                                        <Clock className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Rapid Turnaround</h3>
                                        <p className="text-slate-600 leading-relaxed">Upload your reports securely, and our specialists will provide a detailed medical assessment within 48-72 hours.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - THE FORM CARD */}
                        <div className="lg:col-span-7">
                            <div className="bg-white rounded-2xl shadow-lg p-8">

                                {/* SUCCESS STATE */}
                                {status === "success" ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 border-2 border-green-200">
                                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Request Submitted Successfully!</h2>
                                        <p className="text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                                            Our clinical team has received your second opinion request. A coordinator will contact you within <strong>24-48 hours</strong> to discuss next steps.
                                        </p>
                                        {formData.email && (
                                            <p className="text-sm text-slate-500 mb-6">A confirmation email has been sent to your email address.</p>
                                        )}
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="bg-[#FF8202] hover:bg-[#e67600] text-white font-semibold rounded-xl px-8 py-3 shadow-md transition-all"
                                        >
                                            Submit Another Request
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Request an Evaluation</h2>
                                            <p className="text-slate-500 font-medium">Fill out the details below and we will contact you shortly.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Personal Details */}
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="fullName" className="text-sm font-semibold text-slate-900">Patient&apos;s Full Name *</label>
                                                    <input
                                                        type="text"
                                                        id="fullName"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="e.g. John Doe"
                                                        className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-slate-800"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="phone" className="text-sm font-semibold text-slate-900">Phone Number *</label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="+91 "
                                                        className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-slate-800"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="email" className="text-sm font-semibold text-slate-900">Email Address</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="john@example.com"
                                                        className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-slate-800"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="specialty" className="text-sm font-semibold text-slate-900">Primary Concern / Specialty *</label>
                                                    <select
                                                        id="specialty"
                                                        name="specialty"
                                                        value={formData.specialty}
                                                        onChange={handleChange}
                                                        className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none text-slate-800"
                                                        required
                                                    >
                                                        <option value="">Select Specialty</option>
                                                        {specialties.map((item) => (
                                                            <option key={item} value={item}>
                                                                {item}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Summary of condition */}
                                            <div className="space-y-2">
                                                <label htmlFor="message" className="text-sm font-semibold text-slate-900">Summary of Current Diagnosis *</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    rows={4}
                                                    placeholder="Please briefly describe the medical condition, current treatments (if any), and specific questions you have for our doctors."
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none text-slate-800"
                                                    required
                                                ></textarea>
                                            </div>

                                            {/* Error Message */}
                                            {status === "error" && (
                                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                                                    {errorMsg}
                                                </div>
                                            )}

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={status === "loading"}
                                                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-6 py-3 shadow-md transition-all flex items-center justify-center gap-2"
                                            >
                                                {status === "loading" ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit for Evaluation <ChevronRight className="w-5 h-5" />
                                                    </>
                                                )}
                                            </button>

                                            <p className="text-xs text-center text-slate-400 font-medium">
                                                By submitting this form, you agree to our <a href="/privacy-policy" className="underline hover:text-slate-600">Privacy Policy</a> regarding medical data storage.
                                            </p>

                                        </form>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}

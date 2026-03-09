"use client"

import { useEffect, useState } from "react"
import { X, Phone, User } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const STORAGE_KEY = "stork_lead_popup_seen"

export function LeadPopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({ name: "", phone: "" })

    useEffect(() => {
        if (sessionStorage.getItem(STORAGE_KEY)) return
        const timer = setTimeout(() => setIsVisible(true), 5000)
        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        sessionStorage.setItem(STORAGE_KEY, "true")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const phoneRegex = /^[6-9]\d{9}$/
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
            toast.error("Please enter a valid 10-digit Indian phone number.")
            return
        }
        setIsSubmitting(true)
        const message = `New Lead from Website Popup\n\nName: ${formData.name}\nPhone: ${formData.phone}`
        window.open(`https://wa.me/919494408050?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
        toast.success("Thank you! Our team will reach out to you shortly.")
        handleClose()
        setIsSubmitting(false)
    }

    if (!isVisible) return null

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
            onClick={handleClose}
        >
            {/* Modal Container */}
            <div
                className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white transition-all shadow"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Banner: split layout — text left, image right */}
                <div className="relative h-[260px] bg-gradient-to-br from-[#1a4fa8] via-[#1d6ddb] to-[#2563eb] overflow-hidden flex">

                    {/* Left: Text Content */}
                    <div className="flex flex-col justify-center pl-7 pr-4 pt-6 pb-6 w-[55%] z-10">
                        <span className="text-blue-200 text-[10px] font-semibold uppercase tracking-widest mb-2">
                            Free Consultation
                        </span>
                        <h2 className="text-white text-[1.25rem] font-bold leading-snug mb-2">
                            Have Questions?<br />
                            <span className="text-blue-100">We&apos;re Here<br />to Help!</span>
                        </h2>
                        <p className="text-blue-200 text-[11px] leading-relaxed">
                            Talk to our specialists — get expert guidance today.
                        </p>
                    </div>

                    {/* Right: Doctor Image — large, bottom-anchored */}
                    <div className="absolute right-0 bottom-0 w-[55%] h-full">
                        <Image
                            src="/images/Group 11.png"
                            alt="Stork Hospital Doctor"
                            fill
                            className="object-contain object-bottom"
                            priority
                        />
                    </div>

                    {/* Subtle dot pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                            backgroundSize: "18px 18px",
                        }}
                    />
                </div>

                {/* Form Section */}
                <div className="px-7 py-6 space-y-4 bg-white">
                    <p className="text-slate-600 text-sm text-center font-medium">
                        Share your details — we will call you back shortly.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Name */}
                        <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                required
                                placeholder="Your Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 text-sm focus:ring-blue-500"
                            />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                required
                                type="tel"
                                placeholder="10-digit Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 text-sm focus:ring-blue-500"
                            />
                        </div>

                        {/* CTA */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-11 bg-[#FF8202] hover:bg-[#e67600] text-white font-bold rounded-xl text-base shadow-lg shadow-orange-500/25 transition-all"
                        >
                            {isSubmitting ? "Connecting..." : "📞 Request a Callback"}
                        </Button>
                    </form>

                    <p className="text-[10px] text-slate-400 text-center">
                        🔒 Your information is 100% private and secure.
                    </p>
                </div>
            </div>
        </div>
    )
}

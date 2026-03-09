"use client"

import { useEffect, useState } from "react"
import { X, Phone, User, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const STORAGE_KEY = "stork_lead_popup_seen"

export function LeadPopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({ name: "", phone: "" })

    useEffect(() => {
        // Only show once per session
        if (sessionStorage.getItem(STORAGE_KEY)) return

        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 5000)

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

        // Build WhatsApp message as quick lead capture
        const message = `New Lead from Website Popup\n\nName: ${formData.name}\nPhone: ${formData.phone}`
        const waLink = `https://wa.me/919494408050?text=${encodeURIComponent(message)}`
        window.open(waLink, "_blank", "noopener,noreferrer")

        toast.success("Thank you! Our team will reach out to you shortly.")
        handleClose()
        setIsSubmitting(false)
    }

    if (!isVisible) return null

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        >
            <div
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white transition-all shadow-sm"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Banner */}
                <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-[#FF8202] px-6 pt-8 pb-10 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)",
                            backgroundSize: "20px 20px"
                        }}
                    />
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/40">
                            <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-xl font-bold leading-snug mb-1">
                            Have Questions?
                        </h2>
                        <p className="text-blue-100 text-sm font-medium">
                            We&apos;re Here to Help — Get a Free Consultation
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
                    <p className="text-slate-600 text-sm text-center">
                        Share your details and our specialists will contact you shortly.
                    </p>

                    {/* Full Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            required
                            placeholder="Your Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="pl-9 rounded-xl bg-slate-50 border-slate-200 h-11"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            required
                            type="tel"
                            placeholder="10-digit Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="pl-9 rounded-xl bg-slate-50 border-slate-200 h-11"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 bg-[#FF8202] hover:bg-[#e67600] text-white font-bold rounded-xl text-base shadow-lg shadow-orange-500/20 transition-all"
                    >
                        {isSubmitting ? "Connecting..." : "Request a Callback 🩺"}
                    </Button>

                    <p className="text-[11px] text-slate-400 text-center">
                        🔒 Your information is 100% confidential and secure.
                    </p>
                </form>
            </div>
        </div>
    )
}

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, User, Phone, Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Indian phone validation
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
            toast.error("Please enter a valid 10-digit Indian phone number.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            toast.success("Message sent! Our team will get back to you soon.", {
                description: "We typically respond within 12-24 hours.",
            });

            // Reset form
            setFormData({
                name: "",
                phone: "",
                email: "",
                subject: "",
                message: "",
            });

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden relative">
            {/* Top decorative bar */}
            <div className="absolute top-0 inset-x-0 h-[6px] bg-gradient-to-r from-[#FF8202] to-orange-400" />

            <div className="px-8 py-10 md:p-12">
                <div className="mb-10 text-center sm:text-left">
                    <h2 className="text-[28px] font-bold text-slate-900 mb-3 tracking-tight">
                        Send us a Message
                    </h2>
                    <p className="text-slate-500 text-[15px] leading-relaxed max-w-md">
                        Fill out the form below. Our support team typically responds within 24 hours to all non-emergency inquiries.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    required
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 h-14 bg-slate-50/50 border border-slate-200 rounded-xl text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    placeholder="e.g. 98765 43210"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 h-14 bg-slate-50/50 border border-slate-200 rounded-xl text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 h-14 bg-slate-50/50 border border-slate-200 rounded-xl text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                                Subject
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    required
                                    name="subject"
                                    placeholder="Brief reason for contact"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 h-14 bg-slate-50/50 border border-slate-200 rounded-xl text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                            Your Message
                        </label>
                        <textarea
                            required
                            name="message"
                            rows={4}
                            placeholder="Please provide any details that will help us assist you..."
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-5 bg-slate-50/50 border border-slate-200 rounded-xl text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8202]/20 focus:border-[#FF8202] transition-all resize-none placeholder:text-slate-400 leading-relaxed"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-[56px] text-[16px] bg-[#FF8202] hover:bg-[#e67600] text-white font-semibold rounded-xl shadow-[0_8px_20px_rgba(255,130,2,0.25)] transition-all active:scale-[0.98] border-none"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                                    Sending Securely...
                                </>
                            ) : (
                                <>
                                    Send Inquiry <Send className="ml-3 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Calendar as CalendarIcon, User, Phone, Mail, Building2, Stethoscope, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function BookAppointment() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        department: "",
        doctor: "",
        date: "",
        message: "",
    });

    const generateWhatsAppLink = (data: typeof formData) => {
        const message = `*New Appointment Booking - Stork Hospital*

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Department: ${data.department}
Doctor: ${data.doctor || "Any Available"}
Date: ${new Date(data.date).toLocaleDateString("en-IN")}
Message: ${data.message || "None"}
`;
        return `https://wa.me/919494408050?text=${encodeURIComponent(message)}`;
    };

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
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit booking");
            }

            toast.success("Appointment request sent! Redirecting to WhatsApp...");

            // Open WhatsApp redirect in current tab to bypass window.open popup blockers
            const waLink = generateWhatsAppLink(formData);
            setTimeout(() => {
                window.location.href = waLink;
            }, 1000);

            // Reset form
            setFormData({
                name: "",
                phone: "",
                email: "",
                department: "",
                doctor: "",
                date: "",
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

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 overflow-hidden border border-slate-100 animate-in fade-in duration-500">
            <div className="bg-blue-600 p-6 md:p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    Book an Appointment
                </h2>
                <p className="text-blue-100 text-sm">
                    Fill out the form below and we will confirm your slot shortly.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" /> Full Name *
                        </label>
                        <Input
                            required
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-400" /> Phone Number *
                        </label>
                        <Input
                            required
                            type="tel"
                            name="phone"
                            placeholder="9876543210"
                            value={formData.phone}
                            onChange={handleChange}
                            className="rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-400" /> Email Address *
                        </label>
                        <Input
                            required
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                        />
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-slate-400" /> Preferred Date *
                        </label>
                        <Input
                            required
                            type="date"
                            name="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={formData.date}
                            onChange={handleChange}
                            className="rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors block w-full"
                        />
                    </div>

                    {/* Department */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-slate-400" /> Department *
                        </label>
                        <Select
                            required
                            value={formData.department}
                            onValueChange={(val) => handleSelectChange("department", val)}
                        >
                            <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-10">
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent className="z-[400] bg-white">
                                <SelectItem value="Cardiology">Cardiology</SelectItem>
                                <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                                <SelectItem value="Neurology">Neurology</SelectItem>
                                <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                                <SelectItem value="Gynaecology">Gynaecology</SelectItem>
                                <SelectItem value="General Surgery">General Surgery</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Doctor (Optional) */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Stethoscope className="w-4 h-4 text-slate-400" /> Doctor (Optional)
                        </label>
                        <Input
                            name="doctor"
                            placeholder="e.g. Dr. Ramesh"
                            value={formData.doctor}
                            onChange={handleChange}
                            className="rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                        />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2 mt-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-slate-400" /> Additional Notes
                    </label>
                    <textarea
                        name="message"
                        rows={4}
                        placeholder="Please describe your symptoms or reason for visit..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing Request...
                        </>
                    ) : (
                        "Book Appointment"
                    )}
                </Button>
                <p className="text-xs text-center text-slate-400 pt-2">
                    By booking, you agree to our privacy policy and terms of service.
                </p>
            </form>
        </div>
    );
}

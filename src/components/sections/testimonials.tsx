"use client";

import { Star, Quote } from "lucide-react";

export function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Ramesh Sharma",
            department: "Cardiology Patient",
            rating: 5,
            review:
                "The doctors and nursing staff at Stork Hospital went above and beyond during my bypass surgery. Their state-of-the-art facilities and compassionate care made my recovery smooth and stress-free. I highly recommend them for any cardiac emergencies.",
        },
        {
            id: 2,
            name: "Priya Reddy",
            department: "Maternity & Gynecology",
            rating: 5,
            review:
                "We welcomed our baby girl here last month. The entire maternity wing is exceptionally clean, and Dr. Anitha was incredibly supportive throughout my pregnancy. The 24/7 care we received was truly world-class.",
        },
        {
            id: 3,
            name: "Suresh Kumar",
            department: "Orthopedics Patient",
            rating: 5,
            review:
                "After my knee replacement surgery, I was walking within days. The physiotherapy team is brilliant, and the hospital's infrastructure is top tier. The cashless insurance process was completely hassle-free.",
        },
    ];

    return (
        <section className="bg-slate-50 py-24 border-y border-slate-100">
            <div className="container max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[var(--color-accent)] font-bold tracking-wider uppercase text-xs mb-3 block">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                        Patient Success Stories
                    </h2>
                    <p className="text-lg text-slate-600">
                        Don't just take our word for it. Hear what our patients have to say
                        about their recovery and experience with us.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 relative group"
                        >
                            {/* Decorative Quote Icon */}
                            <div className="absolute top-6 right-6 text-slate-100 group-hover:text-blue-50 transition-colors duration-300">
                                <Quote size={48} className="fill-current" />
                            </div>

                            {/* Star Rating */}
                            <div className="flex gap-1 mb-6 relative z-10">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-amber-400 text-amber-400"
                                    />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-slate-700 leading-relaxed mb-8 relative z-10 font-medium">
                                "{testimonial.review}"
                            </p>

                            {/* Patient Info */}
                            <div className="relative z-10 mt-auto">
                                <h4 className="text-[17px] font-bold text-slate-900 mb-1">
                                    {testimonial.name}
                                </h4>
                                <p className="text-[var(--color-accent)] font-medium text-sm">
                                    {testimonial.department}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

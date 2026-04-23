"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Play, ArrowRight, Users, Activity, Award, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
    {
        id: 1,
        name: "Devatha Kishan",
        department: "Orthopedics Patient",
        city: "Hyderabad",
        rating: 5,
        review: "The treatment here was very well they took a great personal care . I had my TKR procedure done at Stork hospital. The treatment was very good they supported me throughout my stay ... The nursing staff, doctors were very supportive throughout my procedure. Special thanks to Dr Narendra sir. I feel better and I'm able to walk normally again . I will definitely recommend Stork hospital for who ever is in need. Thank you 🙏",
    },
    {
        id: 2,
        name: "sainath aakash reddy",
        department: "Maternity & Gynecology",
        city: "Hyderabad",
        rating: 5,
        review: "Today my wife had cesarean delivery performed by Dr. Jyothi Reddy, and I am extremely grateful for her exceptional care. She was calm, supportive, and highly skilled throughout the entire procedure, which made me feel completely safe and confident. The hospital staff were also amazing — very attentive, caring, and quick to respond whenever I needed help. Their kindness and professionalism made my recovery much more comfortable. Overall, a wonderful experience. Highly recommended!",
    },
    {
        id: 3,
        name: "Kulla Siddulu",
        department: "General Patient",
        city: "Secunderabad",
        rating: 5,
        review: "This hospital has provided us a great treatment. A special thanks to Dr Narendra garu and their team. The food was very good and well maintained with great cleaning. I will definitely recommend stork hospital for every one suffering with any problem. Thank you 🙏",
    },
    {
        id: 4,
        name: "Pawan Yadav",
        department: "Orthopedics Patient",
        city: "Hyderabad",
        rating: 5,
        review: "I had a led injury and i feel better now the doctors and nursing staff are nice . Bohut Accha treatment tha or Archana hospital hai . Food was nice. Cleaning was done on time. Everyone are very helpful. I will recommend Stork hospital for everyone thank you for the care 🙏",
    },
    {
        id: 5,
        name: "Akula Sandeepa",
        department: "Urology Patient",
        city: "Hyderabad",
        rating: 5,
        review: "I had kidney stones and got it sured in stork hospital. The treatment was very nice and food was also good I will definitely recommend stork hospital. I feel no pain and I'm thankful for their care. Thank you so much 🙏",
    },
    {
        id: 6,
        name: "Madhu Reddy",
        department: "Orthopedics Patient",
        city: "Telangana",
        rating: 5,
        review: "They provided with a great treatment for my hand I'm happy about the procedure and the after care. The food provided was very nice and Hygnic. Nursing staff and doctors took a great care. They maintained high cleaning standards. I will definitely recommend Stork hospital. I'm greatful for their care. 🙏",
    },
    {
        id: 7,
        name: "Divya Reddy",
        department: "General Patient",
        city: "Hyderabad",
        rating: 5,
        review: "I had a great experience visiting Stork hospital . The treatment hear was very good and they took a very gentle and great care. The cleaning was well maintained. Doctor's took great care and are very responsive. Nursing staff are very humble and gentle. I will definitely recommend Stork hospital.",
    },
    {
        id: 8,
        name: "Hulash Betala",
        department: "Pain Management",
        city: "Hyderabad",
        rating: 4,
        review: "Dr Narendar is down to earth person. Clearly explain the Status of the ailment and suggest best possible treatment. I went through epidural procedures for my persisatant neck pain. Whole procedure was smooth.. One improvement required, staff need more coordination, Discharge process after the procedures is very slow at staffs end. No updates provided inspite of chasing many times. Otherwise, over all good experience",
    },
];

const videos = [
    {
        id: 1,
        patientName: "Rahul Kumar",
        treatmentType: "Knee Replacement Recovery Story",
        thumbnail: "https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        patientName: "Meera Reddy",
        treatmentType: "Maternity & Childbirth Experience",
        thumbnail: "https://images.unsplash.com/photo-1519494140681-80ce5625bf51?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        patientName: "Sanjay Gupta",
        treatmentType: "Cardiac Bypass Success Story",
        thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    },
];

export function Testimonials() {
    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    const featuredTestimonial = testimonials[1]; // Using the detailed maternity review as featured
    const carouselTestimonials = testimonials.filter((t) => t.id !== featuredTestimonial.id);

    return (
        <section className="bg-white py-24 border-y border-slate-100">
            <Container>

                {/* SECTION TITLE & PART 1: GOOGLE REVIEW SUMMARY */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-[#2A6FDB] font-bold tracking-wider uppercase text-xs mb-3 block">
                            Patient Success Stories
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Hear from our patients
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                            Hear from our patients about their treatment experience, recovery journey, and the care they received at our hospital.
                        </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col items-center lg:items-end shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-3xl font-bold text-slate-900">4.8</span>
                            <span className="text-slate-400 text-2xl">/</span>
                            <span className="text-slate-500 text-xl">5</span>
                            <div className="flex ml-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/30 text-amber-400/30'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 font-medium mb-4">Based on 380+ Google Reviews</p>
                        <Button variant="outline" className="border-[#2A6FDB] text-[#2A6FDB] hover:bg-[#2A6FDB] hover:text-white transition-all w-full lg:w-auto font-semibold" asChild>
                            <a href="https://maps.app.goo.gl/roNgtXcEgrSNqoLG9" target="_blank" rel="noopener noreferrer">
                                View All Reviews on Google <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                        </Button>
                    </div>
                </div>

                {/* PART 2: FEATURED PATIENT STORY */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 lg:p-12 mb-24 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A6FDB]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

                    <div className="flex flex-col lg:flex-row gap-10 items-center relative z-10">
                        {/* Avatar Column */}
                        <div className="w-40 h-40 shrink-0 relative">
                            <div className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex items-center justify-center text-[#2A6FDB]/40">
                                <UserRound className="w-20 h-20" />
                            </div>
                            <div className="absolute -bottom-3 -right-3 bg-white p-1 rounded-full shadow-lg">
                                <div className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-green-600">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                                </div>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="flex-1">
                            <div className="flex gap-1 mb-6">
                                {[...Array(featuredTestimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <blockquote className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed mb-8">
                                "{featuredTestimonial.review}"
                            </blockquote>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-200 pt-6 gap-4">
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-1">{featuredTestimonial.name}</h4>
                                    <p className="text-[#2A6FDB] font-medium">{featuredTestimonial.department} <span className="text-slate-400 mx-2">•</span> <span className="text-slate-500 font-normal">{featuredTestimonial.city}</span></p>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 text-[#2A6FDB] font-semibold bg-[#2A6FDB]/10 px-4 py-2 rounded-full">
                                    <ShieldCheck className="w-5 h-5" />
                                    Verified Patient
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PART 3: TESTIMONIAL CAROUSEL */}
                <div className="mb-24">
                    <Carousel
                        plugins={[plugin.current]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full relative"
                    >
                        <CarouselContent className="-ml-4 md:-ml-6">
                            {carouselTestimonials.map((testimonial) => (
                                <CarouselItem key={testimonial.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                                    <div className="bg-white border border-slate-100 rounded-2xl p-8 h-full shadow-sm hover:shadow-md transition-shadow flex flex-col">

                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex gap-1">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                ))}
                                                {[...Array(5 - testimonial.rating)].map((_, i) => (
                                                    <Star key={i + 10} className="w-4 h-4 text-slate-200 fill-slate-100" />
                                                ))}
                                            </div>
                                            <div className="text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 border border-green-100">
                                                <ShieldCheck className="w-3 h-3" /> Verified
                                            </div>
                                        </div>

                                        <p className="text-slate-700 leading-relaxed mb-8 flex-1 line-clamp-4">
                                            "{testimonial.review}"
                                        </p>

                                        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-50">
                                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                                                <UserRound className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-slate-900">{testimonial.name}</h4>
                                                <p className="text-sm text-[#2A6FDB] font-medium">{testimonial.department}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex justify-center gap-4 mt-10">
                            <CarouselPrevious className="static translate-y-0 w-12 h-12 bg-slate-50 border-slate-200 text-slate-600 hover:bg-[#2A6FDB] hover:text-white hover:border-[#2A6FDB] shadow-sm" />
                            <CarouselNext className="static translate-y-0 w-12 h-12 bg-slate-50 border-slate-200 text-slate-600 hover:bg-[#2A6FDB] hover:text-white hover:border-[#2A6FDB] shadow-sm" />
                        </div>
                    </Carousel>
                </div>
            </Container>
        </section>
    );
}

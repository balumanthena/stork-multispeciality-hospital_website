import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section } from "@/components/layout/section"
import {
  ArrowRight, Activity, Heart, Brain, Stethoscope, Clock,
  ShieldCheck, Users, Award, Phone, Calendar, User, Microscope,
  CheckCircle2, Star, Quote, ChevronRight, MapPin
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-slate-50">

      {/* 1. HERO SECTION (Institutional Split - Corporate Look) */}
      <section className="w-full bg-[#f8fafc] overflow-hidden">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-10 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center relative z-10 space-y-8">

              {/* Trust Badge / Header Info */}
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm w-fit">
                <ShieldCheck className="w-4 h-4 text-[#FF8202]" />
                <span className="text-slate-700 font-semibold tracking-wide uppercase text-[11px] md:text-xs">
                  India's Top Trusted Healthcare Brand
                </span>
              </div>

              {/* Headings */}
              <div className="space-y-4 max-w-2xl">
                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-slate-900 leading-[1.25] tracking-[-0.02em]">
                  Advanced Multispecialty Care <br className="hidden lg:block" />
                  in Kompally, Hyderabad
                </h1>
                <p className="text-base md:text-lg text-[#5F6B7A] leading-relaxed max-w-xl pr-4">
                  Delivering evidence-based treatment and compassionate patient-centered healthcare with world-class infrastructure.
                </p>
              </div>

              {/* Hospital Contact Info Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-slate-500" />
                  </div>
                  <span>Survey No 14 & 15, Kompally</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-slate-500" />
                  </div>
                  <span>Emergency: 1066</span>
                </div>
              </div>

              {/* Action Buttons - Segmented Horizontal Container */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-[#F5F7FA] rounded-2xl sm:rounded-full shadow-sm mt-10 w-full max-w-2xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border border-slate-200 py-0 sm:py-3 px-0 sm:px-2">

                {/* Segment 1: Primary */}
                <Link
                  href="/appointments"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 sm:py-3 hover:bg-gray-100 transition-colors group cursor-pointer rounded-none sm:rounded-full"
                >
                  <Calendar className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                  <span className="font-semibold text-slate-900 group-hover:text-[var(--color-accent)] whitespace-nowrap transition-colors text-base">
                    Book Appointment
                  </span>
                  <div className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center text-slate-400 group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

                {/* Segment 2: Second Opinion */}
                <Link
                  href="/second-opinion"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 sm:py-3 hover:bg-gray-100 transition-colors group cursor-pointer rounded-none sm:rounded-full"
                >
                  <span className="font-semibold text-slate-700 group-hover:text-slate-900 whitespace-nowrap transition-colors text-base">
                    Second Opinion
                  </span>
                  <div className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center text-slate-400 group-hover:text-slate-600 group-hover:border-slate-400 transition-all group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full lg:w-[45%] relative mt-8 lg:mt-0">
              <div className="relative aspect-[4/3] w-full rounded-[24px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] group">
                <Image
                  src="/images/hero-bg.png"
                  alt="Stork Hospital Building"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                {/* Subtle gradient overlay to enhance image depth without obscuring it */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CENTERS OF EXCELLENCE */}
      <Section className="py-24 bg-slate-50">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-[var(--color-accent)] font-bold tracking-wider uppercase text-xs mb-2 block">Clinical Excellence</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Specialties</h2>
            </div>
            <Link href="/services" className="group flex items-center text-slate-600 font-semibold hover:text-[var(--color-accent)] transition-colors">
              View All Departments <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Cardiology", icon: Heart, desc: "Complete heart care." },
              { title: "Neurology", icon: Brain, desc: "Advanced brain & spine." },
              { title: "Orthopedics", icon: Activity, desc: "Joint replacement." },
              { title: "Oncology", icon: Microscope, desc: "Integrated cancer care." },
              { title: "Gastroenterology", icon: Stethoscope, desc: "Digestive health." },
              { title: "Nephrology", icon: Activity, desc: "Kidney care & dialysis." },
              { title: "Pediatrics", icon: User, desc: "Child specialist care." },
              { title: "Emergency", icon: ShieldCheck, desc: "24/7 Trauma center." },
            ].map((dept, index) => (
              <Link key={index} href={`/departments/${dept.title.toLowerCase()}`} className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-orange-100 transition-all duration-300 hover:-translate-y-1 block">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-300">
                    <dept.icon className="h-6 w-6" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[var(--color-accent)] transition-colors">{dept.title}</h3>
                <p className="text-slate-500 text-sm">{dept.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. WHY CHOOSE US (Institutional Look) */}
      <Section className="py-24 bg-white border-y border-slate-100">
        <div className="container max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[var(--color-accent)] font-bold tracking-wider uppercase text-xs mb-3 block">Why Stork Hospital</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Committed to Clinical Excellence & Patient Safety
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We are a JCI accredited institution providing multi-disciplinary care with outcomes matching global standards.
              </p>

              <div className="space-y-6">
                {[
                  "Internationally Trained Doctors",
                  "State-of-the-art Operation Theaters",
                  "24/7 Emergency & Pharmacy",
                  "Insurance Support Desk"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-6 w-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] rounded-full px-8 h-12">
                  Know More About Us
                </Button>
              </div>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/doctor-highlight.png"
                alt="Modern Infrastructure"
                fill
                className="object-cover"
              />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur rounded-xl p-5 shadow-lg max-w-[200px]">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-orange-400 text-orange-400" />)}
                </div>
                <p className="text-xs text-slate-500 font-medium">"Best hospital for cardiac care in the region."</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. DOCTOR HIGHLIGHT (Clean & Corporate) */}
      <Section className="py-24 bg-slate-50">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Meet Our Experts</h2>
            <Link href="/doctors" className="group flex items-center text-slate-600 font-semibold hover:text-[var(--color-accent)] transition-colors">
              View All Doctors <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Rajesh Kumar", role: "Chief Cardiologist", exp: "25+ Years", qual: "MBBS, MD, DM" },
              { name: "Dr. Anjali Desai", role: "Senior Neurologist", exp: "18+ Years", qual: "MBBS, MD, DM" },
              { name: "Dr. Vikram Singh", role: "Head Orthopedics", exp: "22+ Years", qual: "MBBS, MS, MCh" },
            ].map((doc, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                <div className="h-64 bg-slate-200 relative overflow-hidden">
                  {/* Placeholder for real image */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <User className="h-20 w-20" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-[var(--color-accent)] transition-colors">{doc.name}</h3>
                  <p className="text-[var(--color-accent)] font-medium text-sm mb-3">{doc.role}</p>
                  <div className="text-xs text-slate-500 mb-6 space-y-1">
                    <p>{doc.qual}</p>
                    <p>{doc.exp} Experience</p>
                  </div>
                  <Button className="w-full bg-white border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white rounded-lg h-10 font-semibold transition-colors">
                    Book Appointment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. FOOTER CTA */}
      <section className="py-20 bg-[var(--color-primary)] text-white">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Emergency Assistance?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
            We are available 24/7 to handle any medical emergency with our rapid response team.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white h-14 px-10 text-lg font-bold rounded-full border-none shadow-lg shadow-red-900/40">
              <Phone className="w-5 h-5 mr-3" /> Call 1066
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 h-14 px-10 text-lg font-bold rounded-full">
              Book Online
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}

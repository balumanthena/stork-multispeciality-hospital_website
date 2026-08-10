import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section } from "@/components/layout/section"
import { BlogScrollSection } from "@/components/sections/blog-scroll-section"
import { InsurancePartners } from "@/components/sections/insurance-partners"
import { Testimonials } from "@/components/sections/testimonials"
import { DEPARTMENTS_LIST, DEPARTMENT_ORDER } from "@/lib/data/departments"
import { HomepageTreatmentIcons } from "@/components/sections/homepage-treatment-icons"
import { HomepageDepartments } from "@/components/sections/homepage-departments"
import { HARDCODED_TREATMENTS } from "@/lib/data/hardcoded-treatments"
import { Suspense } from "react"
import {
  ArrowRight, Activity, Heart, Brain, Stethoscope, Clock,
  ShieldCheck, Users, Award, Phone, Calendar, User, Microscope,
  CheckCircle2, Star, Quote, ChevronRight, MapPin, UserCheck
} from "lucide-react"
import { Container } from "@/components/layout/container"

const allTreatments = HARDCODED_TREATMENTS.flatMap(cat => cat.items)

export default function Home() {
  const sortedDepartments = [...DEPARTMENTS_LIST].sort((a, b) => {
    const indexA = DEPARTMENT_ORDER.indexOf(a.title);
    const indexB = DEPARTMENT_ORDER.indexOf(b.title);

    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  return (
    <div className="font-sans text-slate-900 bg-slate-50">

      {/* 1. HERO SECTION (Institutional Split - Corporate Look) */}
      <section className="w-full bg-[#f8fafc] lg:min-h-[calc(100dvh-76px)] flex items-center py-12 lg:py-0">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center relative z-10 space-y-5">

              {/* Trust Badge / Header Info */}
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm w-fit">
                <ShieldCheck className="w-4 h-4 text-[#FF8202]" />
                <span className="text-slate-700 font-semibold tracking-wide uppercase text-[11px] md:text-xs">
                  India's Top Trusted Healthcare Brand
                </span>
              </div>

              {/* Headings */}
              <div className="space-y-3 max-w-2xl">
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
                  <span>C-35, opp. Narayana School, near DMart, Petbasheerabad, Kompally, Hyderabad, Secunderabad, Telangana 500067</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-8 w-full">
                {/* Primary CTA */}
                <Link
                  href="/appointments"
                  className="flex items-center justify-center gap-2 bg-[#F97316] text-white px-8 py-3.5 rounded-xl shadow-md hover:shadow-[0_10px_25px_rgba(249,115,22,0.4)] hover:scale-105 transition-all duration-300 font-semibold text-[15px] sm:text-base w-full sm:w-auto"
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/second-opinion"
                  className="flex items-center justify-center gap-2 border-2 border-[#F97316] text-[#F97316] px-8 py-3.5 rounded-xl hover:bg-[#F97316] hover:text-white hover:shadow-[0_10px_25px_rgba(249,115,22,0.4)] hover:scale-105 transition-all duration-300 font-semibold text-[15px] sm:text-base w-full sm:w-auto bg-white"
                >
                  Second Opinion
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators (Fills empty space below CTAs) */}
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  JCI Accredited Hospital
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <Award className="w-3 h-3" />
                  </div>
                  15+ Expert Departments
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[45%] relative lg:mt-0 flex justify-center items-center transform-gpu">
              <div className="relative w-full max-w-lg aspect-square lg:max-w-none lg:aspect-auto h-[400px] lg:h-[550px] xl:h-[600px] transform-gpu">
                <picture className="w-full h-full block transform-gpu">
                  <source srcSet="/images/final-desktop.avif" type="image/avif" media="(min-width: 1024px)" />
                  <source srcSet="/images/final-desktop.webp" type="image/webp" media="(min-width: 1024px)" />
                  <source srcSet="/images/final-mobile.avif" type="image/avif" />
                  <source srcSet="/images/final-mobile.webp" type="image/webp" />
                  <img
                    src="/images/final-desktop.webp"
                    alt="Stork Hospital Building"
                    className="w-full h-full object-contain transform-gpu"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 2. OUR TREATMENTS (Icons Grid) */}
      <HomepageTreatmentIcons allTreatments={allTreatments} />

      {/* 3. CENTERS OF EXCELLENCE */}
      <HomepageDepartments departments={sortedDepartments} />

      {/* 4. CASHLESS INSURANCE PARTNERS */}
      <InsurancePartners />

      {/* 5. WHY CHOOSE US (Institutional Look) */}
      <Section className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="container max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">

            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left space-y-6 max-w-xl order-2 lg:order-1 mx-auto lg:mx-0 w-full">
              <div>
                <span className="text-[#ff8202] font-bold tracking-wider uppercase text-[10px] md:text-xs mb-3 block">
                  Why Stork Hospital
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-4 md:mb-6">
                  Committed to Clinical Excellence & Patient Safety
                </h2>
                <p className="text-[15px] md:text-lg text-slate-600 leading-relaxed">
                  We are a JCI accredited institution providing multi-disciplinary care with outcomes matching global standards.
                </p>
              </div>

              {/* Feature List (Mini Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {[
                  {
                    title: "Expert Doctors",
                    desc: "Internationally trained specialists with global expertise.",
                    icon: Users,
                    color: "text-[#ff8202]"
                  },
                  {
                    title: "Modern OTs",
                    desc: "Advanced theaters for minimally invasive surgeries.",
                    icon: Microscope,
                    color: "text-[#3e7dca]"
                  },
                  {
                    title: "24/7 Support",
                    desc: "Round-the-clock emergency and pharmacy services.",
                    icon: Clock,
                    color: "text-green-600"
                  },
                  {
                    title: "Insurance Desk",
                    desc: "Seamless cashless hospitalization support.",
                    icon: ShieldCheck,
                    color: "text-purple-600"
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${item.color}`} />
                    <div>
                      <p className="font-semibold text-[15px] text-slate-900">{item.title}</p>
                      <p className="text-[13px] text-slate-500 mt-1 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-center lg:justify-start">
                <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:text-[#ff8202] hover:border-[#ff8202] rounded-full px-8 h-12 text-[15px] font-bold transition-all shadow-sm">
                  <Link href="/about">Know More About Us</Link>
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE (TRUST CARDS GRID) */}
            <div className="w-full order-1 lg:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                {[
                  { label: "Comprehensive Care", value: "100+ Treatments" },
                  { label: "Always Available", value: "24/7 Emergency" },
                  { label: "Global Standards", value: "JCI Protocol Care" },
                  { label: "Expert Departments", value: "16 Specialties" },
                  { label: "Surgical Excellence", value: "Advanced OTs" },
                  { label: "Hassle-free Support", value: "Cashless Insurance" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1 group">
                    <h4 className="text-[13px] md:text-sm text-gray-500 font-medium mb-1.5 uppercase tracking-wide">{stat.label}</h4>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight group-hover:text-[#ff8202] transition-colors">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Section>


      {/* 6. PATIENT TESTIMONIALS */}
      <Testimonials />




      {/* 7. LATEST BLOGS (Scroll Right-to-Left) */}
      <Suspense fallback={<div className="py-10 md:py-16 flex items-center justify-center text-slate-400 bg-slate-50"><div className="animate-pulse">Loading articles...</div></div>}>
        <BlogScrollSection />
      </Suspense>

      {/* 8. FOOTER CTA - Authority-Focused Emergency Section */}
      <section className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract Background Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ff8202] rounded-full blur-[160px] opacity-10 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ff8202] rounded-full blur-[160px] opacity-10 pointer-events-none" />

        <div className="container max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ff8202] text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Clock className="w-4 h-4" />
            <span>Available 24/7 For You</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight leading-[1.1] text-white">
            Need <span className="text-[#ff8202]">Emergency</span> Assistance?
          </h2>

          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Our rapid response team is standing by 24/7 to provide expert medical care when every second counts.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="bg-[#ff8202] hover:bg-[#ff8202]/90 text-white h-16 px-12 text-lg font-bold rounded-2xl shadow-2xl shadow-[#ff8202]/20 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
              <Link href="/appointments">
                Book Online Now
              </Link>
            </Button>
            <a href="tel:+917610810819" className="flex items-center gap-3 text-white font-bold text-lg hover:text-[#ff8202] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#ff8202]/20 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              Emergency: +91 76108 10819
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

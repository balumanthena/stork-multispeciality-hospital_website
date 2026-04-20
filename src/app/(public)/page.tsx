import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section } from "@/components/layout/section"
import { VideoScrollSection } from "@/components/sections/video-scroll-section"
import { BlogScrollSection } from "@/components/sections/blog-scroll-section"
import { InsurancePartners } from "@/components/sections/insurance-partners"
import { Testimonials } from "@/components/sections/testimonials"
import { HomepageTreatmentIcons } from "@/components/sections/homepage-treatment-icons"
import { HARDCODED_TREATMENTS } from "@/lib/data/hardcoded-treatments"
import { Suspense } from "react"
import {
  ArrowRight, Activity, Heart, Brain, Stethoscope, Clock,
  ShieldCheck, Users, Award, Phone, Calendar, User, Microscope,
  CheckCircle2, Star, Quote, ChevronRight, MapPin
} from "lucide-react"

  const allTreatments = HARDCODED_TREATMENTS.flatMap(cat => cat.items)

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
            <div className="w-full lg:w-[45%] relative mt-8 lg:mt-0 flex justify-center items-center">
              <div className="relative w-full max-w-lg aspect-square lg:max-w-none lg:aspect-auto h-[400px] lg:h-[500px]">
                <Image
                  src="/images/FINAL.svg"
                  alt="Stork Hospital Building"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OUR TREATMENTS (Icons Grid) */}
      <HomepageTreatmentIcons allTreatments={allTreatments} />

      {/* 3. CENTERS OF EXCELLENCE */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">
              Our Specialties
            </h2>
            <Link href="/services" className="group flex items-center text-slate-600 font-medium hover:text-[var(--color-accent)] transition-colors">
              View All Departments <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
            {[
              { title: "General Medicine", slug: "general-medicine", iconUrl: "/images/general-medicine.png" },
              { title: "Neurosurgery", slug: "neurosurgery", iconUrl: "/images/neurosurgery.png" },
              { title: "Orthopaedics", slug: "orthopaedics", iconUrl: "/images/orthopedics.png" },
              { title: "Oncology", slug: "oncology", iconUrl: "/images/oncology.png" },
              { title: "GI & Bariatric", slug: "bariatric", iconUrl: "/images/gi-surgery-and-weight-loss.png" },
              { title: "Urology", slug: "urology", iconUrl: "/images/urology-and-andrology.png" },
              { title: "Gynaecology", slug: "gynaecology", iconUrl: "/images/gynecology.png" },
              { title: "Emergency", slug: "emergency", iconUrl: "/images/emergency-trauma-and-critical-care.png" },
            ].map((dept, index) => (
              <Link
                key={index}
                href={`/services/${dept.slug}`}
                className="bg-white border-[1.5px] border-slate-200/80 rounded-[20px] py-5 px-3 flex flex-col items-center justify-center transition-all duration-300 hover:border-orange-500 hover:shadow-[0_4px_15px_-4px_rgba(249,115,22,0.15)] group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mb-2 flex items-center justify-center">
                  <Image src={dept.iconUrl} alt={dept.title} width={44} height={44} className="object-contain filter-orange group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="text-[15px] md:text-[16px] font-semibold text-orange-500 group-hover:text-orange-600 text-center transition-colors">
                  {dept.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CASHLESS INSURANCE PARTNERS */}
      <InsurancePartners />

      {/* 5. WHY CHOOSE US (Institutional Look) */}
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


      {/* 6. PATIENT TESTIMONIALS */}
      <Testimonials />

      {/* 7. RECENT VIDEOS (Scroll Left-to-Right) */}
      <Suspense fallback={<div className="py-16 flex items-center justify-center text-slate-400 bg-white"><div className="animate-pulse">Loading videos...</div></div>}>
        <VideoScrollSection />
      </Suspense>

      {/* 7. LATEST BLOGS (Scroll Right-to-Left) */}
      <Suspense fallback={<div className="py-16 flex items-center justify-center text-slate-400 bg-slate-50"><div className="animate-pulse">Loading articles...</div></div>}>
        <BlogScrollSection />
      </Suspense>

      {/* 8. FOOTER CTA - Authority-Focused Emergency Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract Background Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ff8202] rounded-full blur-[160px] opacity-10 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#3e7dca] rounded-full blur-[160px] opacity-10 pointer-events-none" />

        <div className="container max-w-5xl mx-auto px-6 text-center relative z-10">
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
            <Link href="/appointments" className="w-full sm:w-auto">
              <Button size="lg" className="bg-[#ff8202] hover:bg-[#ff8202]/90 text-white h-16 px-12 text-lg font-bold rounded-2xl shadow-2xl shadow-[#ff8202]/20 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
                Book Online Now
              </Button>
            </Link>
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

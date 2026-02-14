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

      {/* 1. HERO SECTION (Enterprise Standard - 60vh) */}
      <section className="relative h-[65vh] min-h-[600px] flex items-center overflow-hidden bg-slate-900">
        <Image
          src="/images/hero-bg.png"
          alt="Stork Hospital"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
        {/* Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent z-10" />

        <div className="container max-w-7xl mx-auto px-6 relative z-20">
          <div className="max-w-3xl pt-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium backdrop-blur-md border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
              Excellence in Healthcare since 1995
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              World-Class Care <br />
              <span className="text-white/90">Right Here in India.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Experience advanced medical technology combined with compassionate care.
              We are committed to providing the highest standards of patient safety.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white border-none text-lg font-semibold h-14 px-10 rounded-full shadow-lg shadow-orange-900/20 transition-all hover:scale-105">
                Book Appointment
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white text-lg font-medium h-14 px-10 rounded-full backdrop-blur-sm">
                Explore Specialties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP (Dark Navy) */}
      <section className="bg-[var(--color-primary)] py-12 border-b border-slate-800">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800/50">
            {[
              { val: "50+", label: "Specialties" },
              { val: "300+", label: "Expert Doctors" },
              { val: "1M+", label: "Happy Patients" },
              { val: "24/7", label: "Emergency Care" }
            ].map((stat, i) => (
              <div key={i} className={`text-center ${i !== 0 ? 'pl-8' : ''}`}>
                <p className="text-4xl font-bold text-white mb-1 tracking-tight">{stat.val}</p>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
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
            <Link href="/departments" className="group flex items-center text-slate-600 font-semibold hover:text-[var(--color-accent)] transition-colors">
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

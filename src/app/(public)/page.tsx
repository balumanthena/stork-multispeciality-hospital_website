import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Section } from "@/components/layout/section"
import { ArrowRight, Activity, Heart, Brain, Stethoscope, Clock, ShieldCheck, Users, Award, MoveRight, Phone, Calendar, User, Microscope } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Stork Hospital Lobby"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/20 md:to-transparent z-10" />
        </div>

        <div className="container relative z-20 px-4 md:px-6">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center rounded-full bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/30 px-3 py-1 text-sm text-[var(--color-accent)] backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[var(--color-accent)] mr-2 animate-pulse"></span>
              NABH Accredited | JCI Certified
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              World-Class Healthcare, <br />
              <span className="text-[var(--color-accent)]">Close to Home.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed max-w-[500px]">
              Advanced medical technology meets compassionate care. Experience the gold standard in multispecialty treatment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white border-none shadow-lg shadow-teal-900/20 text-base h-12 px-8">
                Book Appointment
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 text-base h-12 px-8">
                Explore Departments
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[var(--color-accent)]" />
                <span>Certified Excellence</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[var(--color-accent)]" />
                <span>Patient-Centric Approach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Departments Preview Section */}
      <Section className="bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">Centers of Excellence</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our specialized departments are led by renowned experts and equipped with cutting-edge technology to provide comprehensive care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Cardiology", icon: Heart, desc: "Comprehensive heart care & surgery." },
            { title: "Neurology", icon: Brain, desc: "Advanced brain & spine treatment." },
            { title: "Orthopedics", icon: Activity, desc: "Joint replacement & sports medicine." },
            { title: "Pediatrics", icon: User, desc: "Specialized care for infants & children." },
            { title: "Oncology", icon: Microscope, desc: "Integrated cancer care center." },
            { title: "Gastroenterology", icon: Stethoscope, desc: "Digestive health & surgery." },
            { title: "Nephrology", icon: Activity, desc: "Kidney care & dialysis unit." },
            { title: "Emergency", icon: Clock, desc: "24/7 Trauma & critical care." },
          ].map((dept, index) => (
            <Card key={index} className="group hover:shadow-md transition-all border-slate-200 hover:border-[var(--color-accent)]/50">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-[var(--color-primary)]/5 text-[var(--color-primary)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                  <dept.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">{dept.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{dept.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" className="gap-2 text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5">
            View All Departments <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* 3. Why Choose Us */}
      <Section className="bg-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Expert Doctors", icon: Stethoscope, desc: "Team of internationally trained specialists" },
            { title: "Best Technology", icon: Activity, desc: "Latest equipment for precise diagnosis" },
            { title: "24/7 Care", icon: Clock, desc: "Round-the-clock emergency support" },
            { title: "Affordable", icon: Award, desc: "Transparent pricing & insurance support" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-slate-100">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 max-w-[200px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Featured Treatments */}
      <Section className="bg-slate-50/50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2">Featured Treatments</h2>
            <p className="text-slate-600 max-w-xl">
              Specialized procedures performed with high success rates using minimally invasive techniques.
            </p>
          </div>
          <Link href="#" className="hidden md:flex items-center text-[var(--color-accent)] font-medium hover:underline gap-1">
            View all procedures <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Total Knee Replacement",
            "Cardiac Bypass Surgery",
            "Laparoscopic Hysterectomy",
            "Laser Eye Surgery",
            "Kidney Transplant",
            "Cochlear Implants"
          ].map((treatment, i) => (
            <Card key={i} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">{treatment}</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Advanced surgical procedure performed by expert surgeons with minimal recovery time.
                </p>
                <Link href="#" className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-primary)] flex items-center gap-1 transition-colors">
                  Read More <MoveRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 md:hidden text-center">
          <Link href="#" className="text-[var(--color-accent)] font-medium hover:underline">
            View all procedures
          </Link>
        </div>
      </Section>

      {/* 5. Doctor Highlight */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[var(--color-primary)] rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-[400px] lg:h-auto min-h-[500px]">
                <Image
                  src="/images/doctor-highlight.png"
                  alt="Dr. Rajesh Kumar"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/90 via-transparent to-transparent lg:hidden" />
                <div className="absolute bottom-6 left-6 text-white lg:hidden">
                  <h3 className="text-2xl font-bold">Dr. Rajesh Kumar</h3>
                  <p className="text-white/80">Chief Medical Officer</p>
                </div>
              </div>
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white">
                <div className="hidden lg:block mb-8">
                  <h3 className="text-3xl font-bold mb-2">Dr. Rajesh Kumar</h3>
                  <p className="text-lg text-[var(--color-accent)] font-medium">Chief Medical Officer, Cardiology</p>
                </div>
                <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-8 opacity-90 italic">
                  "Our mission is to provide accessible, world-class healthcare with a human touch. We believe in treating not just the ailment, but the person as a whole."
                </blockquote>
                <div className="grid grid-cols-2 gap-8 mb-10 border-t border-white/20 pt-8">
                  <div>
                    <div className="text-4xl font-bold text-[var(--color-accent)] mb-1">25+</div>
                    <div className="text-sm opacity-70">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[var(--color-accent)] mb-1">10k+</div>
                    <div className="text-sm opacity-70">Successful Surgeries</div>
                  </div>
                </div>
                <Button variant="secondary" size="lg" className="w-fit text-[var(--color-primary)] bg-white hover:bg-slate-100">
                  Book Consultation With Dr. Rajesh
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <Section className="bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">Patient Stories</h2>
          <p className="text-slate-600">Hear from our patients about their experience at Stork Hospital.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-none bg-white shadow-sm p-6 relative">
              <div className="text-6xl text-slate-100 absolute top-4 right-6 font-serif">"</div>
              <CardContent className="p-0 pt-4 relative z-10">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-slate-600 mb-6 italic">
                  "The care I received was exceptional. The doctors were attentive and the nursing staff made sure I was comfortable throughout my recovery."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 text-xs font-bold rounded-full bg-slate-200 flex items-center justify-center text-slate-500">PS</div>
                  <div>
                    <p className="text-sm font-bold text-[var(--color-primary)]">Priya Sharma</p>
                    <p className="text-xs text-slate-400">Recovered Patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* 7. Blog Preview */}
      <Section className="bg-white">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">Latest Health Insights</h2>
          <Button variant="ghost" className="hidden md:flex">View all posts <ArrowRight className="h-4 w-4 ml-2" /></Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { date: "Oct 12, 2025", title: "Understanding Heart Health: Tips for Prevention" },
            { date: "Oct 08, 2025", title: "The Importance of Regular Health Checkups" },
            { date: "Sep 28, 2025", title: "Advances in Minimally Invasive Surgery" }
          ].map((blog, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="h-48 bg-slate-200 rounded-xl mb-4 overflow-hidden relative">
                {/* Placeholder for blog image */}
                <div className="absolute inset-0 bg-slate-300 group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] rounded-md">
                  Medical
                </div>
              </div>
              <div className="text-xs text-[var(--color-accent)] font-semibold mb-2">{blog.date}</div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                {blog.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                Learn more about how to maintain a healthy lifestyle and prevent chronic diseases with expert advice from our specialists.
              </p>
              <span className="text-sm font-medium text-[var(--color-primary)] underline decoration-transparent group-hover:decoration-[var(--color-primary)] transition-all underline-offset-4">
                Read Article
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 md:hidden text-center">
          <Button variant="outline" className="w-full">View all posts</Button>
        </div>
      </Section>

      {/* 8. Final CTA (Deep Blue) */}
      <section className="py-24 bg-[#0B3C5D] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to prioritize your health?</h2>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto mb-10 font-light">
            Don't wait. Schedule a consultation with our experts today and experience world-class healthcare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white h-14 px-10 text-lg shadow-xl shadow-black/20 border-none">
              Book Consultation <Calendar className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 h-14 px-10 text-lg">
              Contact Support <Phone className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}

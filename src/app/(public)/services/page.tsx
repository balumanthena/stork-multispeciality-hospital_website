'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HeartPulse, 
  Stethoscope, 
  Activity, 
  Siren, 
  ShieldCheck, 
  Award, 
  Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEPARTMENTS_LIST } from '@/lib/data/departments';
import { ServiceItem } from '@/components/services/ServiceItem';
import { Container } from '@/components/layout/container';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-primary/10 selection:text-primary pt-8">
      {/* 1. HERO SECTION (Authority-Focused, Matching Treatments/Procedures) */}
      <section className="bg-[#ff8202]/5 border-b border-[#ff8202]/10 pt-12 md:pt-16 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233e7dca' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
          />

          <Container className="px-6 relative z-10 w-full">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                  {/* Left Side */}
                  <div className="max-w-2xl text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ff8202]/20 text-[#ff8202] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                          <Activity className="w-3 h-3" />
                          <span>Comprehensive Care</span>
                      </div>

                      <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-6 leading-tight tracking-tight">
                          Our <span className="text-[#ff8202]">Clinical</span> & <span className="text-[#ff8202]">Specialized</span> Departments
                      </h1>

                      <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                          Experience world-class healthcare across our specialized medical departments, powered by advanced technology and expert doctors.
                      </p>
                  </div>

                  {/* Right Side */}
                  <div className="hidden md:block opacity-80">
                      <div className="relative w-64 h-64">
                          <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                          <Activity className="absolute inset-0 m-auto w-32 h-32 text-[#ff8202] opacity-20" />
                          <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff8202] rounded-full blur-2xl opacity-40"></div>
                      </div>
                  </div>
              </div>
          </Container>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="pt-24 md:pt-32 pb-32">
        <Container className="px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8"
          >
            {DEPARTMENTS_LIST.map((dept) => (
              <ServiceItem
                key={dept.slug}
                name={dept.title}
                slug={dept.slug}
                iconPath={dept.iconUrl}
                isEmergency={dept.slug === 'emergency'}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* 3. CTA SECTION */}
      <section className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -z-0 skew-x-12 translate-x-32" />
        <Container className="px-6 relative z-10">
          <div className="bg-white/5 border border-white/5 backdrop-blur-xl rounded-[40px] p-12 md:p-20 flex flex-col items-center text-center gap-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl">
              Ready to <span className="text-[#ff8202]">Prioritize</span> Your Health?
            </h2>
            <p className="text-lg text-slate-400 font-medium max-w-2xl leading-relaxed">
              Connect with our specialists for a comprehensive health assessment and personalized treatment plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="h-16 px-12 bg-[#ff8202] text-white font-bold rounded-2xl shadow-2xl shadow-[#ff8202]/20 hover:scale-105 transition-all text-base uppercase tracking-widest w-full sm:w-auto">
                <Link href="/appointments">
                  Book Appointment
                </Link>
              </Button>
              <Button asChild className="h-16 px-12 bg-transparent border-2 border-white/20 text-white hover:bg-white/10 rounded-2xl font-bold text-base uppercase tracking-widest w-full sm:w-auto transition-all">
                <Link href="/contact">
                  Contact Hospital
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6">
               {[
                 { icon: Award, label: "NABH Accredited" },
                 { icon: Users, label: "40+ Specialists" },
                 { icon: Siren, label: "24/7 Emergency" },
                 { icon: ShieldCheck, label: "Premium Care" }
               ].map((item, idx) => (
                 <div key={idx} className="flex flex-col items-center gap-2">
                    <item.icon className="w-6 h-6 text-[#ff8202]/60" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </Container>
      </section>

      {/* DIVIDER WAVE */}
      <div className="h-24 w-full bg-slate-900 overflow-hidden">
        <svg className="w-full h-full fill-white" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </div>
  );
}

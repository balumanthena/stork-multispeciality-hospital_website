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
import { getDepartmentIcon } from '@/lib/data/department-icons';
import { ServiceItem } from '@/components/services/ServiceItem';

const DEPARTMENTS_DATA = [
  { name: "Cosmetic & Plastic Surgery", slug: "cosmetic-surgery" },
  { name: "Emergency, Trauma & Critical Care", slug: "emergency", isEmergency: true },
  { name: "ENT", slug: "ent" },
  { name: "General Surgery", slug: "general-surgery" },
  { name: "General Medicine", slug: "general-medicine" },
  { name: "GI & Bariatric Surgery", slug: "bariatric" },
  { name: "Gynaecology & Obstetrics", slug: "gynaecology" },
  { name: "Neurosurgery", slug: "neurosurgery" },
  { name: "Oncology", slug: "oncology" },
  { name: "Orthopaedics", slug: "orthopaedics" },
  { name: "Pain Management", slug: "pain-management" },
  { name: "Proctology", slug: "proctology" },
  { name: "Pulmonology", slug: "pulmonology" },
  { name: "Urology", slug: "urology" },
  { name: "Vascular Surgery", slug: "vascular" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const floatingIconVariants = {
  floating: {
    y: [0, -10, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-primary/10 selection:text-primary pt-8">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 overflow-hidden">
        {/* Medical Cross Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] -z-10" 
          style={{ 
            backgroundImage: `radial-gradient(#ff7a00 0.5px, transparent 0.5px)`, 
            backgroundSize: '30px 30px' 
          }} 
        />
        
        {/* Subtle Gradient Backdrops */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <motion.div variants={floatingIconVariants} animate="floating" className="absolute top-20 right-[15%] text-slate-100 hidden md:block">
            <HeartPulse size={120} />
          </motion.div>
          <motion.div variants={floatingIconVariants} animate="floating" className="absolute bottom-10 left-[10%] text-slate-100 hidden md:block" style={{ animationDelay: '1s' }}>
            <Stethoscope size={100} />
          </motion.div>
          <motion.div variants={floatingIconVariants} animate="floating" className="absolute top-1/2 left-[5%] text-slate-50 opacity-50 hidden lg:block" style={{ animationDelay: '2s' }}>
            <Activity size={80} />
          </motion.div>
        </div>

        <div className="container max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
                Comprehensive Care
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Our <span className="text-primary italic">Specialties</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Experience world-class healthcare across our specialized medical departments, powered by advanced technology and expert doctors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="pb-32">
        <div className="container max-w-7xl mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-16 gap-x-12"
          >
            {DEPARTMENTS_DATA.map((dept) => (
              <ServiceItem
                key={dept.slug}
                name={dept.name}
                slug={dept.slug}
                iconPath={getDepartmentIcon(dept.slug) || "/images/general-medicine.png"}
                isEmergency={dept.isEmergency}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -z-0 skew-x-12 translate-x-32" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-white/5 border border-white/5 backdrop-blur-xl rounded-[40px] p-12 md:p-20 flex flex-col items-center text-center gap-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl">
              Ready to <span className="text-primary">Prioritize</span> Your Health?
            </h2>
            <p className="text-lg text-slate-400 font-medium max-w-2xl leading-relaxed">
              Connect with our specialists for a comprehensive health assessment and personalized treatment plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/appointments">
                <Button className="h-16 px-12 bg-primary text-white font-bold rounded-2xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all text-base uppercase tracking-widest w-full sm:w-auto">
                  Book Appointment
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="h-16 px-12 bg-transparent border-2 border-white/20 text-white hover:bg-white/10 rounded-2xl font-bold text-base uppercase tracking-widest w-full sm:w-auto transition-all">
                  Contact Hospital
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6">
               {[
                 { icon: Award, label: "NABH Accredited" },
                 { icon: Users, label: "40+ Specialists" },
                 { icon: Siren, label: "24/7 Emergency" },
                 { icon: ShieldCheck, label: "Premium Care" }
               ].map((item, idx) => (
                 <div key={idx} className="flex flex-col items-center gap-2">
                    <item.icon className="w-6 h-6 text-primary/60" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
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

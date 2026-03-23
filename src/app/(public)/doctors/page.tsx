'use client';

import React, { useState, useMemo } from 'react';
import { Metadata } from 'next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  Stethoscope,
  ChevronRight,
  HeartPulse,
  ShieldCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { doctors, Doctor } from '@/lib/data/doctors';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { DoctorFilters } from '@/components/doctors/DoctorFilters';
import { DoctorProfileDialog } from '@/components/doctors/DoctorProfileDialog';

export default function DoctorsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [specialization, setSpecialization] = useState('all');
  const [experience, setExperience] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const specializations = useMemo(() => {
    return Array.from(new Set(doctors.map(d => d.specialization)));
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpec = specialization === 'all' || doc.specialization === specialization;
      
      let matchesExp = true;
      if (experience !== 'all') {
        const expNum = parseInt(doc.experience);
        matchesExp = expNum >= parseInt(experience);
      }

      return matchesSearch && matchesSpec && matchesExp;
    });
  }, [searchQuery, specialization, experience]);

  const handleViewProfile = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDialogOpen(true);
  };

  const handleBookAppointment = (doctor: Doctor) => {
    const params = new URLSearchParams();
    params.set('doctor', doctor.name);
    params.set('department', doctor.specialization);
    router.push(`/appointments?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-primary/10">
      {/* 1. HERO SECTION */}
      <section className="relative bg-white pt-16 md:pt-24 pb-32 border-b border-slate-100 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="container max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
              <Stethoscope className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
                Our Specialists
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
               Expert Doctors <br />
               <span className="text-primary">Dedicated to Your Care</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
              Find and book appointments with Hyderabad's most experienced specialists across multi-disciplinary healthcare sectors.
            </p>

            <div className="flex items-center gap-6 pt-4">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Patient" className="object-cover" />
                   </div>
                 ))}
               </div>
               <div className="space-y-0.5">
                  <p className="text-sm font-bold text-slate-900">10,000+ Happy Patients</p>
                  <div className="flex text-amber-500">
                    {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTERS SECTION */}
      <Section className="py-0 relative z-20">
        <div className="container max-w-7xl mx-auto px-6">
          <DoctorFilters 
            onSearchChange={setSearchQuery}
            onSpecializationChange={setSpecialization}
            onExperienceChange={setExperience}
            specializations={specializations}
          />
        </div>
      </Section>

      {/* 3. DOCTOR LIST GRID */}
      <Section className="pt-20 pb-28">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
             <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Available Specialists</h2>
                <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">
                  Showing {filteredDoctors.length} matched experts
                </p>
             </div>
             
             <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100/50 text-xs font-black uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Book Appointment Easily
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doctor, idx) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <DoctorCard 
                    doctor={doctor}
                    onViewProfile={handleViewProfile}
                    onBookAppointment={handleBookAppointment}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredDoctors.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 card bg-white border-dashed border-2 border-slate-200"
            >
               <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-6">
                  <Search size={40} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
               <p className="text-slate-500 font-medium">Try adjusting your filters or search keywords.</p>
               <Button 
                variant="link" 
                className="mt-4 text-primary font-bold"
                onClick={() => {
                   setSearchQuery('');
                   setSpecialization('all');
                   setExperience('all');
                }}
               >
                 Clear all filters
               </Button>
            </motion.div>
          )}
        </div>
      </Section>

      {/* 4. TRUST SECTION / CALL TO ACTION */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -z-0 skew-x-12 translate-x-32" />
         <div className="container max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-2xl text-center md:text-left">
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight underline decoration-primary decoration-4 underline-offset-8">
                 Need emergency medical assistance?
               </h2>
               <p className="text-lg text-slate-400 font-medium leading-relaxed">
                 Our critical care specialists and emergency units are available 24/7 in Kompally. Your health is our priority.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                  <Button className="h-14 px-10 bg-primary text-white font-bold rounded-full shadow-2xl shadow-primary/20 hover:scale-105 transition-all text-base">
                    Call 24x7 Emergency
                  </Button>
                  <Button variant="outline" className="h-14 px-10 border-slate-700 text-white hover:bg-slate-800 rounded-full font-bold text-base">
                    Get Directions
                  </Button>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {[
                 { icon: HeartPulse, label: "Cardiac Care" },
                 { icon: Award, label: "Top Rated" },
                 { icon: ShieldCheck, label: "Secured Data" },
                 { icon: Users, label: "Expert Teams" }
               ].map((item, idx) => (
                 <div key={idx} className="p-6 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center gap-3 backdrop-blur-sm">
                    <item.icon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-bold text-slate-200">{item.label}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* PROFILE DIALOG */}
      <DoctorProfileDialog 
        doctor={selectedDoctor}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}

function StarIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

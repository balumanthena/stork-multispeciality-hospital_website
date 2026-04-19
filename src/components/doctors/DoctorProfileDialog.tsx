'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Calendar, 
  CheckCircle2, 
  Award, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Activity
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Doctor } from '@/lib/data/doctors';

interface DoctorProfileDialogProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DoctorProfileDialog({ doctor, isOpen, onClose }: DoctorProfileDialogProps) {
  const router = useRouter();
  if (!doctor) return null;

  const handleBookAppointment = () => {
    const params = new URLSearchParams();
    params.set('doctor', doctor.name);
    params.set('department', doctor.specialization);
    router.push(`/appointments?${params.toString()}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-[24px] bg-[#F8FAFC] flex flex-col h-[90vh] md:h-auto max-h-[90vh]">
        <DialogHeader className="sr-only">
          <DialogTitle>{doctor.name}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* A. HEADER */}
          <div className="relative bg-white p-8 md:p-16 border-b border-slate-100 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -z-10 skew-x-12 translate-x-20" />
            
            <div className="max-w-3xl space-y-8 relative z-10">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                    {doctor.specialization}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                    {doctor.name}
                  </h2>
                  <p className="text-xl font-bold text-slate-400 uppercase tracking-widest">
                    {doctor.qualification}
                  </p>
                </div>
              </div>

              <div className="py-6 border-y border-slate-50">
                 <div className="space-y-1">
                    <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">Experience</p>
                    <p className="text-lg font-bold text-slate-700">{doctor.experience}</p>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={handleBookAppointment}
                    className="bg-primary hover:bg-primary/90 text-white font-black h-14 px-10 rounded-2xl shadow-xl shadow-primary/20 text-sm uppercase tracking-widest transition-all active:scale-95"
                  >
                     Book Appointment Now
                  </Button>
                </div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12 pb-32 md:pb-12">
            {/* B. QUICK HIGHLIGHTS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {doctor.highlights.map((highlight, idx) => (
                 <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                       {idx === 0 ? <Zap className="w-5 h-5" /> : idx === 1 ? <ShieldCheck className="w-5 h-5" /> : idx === 2 ? <Star className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 leading-tight">
                       {highlight}
                    </span>
                 </div>
               ))}
            </div>

            {/* C. ABOUT DOCTOR */}
            <section className="space-y-4">
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Professional Summary</h3>
               <p className="text-lg text-slate-600 leading-relaxed font-medium">
                 {doctor.about}
               </p>
            </section>

            {/* D. EXPERTISE */}
            <section className="space-y-6">
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Clinical Expertise</h3>
               <div className="flex flex-wrap gap-3">
                 {doctor.expertise.map(exp => (
                   <Badge key={exp} variant="secondary" className="bg-white text-slate-900 border-slate-200/60 font-bold py-2 px-4 shadow-sm">
                      {exp}
                   </Badge>
                 ))}
               </div>
            </section>

            {/* E. SERVICES / TREATMENTS */}
            <section className="space-y-6">
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Services & Treatments</h3>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {doctor.services.map((cat, idx) => (
                   <div key={idx} className="space-y-4">
                      <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {cat.category}
                      </h4>
                      <ul className="space-y-3">
                        {cat.items.map(item => (
                          <li key={item} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-primary opacity-40 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                   </div>
                 ))}
               </div>
            </section>

            <div className="grid grid-cols-1 gap-12 pt-6">
               {/* F. ACHIEVEMENTS */}
               <section className="space-y-6">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Key Achievements</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {doctor.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm font-bold text-slate-900">{ach}</span>
                      </div>
                    ))}
                  </div>
               </section>
            </div>
          </div>
        </div>

        {/* H. STICKY CTA BAR (Mobile focus) */}
        <div className="border-t border-slate-200 bg-white p-6 md:hidden">
          <div className="flex gap-3">
             <Button 
               onClick={handleBookAppointment}
               className="flex-1 bg-primary text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20"
             >
                Book Appointment
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

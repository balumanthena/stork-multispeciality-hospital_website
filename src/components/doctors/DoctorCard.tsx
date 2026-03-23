'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Award, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Doctor } from '@/lib/data/doctors';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onViewProfile, onBookAppointment }: DoctorCardProps) {
  return (
    <Card className="group overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-[24px] flex flex-col h-full">
      <CardContent className="p-0 flex-1 flex flex-col">
        {/* Top Accent Area */}
        <div className="h-2 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
        
        <div className="p-8 space-y-6 flex-1 flex flex-col">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <Badge className="bg-primary/5 text-primary border-none text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1">
                {doctor.specialization}
              </Badge>
              <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-[10px] font-bold">{doctor.rating}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">
                {doctor.name}
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">
                {doctor.qualification}
              </p>
            </div>
          </div>

          <div className="py-4 border-y border-slate-50">
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-wider">Experience</p>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                   <Award className="w-4 h-4 text-primary/60" />
                   {doctor.experience.split(' ')[0]} Years
                </div>
             </div>
          </div>

          <div className="space-y-4 flex-1">
             <div className="flex flex-wrap gap-2">
               {doctor.tags.slice(0, 3).map(tag => (
                 <span key={tag} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                   {tag}
                 </span>
               ))}
             </div>
             <p className="text-sm font-medium text-slate-600 leading-relaxed italic border-l-2 border-primary/20 pl-4 py-1">
               "{doctor.positioning}"
             </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-8 pt-0 flex flex-col gap-3">
        <Button 
          onClick={() => onBookAppointment(doctor)}
          className="w-full bg-primary hover:bg-primary/90 text-white font-black h-12 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 text-xs uppercase tracking-widest"
        >
          Book Appointment
        </Button>
        <Button 
          variant="ghost"
          onClick={() => onViewProfile(doctor)}
          className="w-full text-slate-400 hover:text-primary hover:bg-primary/5 font-bold h-10 rounded-xl transition-all group/btn text-xs uppercase tracking-widest"
        >
          Full Profile
          <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}

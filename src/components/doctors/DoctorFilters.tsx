'use client';

import React from 'react';
import { Search, SlidersHorizontal, Calendar, Clock, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DoctorFiltersProps {
  onSearchChange: (val: string) => void;
  onSpecializationChange: (val: string) => void;
  onExperienceChange: (val: string) => void;
  specializations: string[];
}

export function DoctorFilters({ 
  onSearchChange, 
  onSpecializationChange, 
  onExperienceChange,
  specializations 
}: DoctorFiltersProps) {
  return (
    <div className="card p-6 md:p-8 bg-white border-slate-200 shadow-xl shadow-slate-200/50 rounded-[20px] -mt-12 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Search */}
        <div className="lg:col-span-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search doctor by name..." 
            className="pl-11 h-12 bg-slate-50 border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 placeholder:font-medium"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Specialization */}
        <div className="relative">
          <Select onValueChange={onSpecializationChange}>
            <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <SelectValue placeholder="Specialization" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
              <SelectItem value="all" className="font-medium">All Specializations</SelectItem>
              {specializations.map(spec => (
                <SelectItem key={spec} value={spec} className="font-medium">{spec}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Experience */}
        <div className="relative">
          <Select onValueChange={onExperienceChange}>
            <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <SelectValue placeholder="Experience" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
              <SelectItem value="all" className="font-medium">Any Experience</SelectItem>
              <SelectItem value="5" className="font-medium">5+ Years</SelectItem>
              <SelectItem value="10" className="font-medium">10+ Years</SelectItem>
              <SelectItem value="15" className="font-medium">15+ Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Availability / Advanced */}
        <div className="relative flex gap-2">
          <Button variant="outline" className="flex-1 h-12 bg-slate-50 border-slate-100 rounded-xl hover:bg-white hover:border-primary/20 text-slate-600 font-medium transition-all group">
            <Calendar className="w-4 h-4 mr-2 text-slate-400 group-hover:text-primary transition-colors" />
            Availability
          </Button>
          <Button className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20">
            Find
          </Button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 items-center">
         <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 mr-2">Quick Filters:</span>
         {["Available Today", "Laparoscopy", "Joint Replacement", "Diabetes"].map(qf => (
           <button key={qf} className="text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 hover:border-primary/30 hover:text-primary hover:bg-white transition-all">
             {qf}
           </button>
         ))}
      </div>
    </div>
  );
}

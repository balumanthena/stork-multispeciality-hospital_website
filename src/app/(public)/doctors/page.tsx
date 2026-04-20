'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronRight,
  Stethoscope,
  X,
  Stethoscope as StethoscopeIcon,
  Filter
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { doctors, Doctor } from '@/lib/data/doctors';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { FiltersSidebar } from '@/components/doctors/FiltersSidebar';
import { DoctorProfileDialog } from '@/components/doctors/DoctorProfileDialog';
import { DoctorSkeleton } from '@/components/doctors/DoctorSkeleton';

export default function DoctorsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);

  // Simulation of loading state for premium feel
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const departments = useMemo(() => {
    return Array.from(new Set(doctors.map(d => d.department))).sort();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept = selectedDepts.length === 0 || selectedDepts.includes(doc.department);

      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDepts]);

  const handleDeptToggle = (dept: string) => {
    setSelectedDepts(prev => prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]);
  };

  const handleViewProfile = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDialogOpen(true);
  };

  const handleBookAppointment = (doctor: Doctor) => {
    const params = new URLSearchParams();
    params.set('doctor', doctor.name);
    params.set('department', doctor.department);
    router.push(`/appointments?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#ff8202]/10">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-slate-100 pt-32 pb-12">
        <div className="container max-w-7xl mx-auto px-6">
          <nav className="flex items-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-[#ff8202] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 mx-3 text-slate-300" />
            <span className="text-slate-900">Our Doctors</span>
          </nav>

          <div className="max-w-4xl space-y-4">
             <div className="inline-flex items-center gap-2 bg-[#ff8202]/5 px-3 py-1.5 rounded-full border border-[#ff8202]/10">
              <StethoscopeIcon className="w-3.5 h-3.5 text-[#ff8202]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff8202]">
                Expert Healthcare Team
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
               Consult with Our <br />
               <span className="text-[#ff8202]">Specialized Doctors</span>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. RESULTS AREA */}
      <Section className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar */}
            <FiltersSidebar 
              departments={departments}
              selectedDepartments={selectedDepts}
              onDepartmentChange={handleDeptToggle}
            />

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-slate-900">Featured Specialists</h2>
                  <p className="text-sm font-medium text-slate-400">
                    Showing {filteredDoctors.length} doctors matching your criteria
                  </p>
                </div>
                
                {/* Search doctors top right */}
                <div className="relative w-full md:w-80 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#ff8202] transition-colors" />
                  <input 
                    type="text"
                    placeholder="Search doctors..."
                    className="w-full pl-11 pr-4 h-12 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-[#ff8202]/5 focus:border-[#ff8202] transition-all text-sm font-medium outline-none shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Doctors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <DoctorSkeleton key={i} />
                    ))
                  ) : filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor, idx) => (
                      <motion.div
                        key={doctor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        layout
                      >
                        <DoctorCard 
                          doctor={doctor}
                          onViewProfile={handleViewProfile}
                          onBookAppointment={handleBookAppointment}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full py-24 text-center bg-white rounded-3xl border border-slate-100 shadow-sm"
                    >
                       <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 mx-auto mb-6">
                          <Search size={40} />
                       </div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
                       <p className="text-slate-400 text-sm max-w-xs mx-auto mb-8 font-medium">Try adjusting your filters or search terms.</p>
                       <Button 
                        variant="link" 
                        className="text-[#ff8202] font-bold hover:text-[#e67502] transition-colors"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedDepts([]);
                        }}
                       >
                         Clear all filters
                       </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA SECTION */}
      <section className="bg-[#ff8202] py-24 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
         <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Looking for a Specific Specialist?
            </h2>
            <p className="text-lg text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
              Our 24/7 support team can help you find the right doctor for your specific health needs.
            </p>
            <div className="flex justify-center pt-4">
               <Link href="/contact">
                  <Button className="h-14 px-12 bg-white text-[#ff8202] hover:bg-white/90 font-bold rounded-xl shadow-2xl transition-all active:scale-[0.98]">
                    Contact Us Today
                  </Button>
               </Link>
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



"use client"

import React from 'react'
import Image from 'next/image'
import { MessageCircle, MapPin, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Doctor } from '@/lib/data/doctors'
import { motion } from 'framer-motion'

interface DoctorCardHorizontalProps {
  doctor: Doctor
  onViewProfile: (doctor: Doctor) => void
  onBookAppointment: (doctor: Doctor) => void
}

export function DoctorCardHorizontal({
  doctor,
  onViewProfile,
  onBookAppointment
}: DoctorCardHorizontalProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm hover:shadow-xl hover:border-primary/10 transition-all duration-500 group"
    >
      {/* Photo Container */}
      <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg shadow-slate-200 group-hover:border-primary/20 transition-all duration-500">
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            sizes="(max-width: 768px) 160px, 192px"
            className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        {/* Rating Badge */}
        <div className="absolute -bottom-2 right-4 bg-white border border-slate-100 px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-10">
          <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
          <span className="text-xs font-black text-slate-700">{doctor.rating}</span>
        </div>
      </div>

      {/* Info Content */}
      <div className="flex-1 flex flex-col justify-between h-full space-y-6 text-center md:text-left">
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">
              {doctor.name}
            </h3>
            <p className="text-sm md:text-base font-bold text-slate-400 leading-relaxed max-w-md">
              {doctor.title}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {/* Languages */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary/60">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-600">
                {doctor.languages.join(', ')}
              </span>
            </div>

            {/* Locations */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary/60">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-600">
                {doctor.locations.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button
            variant="outline"
            onClick={() => onBookAppointment(doctor)}
            className="h-12 flex-1 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all text-sm uppercase tracking-widest"
          >
            Book Appointment
          </Button>
          <Button
            onClick={() => onBookAppointment(doctor)}
            className="h-12 flex-1 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all text-sm uppercase tracking-widest"
          >
            Hospital Visit
          </Button>
        </div>
      </div>

      {/* Arrow indicator (desktop) */}
      <div className="hidden lg:flex flex-shrink-0 self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}

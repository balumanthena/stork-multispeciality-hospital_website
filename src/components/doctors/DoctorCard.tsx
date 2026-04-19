"use client"

import React from 'react'
import Image from 'next/image'
import { MapPin, MessageCircle, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Doctor } from '@/lib/data/doctors'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DoctorCardProps {
  doctor: Doctor
  onViewProfile: (doctor: Doctor) => void
  onBookAppointment: (doctor: Doctor) => void
}

export function DoctorCard({ 
  doctor, 
  onViewProfile, 
  onBookAppointment 
}: DoctorCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#6C3EFF]/5 transition-all duration-300 group"
    >
      <div className="flex gap-6">
        {/* LEFT: Image */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <div className="absolute inset-0 bg-[#6C3EFF]/5 rounded-xl -z-10 translate-x-2 translate-y-2 group-hover:bg-[#6C3EFF]/10 transition-colors" />
          <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-white shadow-md">
            <Image 
              src={doctor.image} 
              alt={doctor.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          {/* Rating badge */}
          <div className="absolute -bottom-2 -right-2 bg-white px-2 py-0.5 rounded-full shadow-sm border border-slate-50 flex items-center gap-1">
             <Star className="w-2.5 h-2.5 text-orange-400 fill-orange-400" />
             <span className="text-[10px] font-bold text-slate-700">{doctor.rating}</span>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="flex-1 space-y-3">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-[#6C3EFF] transition-colors">
              {doctor.name}
            </h3>
            <p className="text-sm font-semibold text-slate-500">
              {doctor.title || doctor.specialization}
            </p>
          </div>

        </div>
      </div>

      {/* BOTTOM: Buttons */}
      <div className="flex gap-3 pt-6 mt-auto">
        <Button 
          variant="outline"
          onClick={() => onBookAppointment(doctor)}
          className="flex-1 h-11 rounded-xl border-[#6C3EFF]/20 text-[#6C3EFF] hover:bg-[#6C3EFF]/5 hover:border-[#6C3EFF]/40 font-bold transition-all text-xs"
        >
          Online Consult
        </Button>
        <Button 
          onClick={() => onBookAppointment(doctor)}
          className="flex-1 h-11 rounded-xl bg-[#6C3EFF] hover:bg-[#5831D6] text-white font-bold shadow-lg shadow-[#6C3EFF]/20 transition-all text-xs"
        >
          Hospital Visit
        </Button>
      </div>
    </motion.div>
  )
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceItemProps {
  name: string;
  slug: string;
  iconPath: string;
  isEmergency?: boolean;
}

export function ServiceItem({ name, slug, iconPath, isEmergency }: ServiceItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className="flex flex-col w-full h-full"
    >
      <Link 
        href={`/services/${slug}`}
        className="group flex flex-col items-center justify-center text-center p-6 md:p-8 bg-white border border-slate-200 rounded-2xl hover:border-[#ff8202] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 h-full min-h-[180px]"
      >
        <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 mb-4 transform group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-300">
          <Image
            src={iconPath}
            alt={name}
            fill
            className="object-contain"
          />
        </div>
        
        <h3 className="text-[15px] md:text-[16px] font-bold text-slate-800 leading-tight group-hover:text-[#ff8202] transition-colors duration-300">
          {name}
        </h3>
      </Link>
    </motion.div>
  );
}

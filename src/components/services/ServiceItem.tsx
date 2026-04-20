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
      className="flex flex-col items-center"
    >
      <Link 
        href={`/services/${slug}`}
        className="group flex flex-col items-center text-center focus:outline-none"
      >
        <div className={`relative flex items-center justify-center transition-all duration-300 ease-in-out
          w-[100px] h-[100px] bg-slate-50 group-hover:bg-[#ff8202] group-hover:shadow-2xl group-hover:shadow-orange-500/30
          rounded-full overflow-hidden mb-6 transform group-hover:scale-110 group-hover:-translate-y-2`}
        >
          <div className="relative w-12 h-12 transition-all duration-300">
            <Image
              src={iconPath}
              alt={name}
              fill
              className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-[17px] font-bold tracking-tight transition-colors duration-300 text-slate-900 group-hover:text-[#ff8202]">
            {name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

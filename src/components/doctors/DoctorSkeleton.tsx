import React from 'react'
import { Card } from '@/components/ui/card'

export function DoctorSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-slate-100 shadow-sm">
      <div className="flex gap-6">
        <div className="w-24 h-24 bg-slate-100 rounded-xl animate-pulse" />
        <div className="flex-1 space-y-3 pt-2">
          <div className="h-5 bg-slate-100 rounded-md w-3/4 animate-pulse" />
          <div className="h-4 bg-slate-100 rounded-md w-1/2 animate-pulse" />
          <div className="space-y-2 pt-4">
            <div className="h-3 bg-slate-50 rounded-md w-full animate-pulse" />
            <div className="h-3 bg-slate-50 rounded-md w-2/3 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="flex gap-3 pt-6 mt-auto">
        <div className="flex-1 h-11 bg-slate-50 rounded-xl animate-pulse" />
        <div className="flex-1 h-11 bg-slate-50 rounded-xl animate-pulse" />
      </div>
    </div>
  )
}

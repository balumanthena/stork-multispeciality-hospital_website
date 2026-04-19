"use client"

import React, { useState } from 'react'
import { Search, ChevronDown, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'

interface SidebarFilters {
  search: string
  departments: string[]
  regions: string[]
}

interface DoctorSidebarProps {
  departments: string[]
  regions: string[]
  filters: SidebarFilters
  onFilterChange: (filters: SidebarFilters) => void
}

export function DoctorSidebar({ 
  departments, 
  regions, 
  filters, 
  onFilterChange 
}: DoctorSidebarProps) {
  const [regionSearch, setRegionSearch] = useState('')

  const handleDepartmentToggle = (dept: string) => {
    const newDepts = filters.departments.includes(dept)
      ? filters.departments.filter(d => d !== dept)
      : [...filters.departments, dept]
    onFilterChange({ ...filters, departments: newDepts })
  }

  const handleRegionToggle = (region: string) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region]
    onFilterChange({ ...filters, regions: newRegions })
  }

  const filteredRegions = regions.filter(r => 
    r.toLowerCase().includes(regionSearch.toLowerCase())
  )

  const clearFilters = () => {
    onFilterChange({
      search: '',
      departments: [],
      regions: []
    })
  }

  const hasActiveFilters = filters.departments.length > 0 || filters.regions.length > 0 || filters.search !== ''

  return (
    <aside className="w-full lg:w-80 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-slate-900">Filters</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-xs font-bold text-primary hover:text-primary/80 h-auto p-0"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Centre of Excellence Accordion */}
        <Accordion type="single" collapsible defaultValue="departments" className="border-none space-y-4">
          <AccordionItem value="departments" className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50 transition-colors">
              <span className="text-[13px] font-black uppercase tracking-wider text-slate-900 text-left">Centre of Excellence</span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5 pt-2">
              <div className="space-y-3 pt-2">
                {departments.map(dept => (
                  <div key={dept} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleDepartmentToggle(dept)}>
                    <Checkbox 
                      id={`dept-${dept}`} 
                      checked={filters.departments.includes(dept)}
                      onCheckedChange={() => handleDepartmentToggle(dept)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Label 
                      htmlFor={`dept-${dept}`}
                      className="text-sm font-semibold text-slate-600 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {dept}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Region Accordion */}
          <AccordionItem value="regions" className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50 transition-colors">
              <span className="text-[13px] font-black uppercase tracking-wider text-slate-900 text-left">Region</span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5 pt-2">
              <div className="space-y-4 pt-2">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search for Region" 
                    value={regionSearch}
                    onChange={(e) => setRegionSearch(e.target.value)}
                    className="pl-9 h-10 text-xs bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all"
                  />
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {filteredRegions.map(region => (
                    <div key={region} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleRegionToggle(region)}>
                      <Checkbox 
                        id={`region-${region}`} 
                        checked={filters.regions.includes(region)}
                        onCheckedChange={() => handleRegionToggle(region)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Label 
                        htmlFor={`region-${region}`}
                        className="text-sm font-semibold text-slate-600 group-hover:text-primary transition-colors cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {region}
                      </Label>
                    </div>
                  ))}
                  {filteredRegions.length === 0 && (
                    <p className="text-[11px] text-slate-400 text-center py-2">No regions found</p>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* Help Banner */}
      <div className="p-6 bg-primary rounded-3xl text-white space-y-4 shadow-xl shadow-primary/20 mt-8">
        <h4 className="text-sm font-black uppercase tracking-widest">Enquire Now</h4>
        <p className="text-xs font-medium text-white/80 leading-relaxed">
          Need help finding the right specialist for your needs?
        </p>
        <Button className="w-full bg-white text-primary hover:bg-white/90 font-black rounded-xl text-xs uppercase tracking-widest h-10 shadow-lg">
          Talk to Expert
        </Button>
      </div>
    </aside>
  )
}

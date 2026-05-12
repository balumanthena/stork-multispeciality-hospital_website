"use client"

import React, { useState } from 'react'
import { Search, MapPin, ChevronDown } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion'

interface FiltersSidebarProps {
  departments: string[]
  selectedDepartments: string[]
  onDepartmentChange: (dept: string) => void
}

export function FiltersSidebar({
  departments,
  selectedDepartments,
  onDepartmentChange,
}: FiltersSidebarProps) {
  const [deptSearch, setDeptSearch] = useState('')

  const filteredDepts = departments.filter(d => 
    d.toLowerCase().includes(deptSearch.toLowerCase())
  )

  return (
    <aside className="w-full lg:w-[280px] bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-8 lg:sticky lg:top-32 h-fit">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Filters</h3>
        
        <Accordion type="multiple" defaultValue={['coe']} className="w-full space-y-4">
          {/* Centre of Excellence */}
          <AccordionItem value="coe" className="border-none">
            <AccordionTrigger className="hover:no-underline py-2">
              <span className="text-sm font-semibold text-slate-900">Centre of Excellence</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#ff8202] transition-colors" />
                <Input 
                  placeholder="Search specialty" 
                  value={deptSearch}
                  onChange={(e) => setDeptSearch(e.target.value)}
                  className="pl-9 h-10 border-slate-100 bg-slate-50 focus:bg-white rounded-lg text-sm transition-all"
                />
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {filteredDepts.map(dept => (
                  <div key={dept} className="flex items-center space-x-3 group cursor-pointer" onClick={() => onDepartmentChange(dept)}>
                    <Checkbox 
                      id={`dept-${dept}`} 
                      checked={selectedDepartments.includes(dept)}
                      onCheckedChange={() => onDepartmentChange(dept)}
                      className="data-[state=checked]:bg-[#ff8202] data-[state=checked]:border-[#ff8202]"
                    />
                    <Label 
                      htmlFor={`dept-${dept}`}
                      className="text-sm text-slate-600 group-hover:text-[#ff8202] transition-colors cursor-pointer"
                    >
                      {dept}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Reset Button */}
      {selectedDepartments.length > 0 && (
        <button 
          onClick={() => {
            selectedDepartments.forEach(d => onDepartmentChange(d))
          }}
          className="w-full py-2 text-xs font-semibold text-[#ff8202] hover:text-[#e67502] text-center transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </aside>
  )
}

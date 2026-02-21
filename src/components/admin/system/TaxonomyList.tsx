"use client"

import { useState } from "react"
import { Building2, Stethoscope, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TaxonomyItem {
    id: string
    name: string
    [key: string]: any
}

interface TaxonomyListProps {
    title: string
    items: TaxonomyItem[] | null
    type: 'department' | 'treatment'
    displayKey?: string
    iconColor: string
    hoverIconColor: string
    hoverBgColor: string
}

export function TaxonomyList({
    title,
    items,
    type,
    displayKey = 'name',
    iconColor,
    hoverIconColor,
    hoverBgColor
}: TaxonomyListProps) {
    const [expanded, setExpanded] = useState(false)

    // Icons must be imported and used inside the Client Component
    // to avoid serialization errors
    const Icon = type === 'department' ? Building2 : Stethoscope

    const treatments = items || []
    const visibleItems = expanded ? treatments : treatments.slice(0, 8)

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                    {title} ({treatments.length})
                </h2>
                <button className="text-xs font-bold text-blue-600 hover:underline">Manage All</button>
            </div>
            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                        {visibleItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className={`h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-slate-400 group-hover:${hoverBgColor} group-hover:${hoverIconColor} transition-colors`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{item[displayKey]}</span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                            </div>
                        ))}
                        {treatments.length === 0 && (
                            <div className="p-8 text-center text-slate-400 text-sm">No {title.toLowerCase()} found.</div>
                        )}
                    </div>
                    {treatments.length > 8 && (
                        <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="text-xs font-bold text-slate-500 hover:text-slate-700"
                            >
                                {expanded ? "Show less" : `Show ${treatments.length - 8} more...`}
                            </button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

"use client"

import { useEffect, useState } from "react"
import { analyzeSEO, SEOAnalysisResult } from "@/lib/seo-analyzer"
import { CheckCircle2, AlertCircle, XCircle, Activity, Hash, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface SEOAnalyzerPanelProps {
    title: string
    description: string
    content: string
    keyword: string
}

export function SEOAnalyzerPanel({ title, description, content, keyword }: SEOAnalyzerPanelProps) {
    const [result, setResult] = useState<SEOAnalysisResult | null>(null)

    useEffect(() => {
        // Debounce calculation
        const timer = setTimeout(() => {
            const analysis = analyzeSEO(title, description, content, keyword)
            setResult(analysis)
        }, 500)
        return () => clearTimeout(timer)
    }, [title, description, content, keyword])

    if (!result) return null

    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-6 mt-6">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-slate-500" />
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">SEO Score</h3>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "text-xl font-black",
                        result.status === 'Good' ? "text-green-600" : 
                        result.status === 'Average' ? "text-yellow-600" : "text-red-600"
                    )}>
                        {result.score}
                    </div>
                </div>
            </div>

            {/* Score Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                    className={cn(
                        "h-full transition-all duration-500",
                        result.status === 'Good' ? "bg-green-500" : 
                        result.status === 'Average' ? "bg-yellow-500" : "bg-red-500"
                    )}
                    style={{ width: `${result.score}%` }}
                />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                    <BookOpen className="w-4 h-4 text-slate-400 mb-1" />
                    <span className="text-lg font-black text-slate-700 leading-none">{result.wordCount}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Words</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                    <Hash className="w-4 h-4 text-slate-400 mb-1" />
                    <span className="text-lg font-black text-slate-700 leading-none">{result.keywordDensity.toFixed(1)}%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Density</span>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Checklist</h4>
                {result.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                        {suggestion.status === 'pass' && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />}
                        {suggestion.status === 'warn' && <AlertCircle className="w-3.5 h-3.5 text-yellow-500 mt-0.5 shrink-0" />}
                        {suggestion.status === 'fail' && <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />}
                        
                        <span className={cn(
                            "leading-tight font-medium",
                            suggestion.status === 'pass' ? "text-slate-500" : 
                            suggestion.status === 'warn' ? "text-slate-700" : "text-red-700 font-bold"
                        )}>
                            {suggestion.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

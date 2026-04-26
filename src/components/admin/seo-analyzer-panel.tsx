"use client"

import { useEffect, useState } from "react"
import { analyzeSEO, SEOAnalysisResult } from "@/lib/seo-analyzer"
import { CheckCircle2, AlertCircle, XCircle, Activity } from "lucide-react"
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
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 mt-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-slate-500" />
                    <h3 className="font-semibold text-slate-800">SEO Analysis (Yoast)</h3>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="text-sm font-bold text-slate-500">Score:</div>
                    <div className={cn(
                        "text-lg font-black",
                        result.status === 'Good' ? "text-green-600" : 
                        result.status === 'Average' ? "text-yellow-600" : "text-red-600"
                    )}>
                        {result.score}/100
                    </div>
                </div>
            </div>

            {/* Score Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                    className={cn(
                        "h-full transition-all duration-500",
                        result.status === 'Good' ? "bg-green-500" : 
                        result.status === 'Average' ? "bg-yellow-500" : "bg-red-500"
                    )}
                    style={{ width: `${result.score}%` }}
                />
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
                {result.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm">
                        {suggestion.status === 'pass' && <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />}
                        {suggestion.status === 'warn' && <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />}
                        {suggestion.status === 'fail' && <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />}
                        
                        <span className={cn(
                            "leading-tight",
                            suggestion.status === 'pass' ? "text-slate-600" : 
                            suggestion.status === 'warn' ? "text-slate-700" : "text-red-700 font-medium"
                        )}>
                            {suggestion.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

"use client"

import * as React from "react"
import { Search, X, ArrowRight, ChevronRight, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export interface SearchResultItem {
    title: string
    href: string
    category: string
    slug: string
}

interface SmartSearchProps {
    onSearch: (query: string) => void
    suggestions: SearchResultItem[]
    className?: string
}

export function SmartSearch({ onSearch, suggestions, className }: SmartSearchProps) {
    const [query, setQuery] = React.useState("")
    const [isOpen, setIsOpen] = React.useState(false)
    const [activeIndex, setActiveIndex] = React.useState(-1)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    // Debounce search
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query)
        }, 300)
        return () => clearTimeout(timer)
    }, [query, onSearch])

    // Click outside to close
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        setIsOpen(value.length > 0)
        setActiveIndex(-1)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return

        if (e.key === "ArrowDown") {
            e.preventDefault()
            setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setActiveIndex(prev => (prev > 0 ? prev - 1 : -1))
        } else if (e.key === "Enter") {
            e.preventDefault()
            if (activeIndex >= 0 && suggestions[activeIndex]) {
                window.location.href = suggestions[activeIndex].href
            } else {
                setIsOpen(false)
            }
        } else if (e.key === "Escape") {
            setIsOpen(false)
            inputRef.current?.blur()
        }
    }

    const clearSearch = () => {
        setQuery("")
        onSearch("")
        setIsOpen(false)
        inputRef.current?.focus()
    }

    // Limit suggestions to 6
    const displaySuggestions = suggestions.slice(0, 6)

    return (
        <div className={cn("relative w-full max-w-3xl mx-auto", className)}>
            {/* SEARCH INPUT */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-slate-400 group-focus-within:text-[#3e7dca] transition-colors" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.length > 0 && setIsOpen(true)}
                    placeholder="Search treatments, procedures, or departments..."
                    className="block w-full pl-16 pr-12 py-5 bg-white border border-slate-200 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3e7dca]/10 focus:border-[#3e7dca] shadow-lg shadow-slate-200/40 transition-all text-lg font-medium"
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-4 flex items-center"
                    >
                        <div className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                            <X className="h-5 w-5" />
                        </div>
                    </button>
                )}
            </div>

            {/* DROPDOWN SUGGESTIONS */}
            {isOpen && displaySuggestions.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200"
                >
                    <div className="py-2">
                        {displaySuggestions.map((item, index) => (
                            <Link
                                key={`${item.slug}-${index}`}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-between px-6 py-3.5 transition-colors group",
                                    index === activeIndex ? "bg-slate-50" : "hover:bg-slate-50"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-400 group-hover:bg-[#3e7dca]/10 group-hover:text-[#3e7dca] transition-colors",
                                        index === activeIndex && "bg-[#3e7dca]/10 text-[#3e7dca]"
                                    )}>
                                        <Activity className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-slate-900 font-medium group-hover:text-[#3e7dca] transition-colors">
                                            {/* Highlight Match logic could go here, for now plain text */}
                                            {item.title}
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                                            {item.category}
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#3e7dca] transition-colors" />
                            </Link>
                        ))}
                    </div>

                    {/* FOOTER */}
                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                        <span>Press <strong>Enter</strong> to select</span>
                        {suggestions.length > 6 && (
                            <span className="font-medium text-[#3e7dca]">
                                View all {suggestions.length} results
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

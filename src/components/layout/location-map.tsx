import React from "react"
import { MapPin, Phone, ArrowRight, ArrowLeft } from "lucide-react"

interface LocationMapProps {
    onBack: () => void
}

export function LocationMap({ onBack }: LocationMapProps) {
    return (
        <div className="flex flex-col animate-in slide-in-from-right-4 duration-300 fill-mode-both">
            {/* Header with Back button */}
            <div className="flex items-center gap-3 mb-6 relative">
                <button
                    onClick={onBack}
                    className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 active:bg-slate-200 hover:text-slate-900 rounded-full transition-colors z-10"
                    aria-label="Go back to menu"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2 text-slate-900">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-orange-600 animate-bounce" style={{ animationDuration: '2s' }} />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Our Location</h2>
                </div>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden mb-2">

                {/* Embedded Map Area */}
                <div className="h-[300px] w-full bg-slate-100 relative group">
                    {/* Placeholder loading animation */}
                    <div className="absolute inset-0 bg-slate-200 animate-pulse -z-10" />
                    <iframe
                        src="https://www.google.com/maps?q=17.521661,78.4840876&z=15&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Stork Hospital Location"
                        className="w-full h-full opacity-95 group-hover:opacity-100 transition-opacity duration-500 block"
                    />
                </div>

                {/* Hospital Information Area */}
                <div className="p-5 bg-white">
                    <h3 className="font-bold text-slate-900 text-lg mb-1.5 flex items-center gap-2">
                        Stork Multispeciality Hospital
                    </h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed mb-5">
                        C-35, opp. Narayana School, near DMart,<br />
                        Petbasheerabad, Kompally,<br />
                        Hyderabad, Telangana 500067
                    </p>

                    <div className="flex items-center justify-between gap-3">
                        <a
                            href="https://maps.google.com/?q=17.521661,78.4840876"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#ff8202] text-white hover:bg-[#e07200] font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-[#ff8202]/20 active:scale-[0.98] text-sm"
                        >
                            Get Directions <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="tel:+919494408050"
                            className="flex items-center justify-center aspect-square w-12 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-100 rounded-xl transition-all shadow-sm active:scale-[0.98] shrink-0"
                            aria-label="Call Hospital"
                        >
                            <Phone className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

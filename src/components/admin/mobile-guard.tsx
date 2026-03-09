"use client"

import { useEffect, useState } from "react"
import { Monitor } from "lucide-react"

export function AdminMobileGuard({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        setMounted(true)
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    // Prevent flash of wrong content during hydration
    if (!mounted) return null

    if (isMobile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
                <div className="max-w-sm w-full text-center bg-white rounded-2xl shadow-lg border border-slate-200 p-10">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Monitor className="w-10 h-10 text-slate-400" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-800 mb-3">Desktop Only</h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        The Admin CMS is optimized for desktop. Please enable <strong>desktop mode</strong> in your browser or use a laptop to access the dashboard.
                    </p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}

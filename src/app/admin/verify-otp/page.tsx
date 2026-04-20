"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, ShieldCheck, ArrowLeft, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

function VerifyOTPContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || ""
    
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [cooldown, setCooldown] = useState(0)
    const [expiryTime, setExpiryTime] = useState(300) // 5 minutes in seconds
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Mask email for security (e.g., r***k@gmail.com)
    const maskEmail = (email: string) => {
        const [name, domain] = email.split("@")
        if (!name || !domain) return email
        return `${name[0]}${"*".repeat(name.length - 2)}${name[name.length - 1]}@${domain}`
    }

    useEffect(() => {
        if (!email) {
            router.push("/admin/forgot-password")
        }
        // Auto-focus first input
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }

        // Cooldown timer
        let interval: NodeJS.Timeout
        if (cooldown > 0) {
            interval = setInterval(() => setCooldown(c => c - 1), 1000)
        }

        // Expiry timer
        const expiryInterval = setInterval(() => {
            setExpiryTime(prev => (prev > 0 ? prev - 1 : 0))
        }, 1000)

        return () => {
            clearInterval(interval)
            clearInterval(expiryInterval)
        }
    }, [email, router, cooldown])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return // Only allow numbers

        const newOtp = [...otp]
        newOtp[index] = value.slice(-1) // Only take the last character
        setOtp(newOtp)

        // Move to next input if value is entered
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData("text").slice(0, 6).split("")
        if (pasteData.length === 6 && pasteData.every(char => /^\d$/.test(char))) {
            setOtp(pasteData)
            inputRefs.current[5]?.focus()
        }
    }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        const otpString = otp.join("")
        
        if (otpString.length !== 6) {
            setError("Please enter the full 6-digit code.")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: otpString }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Invalid OTP")
            }

            toast.success("Identity verified successfully")
            router.push(`/admin/reset-password?email=${encodeURIComponent(email)}&verified=true`)
        } catch (err: any) {
            setError(err.message)
            toast.error(err.message)
            if (err.message.includes("Too many failed attempts")) {
                setOtp(["", "", "", "", "", ""])
            }
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (cooldown > 0) return
        
        setResending(true)
        setError(null)
        try {
            const response = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to resend OTP")
            }

            toast.success("New code dispatched")
            setOtp(["", "", "", "", "", ""])
            setCooldown(60) // 60 seconds cooldown
            setExpiryTime(300) // Reset expiry
            inputRefs.current[0]?.focus()
        } catch (err: any) {
            setError(err.message)
            toast.error(err.message)
        } finally {
            setResending(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100">
                <div>
                    <Link href="/admin/forgot-password" title="Back" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-[#ff8202] mb-8 transition-colors group uppercase tracking-widest">
                        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" /> Back
                    </Link>
                    <div className="text-center">
                        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 group-hover:rotate-0 transition-all shadow-inner">
                            <ShieldCheck className="h-10 w-10" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Verify Identity</h2>
                        <p className="text-slate-500 mt-4 font-medium leading-relaxed">
                            A secure code has been sent to <br />
                            <span className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-lg inline-block mt-1">{maskEmail(email)}</span>
                        </p>
                    </div>
                </div>

                <form onSubmit={handleVerify} className="space-y-10">
                    {error && (
                        <div className="bg-red-50 text-red-600 text-[13px] font-bold p-5 rounded-2xl border-2 border-red-100/50 animate-in fade-in slide-in-from-top-2 text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-1">
                            <Label className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">6-Digit Security Code</Label>
                            <span className={cn(
                                "text-[11px] font-bold px-2 py-1 rounded-full",
                                expiryTime < 60 ? "bg-red-50 text-red-500 animate-pulse" : "bg-slate-50 text-slate-500"
                            )}>
                                Expires in {formatTime(expiryTime)}
                            </span>
                        </div>
                        <div className="flex justify-between gap-3" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    ref={(el) => { inputRefs.current[index] = el }}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    disabled={expiryTime === 0}
                                    className="w-12 h-16 text-center text-3xl font-black bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-[#ff8202] focus:ring-8 focus:ring-[#ff8202]/5 transition-all outline-none text-slate-900 disabled:opacity-50"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button
                            type="submit"
                            className="w-full h-14 bg-[#ff8202] hover:bg-[#ff8202]/90 text-white font-black text-lg rounded-2xl shadow-xl shadow-orange-600/10 hover:shadow-orange-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
                            disabled={loading || otp.some(d => !d) || expiryTime === 0}
                        >
                            {loading ? <Loader2 className="h-6 w-6 animate-spin mr-2" /> : "Verify Identity"}
                        </Button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resending || cooldown > 0}
                                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#ff8202] transition-colors py-2 disabled:opacity-50"
                            >
                                {resending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className={cn("h-4 w-4", cooldown > 0 && "opacity-50")} />}
                                {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend Security Code"}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="pt-6 border-t border-slate-50">
                    <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                        Protected by Stork Enterprise Security Layer
                    </p>
                </div>
            </div>
        </div>
    )
}


export default function VerifyOTPPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <Loader2 className="h-8 w-8 animate-spin text-[#ff8202]" />
            </div>
        }>
            <VerifyOTPContent />
        </Suspense>
    )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function AdminForgotPasswordPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.")
            setLoading(false)
            return
        }

        try {
            const response = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to send OTP")
            }

            toast.success("OTP sent successfully to your email")
            
            // Redirect to verify-otp page with email in query param
            router.push(`/admin/verify-otp?email=${encodeURIComponent(email)}`)
        } catch (err: any) {
            setError(err.message)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <div>
                    <Link href="/admin/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#ff8202] mb-6 transition-colors group">
                        <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" /> Back to Login
                    </Link>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-orange-50 text-[#ff8202] rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 group-hover:rotate-0 transition-transform">
                            <Mail className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Recovery</h2>
                        <p className="text-slate-500 mt-3 font-medium">
                            Enter your email to receive a 6-digit verification code.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSendOTP} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700 font-bold ml-1 uppercase text-[11px] tracking-widest">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@storkhospital.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 rounded-xl border-slate-200 focus:border-[#ff8202] focus:ring-[#ff8202]/10 transition-all text-base"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-[#ff8202] hover:bg-[#ff8202]/90 text-white font-bold rounded-xl shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20 transition-all active:scale-[0.98]"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Send Verification Code"}
                    </Button>
                </form>

                <p className="text-center text-xs text-slate-400 font-medium pt-4">
                    Secure verification powered by Stork Security.
                </p>
            </div>
        </div>
    )
}

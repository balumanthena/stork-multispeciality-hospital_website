"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock, CheckCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

function ResetPasswordContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || ""
    const verified = searchParams.get("verified") === "true"

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (!email || !verified) {
            router.push("/admin/forgot-password")
        }
    }, [email, verified, router])

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (password.length < 6) {
            setError("Password must be at least 6 characters.")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to reset password")
            }

            setSuccess(true)
            toast.success("Password updated successfully")
            
            setTimeout(() => {
                router.push("/admin/login")
            }, 3000)
        } catch (err: any) {
            setError(err.message)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center space-y-6">
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                        <CheckCircle className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Success!</h2>
                        <p className="text-slate-500 font-medium text-lg">
                            Your password has been updated.
                        </p>
                        <p className="text-slate-400 text-sm">
                            Redirecting to login page in 3 seconds...
                        </p>
                    </div>
                    <Link href="/admin/login">
                        <Button className="w-full h-12 bg-[#ff8202] hover:bg-[#ff8202]/90 text-white font-bold rounded-xl shadow-lg shadow-orange-600/10 transition-all">
                            Login Now
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="text-center">
                    <div className="w-16 h-16 bg-orange-50 text-[#ff8202] rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 group-hover:rotate-0 transition-transform">
                        <Lock className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">New Password</h2>
                    <p className="text-slate-500 mt-3 font-medium">
                        Secure your account with a new password.
                    </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password" title="New Password" className="text-slate-700 font-bold ml-1 uppercase text-[11px] tracking-widest">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 rounded-xl border-slate-200 focus:border-[#ff8202] focus:ring-[#ff8202]/10 transition-all pr-12 text-base"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" title="Confirm Password" className="text-slate-700 font-bold ml-1 uppercase text-[11px] tracking-widest">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="h-12 rounded-xl border-slate-200 focus:border-[#ff8202] focus:ring-[#ff8202]/10 transition-all text-base"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-[#ff8202] hover:bg-[#ff8202]/90 text-white font-bold rounded-xl shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20 transition-all active:scale-[0.98]"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Update Password"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <Loader2 className="h-8 w-8 animate-spin text-[#ff8202]" />
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    )
}

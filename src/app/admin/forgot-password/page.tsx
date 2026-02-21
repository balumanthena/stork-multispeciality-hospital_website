"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, Mail } from "lucide-react"
import Link from "next/link"

export default function AdminForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.")
            setLoading(false)
            return
        }

        // Using standard link-based reset for admins
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/admin/reset-password`,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-50 text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto">
                        <Mail className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Link Sent</h2>
                    <p className="text-slate-600">
                        Check <strong>{email}</strong> for instructions to reset your admin password.
                    </p>
                    <Link href="/admin/login">
                        <Button variant="outline" className="w-full mt-4 h-11">
                            Back to Admin Login
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div>
                    <Link href="/admin/login" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 mb-6">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back
                    </Link>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-900">Admin Recovery</h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Enter your registered admin email.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleReset} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-4 rounded-md border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@storkhospital.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Send Reset Link"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

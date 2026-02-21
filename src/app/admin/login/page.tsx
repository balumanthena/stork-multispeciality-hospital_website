"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ShieldCheck, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            // Middleware will handle role check redirection, but we can also do a soft check here if we wanted
            router.push('/admin')
            router.refresh()
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
            {/* Left: Branding */}
            <div className="hidden lg:flex flex-col justify-between bg-[var(--color-primary)] text-white p-12 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                        <ShieldCheck className="h-8 w-8 text-blue-200" />
                        <span className="text-xl font-bold tracking-wider">STORK ADMIN</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Secure Access Portal</h1>
                    <p className="text-blue-100 text-lg">Restricted access for authorized hospital administrators only.</p>
                </div>
                <div className="relative z-10 text-sm text-blue-200">
                    &copy; 2026 Stork Multispecialty Hospital.
                </div>
                {/* Decorative circle */}
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            </div>

            {/* Right: Login Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-8 bg-white p-10 rounded-xl shadow-sm border border-slate-100">
                    <div className="text-center">
                        <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <Lock className="h-6 w-6 text-[var(--color-primary)]" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
                        <p className="text-sm text-slate-500 mt-2">Enter credentials to access the CMS</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-md border border-red-100">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/admin/forgot-password"
                                    className="text-sm text-[var(--color-primary)] hover:underline font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="h-11"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-md"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Sign In"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

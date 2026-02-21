"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AvatarUpload from "@/components/admin/avatar-upload"
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck, Mail, Phone, User, CalendarClock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"

export default function AdminProfilePage() {
    const supabase = createClient()
    const router = useRouter()

    // Global User Context
    const { user: profile, loading, setUser } = useUser()

    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Form State
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

    // Initialize local form state when context loads
    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || "")
            setPhone(profile.phone || "")
            setAvatarUrl(profile.avatar_url || null)
        }
    }, [profile])

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage(null)

        try {
            if (!profile) throw new Error("No profile loaded")

            const timestamp = new Date().toISOString()
            const { error } = await supabase
                .from("profiles")
                .update({
                    full_name: fullName,
                    phone: phone,
                    avatar_url: avatarUrl,
                    updated_at: timestamp
                })
                .eq("id", profile.id)

            if (error) throw error

            // Update Global State Instantly
            setUser(prev => prev ? {
                ...prev,
                full_name: fullName,
                phone: phone,
                avatar_url: avatarUrl,
                updated_at: timestamp
            } : null)

            setMessage({ type: 'success', text: "Profile updated successfully!" })
            setTimeout(() => setMessage(null), 3000)

        } catch (error: any) {
            console.error("Error saving profile. Details:", error?.message, error?.code, error?.details, JSON.stringify(error, Object.getOwnPropertyNames(error)))
            setMessage({ type: 'error', text: error?.message || "Failed to update profile." })
        } finally {
            setSaving(false)
        }
    }

    const handleAvatarUpload = async (url: string) => {
        setAvatarUrl(url)

        if (profile) {
            const timestamp = new Date().toISOString()
            try {
                // Auto-save the profile when avatar changes for better UX
                const { error } = await supabase.from("profiles").update({
                    avatar_url: url,
                    updated_at: timestamp
                }).eq("id", profile.id)

                if (error) throw error

                // Update Global State Instantly
                setUser(prev => prev ? {
                    ...prev,
                    avatar_url: url,
                    updated_at: timestamp
                } : null)

            } catch (error) {
                console.error("Auto-save avatar error:", error)
            }
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        )
    }

    // Since loading is false, if profile is null, user is not authenticated or not found in DB
    if (!profile) {
        // Fallback protection though the layout block should normally catch this
        return null
    }

    // Format role for display
    const formatRole = (role: string) => role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const getRoleBadgeStyle = (role: string) => {
        switch (role) {
            case 'super_admin': return 'bg-orange-50 text-orange-600 border-orange-200'
            case 'admin': return 'bg-blue-50 text-blue-600 border-blue-200'
            case 'seo_manager': return 'bg-purple-50 text-purple-600 border-purple-200'
            default: return 'bg-slate-100 text-slate-700 border-slate-200'
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Profile</h1>
                <p className="text-slate-500 mt-2">Manage your personal information and account settings.</p>
            </div>

            {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                    <p className="font-medium text-sm">{message.text}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* LEFT: Profile Form */}
                <div className="md:col-span-2 space-y-8">
                    <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-slate-100 to-slate-200 w-full relative"></div>
                        <CardHeader className="relative pt-0 sm:pt-0">
                            <div className="-mt-16 mb-4 flex justify-between items-end">
                                <AvatarUpload
                                    uid={profile.id}
                                    url={avatarUrl}
                                    onUpload={handleAvatarUpload}
                                    size={120}
                                />
                                <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-2 bg-white/50 backdrop-blur-md ${getRoleBadgeStyle(profile.role)}`}>
                                    {formatRole(profile.role)}
                                </div>
                            </div>
                            <CardTitle className="text-2xl mt-4">Personal Information</CardTitle>
                            <CardDescription>Update your photo and personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSaveProfile} className="space-y-6">
                                <div className="space-y-2.5">
                                    <Label htmlFor="fullName" className="text-slate-700 font-semibold flex items-center gap-2">
                                        <User className="w-4 h-4 text-slate-400" /> Full Name
                                    </Label>
                                    <Input
                                        id="fullName"
                                        placeholder="Dr. Example Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="h-11 bg-slate-50 focus-visible:bg-white"
                                    />
                                </div>

                                <div className="space-y-2.5">
                                    <Label htmlFor="email" className="text-slate-700 font-semibold flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-slate-400" /> Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        disabled
                                        className="h-11 bg-slate-100 text-slate-500 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-slate-500">Email addresses cannot be changed directly for security reasons.</p>
                                </div>

                                <div className="space-y-2.5">
                                    <Label htmlFor="phone" className="text-slate-700 font-semibold flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-slate-400" /> Phone Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+91 99999 88888"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="h-11 bg-slate-50 focus-visible:bg-white"
                                    />
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-11 text-base font-semibold"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Saving Changes...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT: Account Details Stats */}
                <div className="space-y-8">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-slate-400" /> Account Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</p>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${profile.is_active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className="text-sm font-medium text-slate-900">{profile.is_active ? 'Active' : 'Disabled'}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <CalendarClock className="w-3.5 h-3.5" /> Member Since
                                </p>
                                <p className="text-sm font-medium text-slate-900">
                                    {new Date(profile.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" /> Last Login
                                </p>
                                <p className="text-sm font-medium text-slate-900">
                                    {profile.last_login
                                        ? new Date(profile.last_login).toLocaleString("en-US", { dateStyle: 'medium', timeStyle: 'short' })
                                        : 'Not recorded'}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Account ID</p>
                                <p className="text-xs text-slate-500 font-mono break-all bg-slate-50 p-2 rounded-md border border-slate-100">
                                    {profile.id}
                                </p>
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function Clock({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}

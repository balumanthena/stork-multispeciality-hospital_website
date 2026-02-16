"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Loader2, Save, Lock, Building, Mail, Phone, MapPin, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [passwordUpdating, setPasswordUpdating] = useState(false)

    // General Settings State
    const [settings, setSettings] = useState({
        hospital_name: "",
        tagline: "",
        emergency_number: "",
        address: "",
        email: "",
    })

    // Admin Security State
    const [adminEmail, setAdminEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        fetchSettings()
        fetchUser()
    }, [])

    async function fetchSettings() {
        try {
            const { data, error } = await supabase
                .from("site_settings")
                .select("*")
                .single()

            if (error) {
                // If no row exists, we might want to insert one or just ignore
                if (error.code !== "PGRST116") {
                    console.error("Error fetching settings:", error)
                    toast.error("Failed to load settings")
                }
            } else if (data) {
                setSettings({
                    hospital_name: data.hospital_name || "",
                    tagline: data.tagline || "",
                    emergency_number: data.emergency_number || "",
                    address: data.address || "",
                    email: data.email || "",
                })
            }
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setLoading(false)
        }
    }

    async function fetchUser() {
        const { data: { user } } = await supabase.auth.getUser()
        if (user && user.email) {
            setAdminEmail(user.email)
        }
    }

    async function handleSaveSettings(e: React.FormEvent) {
        e.preventDefault()
        setUpdating(true)

        try {
            // Upsert based on single row assumption (or fetch ID first)
            // Easier: fetch ID first or use a known ID if possible. 
            // Better: Check if row exists, if so update, else insert.

            const { data: existing } = await supabase.from("site_settings").select("id").single()

            let error;
            if (existing) {
                const { error: updateError } = await supabase
                    .from("site_settings")
                    .update(settings)
                    .eq("id", existing.id)
                error = updateError
            } else {
                const { error: insertError } = await supabase
                    .from("site_settings")
                    .insert([settings])
                error = insertError
            }

            if (error) throw error

            toast.success("Settings saved successfully")
        } catch (error) {
            console.error("Error saving settings:", error)
            toast.error("Failed to save settings")
        } finally {
            setUpdating(false)
        }
    }

    async function handleUpdatePassword(e: React.FormEvent) {
        e.preventDefault()

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters")
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        setPasswordUpdating(true)

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            })

            if (error) throw error

            toast.success("Password updated successfully")
            setNewPassword("")
            setConfirmPassword("")
        } catch (error: any) {
            console.error("Error updating password:", error)
            toast.error(error.message || "Failed to update password")
        } finally {
            setPasswordUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center gap-8 py-8 w-full max-w-[700px] mx-auto">

            {/* 1. General Settings Card */}
            <Card className="w-full shadow-sm border-slate-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Building className="w-5 h-5 text-[#ff8202]" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-semibold text-slate-800">General Settings</CardTitle>
                            <CardDescription>Manage your hospital's public details</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <form onSubmit={handleSaveSettings}>
                    <CardContent className="space-y-5 pt-6">
                        <div className="grid gap-2">
                            <Label htmlFor="hospital_name">Hospital Name</Label>
                            <div className="relative">
                                <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="hospital_name"
                                    className="pl-9"
                                    placeholder="Stork Hospital"
                                    value={settings.hospital_name}
                                    onChange={(e) => setSettings({ ...settings, hospital_name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tagline">Tagline</Label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="tagline"
                                    className="pl-9"
                                    placeholder="Advanced Care for Everyone"
                                    value={settings.tagline}
                                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="emergency_number">Emergency Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="emergency_number"
                                        className="pl-9"
                                        placeholder="1066"
                                        value={settings.emergency_number}
                                        onChange={(e) => setSettings({ ...settings, emergency_number: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Public Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="email"
                                        className="pl-9"
                                        type="email"
                                        placeholder="contact@storkhospital.com"
                                        value={settings.email}
                                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Textarea
                                    id="address"
                                    className="pl-9 min-h-[80px]"
                                    placeholder="Hospital address..."
                                    value={settings.address}
                                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50/50 border-t border-slate-100 py-4 flex justify-end">
                        <Button
                            type="submit"
                            disabled={updating}
                            className="bg-[#ff8202] text-white hover:bg-[#e67600] min-w-[120px] !bg-[#ff8202] !text-white shadow-sm"
                            style={{ backgroundColor: '#ff8202', color: 'white' }}
                        >
                            {updating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {/* 2. Admin Security Card */}
            <Card className="w-full shadow-sm border-slate-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <Lock className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-semibold text-slate-800">Admin Account Security</CardTitle>
                            <CardDescription>Update your login credentials</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <form onSubmit={handleUpdatePassword}>
                    <CardContent className="space-y-5 pt-6">
                        <div className="grid gap-2">
                            <Label htmlFor="admin_email">Current Email</Label>
                            <Input
                                id="admin_email"
                                value={adminEmail}
                                disabled
                                className="bg-slate-50 text-slate-500 border-slate-200"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="new_password">New Password</Label>
                                <Input
                                    id="new_password"
                                    type="password"
                                    placeholder="Minimum 6 characters"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm_password">Confirm Password</Label>
                                <Input
                                    id="confirm_password"
                                    type="password"
                                    placeholder="Re-enter new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50/50 border-t border-slate-100 py-4 flex justify-end">
                        <Button
                            type="submit"
                            disabled={passwordUpdating || !newPassword}
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700 text-white min-w-[140px] !bg-red-600 !text-white shadow-sm"
                            style={{ backgroundColor: '#dc2626', color: 'white' }}
                        >
                            {passwordUpdating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

        </div>
    )
}

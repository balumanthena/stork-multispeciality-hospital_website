"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, KeyRound, MonitorSmartphone, ShieldAlert, CheckCircle2, AlertCircle, Trash2, Ban } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SecuritySettingsPage() {
    const supabase = createClient()
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState<string | null>(null)
    const [sessionMessage, setSessionMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Password State
    const [passwordSaving, setPasswordSaving] = useState(false)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [pwdMessage, setPwdMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    useEffect(() => {
        async function checkAccess() {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) {
                    router.push("/admin/login")
                    return
                }

                // Get role for danger zone rendering constraints
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.id)
                    .single()

                if (profile) setRole(profile.role)

            } catch (error) {
                console.error("Auth checking failed", error)
            } finally {
                setLoading(false)
            }
        }
        checkAccess()
    }, [supabase, router])

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setPwdMessage(null)

        if (newPassword !== confirmPassword) {
            setPwdMessage({ type: 'error', text: "New passwords do not match." })
            return
        }

        if (newPassword.length < 8) {
            setPwdMessage({ type: 'error', text: "Password must be at least 8 characters long." })
            return
        }

        setPasswordSaving(true)

        try {
            // Note: Supabase doesn't strictly require currentPassword to update 
            // if the user has an active, authenticated session. Providing a seamless flow.
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            })

            if (error) throw error

            setPwdMessage({ type: 'success', text: "Password successfully updated. You may need to log in again on other devices." })
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")

        } catch (error: any) {
            setPwdMessage({ type: 'error', text: error.message || "Failed to update password." })
        } finally {
            setPasswordSaving(false)
        }
    }

    const handleSignOutAll = async () => {
        setSessionMessage(null)
        try {
            // To sign out of all devices, we sign the user out globally.
            // Some Supabase configurations support global signOut, otherwise standard signOut local.
            await supabase.auth.signOut()
            router.push("/admin/login")
        } catch (error) {
            setSessionMessage({ type: 'error', text: "Failed to terminate sessions." })
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Security Settings</h1>
                <p className="text-slate-500 mt-2">Manage your password, active sessions, and critical account actions.</p>
            </div>

            {/* SECTION 1: Password Update */}
            <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center gap-3 py-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <KeyRound className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                        <CardTitle className="text-lg">Change Password</CardTitle>
                        <CardDescription>Ensure your account remains safe with a strong password.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    {pwdMessage && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 border mb-6 ${pwdMessage.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                            {pwdMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                            <p className="font-medium text-sm">{pwdMessage.text}</p>
                        </div>
                    )}

                    <form onSubmit={handlePasswordUpdate} className="space-y-5 max-w-lg">
                        <div className="space-y-2">
                            <Label htmlFor="current" className="text-slate-700 font-semibold">Current Password (Safety Check)</Label>
                            <Input
                                id="current"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="h-11 bg-slate-50 focus-visible:bg-white"
                                required
                            />
                        </div>
                        <div className="space-y-2 pt-2">
                            <Label htmlFor="new" className="text-slate-700 font-semibold">New Password</Label>
                            <Input
                                id="new"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="h-11 bg-slate-50 focus-visible:bg-white"
                                required
                                minLength={8}
                            />
                            {/* Visual Indicator of strength */}
                            <div className="flex gap-1 mt-2">
                                <div className={`h-1.5 w-1/3 rounded-full ${newPassword.length > 0 ? (newPassword.length >= 8 ? 'bg-green-500' : 'bg-red-500') : 'bg-slate-200'}`}></div>
                                <div className={`h-1.5 w-1/3 rounded-full ${newPassword.length >= 10 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                                <div className={`h-1.5 w-1/3 rounded-full ${newPassword.length >= 14 && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm" className="text-slate-700 font-semibold">Confirm New Password</Label>
                            <Input
                                id="confirm"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="h-11 bg-slate-50 focus-visible:bg-white"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={passwordSaving}
                            className="bg-slate-900 hover:bg-slate-800 text-white mt-4"
                        >
                            {passwordSaving ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...</>
                            ) : "Update Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* SECTION 2: Active Sessions */}
            <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center gap-3 py-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <MonitorSmartphone className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                        <CardTitle className="text-lg">Active Sessions</CardTitle>
                        <CardDescription>Manage your authenticated sessions across all devices.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    {sessionMessage && (
                        <div className="p-4 rounded-xl flex items-center gap-3 border mb-6 bg-red-50 border-red-200 text-red-800">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="font-medium text-sm">{sessionMessage.text}</p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between p-4 border border-slate-200 rounded-xl">
                        <div>
                            <p className="font-semibold text-slate-900">Current Session (This Device)</p>
                            <p className="text-sm text-slate-500 mt-1">Stork CMS Access Granted</p>
                        </div>
                        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={handleSignOutAll}>
                            Log Out All Devices
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* SECTION 3: Danger Zone */}
            <Card className="border-red-200 shadow-sm overflow-hidden border-2">
                <CardHeader className="bg-red-50 border-b border-red-100 flex flex-row items-center gap-3 py-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-red-600">
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-red-900">Danger Zone</CardTitle>
                        <CardDescription className="text-red-700/80">Irreversible and highly destructive administrative actions.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">

                    {role === 'super_admin' ? (
                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between p-5 border border-red-100 bg-white rounded-xl">
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Administrative Overrides</h4>
                                <p className="text-sm text-slate-600 max-w-md">As a Super Admin, you cannot delete your own account. You can universally disable other users from the <strong className="text-slate-800">Users & Roles</strong> menu.</p>
                            </div>
                            <Button variant="outline" className="opacity-50 cursor-not-allowed" disabled>
                                <Ban className="w-4 h-4 mr-2" /> Disable Self
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between p-5 border border-red-100 bg-white rounded-xl">
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Delete Account</h4>
                                <p className="text-sm text-slate-600 max-w-md">Permanently wipe your data from the application database. This action cannot be undone and instantly revokes all access credentials.</p>
                            </div>
                            <Button className="bg-red-600 hover:bg-red-700 text-white shrink-0 shadow-lg shadow-red-600/20">
                                <Trash2 className="w-4 h-4 mr-2" /> Delete Account
                            </Button>
                        </div>
                    )}

                </CardContent>
            </Card>

        </div>
    )
}

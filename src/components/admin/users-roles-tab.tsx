'use client'

import { useState, useTransition } from "react"
import { Profile, UserRole } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createAdminUser, updateUserStatus, updateUserRole, deleteAdminUser } from "@/app/admin/(dashboard)/settings/users.actions"
import { toast } from "sonner"
import { Loader2, UserPlus, MoreVertical, Shield, Trash2, Ban, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function UsersRolesTab({ initialUsers }: { initialUsers: Profile[] }) {
    const [isPending, startTransition] = useTransition()
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [users, setUsers] = useState<Profile[]>(initialUsers)

    // Form State
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState<UserRole>("editor")
    const [isActive, setIsActive] = useState(true)

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("full_name", fullName)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("role", role)
        formData.append("is_active", String(isActive))

        startTransition(async () => {
            const res = await createAdminUser(formData)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("User created successfully.")
                setIsCreateOpen(false)
                // In a real app we might refetch data here, but Server Action revalidatePath handles it magically on next render.
                // For immediate optimistic UI since we passed initialUsers down:
                setUsers(prev => [
                    {
                        id: 'temp-' + Date.now(),
                        full_name: fullName,
                        email,
                        role,
                        is_active: isActive,
                        created_at: new Date().toISOString(),
                        permissions: {}
                    },
                    ...prev
                ])
                setFullName("")
                setEmail("")
                setPassword("")
                setRole("editor")
                setIsActive(true)
            }
        })
    }

    const handleToggleStatus = (userId: string, currentStatus: boolean) => {
        startTransition(async () => {
            const res = await updateUserStatus(userId, !currentStatus)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success(currentStatus ? "User Disabled" : "User Enabled")
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_active: !currentStatus } : u))
            }
        })
    }

    const handleChangeRole = (userId: string, newRole: UserRole) => {
        startTransition(async () => {
            const res = await updateUserRole(userId, newRole)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Role Updated")
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
            }
        })
    }

    const handleDelete = (userId: string) => {
        if (!confirm("Are you sure you want to permanently delete this user?")) return

        startTransition(async () => {
            const res = await deleteAdminUser(userId)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("User Deleted")
                setUsers(prev => prev.filter(u => u.id !== userId))
            }
        })
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                    <CardTitle>Users & Roles</CardTitle>
                    <CardDescription>Manage dashboard access and permissions.</CardDescription>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[var(--color-primary)]">
                            <UserPlus className="h-4 w-4 mr-2" /> Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Admin</DialogTitle>
                            <DialogDescription>
                                Add a new user to access the CMS dashboard.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateUser} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" value={fullName} onChange={e => setFullName(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Temporary Password</Label>
                                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required />
                                <p className="text-xs text-slate-500">Must be at least 6 characters.</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select value={role} onValueChange={(val) => setRole(val as UserRole)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="editor">Editor (Content Only)</SelectItem>
                                        <SelectItem value="seo_manager">SEO Manager</SelectItem>
                                        <SelectItem value="admin">Administrator</SelectItem>
                                        <SelectItem value="super_admin">Super Admin (Full Access)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between mt-4 p-4 border rounded-lg bg-slate-50">
                                <div className="space-y-0.5">
                                    <Label>Account Status</Label>
                                    <p className="text-xs text-slate-500">Allow immediate login?</p>
                                </div>
                                <Switch checked={isActive} onCheckedChange={setIsActive} />
                            </div>

                            <Button type="submit" className="w-full bg-[var(--color-primary)] mt-6" disabled={isPending}>
                                {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                                Create User
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-slate-200 bg-white overflow-hidden">
                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold hidden md:table-cell">Added On</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-500">
                                        No users found.
                                    </td>
                                </tr>
                            ) : users.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900">{u.full_name || "Unknown"}</span>
                                            <span className="text-xs text-slate-500">{u.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            {u.role === 'super_admin' && <Shield className="h-3 w-3 text-orange-500" />}
                                            <span className="capitalize">{u.role.replace('_', ' ')}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {u.is_active ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                <CheckCircle2 className="h-3 w-3" /> Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                <Ban className="h-3 w-3" /> Disabled
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell text-slate-500">
                                        {format(new Date(u.created_at), "MMM d, yyyy")}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[160px]">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />

                                                <DropdownMenuItem onClick={() => handleToggleStatus(u.id, u.is_active)}>
                                                    {u.is_active ? "Disable Account" : "Enable Account"}
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel className="text-xs font-normal text-slate-500">Change Role</DropdownMenuLabel>
                                                <DropdownMenuItem disabled={u.role === 'editor'} onClick={() => handleChangeRole(u.id, 'editor')}>
                                                    Set to Editor
                                                </DropdownMenuItem>
                                                <DropdownMenuItem disabled={u.role === 'seo_manager'} onClick={() => handleChangeRole(u.id, 'seo_manager')}>
                                                    Set to SEO Manager
                                                </DropdownMenuItem>
                                                <DropdownMenuItem disabled={u.role === 'admin'} onClick={() => handleChangeRole(u.id, 'admin')}>
                                                    Set to Admin
                                                </DropdownMenuItem>
                                                <DropdownMenuItem disabled={u.role === 'super_admin'} onClick={() => handleChangeRole(u.id, 'super_admin')}>
                                                    Set to Super Admin
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(u.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}

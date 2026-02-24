"use client"

import { useState } from "react"
import { Users, Save, Shield, User, MoreVertical, Search, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createAdminUser, updateUserStatus, updateUserRole, deleteAdminUser } from "@/app/admin/(dashboard)/settings/users.actions"
import { toast } from "sonner"
import { Loader2, UserPlus, Trash2, Ban } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

interface Profile {
    id: string
    email: string
    full_name: string | null
    role: string
    is_active: boolean
    created_at: string
}

interface UserManagementProps {
    initialUsers: Profile[]
}

export function UserManagement({ initialUsers }: UserManagementProps) {
    const [users, setUsers] = useState<Profile[]>(initialUsers)
    const [isPending, startTransition] = useTransition()
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()

    // Form State
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState<string>("editor")
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

                setFullName("")
                setEmail("")
                setPassword("")
                setRole("editor")
                setIsActive(true)
                router.refresh()
            }
        })
    }

    const handleToggleStatus = (userId: string, currentStatus: boolean) => {
        startTransition(async () => {
            const res = await updateUserStatus(userId, !currentStatus)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success(currentStatus ? "User Suspended" : "User Activated")
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_active: !currentStatus } : u))
                router.refresh()
            }
        })
    }

    const handleChangeRole = (userId: string, newRole: string) => {
        startTransition(async () => {
            const res = await updateUserRole(userId, newRole as any) // Assuming UserRole lines up with strings
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Role Updated")
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
                router.refresh()
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
                router.refresh()
            }
        })
    }

    const filteredUsers = users.filter(user =>
        (user.full_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
                                <Select value={role} onValueChange={(val) => setRole(val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="editor">Editor (Content Only)</SelectItem>
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
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">User Details</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Current Role</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Joined Date</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                                <User className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{user.full_name || 'No Name'}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            {user.role === 'super_admin' && <Shield className="h-3 w-3 text-orange-500" />}
                                            <span className="capitalize text-sm font-medium">{user.role.replace('_', ' ')}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.is_active ? (
                                            <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold uppercase">
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                Active
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-red-600 text-xs font-bold uppercase">
                                                <XCircle className="h-3.5 w-3.5" />
                                                Suspended
                                            </div>
                                        )}
                                    </td>
                                    <td suppressHydrationWarning className="px-6 py-4 text-xs font-medium text-slate-500">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
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

                                                <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.is_active)}>
                                                    {user.is_active ? "Suspend Account" : "Activate Account"}
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel className="text-xs font-normal text-slate-500">Change Role</DropdownMenuLabel>
                                                <DropdownMenuItem disabled={user.role === 'editor'} onClick={() => handleChangeRole(user.id, 'editor')}>
                                                    Set to Editor
                                                </DropdownMenuItem>
                                                <DropdownMenuItem disabled={user.role === 'admin'} onClick={() => handleChangeRole(user.id, 'admin')}>
                                                    Set to Admin
                                                </DropdownMenuItem>
                                                <DropdownMenuItem disabled={user.role === 'super_admin'} onClick={() => handleChangeRole(user.id, 'super_admin')}>
                                                    Set to Super Admin
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="p-12 text-center">
                            <Users className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                            <p className="text-sm text-slate-500">No users found matching your search.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

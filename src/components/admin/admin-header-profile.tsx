"use client"

import { createClient } from "@/lib/supabase/client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User as UserIcon, Shield, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"

export function AdminHeaderProfile() {
    const { user: profile, loading } = useUser()
    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/admin/login")
        router.refresh()
    }

    if (loading) {
        return (
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100 animate-pulse">
                <div className="flex flex-col items-end">
                    <div className="h-4 w-24 bg-slate-200 rounded mb-1"></div>
                    <div className="h-3 w-16 bg-slate-200 rounded-full"></div>
                </div>
                <div className="h-9 w-9 rounded-full bg-slate-200"></div>
            </div>
        )
    }

    if (!profile) return null

    // Format role for display
    const formatRole = (role: string) => {
        return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

    // Role badge styles
    const getRoleBadgeStyle = (role: string) => {
        switch (role) {
            case 'super_admin': return 'text-orange-600 bg-orange-50'
            case 'admin': return 'text-blue-600 bg-blue-50'
            case 'seo_manager': return 'text-purple-600 bg-purple-50'
            default: return 'text-slate-700 bg-slate-100' // editor
        }
    }

    const initials = profile.full_name
        ? profile.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
        : profile.email.substring(0, 2).toUpperCase()

    // Cache busting parameterized avatar URL
    const avatarSrc = profile.avatar_url
        ? `${profile.avatar_url}?t=${new Date(profile.updated_at || Date.now()).getTime()}`
        : null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-4 pl-6 border-l border-slate-100 cursor-pointer group">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-orange-600 transition-colors">
                            {profile.full_name || "Admin User"}
                        </span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider ${getRoleBadgeStyle(profile.role)}`}>
                            {formatRole(profile.role)}
                        </span>
                    </div>
                    {avatarSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={avatarSrc}
                            alt="Avatar"
                            className="h-9 w-9 rounded-full object-cover border border-slate-200 shadow-sm"
                        />
                    ) : (
                        <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm shadow-sm group-hover:border-orange-200 group-hover:bg-orange-50 transition-colors">
                            {initials}
                        </div>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{profile.full_name || "Admin User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {profile.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/admin/profile" className="cursor-pointer flex items-center">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin/profile/security" className="cursor-pointer flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Security Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


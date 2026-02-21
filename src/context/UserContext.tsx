"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

export interface UserProfile {
    id: string
    full_name: string | null
    email: string
    role: string
    avatar_url: string | null
    phone: string | null
    status: string
    created_at: string
    updated_at: string
    last_login: string | null
    is_active: boolean
}

interface UserContextType {
    user: UserProfile | null
    loading: boolean
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>
    refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    const fetchUser = async () => {
        try {
            const { data: { user: authUser } } = await supabase.auth.getUser()

            if (!authUser) {
                setUser(null)
                return
            }

            const { data: profileData } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", authUser.id)
                .single()

            if (profileData) {
                setUser({
                    id: profileData.id,
                    full_name: profileData.full_name,
                    email: authUser.email || "",
                    role: profileData.role,
                    avatar_url: profileData.avatar_url,
                    phone: profileData.phone,
                    status: profileData.status,
                    created_at: profileData.created_at,
                    updated_at: profileData.updated_at,
                    last_login: profileData.last_login,
                    is_active: profileData.is_active
                })
            }
        } catch (error) {
            console.error("Error fetching user profile:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()

        // Set up real-time subscription for profile updates
        let subscription: any = null

        const setupRealtime = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser()
            if (!authUser) return

            subscription = supabase
                .channel(`public:profiles:id=eq.${authUser.id}`)
                .on(
                    'postgres_changes',
                    { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${authUser.id}` },
                    (payload) => {
                        console.log('Realtime profile update:', payload)
                        if (payload.new) {
                            setUser(prev => {
                                if (!prev) return null
                                return {
                                    ...prev,
                                    ...payload.new,
                                    // ensure email is preserved as it might not be in the profiles payload
                                    email: prev.email
                                }
                            })
                        }
                    }
                )
                .subscribe()
        }

        setupRealtime()

        return () => {
            if (subscription) {
                supabase.removeChannel(subscription)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supabase])

    const refreshUser = async () => {
        setLoading(true)
        await fetchUser()
    }

    return (
        <UserContext.Provider value={{ user, loading, setUser, refreshUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}

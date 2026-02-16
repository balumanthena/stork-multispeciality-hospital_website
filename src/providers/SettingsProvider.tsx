"use client"

import * as React from "react"
import { createBrowserClient } from "@supabase/ssr"
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js"

// Define the shape of our settings
// Based on site_settings table: id, hospital_name, tagline, emergency_number, address, email, updated_at
export interface SiteSettings {
    id: string
    hospital_name: string
    tagline: string
    emergency_number: string
    email: string
    address: string
}

interface SettingsContextType {
    settings: SiteSettings | null
    isLoading: boolean
    error: Error | null
}

const SettingsContext = React.createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = React.useState<SiteSettings | null>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState<Error | null>(null)

    // Create Supabase client for client-side
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const fetchSettings = React.useCallback(async () => {
        try {
            // Only set loading true on initial fetch if we don't have settings yet
            // This prevents UI flickering during background re-fetches/polling
            if (!settings) setIsLoading(true)

            const { data, error } = await supabase
                .from("site_settings")
                .select("*")
                .single()

            if (error) {
                // Ignore "Row not found" error (PGRST116) as it just means no settings yet
                if (error.code !== "PGRST116") {
                    throw error
                }
            } else if (data) {
                setSettings(data as SiteSettings)
            }
        } catch (err: any) {
            console.error("Error fetching settings:", err)
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }, [supabase, settings])

    React.useEffect(() => {
        let mounted = true
        let retryCount = 0
        let pollingInterval: NodeJS.Timeout

        // 1. Initial Fetch
        fetchSettings()

        // 2. Realtime Subscription
        const channel = supabase
            .channel('site_settings_changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'site_settings',
                },
                (payload: RealtimePostgresChangesPayload<SiteSettings>) => {
                    // Update state immediately with new data
                    if (mounted && payload.new && Object.keys(payload.new).length > 0) {
                        setSettings(prev => ({ ...prev, ...payload.new } as SiteSettings))
                    }
                }
            )
            .subscribe((status, err) => {
                if (status === 'SUBSCRIBED') {
                    // Reset retry count on successful subscription
                    retryCount = 0
                }

                if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                    console.warn(`Realtime subscription error (${status}):`, err)
                    // If realtime fails, fallback to polling
                    // We don't need complex retry logic here because polling will handle updates
                }
            })

        // 3. Fallback Polling (Every 30 seconds)
        // This ensures data consistency even if realtime disconnects silently
        pollingInterval = setInterval(() => {
            if (mounted) fetchSettings()
        }, 30000)

        // Cleanup
        return () => {
            mounted = false
            clearInterval(pollingInterval)
            supabase.removeChannel(channel)
        }
    }, [supabase, fetchSettings])

    return (
        <SettingsContext.Provider value={{ settings, isLoading, error }}>
            {children}
        </SettingsContext.Provider>
    )
}

// Custom hook to use the settings
export function useSettings() {
    const context = React.useContext(SettingsContext)
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider")
    }
    return context
}

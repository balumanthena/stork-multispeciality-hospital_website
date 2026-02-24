"use client"

import * as React from "react"
import { createBrowserClient } from "@supabase/ssr"
import { RealtimePostgresChangesPayload, Session } from "@supabase/supabase-js"

// Define the shape of our settings
export interface SiteSettings {
    id: string
    hospital_name: string
    tagline: string
    emergency_number: string
    email: string
    address: string
    facebook_url?: string | null
    instagram_url?: string | null
    twitter_url?: string | null
    linkedin_url?: string | null
    youtube_url?: string | null
    whatsapp_url?: string | null
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

    // Ensure Supabase client is instantiated only once per component lifecycle
    // autoRefreshToken is true by default in createBrowserClient, handling JWT token refresh automatically
    const [supabase] = React.useState(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ))

    // Refs to track in-flight requests and prevent race conditions (especially for StrictMode)
    const abortControllerRef = React.useRef<AbortController | null>(null)
    const isFetchingRef = React.useRef(false)

    const fetchSettings = React.useCallback(async () => {
        // Prevent duplicate calls if one is already in progress
        if (isFetchingRef.current) return

        isFetchingRef.current = true
        setIsLoading(prev => settings ? prev : true) // Keep existing settings visible while refreshing
        setError(null)

        // Cancel previous pending request if any
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        const abortController = new AbortController()
        abortControllerRef.current = abortController

        try {
            // First, wait for a valid session to ensure JWT token is fresh and valid.
            // This prevents "JWT expired" errors by making sure auth state is resolved.
            const { data: { session }, error: sessionError } = await supabase.auth.getSession()

            if (sessionError) {
                console.warn("Session error before fetching settings:", sessionError.message)
                // Note: We often still want to try fetching public settings even if session fails
            }

            const { data, error: fetchError } = await supabase
                .from("site_settings")
                .select("*")
                .single()

            // If the request was aborted (e.g. component unmounted), don't update state
            if (abortController.signal.aborted) {
                return
            }

            if (fetchError) {
                // Ignore "Row not found" as it means the table is empty, which is a valid state initially
                if (fetchError.code !== "PGRST116") throw fetchError
            } else if (data) {
                setSettings(data as SiteSettings)
            }
        } catch (err: any) {
            // Quietly ignore AbortError as it is an intentional unmount/cancellation, not a real failure
            if (err.name === 'AbortError') {
                return;
            }

            // Handle "JWT expired" errors by signing out and retrying
            // This allows the fetch to proceed as an anonymous user (public reading)
            if (err.message?.includes("JWT expired") || (err.code === "PGRST301")) {
                console.warn("JWT expired, signing out and retrying settings fetch...")
                await supabase.auth.signOut()
                isFetchingRef.current = false
                return fetchSettings()
            }

            console.error("Error fetching settings:", err.message || err)

            // Handle and clean up network/fetch errors gracefully without crashing the UI
            setError(err instanceof Error ? err : new Error(String(err)))
        } finally {
            isFetchingRef.current = false
            // Only set loading to false if this was the active request
            if (abortControllerRef.current === abortController) {
                setIsLoading(false)
            }
        }
    }, [supabase, settings])

    React.useEffect(() => {
        let mounted = true

        // 1. Trigger initial fetch
        fetchSettings()

        // 2. Set up Auth State Listener
        // Triggers fetch only after authentication events to handle expired JWTs and token refreshes
        const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (mounted && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION')) {
                    fetchSettings()
                }
            }
        )

        // 3. Set up Realtime Subscription for automatic UI updates
        const realtimeChannel = supabase
            .channel('site_settings_changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'site_settings',
                },
                (payload: RealtimePostgresChangesPayload<SiteSettings>) => {
                    if (mounted && payload.new && Object.keys(payload.new).length > 0) {
                        setSettings(prev => ({ ...prev, ...payload.new } as SiteSettings))
                    }
                }
            )
            .subscribe((status, err) => {
                if (status === 'CHANNEL_ERROR') {
                    console.warn(`Realtime subscription error:`, err)
                }
            })

        // Cleanup function
        return () => {
            mounted = false
            // Abort any in-flight requests to prevent AbortError memory leaks on unmount
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
            // Clean up subscriptions
            authSubscription.unsubscribe()
            supabase.removeChannel(realtimeChannel)
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
        return {
            settings: null,
            isLoading: false,
            error: null
        }
    }
    return context
}

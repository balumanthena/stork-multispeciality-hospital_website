import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { subscribeToChanges } from '@/services/realtime.service'
import { BlogPost } from '@/types'
import { RealtimeChannel } from '@supabase/supabase-js'

// Overload for Listing (Inserts)
export function useBlogRealtime(initialData: BlogPost[]): BlogPost[];
// Overload for Detail (Updates)
export function useBlogRealtime(initialData: BlogPost): BlogPost;

export function useBlogRealtime(initialData: BlogPost | BlogPost[]) {
    const [data, setData] = useState<BlogPost | BlogPost[]>(initialData)
    const router = useRouter()
    const isMounted = useRef(false)
    const isList = Array.isArray(initialData)

    // Sync state with props if server data changes
    useEffect(() => {
        if (isMounted.current) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setData(initialData)
        }
        isMounted.current = true
    }, [initialData])

    useEffect(() => {
        let channel: RealtimeChannel

        if (isList) {
            // Listing Page: Listen for INSERTs
            channel = subscribeToChanges({
                table: 'blogs',
                event: 'INSERT',
                callback: (payload) => {
                    setData((prev) => {
                        if (!Array.isArray(prev)) return prev;
                        return [payload.new as BlogPost, ...prev];
                    })
                },
            })
        } else if (!Array.isArray(initialData)) {
            // Detail Page: Listen for UPDATEs unique to this blog
            if (!initialData?.id) return

            channel = subscribeToChanges({
                table: 'blogs',
                event: 'UPDATE',
                filter: `id=eq.${initialData.id}`,
                callback: (payload) => {
                    setData((prev) => {
                        if (Array.isArray(prev)) return prev;
                        return { ...prev, ...(payload.new as BlogPost) };
                    })
                },
            })
        }

        // Fallback Polling: Refresh every 60s
        const intervalId = setInterval(() => {
            // Only poll if we lack recent real-time updates (simplified logic: always poll for safety)
            router.refresh()
        }, 60000)

        return () => {
            if (channel) channel.unsubscribe()
            clearInterval(intervalId)
        }
    }, [isList, initialData, router])

    return data
}

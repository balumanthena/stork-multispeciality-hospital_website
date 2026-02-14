import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { subscribeToChanges } from '@/services/realtime.service'

// Overload for Listing (Inserts)
export function useBlogRealtime(initialData: any[]): any[];
// Overload for Detail (Updates)
export function useBlogRealtime(initialData: any): any;

export function useBlogRealtime(initialData: any) {
    const [data, setData] = useState(initialData)
    const router = useRouter()
    const isMounted = useRef(false)
    const isList = Array.isArray(initialData)

    // Sync state with props if server data changes
    useEffect(() => {
        if (isMounted.current) {
            setData(initialData)
        }
        isMounted.current = true
    }, [initialData])

    useEffect(() => {
        let channel: any

        if (isList) {
            // Listing Page: Listen for INSERTs
            channel = subscribeToChanges({
                table: 'blogs',
                event: 'INSERT',
                callback: (payload) => {
                    setData((prev: any[]) => [payload.new, ...prev])
                },
            })
        } else {
            // Detail Page: Listen for UPDATEs unique to this blog
            if (!initialData?.id) return

            channel = subscribeToChanges({
                table: 'blogs',
                event: 'UPDATE',
                filter: `id=eq.${initialData.id}`,
                callback: (payload) => {
                    setData((prev: any) => ({ ...prev, ...payload.new }))
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
    }, [isList, initialData?.id, router])

    return data
}

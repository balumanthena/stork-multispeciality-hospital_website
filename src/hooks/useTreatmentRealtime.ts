import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { subscribeToChanges } from '@/services/realtime.service'
import { Treatment } from '@/types'

export function useTreatmentRealtime(initialData: Treatment) {
    const [data, setData] = useState<Treatment>(initialData)
    const router = useRouter()
    const isMounted = useRef(false)

    // Sync state with props if server data changes (e.g. after router.refresh)
    useEffect(() => {
        if (isMounted.current) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setData(initialData)
        }
        isMounted.current = true
    }, [initialData])

    useEffect(() => {
        if (!initialData?.id) return

        // Real-time subscription
        const channel = subscribeToChanges({
            table: 'treatments',
            event: 'UPDATE',
            filter: `id=eq.${initialData.id}`,
            callback: (payload) => {
                console.log('Real-time update received', payload)
                setData((prev) => ({ ...prev, ...(payload.new as Treatment) }))
            },
        })

        // Fallback Polling: Refresh data every 60s to ensure consistency
        // This utilizes Next.js router.refresh() to re-fetch server data
        const intervalId = setInterval(() => {
            console.log('Polling fallback: Refreshing data...')
            router.refresh()
        }, 60000)

        return () => {
            channel.unsubscribe()
            clearInterval(intervalId)
        }
    }, [initialData?.id, router])

    return data
}

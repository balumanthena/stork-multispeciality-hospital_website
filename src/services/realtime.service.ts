import { supabase } from '@/lib/supabase/client'
import { RealtimeChannel } from '@supabase/supabase-js'

type SubscriptionConfig = {
    table: string
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*'
    filter?: string
    callback: (payload: any) => void
}

export const subscribeToChanges = ({ table, event, filter, callback }: SubscriptionConfig): RealtimeChannel => {
    return supabase
        .channel(`${table}-changes-${Date.now()}`)
        .on(
            'postgres_changes',
            {
                event,
                schema: 'public',
                table,
                filter,
            },
            (payload) => {
                console.log(`Real-time update received for ${table}:`, payload)
                callback(payload)
            }
        )
        .subscribe()
}

import { supabase } from '@/lib/supabase/client'
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'

type SubscriptionConfig = {
    table: string
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*'
    filter?: string
    callback: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void
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
            (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => {
                console.log(`Real-time update received for ${table}:`, payload)
                callback(payload)
            }
        )
        .subscribe()
}

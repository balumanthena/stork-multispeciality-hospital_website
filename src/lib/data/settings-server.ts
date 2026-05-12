import { createStaticClient } from '@/lib/supabase/server'
import { cache } from 'react'

export const getSiteSettings = cache(async () => {
    const supabase = createStaticClient()
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single()

    if (error) {
        if (error.code !== "PGRST116") {
            console.error('Error fetching site settings:', error.message)
        }
        return null
    }

    return data
})

import { createStaticClient } from '@/lib/supabase/server'
import { cache } from 'react'
import { Department } from '@/types'

export const getActiveDepartments = cache(async () => {
    const supabase = createStaticClient()
    const { data, error } = await supabase
        .from('departments')
        .select('id, created_at, name, slug, description, icon, image_url, is_active, display_order')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('name', { ascending: true })

    if (error) {
        console.error('Error fetching departments:', error.message || error.details || error, JSON.stringify(error))
        return []
    }

    return (data as Department[]) || []
})

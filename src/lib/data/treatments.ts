
import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'
import { Treatment } from '@/types'

export const revalidate = 60

export const getTreatmentsByDepartment = cache(async (slug: string) => {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('treatments')
        .select(`
            *,
            departments!inner (
                id,
                name,
                slug
            )
        `)
        .eq('departments.slug', slug)
        .eq('is_active', true)
        .order('title', { ascending: true })

    if (error) {
        console.error('Error fetching treatments by department:', error)
        return []
    }

    return data as unknown as Treatment[]
})

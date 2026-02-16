import { createStaticClient } from '@/lib/supabase/server'
import { cache } from 'react'

export type Treatment = {
    id: string
    title: string
    slug: string
    department_id: string
    content: string | null
    short_description: string | null
    meta_title: string | null
    meta_description: string | null
    is_active: boolean
    display_order: number // Assuming this exists or falls back
    created_at: string
    updated_at: string
    departments?: {
        name: string
        slug: string
    } | null
    // UI specific fields that might be mapped
    name?: string
    department?: string
}

export const getTreatmentBySlug = cache(async (slug: string) => {
    // For single treatment page (server component), we can use createClient (cookies) or static.
    // Static is fine as it's public.
    const supabase = createStaticClient()

    const { data, error } = await supabase
        .from('treatments')
        .select(`
            *,
            departments (
                name,
                slug
            )
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

    if (error) {
        console.error('Error fetching treatment:', error)
        return null
    }

    return data as unknown as Treatment
})

export const getAllTreatments = cache(async () => {
    // Used for generateStaticParams -> MUST use static client (no cookies)
    const supabase = createStaticClient()

    const { data, error } = await supabase
        .from('treatments')
        .select('title, slug, department_id')
        .eq('is_active', true)
        .order('title')

    if (error) {
        console.error('Error fetching treatments:', error)
        return []
    }

    return data as unknown as Partial<Treatment>[]
})

export const getTreatmentsByDepartment = cache(async (departmentSlug: string) => {
    // This seems redundant with src/lib/data/treatments.ts but let's fix it anyway
    const supabase = createStaticClient()

    // We need to join to filter by department slug if the input is slug
    const { data, error } = await supabase
        .from('treatments')
        .select(`
            *,
            departments!inner (
                slug
            )
        `)
        .eq('departments.slug', departmentSlug)
        .eq('is_active', true)
        .order('title')

    if (error) {
        console.error('Error fetching treatments by department:', error)
        return []
    }

    return data as unknown as Treatment[]
})

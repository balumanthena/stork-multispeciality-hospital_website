import { createClient } from '@/lib/supabase/server'
import { Department } from '@/types'

export async function getActiveDepartments() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('name', { ascending: true })

    if (error) {
        console.error('Error fetching departments:', error)
        return []
    }

    return (data as Department[]) || []
}

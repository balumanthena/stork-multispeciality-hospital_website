import { createStaticClient } from '@/lib/supabase/server'
import { cache } from 'react'
import { TREATMENTS } from '@/components/layout/navbar/nav-data'

export type GroupedTreatmentCategory = {
    title: string;
    slug: string;
    href: string;
    display_order?: number; // Added for sorting
    items: {
        title: string;
        href: string;
    }[];
}

export const getGroupedTreatments = cache(async () => {
    // Use static client to avoid "cookies() outside request scope" error during build
    const supabase = createStaticClient()

    try {
        const { data: treatments, error } = await supabase
            .from('treatments')
            .select(`
id,
    title,
    slug,
    department_id,
    departments: department_id(
        id,
        name,
        slug,
        display_order
    )
        `)
            .eq('is_active', true)
            .order('title', { ascending: true })

        if (error) {
            console.error('Error fetching treatments:', error.message)
            return TREATMENTS as unknown as GroupedTreatmentCategory[]
        }

        if (!treatments || treatments.length === 0) {
            return TREATMENTS as unknown as GroupedTreatmentCategory[]
        }

        // Grouping Logic
        const groupedMap = new Map<string, GroupedTreatmentCategory>()

        interface TreatmentWithDepartment {
            title: string;
            slug: string;
            departments: {
                id: string;
                name: string;
                slug: string;
                display_order: number;
            } | null;
        }

        (treatments as unknown as TreatmentWithDepartment[]).forEach((treatment) => {
            const dept = treatment.departments

            if (!dept) return // Skip if no department found

            if (!groupedMap.has(dept.id)) {
                groupedMap.set(dept.id, {
                    title: dept.name, // Category Title
                    slug: dept.slug,
                    href: `/ treatments / ${dept.slug} `, // Link to category page
                    display_order: dept.display_order || 999,
                    items: []
                })
            }

            const category = groupedMap.get(dept.id)!

            category.items.push({
                title: treatment.title, // Treatment Title
                href: `/ treatments / ${treatment.slug} ` // Individual treatment link
            })
        })

        // Sort Categories by Department Display Order, then Name
        const sortedGroupedData = Array.from(groupedMap.values()).sort((a, b) => {
            if (a.display_order !== undefined && b.display_order !== undefined) {
                return a.display_order - b.display_order
            }
            return a.title.localeCompare(b.title)
        })

        return sortedGroupedData

    } catch (err) {
        console.error('Unexpected error in getGroupedTreatments:', err)
        return TREATMENTS as unknown as GroupedTreatmentCategory[]
    }
})

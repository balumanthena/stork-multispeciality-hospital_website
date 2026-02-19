import { MetadataRoute } from 'next'
import { getAllTreatmentSlugs } from '@/lib/data/treatment-detail-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://storkhospital.com'

    // Static routes
    const routes = [
        '',
        '/about',
        '/departments',
        '/doctors',
        '/contact',
        '/treatments',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
    }))

    // Dynamic routes (Treatments)
    const treatmentSlugs = getAllTreatmentSlugs()
    const treatmentRoutes = treatmentSlugs.map((slug) => ({
        url: `${baseUrl}/treatments/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Dynamic routes (Procedures - map to same structure if they share URL base, currently assumed /procedures/[slug])
    // Note: specific mapping might be needed if procedures have a different base URL
    // Based on project structure, we have /treatments/[slug] and /procedures/[slug]
    // Ideally ensure getAllTreatmentSlugs covers all unique public pages.
    // We will assume for now all are under treatments or handled there.

    return [...routes, ...treatmentRoutes]
}

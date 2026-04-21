
import { DEPARTMENTS_LIST } from "./departments";

export const DEPARTMENT_ICON_MAP: Record<string, string> = DEPARTMENTS_LIST.reduce((acc, dept) => {
    acc[dept.slug] = dept.iconUrl;
    return acc;
}, {} as Record<string, string>);

export function getDepartmentIcon(slug: string) {
    if (!slug) return null;

    // 1. Exact match
    if (DEPARTMENT_ICON_MAP[slug]) {
        return DEPARTMENT_ICON_MAP[slug];
    }

    // 2. Fuzzy/Substring match
    const normalizedSlug = slug.toLowerCase();

    for (const [key, value] of Object.entries(DEPARTMENT_ICON_MAP)) {
        // If the database slug contains the map key
        const keyWords = key.split('-');

        // If EVERY word in the key is found in the slug, it's a strong match
        if (keyWords.every(word => normalizedSlug.includes(word))) {
            return value;
        }

        // Specialized edge cases
        if (normalizedSlug.includes('cosmetic') && key === 'cosmetic-surgery') return value;
        if (normalizedSlug.includes('bariatric') && key === 'bariatric') return value;
        if (normalizedSlug.includes('emergency') && key === 'emergency') return value;
        if (normalizedSlug.includes('gynaecol') && key === 'gynaecology') return value;
        if (normalizedSlug.includes('ortho') && key === 'orthopaedics') return value;
        if (normalizedSlug.includes('gastro') && key === 'bariatric') return value;
    }

    // Fallback
    return null;
}

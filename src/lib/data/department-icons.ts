export const DEPARTMENT_ICON_MAP: Record<string, string> = {
    "cosmetic-surgery": "/images/cosmetic-surgery.png",
    "emergency": "/images/emergency-trauma-and-critical-care.png",
    "ent": "/images/ent.png",
    "general-medicine": "/images/general-medicine.png",
    "general-surgery": "/images/general-surgery.png",
    "gynaecology": "/images/gynecology.png",
    "neurosurgery": "/images/neurosurgery.png",
    "oncology": "/images/oncology.png",
    "orthopaedics": "/images/orthopedics.png",
    "pain-management": "/images/pain-management.png",
    "proctology": "/images/proctology.png",
    "pulmonology": "/images/pulmonology.png",
    "urology": "/images/urology-and-andrology.png",
    "vascular": "/images/vascular-surgery.png",
    "bariatric": "/images/gi-surgery-and-weight-loss.png",
}

export function getDepartmentIcon(slug: string) {
    if (!slug) return null;

    // 1. Exact match
    if (DEPARTMENT_ICON_MAP[slug]) {
        return DEPARTMENT_ICON_MAP[slug];
    }

    // 2. Fuzzy/Substring match
    const normalizedSlug = slug.toLowerCase();

    for (const [key, value] of Object.entries(DEPARTMENT_ICON_MAP)) {
        // If the database slug contains the map key (e.g. 'cosmetic-and-plastic-surgery' contains 'cosmetic-surgery' -> wait, 'cosmetic' might be better)
        // Let's use simple word splitting
        const keyWords = key.split('-');

        // If EVERY word in the key is found in the slug, it's a strong match
        if (keyWords.every(word => normalizedSlug.includes(word))) {
            return value;
        }

        // Specialized edge cases where the key word might not strictly match the DB slug exactly but is strongly associated
        if (normalizedSlug.includes('cosmetic') && key === 'cosmetic-surgery') return value;
        if (normalizedSlug.includes('bariatric') && key === 'bariatric') return value;
        if (normalizedSlug.includes('emergency') && key === 'emergency') return value;
        if (normalizedSlug.includes('gynaecol') && key === 'gynaecology') return value;
        if (normalizedSlug.includes('ortho') && key === 'orthopaedics') return value;
        if (normalizedSlug.includes('gastro') && key === 'bariatric') return value;
    }

    // Fallback if no match is found, but construct the path safely
    return null;
}

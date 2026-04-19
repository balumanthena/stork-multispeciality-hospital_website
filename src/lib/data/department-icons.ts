export const DEPARTMENT_ICON_MAP: Record<string, string> = {
    "cosmetic-surgery": "/images/Departmentsicons/Cosmetic & Plastic Surgey.png",
    "emergency": "/images/Departmentsicons/Emergency Trauma & Critical Care.png",
    "ent": "/images/Departmentsicons/ENT.png",
    "general-medicine": "/images/Departmentsicons/General medicine.png",
    "general-surgery": "/images/Departmentsicons/General surgery.png",
    "gynaecology": "/images/Departmentsicons/Gynecology.png",
    "neurosurgery": "/images/Departmentsicons/Neurosurgery.png",
    "oncology": "/images/Departmentsicons/Oncology.png",
    "orthopaedics": "/images/Departmentsicons/Orthopedics.png",
    "pain-management": "/images/Departmentsicons/Pain management.png",
    "proctology": "/images/Departmentsicons/Proctology.png",
    "pulmonology": "/images/Departmentsicons/Pulmonology.png",
    "urology": "/images/Departmentsicons/Urology.png",
    "vascular": "/images/Departmentsicons/Vascular.png",
    "bariatric": "/images/Departmentsicons/GI Surgery & Weight Loss.png",
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

export const DEPARTMENT_ICON_MAP: Record<string, string> = {
    "cosmetic-surgery": "/images/cosmetic-surgery-icon.png",
    "emergency": "/images/Emergency Trauma & Critical Care.png",
    "ent": "/images/ENT.png",
    "general-medicine": "/images/General medicine.png",
    "general-surgery": "/images/General surgery.png",
    "gynaecology": "/images/Gynecology.png", // Note: folder in app is 'gynaecology', image is 'Gynecology.png'
    "neurosurgery": "/images/Neurosurgery.png",
    "oncology": "/images/Oncology.png",
    "orthopaedics": "/images/Orthopedics.png", // Note: folder is 'orthopaedics', image is 'Orthopedics.png'
    "pain-management": "/images/Pain management.png",
    "proctology": "/images/Proctology.png",
    "pulmonology": "/images/Pulmonology.png",
    "urology": "/images/Urology.png",
    "vascular": "/images/Vascular.png",
    "bariatric": "/images/GI Surgery & Weight Loss.png", // Mapping 'bariatric' slug to GI Surgery image
    // "general-medicine": "/images/General Medicine.png", // Not found in provided list, checking if available
}

export function getDepartmentIcon(slug: string) {
    return DEPARTMENT_ICON_MAP[slug] || null
}

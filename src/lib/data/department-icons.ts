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
    return DEPARTMENT_ICON_MAP[slug] || null
}

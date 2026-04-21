import { GroupedTreatmentCategory, BodyRegion } from "./types"
import { TREATMENTS_MASTER } from "./treatments"

const DEPARTMENT_INFO: Record<string, { slug: string; href: string }> = {
    "Pain Management": { slug: "pain-management", href: "/services/pain-management" },
    "Gynecology & Obstetrics": { slug: "gynaecology", href: "/services/gynaecology" },
    "Orthopedics & Trauma": { slug: "orthopedics", href: "/services/orthopedics" },
    "General Medicine": { slug: "general-medicine", href: "/services/general-medicine" },
    "General Surgery": { slug: "general-surgery", href: "/services/general-surgery" },
    "Spine Care": { slug: "spine", href: "/services/spine" },
    "Vascular Surgery": { slug: "vascular", href: "/services/vascular" },
    "Urology": { slug: "urology", href: "/services/urology" },
    "Oncology": { slug: "oncology", href: "/services/oncology" },
    "Proctology": { slug: "proctology", href: "/services/proctology" },
    "Cosmetic & Plastic Surgery": { slug: "plastic-surgery", href: "/services/cosmetic-surgery" },
    "ENT": { slug: "ent", href: "/services/ent" },
    "GI & Bariatric Surgery": { slug: "bariatric", href: "/services/bariatric" },
    "Neurosurgery": { slug: "neurosurgery", href: "/services/neurosurgery" },
    "Pulmonology": { slug: "pulmonology", href: "/services/pulmonology" }
};

const getGroupedTreatments = (): GroupedTreatmentCategory[] => {
    const groups: Record<string, GroupedTreatmentCategory> = {};

    TREATMENTS_MASTER.forEach(t => {
        if (!groups[t.department]) {
            const info = DEPARTMENT_INFO[t.department] || { slug: t.department.toLowerCase().replace(/\s+/g, "-"), href: "/services" };
            groups[t.department] = {
                title: t.department,
                slug: info.slug,
                href: info.href,
                items: []
            };
        }
        groups[t.department].items.push({
            title: t.name,
            href: t.href,
            body_region: t.body_region as BodyRegion
        });
    });

    // Return in the order of departments appearing in TREATMENTS_MASTER
    const orderedDepartments = Array.from(new Set(TREATMENTS_MASTER.map(t => t.department)));
    return orderedDepartments.map(dept => groups[dept]);
};

export const HARDCODED_TREATMENTS: GroupedTreatmentCategory[] = getGroupedTreatments();

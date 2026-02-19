import { GroupedTreatmentCategory } from "./grouped-treatments"

// MASTER PROCEDURES LIST (25 ITEMS ONLY)
export const HARDCODED_PROCEDURES: GroupedTreatmentCategory[] = [
    {
        title: "GENERAL & LAPAROSCOPIC",
        slug: "general-laparoscopic",
        href: "/departments/general-surgery",
        items: [
            { title: "Appendectomy", href: "/procedures/appendectomy", body_region: "abdomen" },
            { title: "Lipoma / Sebaceous Cyst Removal", href: "/procedures/lipoma-removal", body_region: "skin-oncology" },
            { title: "Thyroidectomy", href: "/procedures/thyroidectomy", body_region: "ent" },
            { title: "Umbilical Hernia Repair", href: "/procedures/umbilical-hernia-repair", body_region: "abdomen" },
        ]
    },
    {
        title: "ORTHOPAEDICS",
        slug: "orthopedics",
        href: "/departments/orthopaedics",
        items: [
            { title: "ACL & PCL Tear", href: "/procedures/acl-pcl-tear", body_region: "legs" },
            { title: "Fracture Surgery", href: "/procedures/fracture-surgery", body_region: "legs" },
            { title: "Kyphoplasty", href: "/procedures/kyphoplasty", body_region: "spine" },
        ]
    },
    {
        title: "SPINE SURGERY",
        slug: "spine-surgery",
        href: "/departments/spine-surgery",
        items: [
            { title: "Endoscopic Keyhole Discectomy", href: "/procedures/endoscopic-keyhole-discectomy", body_region: "spine" },
            { title: "Vertebroplasty", href: "/procedures/vertebroplasty", body_region: "spine" },
        ]
    },
    {
        title: "ENT",
        slug: "ent",
        href: "/departments/ent",
        items: [
            { title: "Rhinoplasty", href: "/procedures/rhinoplasty", body_region: "ent" },
        ]
    },
    {
        title: "UROLOGY",
        slug: "urology",
        href: "/departments/urology",
        items: [
            { title: "Hydrocelectomy", href: "/procedures/hydrocelectomy", body_region: "pelvis" },
            { title: "Prostatectomy", href: "/procedures/prostatectomy", body_region: "pelvis" },
        ]
    },
    {
        title: "GYNAECOLOGY",
        slug: "gynecology",
        href: "/departments/gynaecology",
        items: [
            { title: "C-Section", href: "/procedures/c-section", body_region: "womens-health" },
            { title: "Ectopic Pregnancy Surgery", href: "/procedures/ectopic-pregnancy-surgery", body_region: "womens-health" },
            { title: "Endometriosis Surgery", href: "/procedures/endometriosis-surgery", body_region: "womens-health" },
            { title: "Hysterectomy", href: "/procedures/hysterectomy", body_region: "womens-health" },
            { title: "MTP (Medical Termination of Pregnancy)", href: "/procedures/mtp", body_region: "womens-health" },
            { title: "Painless Delivery", href: "/procedures/painless-delivery", body_region: "womens-health" },
            { title: "Uterine Fibroids Surgery", href: "/procedures/uterine-fibroids-surgery", body_region: "womens-health" },
        ]
    },
    {
        title: "ONCOLOGY",
        slug: "oncology",
        href: "/departments/oncology",
        items: [
            { title: "Breast Lump Surgery", href: "/procedures/breast-lump-surgery", body_region: "oncology" },
            { title: "Chemo Port Insertion", href: "/procedures/chemo-port-insertion", body_region: "oncology" },
            { title: "Chemotherapy", href: "/procedures/chemotherapy", body_region: "oncology" },
        ]
    },
    {
        title: "PAIN MANAGEMENT",
        slug: "pain-management",
        href: "/departments/pain-management",
        items: [
            { title: "Cancer Pain Management", href: "/procedures/cancer-pain-management", body_region: "pain-management" },
        ]
    },
    {
        title: "VASCULAR SURGERY",
        slug: "vascular-surgery",
        href: "/departments/vascular-surgery",
        items: [
            { title: "AV Fistula", href: "/procedures/av-fistula", body_region: "vascular" },
        ]
    },
    {
        title: "PLASTIC SURGERY",
        slug: "plastic-surgery",
        href: "/departments/plastic-surgery",
        items: [
            { title: "Gynecomastia Surgery", href: "/procedures/gynecomastia-surgery", body_region: "plastic-surgery" },
        ]
    },
]

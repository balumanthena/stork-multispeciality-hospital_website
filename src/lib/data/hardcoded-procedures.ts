import { GroupedTreatmentCategory } from "./grouped-treatments"

// MASTER PROCEDURES LIST (25 ITEMS ONLY)
export const HARDCODED_PROCEDURES: GroupedTreatmentCategory[] = [
    {
        title: "GENERAL & LAPAROSCOPIC",
        slug: "general-laparoscopic",
        href: "/services/general-surgery",
        items: [
            { title: "Appendectomy", href: "/services/general-laparoscopic/appendectomy", body_region: "abdomen" },
            { title: "Lipoma / Sebaceous Cyst Removal", href: "/services/general-laparoscopic/lipoma-removal", body_region: "skin-oncology" },
            { title: "Thyroidectomy", href: "/services/general-laparoscopic/thyroidectomy", body_region: "ent" },
            { title: "Umbilical Hernia Repair", href: "/services/general-laparoscopic/umbilical-hernia-repair", body_region: "abdomen" },
        ]
    },
    {
        title: "ORTHOPAEDICS",
        slug: "orthopedics",
        href: "/services/orthopaedics",
        items: [
            { title: "ACL & PCL Tear", href: "/services/orthopedics/acl-pcl-tear", body_region: "legs" },
            { title: "Fracture Surgery", href: "/services/orthopedics/fracture-surgery", body_region: "legs" },
            { title: "Kyphoplasty", href: "/services/orthopedics/kyphoplasty", body_region: "spine" },
        ]
    },
    {
        title: "SPINE SURGERY",
        slug: "spine-surgery",
        href: "/services/spine-surgery",
        items: [
            { title: "Endoscopic Keyhole Discectomy", href: "/services/spine-surgery/endoscopic-keyhole-discectomy", body_region: "spine" },
            { title: "Vertebroplasty", href: "/services/spine-surgery/vertebroplasty", body_region: "spine" },
        ]
    },
    {
        title: "ENT",
        slug: "ent",
        href: "/services/ent",
        items: [
            { title: "Rhinoplasty", href: "/services/ent/rhinoplasty", body_region: "ent" },
        ]
    },
    {
        title: "UROLOGY",
        slug: "urology",
        href: "/services/urology",
        items: [
            { title: "Hydrocelectomy", href: "/services/urology/hydrocelectomy", body_region: "pelvis" },
            { title: "Prostatectomy", href: "/services/urology/prostatectomy", body_region: "pelvis" },
        ]
    },
    {
        title: "GYNAECOLOGY",
        slug: "gynecology",
        href: "/services/gynaecology",
        items: [
            { title: "C-Section", href: "/services/gynecology/c-section", body_region: "womens-health" },
            { title: "Ectopic Pregnancy Surgery", href: "/services/gynecology/ectopic-pregnancy-surgery", body_region: "womens-health" },
            { title: "Endometriosis Surgery", href: "/services/gynecology/endometriosis-surgery", body_region: "womens-health" },
            { title: "Hysterectomy", href: "/services/gynecology/hysterectomy", body_region: "womens-health" },
            { title: "MTP (Medical Termination of Pregnancy)", href: "/services/gynecology/mtp", body_region: "womens-health" },
            { title: "Painless Delivery", href: "/services/gynecology/painless-delivery", body_region: "womens-health" },
            { title: "Uterine Fibroids Surgery", href: "/services/gynecology/uterine-fibroids-surgery", body_region: "womens-health" },
        ]
    },
    {
        title: "ONCOLOGY",
        slug: "oncology",
        href: "/services/oncology",
        items: [
            { title: "Breast Lump Surgery", href: "/services/oncology/breast-lump-surgery", body_region: "oncology" },
            { title: "Chemo Port Insertion", href: "/services/oncology/chemo-port-insertion", body_region: "oncology" },
            { title: "Chemotherapy", href: "/services/oncology/chemotherapy", body_region: "oncology" },
        ]
    },
    {
        title: "PAIN MANAGEMENT",
        slug: "pain-management",
        href: "/services/pain-management",
        items: [
            { title: "Cancer Pain Management", href: "/services/pain-management/cancer-pain-management", body_region: "pain-management" },
        ]
    },
    {
        title: "VASCULAR SURGERY",
        slug: "vascular-surgery",
        href: "/services/vascular-surgery",
        items: [
            { title: "AV Fistula", href: "/services/vascular-surgery/av-fistula", body_region: "vascular" },
        ]
    },
    {
        title: "PLASTIC SURGERY",
        slug: "plastic-surgery",
        href: "/services/plastic-surgery",
        items: [
            { title: "Gynecomastia Surgery", href: "/services/plastic-surgery/gynecomastia-surgery", body_region: "plastic-surgery" },
        ]
    },
]

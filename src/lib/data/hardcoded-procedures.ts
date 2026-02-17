import { GroupedTreatmentCategory } from "./grouped-treatments"

export const HARDCODED_PROCEDURES: GroupedTreatmentCategory[] = [
    {
        title: "GENERAL & LAPAROSCOPIC",
        slug: "general-laparoscopic",
        href: "/departments/general-surgery",
        items: [
            { title: "Laparoscopic Surgery", href: "/procedures/laparoscopic-surgery", body_region: "abdomen" },
            { title: "Appendectomy", href: "/procedures/appendectomy", body_region: "abdomen" },
            { title: "Hernia Surgery", href: "/procedures/hernia-surgery", body_region: "abdomen" },
            { title: "Gallbladder Surgery", href: "/procedures/gallbladder-surgery", body_region: "abdomen" },
        ]
    },
    {
        title: "ORTHOPAEDICS",
        slug: "orthopedics",
        href: "/departments/orthopaedics",
        items: [
            { title: "Arthroscopy", href: "/procedures/arthroscopy", body_region: "legs" }, // Often knee/shoulder styling via legs/arms
            { title: "Knee Replacement", href: "/procedures/knee-replacement", body_region: "legs" },
            { title: "Hip Replacement", href: "/procedures/hip-replacement", body_region: "legs" },
            { title: "Spine Surgery", href: "/procedures/spine-surgery", body_region: "spine" },
        ]
    },
    {
        title: "ENT",
        slug: "ent",
        href: "/departments/ent",
        items: [
            { title: "Septoplasty", href: "/procedures/septoplasty", body_region: "ent" },
            { title: "Rhinoplasty", href: "/procedures/rhinoplasty", body_region: "ent" },
            { title: "Tonsillectomy", href: "/procedures/tonsillectomy", body_region: "ent" },
            { title: "Tympanoplasty", href: "/procedures/tympanoplasty", body_region: "ent" },
        ]
    },
    {
        title: "UROLOGY",
        slug: "urology",
        href: "/departments/urology",
        items: [
            { title: "URSL", href: "/procedures/ursl", body_region: "pelvis" },
            { title: "PCNL", href: "/procedures/pcnl", body_region: "pelvis" },
            { title: "ESWL", href: "/procedures/eswl", body_region: "pelvis" },
            { title: "Circumcision", href: "/procedures/circumcision", body_region: "pelvis" },
        ]
    },
    {
        title: "GYNAECOLOGY",
        slug: "gynecology",
        href: "/departments/gynaecology",
        items: [
            { title: "C-Section", href: "/procedures/c-section", body_region: "womens-health" },
            { title: "Hysterectomy", href: "/procedures/hysterectomy", body_region: "womens-health" },
            { title: "Myomectomy", href: "/procedures/myomectomy", body_region: "womens-health" },
        ]
    },
]

import {
    Heart, Brain, Bone, Stethoscope, Baby,
    Scissors, Dna, Ear, UserMinus,
    TestTube,
    Utensils,
    Wind,
    Sparkles, Siren, Activity,
    LucideIcon
} from "lucide-react"

export type NavItem = {
    title: string
    href: string
    icon?: any
    description?: string
}

export type MegaMenuSection = {
    title: string
    items: NavItem[]
    slug?: string
    href?: string
}

export const NAV_LINKS = [
    { title: "Home", href: "/" },
    { title: "About Hospital", href: "/about" },
    { title: "Doctors", href: "/doctors" },
    { title: "Blogs", href: "/blog" },
    { title: "Contact", href: "/contact" },
]

// MATCHING USER SCREENSHOT EXACTLY (15 Items)
export const DEPARTMENTS: NavItem[] = [
    { title: "Cosmetic & Plastic Surgery", href: "/departments/cosmetic-surgery", icon: Sparkles },
    { title: "Emergency, Trauma & Critical Care", href: "/departments/emergency", icon: Siren },
    { title: "ENT", href: "/departments/ent", icon: Ear },
    { title: "General Surgery", href: "/departments/general-surgery", icon: Scissors },
    { title: "General Medicine", href: "/departments/general-medicine", icon: Stethoscope },
    { title: "GI & Bariatric Surgery", href: "/departments/bariatric", icon: Utensils },
    { title: "Gynaecology & Obstetrics", href: "/departments/gynaecology", icon: Baby },
    { title: "Neurosurgery", href: "/departments/neurosurgery", icon: Brain },
    { title: "Oncology", href: "/departments/oncology", icon: Dna },
    { title: "Orthopaedics", href: "/departments/orthopaedics", icon: Bone },
    { title: "Pain Management", href: "/departments/pain-management", icon: Activity },
    { title: "Proctology", href: "/departments/proctology", icon: UserMinus },
    { title: "Pulmonology", href: "/departments/pulmonology", icon: Wind },
    { title: "Urology", href: "/departments/urology", icon: TestTube },
    { title: "Vascular Surgery", href: "/departments/vascular", icon: Heart },
]

export const TREATMENTS: MegaMenuSection[] = [
    {
        title: "GENERAL & LAPAROSCOPIC",
        slug: "general-laparoscopic",
        items: [
            { title: "Appendicitis", href: "/treatments/appendicitis" },
            { title: "Gallstone", href: "/treatments/gallstone" },
            { title: "Hernia", href: "/treatments/hernia" },
            { title: "Umbilical Hernia", href: "/treatments/umbilical-hernia" },
            { title: "Inguinal Hernia", href: "/treatments/inguinal-hernia" },
            { title: "Incisional Hernia", href: "/treatments/incisional-hernia" },
            { title: "Minimally Invasive Surgery", href: "/treatments/minimally-invasive-surgery" },
        ]
    },
    {
        title: "ORTHOPEDICS",
        slug: "orthopedics",
        items: [
            { title: "Back Pain", href: "/treatments/back-pain" },
            { title: "Neck Pain", href: "/treatments/neck-pain" },
            { title: "Knee Pain", href: "/treatments/knee-pain" },
            { title: "Shoulder Pain", href: "/treatments/shoulder-pain" },
            { title: "Hip Pain", href: "/treatments/hip-pain" },
            { title: "Total Knee Replacement", href: "/treatments/total-knee-replacement" },
            { title: "Spine Surgery", href: "/treatments/spine-surgery" },
            { title: "Rotator Cuff Repair", href: "/treatments/rotator-cuff-repair" },
            { title: "Shoulder Arthroscopy", href: "/treatments/shoulder-arthroscopy" },
            { title: "Shoulder Dislocation", href: "/treatments/shoulder-dislocation" },
            { title: "Shoulder Replacement", href: "/treatments/shoulder-replacement" },
            { title: "Sports Injury", href: "/treatments/sports-injury" },
            { title: "Meniscus Tear", href: "/treatments/meniscus-tear" },
        ]
    },
    {
        title: "UROLOGY",
        slug: "urology",
        items: [
            { title: "Kidney Stones", href: "/treatments/kidney-stones" },
            { title: "Enlarged Prostate", href: "/treatments/enlarged-prostate" },
            { title: "PCNL", href: "/treatments/pcnl" },
            { title: "URSL", href: "/treatments/ursl" },
            { title: "Circumcision", href: "/treatments/circumcision" },
            { title: "Varicocele", href: "/treatments/varicocele" },
            { title: "Paraphimosis", href: "/treatments/paraphimosis" },
            { title: "Phimosis", href: "/treatments/phimosis" },
            { title: "Prostatectomy", href: "/treatments/prostatectomy" },
            { title: "RIRS", href: "/treatments/rirs" },
            { title: "Stapler Circumcision", href: "/treatments/stapler-circumcision" },
            { title: "Swollen Penis", href: "/treatments/swollen-penis" },
        ]
    },
    {
        title: "GYNECOLOGY",
        slug: "gynecology",
        items: [
            { title: "Uterine Fibroids", href: "/treatments/uterine-fibroids" },
            { title: "High Risk Pregnancy", href: "/treatments/high-risk-pregnancy" },
            { title: "Pelvic Floor Disorders", href: "/treatments/pelvic-floor-disorders" },
            { title: "Hysterectomy", href: "/treatments/hysterectomy" },
            { title: "Labiaplasty", href: "/treatments/labiaplasty" },
            { title: "Vaginoplasty", href: "/treatments/vaginoplasty" },
            { title: "Monsplasty", href: "/treatments/monsplasty" },
            { title: "Postpartum Care", href: "/treatments/postpartum-care" },
            { title: "Prenatal Care", href: "/treatments/prenatal-care" },
            { title: "Surgical Interventions", href: "/treatments/surgical-interventions" },
        ]
    },
    {
        title: "ENT",
        slug: "ent",
        items: [
            { title: "Septoplasty", href: "/treatments/septoplasty" },
            { title: "Rhinoplasty", href: "/treatments/rhinoplasty" },
            { title: "Tonsillectomy", href: "/treatments/tonsillectomy" },
            { title: "Nasal Polyps", href: "/treatments/nasal-polyps" },
            { title: "Sinus Treatment", href: "/treatments/sinus-treatment" },
            { title: "Vocal Cord Polyps", href: "/treatments/vocal-cord-polyps" },
            { title: "Mastoidectomy", href: "/treatments/mastoidectomy" },
            { title: "Myringotomy", href: "/treatments/myringotomy" },
            { title: "Stapedectomy", href: "/treatments/stapedectomy" },
            { title: "Throat Surgery", href: "/treatments/throat-surgery" },
            { title: "Turbinate Reduction", href: "/treatments/turbinate-reduction" },
            { title: "Tympanoplasty", href: "/treatments/tympanoplasty" },
        ]
    },
    {
        title: "PSYCHIATRY",
        slug: "psychiatry",
        items: [
            { title: "Mental Health", href: "/treatments/mental-health" },
        ]
    },
    {
        title: "ENDOCRINOLOGY",
        slug: "endocrinology",
        items: [
            { title: "Metabolic & Endocrine Disorders", href: "/treatments/metabolic-endocrine-disorders" },
            { title: "Thyroidectomy", href: "/treatments/thyroidectomy" },
        ]
    },
    {
        title: "PROCTOLOGY",
        slug: "proctology",
        items: [
            { title: "Perianal Abscess", href: "/treatments/perianal-abscess" },
            { title: "Piles (Hemorrhoids)", href: "/treatments/piles-hemorrhoids" },
            { title: "Pilonidal Sinus", href: "/treatments/pilonidal-sinus" },
            { title: "Rectal Prolapse", href: "/treatments/rectal-prolapse" },
        ]
    },

    {
        title: "VASCULAR SURGERY",
        slug: "vascular-surgery",
        items: [
            { title: "Varicose Veins", href: "/treatments/varicose-veins" },
            { title: "DVT Treatment", href: "/treatments/dvt-treatment" }, // Placeholder for future
            { title: "Diabetic Foot Ulcer", href: "/treatments/diabetic-foot-ulcer" }, // Placeholder for future
        ]
    },
]

export const PROCEDURES: MegaMenuSection[] = [
    {
        title: "GENERAL & LAPAROSCOPIC",
        slug: "general-bariatric", // Corrected slug based on departments
        items: [
            { title: "Laparoscopic Surgery", href: "/procedures/laparoscopic-surgery" },
            { title: "Appendectomy", href: "/procedures/appendectomy" },
            { title: "Hernia Surgery", href: "/procedures/hernia-surgery" },
            { title: "Gallbladder Surgery", href: "/procedures/gallbladder-surgery" },
        ]
    },
    {
        title: "ORTHOPAEDICS",
        slug: "orthopaedics",
        items: [
            { title: "Arthroscopy", href: "/procedures/arthroscopy" },
            { title: "Knee Replacement", href: "/procedures/knee-replacement" },
            { title: "Hip Replacement", href: "/procedures/hip-replacement" },
            { title: "Spine Surgery", href: "/procedures/spine-surgery" },
        ]
    },
    {
        title: "ENT",
        slug: "ent",
        items: [
            { title: "Septoplasty", href: "/procedures/septoplasty" },
            { title: "Rhinoplasty", href: "/procedures/rhinoplasty" },
            { title: "Tonsillectomy", href: "/procedures/tonsillectomy" },
            { title: "Tympanoplasty", href: "/procedures/tympanoplasty" },
        ]
    },
    {
        title: "UROLOGY",
        slug: "urology",
        items: [
            { title: "URSL", href: "/procedures/ursl" },
            { title: "PCNL", href: "/procedures/pcnl" },
            { title: "ESWL", href: "/procedures/eswl" },
            { title: "Circumcision", href: "/procedures/circumcision" },
        ]
    },
    {
        title: "GYNAECOLOGY",
        slug: "gynaecology",
        items: [
            { title: "C-Section", href: "/procedures/c-section" },
            { title: "Hysterectomy", href: "/procedures/hysterectomy" },
            { title: "Myomectomy", href: "/procedures/myomectomy" },
        ]
    },
]

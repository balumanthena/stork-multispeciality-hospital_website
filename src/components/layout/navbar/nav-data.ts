import {
    Heart, Brain, Bone, Stethoscope, Baby,
    Scissors, Dna, Ear, UserMinus,
    TestTube,
    Utensils,
    Wind,
    Sparkles, Siren, Activity,
    LucideIcon
} from "lucide-react"
import { HARDCODED_PROCEDURES } from "@/lib/data/hardcoded-procedures"

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
    { title: "Cosmetic & Plastic Surgery", href: "/services/cosmetic-surgery", icon: Sparkles },
    { title: "Emergency, Trauma & Critical Care", href: "/services/emergency", icon: Siren },
    { title: "ENT", href: "/services/ent", icon: Ear },
    { title: "General Surgery", href: "/services/general-surgery", icon: Scissors },
    { title: "General Medicine", href: "/services/general-medicine", icon: Stethoscope },
    { title: "GI & Bariatric Surgery", href: "/services/bariatric", icon: Utensils },
    { title: "Gynaecology & Obstetrics", href: "/services/gynaecology", icon: Baby },
    { title: "Neurosurgery", href: "/services/neurosurgery", icon: Brain },
    { title: "Oncology", href: "/services/oncology", icon: Dna },
    { title: "Orthopaedics", href: "/services/orthopaedics", icon: Bone },
    { title: "Pain Management", href: "/services/pain-management", icon: Activity },
    { title: "Proctology", href: "/services/proctology", icon: UserMinus },
    { title: "Pulmonology", href: "/services/pulmonology", icon: Wind },
    { title: "Urology", href: "/services/urology", icon: TestTube },
    { title: "Vascular Surgery", href: "/services/vascular", icon: Heart },
]

export const TREATMENTS: MegaMenuSection[] = [
    {
        title: "GENERAL & LAPAROSCOPIC",
        slug: "general-laparoscopic",
        items: [
            { title: "Appendicitis", href: "/services/general-laparoscopic/appendicitis" },
            { title: "Gallstone", href: "/services/general-laparoscopic/gallstone" },
            { title: "Hernia", href: "/services/general-laparoscopic/hernia" },
            { title: "Umbilical Hernia", href: "/services/general-laparoscopic/umbilical-hernia" },
            { title: "Inguinal Hernia", href: "/services/general-laparoscopic/inguinal-hernia" },
            { title: "Incisional Hernia", href: "/services/general-laparoscopic/incisional-hernia" },
            { title: "Minimally Invasive Surgery", href: "/services/general-laparoscopic/minimally-invasive-surgery" },
        ]
    },
    {
        title: "ORTHOPEDICS",
        slug: "orthopedics",
        items: [
            { title: "Back Pain", href: "/services/orthopedics/back-pain" },
            { title: "Neck Pain", href: "/services/orthopedics/neck-pain" },
            { title: "Knee Pain", href: "/services/orthopedics/knee-pain" },
            { title: "Shoulder Pain", href: "/services/orthopedics/shoulder-pain" },
            { title: "Hip Pain", href: "/services/orthopedics/hip-pain" },
            { title: "Total Knee Replacement", href: "/services/orthopedics/total-knee-replacement" },
            { title: "Spine Surgery", href: "/services/orthopedics/spine-surgery" },
            { title: "Rotator Cuff Repair", href: "/services/orthopedics/rotator-cuff-repair" },
            { title: "Shoulder Arthroscopy", href: "/services/orthopedics/shoulder-arthroscopy" },
            { title: "Shoulder Dislocation", href: "/services/orthopedics/shoulder-dislocation" },
            { title: "Shoulder Replacement", href: "/services/orthopedics/shoulder-replacement" },
            { title: "Sports Injury", href: "/services/orthopedics/sports-injury" },
            { title: "Meniscus Tear", href: "/services/orthopedics/meniscus-tear" },
        ]
    },
    {
        title: "UROLOGY",
        slug: "urology",
        items: [
            { title: "Kidney Stones", href: "/services/urology/kidney-stones" },
            { title: "Enlarged Prostate", href: "/services/urology/enlarged-prostate" },
            { title: "PCNL", href: "/services/urology/pcnl" },
            { title: "URSL", href: "/services/urology/ursl" },
            { title: "Circumcision", href: "/services/urology/circumcision" },
            { title: "Varicocele", href: "/services/urology/varicocele" },
            { title: "Paraphimosis", href: "/services/urology/paraphimosis" },
            { title: "Phimosis", href: "/services/urology/phimosis" },
            { title: "Prostatectomy", href: "/services/urology/prostatectomy" },
            { title: "RIRS", href: "/services/urology/rirs" },
            { title: "Stapler Circumcision", href: "/services/urology/stapler-circumcision" },
            { title: "Swollen Penis", href: "/services/urology/swollen-penis" },
        ]
    },
    {
        title: "GYNECOLOGY",
        slug: "gynecology",
        items: [
            { title: "Uterine Fibroids", href: "/services/gynecology/uterine-fibroids" },
            { title: "High Risk Pregnancy", href: "/services/gynecology/high-risk-pregnancy" },
            { title: "Pelvic Floor Disorders", href: "/services/gynecology/pelvic-floor-disorders" },
            { title: "Hysterectomy", href: "/services/gynecology/hysterectomy" },
            { title: "Labiaplasty", href: "/services/gynecology/labiaplasty" },
            { title: "Vaginoplasty", href: "/services/gynecology/vaginoplasty" },
            { title: "Monsplasty", href: "/services/gynecology/monsplasty" },
            { title: "Postpartum Care", href: "/services/gynecology/postpartum-care" },
            { title: "Prenatal Care", href: "/services/gynecology/prenatal-care" },
            { title: "Surgical Interventions", href: "/services/gynecology/surgical-interventions" },
        ]
    },
    {
        title: "ENT",
        slug: "ent",
        items: [
            { title: "Septoplasty", href: "/services/ent/septoplasty" },
            { title: "Rhinoplasty", href: "/services/ent/rhinoplasty" },
            { title: "Tonsillectomy", href: "/services/ent/tonsillectomy" },
            { title: "Nasal Polyps", href: "/services/ent/nasal-polyps" },
            { title: "Sinus Treatment", href: "/services/ent/sinus-treatment" },
            { title: "Vocal Cord Polyps", href: "/services/ent/vocal-cord-polyps" },
            { title: "Mastoidectomy", href: "/services/ent/mastoidectomy" },
            { title: "Myringotomy", href: "/services/ent/myringotomy" },
            { title: "Stapedectomy", href: "/services/ent/stapedectomy" },
            { title: "Throat Surgery", href: "/services/ent/throat-surgery" },
            { title: "Turbinate Reduction", href: "/services/ent/turbinate-reduction" },
            { title: "Tympanoplasty", href: "/services/ent/tympanoplasty" },
        ]
    },
    {
        title: "PSYCHIATRY",
        slug: "psychiatry",
        items: [
            { title: "Mental Health", href: "/services/psychiatry/mental-health" },
        ]
    },
    {
        title: "ENDOCRINOLOGY",
        slug: "endocrinology",
        items: [
            { title: "Metabolic & Endocrine Disorders", href: "/services/endocrinology/metabolic-endocrine-disorders" },
            { title: "Thyroidectomy", href: "/services/endocrinology/thyroidectomy" },
        ]
    },
    {
        title: "PROCTOLOGY",
        slug: "proctology",
        items: [
            { title: "Perianal Abscess", href: "/services/proctology/perianal-abscess" },
            { title: "Piles (Hemorrhoids)", href: "/services/proctology/piles-hemorrhoids" },
            { title: "Pilonidal Sinus", href: "/services/proctology/pilonidal-sinus" },
            { title: "Rectal Prolapse", href: "/services/proctology/rectal-prolapse" },
        ]
    },

    {
        title: "VASCULAR SURGERY",
        slug: "vascular-surgery",
        items: [
            { title: "Varicose Veins", href: "/services/vascular-surgery/varicose-veins" },
            { title: "DVT Treatment", href: "/services/vascular-surgery/dvt-treatment" }, // Placeholder for future
            { title: "Diabetic Foot Ulcer", href: "/services/vascular-surgery/diabetic-foot-ulcer" }, // Placeholder for future
        ]
    },
]

export const PROCEDURES = HARDCODED_PROCEDURES

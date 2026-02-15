
import {
    Heart, Brain, Bone, Stethoscope, Baby, Eye, Activity,
    Scissors, Dna, Ear, UserMinus, ShieldAlert,
    Pill, TestTube, Microscope, Syringe, Ambulance,
    Thermometer,
    Accessibility,
    BadgeAlert,
    BicepsFlexed,
    PersonStanding,
    Siren,
    Sparkles,
    Utensils,
    Wind
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
        title: "BONE & JOINT",
        items: [
            { title: "Back Pain", href: "/treatments/back-pain" },
            { title: "Neck Pain", href: "/treatments/neck-pain" },
            { title: "Knee Pain", href: "/treatments/knee-pain" },
            { title: "Shoulder Pain", href: "/treatments/shoulder-pain" },
            { title: "Hip Pain", href: "/treatments/hip-pain" },
            { title: "Sports Injuries", href: "/treatments/sports-injuries" },
            { title: "Fractures", href: "/treatments/fractures" },
        ]
    },
    {
        title: "DIGESTIVE & ABDOMINAL",
        items: [
            { title: "Hernia", href: "/treatments/hernia" },
            { title: "Gallstones", href: "/treatments/gallstones" },
            { title: "Appendicitis", href: "/treatments/appendicitis" },
            { title: "Piles", href: "/treatments/piles" },
            { title: "Anal Fissure", href: "/treatments/anal-fissure" },
            { title: "Anal Fistula", href: "/treatments/anal-fistula" },
            { title: "Pilonidal Sinus", href: "/treatments/pilonidal-sinus" },
        ]
    },
    {
        title: "KIDNEY & URINARY",
        items: [
            { title: "Kidney Stones", href: "/treatments/kidney-stones" },
            { title: "Enlarged Prostate", href: "/treatments/enlarged-prostate" },
            { title: "Hydrocele", href: "/treatments/hydrocele" },
            { title: "Varicocele", href: "/treatments/varicocele" },
            { title: "Phimosis", href: "/treatments/phimosis" },
            { title: "Paraphimosis", href: "/treatments/paraphimosis" },
        ]
    },
    {
        title: "WOMEN’S HEALTH",
        items: [
            { title: "Uterine Fibroids", href: "/treatments/uterine-fibroids" },
            { title: "Endometriosis", href: "/treatments/endometriosis" },
            { title: "High-Risk Pregnancy", href: "/treatments/high-risk-pregnancy" },
            { title: "Pelvic Floor", href: "/treatments/pelvic-floor" },
            { title: "Postpartum Care", href: "/treatments/postpartum-care" },
        ]
    },
    {
        title: "ENT PROBLEMS",
        items: [
            { title: "Sinus Issues", href: "/treatments/sinus-issues" },
            { title: "Nasal Polyps", href: "/treatments/nasal-polyps" },
            { title: "Throat Problems", href: "/treatments/throat-problems" },
            { title: "Hearing Issues", href: "/treatments/hearing-issues" },
        ]
    },
]

export const PROCEDURES: MegaMenuSection[] = [
    {
        title: "GENERAL & LAPAROSCOPIC",
        items: [
            { title: "Laparoscopic Surgery", href: "/procedures/laparoscopic-surgery" },
            { title: "Appendectomy", href: "/procedures/appendectomy" },
            { title: "Hernia Surgery", href: "/procedures/hernia-surgery" },
            { title: "Gallbladder Surgery", href: "/procedures/gallbladder-surgery" },
        ]
    },
    {
        title: "ORTHOPAEDICS",
        items: [
            { title: "Arthroscopy", href: "/procedures/arthroscopy" },
            { title: "Knee Replacement", href: "/procedures/knee-replacement" },
            { title: "Hip Replacement", href: "/procedures/hip-replacement" },
            { title: "Spine Surgery", href: "/procedures/spine-surgery" },
        ]
    },
    {
        title: "ENT",
        items: [
            { title: "Septoplasty", href: "/procedures/septoplasty" },
            { title: "Rhinoplasty", href: "/procedures/rhinoplasty" },
            { title: "Tonsillectomy", href: "/procedures/tonsillectomy" },
            { title: "Tympanoplasty", href: "/procedures/tympanoplasty" },
        ]
    },
    {
        title: "UROLOGY",
        items: [
            { title: "URSL", href: "/procedures/ursl" },
            { title: "PCNL", href: "/procedures/pcnl" },
            { title: "ESWL", href: "/procedures/eswl" },
            { title: "Circumcision", href: "/procedures/circumcision" },
        ]
    },
    {
        title: "GYNAECOLOGY",
        items: [
            { title: "C-Section", href: "/procedures/c-section" },
            { title: "Hysterectomy", href: "/procedures/hysterectomy" },
            { title: "Myomectomy", href: "/procedures/myomectomy" },
        ]
    },
]

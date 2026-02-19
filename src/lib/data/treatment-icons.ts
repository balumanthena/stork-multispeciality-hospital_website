import {
    Activity, Heart, Brain, Bone, Stethoscope, Baby,
    Scissors, Dna, Ear, UserMinus, TestTube, Utensils,
    Wind, Sparkles, Siren, Eye, Smile, Tablet,
    Thermometer, Microscope, Syringe, Pill,
    Bandage, Cross, HeartPulse,
    Accessibility, Bluetooth as Tooth, Scale,
    LucideIcon, Footprints, Zap, Droplets, Layers,
    CircleDot, Volume2, User, UserCheck, Stethoscope as GeneralMed
} from "lucide-react"

// Default Icon
const DEFAULT_ICON = Activity

// 1. Department/Category Icons (Fallback)
export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
    "General Surgery": Scissors,
    "Orthopedics": Bone,
    "Urology & Andrology": TestTube,
    "ENT": Ear,
    "Gynecology": Baby,
    "Obstetrics": Baby,
    "General Medicine": Stethoscope,
    "Bariatric & Weight Management": Scale,
    "Podiatry": Footprints,
    "Endocrinology": Activity,
    "Gastroenterology": Utensils,
    "Neurology": Brain,
    "Oncology": Dna,
    "Psychiatry": Brain,
    "Pulmonology": Wind,
    "Vascular": HeartPulse,
    "Vascular Surgery": HeartPulse,
    "Cosmetic & Plastic Surgery": Sparkles,
    "Emergency, Trauma & Critical Care": Siren,
    "Pain Management": Zap,
    "cancer-pain-management": Zap,
    "Proctology": UserMinus,
}

// 2. Specific Treatment Icons (Premium Overrides)
export const SLUG_ICON_MAP: Record<string, LucideIcon> = {
    // --- General Surgery ---
    "anal-fissure": CircleDot,
    "anal-fistula": CircleDot,
    "appendicitis": Layers,
    "fissure-surgery": CircleDot,
    "gallstone": Activity, // Or something representing stones?
    "hernia": Layers,
    "hydrocele": Droplets,
    "incisional-hernia": Layers,
    "inguinal-hernia": Layers,
    "minimally-invasive-surgery": Microscope, // Precision
    "perianal-abscess": CircleDot,
    "piles-hemorrhoids": CircleDot,
    "pilonidal-sinus": CircleDot,
    "surgical-interventions": Scissors,
    "umbilical-hernia": Layers,
    "varicose-veins": Activity,

    // --- Orthopedics ---
    "arthroscopy-surgery": Microscope, // Scope
    "back-pain": Accessibility, // Spine/Back
    "elbow-pain": Accessibility,
    "foot-or-ankle-pain": Footprints,
    "hip-pain": Accessibility,
    "hip-replacement-surgery": Bone,
    "knee-arthroscopy": Microscope,
    "knee-pain": Accessibility, // Or Activity (walking)
    "meniscus-tear": Layers, // Tissue tear
    "neck-pain": Accessibility,
    "rotator-cuff-repair": Activity,
    "shoulder-arthroscopy": Microscope,
    "shoulder-dislocation": Bone,
    "shoulder-pain": Accessibility,
    "shoulder-replacement": Bone,
    "spine-surgery": Activity,
    "sports-injury": Activity, // Running/Active
    "total-knee-replacement": Bone,

    // --- Urology ---
    "balanitis": User,
    "balanoposthitis": User,
    "circumcision": Scissors,
    "enlarged-prostate": UserMinus,
    "eswl": Zap, // Shock waves
    "foreskin-infection": User,
    "frenuloplasty-surgery": Scissors,
    "kidney-stones": Droplets,
    "paraphimosis": User,
    "pcnl": Microscope, // Percutaneous
    "phimosis": User,
    "rirs": Microscope, // Retrograde
    "stapler-circumcision": Scissors,
    "swollen-penis": User,
    "ursl": Droplets, // Stones
    "varicocele": Activity,

    // --- ENT ---
    "adenoidectomy": Wind, // Breathing
    "ear-surgery": Ear,
    "mastoidectomy": Ear,
    "myringotomy": Ear,
    "nasal-polyps": Wind,
    "rhinoplasty": Sparkles,
    "septoplasty": Wind, // Breathing air
    "sinus-treatment": Wind,
    "stapedectomy": Ear,
    "throat-surgery": Volume2, // Voice/Throat
    "thyroidectomy": Activity,
    "tonsillectomy": Volume2,
    "turbinate-reduction": Wind,
    "tympanoplasty": Ear,
    "vocal-cord-polyps": Volume2,

    // --- Gynecology ---
    "fertility-services": Baby,
    "ectopic-pregnancy-surgery": Baby,
    "endometriosis-surgery": Layers,
    "hoodecomy": Scissors, // Cosmetic Gyn
    "hymenoplasty": Sparkles,
    "hysterectomy": UserMinus,
    "mtp": Baby,
    "labiaplasty": Sparkles,
    "monsplasty": Sparkles,
    "painless-delivery": Baby,
    "pelvic-floor-disorders": Accessibility,
    "rectal-prolapse": CircleDot,
    "uterine-fibroids": Layers, // Tissue
    "uterine-fibroids-surgery": Layers,
    "vaginoplasty": Sparkles,
    "vestoplasty": Sparkles,

    // --- Obstetrics ---
    "antepartum-monitoring": Activity, // Monitoring
    "high-risk-pregnancy": Baby,
    "labor-delivery": Baby,
    "postpartum-care": Baby,
    "prenatal-care": Baby,
    "c-section": Baby,

    // --- General Medicine ---
    "chronic-disease-management": Stethoscope,
    "diagnostic-procedure": Microscope,
    "management-of-infections": Pill,

    // --- Bariatric ---
    "bariatric-surgery": Scale,
    "intragastric-balloon": Scale,

    // --- Podiatry ---
    "corn-removal": Footprints,
    "lipoma-removal": Scissors,
    "diabetic-foot-ulcer": Footprints,

    // --- Endocrinology ---
    "metabolic-endocrine-disorders": Activity,

    // --- Gastroenterology ---
    "gastrointestinal-issues": Utensils,

    // --- Neurology ---
    "headache-or-migraine": Brain,

    // --- Oncology ---
    "cancer-care": Dna,
    "breast-lump-surgery": Dna,
    "chemo-port-insertion": Dna,
    "chemotherapy": Dna,

    // --- Psychiatry ---
    "mental-health": Brain,

    // --- Orthopedics ---
    "fracture-surgery": Activity,
    "kyphoplasty": Activity,
    "vertebroplasty": Activity,

    // --- Plastic Surgery ---
    "gynecomastia-surgery": User,

    // --- Pulmonology ---
    "respiratory": Wind,

    // --- Vascular ---
    "dvt-treatment": HeartPulse,
    "endoscopic-keyhole-discectomy": Activity,

    // --- Urology ---
    "hydrocelectomy": Activity,
    "prostatectomy": Activity,
    "prostatomegaly": Activity,
}

export function getTreatmentIcon(slug: string, category: string): LucideIcon {
    // 1. Check specific slug map
    if (SLUG_ICON_MAP[slug]) {
        return SLUG_ICON_MAP[slug]
    }

    // 2. Check category map
    // Normalize category name to match keys (sometimes casing/spacing differs)
    // We try exact match first
    if (CATEGORY_ICON_MAP[category]) {
        return CATEGORY_ICON_MAP[category]
    }

    // Try finding partial match for category
    const catKeys = Object.keys(CATEGORY_ICON_MAP)
    const foundKey = catKeys.find(key => category.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(category.toLowerCase()))
    if (foundKey) {
        return CATEGORY_ICON_MAP[foundKey]
    }

    // 3. Fallback
    return DEFAULT_ICON
}

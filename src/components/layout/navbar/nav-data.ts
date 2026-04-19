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
import { HARDCODED_TREATMENTS } from "@/lib/data/hardcoded-treatments"
import { TREATMENTS_MASTER } from "@/lib/data/treatments"

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
    { title: "Videos", href: "/videos" },
    { title: "Contact", href: "/contact" },
]

// Mapping icons to our 15 unified departments
const DEPT_ICON_MAP: Record<string, any> = {
    "Cosmetic & Plastic Surgery": Sparkles,
    "ENT": Ear,
    "General Surgery": Scissors,
    "General Medicine": Stethoscope,
    "GI & Bariatric Surgery": Utensils,
    "Gynecology & Obstetrics": Baby,
    "Neurosurgery": Brain,
    "Oncology": Dna,
    "Orthopedics & Trauma": Bone,
    "Pain Management": Activity,
    "Proctology": UserMinus,
    "Pulmonology": Wind,
    "Urology": TestTube,
    "Vascular Surgery": Heart,
    "Spine Care": Activity, // Defaulting to Activity for Spine Care
};

// MATCHING USER MASTER DATA (15 Items + Emergency)
export const DEPARTMENTS: NavItem[] = [
    ...Array.from(new Set(TREATMENTS_MASTER.map(t => t.department))).map(name => {
        const item = HARDCODED_TREATMENTS.find(h => h.title === name);
        return {
            title: name,
            href: item?.href || "/services",
            icon: DEPT_ICON_MAP[name] || Activity
        };
    }),
    { title: "Emergency, Trauma & Critical Care", href: "/services/emergency", icon: Siren },
];

// Dynamically building TREATMENTS from master data for the mega menu
export const TREATMENTS: MegaMenuSection[] = HARDCODED_TREATMENTS.map(group => ({
    title: group.title.toUpperCase(),
    slug: group.slug,
    items: group.items.map(item => ({
        title: item.title,
        href: item.href
    }))
}));

export const PROCEDURES = HARDCODED_PROCEDURES

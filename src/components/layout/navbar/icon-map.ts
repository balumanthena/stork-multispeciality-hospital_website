import {
    Heart, Brain, Bone, Stethoscope, Baby, Eye, Activity,
    Scissors, Dna, Ear, UserMinus, ShieldAlert,
    Pill, TestTube, Microscope, Syringe, Ambulance,
    Thermometer, Sparkles, Utensils, Wind, ShieldCheck,
    CheckCircle2, Star, Quote, User, MapPin, Clock, Check,
    Accessibility, BadgeAlert, BicepsFlexed, PersonStanding, Siren,
    LucideIcon
} from "lucide-react"

export const ICON_MAP: Record<string, LucideIcon> = {
    Heart, Brain, Bone, Stethoscope, Baby, Eye, Activity,
    Scissors, Dna, Ear, UserMinus, ShieldAlert,
    Pill, TestTube, Microscope, Syringe, Ambulance,
    Thermometer, Sparkles, Utensils, Wind, ShieldCheck,
    CheckCircle2, Star, Quote, User, MapPin, Clock, Check,
    Accessibility, BadgeAlert, BicepsFlexed, PersonStanding, Siren
}

export function getIconByName(name: string) {
    return ICON_MAP[name] || Activity
}

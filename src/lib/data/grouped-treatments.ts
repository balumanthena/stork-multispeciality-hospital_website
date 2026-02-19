import { cache } from 'react'
import { HARDCODED_TREATMENTS } from './hardcoded-treatments'

export type BodyRegion =
    | "head"
    | "ent"
    | "chest"
    | "heart"
    | "abdomen"
    | "pelvis"
    | "womens-health"
    | "spine"
    | "arms"
    | "legs"
    | "skin-oncology"
    | "mental-health"
    | "oncology"
    | "vascular"
    | "plastic-surgery"
    | "pain-management"

export type GroupedTreatmentCategory = {
    title: string;
    slug: string;
    href: string;
    display_order?: number;
    items: {
        title: string;
        href: string;
        body_region: BodyRegion;
    }[];
}

export const getGroupedTreatments = cache(async () => {
    // Return hardcoded data as requested to bypass DB schema issues and ensure content matches
    return HARDCODED_TREATMENTS
})

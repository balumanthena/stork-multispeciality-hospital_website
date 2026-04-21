
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


export interface MasterTreatment {
    id: number;
    name: string;
    department: string;
    slug: string;
    href: string;
    body_region: string;
}

export const slugify = (name: string) => {
    return name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\s+/g, "-")
        .replace(/\//g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
};

const getBodyRegion = (dept: string, name: string): string => {
    const n = name.toLowerCase();
    const d = dept.toLowerCase();

    if (d.includes("pain management")) return "pain-management";
    if (d.includes("gynecology") || d.includes("obstetrics")) return "womens-health";
    if (d.includes("orthopedics")) {
        if (n.includes("foot") || n.includes("ankle") || n.includes("knee") || n.includes("hip") || n.includes("leg")) return "legs";
        if (n.includes("elbow") || n.includes("shoulder") || n.includes("arm")) return "arms";
        if (n.includes("back") || n.includes("neck") || n.includes("spine")) return "spine";
        return "legs";
    }
    if (d.includes("spine care")) return "spine";
    if (d.includes("vascular")) return "vascular";
    if (d.includes("urology")) return "pelvis";
    if (d.includes("oncology")) return "oncology";
    if (d.includes("proctology")) return "pelvis";
    if (d.includes("cosmetic") || d.includes("plastic")) return "plastic-surgery";
    if (d.includes("ent")) return "ent";
    if (d.includes("gi") || d.includes("bariatric")) return "abdomen";
    if (d.includes("neurosurgery")) return "head";
    if (d.includes("pulmonology")) return "chest";
    if (d.includes("general medicine")) {
        if (n.includes("foot")) return "legs";
        if (n.includes("mental")) return "mental-health";
        return "chest";
    }
    if (d.includes("general surgery")) {
        if (n.includes("corn")) return "legs";
        return "abdomen";
    }
    return "abdomen";
};

export const TREATMENTS_MASTER: MasterTreatment[] = [
    { id: 1, name: "Piles", department: "Proctology" },
    { id: 2, name: "Anal fistulas", department: "Proctology" },
    { id: 3, name: "anal fissure", department: "Proctology" },
    { id: 4, name: "Pilonidal sinus", department: "Proctology" },
    { id: 5, name: "Perianth abscess", department: "Proctology" },
    { id: 6, name: "Stapler circumcision", department: "Urology" },
    { id: 7, name: "laser circumsession", department: "Urology" },
    { id: 8, name: "varicocele", department: "Urology" },
    { id: 9, name: "Hydrocele", department: "Urology" },
    { id: 10, name: "Incisional hernia", department: "General Surgery" },
    { id: 11, name: "Inguinal hernia", department: "General Surgery" },
    { id: 12, name: "Umbilical hernia", department: "General Surgery" },
    { id: 13, name: "Appendicitis", department: "General Surgery" },
    { id: 14, name: "Gall stones", department: "General Surgery" },
    { id: 15, name: "Diabetic foot", department: "General Medicine" },
    { id: 16, name: "Varicose veins", department: "Vascular Surgery" },
    { id: 17, name: "DVT", department: "Vascular Surgery" },
    { id: 18, name: "TKR", department: "Orthopedics & Trauma" },
    { id: 19, name: "Hip replacement", department: "Orthopedics & Trauma" },
    { id: 20, name: "Knee Arthroscopy", department: "Orthopedics & Trauma" },
    { id: 21, name: "Shoulder Arthroscopy", department: "Orthopedics & Trauma" },
    { id: 22, name: "Meniscus tear", department: "Orthopedics & Trauma" },
    { id: 23, name: "Endoscopic interlaminar", department: "Spine Care" },
    { id: 24, name: "Transforaminal endoscopic", department: "Spine Care" },
    { id: 25, name: "Headach migraine", department: "Pain Management" },
    { id: 26, name: "Backpain", department: "Pain Management" },
    { id: 27, name: "PLDD", department: "Spine Care" },
    { id: 28, name: "Neck pain", department: "Pain Management" },
    { id: 29, name: "Shoulder pain", department: "Pain Management" },
    { id: 30, name: "Elbow pain", department: "Orthopedics & Trauma" },
    { id: 31, name: "Carpal tunnel syndrome", department: "Orthopedics & Trauma" },
    { id: 32, name: "Cancer pain", department: "Pain Management" },
    { id: 33, name: "Hip pain", department: "Orthopedics & Trauma" },
    { id: 34, name: "Knee pain", department: "Orthopedics & Trauma" },
    { id: 35, name: "Foot and ankle pain", department: "Orthopedics & Trauma" },
    { id: 36, name: "Regenerative therapy (PRP)", department: "Pain Management" },
    { id: 37, name: "Antepartum and intrapartum", department: "Gynecology & Obstetrics" },
    { id: 38, name: "High risk pregnancy", department: "Gynecology & Obstetrics" },
    { id: 39, name: "Painless delivery", department: "Gynecology & Obstetrics" },
    { id: 40, name: "Parental care", department: "Gynecology & Obstetrics" },
    { id: 41, name: "Postpartum care", department: "Gynecology & Obstetrics" },
    { id: 42, name: "Hysterectomy", department: "Gynecology & Obstetrics" },
    { id: 43, name: "Tubectomy ( family planning)", department: "Gynecology & Obstetrics" },
    { id: 44, name: "MTP", department: "Gynecology & Obstetrics" },
    { id: 45, name: "Hymenoplasty", department: "Cosmetic & Plastic Surgery" },
    { id: 46, name: "Labioplasty", department: "Cosmetic & Plastic Surgery" },
    { id: 47, name: "Monsplasty", department: "Cosmetic & Plastic Surgery" },
    { id: 48, name: "Vaginoplasty", department: "Cosmetic & Plastic Surgery" },
    { id: 49, name: "Hoodectomy", department: "Cosmetic & Plastic Surgery" },
    { id: 50, name: "URSL", department: "Urology" },
    { id: 51, name: "RIRS", department: "Urology" },
    { id: 52, name: "TURP (Prostatectomy)", department: "Urology" },
    { id: 53, name: "Kidney stone ( PCNL)", department: "Urology" },
    { id: 54, name: "Adenoidectomy / Tonsillectomy", department: "ENT" },
    { id: 55, name: "FESS", department: "ENT" },
    { id: 56, name: "Septoplasty", department: "ENT" },
    { id: 57, name: "Mastoidectomy", department: "ENT" },
    { id: 58, name: "Myringotomy", department: "ENT" },
    { id: 59, name: "Typanoplasty", department: "ENT" },
    { id: 60, name: "Thyroidectomy", department: "ENT" },
    { id: 61, name: "Spine surgery", department: "Neurosurgery" },
    { id: 62, name: "Bariatric", department: "GI & Bariatric Surgery" },
    { id: 63, name: "Cancer care", department: "Oncology" },
    { id: 105, name: "Ablation Therapy", department: "Pain Management" },
    { id: 66, name: "Anal fistula", department: "Proctology" },
    { id: 67, name: "Perianal abscess", department: "Proctology" },
    { id: 70, name: "Rectal prolapse", department: "Proctology" },
    { id: 71, name: "Frenuloplasty surgery", department: "Cosmetic & Plastic Surgery" },
    { id: 74, name: "Labiaplasty", department: "Cosmetic & Plastic Surgery" },
    { id: 77, name: "Adenoidectomy", department: "ENT" },
    { id: 78, name: "Ear surgery", department: "ENT" },
    { id: 82, name: "Nasal polyps", department: "ENT" },
    { id: 84, name: "Sinus surgery", department: "ENT" },
    { id: 85, name: "Stapedectomy", department: "ENT" },
    { id: 86, name: "Throat surgery", department: "ENT" },
    { id: 88, name: "Tonsillectomy", department: "ENT" },
    { id: 89, name: "Turbinate reduction", department: "ENT" },
    { id: 90, name: "Tympanoplasty", department: "ENT" },
    { id: 91, name: "Vocal cord polyps", department: "ENT" },
    { id: 92, name: "Bariatric surgery", department: "GI & Bariatric Surgery" },
    { id: 93, name: "Gastrointestinal issues", department: "GI & Bariatric Surgery" },
    { id: 94, name: "Intragastric balloon", department: "GI & Bariatric Surgery" },
    { id: 96, name: "Asthma", department: "Pulmonology" },
    { id: 97, name: "Bronchoscopy-guided foreign body removal", department: "Pulmonology" },
    { id: 98, name: "Bronchoscopy", department: "Pulmonology" },
    { id: 99, name: "COPD", department: "Pulmonology" },
    { id: 100, name: "Lung biopsy", department: "Pulmonology" },
    { id: 101, name: "Lung cancer care", department: "Pulmonology" },
    { id: 102, name: "Post-COVID recovery", department: "Pulmonology" },
    { id: 103, name: "Respiratory conditions", department: "Pulmonology" },
    { id: 104, name: "TB management", department: "Pulmonology" }
].map(t => ({
    ...t,
    slug: slugify(t.name),
    href: `/treatments/${slugify(t.name)}`,
    body_region: getBodyRegion(t.department, t.name)
}));

export const getTreatmentsByDepartment = (department: string) => {
    return TREATMENTS_MASTER.filter(t => t.department === department);
};

export const getAllTreatments = () => {
    return TREATMENTS_MASTER;
};

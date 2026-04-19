
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
    { id: 1, name: "Abdominal pain", department: "Pain Management" },
    { id: 2, name: "Back pain", department: "Pain Management" },
    { id: 3, name: "Headache / Migraine", department: "Pain Management" },
    { id: 4, name: "Neck pain", department: "Pain Management" },
    { id: 5, name: "Regenerative therapies", department: "Pain Management" },
    { id: 6, name: "Sports pain", department: "Pain Management" },
    { id: 7, name: "Antepartum and intrapartum monitoring", department: "Gynecology & Obstetrics" },
    { id: 8, name: "Fertility services", department: "Gynecology & Obstetrics" },
    { id: 9, name: "High-risk pregnancy management", department: "Gynecology & Obstetrics" },
    { id: 10, name: "Labor & delivery", department: "Gynecology & Obstetrics" },
    { id: 11, name: "Pelvic floor disorders", department: "Gynecology & Obstetrics" },
    { id: 12, name: "Postpartum care", department: "Gynecology & Obstetrics" },
    { id: 13, name: "Parental care", department: "Gynecology & Obstetrics" },
    { id: 14, name: "Arthroscopy surgery", department: "Orthopedics & Trauma" },
    { id: 15, name: "Elbow pain", department: "Orthopedics & Trauma" },
    { id: 16, name: "Foot & ankle pain", department: "Orthopedics & Trauma" },
    { id: 17, name: "Hip pain", department: "Orthopedics & Trauma" },
    { id: 18, name: "Hip replacement surgery", department: "Orthopedics & Trauma" },
    { id: 19, name: "Knee arthroscopy", department: "Orthopedics & Trauma" },
    { id: 20, name: "Knee pain", department: "Orthopedics & Trauma" },
    { id: 21, name: "Meniscus tear", department: "Orthopedics & Trauma" },
    { id: 22, name: "Rotator cuff repair", department: "Orthopedics & Trauma" },
    { id: 23, name: "Shoulder arthroscopy", department: "Orthopedics & Trauma" },
    { id: 24, name: "Shoulder dislocation", department: "Orthopedics & Trauma" },
    { id: 25, name: "Shoulder pain", department: "Orthopedics & Trauma" },
    { id: 26, name: "Shoulder replacement", department: "Orthopedics & Trauma" },
    { id: 27, name: "Total knee replacement", department: "Orthopedics & Trauma" },
    { id: 28, name: "Chronic disease management", department: "General Medicine" },
    { id: 29, name: "Diabetic foot ulcer", department: "General Medicine" },
    { id: 30, name: "Management of infections", department: "General Medicine" },
    { id: 31, name: "Mental health", department: "General Medicine" },
    { id: 32, name: "Metabolic and endocrine disorders", department: "General Medicine" },
    { id: 33, name: "Pleural tapping", department: "General Medicine" },
    { id: 34, name: "Appendicitis", department: "General Surgery" },
    { id: 35, name: "Corn removal", department: "General Surgery" },
    { id: 36, name: "Diagnostic procedures", department: "General Surgery" },
    { id: 37, name: "Gallstones", department: "General Surgery" },
    { id: 38, name: "Hernia", department: "General Surgery" },
    { id: 39, name: "Incisional hernia", department: "General Surgery" },
    { id: 40, name: "Inguinal hernia", department: "General Surgery" },
    { id: 41, name: "Minimally invasive surgery", department: "General Surgery" },
    { id: 42, name: "Surgical interventions", department: "General Surgery" },
    { id: 43, name: "Endoscopic interlaminar discectomy", department: "Spine Care" },
    { id: 44, name: "Transforaminal endoscopic lumbar discectomy", department: "Spine Care" },
    { id: 45, name: "DVT (Deep Vein Thrombosis)", department: "Vascular Surgery" },
    { id: 46, name: "Varicose Veins", department: "Vascular Surgery" },
    { id: 47, name: "Balanitis", department: "Urology" },
    { id: 48, name: "Balanoposthitis", department: "Urology" },
    { id: 49, name: "Circumcision", department: "Urology" },
    { id: 50, name: "Enlarged prostate", department: "Urology" },
    { id: 51, name: "ESWL", department: "Urology" },
    { id: 52, name: "Foreskin infections", department: "Urology" },
    { id: 53, name: "Hydrocele", department: "Urology" },
    { id: 54, name: "Kidney stones", department: "Urology" },
    { id: 55, name: "Paraphimosis", department: "Urology" },
    { id: 56, name: "PCNL", department: "Urology" },
    { id: 57, name: "Phimosis", department: "Urology" },
    { id: 58, name: "Prostatectomy", department: "Urology" },
    { id: 59, name: "RIRS", department: "Urology" },
    { id: 60, name: "Stapler circumcision", department: "Urology" },
    { id: 61, name: "Swollen penis", department: "Urology" },
    { id: 62, name: "URSL", department: "Urology" },
    { id: 63, name: "Varicocele", department: "Urology" },
    { id: 64, name: "Cancer care", department: "Oncology" },
    { id: 65, name: "Anal fissure", department: "Proctology" },
    { id: 66, name: "Anal fistula", department: "Proctology" },
    { id: 67, name: "Perianal abscess", department: "Proctology" },
    { id: 68, name: "Piles", department: "Proctology" },
    { id: 69, name: "Pilonidal sinus", department: "Proctology" },
    { id: 70, name: "Rectal prolapse", department: "Proctology" },
    { id: 71, name: "Frenuloplasty surgery", department: "Cosmetic & Plastic Surgery" },
    { id: 72, name: "Hoodectomy", department: "Cosmetic & Plastic Surgery" },
    { id: 73, name: "Hymenoplasty", department: "Cosmetic & Plastic Surgery" },
    { id: 74, name: "Labiaplasty", department: "Cosmetic & Plastic Surgery" },
    { id: 75, name: "Monsplasty", department: "Cosmetic & Plastic Surgery" },
    { id: 76, name: "Vaginoplasty", department: "Cosmetic & Plastic Surgery" },
    { id: 77, name: "Adenoidectomy", department: "ENT" },
    { id: 78, name: "Ear surgery", department: "ENT" },
    { id: 79, name: "FESS", department: "ENT" },
    { id: 80, name: "Mastoidectomy", department: "ENT" },
    { id: 81, name: "Myringotomy", department: "ENT" },
    { id: 82, name: "Nasal polyps", department: "ENT" },
    { id: 83, name: "Septoplasty", department: "ENT" },
    { id: 84, name: "Sinus surgery", department: "ENT" },
    { id: 85, name: "Stapedectomy", department: "ENT" },
    { id: 86, name: "Throat surgery", department: "ENT" },
    { id: 87, name: "Thyroidectomy", department: "ENT" },
    { id: 88, name: "Tonsillectomy", department: "ENT" },
    { id: 89, name: "Turbinate reduction", department: "ENT" },
    { id: 90, name: "Tympanoplasty", department: "ENT" },
    { id: 91, name: "Vocal cord polyps", department: "ENT" },
    { id: 92, name: "Bariatric surgery", department: "GI & Bariatric Surgery" },
    { id: 93, name: "Gastrointestinal issues", department: "GI & Bariatric Surgery" },
    { id: 94, name: "Intragastric balloon", department: "GI & Bariatric Surgery" },
    { id: 95, name: "Spine surgery", department: "Neurosurgery" },
    { id: 96, name: "Asthma", department: "Pulmonology" },
    { id: 97, name: "Bronchoscopy-guided foreign body removal", department: "Pulmonology" },
    { id: 98, name: "Bronchoscopy", department: "Pulmonology" },
    { id: 99, name: "COPD", department: "Pulmonology" },
    { id: 100, name: "Lung biopsy", department: "Pulmonology" },
    { id: 101, name: "Lung cancer care", department: "Pulmonology" },
    { id: 102, name: "Post-COVID recovery", department: "Pulmonology" },
    { id: 103, name: "Respiratory conditions", department: "Pulmonology" },
    { id: 104, name: "TB management", department: "Pulmonology" },
    { id: 105, name: "Ablation Therapy", department: "Pain Management" }
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


export const iconMap: Record<string, string> = {
    // Pain Management
    "Abdominal pain": "Pain-Management.png",
    "Back pain": "Back-Pain.png",
    "Headache / Migraine": "Migraine.png",
    "Neck pain": "Neck-Pain.png",
    "Regenerative therapies": "Pain-Management.png",
    "Sports pain": "Pain-Management.png",
    "Ablation Therapy": "Pain-Management.png",

    // Orthopedics
    "Foot & ankle pain": "Ankle-Pain.png",
    "Hip replacement surgery": "Hip-Replacement.png",
    "Knee pain": "Knee-Pain.png",
    "Total knee replacement": "Knee-Replacement.png",
    "Shoulder pain": "Shoulder-Pain.png",
    "Arthroscopy surgery": "Orthopedics.png",
    "Hip pain": "Hip-Replacement.png",
    "Knee arthroscopy": "Orthopedics.png",
    "Meniscus tear": "PCL-Tear.png",
    "Rotator cuff repair": "Shoulder-Pain.png",
    "Shoulder arthroscopy": "Orthopedics.png",
    "Shoulder dislocation": "Shoulder-Pain.png",
    "Shoulder replacement": "Shoulder-Pain.png",

    // General Surgery
    "Appendicitis": "Appendectomy.png",
    "Gallstones": "Gallstones.png",
    "Incisional hernia": "Incisional-Hernia.png",
    "Inguinal hernia": "Inguinal-Hernia.png",
    "Hernia": "Inguinal-Hernia.png",
    "Sebaceous-Cyst": "Sebaceous-Cyst.png",
    "Thyroidectomy": "Tyroidectomy.png",

    // Urology
    "Kidney stones": "Kidney-Stones.png",
    "Hydrocele": "Hydrocelectmy.png",
    "Varicocele": "Varicocele.png",
    "Stapler circumcision": "Stapler-Circumcision.png",
    "Enlarged prostate": "Prostatomegaly-(BPH).png",
    "Circumcision": "Stapler-Circumcision.png",
    "Prostatectomy": "Prostatomegaly-(BPH).png",

    // Proctology
    "Anal fissure": "Anal-Fissure.png",
    "Anal fistula": "Anal-Fistula.png",
    "Piles": "Piles.png",
    "Pilonidal sinus": "Pilonidal-Sinus.png",

    // Cosmetic & Plastic Surgery
    "Hymenoplasty": "Hymenoplasty.png",
    "Labiaplasty": "Labioplasty.png",
    "Vaginoplasty": "Vaginoplasty.png",
    "Gynecomastia": "Gynecomastia.png",

    // ENT
    "Adenoidectomy": "Adenoidectomy.png",
    "FESS": "FESS.png",
    "Mastoidectomy": "Mastoidectomy.png",
    "Myringotomy": "Myringotomy.png",
    "Septoplasty": "Septoplasty.png",
    "Tonsillectomy": "Tonsillectomy.png",
    "Tympanoplasty": "Tympanoplasty.png",
    "Rhinoplasty": "Rhinoplasty.png",

    // GI & Bariatric
    "Bariatric surgery": "Bariatric-Surgery.png",

    // Oncology
    "Cancer care": "Cancer-Pain.png",

    // Spine
    "Spine surgery": "Spine-Surgery.png",
    "Endoscopic interlaminar discectomy": "Endocopic-key-hole-discectomy.png",

    // Vascular
    "Varicose Veins": "Varicose-Veins.png",
    "DVT (Deep Vein Thrombosis)": "Vascular.png",

    // Pulmonology
    "Pulmonology": "Pulmonology.png",

    // General Medicine
    "Diabetic foot ulcer": "Diabetic-Foot.png",
    "General Medicine": "General-Medicine.png"
};

/**
 * Normalizes treatment name for mapping
 */
const normalize = (name: string) => name.toLowerCase().trim().replace(/\s+/g, ' ');

const normalizedIconMap = Object.entries(iconMap).reduce((acc, [key, value]) => {
    acc[normalize(key)] = value;
    return acc;
}, {} as Record<string, string>);

/**
 * Gets the correct icon path for a treatment name
 */
export function getTreatmentIcon(treatmentName: string): string {
    const basePath = "/images/Departmentsicons/Stork exclusive icons (6)/";
    const fallback = "General-Medicine.png";
    
    const normalizedName = normalize(treatmentName);
    const fileName = normalizedIconMap[normalizedName];

    if (fileName) {
        return basePath + fileName;
    }

    return basePath + fallback;
}

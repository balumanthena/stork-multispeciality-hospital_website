const BASE_PATH = "/images/Departmentsicons/Stork exclusive icons (6)/";

/**
 * Manual overrides for treatment names that don't match their SVG filenames exactly.
 * Key = lowercased treatment name, Value = exact filename (with extension).
 */
const CUSTOM_ICON_MAP: Record<string, string> = {
  // SVG/PNG icons with non-standard filenames (Updated to crisp PNGs from public/images/icons_Update)
  "anal fistula": "Anal fistula.svg",
  "anal fissure": "Anal-Fissure.png",
  "pilonidal sinus": "Pilonidal-Sinus.png",
  "adenoidectomy / tonsillectomy": "Adenoidectomy , Tonsillectomy.png",
  "adenoidectomy": "Adenoidectomy , Tonsillectomy.png",
  "tonsillectomy": "Adenoidectomy , Tonsillectomy.png",
  "antepartum and intrapartum": "Anteprtum Intrapartum.png",
  "antepartum and intrapartum monitoring": "Anteprtum Intrapartum.png",
  "antepartum monitoring": "Anteprtum Intrapartum.png",
  "headach migraine": "Headach Migraine.png",
  "headache / migraine": "Headach Migraine.png",
  "foot and ankle pain": "Foot and  Ankle pain.png",
  "foot & ankle pain": "Foot and  Ankle pain.png",
  "kidney stone ( pcnl)": "Kidney stone (PCNL).png",
  "kidney stones": "Kidney stone (PCNL).png",
  "pcnl": "Kidney stone (PCNL).png",
  "knee arthroscopy": "Knee Arthroscopy.png",
  "arthroscopy surgery": "Knee Arthroscopy.png",
  "carpal tunnel syndrome": "Carpal tunnel Syndrome.png",
  "endoscopic interlaminar discectomy": "Endoscopic Interlaminar Discectomy.png",
  "endoscopic interlaminar": "Endoscopic Interlaminar Discectomy.png",
  "transforaminal endoscopic discectomy": "Transforaminal Endoscopic Discectomy.png",
  "transforaminal endoscopic": "Transforaminal Endoscopic Discectomy.png",
  "regenerative therapy (prp)": "Regenerative Therapy (PRP).png",
  "regenerative therapies": "Regenerative Therapy (PRP).png",
  "tubectomy ( family planning)": "Tubectomy.png",
  "tubectomy": "Tubectomy.png",
  "high risk pregnancy": "High risk pregnancy.png",
  "high-risk pregnancy management": "High risk pregnancy.png",

  // PNG icons with non-standard filenames
  "piles": "Piles.png",
  "appendicitis": "Appendectomy.png",
  "gallstones": "Gallstones.png",
  "gall stones": "Gallstones.png",
  "diabetic foot": "Diabetic-Foot.png",
  "diabetic foot ulcer": "Diabetic-Foot.png",
  "varicocele": "Varicocele.png",
  "hydrocele": "Hydrocelectmy.png",
  "incisional hernia": "Incisional-Hernia.png",
  "umbilical hernia": "Umlical-Hernia.png",
  "hernia": "Inguinal-Hernia.png",
  "inguinal hernia": "Inguinal-Hernia.png",
  "hip replacement": "Hip-Replacement.png",
  "hip replacement surgery": "Hip-Replacement.png",
  "tkr": "Total Knee Replacement (TKR).png",
  "total knee replacement": "Total Knee Replacement (TKR).png",
  "backpain": "Back pain.png",
  "back pain": "Back pain.png",
  "neck pain": "Neck-Pain.png",
  "cancer pain": "Cancer care.png",
  "cancer care": "Cancer care.png",
  "lung cancer care": "Cancer care.png",
  "spine surgery": "Spine-Surgery.png",
  "bariatric": "Bariatric-Surgery.png",
  "bariatric surgery": "Bariatric-Surgery.png",
  "hysterectomy": "Hysterectomy.png",
  "mtp": "MTP.png",
  "labioplasty": "Labioplasty.png",
  "labiaplasty": "Labioplasty.png",
  "vaginoplasty": "Vaginoplasty.png",
  "septoplasty": "Septoplasty.png",
  "fess": "FESS.png",
  "mastoidectomy": "Mastoidectomy.png",
  "typanoplasty": "Typanoplasty.png",
  "tympanoplasty": "Typanoplasty.png",
  "dvt": "DVT.png",
  "dvt (deep vein thrombosis)": "DVT.png",
  "turp (prostatectomy)": "Turp.png",
  "turp": "Turp.png",
  "prostatectomy": "Turp.png",
  "enlarged prostate": "Prostatomegaly-(BPH).png",
  "ursl": "USRL.png",
  "rirs": "RIRS.png",
  "pldd": "PLDD.png",
  "oncology": "Oncology.png",

  // Capitalized filenames / replacements
  "hip pain": "HIP pain.png",
  "monsplasty": "Monsplasty.png",
  "hoodectomy": "Hoodectomy.png",
  "perianal abscess": "Perianal Abscess.png",
  "postpartum care": "Postpartum Care.png",
  "prenatal care": "Prenatal Care.png",

  // Additional treatments that map to existing icons
  "sports pain": "Knee Pain.png",
  "corn removal": "Diabetic-Foot.png",
  "rotator cuff repair": "Shoulder Arthroscopy.png",
  "shoulder dislocation": "Shoulder-Pain.png",
  "shoulder replacement": "Shoulder Arthroscopy.png",
  "shoulder arthroscopy": "Shoulder Arthroscopy.png",
  "shoulder pain": "Shoulder pain.png",
  "elbow pain": "Elbow pain.png",
  "chronic disease management": "General-Medicine.png",
  "management of infections": "General-Medicine.png",
  "mental health": "General-Medicine.png",
  "metabolic and endocrine disorders": "General-Medicine.png",
  "pleural tapping": "Pulmonology.png",
  "diagnostic procedures": "General-Surgery.png",
  "minimally invasive surgery": "General-Surgery.png",
  "surgical interventions": "General-Surgery.png",
  "gastrointestinal issues": "GI-Surgery.png",
  "intragastric balloon": "Bariatric-Surgery.png",
  "asthma": "Pulmonology.png",
  "bronchoscopy-guided foreign body removal": "Pulmonology.png",
  "bronchoscopy": "Pulmonology.png",
  "copd": "Pulmonology.png",
  "lung biopsy": "Pulmonology.png",
  "post-covid recovery": "Pulmonology.png",
  "respiratory conditions": "Pulmonology.png",
  "tb management": "Pulmonology.png",
  "ablation therapy": "Pain-Management.png",
  "rectal prolapse": "Proctology.png",
  "frenuloplasty surgery": "Plastic-Surgey.png",
  "fertility services": "Gynecology-&-OBS.png",
  "labor & delivery": "Painless Delivery.png",
  "pelvic floor disorders": "Gynecology-&-OBS.png",
  "ear surgery": "Mastoidectomy.png",
  "nasal polyps": "FESS.png",
  "sinus surgery": "FESS.png",
  "stapedectomy": "Mastoidectomy.png",
  "throat surgery": "Adenoidectomy , Tonsillectomy.png",
  "turbinate reduction": "FESS.png",
  "vocal cord polyps": "Adenoidectomy , Tonsillectomy.png",
  "balanitis": "Urology.png",
  "balanoposthitis": "Urology.png",
  "circumcision": "Stapler circumcision.png",
  "eswl": "Kidney stone (PCNL).png",
  "foreskin infections": "Urology.png",
  "paraphimosis": "Urology.png",
  "phimosis": "Urology.png",
  "swollen penis": "Urology.png",
  "varicose veins": "Vericose veins.png",
  "varicose-veins": "Vericose veins.png",
};

/**
 * Returns the full icon path for a given treatment slug or name.
 * Priority: CUSTOM_ICON_MAP → dynamic SVG path by name.
 */
export const getTreatmentIcon = (slugOrName: string): string => {
  // Normalize: convert slug (with dashes) to lowercase name (with spaces)
  const normalizedName = slugOrName.replace(/-/g, " ").toLowerCase();

  // 1. Check custom map first
  const customFile = CUSTOM_ICON_MAP[normalizedName];
  if (customFile) {
    return `${BASE_PATH}${encodeURIComponent(customFile)}`;
  }

  // 2. Dynamic path: assume <lowercase name>.svg exists
  return `${BASE_PATH}${encodeURIComponent(normalizedName + ".svg")}`;
};

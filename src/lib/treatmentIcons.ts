const BASE_PATH = "/images/Departmentsicons/Stork exclusive icons (6)/";

/**
 * Manual overrides for treatment names that don't match their SVG filenames exactly.
 * Key = lowercased treatment name, Value = exact filename (with extension).
 */
const CUSTOM_ICON_MAP: Record<string, string> = {
  // SVG icons with non-standard filenames
  "anal fistula": "Anal fistula.svg",
  "anal fissure": "Anal-Fissure.png",
  "pilonidal sinus": "Pilonidal-Sinus.png",
  "adenoidectomy / tonsillectomy": "adenoidectomy &tonsillectomy.svg",
  "antepartum and intrapartum": "antepartum&intrapartum.svg",
  "antepartum and intrapartum monitoring": "antepartum&intrapartum.svg",
  "headach migraine": "headache&migraine.svg",
  "headache / migraine": "headache&migraine.svg",
  "foot and ankle pain": "foot &ankle pain.svg",
  "foot & ankle pain": "foot &ankle pain.svg",
  "kidney stone ( pcnl)": "kidny stone(PCNL).svg",
  "kidney stones": "kidny stone(PCNL).svg",
  "pcnl": "kidny stone(PCNL).svg",
  "knee arthroscopy": "knee arthroplasty.svg",
  "arthroscopy surgery": "knee arthroplasty.svg",
  "carpal tunnel syndrome": "carpal tunnel Syndrome.svg",
  "endoscopic interlaminar discectomy": "endoscopic interlaminar discectomy.svg",
  "transforaminal endoscopic discectomy": "transforaminal endoscopic discectomy.svg",
  "regenerative therapy (prp)": "regenerative therapy.svg",
  "regenerative therapies": "regenerative therapy.svg",
  "tubectomy ( family planning)": "tubectomy.svg",
  "high risk pregnancy": "high risk pregnancy.svg",
  "high-risk pregnancy management": "high risk pregnancy.svg",

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
  "hip replacement": "Hip-Replacement.png",
  "hip replacement surgery": "Hip-Replacement.png",
  "tkr": "Knee-Replacement.png",
  "total knee replacement": "knee replacement.svg",
  "backpain": "back pain.svg",
  "neck pain": "Neck-Pain.png",
  "cancer pain": "Cancer-Pain.png",
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
  "tonsillectomy": "Tonsillectomy.png",
  "adenoidectomy": "Adenoidectomy.png",
  "typanoplasty": "tympanoplasty.svg",
  "dvt": "DVT.svg",
  "dvt (deep vein thrombosis)": "DVT.svg",
  "turp (prostatectomy)": "TURP.svg",
  "prostatectomy": "TURP.svg",
  "enlarged prostate": "Prostatomegaly-(BPH).png",
  "ursl": "URSL.svg",
  "rirs": "RIRS.svg",
  "pldd": "PLDD.svg",
  "cancer care": "cancer care.svg",
  "lung cancer care": "cancer care.svg",
  "oncology": "Oncology.png",

  // Capitalized SVG filenames (case-sensitive on Linux/Vercel)
  "hip pain": "Hip pain.svg",
  "monsplasty": "Monsplasty.svg",
  "hoodectomy": "Hoodectomy.svg",

  // Additional treatments that map to existing icons
  "sports pain": "Knee-Pain.png",
  "corn removal": "Diabetic-Foot.png",
  "rotator cuff repair": "shoulder arthroscopy.svg",
  "shoulder dislocation": "Shoulder-Pain.png",
  "shoulder replacement": "shoulder arthroscopy.svg",
  "shoulder arthroscopy": "shoulder arthroscopy.svg",
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
  "labor & delivery": "Painless-Delivery.png",
  "pelvic floor disorders": "Gynecology-&-OBS.png",
  "ear surgery": "Mastoidectomy.png",
  "nasal polyps": "FESS.png",
  "sinus surgery": "FESS.png",
  "stapedectomy": "Mastoidectomy.png",
  "throat surgery": "Tonsillectomy.png",
  "turbinate reduction": "FESS.png",
  "vocal cord polyps": "Tonsillectomy.png",
  "balanitis": "Urology.png",
  "balanoposthitis": "Urology.png",
  "circumcision": "laser circumcision.svg",
  "eswl": "kidny stone(PCNL).svg",
  "foreskin infections": "Urology.png",
  "paraphimosis": "Urology.png",
  "phimosis": "Urology.png",
  "swollen penis": "Urology.png",
  "back pain": "back pain.svg",
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

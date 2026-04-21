export const TREATMENT_ICON_MAP: Record<string, string> = {
  piles: "Piles.png",
  anal_fistula: "Anal-Fistula.png",
  anal_fissure: "Anal-Fissure.png",
  pilonidal_sinus: "Pilonidal-Sinus.png",
  appendicitis: "Appendectomy.png",
  gall_stones: "Gallstones.png",
  diabetic_foot: "Diabetic-Foot.png",
  varicocele: "Varicocele.png",
  hydrocele: "Hydrocelectmy.png",
  incisional_hernia: "Incisional-Hernia.png",
  inguinal_hernia: "Inguinal-Hernia.png",
  umbilical_hernia: "Umlical-Hernia.png",
  kidney_stones: "Kidney-Stones.png",
  knee_replacement: "Knee-Replacement.png",
  hip_replacement: "Hip-Replacement.png",
  back_pain: "Back-Pain.png",
  neck_pain: "Neck-Pain.png",
  migraine: "Migraine.png",
  cancer_pain: "Cancer-Pain.png",
  spine_surgery: "Spine-Surgery.png",
  bariatric: "Bariatric-Surgery.png",
  hysterectomy: "Hysterectomy.png",
  mtp: "MTP.png",
  labioplasty: "Labioplasty.png",
  vaginoplasty: "Vaginoplasty.png",
  thyroidectomy: "Tyroidectomy.png",
  septoplasty: "Septoplasty.png",
  fess: "FESS.png",
  mastoidectomy: "Mastoidectomy.png",
  tympanoplasty: "Tympanoplasty.png",
  tonsillectomy: "Tonsillectomy.png",
  adenoidectomy: "Adenoidectomy.png"
};

export const getTreatmentIcon = (slug: string) => {
  const basePath = "/images/Departmentsicons/Stork exclusive icons (6)/";
  // The user provided slugs like "anal_fistula", so we map them correctly
  // Fallback to General-Medicine if not found
  const normalizedSlug = slug.replace(/-/g, '_');
  const fileName = TREATMENT_ICON_MAP[normalizedSlug] || TREATMENT_ICON_MAP[slug];

  return fileName
    ? `${basePath}${fileName}`
    : `${basePath}General-Medicine.png`;
};

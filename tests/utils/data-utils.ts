
import { TREATMENTS_MASTER } from '../../src/lib/data/treatments';

export const MASTER_TREATMENTS = TREATMENTS_MASTER.map(t => t.name);

export const MASTER_PROCEDURES = [
    "ACL PCL Tear",
    "Appendectomy",
    "AV Fistula",
    "Breast Lump",
    "C-Section",
    "Cancer Pain",
    "Chemo Port Incision",
    "Chemo Therapy",
    "Ectopic Pregnancy",
    "Endoscopic Keyhole Discectomy",
    "Endometriosis",
    "Fractures",
    "Gynecomastia",
    "Hydrocelectomy",
    "Hysterectomy",
    "Kyphoplasty",
    "Lipoma / Sebaceous",
    "MTP / Family Planning",
    "Painless Delivery",
    "Prostatomegaly (BPH)",
    "Rhinoplasty",
    "Thyroidectomy",
    "Umbilical Hernia",
    "Uterine Fibroids",
    "Vertebroplasty"
];

export const normalizeText = (text: string) => {
    return text.toLowerCase().trim().replace(/\s+/g, ' ');
};

export const ICON_BASE_PATH = "/images/Departmentsicons/Stork exclusive icons (6)/";
export const FALLBACK_ICON = "General-Medicine.png";

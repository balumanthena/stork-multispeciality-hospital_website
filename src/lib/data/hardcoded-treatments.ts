import { GroupedTreatmentCategory } from "./grouped-treatments"

export const HARDCODED_TREATMENTS: GroupedTreatmentCategory[] = [
    {
        title: "General Surgery",
        slug: "general-surgery",
        href: "/departments/general-surgery",
        items: [
            { title: "Anal Fissure", href: "/treatments/anal-fissure", body_region: "pelvis" },
            { title: "Anal Fistula", href: "/treatments/anal-fistula", body_region: "pelvis" },
            { title: "Appendicitis", href: "/treatments/appendicitis", body_region: "abdomen" },
            { title: "Fissure Surgery", href: "/treatments/fissure-surgery", body_region: "pelvis" },
            { title: "Gallstone", href: "/treatments/gallstone", body_region: "abdomen" },
            { title: "Hernia", href: "/treatments/hernia", body_region: "abdomen" },
            { title: "Hydrocele", href: "/treatments/hydrocele", body_region: "pelvis" },
            { title: "Incisional Hernia", href: "/treatments/incisional-hernia", body_region: "abdomen" },
            { title: "Inguinal Hernia", href: "/treatments/inguinal-hernia", body_region: "pelvis" },
            { title: "Minimally Invasive Surgery", href: "/treatments/minimally-invasive-surgery", body_region: "abdomen" },
            { title: "Perianal Abscess", href: "/treatments/perianal-abscess", body_region: "pelvis" },
            { title: "Piles (Hemorrhoids)", href: "/treatments/piles-hemorrhoids", body_region: "pelvis" },
            { title: "Pilonidal Sinus", href: "/treatments/pilonidal-sinus", body_region: "pelvis" },
            { title: "Surgical Interventions", href: "/treatments/surgical-interventions", body_region: "abdomen" },
            { title: "Thyroidectomy", href: "/treatments/thyroidectomy", body_region: "head" },
            { title: "Umbilical Hernia", href: "/treatments/umbilical-hernia", body_region: "abdomen" },
            { title: "Varicose Veins", href: "/treatments/varicose-veins", body_region: "legs" },
        ]
    },
    {
        title: "Orthopedics",
        slug: "orthopedics",
        href: "/departments/orthopedics",
        items: [
            { title: "Arthroscopy Surgery", href: "/treatments/arthroscopy-surgery", body_region: "legs" },
            { title: "Back Pain", href: "/treatments/back-pain", body_region: "spine" },
            { title: "Elbow Pain", href: "/treatments/elbow-pain", body_region: "arms" },
            { title: "Foot or Ankle Pain", href: "/treatments/foot-or-ankle-pain", body_region: "legs" },
            { title: "Hip Pain", href: "/treatments/hip-pain", body_region: "legs" },
            { title: "Hip Replacement Surgery", href: "/treatments/hip-replacement-surgery", body_region: "legs" },
            { title: "Knee Arthroscopy", href: "/treatments/knee-arthroscopy", body_region: "legs" },
            { title: "Knee Pain", href: "/treatments/knee-pain", body_region: "legs" },
            { title: "Meniscus Tear", href: "/treatments/meniscus-tear", body_region: "legs" },
            { title: "Neck Pain", href: "/treatments/neck-pain", body_region: "spine" },
            { title: "Rotator Cuff Repair", href: "/treatments/rotator-cuff-repair", body_region: "arms" },
            { title: "Shoulder Arthroscopy", href: "/treatments/shoulder-arthroscopy", body_region: "arms" },
            { title: "Shoulder Dislocation", href: "/treatments/shoulder-dislocation", body_region: "arms" },
            { title: "Shoulder Pain", href: "/treatments/shoulder-pain", body_region: "arms" },
            { title: "Shoulder Replacement", href: "/treatments/shoulder-replacement", body_region: "arms" },
            { title: "Spine Surgery", href: "/treatments/spine-surgery", body_region: "spine" },
            { title: "Sports Injury", href: "/treatments/sports-injury", body_region: "legs" },
            { title: "Total Knee Replacement", href: "/treatments/total-knee-replacement", body_region: "legs" },
        ]
    },
    {
        title: "Urology & Andrology",
        slug: "urology",
        href: "/departments/urology",
        items: [
            { title: "Balanitis", href: "/treatments/balanitis", body_region: "pelvis" },
            { title: "Balanoposthitis", href: "/treatments/balanoposthitis", body_region: "pelvis" },
            { title: "Circumcision", href: "/treatments/circumcision", body_region: "pelvis" },
            { title: "Enlarged Prostate", href: "/treatments/enlarged-prostate", body_region: "pelvis" },
            { title: "ESWL", href: "/treatments/eswl", body_region: "pelvis" },
            { title: "Foreskin Infection", href: "/treatments/foreskin-infection", body_region: "pelvis" },
            { title: "Frenuloplasty Surgery", href: "/treatments/frenuloplasty-surgery", body_region: "pelvis" },
            { title: "Kidney Stones", href: "/treatments/kidney-stones", body_region: "pelvis" },
            { title: "Paraphimosis", href: "/treatments/paraphimosis", body_region: "pelvis" },
            { title: "PCNL", href: "/treatments/pcnl", body_region: "pelvis" },
            { title: "Phimosis", href: "/treatments/phimosis", body_region: "pelvis" },
            { title: "Prostatectomy", href: "/treatments/prostatectomy", body_region: "pelvis" },
            { title: "RIRS", href: "/treatments/rirs", body_region: "pelvis" },
            { title: "Stapler Circumcision", href: "/treatments/stapler-circumcision", body_region: "pelvis" },
            { title: "Swollen Penis", href: "/treatments/swollen-penis", body_region: "pelvis" },
            { title: "URSL", href: "/treatments/ursl", body_region: "pelvis" },
            { title: "Varicocele", href: "/treatments/varicocele", body_region: "pelvis" },
        ]
    },
    {
        title: "ENT",
        slug: "ent",
        href: "/departments/ent",
        items: [
            { title: "Adenoidectomy", href: "/treatments/adenoidectomy", body_region: "ent" },
            { title: "Ear Surgery", href: "/treatments/ear-surgery", body_region: "ent" },
            { title: "Mastoidectomy", href: "/treatments/mastoidectomy", body_region: "ent" },
            { title: "Myringotomy", href: "/treatments/myringotomy", body_region: "ent" },
            { title: "Nasal Polyps", href: "/treatments/nasal-polyps", body_region: "ent" },
            { title: "Rhinoplasty", href: "/treatments/rhinoplasty", body_region: "ent" },
            { title: "Septoplasty", href: "/treatments/septoplasty", body_region: "ent" },
            { title: "Sinus Treatment", href: "/treatments/sinus-treatment", body_region: "ent" },
            { title: "Stapedectomy", href: "/treatments/stapedectomy", body_region: "ent" },
            { title: "Throat Surgery", href: "/treatments/throat-surgery", body_region: "ent" },
            { title: "Tonsillectomy", href: "/treatments/tonsillectomy", body_region: "ent" },
            { title: "Turbinate Reduction", href: "/treatments/turbinate-reduction", body_region: "ent" },
            { title: "Tympanoplasty", href: "/treatments/tympanoplasty", body_region: "ent" },
            { title: "Vocal Cord Polyps", href: "/treatments/vocal-cord-polyps", body_region: "ent" },
        ]
    },
    {
        title: "Gynecology",
        slug: "gynaecology",
        href: "/departments/gynaecology",
        items: [
            { title: "Fertility Services", href: "/treatments/fertility-services", body_region: "womens-health" },
            { title: "Hoodecomy", href: "/treatments/hoodecomy", body_region: "womens-health" },
            { title: "Hymenoplasty", href: "/treatments/hymenoplasty", body_region: "womens-health" },
            { title: "Hysterectomy", href: "/treatments/hysterectomy", body_region: "womens-health" },
            { title: "Labiaplasty", href: "/treatments/labiaplasty", body_region: "womens-health" },
            { title: "Monsplasty", href: "/treatments/monsplasty", body_region: "womens-health" },
            { title: "Pelvic Floor Disorders", href: "/treatments/pelvic-floor-disorders", body_region: "womens-health" },
            { title: "Rectal Prolapse", href: "/treatments/rectal-prolapse", body_region: "womens-health" },
            { title: "Uterine Fibroids", href: "/treatments/uterine-fibroids", body_region: "womens-health" },
            { title: "Vaginoplasty", href: "/treatments/vaginoplasty", body_region: "womens-health" },
            { title: "Vestoplasty", href: "/treatments/vestoplasty", body_region: "womens-health" },
        ]
    },
    {
        title: "Obstetrics",
        slug: "gynaecology",
        href: "/departments/gynaecology",
        items: [
            { title: "Antepartum and Intrapartum Monitoring", href: "/treatments/antepartum-monitoring", body_region: "womens-health" },
            { title: "High Risk Pregnancy", href: "/treatments/high-risk-pregnancy", body_region: "womens-health" },
            { title: "Labor & Delivery", href: "/treatments/labor-delivery", body_region: "womens-health" },
            { title: "Postpartum Care", href: "/treatments/postpartum-care", body_region: "womens-health" },
            { title: "Prenatal Care", href: "/treatments/prenatal-care", body_region: "womens-health" },
        ]
    },
    {
        title: "General Medicine",
        slug: "general-medicine",
        href: "/departments/general-medicine",
        items: [
            { title: "Chronic Disease Management", href: "/treatments/chronic-disease-management", body_region: "chest" },
            { title: "Diagnostic Procedure", href: "/treatments/diagnostic-procedure", body_region: "chest" },
            { title: "Management of Infections", href: "/treatments/management-of-infections", body_region: "chest" },
        ]
    },
    {
        title: "Bariatric & Weight Management",
        slug: "bariatric",
        href: "/departments/bariatric",
        items: [
            { title: "Bariatric Surgery", href: "/treatments/bariatric-surgery", body_region: "abdomen" },
            { title: "Intragastric Balloon", href: "/treatments/intragastric-balloon", body_region: "abdomen" },
        ]
    },
    {
        title: "Podiatry",
        slug: "podiatry",
        href: "/departments/podiatry",
        items: [
            { title: "Corn Removal", href: "/treatments/corn-removal", body_region: "legs" },
            { title: "Diabetic Foot Ulcer", href: "/treatments/diabetic-foot-ulcer", body_region: "legs" },
        ]
    },
    {
        title: "Endocrinology",
        slug: "general-medicine",
        href: "/departments/general-medicine",
        items: [
            { title: "Metabolic and Endocrine Disorders", href: "/treatments/metabolic-endocrine-disorders", body_region: "abdomen" },
        ]
    },
    {
        title: "Gastroenterology",
        slug: "bariatric",
        href: "/departments/bariatric",
        items: [
            { title: "Gastrointestinal Issues", href: "/treatments/gastrointestinal-issues", body_region: "abdomen" },
        ]
    },
    {
        title: "Neurology",
        slug: "neurology",
        href: "/departments/neurology",
        items: [
            { title: "Headache or Migraine", href: "/treatments/headache-or-migraine", body_region: "head" },
        ]
    },
    {
        title: "Oncology",
        slug: "oncology",
        href: "/departments/oncology",
        items: [
            { title: "Cancer Care", href: "/treatments/cancer-care", body_region: "skin-oncology" },
        ]
    },
    {
        title: "Psychiatry",
        slug: "general-medicine",
        href: "/departments/general-medicine",
        items: [
            { title: "Mental Health", href: "/treatments/mental-health", body_region: "mental-health" },
        ]
    },
    {
        title: "Pulmonology",
        slug: "pulmonology",
        href: "/departments/pulmonology",
        items: [
            { title: "Respiratory", href: "/treatments/respiratory", body_region: "chest" },
        ]
    },
    {
        title: "Vascular",
        slug: "vascular",
        href: "/departments/vascular",
        items: [
            { title: "DVT Treatment", href: "/treatments/dvt-treatment", body_region: "heart" },
        ]
    },
]

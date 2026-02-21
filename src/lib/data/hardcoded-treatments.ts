import { GroupedTreatmentCategory } from "./grouped-treatments"

export const HARDCODED_TREATMENTS: GroupedTreatmentCategory[] = [
    {
        title: "General Surgery",
        slug: "general-surgery",
        href: "/services/general-surgery",
        items: [
            { title: "Anal Fissure", href: "/services/general-surgery/anal-fissure", body_region: "pelvis" },
            { title: "Anal Fistula", href: "/services/general-surgery/anal-fistula", body_region: "pelvis" },
            { title: "Appendicitis", href: "/services/general-surgery/appendicitis", body_region: "abdomen" },
            { title: "Fissure Surgery", href: "/services/general-surgery/fissure-surgery", body_region: "pelvis" },
            { title: "Gallstone", href: "/services/general-surgery/gallstone", body_region: "abdomen" },
            { title: "Hernia", href: "/services/general-surgery/hernia", body_region: "abdomen" },
            { title: "Hydrocele", href: "/services/general-surgery/hydrocele", body_region: "pelvis" },
            { title: "Incisional Hernia", href: "/services/general-surgery/incisional-hernia", body_region: "abdomen" },
            { title: "Inguinal Hernia", href: "/services/general-surgery/inguinal-hernia", body_region: "pelvis" },
            { title: "Minimally Invasive Surgery", href: "/services/general-surgery/minimally-invasive-surgery", body_region: "abdomen" },
            { title: "Perianal Abscess", href: "/services/general-surgery/perianal-abscess", body_region: "pelvis" },
            { title: "Piles (Hemorrhoids)", href: "/services/general-surgery/piles-hemorrhoids", body_region: "pelvis" },
            { title: "Pilonidal Sinus", href: "/services/general-surgery/pilonidal-sinus", body_region: "pelvis" },
            { title: "Surgical Interventions", href: "/services/general-surgery/surgical-interventions", body_region: "abdomen" },
            { title: "Thyroidectomy", href: "/services/general-surgery/thyroidectomy", body_region: "head" },
            { title: "Umbilical Hernia", href: "/services/general-surgery/umbilical-hernia", body_region: "abdomen" },
            { title: "Varicose Veins", href: "/services/general-surgery/varicose-veins", body_region: "legs" },
        ]
    },
    {
        title: "Orthopedics",
        slug: "orthopedics",
        href: "/services/orthopedics",
        items: [
            { title: "Arthroscopy Surgery", href: "/services/orthopedics/arthroscopy-surgery", body_region: "legs" },
            { title: "Back Pain", href: "/services/orthopedics/back-pain", body_region: "spine" },
            { title: "Elbow Pain", href: "/services/orthopedics/elbow-pain", body_region: "arms" },
            { title: "Foot or Ankle Pain", href: "/services/orthopedics/foot-or-ankle-pain", body_region: "legs" },
            { title: "Hip Pain", href: "/services/orthopedics/hip-pain", body_region: "legs" },
            { title: "Hip Replacement Surgery", href: "/services/orthopedics/hip-replacement-surgery", body_region: "legs" },
            { title: "Knee Arthroscopy", href: "/services/orthopedics/knee-arthroscopy", body_region: "legs" },
            { title: "Knee Pain", href: "/services/orthopedics/knee-pain", body_region: "legs" },
            { title: "Meniscus Tear", href: "/services/orthopedics/meniscus-tear", body_region: "legs" },
            { title: "Neck Pain", href: "/services/orthopedics/neck-pain", body_region: "spine" },
            { title: "Rotator Cuff Repair", href: "/services/orthopedics/rotator-cuff-repair", body_region: "arms" },
            { title: "Shoulder Arthroscopy", href: "/services/orthopedics/shoulder-arthroscopy", body_region: "arms" },
            { title: "Shoulder Dislocation", href: "/services/orthopedics/shoulder-dislocation", body_region: "arms" },
            { title: "Shoulder Pain", href: "/services/orthopedics/shoulder-pain", body_region: "arms" },
            { title: "Shoulder Replacement", href: "/services/orthopedics/shoulder-replacement", body_region: "arms" },
            { title: "Spine Surgery", href: "/services/orthopedics/spine-surgery", body_region: "spine" },
            { title: "Sports Injury", href: "/services/orthopedics/sports-injury", body_region: "legs" },
            { title: "Total Knee Replacement", href: "/services/orthopedics/total-knee-replacement", body_region: "legs" },
        ]
    },
    {
        title: "Urology & Andrology",
        slug: "urology",
        href: "/services/urology",
        items: [
            { title: "Balanitis", href: "/services/urology/balanitis", body_region: "pelvis" },
            { title: "Balanoposthitis", href: "/services/urology/balanoposthitis", body_region: "pelvis" },
            { title: "Circumcision", href: "/services/urology/circumcision", body_region: "pelvis" },
            { title: "Enlarged Prostate", href: "/services/urology/enlarged-prostate", body_region: "pelvis" },
            { title: "ESWL", href: "/services/urology/eswl", body_region: "pelvis" },
            { title: "Foreskin Infection", href: "/services/urology/foreskin-infection", body_region: "pelvis" },
            { title: "Frenuloplasty Surgery", href: "/services/urology/frenuloplasty-surgery", body_region: "pelvis" },
            { title: "Kidney Stones", href: "/services/urology/kidney-stones", body_region: "pelvis" },
            { title: "Paraphimosis", href: "/services/urology/paraphimosis", body_region: "pelvis" },
            { title: "PCNL", href: "/services/urology/pcnl", body_region: "pelvis" },
            { title: "Phimosis", href: "/services/urology/phimosis", body_region: "pelvis" },
            { title: "Prostatectomy", href: "/services/urology/prostatectomy", body_region: "pelvis" },
            { title: "RIRS", href: "/services/urology/rirs", body_region: "pelvis" },
            { title: "Stapler Circumcision", href: "/services/urology/stapler-circumcision", body_region: "pelvis" },
            { title: "Swollen Penis", href: "/services/urology/swollen-penis", body_region: "pelvis" },
            { title: "URSL", href: "/services/urology/ursl", body_region: "pelvis" },
            { title: "Varicocele", href: "/services/urology/varicocele", body_region: "pelvis" },
        ]
    },
    {
        title: "ENT",
        slug: "ent",
        href: "/services/ent",
        items: [
            { title: "Adenoidectomy", href: "/services/ent/adenoidectomy", body_region: "ent" },
            { title: "Ear Surgery", href: "/services/ent/ear-surgery", body_region: "ent" },
            { title: "Mastoidectomy", href: "/services/ent/mastoidectomy", body_region: "ent" },
            { title: "Myringotomy", href: "/services/ent/myringotomy", body_region: "ent" },
            { title: "Nasal Polyps", href: "/services/ent/nasal-polyps", body_region: "ent" },
            { title: "Rhinoplasty", href: "/services/ent/rhinoplasty", body_region: "ent" },
            { title: "Septoplasty", href: "/services/ent/septoplasty", body_region: "ent" },
            { title: "Sinus Treatment", href: "/services/ent/sinus-treatment", body_region: "ent" },
            { title: "Stapedectomy", href: "/services/ent/stapedectomy", body_region: "ent" },
            { title: "Throat Surgery", href: "/services/ent/throat-surgery", body_region: "ent" },
            { title: "Tonsillectomy", href: "/services/ent/tonsillectomy", body_region: "ent" },
            { title: "Turbinate Reduction", href: "/services/ent/turbinate-reduction", body_region: "ent" },
            { title: "Tympanoplasty", href: "/services/ent/tympanoplasty", body_region: "ent" },
            { title: "Vocal Cord Polyps", href: "/services/ent/vocal-cord-polyps", body_region: "ent" },
        ]
    },
    {
        title: "Gynecology",
        slug: "gynaecology",
        href: "/services/gynaecology",
        items: [
            { title: "Fertility Services", href: "/services/gynaecology/fertility-services", body_region: "womens-health" },
            { title: "Hoodecomy", href: "/services/gynaecology/hoodecomy", body_region: "womens-health" },
            { title: "Hymenoplasty", href: "/services/gynaecology/hymenoplasty", body_region: "womens-health" },
            { title: "Hysterectomy", href: "/services/gynaecology/hysterectomy", body_region: "womens-health" },
            { title: "Labiaplasty", href: "/services/gynaecology/labiaplasty", body_region: "womens-health" },
            { title: "Monsplasty", href: "/services/gynaecology/monsplasty", body_region: "womens-health" },
            { title: "Pelvic Floor Disorders", href: "/services/gynaecology/pelvic-floor-disorders", body_region: "womens-health" },
            { title: "Rectal Prolapse", href: "/services/gynaecology/rectal-prolapse", body_region: "womens-health" },
            { title: "Uterine Fibroids", href: "/services/gynaecology/uterine-fibroids", body_region: "womens-health" },
            { title: "Vaginoplasty", href: "/services/gynaecology/vaginoplasty", body_region: "womens-health" },
            { title: "Vestoplasty", href: "/services/gynaecology/vestoplasty", body_region: "womens-health" },
        ]
    },
    {
        title: "Obstetrics",
        slug: "gynaecology",
        href: "/services/gynaecology",
        items: [
            { title: "Antepartum and Intrapartum Monitoring", href: "/services/gynaecology/antepartum-monitoring", body_region: "womens-health" },
            { title: "High Risk Pregnancy", href: "/services/gynaecology/high-risk-pregnancy", body_region: "womens-health" },
            { title: "Labor & Delivery", href: "/services/gynaecology/labor-delivery", body_region: "womens-health" },
            { title: "Postpartum Care", href: "/services/gynaecology/postpartum-care", body_region: "womens-health" },
            { title: "Prenatal Care", href: "/services/gynaecology/prenatal-care", body_region: "womens-health" },
        ]
    },
    {
        title: "General Medicine",
        slug: "general-medicine",
        href: "/services/general-medicine",
        items: [
            { title: "Chronic Disease Management", href: "/services/general-medicine/chronic-disease-management", body_region: "chest" },
            { title: "Diagnostic Procedure", href: "/services/general-medicine/diagnostic-procedure", body_region: "chest" },
            { title: "Management of Infections", href: "/services/general-medicine/management-of-infections", body_region: "chest" },
        ]
    },
    {
        title: "Bariatric & Weight Management",
        slug: "bariatric",
        href: "/services/bariatric",
        items: [
            { title: "Bariatric Surgery", href: "/services/bariatric/bariatric-surgery", body_region: "abdomen" },
            { title: "Intragastric Balloon", href: "/services/bariatric/intragastric-balloon", body_region: "abdomen" },
        ]
    },
    {
        title: "Podiatry",
        slug: "podiatry",
        href: "/services/podiatry",
        items: [
            { title: "Corn Removal", href: "/services/podiatry/corn-removal", body_region: "legs" },
            { title: "Diabetic Foot Ulcer", href: "/services/podiatry/diabetic-foot-ulcer", body_region: "legs" },
        ]
    },
    {
        title: "Endocrinology",
        slug: "general-medicine",
        href: "/services/general-medicine",
        items: [
            { title: "Metabolic and Endocrine Disorders", href: "/services/general-medicine/metabolic-endocrine-disorders", body_region: "abdomen" },
        ]
    },
    {
        title: "Gastroenterology",
        slug: "bariatric",
        href: "/services/bariatric",
        items: [
            { title: "Gastrointestinal Issues", href: "/services/bariatric/gastrointestinal-issues", body_region: "abdomen" },
        ]
    },
    {
        title: "Neurology",
        slug: "neurology",
        href: "/services/neurology",
        items: [
            { title: "Headache or Migraine", href: "/services/neurology/headache-or-migraine", body_region: "head" },
        ]
    },
    {
        title: "Oncology",
        slug: "oncology",
        href: "/services/oncology",
        items: [
            { title: "Cancer Care", href: "/services/oncology/cancer-care", body_region: "skin-oncology" },
        ]
    },
    {
        title: "Psychiatry",
        slug: "general-medicine",
        href: "/services/general-medicine",
        items: [
            { title: "Mental Health", href: "/services/general-medicine/mental-health", body_region: "mental-health" },
        ]
    },
    {
        title: "Pulmonology",
        slug: "pulmonology",
        href: "/services/pulmonology",
        items: [
            { title: "Respiratory", href: "/services/pulmonology/respiratory", body_region: "chest" },
        ]
    },
    {
        title: "Vascular",
        slug: "vascular",
        href: "/services/vascular",
        items: [
            { title: "DVT Treatment", href: "/services/vascular/dvt-treatment", body_region: "heart" },
        ]
    },
]

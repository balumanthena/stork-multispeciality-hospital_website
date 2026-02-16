import { MegaMenuSection } from "@/components/layout/navbar/nav-data"

// Icons mapping based on user emoji
// 🩺 General Surgery -> Scissors/Stethoscope
// 🦴 Orthopedics -> Bone
// 🧠 Neurology -> Brain
// 🫁 Respiratory -> Wind
// 🧑⚕️ Urology -> TestTube (or User)
// 👶 Obstetrics -> Baby
// 👩⚕️ Gynecology -> User/Flower? (Scissors for now or Baby)
// 🦻 ENT -> Ear
// 🦶 Podiatry -> Footprints (Lucide doesn't have foot, maybe Footprints?)
// 🧬 Endocrinology -> Dna
// 🧪 Gastroenterology -> TestTube/Utensils
// 🏥 Oncology -> Activity/Ribbon
// 🧠 Psychiatry -> Brain
// 💉 Vascular -> Syringe/Heart
// 🩺 Bariatric -> Weight
// 🧾 General Medicine -> FileText

export const PAGE_TREATMENTS: MegaMenuSection[] = [
    {
        title: "General Surgery",
        slug: "general-surgery",
        items: [
            { title: "Appendicitis", href: "/treatments/appendicitis" },
            { title: "Gallstone", href: "/treatments/gallstone" },
            { title: "Hernia", href: "/treatments/hernia" },
            { title: "Umbilical Hernia", href: "/treatments/umbilical-hernia" },
            { title: "Inguinal Hernia", href: "/treatments/inguinal-hernia" },
            { title: "Incisional Hernia", href: "/treatments/incisional-hernia" },
            { title: "Piles", href: "/treatments/piles" },
            { title: "Fissure Surgery", href: "/treatments/fissure-surgery" },
            { title: "Anal Fissure", href: "/treatments/anal-fissure" },
            { title: "Anal Fistula", href: "/treatments/anal-fistula" },
            { title: "Perianal Abscess", href: "/treatments/perianal-abscess" },
            { title: "Pilonidal Sinus", href: "/treatments/pilonidal-sinus" },
            { title: "Hydrocele", href: "/treatments/hydrocele" },
            { title: "Varicose Veins", href: "/treatments/varicose-veins" },
            { title: "Surgical Interventions", href: "/treatments/surgical-interventions" },
            { title: "Minimally Invasive Surgery", href: "/treatments/minimally-invasive-surgery" },
        ]
    },
    {
        title: "Orthopedics",
        slug: "orthopedics",
        items: [
            { title: "Back Pain", href: "/treatments/back-pain" },
            { title: "Neck Pain", href: "/treatments/neck-pain" },
            { title: "Hip Pain", href: "/treatments/hip-pain" },
            { title: "Knee Pain", href: "/treatments/knee-pain" },
            { title: "Shoulder Pain", href: "/treatments/shoulder-pain" },
            { title: "Elbow Pain", href: "/treatments/elbow-pain" },
            { title: "Foot or Ankle Pain", href: "/treatments/foot-ankle-pain" },
            { title: "Sports Pain", href: "/treatments/sports-pain" },
            { title: "Meniscus Tear", href: "/treatments/meniscus-tear" },
            { title: "Rotator Cuff Repair", href: "/treatments/rotator-cuff-repair" },
            { title: "Arthroscopy Surgery", href: "/treatments/arthroscopy-surgery" },
            { title: "Knee Arthroscopy", href: "/treatments/knee-arthroscopy" },
            { title: "Shoulder Arthroscopy", href: "/treatments/shoulder-arthroscopy" },
            { title: "Hip Replacement Surgery", href: "/treatments/hip-replacement" },
            { title: "Shoulder Replacement", href: "/treatments/shoulder-replacement" },
            { title: "Total Knee Replacement", href: "/treatments/total-knee-replacement" },
            { title: "Spine Surgery", href: "/treatments/spine-surgery" },
            { title: "Shoulder Dislocation", href: "/treatments/shoulder-dislocation" },
        ]
    },
    {
        title: "Neurology",
        slug: "neurology",
        items: [
            { title: "Headache or Migraine", href: "/treatments/headache-migraine" },
        ]
    },
    {
        title: "Respiratory / Pulmonology",
        slug: "respiratory-pulmonology",
        items: [
            { title: "Respiratory", href: "/treatments/respiratory" },
        ]
    },
    {
        title: "Urology & Andrology",
        slug: "urology-andrology",
        items: [
            { title: "Kidney Stones", href: "/treatments/kidney-stones" },
            { title: "ESWL", href: "/treatments/eswl" },
            { title: "PCNL", href: "/treatments/pcnl" },
            { title: "RIRS", href: "/treatments/rirs" },
            { title: "URSL", href: "/treatments/ursl" },
            { title: "Enlarged Prostate", href: "/treatments/enlarged-prostate" },
            { title: "Prostatectomy", href: "/treatments/prostatectomy" },
            { title: "Circumcision", href: "/treatments/circumcision" },
            { title: "Stapler Circumcision", href: "/treatments/stapler-circumcision" },
            { title: "Phimosis", href: "/treatments/phimosis" },
            { title: "Paraphimosis", href: "/treatments/paraphimosis" },
            { title: "Foreskin Infection", href: "/treatments/foreskin-infection" },
            { title: "Frenuloplasty Surgery", href: "/treatments/frenuloplasty" },
            { title: "Balanitis", href: "/treatments/balanitis" },
            { title: "Balanoposthitis", href: "/treatments/balanoposthitis" },
            { title: "Swollen Penis", href: "/treatments/swollen-penis" },
            { title: "Varicocele", href: "/treatments/varicocele" },
        ]
    },
    {
        title: "Obstetrics (Pregnancy & Maternity)",
        slug: "obstetrics",
        items: [
            { title: "Prenatal Care", href: "/treatments/prenatal-care" },
            { title: "Antepartum and Intrapartum Monitoring", href: "/treatments/antepartum-intrapartum" },
            { title: "Labor & Delivery", href: "/treatments/labor-delivery" },
            { title: "Postpartum Care", href: "/treatments/postpartum-care" },
            { title: "High Risk Pregnancy Management", href: "/treatments/high-risk-pregnancy" },
        ]
    },
    {
        title: "Gynecology",
        slug: "gynecology",
        items: [
            { title: "Uterine Fibroids", href: "/treatments/uterine-fibroids" },
            { title: "Pelvic Floor Disorders", href: "/treatments/pelvic-floor-disorders" },
            { title: "Rectal Prolapse", href: "/treatments/rectal-prolapse" },
            { title: "Labiaplasty", href: "/treatments/labiaplasty" },
            { title: "Vaginoplasty", href: "/treatments/vaginoplasty" },
            { title: "Hymenoplasty", href: "/treatments/hymenoplasty" },
            { title: "Hoodecomy", href: "/treatments/hoodecomy" },
        ]
    },
    {
        title: "ENT (Ear, Nose & Throat)",
        slug: "ent",
        items: [
            { title: "Adenoidectomy", href: "/treatments/adenoidectomy" },
            { title: "Tonsillectomy", href: "/treatments/tonsillectomy" },
            { title: "Throat Surgery", href: "/treatments/throat-surgery" },
            { title: "Mastoidectomy", href: "/treatments/mastoidectomy" },
            { title: "Myringotomy", href: "/treatments/myringotomy" },
            { title: "Tympanoplasty", href: "/treatments/tympanoplasty" },
            { title: "Stapedectomy", href: "/treatments/stapedectomy" },
            { title: "Septoplasty", href: "/treatments/septoplasty" },
            { title: "Rhinoplasty", href: "/treatments/rhinoplasty" },
            { title: "Turbinate Reduction", href: "/treatments/turbinate-reduction" },
            { title: "Nasal Polyps", href: "/treatments/nasal-polyps" },
            { title: "Sinus", href: "/treatments/sinus" },
            { title: "Vocal Cord Polyps", href: "/treatments/vocal-cord-polyps" },
            { title: "Ear Surgery", href: "/treatments/ear-surgery" },
        ]
    },
    {
        title: "Podiatry / Foot Care",
        slug: "podiatry",
        items: [
            { title: "Corn Removal", href: "/treatments/corn-removal" },
            { title: "Diabetic Foot Ulcers", href: "/treatments/diabetic-foot-ulcers" },
        ]
    },
    {
        title: "Endocrinology",
        slug: "endocrinology",
        items: [
            { title: "Thyroidectomy", href: "/treatments/thyroidectomy" },
            { title: "Metabolic and Endocrine Disorders", href: "/treatments/metabolic-endocrine-disorders" },
        ]
    },
    {
        title: "Gastroenterology",
        slug: "gastroenterology",
        items: [
            { title: "Gastrointestinal Issues", href: "/treatments/gastrointestinal-issues" },
        ]
    },
    {
        title: "Oncology",
        slug: "oncology",
        items: [
            { title: "Cancer Care", href: "/treatments/cancer-care" },
        ]
    },
    {
        title: "Psychiatry / Mental Health",
        slug: "psychiatry",
        items: [
            { title: "Mental Health", href: "/treatments/mental-health" },
        ]
    },
    {
        title: "Vascular",
        slug: "vascular",
        items: [
            { title: "DVT", href: "/treatments/dvt" },
        ]
    },
    {
        title: "Bariatric & Weight Management",
        slug: "bariatric",
        items: [
            { title: "Bariatric Surgery", href: "/treatments/bariatric-surgery" },
            { title: "Intragastric Balloon", href: "/treatments/intragastric-balloon" },
        ]
    },
    {
        title: "General Medicine",
        slug: "general-medicine",
        items: [
            { title: "Chronic Disease Management", href: "/treatments/chronic-disease-management" },
            { title: "Management of Infections", href: "/treatments/management-of-infections" },
            { title: "Diagnostic Procedure", href: "/treatments/diagnostic-procedure" },
        ]
    },
]

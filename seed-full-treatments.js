
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing env vars')
    process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const TREATMENT_NAMES = [
    "Adenoidectomy", "Anal Fissure", "Anal Fistula", "Antepartum and Intrapartum Monitoring", "Appendicitis",
    "Arthroscopy Surgery", "Back Pain", "Balanitis", "Balanoposthitis", "Bariatric Surgery", "Cancer Care",
    "Chronic Disease Management", "Circumcision", "Corn Removal", "Diabetic Foot Ulcers", "Diagnostic Procedure",
    "DVT", "Ear Surgery", "Elbow Pain", "Enlarged Prostate", "ESWL", "Fertility Services", "Fissure Surgery",
    "Foot or Ankle Pain", "Foreskin Infection", "Frenuloplasty Surgery", "Gallstone", "Gastrointestinal Issues",
    "Headache or Migraine", "Hernia", "High Risk Pregnancy Management", "Hip Pain", "Hip Replacement Surgery",
    "Hoodecomy", "Hydrocele", "Hymenoplasty", "Incisional Hernia", "Inguinal Hernia", "Intragastric Balloon",
    "Kidney Stones", "Knee Arthroscopy", "Knee Pain", "Labiaplasty", "Labor & Delivery", "Management of Infections",
    "Mastoidectomy", "Meniscus Tear", "Mental Health", "Metabolic and Endocrine Disorders", "Minimally Invasive Surgery",
    "Monoplasty", "Myringotomy", "Nasal Polyps", "Neck Pain", "Paraphimosis", "PCNL", "Pelvic Floor Disorders",
    "Perianal Abscess", "Phimosis", "Piles", "Pilonidal Sinus", "Postpartum Care", "Prenatal Care", "Prostatectomy",
    "Rectal Prolapse", "Respiratory", "RIRS", "Rotator Cuff Repair", "Septoplasty", "Shoulder Arthroscopy",
    "Shoulder Dislocation", "Shoulder Pain", "Shoulder Replacement", "Sinus", "Spine Surgery", "Sports Pain",
    "Stapedectomy", "Stapler Circumcision", "Surgical Interventions", "Swollen Penis", "Throat Surgery",
    "Thyroidectomy", "Tonsillectomy", "Total Knee Replacement", "Turbinate Reduction", "Tympanoplasty", "URSL",
    "Vaginoplasty", "Varicocele", "Varicose Veins", "Vocal Cord Polyps", "Rhinoplasty", "Umbilical Hernia",
    "Uterine Fibroids", "Vestoplasty"
]

function toSlug(text) {
    return text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
}

async function seed() {
    console.log(`Preparing to seed ${TREATMENT_NAMES.length} treatments...`)

    const treatments = TREATMENT_NAMES.map(title => ({
        title,
        slug: toSlug(title),
        is_active: true
    }))

    // Batch insert/upsert
    // Since we don't have a unique constraint on slug/title in the schema def provided (it might have one, but let's be safe),
    // and we want to avoid duplicates if run multiple times.
    // We will check existing first.

    const { data: existing, error: fetchError } = await supabase.from('treatments').select('slug')

    if (fetchError) {
        console.error('Error fetching existing treatments:', fetchError)
        return
    }

    const existingSlugs = new Set(existing?.map(t => t.slug) || [])

    const newTreatments = treatments.filter(t => !existingSlugs.has(t.slug))

    if (newTreatments.length === 0) {
        console.log('All treatments already exist.')
        return
    }

    console.log(`Inserting ${newTreatments.length} new treatments...`)

    // Supabase limits batch size, let's do chunks of 50
    const chunkSize = 50
    for (let i = 0; i < newTreatments.length; i += chunkSize) {
        const chunk = newTreatments.slice(i, i + chunkSize)
        const { error } = await supabase.from('treatments').insert(chunk)

        if (error) {
            console.error(`Error inserting chunk ${i}:`, error)
        } else {
            console.log(`Inserted chunk ${i}-${i + chunk.length}`)
        }
    }

    console.log('Done!')
}

seed()

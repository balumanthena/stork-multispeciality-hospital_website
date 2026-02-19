
import { createClient } from '@supabase/supabase-js'
import { HARDCODED_TREATMENTS } from './src/lib/data/hardcoded-treatments.ts' // We might need to adjust import if running with tsx

// Mocking the structure for the script since we can't easily import TS in JS script without setup
// Actually we can use 'tsx' to run it.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing env vars')
    process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function backfill() {
    console.log('Fetching departments...')
    const { data: departments, error: depError } = await supabase.from('departments').select('id, name, slug')

    if (depError) {
        console.error('Error fetching departments:', depError)
        return
    }

    if (!departments || departments.length === 0) {
        console.error('No departments found in DB. Cannot link.')
        return
    }

    const deptMap = {} // name -> id
    departments.forEach(d => {
        deptMap[d.name.toLowerCase()] = d.id
        // Also map by slug if possible? 'general-surgery'
        // The hardcoded list uses slugs and titles.
    })

    console.log(`Found ${departments.length} departments.`)

    // We can't import the TS file easily in this raw script context if we don't have the right config.
    // I'll regex parse it like before, OR just define the mapping here for the main ones.
    // Actually, I can read the file and regex it again, that was reliable.

    // Instead of regex, I'll use the user's hardcoded text representation or just assume the structure.
    // Wait, I can try to use `tsx` to run this file and import the helper? 
    // Yes, the command `npx tsx fix-treatment-departments.ts` should work if I rename it to .ts and fix imports.
    // But `src/lib/data/hardcoded-treatments.ts` imports `grouped-treatments`, which imports `react`. That might fail in Node env.

    // Fallback: I will construct a manual mapping here based on the file I viewed. 
    // It's safer than dealing with React dependency in a Node script.

    // Mapping: Category Title -> Array of Treatment Slugs/Titles
    // Based on `src/lib/data/hardcoded-treatments.ts` content I read.
    const MAPPING = {
        "General Surgery": ["anal-fissure", "anal-fistula", "appendicitis", "fissure-surgery", "gallstone", "hernia", "hydrocele", "incisional-hernia", "inguinal-hernia", "minimally-invasive-surgery", "perianal-abscess", "piles-hemorrhoids", "pilonidal-sinus", "surgical-interventions", "thyroidectomy", "umbilical-hernia", "varicose-veins"],
        "Orthopedics": ["arthroscopy-surgery", "back-pain", "elbow-pain", "foot-or-ankle-pain", "hip-pain", "hip-replacement-surgery", "knee-arthroscopy", "knee-pain", "meniscus-tear", "neck-pain", "rotator-cuff-repair", "shoulder-arthroscopy", "shoulder-dislocation", "shoulder-pain", "shoulder-replacement", "spine-surgery", "sports-injury", "total-knee-replacement"],
        "Urology & Andrology": ["balanitis", "balanoposthitis", "circumcision", "enlarged-prostate", "eswl", "foreskin-infection", "frenuloplasty-surgery", "kidney-stones", "paraphimosis", "pcnl", "phimosis", "prostatectomy", "rirs", "stapler-circumcision", "swollen-penis", "ursl", "varicocele"],
        "ENT": ["adenoidectomy", "ear-surgery", "mastoidectomy", "myringotomy", "nasal-polyps", "rhinoplasty", "septoplasty", "sinus-treatment", "stapedectomy", "throat-surgery", "tonsillectomy", "turbinate-reduction", "tympanoplasty", "vocal-cord-polyps"],
        "Gynecology": ["fertility-services", "hoodecomy", "hymenoplasty", "hysterectomy", "labiaplasty", "monsplasty", "pelvic-floor-disorders", "rectal-prolapse", "uterine-fibroids", "vaginoplasty", "vestoplasty"],
        "Obstetrics": ["antepartum-monitoring", "high-risk-pregnancy", "labor-delivery", "postpartum-care", "prenatal-care"],
        "General Medicine": ["chronic-disease-management", "diagnostic-procedure", "management-of-infections", "metabolic-endocrine-disorders", "mental-health"],
        "Bariatric & Weight Management": ["bariatric-surgery", "intragastric-balloon", "gastrointestinal-issues"], // Merged Gastroenterology which had duplicate slug 'bariatric' in hardcoded file? No, separate.
        "Podiatry": ["corn-removal", "diabetic-foot-ulcer"],
        "Neurology": ["headache-or-migraine"],
        "Oncology": ["cancer-care"],
        "Pulmonology": ["respiratory"],
        "Vascular": ["dvt-treatment"]
    }

    // Adjusting for "Gastroenterology" and others if names match exactly or close.
    // In Hardcoded file: 
    // "Endocrinology" (slug: "general-medicine")
    // "Gastroenterology" (slug: "bariatric") -> Weird slug reuse in hardcoded file.
    // I will use Titles to match DB Departments.

    for (const [categoryTitle, slugs] of Object.entries(MAPPING)) {
        // Find Dept ID

        // Try exact match
        let deptId = deptMap[categoryTitle.toLowerCase()]

        // If not found, try some fuzzy mapping or skipped
        if (!deptId) {
            console.warn(`Category '${categoryTitle}' not found in DB Departments. Skipping items: ${slugs.join(', ')}`)
            // Try to find by partial? 
            // Maybe "Urology" for "Urology & Andrology"?
            const match = departments.find(d => categoryTitle.toLowerCase().includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(categoryTitle.toLowerCase()))
            if (match) {
                console.log(`Fuzzy matched '${categoryTitle}' to '${match.name}'`)
                deptId = match.id
            } else {
                continue
            }
        }

        console.log(`Updating ${slugs.length} treatments for '${categoryTitle}'...`)

        // Update all slugs
        for (const slug of slugs) {
            // Need to handle "diabetic-foot-ulcers" vs "diabetic-foot-ulcer" mismatch
            // I'll try exact match on slug first.

            const { error } = await supabase
                .from('treatments')
                .update({ department_id: deptId })
                .eq('slug', slug)

            if (error) console.error(`Failed to update ${slug}:`, error.message)

            // Try plural/singular variations if first failed? 
            // Or just blindly run update for both variants to be sure.
            await supabase
                .from('treatments')
                .update({ department_id: deptId })
                .eq('slug', slug + 's')
        }
    }
    console.log('Backfill complete.')
}

backfill()

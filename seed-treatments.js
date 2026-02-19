import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing env vars')
    process.exit(1)
}

// Need service role key to insert if RLS blocks anon inserts
// But assuming anon might not work if table is protected.
// Let's try inserting with anon key if RLS allows, otherwise we need service key which we dont have in .env.local usually
// Wait, looking at .env.local in Step 337, only ANON key is there.
// If RLS is enabled, I can't insert.
// Check if table has data now.

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function seedTreatments() {
    console.log('Seeding treatments...')
    // First check if any exist
    const { data: existing } = await supabase.from('treatments').select('id').limit(1)
    if (existing && existing.length > 0) {
        console.log('Treatments already exist. Skipping seed.')
        return
    }

    const treatments = [
        { title: 'Robotic Knee Replacement', slug: 'robotic-knee-replacement', is_active: true },
        { title: 'Hip Replacement', slug: 'hip-replacement', is_active: true },
        { title: 'Arthroscopy', slug: 'arthroscopy', is_active: true }
    ]

    const { data, error } = await supabase.from('treatments').insert(treatments).select()

    if (error) {
        console.error('Seed Error:', JSON.stringify(error, null, 2))
    } else {
        console.log('Seeded:', data)
    }
}

seedTreatments()

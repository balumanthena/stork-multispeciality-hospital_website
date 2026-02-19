import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing env vars')
    process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function testFetch() {
    console.log('Testing fetch from "treatments"...')
    const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error details:', JSON.stringify(error, null, 2))
    } else {
        console.log('Success! Data:', data)
    }
}

testFetch()

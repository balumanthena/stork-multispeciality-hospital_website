import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hvhlxcgryxcormdvjplc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aGx4Y2dyeXhjb3JtZHZqcGxjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTAzODE1NywiZXhwIjoyMDg2NjE0MTU3fQ.3Gk3Se5gsRU-mpG-fbtxvH0NNFZfbCZNAdQmgGe1640'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSchema() {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error fetching blog:', error)
        return
    }

    if (data && data.length > 0) {
        console.log('Columns in blogs table:', Object.keys(data[0]))
    } else {
        console.log('No blogs found in table.')
    }
}

checkSchema()

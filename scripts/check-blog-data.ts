import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hvhlxcgryxcormdvjplc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aGx4Y2dyeXhjb3JtZHZqcGxjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTAzODE1NywiZXhwIjoyMDg2NjE0MTU3fQ.3Gk3Se5gsRU-mpG-fbtxvH0NNFZfbCZNAdQmgGe1640'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkBlogData() {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', 'testing-new-blog')
        .single()

    if (error) {
        console.error('Error:', error)
        return
    }

    console.log('Blog Data:', {
        title: data.title,
        content: data.content,
        enable_toc: data.enable_toc,
        enable_faq: data.enable_faq,
        faq_data: data.faq_data
    })
}

checkBlogData()

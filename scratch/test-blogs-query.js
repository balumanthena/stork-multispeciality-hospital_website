const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('blogs').select('id, title, slug, category, published_at, created_at, status, author, author_id').order('created_at', { ascending: false });
  console.log('Error:', error);
  console.log('Data count:', data ? data.length : 0);
}
test();

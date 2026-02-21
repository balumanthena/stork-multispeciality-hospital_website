const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function check() {
  const { data: blogData, error: blogErr } = await supabase
    .from('blogs')
    .select('id, title, department_id, treatment_id, status, target_placement')
    .order('created_at', { ascending: false })
    .limit(5);

  console.log('Recent Blogs:', blogData);
}

check();

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function check() {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, department_id, treatment_id, status, is_active')
    .ilike('title', '%Testing%');
    
  console.log('Blogs:', data);
  console.error('Errors:', error);
}

check();

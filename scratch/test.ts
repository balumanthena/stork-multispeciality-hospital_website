import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('blogs').select('id, title, slug, category, published_at, created_at, status, author, author_id').order('created_at', { ascending: false });
  console.log('Error 1:', error);
  
  const { data: data2, error: error2 } = await supabase.from('blogs').select('*').limit(1);
  console.log('Error 2:', error2);
  if (data2 && data2.length > 0) {
      console.log('Keys:', Object.keys(data2[0]));
  }
}
test();

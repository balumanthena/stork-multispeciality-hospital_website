import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://hvhlxcgryxcormdvjplc.supabase.co"
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aGx4Y2dyeXhjb3JtZHZqcGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMzgxNTcsImV4cCI6MjA4NjYxNDE1N30.j7hanhgS0vFlJTOaHcEnC1hyYtCvms1gr1vzrA6l9Xc"

// Force anonymous no-auth scenario like Next.js server fetch without cookies
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
});

async function check() {
  const { data: deptData } = await supabase
    .from("departments")
    .select("id")
    .eq("slug", "cosmetic-surgery")
    .single();

  const { data: blogs, error: blogErr } = await supabase
    .from("blogs")
    .select('id, title, status')
    .eq("department_id", deptData.id)
    .eq("status", "Published")

  console.log('Query result as pure anon user:', blogs, blogErr);
}

check();

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function checkTables() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  console.log('Checking tables...')

  const tables = ['auth_logs', 'password_otps', 'site_settings']
  
  for (const table of tables) {
    const { error } = await supabase.from(table).select('id').limit(1)
    if (error) {
      console.log(`❌ Table "${table}" error:`, error.message)
    } else {
      console.log(`✅ Table "${table}" exists and is accessible.`)
    }
  }
}

checkTables()

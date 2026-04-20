const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function debugAuth() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  console.log('URL:', url)
  console.log('Key length:', key?.length)
  
  const supabase = createClient(url, key)

  console.log('Testing listUsers...')
  const { data, error } = await supabase.auth.admin.listUsers()
  
  if (error) {
    console.error('❌ listUsers failed:', error.message)
    console.error('Full error:', error)
  } else {
    console.log('✅ listUsers success. User count:', data.users.length)
    const user = data.users.find(u => u.email === 'ruralgreek4@gmail.com')
    console.log('User found:', !!user)
  }
}

debugAuth()

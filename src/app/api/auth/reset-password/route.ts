import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { logAuthEvent } from '@/lib/logger'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Enterprise level password requirement
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters for enterprise security' }, { status: 400 })
    }

    // 1. IP Rate Limiting
    const rateLimit = await checkRateLimit({ req })
    if (!rateLimit.allowed) {
      await logAuthEvent({ email, action: 'RATE_LIMIT_EXCEEDED', status: 'FAILED', req })
      return NextResponse.json({ error: rateLimit.error }, { status: 429 })
    }

    const supabase = createAdminClient()

    // 2. Find user ID from email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers()
    const user = userData.users.find((u) => u.email === email)

    if (!user) {
      await logAuthEvent({ email, action: 'RESET_PASSWORD', status: 'FAILED', req, metadata: { reason: 'user_not_found' } })
      return NextResponse.json({ error: 'Update failed. User session invalid.' }, { status: 404 })
    }

    // 3. Update password using Admin API
    const { error: resetError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: password }
    )

    if (resetError) {
      await logAuthEvent({ email, action: 'RESET_PASSWORD', status: 'FAILED', req, metadata: { error: resetError.message } })
      throw resetError
    }

    await logAuthEvent({ email, action: 'RESET_PASSWORD', status: 'SUCCESS', req })

    return NextResponse.json({ success: true, message: 'Password updated successfully' })
  } catch (error: any) {
    console.error('Reset Password Error:', error)
    return NextResponse.json({ error: 'Failed to reset password. Internal security error.' }, { status: 500 })
  }
}


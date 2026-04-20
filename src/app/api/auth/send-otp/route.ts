import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateOTP, hashOTP } from '@/lib/otp'
import { sendOTPEmail } from '@/lib/email'
import { logAuthEvent } from '@/lib/logger'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // 1. Enterprise Rate Limiting
    const rateLimit = await checkRateLimit({ email, req })
    if (!rateLimit.allowed) {
      await logAuthEvent({ email, action: 'RATE_LIMIT_EXCEEDED', status: 'FAILED', req })
      return NextResponse.json({ error: rateLimit.error }, { status: 429 })
    }

    const supabase = createAdminClient()

    // 2. Email Enumeration Protection: Find user
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers()
    const user = userData.users.find((u) => u.email === email)

    if (!user) {
      await logAuthEvent({ email, action: 'SEND_OTP', status: 'FAILED', req, metadata: { reason: 'user_not_found' } })
      // For security, always return success message
      return NextResponse.json({ success: true, message: 'If an account exists, an OTP has been sent.' })
    }

    // 3. Generate and Store OTP with Metadata
    const otp = generateOTP()
    const hashedOtp = await hashOTP(otp)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString()

    const { error: insertError } = await supabase.from('password_otps').insert({
      email,
      otp_hash: hashedOtp,
      expires_at: expiresAt,
      ip_address: ip,
      user_agent: userAgent
    })

    if (insertError) throw insertError

    // 4. Send Email & Log Success
    await sendOTPEmail({
      to: email,
      subject: 'Your Password Reset Verification Code',
      otp,
    })

    await logAuthEvent({ email, action: 'SEND_OTP', status: 'SUCCESS', req })

    return NextResponse.json({ success: true, message: 'OTP sent successfully' })
  } catch (error: any) {
    console.error('Send OTP Error:', error)
    return NextResponse.json({ error: 'An internal error occurred. Please try again later.' }, { status: 500 })
  }
}

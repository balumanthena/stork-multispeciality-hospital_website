import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyOTP } from '@/lib/otp'
import { logAuthEvent } from '@/lib/logger'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 })
    }

    // 1. IP Rate Limiting
    const rateLimit = await checkRateLimit({ req })
    if (!rateLimit.allowed) {
      await logAuthEvent({ email, action: 'RATE_LIMIT_EXCEEDED', status: 'FAILED', req })
      return NextResponse.json({ error: rateLimit.error }, { status: 429 })
    }

    const supabase = createAdminClient()

    // 2. Fetch latest OTP for this email
    const { data: otpData, error: otpError } = await supabase
      .from('password_otps')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (otpError || !otpData) {
      await logAuthEvent({ email, action: 'VERIFY_FAIL', status: 'FAILED', req, metadata: { reason: 'no_otp_found' } })
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
    }

    // 3. Brute Force Protection: Check attempts
    if (otpData.attempts >= 5) {
      await logAuthEvent({ email, action: 'ABUSE_ATTEMPT', status: 'FAILED', req, metadata: { reason: 'max_attempts_exceeded' } })
      return NextResponse.json({ error: 'Too many failed attempts. Please request a new code.' }, { status: 400 })
    }

    // 4. Check Expiry
    const now = new Date()
    const expiresAt = new Date(otpData.expires_at)

    if (now > expiresAt) {
      await logAuthEvent({ email, action: 'VERIFY_FAIL', status: 'FAILED', req, metadata: { reason: 'expired' } })
      return NextResponse.json({ error: 'This code has expired' }, { status: 400 })
    }

    // 5. Verify OTP
    const isValid = await verifyOTP(otp, otpData.otp_hash)

    if (!isValid) {
      // Increment attempts
      await supabase.from('password_otps').update({ attempts: otpData.attempts + 1 }).eq('id', otpData.id)
      await logAuthEvent({ email, action: 'VERIFY_FAIL', status: 'FAILED', req, metadata: { attempts: otpData.attempts + 1 } })
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 })
    }

    // 6. Success - Delete used OTP and Log
    await supabase.from('password_otps').delete().eq('id', otpData.id)
    await logAuthEvent({ email, action: 'VERIFY_SUCCESS', status: 'SUCCESS', req })

    return NextResponse.json({ success: true, message: 'Code verified successfully' })
  } catch (error: any) {
    console.error('Verify OTP Error:', error)
    return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 500 })
  }
}


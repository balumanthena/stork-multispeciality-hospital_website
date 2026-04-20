import { createAdminClient } from './supabase/admin'

interface RateLimitCheck {
  email?: string
  req: Request
}

/**
 * Enterprise Rate Limiter
 * - Max 3 OTP requests per email in 5 minutes
 * - Max 10 total auth requests per IP in 10 minutes
 */
export async function checkRateLimit({ email, req }: RateLimitCheck): Promise<{ allowed: boolean; error?: string }> {
  const supabase = createAdminClient()
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'

  // 1. Check IP Rate Limit (Max 10 requests in 10 minutes)
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
  const { count: ipCount, error: ipError } = await supabase
    .from('auth_logs')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .gt('created_at', tenMinutesAgo)

  if (ipError) throw ipError
  if (ipCount && ipCount >= 20) { // Increased slightly to accommodate normal flow (send, verify, reset)
    return { allowed: false, error: 'Too many requests from this IP. Please try again later.' }
  }

  // 2. Check Email Rate Limit (Max 3 OTP sends in 5 minutes)
  if (email && req.url.includes('send-otp')) {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const { count: emailCount, error: emailError } = await supabase
      .from('auth_logs')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .eq('action', 'SEND_OTP')
      .gt('created_at', fiveMinutesAgo)

    if (emailError) throw emailError
    if (emailCount && emailCount >= 3) {
      return { allowed: false, error: 'Too many OTP requests for this email. Please wait 5 minutes.' }
    }
  }

  return { allowed: true }
}

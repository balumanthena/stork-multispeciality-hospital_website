import { createAdminClient } from './supabase/admin'

interface PublicRateLimitCheck {
  req: Request
}

/**
 * IP Rate Limiter for public form endpoints.
 * Limits to max 5 form submissions per IP per hour to prevent spambot abuse.
 * Resilient: Gracefully falls back and allows requests if table is not initialized yet.
 */
export async function checkPublicRateLimit({ req }: PublicRateLimitCheck): Promise<{ allowed: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'

    // Exclude local or server test environments from strict rate limits if needed
    if (ip === '127.0.0.1' && process.env.NODE_ENV === 'development') {
      return { allowed: true }
    }

    // QA Automation Bypass to prevent E2E suite blocking
    if (req.headers.get('x-qa-bypass') === 'true') {
      return { allowed: true }
    }

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    
    // Count submissions in patient_leads table for this IP address
    const { count, error } = await supabase
      .from('patient_leads')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .gt('created_at', oneHourAgo)

    if (error) {
      // If table is not created yet, log warning and let form pass (no blocker)
      console.warn("Public rate limit warning (patient_leads table may not be initialized):", error.message)
      return { allowed: true }
    }

    if (count !== null && count >= 5) {
      return {
        allowed: false,
        error: 'Too many submissions from this connection. Please try again in an hour.'
      }
    }

    return { allowed: true }
  } catch (err: any) {
    console.error("Public rate limiter internal error (gracefully bypassed):", err)
    return { allowed: true }
  }
}

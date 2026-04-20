import { createAdminClient } from './supabase/admin'

export type AuthAction = 'SEND_OTP' | 'VERIFY_SUCCESS' | 'VERIFY_FAIL' | 'RESET_PASSWORD' | 'ABUSE_ATTEMPT' | 'RATE_LIMIT_EXCEEDED'

interface LogParams {
  email?: string
  action: AuthAction
  status: 'SUCCESS' | 'FAILED'
  req: Request
  metadata?: any
}

/**
 * Logs authentication and security events to the auth_logs table for auditing.
 */
export async function logAuthEvent({ email, action, status, req, metadata = {} }: LogParams) {
  try {
    const supabase = createAdminClient()
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    const { error } = await supabase.from('auth_logs').insert({
      email,
      action,
      status,
      ip_address: ip,
      user_agent: userAgent,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString()
      }
    })

    if (error) console.error('Failed to log auth event:', error)
  } catch (err) {
    console.error('Logger Exception:', err)
  }
}

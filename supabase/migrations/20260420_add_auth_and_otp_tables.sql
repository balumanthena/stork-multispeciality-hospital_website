-- Migration: Add Auth Logs and Password OTPs
-- Description: Create tables for tracking security events and storing OTPs for password recovery.

-- 1. Create auth_logs table for security auditing
CREATE TABLE IF NOT EXISTS public.auth_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT,
    action TEXT NOT NULL,
    status TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create password_otps table for reset flow
CREATE TABLE IF NOT EXISTS public.password_otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    otp_hash TEXT NOT NULL,
    attempts INTEGER DEFAULT 0,
    expires_at TIMESTAMPTZ NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable RLS
ALTER TABLE public.auth_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_otps ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies (Only Admin Client can access these)
-- Note: createAdminClient uses SERVICE_ROLE which bypasses RLS.

-- Admin/SuperAdmin can read logs
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'is_content_admin') THEN
        DROP POLICY IF EXISTS "Admins can read auth logs" ON public.auth_logs;
        CREATE POLICY "Admins can read auth logs" ON public.auth_logs
        FOR SELECT TO authenticated USING (public.is_content_admin());
    END IF;
END $$;

-- 5. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_auth_logs_email ON public.auth_logs(email);
CREATE INDEX IF NOT EXISTS idx_auth_logs_ip ON public.auth_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_auth_logs_created_at ON public.auth_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_password_otps_email ON public.password_otps(email);

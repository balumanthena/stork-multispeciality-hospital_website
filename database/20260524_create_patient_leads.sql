-- ==============================================================================
-- Create patient_leads table for unified lead persistence and audit logging
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.patient_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    type TEXT NOT NULL CHECK (type IN ('appointment', 'lead', 'second-opinion')),
    department TEXT,
    doctor TEXT,
    preferred_date TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')),
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.patient_leads ENABLE ROW LEVEL SECURITY;

-- Create Policies (Admins can view and manage, system role bypassed via Service Key)
CREATE POLICY "Admins can view leads" ON public.patient_leads 
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can manage leads" ON public.patient_leads 
    FOR ALL USING (public.is_admin());

-- Realtime enablement
ALTER PUBLICATION supabase_realtime ADD TABLE public.patient_leads;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.patient_leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_type ON public.patient_leads(type);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.patient_leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.patient_leads(created_at);

-- Create site_settings table if not exists
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_name TEXT DEFAULT 'Stork Multispeciality Hospital',
    tagline TEXT DEFAULT 'Advanced Care, Personal Touch',
    emergency_number TEXT DEFAULT '+91 99999 99999',
    email TEXT DEFAULT 'contact@storkhospital.com',
    address TEXT DEFAULT 'Hyderabad, India',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public read site_settings"
ON site_settings FOR SELECT
TO anon
USING (true);

-- Allow admin update (authenticated users for now, can be restricted to admin role later)
CREATE POLICY "Admin update site_settings"
ON site_settings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Insert default row if table is empty
INSERT INTO site_settings (id)
SELECT gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- Create site_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_name text,
  tagline text,
  emergency_number text,
  address text,
  email text,
  updated_at timestamp DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read settings (public might need read access too eventually, but for admin panel auth is fine)
CREATE POLICY "Enable read access for all users" ON site_settings FOR SELECT USING (true);

-- Create policy for admins/authenticated users to update settings
CREATE POLICY "Enable update for authenticated users" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy for insert (only needed once)
CREATE POLICY "Enable insert for authenticated users" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert default row if table is empty
INSERT INTO site_settings (hospital_name, tagline, emergency_number, address, email)
SELECT 'Stork Hospital', 'Advanced Care for Everyone', '1066', 'C-35, opp. Narayana School, near DMart, Petbasheerabad, Kompally, Hyderabad, Secunderabad', 'contact@storkhospital.com'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

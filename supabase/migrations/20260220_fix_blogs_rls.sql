-- Ensure blogs table has the correct columns for Target Placement
ALTER TABLE IF EXISTS blogs
ADD COLUMN IF NOT EXISTS department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS treatment_id UUID REFERENCES treatments(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- Enable RLS
ALTER TABLE IF EXISTS blogs ENABLE ROW LEVEL SECURITY;

-- Drop existing overlapping policies to prevent conflicts
DROP POLICY IF EXISTS "Public can view published blogs" ON blogs;
DROP POLICY IF EXISTS "Admins can manage blogs" ON blogs;
DROP POLICY IF EXISTS "Admin allow all select blogs" ON blogs;
DROP POLICY IF EXISTS "Admin insert blogs" ON blogs;
DROP POLICY IF EXISTS "Admin update blogs" ON blogs;
DROP POLICY IF EXISTS "Admin delete blogs" ON blogs;

-- Create Public Read Policy
CREATE POLICY "Public can view published blogs" 
ON blogs FOR SELECT 
TO anon, authenticated 
USING (status = 'Published' );

-- Create Admin Full Access Policies
CREATE POLICY "Admin allow all select blogs" ON blogs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert blogs" ON blogs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update blogs" ON blogs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete blogs" ON blogs FOR DELETE TO authenticated USING (true);

-- Notify schema cache to reload immediately
-- NOTIFY pgrst, "reload_schema";

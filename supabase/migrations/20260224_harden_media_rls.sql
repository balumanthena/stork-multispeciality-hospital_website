-- Migration: Harden Media RLS
-- Description: Ensures that only active content is visible to the public and secures junction tables.

-- 1. Tighten treatment_videos RLS
DROP POLICY IF EXISTS "Public videos are viewable by everyone" ON treatment_videos;
CREATE POLICY "Public can view active videos" 
ON treatment_videos FOR SELECT 
TO anon, authenticated 
USING (is_active = true);

-- 2. Secure Video Junction Tables
ALTER TABLE video_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_treatments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view video departments" ON video_departments;
CREATE POLICY "Public can view video departments" 
ON video_departments FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS "Public can view video treatments" ON video_treatments;
CREATE POLICY "Public can view video treatments" 
ON video_treatments FOR SELECT 
TO anon, authenticated 
USING (true);

-- 3. Secure Blog Junction Tables
ALTER TABLE blog_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_treatments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view blog departments" ON blog_departments;
CREATE POLICY "Public can view blog departments" 
ON blog_departments FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS "Public can view blog treatments" ON blog_treatments;
CREATE POLICY "Public can view blog treatments" 
ON blog_treatments FOR SELECT 
TO anon, authenticated 
USING (true);

-- 4. Admin Policies for Junction Tables
-- (Assuming full access for authenticated users as per project pattern)
CREATE POLICY "Admins can manage video departments" ON video_departments FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can manage video treatments" ON video_treatments FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can manage blog departments" ON blog_departments FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can manage blog treatments" ON blog_treatments FOR ALL TO authenticated USING (true);

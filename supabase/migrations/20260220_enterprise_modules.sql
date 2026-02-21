-- Enterprise Modules Migration (Fixed for Data Integrity)

-- 1. PROFILES & RBAC
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Safely handle the role column and existing data
DO $$
BEGIN
    -- Check if column exists, if so, convert to text to support new roles
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'role') THEN
        -- Drop default first to avoid type mismatch during conversion
        ALTER TABLE profiles ALTER COLUMN role DROP DEFAULT;
        -- Convert to TEXT
        ALTER TABLE profiles ALTER COLUMN role TYPE TEXT USING role::text;
    ELSE
        -- Create if doesn't exist
        ALTER TABLE profiles ADD COLUMN role TEXT;
    END IF;

    -- Ensure permissions column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'permissions') THEN
        ALTER TABLE profiles ADD COLUMN permissions JSONB DEFAULT '{}'::jsonb;
    END IF;
END $$;

-- Sanitize existing data before applying constraint
-- Update any role that is NOT in the allowed list to 'editor'
UPDATE profiles 
SET role = 'editor' 
WHERE role IS NULL OR role NOT IN ('super_admin', 'editor', 'content_manager');

-- Now apply the constraint and default safely
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('super_admin', 'editor', 'content_manager'));
ALTER TABLE profiles ALTER COLUMN role SET DEFAULT 'editor';

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Recreate Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert their own profile" 
ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- 2. SITE SETTINGS (Recreate with expanded schema)
-- We drop this to ensure clean state as requested in plan
DROP TABLE IF EXISTS site_settings;

CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_name TEXT DEFAULT 'Stork Multispeciality Hospital',
    tagline TEXT DEFAULT 'Advanced Care, Personal Touch',
    logo_url TEXT,
    favicon_url TEXT,
    emergency_number TEXT,
    whatsapp_number TEXT,
    email TEXT,
    address TEXT,
    google_maps_embed TEXT,
    
    -- SEO Defaults
    default_meta_title TEXT,
    default_meta_description TEXT,
    og_image TEXT,
    
    -- Analytics
    google_analytics_id TEXT,
    google_tag_manager_id TEXT,
    facebook_pixel_id TEXT,
    
    -- Footer
    footer_description TEXT,
    working_hours TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_settings"
ON site_settings FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Super Admin update site_settings"
ON site_settings FOR UPDATE TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role = 'super_admin'
    )
);

-- Initialize default settings
INSERT INTO site_settings (
    hospital_name, 
    email, 
    emergency_number
) VALUES (
    'Stork Multispeciality Hospital', 
    'contact@storkhospital.com', 
    '+91 99999 99999'
);

-- 3. TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    location TEXT,
    treatment_id UUID REFERENCES treatments(id) ON DELETE SET NULL,
    review_text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin allow all select testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin delete testimonials" ON testimonials;

CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admin allow all select testimonials" ON testimonials FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update testimonials" ON testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

-- 4. AWARDS
CREATE TABLE IF NOT EXISTS awards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    issuing_authority TEXT,
    year TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE awards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read awards" ON awards;
DROP POLICY IF EXISTS "Admin allow all select awards" ON awards;
DROP POLICY IF EXISTS "Admin insert awards" ON awards;
DROP POLICY IF EXISTS "Admin update awards" ON awards;
DROP POLICY IF EXISTS "Admin delete awards" ON awards;

CREATE POLICY "Public read awards" ON awards FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admin allow all select awards" ON awards FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert awards" ON awards FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update awards" ON awards FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete awards" ON awards FOR DELETE TO authenticated USING (true);

-- 5. INSURANCE PARTNERS
CREATE TABLE IF NOT EXISTS insurance_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE insurance_partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read insurance_partners" ON insurance_partners;
DROP POLICY IF EXISTS "Admin allow all select insurance_partners" ON insurance_partners;
DROP POLICY IF EXISTS "Admin insert insurance_partners" ON insurance_partners;
DROP POLICY IF EXISTS "Admin update insurance_partners" ON insurance_partners;
DROP POLICY IF EXISTS "Admin delete insurance_partners" ON insurance_partners;

CREATE POLICY "Public read insurance_partners" ON insurance_partners FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admin allow all select insurance_partners" ON insurance_partners FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert insurance_partners" ON insurance_partners FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update insurance_partners" ON insurance_partners FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete insurance_partners" ON insurance_partners FOR DELETE TO authenticated USING (true);

-- 6. GALLERY
DROP TYPE IF EXISTS gallery_category CASCADE;
-- Safe enum creation
DO $$ BEGIN
    CREATE TYPE gallery_category AS ENUM ('hospital', 'doctors', 'events', 'infrastructure');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    category gallery_category DEFAULT 'hospital',
    image_url TEXT NOT NULL,
    description TEXT,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read gallery" ON gallery;
DROP POLICY IF EXISTS "Admin allow all select gallery" ON gallery;
DROP POLICY IF EXISTS "Admin insert gallery" ON gallery;
DROP POLICY IF EXISTS "Admin update gallery" ON gallery;
DROP POLICY IF EXISTS "Admin delete gallery" ON gallery;

CREATE POLICY "Public read gallery" ON gallery FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admin allow all select gallery" ON gallery FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert gallery" ON gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update gallery" ON gallery FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete gallery" ON gallery FOR DELETE TO authenticated USING (true);

-- 7. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    cta_text TEXT,
    cta_url TEXT,
    background_color TEXT DEFAULT '#f97316', -- Default orange
    text_color TEXT DEFAULT '#ffffff',
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read announcements" ON announcements;
DROP POLICY IF EXISTS "Admin allow all select announcements" ON announcements;
DROP POLICY IF EXISTS "Admin insert announcements" ON announcements;
DROP POLICY IF EXISTS "Admin update announcements" ON announcements;
DROP POLICY IF EXISTS "Admin delete announcements" ON announcements;

CREATE POLICY "Public read announcements" ON announcements FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admin allow all select announcements" ON announcements FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert announcements" ON announcements FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update announcements" ON announcements FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete announcements" ON announcements FOR DELETE TO authenticated USING (true);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'editor')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

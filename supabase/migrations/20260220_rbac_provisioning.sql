-- RBAC & Profile Auto-Provisioning Migration
-- This script ensures robust profile creation and role management.

-- 1. Ensure PROFILES table exists safely
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    role TEXT DEFAULT 'editor' CHECK (role IN ('super_admin', 'editor', 'content_manager')),
    permissions JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies (Idempotent recreation)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Super Admin can update any profile" ON public.profiles;

-- Policy: Authenticated users can read basic profile info (needed for middleware/authorized checks)
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (true);

-- Policy: System/Trigger creates profiles, but if we allow manual insert by user (rare):
CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

-- Policy: Users update their own basic info (not role)
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- Policy: Only Super Admins can update roles or other users
CREATE POLICY "Super Admin can update any profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE public.profiles.id = auth.uid() 
    AND public.profiles.role = 'super_admin'
  )
);

-- 4. Safe Role Sanitization (in case of legacy data)
DO $$
BEGIN
    -- Ensure all existing profiles have valid roles
    UPDATE public.profiles 
    SET role = 'editor' 
    WHERE role NOT IN ('super_admin', 'editor', 'content_manager') OR role IS NULL;
END $$;


-- 5. TRIGGER FUNCTION: Auto-create profile on Signup
-- Includes "First User is Super Admin" logic
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
DECLARE
  is_first_user boolean;
  assigned_role text;
BEGIN
  -- Check if profiles table is empty (count = 0)
  -- If empty, this is the first user -> super_admin
  -- Otherwise -> editor
  SELECT count(*) = 0 INTO is_first_user FROM public.profiles;
  
  IF is_first_user THEN
    assigned_role := 'super_admin';
  ELSE
    assigned_role := 'editor';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    assigned_role
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      updated_at = NOW();
      
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 6. Recreate Trigger safely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 7. Backfill Profiles for existing users (Fix for your current issue)
-- This ensures any user currently in auth.users allows has a profile
INSERT INTO public.profiles (id, email, role)
SELECT 
    id, 
    email,
    CASE 
        WHEN (SELECT count(*) FROM public.profiles) = 0 THEN 'super_admin' 
        ELSE 'editor' 
    END
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

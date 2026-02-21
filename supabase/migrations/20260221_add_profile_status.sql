-- Migration: Add is_active column to profiles and handle policy updates

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'is_active') THEN
        ALTER TABLE profiles ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Update RLS to allow super_admin to manage operations on other profiles
-- Note: users can update their own profile, but we need super_admins to manage others

-- First check if the policy already exists to avoid conflicts.
DROP POLICY IF EXISTS "Super Admins can manage all profiles" ON profiles;

CREATE POLICY "Super Admins can manage all profiles" 
ON profiles 
FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM profiles AS admin_profile 
        WHERE admin_profile.id = auth.uid() 
        AND admin_profile.role = 'super_admin'
    )
);

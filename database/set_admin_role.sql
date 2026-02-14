-- ==============================================================================
-- Grant Admin Privileges Script
-- ==============================================================================
-- 
-- INSTRUCTIONS:
-- 1. Sign up a new user with the email 'storkhospitalsmedia@gmail.com' via the Signup page.
-- 2. Run this script in the Supabase SQL Editor.
-- 3. Log out and log back in to see the changes take effect.

UPDATE public.profiles
SET role = 'admin'
WHERE email = 'storkhospitalsmedia@gmail.com';

-- Verify the update
SELECT * FROM public.profiles WHERE email = 'storkhospitalsmedia@gmail.com';

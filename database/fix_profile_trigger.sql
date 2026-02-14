-- ==============================================================================
-- Enterprise Fix: Profile Creation Trigger & RLS
-- ==============================================================================
-- Description:
-- Resolves "Database error creating new user" by allowing the trigger to bypass
-- RLS using SECURITY DEFINER. Enforces strict access control for normal operations.
--
-- Instructions:
-- Run this entire script in the Supabase SQL Editor.
-- ==============================================================================

-- 1. CLEANUP
-- Safely remove existing conflicting definitions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. SECURE FUNCTION DEFINITION
-- SECURITY DEFINER: Executes function with privileges of the creator (Admin),
-- ignoring RLS on the 'public.profiles' table during the INSERT.
-- SET search_path: Prevents malicious code execution via search path manipulation.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        -- Default to 'editor' as requested, ensuring basic access rights
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'editor'::user_role)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. RECREATE TRIGGER
-- Binds the function to the auth.users table to run on every signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. RLS SECURITY HARDENING
-- Enable RLS and reset policies to a clean, deny-by-default state
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Remove old policies to ensure no legacy security holes exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles access" ON public.profiles;

-- 5. DEFINE STRICT POLICIES

-- Policy: Users can only see their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- Policy: Users can update their own profile (e.g. Name, Avatar)
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Policy: Admins have full access to manage users
-- Uses the is_admin() helper function
CREATE POLICY "Admins can manage all profiles"
    ON public.profiles FOR ALL
    USING (public.is_admin());

-- CRITICAL SECURITY NOTE:
-- We explicitly DO NOT create an INSERT policy for public users.
-- This guarantees that profile rows can ONLY be created by the system trigger
-- (which runs as admin) and never by a user client directly.

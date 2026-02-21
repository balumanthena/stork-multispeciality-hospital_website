-- Fix infinite recursion error on profiles RLS caused by naive subquery

-- 1. Drop the naive recursive policy
DROP POLICY IF EXISTS "Super Admins can manage all profiles" ON profiles;

-- 2. Define or replace the securely elevated helper function 
-- Using SECURITY DEFINER executes this function as the database owner (Postgres role),
-- which possesses BYPASSRLS privileges. This allows the function to read the 'profiles' 
-- table without triggering its policies and causing an infinite recursive loop!
CREATE OR REPLACE FUNCTION public.get_user_role() 
RETURNS text 
LANGUAGE sql 
SECURITY DEFINER 
SET search_path = public
STABLE
AS $$
  SELECT role FROM profiles WHERE id = auth.uid() LIMIT 1;
$$;

-- 3. Apply the safe policy using the elevated helper
CREATE POLICY "Super Admins can manage all profiles" 
ON profiles 
FOR ALL 
TO authenticated 
USING (
    public.get_user_role() = 'super_admin'
);

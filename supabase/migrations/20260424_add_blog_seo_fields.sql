-- Step 1: Safely add SEO columns to the blogs table
-- Using IF NOT EXISTS to prevent errors if they already exist
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Step 2: Safely create the storage bucket
-- Using ON CONFLICT DO NOTHING to prevent duplicate key errors
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-media', 'blog-media', true) 
ON CONFLICT (id) DO NOTHING;

-- Step 3: Ensure Row Level Security is enabled
-- (Removed because storage.objects already has RLS enabled by default in Supabase, and attempting to alter it causes an ownership error)

-- Step 4: Fix and normalize policies
-- Dropping existing conflicting policies safely to prevent "policy already exists" and deadlocks
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Step 4A: Public read access
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'blog-media');

-- Step 4B: Authenticated upload
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'blog-media');

-- Step 4C: Authenticated update
-- Requires BOTH USING and WITH CHECK to prevent assigning the object to a different bucket
CREATE POLICY "Authenticated users can update images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'blog-media')
WITH CHECK (bucket_id = 'blog-media');

-- Step 4D: Authenticated delete
CREATE POLICY "Authenticated users can delete images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'blog-media');

-- Remove Unused Admin Modules

-- Drop tables
DROP TABLE IF EXISTS public.announcements CASCADE;
DROP TABLE IF EXISTS public.gallery CASCADE;
DROP TABLE IF EXISTS public.insurance_partners CASCADE;
DROP TABLE IF EXISTS public.awards CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;

-- Drop enum types if they exist
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gallery_category') THEN
        DROP TYPE public.gallery_category CASCADE;
    END IF;
END $$;

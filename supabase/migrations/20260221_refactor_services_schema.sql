-- Migration: Refactor Departments & Treatments to Services Architecture

-- 1. Rename 'departments' to 'service_categories'
ALTER TABLE public.departments RENAME TO service_categories;

-- Update constraints and indexes if they were explicitly named with 'departments'
ALTER TABLE public.service_categories RENAME CONSTRAINT departments_pkey TO service_categories_pkey;
-- (Note: some constraints might have been unnamed or use different conventions, but renaming the primary key is standard)

-- 2. Rename 'treatments' to 'services'
ALTER TABLE public.treatments RENAME TO services;

-- Rename constraints and indexes for 'services'
ALTER TABLE public.services RENAME CONSTRAINT treatments_pkey TO services_pkey;

-- 3. Update the foreign key column in 'services' from 'department_id' to 'category_id'
ALTER TABLE public.services RENAME COLUMN department_id TO category_id;

-- Ensure the foreign key constraint points correctly (it should track automatically during rename, but it's good practice to ensure the index/names align conceptually if we ever drop/recreate)
-- Assuming the constraint was named 'treatments_department_id_fkey'
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'treatments_department_id_fkey' 
        AND table_name = 'services'
    ) THEN
        ALTER TABLE public.services RENAME CONSTRAINT treatments_department_id_fkey TO services_category_id_fkey;
    END IF;
END $$;

-- 4. Update Treatment Videos foreign key name to match new table
ALTER TABLE public.treatment_videos RENAME COLUMN treatment_id TO service_id;
ALTER TABLE public.treatment_videos RENAME COLUMN department_id TO category_id;

-- 5. Cascade RLS Policies (Table renames preserve policies, but the names of the policies might still say 'Departments')
-- It's optional, but cleaner to rename the policies or simply drop and recreate them for the new table names
DROP POLICY IF EXISTS "Public Read Departments" ON public.service_categories;
DROP POLICY IF EXISTS "Manage Departments" ON public.service_categories;
DROP POLICY IF EXISTS "Public Read Treatments" ON public.services;
DROP POLICY IF EXISTS "Manage Treatments" ON public.services;

CREATE POLICY "Public Read Service Categories" ON public.service_categories 
FOR SELECT USING (true);

CREATE POLICY "Manage Service Categories" ON public.service_categories
FOR ALL TO authenticated 
USING (public.get_user_role() IN ('super_admin', 'admin'));

CREATE POLICY "Public Read Services" ON public.services 
FOR SELECT USING (true);

CREATE POLICY "Manage Services" ON public.services
FOR ALL TO authenticated 
USING (public.get_user_role() IN ('super_admin', 'admin'));

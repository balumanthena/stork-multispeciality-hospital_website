-- Migration: Fix treatments table and RLS
-- Revert rename if it happened and set correct RLS policies

DO $$
BEGIN
    -- Revert services -> treatments if needed
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'services') THEN
        ALTER TABLE public.services RENAME TO treatments;
        
        -- Rename back the column if needed
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'treatments' AND column_name = 'category_id') THEN
            ALTER TABLE public.treatments RENAME COLUMN category_id TO department_id;
        END IF;
    END IF;

    -- Revert service_categories -> departments if needed
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'service_categories') THEN
        ALTER TABLE public.service_categories RENAME TO departments;
    END IF;
END $$;

-- Fix RLS Policies for treatments
DROP POLICY IF EXISTS "Public Read Services" ON public.treatments;
DROP POLICY IF EXISTS "Public Read Treatments" ON public.treatments;
DROP POLICY IF EXISTS "Manage Services" ON public.treatments;
DROP POLICY IF EXISTS "Manage Treatments" ON public.treatments;

-- Allow SELECT for all authenticated users
CREATE POLICY "Allow Authenticated Select" ON public.treatments
FOR SELECT TO authenticated
USING (auth.role() = 'authenticated');

-- Restrict mutations to admins
CREATE POLICY "Manage Treatments" ON public.treatments
FOR ALL TO authenticated
USING (public.get_user_role() IN ('super_admin', 'admin'));

-- Fix RLS Policies for departments
DROP POLICY IF EXISTS "Public Read Service Categories" ON public.departments;
DROP POLICY IF EXISTS "Public Read Departments" ON public.departments;
DROP POLICY IF EXISTS "Manage Service Categories" ON public.departments;
DROP POLICY IF EXISTS "Manage Departments" ON public.departments;

CREATE POLICY "Allow Authenticated Select Departments" ON public.departments
FOR SELECT TO authenticated
USING (auth.role() = 'authenticated');

CREATE POLICY "Manage Departments" ON public.departments
FOR ALL TO authenticated
USING (public.get_user_role() IN ('super_admin', 'admin'));

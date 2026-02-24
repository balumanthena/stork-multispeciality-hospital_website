-- HOTFIX: Resolve "updated_by" field error & Deadlock Recovery
-- This script only adds missing columns and updates the trigger function.

-- 1. ADD MISSING COLUMNS (Ensures triggers won't fail)
DO $$ 
BEGIN
    -- Junction Tables - Ensure all have mandatory audit columns
    -- Video Departments
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='video_departments' AND column_name='updated_by') THEN
        ALTER TABLE public.video_departments ADD COLUMN updated_by UUID REFERENCES auth.users(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='video_departments' AND column_name='updated_at') THEN
        ALTER TABLE public.video_departments ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;

    -- Video Treatments
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='video_treatments' AND column_name='updated_by') THEN
        ALTER TABLE public.video_treatments ADD COLUMN updated_by UUID REFERENCES auth.users(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='video_treatments' AND column_name='updated_at') THEN
        ALTER TABLE public.video_treatments ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;
    
    -- Blog Departments
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blog_departments' AND column_name='updated_by') THEN
        ALTER TABLE public.blog_departments ADD COLUMN updated_by UUID REFERENCES auth.users(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blog_departments' AND column_name='updated_at') THEN
        ALTER TABLE public.blog_departments ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;
    
    -- Blog Treatments
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blog_treatments' AND column_name='updated_by') THEN
        ALTER TABLE public.blog_treatments ADD COLUMN updated_by UUID REFERENCES auth.users(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blog_treatments' AND column_name='updated_at') THEN
        ALTER TABLE public.blog_treatments ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;
END $$;

-- 2. UPDATE TRIGGER FUNCTION (Defensive check)
CREATE OR REPLACE FUNCTION public.handle_audit_stamps()
RETURNS TRIGGER AS $$
BEGIN
    -- Only set columns if they exist on the table
    IF (TG_OP = 'INSERT') THEN
        BEGIN
            NEW.created_by = auth.uid();
            NEW.updated_by = auth.uid();
        EXCEPTION WHEN undefined_column THEN 
            -- Safe fall-through
        END;
    ELSIF (TG_OP = 'UPDATE') THEN
        BEGIN
            NEW.updated_by = auth.uid();
            NEW.updated_at = now();
        EXCEPTION WHEN undefined_column THEN
            -- Safe fall-through
        END;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

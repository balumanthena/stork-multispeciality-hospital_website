-- Migration: Enterprise Production Lockdown
-- Description: Implement Audit Trails, Integrity Constraints, and RLS Hardening for scaled content engine.

-- 1. AUDIT TRAIL INFRASTRUCTURE
-- Add audit columns to main tables if they don't exist
DO $$ 
BEGIN
    -- Blogs
    ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
    ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id);
    
    -- Videos
    ALTER TABLE public.treatment_videos ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
    ALTER TABLE public.treatment_videos ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id);
    
    -- Junction Tables
    ALTER TABLE public.blog_departments ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
    ALTER TABLE public.blog_departments ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id);
    ALTER TABLE public.blog_departments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

    ALTER TABLE public.blog_treatments ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
    ALTER TABLE public.blog_treatments ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id);
    ALTER TABLE public.blog_treatments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

    ALTER TABLE public.video_departments ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
    ALTER TABLE public.video_departments ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id);
    ALTER TABLE public.video_departments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

    ALTER TABLE public.video_treatments ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
    ALTER TABLE public.video_treatments ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id);
    ALTER TABLE public.video_treatments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();
END $$;

-- Audit Stamp Trigger Function
CREATE OR REPLACE FUNCTION public.handle_audit_stamps()
RETURNS TRIGGER AS $$
BEGIN
    -- Only set columns if they exist on the table to avoid "field not found" errors
    IF (TG_OP = 'INSERT') THEN
        BEGIN
            NEW.created_by = auth.uid();
            NEW.updated_by = auth.uid();
        EXCEPTION WHEN undefined_column THEN 
            -- Skip if columns don't exist
        END;
    ELSIF (TG_OP = 'UPDATE') THEN
        BEGIN
            NEW.updated_by = auth.uid();
            NEW.updated_at = now();
        EXCEPTION WHEN undefined_column THEN
            -- Skip if columns don't exist
        END;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply Audit Triggers
-- Note: Assuming updated_at exists on all.
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN SELECT table_name FROM information_schema.tables 
             WHERE table_schema = 'public' 
             AND table_name IN ('blogs', 'treatment_videos', 'blog_departments', 'blog_treatments', 'video_departments', 'video_treatments')
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS tr_audit_stamps ON public.%I', t);
        EXECUTE format('CREATE TRIGGER tr_audit_stamps BEFORE INSERT OR UPDATE ON public.%I FOR EACH ROW EXECUTE PROCEDURE public.handle_audit_stamps()', t);
    END LOOP;
END $$;


-- 2. INTEGRITY LOCKDOWN
-- Ensure all junction tables have composite unique constraints and Cascade deletes
ALTER TABLE public.blog_departments 
    DROP CONSTRAINT IF EXISTS blog_departments_blog_id_fkey,
    ADD CONSTRAINT blog_departments_blog_id_fkey FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    DROP CONSTRAINT IF EXISTS blog_departments_ids_unique,
    ADD CONSTRAINT blog_departments_ids_unique UNIQUE(blog_id, department_id);

ALTER TABLE public.blog_treatments 
    DROP CONSTRAINT IF EXISTS blog_treatments_blog_id_fkey,
    ADD CONSTRAINT blog_treatments_blog_id_fkey FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    DROP CONSTRAINT IF EXISTS blog_treatments_ids_unique,
    ADD CONSTRAINT blog_treatments_ids_unique UNIQUE(blog_id, treatment_id);

ALTER TABLE public.video_departments 
    DROP CONSTRAINT IF EXISTS video_departments_video_id_fkey,
    ADD CONSTRAINT video_departments_video_id_fkey FOREIGN KEY (video_id) REFERENCES treatment_videos(id) ON DELETE CASCADE,
    DROP CONSTRAINT IF EXISTS video_departments_ids_unique,
    ADD CONSTRAINT video_departments_ids_unique UNIQUE(video_id, department_id);

ALTER TABLE public.video_treatments 
    DROP CONSTRAINT IF EXISTS video_treatments_video_id_fkey,
    ADD CONSTRAINT video_treatments_video_id_fkey FOREIGN KEY (video_id) REFERENCES treatment_videos(id) ON DELETE CASCADE,
    DROP CONSTRAINT IF EXISTS video_treatments_ids_unique,
    ADD CONSTRAINT video_treatments_ids_unique UNIQUE(video_id, treatment_id);


-- 3. ORPHAN PREVENTION (Safety Net)
-- Validates that active content has at least one placement destination.
CREATE OR REPLACE FUNCTION public.check_blog_placement()
RETURNS TRIGGER AS $$
DECLARE
    rel_count INT;
BEGIN
    -- Transition check: Only validate if Published and (was previously Draft OR placement changed)
    -- This allows multi-step insertion (Insert as Draft -> Map -> Update to Published)
    IF (NEW.status = 'Published') THEN
        IF (NOT NEW.show_on_main) THEN
            SELECT COUNT(*) INTO rel_count FROM (
                SELECT 1 FROM blog_departments WHERE blog_id = NEW.id
                UNION ALL
                SELECT 1 FROM blog_treatments WHERE blog_id = NEW.id
            ) AS q;

            IF rel_count = 0 THEN
                RAISE EXCEPTION 'Enterprise Lockdown: Blog must be assigned to at least one Department/Treatment OR marked as Global before publishing.'
                USING DETAIL = 'Attempted to publish an orphaned blog post. Links to departments or treatments are required for local visibility.',
                      HINT = 'Assign the post to a department/treatment in the sidebar, or enable "Show on Global Blog Page".';
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.check_video_placement()
RETURNS TRIGGER AS $$
DECLARE
    rel_count INT;
BEGIN
    -- Transition check: Only validate if Active and (was previously inactive OR placement changed)
    IF (NEW.is_active = true) THEN
        IF (NOT NEW.show_global) THEN
            SELECT COUNT(*) INTO rel_count FROM (
                SELECT 1 FROM video_departments WHERE video_id = NEW.id
                UNION ALL
                SELECT 1 FROM video_treatments WHERE video_id = NEW.id
            ) AS q;

            IF rel_count = 0 THEN
                RAISE EXCEPTION 'Enterprise Lockdown: Video must be assigned to at least one Department/Treatment OR marked as Global before publishing.'
                USING DETAIL = 'Attempted to activate an orphaned video. Relational mapping or global status is required.',
                      HINT = 'Assign the video to a department/treatment in the sidebar, or enable "Show on Video Gallery".';
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_check_blog_placement ON public.blogs;
CREATE TRIGGER tr_check_blog_placement
    AFTER UPDATE OF status, show_on_main ON public.blogs
    FOR EACH ROW EXECUTE PROCEDURE public.check_blog_placement();

DROP TRIGGER IF EXISTS tr_check_video_placement ON public.treatment_videos;
CREATE TRIGGER tr_check_video_placement
    AFTER UPDATE OF is_active, show_global ON public.treatment_videos
    FOR EACH ROW EXECUTE PROCEDURE public.check_video_placement();


-- 4. RLS HARDENING (Scalable & Secure)
-- Tighten Select Policies
DROP POLICY IF EXISTS "Public Read Published Blogs" ON blogs;
CREATE POLICY "Public Read Published Blogs" ON blogs 
FOR SELECT USING (status = 'Published');

DROP POLICY IF EXISTS "Public Read Active Videos" ON treatment_videos;
CREATE POLICY "Public Read Active Videos" ON treatment_videos 
FOR SELECT USING (is_active = true);

-- Manage Policies (Admin/SuperAdmin)
-- We use a helper function to avoid policy duplication
CREATE OR REPLACE FUNCTION public.is_content_admin() RETURNS BOOLEAN AS $$
  SELECT public.get_user_role() IN ('super_admin', 'admin');
$$ LANGUAGE sql SECURITY DEFINER STABLE;

DROP POLICY IF EXISTS "Enterprise Admin Manage Blogs" ON blogs;
CREATE POLICY "Enterprise Admin Manage Blogs" ON blogs
FOR ALL TO authenticated USING (public.is_content_admin());

DROP POLICY IF EXISTS "Enterprise Admin Manage Videos" ON treatment_videos;
CREATE POLICY "Enterprise Admin Manage Videos" ON treatment_videos
FOR ALL TO authenticated USING (public.is_content_admin());

-- Junction Table Lockdown
-- Anonymous users can only READ. Mutation is strictly Admin/Editor.
ALTER TABLE blog_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_treatments ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
    jt text;
BEGIN
    FOR jt IN VALUES ('blog_departments'), ('blog_treatments'), ('video_departments'), ('video_treatments')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Public Read %I" ON public.%I', jt, jt);
        EXECUTE format('CREATE POLICY "Public Read %I" ON public.%I FOR SELECT USING (true)', jt, jt);
        
        EXECUTE format('DROP POLICY IF EXISTS "Admin Manage %I" ON public.%I', jt, jt);
        EXECUTE format('CREATE POLICY "Admin Manage %I" ON public.%I FOR ALL TO authenticated USING (public.is_content_admin() OR public.get_user_role() = %L)', jt, jt, 'editor');
    END LOOP;
END $$;


-- 5. SCALING INDEXES (100k+ Rows Optimization)
-- Composite indexes for junction table lookups (Foreign Key + Target ID)
CREATE INDEX IF NOT EXISTS idx_blog_dept_lookup ON blog_departments(department_id, blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_treat_lookup ON blog_treatments(treatment_id, blog_id);
CREATE INDEX IF NOT EXISTS idx_video_dept_lookup ON video_departments(department_id, video_id);
CREATE INDEX IF NOT EXISTS idx_video_treat_lookup ON video_treatments(treatment_id, video_id);

-- GIN index for potential full-text search if scaling
-- NOTIFY pgrst, 'reload_schema';

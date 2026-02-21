-- Migration: Refactor Blog Placement System
-- Description: Create mapping tables and update blog schema for multi-placement

-- 1. Create mapping tables
CREATE TABLE IF NOT EXISTS blog_departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(blog_id, department_id)
);

CREATE TABLE IF NOT EXISTS blog_treatments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    treatment_id UUID NOT NULL REFERENCES treatments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(blog_id, treatment_id)
);

-- 2. Update blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS show_on_main BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;

-- 3. Migrate existing data (Legacy to Relational)
DO $$ 
BEGIN
    -- Move department mappings
    INSERT INTO blog_departments (blog_id, department_id)
    SELECT id, department_id 
    FROM blogs 
    WHERE department_id IS NOT NULL
    ON CONFLICT DO NOTHING;

    -- Move treatment mappings
    INSERT INTO blog_treatments (blog_id, treatment_id)
    SELECT id, treatment_id 
    FROM blogs 
    WHERE treatment_id IS NOT NULL
    ON CONFLICT DO NOTHING;
END $$;

-- 4. Drop legacy columns
ALTER TABLE blogs 
DROP COLUMN IF EXISTS department_id,
DROP COLUMN IF EXISTS treatment_id;

-- 5. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_dept_dept_id ON blog_departments(department_id);
CREATE INDEX IF NOT EXISTS idx_blog_dept_blog_id ON blog_departments(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_treat_treat_id ON blog_treatments(treatment_id);
CREATE INDEX IF NOT EXISTS idx_blog_treat_blog_id ON blog_treatments(blog_id);

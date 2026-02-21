-- Migration: Refactor Video Placement System
-- Description: Create mapping tables and update treatment_videos schema for multi-placement

-- 1. Create mapping tables
CREATE TABLE IF NOT EXISTS video_departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id UUID NOT NULL REFERENCES treatment_videos(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(video_id, department_id)
);

CREATE TABLE IF NOT EXISTS video_treatments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id UUID NOT NULL REFERENCES treatment_videos(id) ON DELETE CASCADE,
    treatment_id UUID NOT NULL REFERENCES treatments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(video_id, treatment_id)
);

-- 2. Update treatment_videos table
ALTER TABLE treatment_videos 
ADD COLUMN IF NOT EXISTS show_global BOOLEAN DEFAULT true;

-- 3. Migrate existing data (Legacy to Relational)
DO $$ 
BEGIN
    -- Move department mappings
    INSERT INTO video_departments (video_id, department_id)
    SELECT id, department_id 
    FROM treatment_videos 
    WHERE department_id IS NOT NULL
    ON CONFLICT DO NOTHING;

    -- Move treatment mappings
    INSERT INTO video_treatments (video_id, treatment_id)
    SELECT id, treatment_id 
    FROM treatment_videos 
    WHERE treatment_id IS NOT NULL
    ON CONFLICT DO NOTHING;
END $$;

-- 4. Drop legacy columns
ALTER TABLE treatment_videos 
DROP COLUMN IF EXISTS department_id,
DROP COLUMN IF EXISTS treatment_id;

-- 5. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_video_dept_dept_id ON video_departments(department_id);
CREATE INDEX IF NOT EXISTS idx_video_dept_video_id ON video_departments(video_id);
CREATE INDEX IF NOT EXISTS idx_video_treat_treat_id ON video_treatments(treatment_id);
CREATE INDEX IF NOT EXISTS idx_video_treat_video_id ON video_treatments(video_id);

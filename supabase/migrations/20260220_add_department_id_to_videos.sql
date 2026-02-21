-- Migration to add department_id to treatment_videos to support Video Target Placement UI
ALTER TABLE treatment_videos ADD COLUMN IF NOT EXISTS department_id UUID REFERENCES departments(id) ON DELETE CASCADE;
ALTER TABLE treatment_videos ALTER COLUMN treatment_id DROP NOT NULL;

-- Add department_id and treatment_id columns to blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS treatment_id UUID REFERENCES treatments(id) ON DELETE SET NULL;

-- Index for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_department_id ON blogs(department_id);
CREATE INDEX IF NOT EXISTS idx_blogs_treatment_id ON blogs(treatment_id);

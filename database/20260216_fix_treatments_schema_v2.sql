-- Consolidated Migration for Production Treatments Fix (V2 - Enhanced Mappings)
-- 1. Add missing columns safely
DO$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'treatments' AND column_name = 'is_active') THEN
        ALTER TABLE treatments ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'treatments' AND column_name = 'department_id') THEN
        ALTER TABLE treatments ADD COLUMN department_id UUID REFERENCES departments(id);
    END IF;
END $$;

-- 2. Backfill is_active
UPDATE treatments SET is_active = true WHERE is_active IS NULL;

-- 3. Backfill department_id (Data Repair with Enhanced Mappings)
-- Match by exact name (case insensitive)
UPDATE treatments t
SET department_id = d.id
FROM departments d
WHERE t.department_id IS NULL 
AND LOWER(TRIM(t.department)) = LOWER(TRIM(d.name));

-- Fix specific mismatches
-- Orthopedics -> Orthopaedics
UPDATE treatments SET department_id = (SELECT id FROM departments WHERE slug = 'orthopaedics' LIMIT 1) 
WHERE department = 'Orthopedics' AND department_id IS NULL;

-- Urology & Andrology -> Urology
UPDATE treatments SET department_id = (SELECT id FROM departments WHERE slug = 'urology' LIMIT 1) 
WHERE department = 'Urology & Andrology' AND department_id IS NULL;

-- General Surgery -> General & Laparoscopic Surgery
UPDATE treatments SET department_id = (SELECT id FROM departments WHERE slug = 'general-surgery' LIMIT 1) 
WHERE department = 'General Surgery' AND department_id IS NULL;

-- Bariatric & Weight Management -> GI & Bariatric Surgery
UPDATE treatments SET department_id = (SELECT id FROM departments WHERE slug = 'bariatric' LIMIT 1) 
WHERE department = 'Bariatric & Weight Management' AND department_id IS NULL;

-- Obstetrics -> Gynaecology & Obstetrics
UPDATE treatments SET department_id = (SELECT id FROM departments WHERE slug = 'gynaecology' LIMIT 1) 
WHERE department = 'Obstetrics' AND department_id IS NULL;

-- Gynecology -> Gynaecology & Obstetrics
UPDATE treatments SET department_id = (SELECT id FROM departments WHERE slug = 'gynaecology' LIMIT 1) 
WHERE department = 'Gynecology' AND department_id IS NULL;

-- Gastroenterology -> GI & Bariatric Surgery
UPDATE treatments SET department_id = (SELECT id FROM departments WHERE slug = 'bariatric' LIMIT 1) 
WHERE department = 'Gastroenterology' AND department_id IS NULL;

-- Vascular -> Vascular Surgery
UPDATE treatments SET department_id = (SELECT id FROM departments WHERE slug = 'vascular' LIMIT 1) 
WHERE department = 'Vascular' AND department_id IS NULL;

-- Podiatry -> Orthopaedics (Closest match for foot/ankle)
UPDATE treatments SET department_id = (SELECT id FROM departments WHERE slug = 'orthopaedics' LIMIT 1) 
WHERE department = 'Podiatry' AND department_id IS NULL;

-- Endocrinology -> General Medicine (Closest match)
UPDATE treatments SET department_id = (SELECT id FROM departments WHERE slug = 'general-medicine' LIMIT 1) 
WHERE department = 'Endocrinology' AND department_id IS NULL;

-- Psychiatry -> General Medicine (Closest fallback, or keep NULL if preferred)
UPDATE treatments SET department_id = (SELECT id FROM departments WHERE slug = 'general-medicine' LIMIT 1) 
WHERE department = 'Psychiatry' AND department_id IS NULL;

-- 4. Add Performance Index
CREATE INDEX IF NOT EXISTS idx_treatments_is_active ON treatments(is_active);
CREATE INDEX IF NOT EXISTS idx_treatments_department_id ON treatments(department_id);

-- 5. RLS Policies
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

-- Drop existing likely conflicting policies to be safe
DROP POLICY IF EXISTS "Public can view active treatments" ON treatments;
DROP POLICY IF EXISTS "Public can read active treatments" ON treatments;

-- Re-create the correct policy
CREATE POLICY "Public can read active treatments" 
ON treatments FOR SELECT 
USING (is_active = true);

-- Ensure admins/service role can do everything
DROP POLICY IF EXISTS "Admins can do everything on treatments" ON treatments;
CREATE POLICY "Admins can do everything on treatments" 
ON treatments FOR ALL 
USING (auth.role() = 'service_role' OR auth.role() = 'authenticated'); 

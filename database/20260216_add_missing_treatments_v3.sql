-- Migration to add missing treatments requested by user and fix mappings
-- 1. Insert "Surgical Interventions" for General Surgery
INSERT INTO treatments (title, slug, department_id, is_active, content, short_description)
SELECT 
    'Surgical Interventions', 
    'surgical-interventions', 
    id, 
    true, 
    'Comprehensive range of surgical procedures.', 
    'General surgical interventions for various conditions.'
FROM departments WHERE slug = 'general-surgery'
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert "Sports Pain" for Orthopaedics
INSERT INTO treatments (title, slug, department_id, is_active, content, short_description)
SELECT 
    'Sports Pain', 
    'sports-pain', 
    id, 
    true, 
    'Diagnosis and treatment of pain resulting from sports injuries.', 
    'Specialized care for sports-related pain and injuries.'
FROM departments WHERE slug = 'orthopaedics'
ON CONFLICT (slug) DO NOTHING;

-- 3. Fix "Thyroidectomy" mapping (Move from General Medicine/Endocrinology to General Surgery)
-- It was likely mapped to General Medicine because of the "Endocrinology" -> "General Medicine" rule.
-- Thyroidectomy is a surgery, so it belongs in General Surgery.
UPDATE treatments
SET department_id = (SELECT id FROM departments WHERE slug = 'general-surgery')
WHERE slug = 'thyroidectomy';

-- 4. Ensure aliases or specific phrasing consistency if needed
-- (e.g. Infection Management -> Management of Infections if strictly requested, but "Infection Management" is standard)
-- We will keep existing names as they are professional.

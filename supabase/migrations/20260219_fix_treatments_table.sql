-- 1. Add is_active column if it doesn't exist
ALTER TABLE treatments 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 2. Insert dummy data if table is empty
INSERT INTO treatments (title, slug, summary, content, is_active, department_id)
SELECT 'Robotic Knee Replacement', 'robotic-knee-replacement', 'Advanced robotic surgery for precise knee replacement.', 'Full content here...', true, NULL
WHERE NOT EXISTS (SELECT 1 FROM treatments);

INSERT INTO treatments (title, slug, summary, content, is_active, department_id)
SELECT 'Hip Replacement', 'hip-replacement', 'Total hip replacement surgery.', 'Full content here...', true, NULL
WHERE NOT EXISTS (SELECT 1 FROM treatments WHERE slug = 'hip-replacement');

INSERT INTO treatments (title, slug, summary, content, is_active, department_id)
SELECT 'Arthroscopy', 'arthroscopy', 'Minimally invasive joint surgery.', 'Full content here...', true, NULL
WHERE NOT EXISTS (SELECT 1 FROM treatments WHERE slug = 'arthroscopy');

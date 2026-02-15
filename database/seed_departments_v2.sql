-- Truncate existing departments to ensure clean slate (Optional, be careful in production)
-- DELETE FROM public.departments; 

-- Upsert Departments with Correct Display Order
INSERT INTO public.departments (name, slug, description, icon, display_order, is_active)
VALUES
  ('Cosmetic & Plastic Surgery', 'cosmetic-surgery', 'Reclaim confidence and restore comfort with our subtle, natural-looking procedures.', 'Sparkles', 1, true),
  ('Emergency, Trauma & Critical Care', 'emergency', '24/7 critical care services equipped to handle all medical and surgical emergencies.', 'Siren', 2, true),
  ('ENT', 'ent', 'Comprehensive diagnosis and treatment for disorders of the ear, nose, throat, head, and neck.', 'Ear', 3, true),
  ('General Surgery', 'general-surgery', 'Focusing on abdominal contents including esophagus, stomach, small intestine, colon, liver, pancreas.', 'Scissors', 4, true),
  ('General Medicine', 'general-medicine', 'The first point of contact for any health concern. Prevention, diagnosis, and treatment of adult diseases.', 'Stethoscope', 5, true),
  ('GI & Bariatric Surgery', 'bariatric', 'Specialized care for digestive disorders and weight loss solutions.', 'Utensils', 6, true),
  ('Gynaecology & Obstetrics', 'gynaecology', 'Complete women''s health care ranging from adolescence to menopause.', 'Baby', 7, true),
  ('Neurosurgery', 'neurosurgery', 'Advanced surgical care for disorders of the brain, spine, and peripheral nerves.', 'Brain', 8, true),
  ('Oncology', 'oncology', 'Comprehensive cancer care with a multidisciplinary approach.', 'Dna', 9, true),
  ('Orthopaedics', 'orthopaedics', 'Specialized care for bone, joint, and muscle conditions.', 'Bone', 10, true),
  ('Pain Management', 'pain-management', 'Dedicated to helping patients manage chronic pain through medications and therapies.', 'Activity', 11, true),
  ('Proctology', 'proctology', 'Expert care for disorders of the rectum, anus, and colon.', 'UserMinus', 12, true),
  ('Pulmonology', 'pulmonology', 'Specialized care for respiratory health, treating conditions like asthma and COPD.', 'Wind', 13, true),
  ('Urology', 'urology', 'Advanced urological care for men and women.', 'TestTube', 14, true),
  ('Vascular Surgery', 'vascular', 'Diagnosis and management of disorders affecting the arteries, veins, and lymphatic systems.', 'Heart', 15, true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

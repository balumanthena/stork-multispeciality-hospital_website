-- Seed Departments
INSERT INTO public.departments (name, slug, description, icon, is_active)
VALUES
  ('Cardiology', 'cardiology', 'Comprehensive heart care including diagnostics, interventional cardiology, and cardiothoracic surgery. We treat coronary artery disease, heart failure, and arrhythmias.', 'Heart', true),
  ('Neurology', 'neurology', 'Expert diagnosis and treatment for disorders of the nervous system, including stroke, epilepsy, headache, and movement disorders.', 'Brain', true),
  ('Pediatrics', 'pediatrics', 'Specialized medical care for infants, children, and adolescents. Our team provides preventive health, immunization, and treatment for acute illnesses.', 'Baby', true),
  ('Nephrology', 'nephrology', 'Comprehensive care for kidney diseases, including dialysis and kidney transplantation support.', 'Activity', true),
  ('Dermatology', 'dermatology', 'Diagnosis and treatment of skin, hair, and nail conditions. We offer both medical and cosmetic dermatology services.', 'Sparkles', true),
  ('Mother & Child', 'mother-and-child', 'Integrated care for expectant mothers and newborns, ensuring a safe and comfortable birthing experience.', 'Baby', true),
  ('Cosmetic & Plastic Surgery', 'cosmetic-surgery', 'Reclaim confidence and restore comfort with our subtle, natural-looking procedures. Whether it’s a transformation or a restoration, we help you feel good in your skin again with artistry, precision, and privacy.', 'Sparkles', true),
  ('Emergency & Trauma', 'emergency', '24/7 critical care services equipped to handle all medical and surgical emergencies. Our rapid response team ensures immediate attention when every second counts.', 'Ambulance', true),
  ('ENT (Ear, Nose, Throat)', 'ent', 'Comprehensive diagnosis and treatment for disorders of the ear, nose, throat, head, and neck. We use advanced endoscopic technology for precise treatments.', 'Ear', true),
  ('General & Laparoscopic Surgery', 'general-surgery', 'Focusing on abdominal contents including esophagus, stomach, small intestine, colon, liver, pancreas, gallbladder, appendix and bile ducts.', 'Scissors', true),
  ('General Medicine', 'general-medicine', 'The first point of contact for any health concern. Our internal medicine team focuses on the prevention, diagnosis, and treatment of adult diseases.', 'Stethoscope', true),
  ('GI & Bariatric Surgery', 'bariatric', 'Specialized care for digestive disorders and weight loss solutions. We help you achieve a healthier lifestyle through advanced surgical interventions.', 'Utensils', true),
  ('Gynaecology & Obstetrics', 'gynaecology', 'Complete women''s health care ranging from adolescence to menopause. We provide expert care for maternity, infertility, and gynecological disorders.', 'Baby', true),
  ('Neurosurgery', 'neurosurgery', 'Advanced surgical care for disorders of the brain, spine, and peripheral nerves. Our team uses cutting-edge technology for precise outcomes.', 'Brain', true),
  ('Oncology', 'oncology', 'Comprehensive cancer care with a multidisciplinary approach. We offer medical, surgical, and radiation oncology services under one roof.', 'Dna', true),
  ('Orthopaedics', 'orthopaedics', 'Specialized care for bone, joint, and muscle conditions, focusing on restoring mobility and improving quality of life.', 'Bone', true),
  ('Pain Management', 'pain-management', 'Dedicated to helping patients manage chronic pain through a combination of medications, therapies, and minimally invasive procedures.', 'Activity', true),
  ('Proctology', 'proctology', 'Expert care for disorders of the rectum, anus, and colon. Using advanced laser and minimally invasive techniques for faster recovery.', 'UserMinus', true),
  ('Pulmonology', 'pulmonology', 'Specialized care for respiratory health, treating conditions like asthma, COPD, pneumonia, and other lung-related disorders.', 'Wind', true),
  ('Urology', 'urology', 'Advanced urological care for men and women. Treating kidney stones, urinary tract infections, prostate issues, and more.', 'TestTube', true),
  ('Vascular Surgery', 'vascular', 'Diagnosis and management of disorders affecting the arteries, veins, and lymphatic systems. We offer both open and endovascular solutions.', 'Heart', true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

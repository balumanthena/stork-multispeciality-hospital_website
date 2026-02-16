-- Seed Treatments Data

INSERT INTO treatments (name, slug, department, short_description, content, is_active)
VALUES
-- General Surgery
('Appendicitis', 'appendicitis', 'General Surgery', 'Inflammation of the appendix requiring surgical removal.', 'Detailed content about Appendicitis...', true),
('Gallstones', 'gallstones', 'General Surgery', 'Hardened deposits in the gallbladder.', 'Detailed content about Gallstones...', true),
('Hernia', 'hernia', 'General Surgery', 'Organ pushing through the muscle or tissue that holds it in place.', 'Detailed content about Hernia...', true),
('Umbilical Hernia', 'umbilical-hernia', 'General Surgery', 'Hernia near the belly button.', 'Detailed content about Umbilical Hernia...', true),
('Inguinal Hernia', 'inguinal-hernia', 'General Surgery', 'Hernia in the groin area.', 'Detailed content about Inguinal Hernia...', true),
('Incisional Hernia', 'incisional-hernia', 'General Surgery', 'Hernia at the site of a previous surgical incision.', 'Detailed content about Incisional Hernia...', true),
('Piles', 'piles', 'General Surgery', 'Swollen veins in the rectum and anus.', 'Detailed content about Piles...', true),
('Fissure Surgery', 'fissure-surgery', 'General Surgery', 'Treatment for anal fissures.', 'Detailed content about Fissure Surgery...', true),
('Anal Fissure', 'anal-fissure', 'General Surgery', 'Small tear in the thin, moist tissue lining the anus.', 'Detailed content about Anal Fissure...', true),
('Anal Fistula', 'anal-fistula', 'General Surgery', 'Infected tunnel between the skin and the anus.', 'Detailed content about Anal Fistula...', true),
('Perianal Abscess', 'perianal-abscess', 'General Surgery', 'Collection of pus near the anus.', 'Detailed content about Perianal Abscess...', true),
('Pilonidal Sinus', 'pilonidal-sinus', 'General Surgery', 'Cyst near the tailbone.', 'Detailed content about Pilonidal Sinus...', true),
('Hydrocele', 'hydrocele', 'General Surgery', 'Fluid-filled sac around a testicle.', 'Detailed content about Hydrocele...', true),
('Varicose Veins', 'varicose-veins', 'General Surgery', 'Twisted, enlarged veins.', 'Detailed content about Varicose Veins...', true),
('Minimally Invasive Surgery', 'minimally-invasive-surgery', 'General Surgery', 'Surgery performed through tiny incisions.', 'Detailed content about Minimally Invasive Surgery...', true),

-- Orthopedics
('Back Pain', 'back-pain', 'Orthopedics', 'Discomfort in the back region.', 'Detailed content about Back Pain...', true),
('Neck Pain', 'neck-pain', 'Orthopedics', 'Discomfort in the neck region.', 'Detailed content about Neck Pain...', true),
('Hip Pain', 'hip-pain', 'Orthopedics', 'Discomfort in the hip joint.', 'Detailed content about Hip Pain...', true),
('Knee Pain', 'knee-pain', 'Orthopedics', 'Discomfort in the knee joint.', 'Detailed content about Knee Pain...', true),
('Shoulder Pain', 'shoulder-pain', 'Orthopedics', 'Discomfort in the shoulder joint.', 'Detailed content about Shoulder Pain...', true),
('Elbow Pain', 'elbow-pain', 'Orthopedics', 'Discomfort in the elbow joint.', 'Detailed content about Elbow Pain...', true),
('Foot or Ankle Pain', 'foot-or-ankle-pain', 'Orthopedics', 'Discomfort in the foot or ankle.', 'Detailed content about Foot or Ankle Pain...', true),
('Sports Injury', 'sports-injury', 'Orthopedics', 'Injuries sustained during sports.', 'Detailed content about Sports Injury...', true),
('Meniscus Tear', 'meniscus-tear', 'Orthopedics', 'Tear in the knee cartilage.', 'Detailed content about Meniscus Tear...', true),
('Rotator Cuff Repair', 'rotator-cuff-repair', 'Orthopedics', 'Surgery to repair torn tendon in the shoulder.', 'Detailed content about Rotator Cuff Repair...', true),
('Arthroscopy Surgery', 'arthroscopy-surgery', 'Orthopedics', 'Minimally invasive joint surgery.', 'Detailed content about Arthroscopy Surgery...', true),
('Knee Arthroscopy', 'knee-arthroscopy', 'Orthopedics', 'Arthroscopy of the knee.', 'Detailed content about Knee Arthroscopy...', true),
('Shoulder Arthroscopy', 'shoulder-arthroscopy', 'Orthopedics', 'Arthroscopy of the shoulder.', 'Detailed content about Shoulder Arthroscopy...', true),
('Hip Replacement Surgery', 'hip-replacement-surgery', 'Orthopedics', 'Surgical replacement of the hip joint.', 'Detailed content about Hip Replacement Surgery...', true),
('Shoulder Replacement', 'shoulder-replacement', 'Orthopedics', 'Surgical replacement of the shoulder joint.', 'Detailed content about Shoulder Replacement...', true),
('Total Knee Replacement', 'total-knee-replacement', 'Orthopedics', 'Surgical replacement of the knee joint.', 'Detailed content about Total Knee Replacement...', true),
('Spine Surgery', 'spine-surgery', 'Orthopedics', 'Surgery on the spine.', 'Detailed content about Spine Surgery...', true),
('Shoulder Dislocation', 'shoulder-dislocation', 'Orthopedics', 'Dislocated shoulder joint.', 'Detailed content about Shoulder Dislocation...', true),

-- Neurology
('Headache', 'headache', 'Neurology', 'Pain in the head or neck.', 'Detailed content about Headache...', true),
('Migraine', 'migraine', 'Neurology', 'Severe recurring headache.', 'Detailed content about Migraine...', true),

-- Pulmonology
('Respiratory Disorders', 'respiratory-disorders', 'Pulmonology', 'Diseases affecting the lungs and breathing.', 'Detailed content about Respiratory Disorders...', true),

-- Urology & Andrology
('Kidney Stones', 'kidney-stones', 'Urology & Andrology', 'Hard deposits in the kidneys.', 'Detailed content about Kidney Stones...', true),
('ESWL', 'eswl', 'Urology & Andrology', 'Shock wave lithotripsy for kidney stones.', 'Detailed content about ESWL...', true),
('PCNL', 'pcnl', 'Urology & Andrology', 'Percutaneous Nephrolithotomy.', 'Detailed content about PCNL...', true),
('RIRS', 'rirs', 'Urology & Andrology', 'Retrograde Intrarenal Surgery.', 'Detailed content about RIRS...', true),
('URSL', 'ursl', 'Urology & Andrology', 'Ureteroscopic Lithotripsy.', 'Detailed content about URSL...', true),
('Enlarged Prostate', 'enlarged-prostate', 'Urology & Andrology', 'Benign Prostatic Hyperplasia (BPH).', 'Detailed content about Enlarged Prostate...', true),
('Prostatectomy', 'prostatectomy', 'Urology & Andrology', 'Surgery to remove the prostate.', 'Detailed content about Prostatectomy...', true),
('Circumcision', 'circumcision', 'Urology & Andrology', 'Surgical removal of the foreskin.', 'Detailed content about Circumcision...', true),
('Stapler Circumcision', 'stapler-circumcision', 'Urology & Andrology', 'Circumcision using a stapler device.', 'Detailed content about Stapler Circumcision...', true),
('Phimosis', 'phimosis', 'Urology & Andrology', 'Tight foreskin condition.', 'Detailed content about Phimosis...', true),
('Paraphimosis', 'paraphimosis', 'Urology & Andrology', 'Foreskin trapped behind the glans.', 'Detailed content about Paraphimosis...', true),
('Foreskin Infection', 'foreskin-infection', 'Urology & Andrology', 'Infection of the foreskin.', 'Detailed content about Foreskin Infection...', true),
('Frenuloplasty Surgery', 'frenuloplasty-surgery', 'Urology & Andrology', 'Surgery to alter the frenulum.', 'Detailed content about Frenuloplasty Surgery...', true),
('Balanitis', 'balanitis', 'Urology & Andrology', 'Inflammation of the glans penis.', 'Detailed content about Balanitis...', true),
('Balanoposthitis', 'balanoposthitis', 'Urology & Andrology', 'Inflammation of the glans and foreskin.', 'Detailed content about Balanoposthitis...', true),
('Swollen Penis', 'swollen-penis', 'Urology & Andrology', 'Swelling of the penis.', 'Detailed content about Swollen Penis...', true),
('Varicocele', 'varicocele', 'Urology & Andrology', 'Enlargement of veins within the scrotum.', 'Detailed content about Varicocele...', true),

-- Obstetrics
('Prenatal Care', 'prenatal-care', 'Obstetrics', 'Checkups during pregnancy.', 'Detailed content about Prenatal Care...', true),
('Antepartum Monitoring', 'antepartum-monitoring', 'Obstetrics', 'Monitoring before birth.', 'Detailed content about Antepartum Monitoring...', true),
('Intrapartum Monitoring', 'intrapartum-monitoring', 'Obstetrics', 'Monitoring during labor.', 'Detailed content about Intrapartum Monitoring...', true),
('Labor & Delivery', 'labor-and-delivery', 'Obstetrics', 'Childbirth services.', 'Detailed content about Labor & Delivery...', true),
('Postpartum Care', 'postpartum-care', 'Obstetrics', 'Care after childbirth.', 'Detailed content about Postpartum Care...', true),
('High-Risk Pregnancy Management', 'high-risk-pregnancy-management', 'Obstetrics', 'Care for complicated pregnancies.', 'Detailed content about High-Risk Pregnancy Management...', true),

-- Gynecology
('Uterine Fibroids', 'uterine-fibroids', 'Gynecology', 'Noncancerous growths of the uterus.', 'Detailed content about Uterine Fibroids...', true),
('Pelvic Floor Disorders', 'pelvic-floor-disorders', 'Gynecology', 'Conditions affecting pelvic muscles.', 'Detailed content about Pelvic Floor Disorders...', true),
('Rectal Prolapse', 'rectal-prolapse', 'Gynecology', 'Rectum protruding through the anus.', 'Detailed content about Rectal Prolapse...', true),
('Labiaplasty', 'labiaplasty', 'Gynecology', 'Surgery to reshape labia.', 'Detailed content about Labiaplasty...', true),
('Vaginoplasty', 'vaginoplasty', 'Gynecology', 'Surgery to tighten the vagina.', 'Detailed content about Vaginoplasty...', true),
('Hymenoplasty', 'hymenoplasty', 'Gynecology', 'Surgery to repair the hymen.', 'Detailed content about Hymenoplasty...', true),
('Hoodectomy', 'hoodectomy', 'Gynecology', 'Surgery to remove the clitoral hood.', 'Detailed content about Hoodectomy...', true),

-- ENT
('Adenoidectomy', 'adenoidectomy', 'ENT', 'Removal of adenoids.', 'Detailed content about Adenoidectomy...', true),
('Tonsillectomy', 'tonsillectomy', 'ENT', 'Removal of tonsils.', 'Detailed content about Tonsillectomy...', true),
('Throat Surgery', 'throat-surgery', 'ENT', 'Surgery on the throat.', 'Detailed content about Throat Surgery...', true),
('Mastoidectomy', 'mastoidectomy', 'ENT', 'Surgery on the mastoid bone.', 'Detailed content about Mastoidectomy...', true),
('Myringotomy', 'myringotomy', 'ENT', 'Incision in the eardrum.', 'Detailed content about Myringotomy...', true),
('Tympanoplasty', 'tympanoplasty', 'ENT', 'Repair of the eardrum.', 'Detailed content about Tympanoplasty...', true),
('Stapedectomy', 'stapedectomy', 'ENT', 'Surgery on the stapes bone.', 'Detailed content about Stapedectomy...', true),
('Septoplasty', 'septoplasty', 'ENT', 'Straightening the nasal septum.', 'Detailed content about Septoplasty...', true),
('Rhinoplasty', 'rhinoplasty', 'ENT', 'Nose job surgery.', 'Detailed content about Rhinoplasty...', true),
('Turbinate Reduction', 'turbinate-reduction', 'ENT', 'Reducing nasal turbinates.', 'Detailed content about Turbinate Reduction...', true),
('Nasal Polyps', 'nasal-polyps', 'ENT', 'Growth in nasal passages.', 'Detailed content about Nasal Polyps...', true),
('Sinus Surgery', 'sinus-surgery', 'ENT', 'Surgery for sinus problems.', 'Detailed content about Sinus Surgery...', true),
('Vocal Cord Polyps', 'vocal-cord-polyps', 'ENT', 'Growths on vocal cords.', 'Detailed content about Vocal Cord Polyps...', true),
('Ear Surgery', 'ear-surgery', 'ENT', 'Surgery on the ear.', 'Detailed content about Ear Surgery...', true),

-- Podiatry
('Corn Removal', 'corn-removal', 'Podiatry', 'Removal of corns on feet.', 'Detailed content about Corn Removal...', true),
('Diabetic Foot Ulcers', 'diabetic-foot-ulcers', 'Podiatry', 'Open sores on feet of diabetics.', 'Detailed content about Diabetic Foot Ulcers...', true),

-- Endocrinology
('Thyroidectomy', 'thyroidectomy', 'Endocrinology', 'Removal of the thyroid gland.', 'Detailed content about Thyroidectomy...', true),
('Metabolic Disorders', 'metabolic-disorders', 'Endocrinology', 'Conditions affecting metabolism.', 'Detailed content about Metabolic Disorders...', true),
('Endocrine Disorders', 'endocrine-disorders', 'Endocrinology', 'Hormonal imbalance conditions.', 'Detailed content about Endocrine Disorders...', true),

-- Gastroenterology
('Gastrointestinal Disorders', 'gastrointestinal-disorders', 'Gastroenterology', 'Digestive system conditions.', 'Detailed content about Gastrointestinal Disorders...', true),

-- Oncology
('Cancer Care', 'cancer-care', 'Oncology', 'Treatment of cancer.', 'Detailed content about Cancer Care...', true),

-- Psychiatry
('Mental Health Disorders', 'mental-health-disorders', 'Psychiatry', 'Conditions affecting mental health.', 'Detailed content about Mental Health Disorders...', true),

-- Vascular
('Deep Vein Thrombosis (DVT)', 'deep-vein-thrombosis-dvt', 'Vascular', 'Blood clot in a deep vein.', 'Detailed content about Deep Vein Thrombosis (DVT)...', true),

-- Bariatric & Weight Management
('Bariatric Surgery', 'bariatric-surgery', 'Bariatric & Weight Management', 'Weight loss surgery.', 'Detailed content about Bariatric Surgery...', true),
('Intragastric Balloon', 'intragastric-balloon', 'Bariatric & Weight Management', 'Balloon placed in stomach for weight loss.', 'Detailed content about Intragastric Balloon...', true),

-- General Medicine
('Chronic Disease Management', 'chronic-disease-management', 'General Medicine', 'Managing long-term illnesses.', 'Detailed content about Chronic Disease Management...', true),
('Infection Management', 'infection-management', 'General Medicine', 'Treating infections.', 'Detailed content about Infection Management...', true),
('Diagnostic Procedures', 'diagnostic-procedures', 'General Medicine', 'Tests to diagnose conditions.', 'Detailed content about Diagnostic Procedures...', true)

ON CONFLICT (slug) DO NOTHING;

import {
    Heart, Brain, Bone, Stethoscope, Baby, Eye, Activity,
    Scissors, Dna, Ear, UserMinus, ShieldAlert,
    Pill, TestTube, Microscope, Syringe, Ambulance,
    Thermometer, Sparkles, Utensils, Wind, ShieldCheck,
    CheckCircle2, Star, Quote, User, MapPin, Clock, Check
} from "lucide-react"

export const DEFAULT_FEATURES = [
    { title: "Advanced Technology", desc: "Equipped with the latest medical innovations.", icon: Microscope },
    { title: "Expert Team", desc: "Highly qualified and experienced specialists.", icon: User },
    { title: "Patient-Centric", desc: "Personalized care plans for every individual.", icon: Heart },
    { title: "24/7 Support", desc: "Round-the-clock emergency and critical care.", icon: Activity },
]

export const DEFAULT_TESTIMONIALS = [
    { name: "Sudeep M.", text: "The care I received was exceptional. The doctors were patient and the facilities were world-class.", rating: 5 },
    { name: "Anjali P.", text: "Professional and compassionate staff. I felt in safe hands throughout my treatment.", rating: 5 },
    { name: "Rahul K.", text: "State-of-the-art infrastructure and very hygienic environment. Highly recommended.", rating: 5 },
]

export const departmentsData: Record<string, any> = {
    "cardiology": {
        title: "Cardiology",
        description: "Comprehensive heart care including diagnostics, interventional cardiology, and cardiothoracic surgery. We treat coronary artery disease, heart failure, and arrhythmias.",
        icon: Heart,
        services: [
            { title: "Angiography", icon: Activity },
            { title: "Angioplasty", icon: Heart },
            { title: "Pacemaker Implantation", icon: Activity },
            { title: "Open Heart Surgery", icon: Heart },
        ],
        procedures: [
            { title: "Coronary Angiogram", desc: "Diagnostic test for heart blood vessels." },
            { title: "CABG", desc: "Coronary Artery Bypass Grafting surgery." },
            { title: "Valve Replacement", desc: "Repair or replacement of heart valves." },
            { title: "TAVI", desc: "Transcatheter Aortic Valve Implantation." },
        ],
        doctors: [
            { name: "Dr. Rajesh Kumar", role: "Chief Cardiologist", exp: "25+ Years", qual: "MBBS, MD, DM" },
            { name: "Dr. Anita Singh", role: "Interventional Cardiologist", exp: "15+ Years", qual: "MBBS, MD, DNB" },
        ]
    },
    "neurology": {
        title: "Neurology",
        description: "Expert diagnosis and treatment for disorders of the nervous system, including stroke, epilepsy, headache, and movement disorders.",
        icon: Brain,
        services: [
            { title: "Stroke Management", icon: Brain },
            { title: "Epilepsy Clinic", icon: Activity },
            { title: "Headache Clinic", icon: Brain },
            { title: "Movement Disorders", icon: Activity },
        ],
        procedures: [
            { title: "EEG", desc: "Electroencephalogram monitoring." },
            { title: "EMG/NCS", desc: "Nerve conduction studies." },
            { title: "Thrombolysis", desc: "Clot-busting treatment for acute stroke." },
            { title: "Botox Therapy", desc: "For chronic migraine and spasticity." },
        ],
        doctors: [
            { name: "Dr. Anjali Desai", role: "Senior Neurologist", exp: "18+ Years", qual: "MBBS, MD, DM" },
            { name: "Dr. Peter John", role: "Consultant Neurologist", exp: "12+ Years", qual: "MBBS, DNB" },
        ]
    },
    "pediatrics": {
        title: "Pediatrics",
        description: "Specialized medical care for infants, children, and adolescents. Our team provides preventive health, immunization, and treatment for acute illnesses.",
        icon: Baby,
        services: [
            { title: "Vaccination Clinic", icon: Syringe },
            { title: "Developmental Peds", icon: Baby },
            { title: "Pediatric ICU", icon: Activity },
            { title: "Neonatology", icon: Baby },
        ],
        procedures: [
            { title: "Immunization", desc: "Standard vaccination schedules." },
            { title: "Nebulization", desc: "Respiratory treatment for asthma." },
            { title: "Growth Monitoring", desc: "Tracking physical development." },
            { title: "Phototherapy", desc: "Treatment for newborn jaundice." },
        ],
        doctors: [
            { name: "Dr. Meera Nair", role: "Senior Pediatrician", exp: "20+ Years", qual: "MBBS, MD (Pediatrics)" },
            { name: "Dr. Arun Kumar", role: "Neonatologist", exp: "14+ Years", qual: "MBBS, DNB, DM" },
        ]
    },
    "nephrology": {
        title: "Nephrology",
        description: "Comprehensive care for kidney diseases, including dialysis and kidney transplantation support.",
        icon: Activity, // Fallback icon if Kidney not available, or import specific
        services: [
            { title: "Dialysis Unit", icon: Activity },
            { title: "CKD Clinic", icon: Activity },
            { title: "Kidney Transplant", icon: Activity },
            { title: "Hypertension", icon: Activity },
        ],
        procedures: [
            { title: "Hemodialysis", desc: "Blood filtration for kidney failure." },
            { title: "Peritoneal Dialysis", desc: "Home-based dialysis option." },
            { title: "Kidney Biopsy", desc: "Diagnostic tissue sampling." },
            { title: "Transplant Workup", desc: "Preparation for kidney transplant." },
        ],
        doctors: [
            { name: "Dr. S. Reddy", role: "Chief Nephrologist", exp: "22+ Years", qual: "MBBS, MD, DM" },
            { name: "Dr. Tara Singh", role: "Consultant Nephrologist", exp: "12+ Years", qual: "MBBS, DNB" },
        ]
    },
    "dermatology": {
        title: "Dermatology",
        description: "Diagnosis and treatment of skin, hair, and nail conditions. We offer both medical and cosmetic dermatology services.",
        icon: Sparkles,
        services: [
            { title: "Acne Treatment", icon: Sparkles },
            { title: "Hair Loss Clinic", icon: User },
            { title: "Laser Therapy", icon: Sparkles },
            { title: "Skin Allergies", icon: ShieldAlert },
        ],
        procedures: [
            { title: "Chemical Peels", desc: "Skin resurfacing treatment." },
            { title: "Laser Hair Removal", desc: "Permanent hair reduction." },
            { title: "Mole Removal", desc: "Surgical excision of moles." },
            { title: "Botox & Fillers", desc: "Cosmetic injectables." },
        ],
        doctors: [
            { name: "Dr. Ritu Sharma", role: "Dermatologist", exp: "15+ Years", qual: "MBBS, DDVL" },
            { name: "Dr. A. Khan", role: "Cosmetic Dermatologist", exp: "10+ Years", qual: "MBBS, MD" },
        ]
    },
    "mother-and-child": {
        title: "Mother & Child",
        description: "Integrated care for expectant mothers and newborns, ensuring a safe and comfortable birthing experience.",
        icon: Baby,
        services: [
            { title: "Antenatal Care", icon: Baby },
            { title: "Birthing Suites", icon: Heart },
            { title: "Lactation Support", icon: Baby },
            { title: "Postnatal Care", icon: User },
        ],
        procedures: [
            { title: "Normal Delivery", desc: "Natural childbirth support." },
            { title: "Painless Delivery", desc: "Epidural analgesia for labor." },
            { title: "High Risk Pregnancy", desc: "Specialized monitoring and care." },
            { title: "Newborn Screening", desc: "Early detection tests." },
        ],
        doctors: [
            { name: "Dr. Lakshmi P", role: "Senior Obstetrician", exp: "28+ Years", qual: "MBBS, MD, FRCOG" },
            { name: "Dr. S. Gupta", role: "Pediatrician", exp: "12+ Years", qual: "MBBS, MD" },
        ]
    },
    "cosmetic-surgery": {
        title: "Cosmetic & Plastic Surgery",
        description: "Reclaim confidence and restore comfort with our subtle, natural-looking procedures. Whether it’s a transformation or a restoration, we help you feel good in your skin again with artistry, precision, and privacy.",
        icon: Sparkles,
        services: [
            { title: "Facial Sculpting", icon: Sparkles },
            { title: "Body Contouring", icon: User },
            { title: "Reconstructive Surgery", icon: Scissors },
            { title: "Breast Procedures", icon: Heart },
        ],
        procedures: [
            { title: "Rhinoplasty", desc: "Reshaping of the nose for aesthetic harmony." },
            { title: "Liposuction", desc: "Body contouring for a defined silhouette." },
            { title: "Tummy Tuck", desc: "Abdominoplasty to restore abdominal profile." },
            { title: "Burn & Trauma Care", desc: "Reconstructive care for injuries and scars." },
        ],
        doctors: [
            { name: "Dr. Aryan Malhotra", role: "Senior Plastic Surgeon", exp: "18+ Years", qual: "MBBS, MS, MCh (Plastic Surgery)" },
            { name: "Dr. Kavita Rao", role: "Cosmetic Surgeon", exp: "12+ Years", qual: "MBBS, MS, DNB" },
        ],
        faqs: [
            { q: "How do I know if I’m a good candidate?", a: "If you’re in good general health and have realistic expectations. We conduct full evaluations first." },
            { q: "Are results permanent?", a: "Most offer long-lasting results, though lifestyle and aging can influence outcomes." },
            { q: "Do you do revision surgery?", a: "Yes, we offer consultations for corrective work with honest feasibility feedback." },
            { q: "Is insurance accepted?", a: "Yes, for reconstructive surgeries (trauma, burns, congenital). We assist with approvals." }
        ]
    },
    "emergency": {
        title: "Emergency & Trauma",
        description: "24/7 critical care services equipped to handle all medical and surgical emergencies. Our rapid response team ensures immediate attention when every second counts.",
        icon: Ambulance,
        services: [
            { title: "24/7 Trauma Care", icon: ShieldAlert },
            { title: "Cardiac Emergency", icon: Heart },
            { title: "Stroke Unit", icon: Brain },
            { title: "Ambulance Services", icon: Ambulance },
        ],
        procedures: [
            { title: "CPR & Resuscitation", desc: "Life-saving emergency procedures for cardiac arrest." },
            { title: "Trauma Surgery", desc: "Immediate surgical intervention for severe injuries." },
            { title: "Polytrauma Management", desc: "Coordinated care for patients with multiple injuries." },
            { title: "Poison Management", desc: "Rapid detoxification and antidotal therapy." },
        ],
        doctors: [
            { name: "Dr. Robert D'Souza", role: "Head of Emergency", exp: "20+ Years", qual: "MBBS, MD (Emergency Medicine)" },
            { name: "Dr. Neha Kapoor", role: "Trauma Specialist", exp: "10+ Years", qual: "MBBS, MEM (GWU)" },
        ]
    },
    "ent": {
        title: "ENT (Ear, Nose, Throat)",
        description: "Comprehensive diagnosis and treatment for disorders of the ear, nose, throat, head, and neck. We use advanced endoscopic technology for precise treatments.",
        icon: Ear,
        services: [
            { title: "Hearing Disorders", icon: Ear },
            { title: "Sinus & Allergy", icon: Wind },
            { title: "Voice & Speech", icon: Activity },
            { title: "Vertigo Clinic", icon: Activity },
        ],
        procedures: [
            { title: "Tonsillectomy", desc: "Surgical removal of tonsils for chronic infection." },
            { title: "Septoplasty", desc: "Correction of deviated nasal septum." },
            { title: "Cochlear Implants", desc: "Electronic device implantation for severe hearing loss." },
            { title: "Endoscopic Sinus Surgery", desc: "Minimally invasive surgery for sinus blockages." },
        ],
        doctors: [
            { name: "Dr. Sanjay Gupta", role: "Senior ENT Surgeon", exp: "22+ Years", qual: "MBBS, MS (ENT)" },
            { name: "Dr. Meenal Verma", role: "Audiology Consultant", exp: "14+ Years", qual: "MASLP, PhD" },
        ]
    },
    "general-surgery": {
        title: "General & Laparoscopic Surgery",
        description: "Focusing on abdominal contents including esophagus, stomach, small intestine, colon, liver, pancreas, gallbladder, appendix and bile ducts.",
        icon: Scissors,
        services: [
            { title: "Laparoscopic Surgery", icon: Microscope },
            { title: "Hernia Repair", icon: Activity },
            { title: "Trauma Surgery", icon: ShieldAlert },
            { title: "Appendicitis", icon: Activity },
        ],
        procedures: [
            { title: "Laparoscopic Cholecystectomy", desc: "Removal of gallbladder using keyhole surgery." },
            { title: "Appendectomy", desc: "Surgical removal of the inflamed appendix." },
            { title: "Hernioplasty", desc: "Mesh repair for various types of hernias." },
            { title: "Thyroidectomy", desc: "Surgical removal of all or part of the thyroid gland." },
        ],
        doctors: [
            { name: "Dr. Vikram Sethi", role: "Chied Surgeon", exp: "25+ Years", qual: "MBBS, MS (Gen Surgery)" },
            { name: "Dr. Ananya Reddy", role: "General Surgeon", exp: "12+ Years", qual: "MBBS, MS, FMAS" },
        ]
    },
    "general-medicine": {
        title: "General Medicine",
        description: "The first point of contact for any health concern. Our internal medicine team focuses on the prevention, diagnosis, and treatment of adult diseases.",
        icon: Stethoscope,
        services: [
            { title: "Preventive Checkups", icon: Activity },
            { title: "Infectious Diseases", icon: ShieldCheck },
            { title: "Diabetes Management", icon: Pill },
            { title: "Geriatric Care", icon: UserMinus },
        ],
        procedures: [
            { title: "Health Screenings", desc: "Comprehensive body checkups for early detection." },
            { title: "Vaccinations", desc: "Adult immunization programs." },
            { title: "Chronic Disease Mgmt", desc: "Long-term care for hypertension and diabetes." },
            { title: "Fever Clinic", desc: "Diagnosis and treatment of viral and bacterial fevers." },
        ],
        doctors: [
            { name: "Dr. Rajeshwari K", role: "Senior Physician", exp: "30+ Years", qual: "MBBS, MD (Internal Medicine)" },
            { name: "Dr. Amit Shah", role: "Consultant Physician", exp: "15+ Years", qual: "MBBS, DNB (Gen Med)" },
        ]
    },
    "bariatric": {
        title: "GI & Bariatric Surgery",
        description: "Specialized care for digestive disorders and weight loss solutions. We help you achieve a healthier lifestyle through advanced surgical interventions.",
        icon: Utensils,
        services: [
            { title: "Weight Loss Surgery", icon: Activity },
            { title: "Gut Health", icon: Utensils },
            { title: "Metabolic Surgery", icon: Activity },
            { title: "Nutritional Counseling", icon: Utensils },
        ],
        procedures: [
            { title: "Gastric Sleeve", desc: "Reducing stomach size to limit food intake." },
            { title: "Gastric Bypass", desc: "Rerouting the digestive system for weight loss." },
            { title: "Bariatric Revision", desc: "Corrective surgery for previous bariatric procedures." },
            { title: "Gastric Balloon", desc: "Non-surgical weight loss option." },
        ],
        doctors: [
            { name: "Dr. Mohit Bhandari", role: "Bariatric Surgeon", exp: "20+ Years", qual: "MBBS, MS, FALS" },
            { name: "Dr. Sarah Khan", role: "Nutritionist", exp: "10+ Years", qual: "MSc (Nutrition & Dietetics)" },
        ]
    },
    "gynaecology": {
        title: "Gynaecology & Obstetrics",
        description: "Complete women's health care ranging from adolescence to menopause. We provide expert care for maternity, infertility, and gynecological disorders.",
        icon: Baby,
        services: [
            { title: "Maternity Care", icon: Baby },
            { title: "Infertility Clinic", icon: TestTube },
            { title: "PCOS Management", icon: Activity },
            { title: "Menopause Clinic", icon: Activity },
        ],
        procedures: [
            { title: "C-Section Delivery", desc: "Surgical delivery of a baby." },
            { title: "Hysterectomy", desc: "Surgical removal of the uterus." },
            { title: "Laparoscopy", desc: "Minimally invasive diagnostic and surgical procedure." },
            { title: "IVF Treatment", desc: "Assisted reproductive technology for infertility." },
        ],
        doctors: [
            { name: "Dr. Nandini Sharma", role: "Senior Gynecologist", exp: "24+ Years", qual: "MBBS, MD, DGO" },
            { name: "Dr. Priya Roy", role: "Obstetrician", exp: "14+ Years", qual: "MBBS, MS (OBG)" },
        ]
    },
    "neurosurgery": {
        title: "Neurosurgery",
        description: "Advanced surgical care for disorders of the brain, spine, and peripheral nerves. Our team uses cutting-edge technology for precise outcomes.",
        icon: Brain,
        services: [
            { title: "Brain Tumor Surgery", icon: Brain },
            { title: "Spine Surgery", icon: Bone },
            { title: "Pediatric Neurosurgery", icon: Baby },
            { title: "Neuro-Trauma", icon: ShieldAlert },
        ],
        procedures: [
            { title: "Craniotomy", desc: "Surgical opening of the skull to access the brain." },
            { title: "Spinal Fusion", desc: "Joining vertebrae to stabilize the spine." },
            { title: "DBS Implantation", desc: "Deep Brain Stimulation for Parkinson's." },
            { title: "Laminectomy", desc: "Decompression surgery for spinal stenosis." },
        ],
        doctors: [
            { name: "Dr. Suresh Menon", role: "Lead Neurosurgeon", exp: "20+ Years", qual: "MBBS, MS, MCh (Neurosurgery)" },
            { name: "Dr. James Thomas", role: "Spine Surgeon", exp: "15+ Years", qual: "MBBS, MS, MCh" },
        ]
    },
    "oncology": {
        title: "Oncology",
        description: "Comprehensive cancer care with a multidisciplinary approach. We offer medical, surgical, and radiation oncology services under one roof.",
        icon: Dna,
        services: [
            { title: "Chemotherapy", icon: Pill },
            { title: "Radiation Therapy", icon: Activity },
            { title: "Surgical Oncology", icon: Scissors },
            { title: "Palliative Care", icon: Heart },
        ],
        procedures: [
            { title: "Tumor Resection", desc: "Surgical removal of cancerous tumors." },
            { title: "Immunotherapy", desc: "Boosting the body's immune system to fight cancer." },
            { title: "Bone Marrow Transplant", desc: "Replacement of damaged blood-forming cells." },
            { title: "Targeted Therapy", desc: "Drugs designed to target specific cancer cells." },
        ],
        doctors: [
            { name: "Dr. Aditi Rao", role: "Medical Oncologist", exp: "18+ Years", qual: "MBBS, MD, DM (Oncology)" },
            { name: "Dr. Kiran Kumar", role: "Surgical Oncologist", exp: "21+ Years", qual: "MBBS, MS, MCh" },
        ]
    },
    "orthopaedics": {
        title: "Orthopaedics",
        description: "Specialized care for bone, joint, and muscle conditions, focusing on restoring mobility and improving quality of life.",
        icon: Bone,
        services: [
            { title: "Joint Replacement", icon: Bone },
            { title: "Sports Medicine", icon: Activity },
            { title: "Trauma Care", icon: ShieldCheck },
            { title: "Arthroscopy", icon: Activity },
        ],
        procedures: [
            { title: "Total Knee Replacement", desc: "Surgical replacement of damaged knee joint." },
            { title: "Hip Replacement", desc: "Surgery to replace a worn-out or damaged hip joint." },
            { title: "ACL Reconstruction", desc: "Repair of the anterior cruciate ligament in the knee." },
            { title: "Spinal Fusion", desc: "Surgery to connect two or more vertebrae primarily for pain." },
        ],
        doctors: [
            { name: "Dr. Vikram Singh", role: "Senior Orthopedic Surgeon", exp: "22+ Years", qual: "MBBS, MS (Ortho)" },
            { name: "Dr. Priya Patel", role: "Sports Medicine Specialist", exp: "10+ Years", qual: "MBBS, Diploma in Sports Medicine" },
        ]
    },
    "pain-management": {
        title: "Pain Management",
        description: "Dedicated to helping patients manage chronic pain through a combination of medications, therapies, and minimally invasive procedures.",
        icon: Activity,
        services: [
            { title: "Chronic Pain Clinic", icon: Activity },
            { title: "Interventional Pain", icon: Syringe },
            { title: "Physiotherapy", icon: Activity },
            { title: "Psychological Support", icon: Brain },
        ],
        procedures: [
            { title: "Epidural Steroid Injection", desc: "Relief for spinal nerve pain." },
            { title: "Nerve Blocks", desc: "Interrupting pain signals from specific nerves." },
            { title: "Radiofrequency Ablation", desc: "Using heat to reduce pain transmission." },
            { title: "Trigger Point Injections", desc: "Treating painful muscle knots." },
        ],
        doctors: [
            { name: "Dr. Sameer Khan", role: "Pain Specialist", exp: "15+ Years", qual: "MBBS, MD, FIPP" },
            { name: "Dr. Lisa George", role: "Physiotherapist", exp: "12+ Years", qual: "BPT, MPT" },
        ]
    },
    "proctology": {
        title: "Proctology",
        description: "Expert care for disorders of the rectum, anus, and colon. Using advanced laser and minimally invasive techniques for faster recovery.",
        icon: UserMinus,
        services: [
            { title: "Laser Proctology", icon: Sparkles },
            { title: "Colonoscopy", icon: Microscope },
            { title: "Rectal Prolapse", icon: Activity },
            { title: "Fistula Treatment", icon: Activity },
        ],
        procedures: [
            { title: "Laser Hemorrhoidoplasty", desc: "Painless laser treatment for piles." },
            { title: "Fistulectomy", desc: "Surgical removal of an anal fistula." },
            { title: "Sphincterotomy", desc: "Treatment for anal fissures to relieve pain." },
            { title: "Polypectomy", desc: "Removal of polyps from the colon or rectum." },
        ],
        doctors: [
            { name: "Dr. Arjun Das", role: "Proctologist", exp: "16+ Years", qual: "MBBS, MS, FIAGES" },
            { name: "Dr. Renu Pillai", role: "Colorectal Surgeon", exp: "13+ Years", qual: "MBBS, DNB" },
        ]
    },
    "pulmonology": {
        title: "Pulmonology",
        description: "Specialized care for respiratory health, treating conditions like asthma, COPD, pneumonia, and other lung-related disorders.",
        icon: Wind,
        services: [
            { title: "Asthma Clinic", icon: Wind },
            { title: "Sleep Medicine", icon: Activity },
            { title: "Interventional Pulmonology", icon: Microscope },
            { title: "Tuberculosis Care", icon: ShieldCheck },
        ],
        procedures: [
            { title: "Bronchoscopy", desc: "Visual examination of the airways." },
            { title: "Thoracocentesis", desc: "Removal of excess fluid from the pleural space." },
            { title: "PFT (Pulmonary Function)", desc: "Tests to measure lung capacity and flow." },
            { title: "Sleep Study", desc: "Diagnosis of sleep apnea and disorders." },
        ],
        doctors: [
            { name: "Dr. Vivek Murthy", role: "Pulmonologist", exp: "19+ Years", qual: "MBBS, MD (Resp Med)" },
            { name: "Dr. Sara Joseph", role: "Sleep Specialist", exp: "11+ Years", qual: "MBBS, DNB, fccp" },
        ]
    },
    "urology": {
        title: "Urology",
        description: "Advanced urological care for men and women. Treating kidney stones, urinary tract infections, prostate issues, and more.",
        icon: TestTube,
        services: [
            { title: "Kidney Stones", icon: Bone },
            { title: "Prostate Health", icon: Activity },
            { title: "Male Infertility", icon: Baby },
            { title: "Uro-Oncology", icon: Dna },
        ],
        procedures: [
            { title: "Lithotripsy", desc: "Shock wave treatment for kidney stones." },
            { title: "TURP", desc: "Surgery for enlarged prostate." },
            { title: "Cystoscopy", desc: "Endoscopic view of the bladder." },
            { title: "Nephrectomy", desc: "Surgical removal of a kidney." },
        ],
        doctors: [
            { name: "Dr. Karthik Reddy", role: "Senior Urologist", exp: "20+ Years", qual: "MBBS, MS, MCh (Urology)" },
            { name: "Dr. P. Venkat", role: "Andrologist", exp: "15+ Years", qual: "MBBS, MS, DNB" },
        ]
    },
    "vascular": {
        title: "Vascular Surgery",
        description: "Diagnosis and management of disorders affecting the arteries, veins, and lymphatic systems. We offer both open and endovascular solutions.",
        icon: Heart,
        services: [
            { title: "Varicose Veins", icon: Activity },
            { title: "DVT Treatment", icon: ShieldCheck },
            { title: "Aortic Surgery", icon: Heart },
            { title: "Diabetic Foot Care", icon: Activity },
        ],
        procedures: [
            { title: "Laser Varicose Vein", desc: "Minimally invasive treatment for varicose veins." },
            { title: "Angioplasty", desc: "Opening narrowed or blocked blood vessels." },
            { title: "Bypass Surgery", desc: "Rerouting blood flow around blocked arteries." },
            { title: "Carotid Endarterectomy", desc: "Removing plaque from carotid arteries to prevent stroke." },
        ],
        doctors: [
            { name: "Dr. Maheshwar Rao", role: "Vascular Surgeon", exp: "23+ Years", qual: "MBBS, MS, MCh (Vascular)" },
            { name: "Dr. Sujata K", role: "Endovascular Specialist", exp: "14+ Years", qual: "MBBS, DNB" },
        ]
    }
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  department: string;
  languages: string[];
  locations: string[];
  qualification: string;
  experience: string;
  specialization: string;
  tags: string[];
  positioning: string;
  rating: number;
  patientsTreated?: string;
  image: string;
  about: string;
  highlights: string[];
  expertise: string[];
  education: { degree: string; institution?: string }[];
  awards?: string[];
  achievements: string[];
  services: {
    category: string;
    items: string[];
  }[];
  availability: string;
}

export const doctors: Doctor[] = [
  {
    id: "dr-jyothi-reddy",
    name: "Dr. D Jyothi Reddy",
    title: "Clinical Director - Obstetrics & Gynecology",
    department: "Obstetrics & Gynecology",
    languages: ["English", "Hindi", "Telugu"],
    locations: ["Kompally"],
    qualification: "MBBS, MD (OBGYN)",
    experience: "8+ Years Experience",
    specialization: "Obstetrician & Gynaecologist",
    tags: ["High-Risk Pregnancy", "Laparoscopy", "Infertility"],
    positioning: "Specialist in high-risk pregnancy & minimally invasive gynecology",
    rating: 4.8,
    patientsTreated: "5,000+",
    image: "/images/dr-jyothi-reddy.jpg",
    about: "Dr. Jyothi Reddy is dedicated to providing compassionate care for women at every stage of their life. With specialized expertise in high-risk pregnancies and laparoscopic surgeries, she ensures the best outcomes for both mother and child.",
    highlights: [
      "500+ Successful Procedures",
      "Expert in High-Risk Cases",
      "95% Patient Satisfaction",
      "Advanced Surgical Techniques"
    ],
    expertise: [
      "High-Risk Pregnancy",
      "Laparoscopy",
      "Infertility Treatment",
      "Family Planning",
      "Emergency Care"
    ],
    education: [
      { degree: "MRCOG", institution: "London" },
      { degree: "DNB", institution: "OBGYN" },
      { degree: "MBBS" }
    ],
    achievements: [
      "Managed 300+ high-risk pregnancies",
      "Performed 100+ laparoscopic surgeries",
      "High patient satisfaction rate"
    ],
    services: [
      {
        category: "Pregnancy Care",
        items: ["Antenatal care", "Normal delivery", "Painless delivery"]
      },
      {
        category: "Gynecology",
        items: ["PCOS / PCOD", "Fibroids", "Endometriosis"]
      },
      {
        category: "Procedures",
        items: ["Laparoscopy", "Hysteroscopy"]
      }
    ],
    availability: "Mon-Sat, 10:00 AM - 4:00 PM"
  },
  {
    id: "dr-narendar-reddy",
    name: "Dr. Narendar Reddy",
    title: "Chief Interventional Pain Specialist",
    department: "Pain Management",
    languages: ["English", "Hindi", "Telugu", "Kannada"],
    locations: ["Kompally", "Kondapur"],
    qualification: "MBBS, MD",
    experience: "15+ Years Experience",
    specialization: "Interventional Pain Specialist",
    tags: ["Spine Pain", "Joint Pain", "Chronic Pain"],
    positioning: "Spine & joint pain expert with a focus on non-surgical interventions",
    rating: 4.9,
    patientsTreated: "10,000+",
    image: "/images/dr-narendar-reddy.jpg",
    about: "Dr. Narendar Reddy specializes in managing chronic pain through advanced interventional techniques. His goal is to improve the quality of life for patients suffering from long-term spine and joint issues.",
    highlights: [
      "2,000+ Pain Relief Procedures",
      "Expert in Spine Interventions",
      "98% Success Rate",
      "Minimally Invasive Focus"
    ],
    expertise: [
      "Spine Pain Management",
      "Joint Pain Treatment",
      "Nerve Blocks",
      "PRP Therapy",
      "Regenerative Medicine"
    ],
    education: [
      { degree: "Fellowship in Pain Management" },
      { degree: "MD" },
      { degree: "MBBS" }
    ],
    achievements: [
      "Successfully treated 500+ cases of chronic back pain",
      "Pioneer in ultrasound-guided nerve blocks in the region",
      "Recognized for excellence in patient care"
    ],
    services: [
      {
        category: "Spine Care",
        items: ["Epidural injections", "Facet joint blocks", "Radiofrequency ablation"]
      },
      {
        category: "Joint Care",
        items: ["Knee pain treatment", "Shoulder pain management", "Hip joint interventions"]
      }
    ],
    availability: "Mon-Fri, 9:00 AM - 5:00 PM"
  },
  {
    id: "dr-aravind-varma",
    name: "Dr. Aravind Varma",
    title: "Senior Consultant Orthopedic Surgeon",
    department: "Orthopaedics",
    languages: ["English", "Hindi", "Telugu"],
    locations: ["Kompally"],
    qualification: "MBBS, MS (Ortho)",
    experience: "12+ Years Experience",
    specialization: "Orthopedic Surgeon",
    tags: ["Joint Replacement", "Fracture Care", "Sports Injury"],
    positioning: "Expert in joint replacement and complex fracture management",
    rating: 4.7,
    patientsTreated: "8,000+",
    image: "/images/dr-aravind-varma.jpg",
    about: "Dr. Aravind Varma is a highly skilled orthopedic surgeon known for his precision in complex surgeries. He focuses on restoring mobility and function through advanced orthopedic techniques.",
    highlights: [
      "1,000+ Joint Replacements",
      "Complex Trauma Expert",
      "94% Mobility Recovery Rate",
      "Precision Surgery Expert"
    ],
    expertise: [
      "Total Knee Replacement",
      "Total Hip Replacement",
      "Arthroscopy",
      "Fracture Management",
      "Sports Medicine"
    ],
    education: [
      { degree: "MS Orthopaedics" },
      { degree: "MBBS" }
    ],
    achievements: [
      "Pioneered robotic-assisted joint replacement in the hospital",
      "Managed 1,000+ trauma cases with high success",
      "Author of several research papers in orthopedics"
    ],
    services: [
      {
        category: "Surgeries",
        items: ["Knee replacement", "Hip replacement", "Shoulder arthroscopy"]
      },
      {
        category: "Care",
        items: ["Fracture stabilization", "Physiotherapy coordination", "Post-op rehabilitation"]
      }
    ],
    availability: "Mon-Sat, 11:00 AM - 6:00 PM"
  },
  {
    id: "dr-deepak-ram",
    name: "Dr. Polymoni Deepak Ram",
    title: "Consultant Physician - General Medicine",
    department: "General Medicine",
    languages: ["English", "Telugu", "Hindi"],
    locations: ["Kompally"],
    qualification: "MBBS, MD",
    experience: "8+ Years Experience",
    specialization: "General Medicine Physician",
    tags: ["Diabetes", "Hypertension", "Infectious Diseases"],
    positioning: "Comprehensive adult care and chronic disease management",
    rating: 4.8,
    patientsTreated: "2,000+",
    image: "/images/dr-deepak-ram.png",
    about: "Dr. Polymoni Deepak Ram is a dedicated Consultant Physician in General Medicine, specializing in preventive healthcare, diabetes, hypertension, and complex internal medical conditions. He is committed to providing personalized patient care and promoting long-term health and wellness.",
    highlights: [
      "Chronic Disease Specialist",
      "Comprehensive Health Screenings",
      "High Patient Satisfaction",
      "Preventive Care Focus"
    ],
    expertise: [
      "Diabetes Management",
      "Hypertension Control",
      "Infectious Disease Care",
      "Geriatric Medicine",
      "Preventive Screenings"
    ],
    education: [
      { degree: "MD (General Medicine)" },
      { degree: "MBBS" }
    ],
    achievements: [
      "Successfully managed thousands of outpatient and inpatient chronic medical cases",
      "Led community health screening and diabetes awareness campaigns",
      "Awarded for clinical excellence in patient care"
    ],
    services: [
      {
        category: "Internal Medicine",
        items: ["Chronic disease management", "Diabetes & hypertension care", "Infectious disease treatment"]
      },
      {
        category: "Preventive Care",
        items: ["Annual health checkups", "Lifestyle and nutrition advice", "Adult vaccinations"]
      }
    ],
    availability: "Mon-Sat, 9:00 AM - 4:00 PM"
  },
  {
    id: "dr-veda-sree",
    name: "Dr. Chimmana Veda Sree",
    title: "Consultant Physician - General Medicine",
    department: "General Medicine",
    languages: ["Telugu", "Hindi", "English"],
    locations: ["Kompally"],
    qualification: "MBBS, MD (General Medicine)",
    experience: "5+ Years Experience",
    specialization: "General Physician",
    tags: ["Internal Medicine", "Critical Care", "Emergency Management"],
    positioning: "Specialist in internal medicine, emergency management, and critical ICU care",
    rating: 4.8,
    patientsTreated: "1,200+",
    image: "/images/dr-veda-sree.jpg",
    about: "Dr. Chimmana Veda Sree is a clinically competent physician specializing in General Medicine. With a strong background in emergency management and ICU care, she focuses on providing comprehensive diagnostic and therapeutic care for complex adult health conditions.",
    highlights: [
      "Expert in Emergency Management",
      "Advanced ICU & Critical Care Skills",
      "Published Researcher in Indexed Journals",
      "Specialist in Chronic Headache Profiles"
    ],
    expertise: [
      "Internal Medicine",
      "Emergency & ICU Care",
      "Diagnostic Interpretation (CT/MRI/ECG)",
      "Procedural Expertise (Intubation/Central Line)",
      "Chronic Disease Management"
    ],
    education: [
      { degree: "MD General Medicine", institution: "Prathima Institute of Medical Sciences" },
      { degree: "MBBS", institution: "Chalmeda Ananda Rao Institute of Medical Sciences" }
    ],
    achievements: [
      "Published 'A case report of DCLD with Pancytopenia' in EJPMR",
      "Successfully managed critical cases during the COVID-19 pandemic",
      "Conducted extensive research on 'Clinical and Radiological Profile of Chronic Headache'",
      "Recipient of BLS/ACLS Certification"
    ],
    services: [
      {
        category: "Internal Medicine",
        items: ["OPD/IPD Management", "Chronic Disease Screening", "Emergency Stabilization"]
      },
      {
        category: "Critical Care",
        items: ["ICU Management", "Ventilator Support", "Advanced Procedural Care"]
      }
    ],
    availability: "Mon-Sat, 9:00 AM - 5:00 PM"
  },
  {
    id: "dr-rama-mourya",
    name: "Dr. Rama Mourya",
    title: "Consultant Pulmonologist",
    department: "Pulmonology",
    languages: ["English", "Telugu", "Hindi"],
    locations: ["Kompally"],
    qualification: "MBBS, MD",
    experience: "6+ Years Experience",
    specialization: "Pulmonologist",
    tags: ["Asthma", "COPD", "Pulmonology"],
    positioning: "Specialist in respiratory care and pulmonology",
    rating: 4.8,
    patientsTreated: "1,500+",
    image: "/images/dr-rama-mourya.png",
    about: "Dr. Rama Mourya is a compassionate Pulmonologist dedicated to providing advanced care for respiratory and lung-related disorders. She specializes in the management of asthma, chronic obstructive pulmonary disease (COPD), respiratory infections, and sleep disorders, ensuring patients receive tailored treatment plans for optimal lung health.",
    highlights: [
      "Expert in Chronic Respiratory Care",
      "Comprehensive Pulmonary Diagnostics",
      "Patient-Centered Treatment Plans",
      "Specialist in Sleep Apnea Care"
    ],
    expertise: [
      "Asthma Management",
      "COPD Treatment",
      "Respiratory Infections",
      "Sleep Apnea & Sleep Studies",
      "Pulmonary Function Testing (PFT)"
    ],
    education: [
      { degree: "MD (Pulmonary Medicine)" },
      { degree: "MBBS" }
    ],
    achievements: [
      "Successfully diagnosed and managed numerous complex lung conditions",
      "Pioneered sleep study diagnosis programs in the region",
      "Committed to community health and respiratory wellness advocacy"
    ],
    services: [
      {
        category: "Pulmonology",
        items: ["Asthma & Allergy management", "COPD & Emphysema therapy", "Tuberculosis & Respiratory infections treatment"]
      },
      {
        category: "Diagnostics",
        items: ["Pulmonary Function Test (PFT)", "Diagnostic Bronchoscopy", "Sleep study monitoring"]
      }
    ],
    availability: "Mon-Sat, 10:00 AM - 5:00 PM"
  },
  {
    id: "dr-samara-simha",
    name: "Dr. Samara Simha Reddy",
    title: "Consultant General & Laparoscopic Surgeon",
    department: "General Surgery",
    languages: ["English", "Telugu", "Hindi"],
    locations: ["Kompally"],
    qualification: "MBBS, MS",
    experience: "10+ Years Experience",
    specialization: "General & Laparoscopic Surgeon",
    tags: ["Laparoscopy", "Hernia Repair", "Appendicitis"],
    positioning: "Specialist in minimally invasive and advanced general surgeries",
    rating: 4.9,
    patientsTreated: "3,500+",
    image: "/images/dr-samara-simha.png",
    about: "Dr. Samara Simha Reddy is an experienced Consultant General Surgeon specializing in laparoscopic (minimally invasive) procedures. His focus areas include hernia repairs, appendectomies, gallbladder removals, and other abdominal surgeries, ensuring fast recovery and high patient comfort.",
    highlights: [
      "Laparoscopic Surgery Expert",
      "Minimal Recovery Time Focus",
      "Experienced Trauma Surgeon",
      "Advanced Surgical Precision"
    ],
    expertise: [
      "Laparoscopic Cholecystectomy",
      "Hernia Repairs (Mesh/Keyhole)",
      "Appendectomy",
      "Trauma and Emergency Surgery",
      "Abdominal Wall Reconstruction"
    ],
    education: [
      { degree: "MS (General Surgery)" },
      { degree: "MBBS" }
    ],
    achievements: [
      "Performed over 1,500 successful laparoscopic surgeries",
      "Expert in handling acute surgical emergencies and complex trauma cases",
      "Active contributor to surgical training and clinical research"
    ],
    services: [
      {
        category: "Laparoscopic Procedures",
        items: ["Laparoscopic gallbladder removal", "Laparoscopic appendix removal", "Keyhole hernia repair"]
      },
      {
        category: "General Surgery",
        items: ["Minor surgical procedures", "Abscess drainage & cyst removals", "Emergency trauma stabilization"]
      }
    ],
    availability: "Mon-Sat, 10:00 AM - 6:00 PM"
  }
];


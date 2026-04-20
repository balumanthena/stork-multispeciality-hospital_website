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
    image: "/images/dr jyothi.jpg.jpeg",
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
    image: "/images/dr narender reddy.png",
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
    image: "/images/dr aravind.jpg.jpeg",
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
    id: "dr-veda-vyas",
    name: "Dr. Veda Vyas",
    title: "Chief General Physician",
    department: "General Medicine",
    languages: ["English", "Hindi", "Telugu", "Tamil"],
    locations: ["Kompally", "Banjara Hills"],
    qualification: "MBBS, MD (Gen Med)",
    experience: "10+ Years Experience",
    specialization: "General Physician",
    tags: ["Diabetes", "Thyroid", "Hypertension"],
    positioning: "Comprehensive care for diabetes, thyroid, and internal medicine",
    rating: 4.8,
    patientsTreated: "15,000+",
    image: "/images/dr veda vyas.JPG.jpeg",
    about: "Dr. Veda Vyas provides holistic care for adult health issues. He specializes in managing chronic conditions like diabetes and hypertension with a focus on long-term wellness.",
    highlights: [
      "Comprehensive Diabetic Care",
      "Thyroid Management Expert",
      "Holistic Wellness Approach",
      "Patient Education Focus"
    ],
    expertise: [
      "Diabetes Management",
      "Thyroid Disorders",
      "Hypertension Control",
      "Infectious Diseases",
      "Preventive Healthcare"
    ],
    education: [
      { degree: "MD Internal Medicine" },
      { degree: "MBBS" }
    ],
    achievements: [
      "Successfully managed 5,000+ diabetic patients",
      "Community wellness program lead",
      "Expert in metabolic disorder management"
    ],
    services: [
      {
        category: "Internal Medicine",
        items: ["Diabetes screening & management", "Thyroid evaluation", "Hypertension titration"]
      },
      {
        category: "Wellness",
        items: ["Annual health checkups", "Immunizations", "Lifestyle counseling"]
      }
    ],
    availability: "Mon-Sat, 8:00 AM - 2:00 PM"
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
    image: "/images/dr-veda-sree.png",
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
  }
];


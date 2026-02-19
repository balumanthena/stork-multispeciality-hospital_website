import { HARDCODED_TREATMENTS } from "./hardcoded-treatments"
import { HARDCODED_PROCEDURES } from "./hardcoded-procedures"

export interface TreatmentDetail {
    slug: string
    title: string
    category: string // Department Name
    departmentHref: string
    subheading?: string
    tagline?: string
    breadcrumbTitle?: string
    shortDescription: string
    // Overview Section (Custom "Why Stork" style)
    overview?: {
        heading: string
        intro: string
        items: string[]
    }
    // Dynamic Headings
    conditionsHeading?: string
    procedureHeading?: string
    benefitsHeading?: string
    faqHeading?: string

    fullDescription: string[] // Keep for backward compatibility/default
    conditionsTreated: string[]
    procedureSteps: { title: string; description: string }[]
    benefits: string[]
    risks: string[]
    recoveryTimeline: string[]
    faqs: { question: string; answer: string }[]
    customCta?: {
        heading: string
        description: string
        buttonText: string
    }
    meta?: {
        duration: string
        anesthesia: string
        hospitalStay: string
        recoveryTime: string
        successRate?: string
    }
    reviewedBy?: {
        name: string
        role: string
        experience: string
        image?: string
    }
}

export function getAllTreatmentSlugs() {
    const treatments = HARDCODED_TREATMENTS.flatMap(cat => cat.items.map(item => {
        const slug = item.href.split("/").pop() || ""
        return slug
    }))
    const procedures = HARDCODED_PROCEDURES.flatMap(cat => cat.items.map(item => {
        const slug = item.href.split("/").pop() || ""
        return slug
    }))
    return [...new Set([...treatments, ...procedures])]
}

const PROCEDURE_ALIAS_MAP: Record<string, string> = {
    "appendectomy": "appendicitis",
    "gallbladder-surgery": "gallstone",
    "hernia-surgery": "hernia",
    "umbilical-hernia-repair": "umbilical-hernia",
    "laparoscopic-surgery": "minimally-invasive-surgery",
    "hydrocelectomy": "hydrocele",
    "arthroscopy": "arthroscopy-surgery",
    "knee-replacement": "total-knee-replacement",
    "hip-replacement": "hip-replacement-surgery",
    "acl-pcl-tear": "arthroscopy-surgery",
    "uterine-fibroids-surgery": "uterine-fibroids"
}

export function getTreatmentDetail(rawSlug: string): TreatmentDetail | null {
    // 1. Find the treatment in HARDCODED_TREATMENTS OR HARDCODED_PROCEDURES to get real title/category
    let foundItem = null
    let foundCategory = null

    // Helper specific for procedures since interface is slightly different but usable
    const allCategories = [...HARDCODED_TREATMENTS, ...HARDCODED_PROCEDURES]

    for (const cat of allCategories) {
        const item = cat.items.find(i => i.href.endsWith(`/${rawSlug}`))
        if (item) {
            foundItem = item
            foundCategory = cat
            break
        }
    }

    if (!foundItem || !foundCategory) {
        return null
    }

    const slug = PROCEDURE_ALIAS_MAP[rawSlug] || rawSlug

    // 2. Specific Override for Adenoidectomy
    if (slug === "adenoidectomy") {
        return {
            slug: slug,
            title: "Adenoidectomy – Specialized Adenoid Removal at Stork Hospital, Hyderabad",
            subheading: "Restoring Easy Breathing and Peaceful Sleep Through Expert ENT Care",
            breadcrumbTitle: "Adenoidectomy",
            category: "ENT", // Force "ENT" as requested
            departmentHref: foundCategory.href || "#",
            shortDescription: `Adenoidectomy is a targeted surgical procedure performed to remove swollen or chronically infected adenoids—small glands located behind the nasal cavity. At Stork Multispecialty Hospital, Hyderabad, our ENT surgeons use precision-based, minimally invasive techniques to help children and adults breathe freely, reduce infections, and sleep better.
When enlarged, adenoids can block airflow, cause persistent nasal issues, trigger snoring, and lead to frequent ear or throat infections. Prompt surgical care can prevent ongoing discomfort and complications.`,

            // Custom "Why Stork" Section
            overview: {
                heading: "Why Stork Hospital is Preferred for Adenoidectomy in Hyderabad",
                intro: "We blend advanced ENT technology with individualized care:",
                items: [
                    "Expert ENT surgeons for adenoidectomy in Hyderabad with years of specialized experience",
                    "Walk-in ENT appointments near Kondapur for quick assessment",
                    "State-of-the-art surgical methods to minimize bleeding and speed recovery",
                    "Anesthesia care designed for both pediatric and adult needs",
                    "Complete follow-up to ensure lasting improvements",
                    "Recognized Hyderabad hospital accepting insurance for ENT surgeries"
                ]
            },
            fullDescription: [], // Not used for this page

            // Symptoms
            conditionsHeading: "Symptoms Suggesting the Need for Adenoid Removal",
            conditionsTreated: [
                "Constant nasal blockage or mouth breathing",
                "Sleep disturbances or loud snoring",
                "Repeated middle ear infections or ear fluid build-up",
                "Chronic sinus or throat infections",
                "Speech changes due to nasal obstruction"
            ],

            // Process
            procedureHeading: "The Adenoidectomy Process at Stork",
            procedureSteps: [
                {
                    title: "Evaluation",
                    description: "Comprehensive ENT evaluation, including nasal endoscopy when needed"
                },
                {
                    title: "Preparation",
                    description: "Pre-operative health review and anesthesia preparation"
                },
                {
                    title: "Procedure",
                    description: "Gentle adenoid removal under general anesthesia using modern equipment"
                },
                {
                    title: "Recovery",
                    description: "Same-day discharge or short observation period"
                },
                {
                    title: "Aftercare",
                    description: "Personalized recovery plan to support breathing improvement and healing"
                },
                {
                    title: "Outcome",
                    description: "Patients typically notice easier breathing, better sleep, and fewer infections soon after the procedure."
                }
            ],

            // Benefits
            benefitsHeading: "Benefits of Adenoidectomy at Stork",
            benefits: [
                "Clearer nasal passages",
                "Reduction in snoring and nighttime breathing issues",
                "Decrease in ear and throat infection frequency",
                "Quick recovery with minimal post-surgery discomfort",
                "Enhanced quality of daily life"
            ],

            risks: [],
            recoveryTimeline: [],

            // FAQ
            faqHeading: "FAQs – Adenoidectomy at Stork",
            faqs: [
                {
                    question: "Is the surgery only for children?",
                    answer: "No. While common in children, adults may also require adenoid removal."
                },
                {
                    question: "Is the procedure safe for young patients?",
                    answer: "Yes. Our pediatric-focused approach ensures safety and comfort."
                },
                {
                    question: "How soon can normal activities resume?",
                    answer: "Most patients return to daily routines in 3–5 days."
                },
                {
                    question: "Is adenoidectomy covered by insurance?",
                    answer: "Yes. We are a Hyderabad hospital accepting insurance for ENT procedures."
                }
            ],

            customCta: {
                heading: "Breathe Easier with Stork Hospital",
                description: "If breathing issues or chronic infections are impacting you or your child, schedule an adenoidectomy consultation at Stork Hospital, Hyderabad. Our expert ENT surgeons provide safe, efficient, and long-term relief.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "45-60 Minutes",
                anesthesia: "General Anesthesia",
                hospitalStay: "Day Care / Overnight",
                recoveryTime: "3-5 Days",
                successRate: "99%"
            },
            reviewedBy: {
                name: "Dr. Rakesh Kumar",
                role: "Senior ENT Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "anal-fissure") {
        return {
            slug: slug,
            title: "Anal Fissure – Stork Hospital, Hyderabad",
            subheading: "Specialized Care for Quick and Comfortable Healing",
            breadcrumbTitle: "Anal Fissure",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `An anal fissure is a small crack or tear in the delicate lining of the anus, often caused by hard bowel movements or chronic constipation. This condition can result in sharp pain, bleeding, and ongoing discomfort that affects daily life. While mild fissures may heal with home care, recurring or severe cases often need targeted medical treatment.

At Stork Multispecialty Hospital, Hyderabad, our gastroenterology and colorectal care team focuses on discreet, patient-friendly, and effective solutions. We combine the latest medical techniques with dietary and lifestyle advice, ensuring not just symptom relief but long-term prevention.`,

            overview: {
                heading: "Why Patients Trust Stork Hospital for Anal Fissure Treatment",
                intro: "",
                items: [
                    "Experienced gastroenterologists and colorectal specialists offering advanced care",
                    "On-site diagnostic center in Hyderabad for prompt, accurate evaluation",
                    "Advanced surgical center with minimally invasive treatment options",
                    "24/7 emergency hospital near Hitech City for urgent rectal pain or bleeding",
                    "Insurance accepted at Stork Hospital with full billing transparency",
                    "Walk-in clinic near Kondapur for same-day appointments",
                    "Ongoing follow-up care to reduce the risk of recurrence"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Recognizing the Symptoms",
            conditionsTreated: [
                "Sharp, burning pain during or after bowel movements",
                "Small tear visible near the anus",
                "Bright red blood on toilet paper or stool",
                "Itching or irritation in the anal region",
                "Spasms in the anal muscles"
            ],

            procedureHeading: "Treatment approaches at Stork Hospital",
            procedureSteps: [
                {
                    title: "Non-Surgical Care",
                    description: "Medicated creams to ease muscle tension and improve blood supply. Fiber-rich diet and stool softeners to reduce strain. Sitz baths to relieve pain and promote healing. Lifestyle changes for better bowel health."
                },
                {
                    title: "Surgical Treatments",
                    description: "For stubborn or recurring fissures, we offer Lateral Internal Sphincterotomy (LIS) to reduce pressure, Fissurectomy to remove damaged tissue, and other minimally invasive methods to shorten downtime and minimize pain."
                }
            ],

            benefitsHeading: "Recovery and Follow-Up Care",
            benefits: [
                "Specialist evaluation and accurate diagnosis",
                "Personalized treatment plan for each patient",
                "Regular monitoring during the healing period",
                "Guidance on hydration, diet, and bowel habits to prevent recurrence"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Anal Fissure",
            faqs: [
                {
                    question: "Do anal fissures always require surgery?",
                    answer: "No. Many heal with non-surgical methods if treated early."
                },
                {
                    question: "How long does recovery take?",
                    answer: "Most patients feel improvement in a few days, with complete healing in 2–4 weeks."
                },
                {
                    question: "Will surgery be painful?",
                    answer: "Modern, minimally invasive surgery greatly reduces post-operative discomfort."
                },
                {
                    question: "Is treatment covered under insurance?",
                    answer: "Yes. Stork Hospital works with multiple insurance providers and ensures cost clarity."
                }
            ],

            customCta: {
                heading: "Book Your Consultation Today",
                description: "If you are experiencing rectal pain, bleeding, or discomfort, book your appointment at Stork Hospital to see a colorectal specialist in Hyderabad and receive advanced, compassionate care in a private and comfortable environment.",
                buttonText: "Book Appointment Now"
            },
            meta: {
                duration: "20-30 Minutes",
                anesthesia: "Local / General",
                hospitalStay: "Day Care",
                recoveryTime: "1-2 Weeks",
                successRate: "98%"
            },
            reviewedBy: {
                name: "Dr. Satish Reddy",
                role: "Senior Proctologist",
                experience: "12+ Years Experience"
            }
        }
    }


    if (slug === "antepartum-monitoring") {
        return {
            slug: slug,
            title: "Antepartum and Intrapartum Monitoring – Stork Hospital, Hyderabad",
            subheading: "Precision Fetal & Maternal Surveillance for Safe Deliveries",
            breadcrumbTitle: "Fetal Monitoring",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Pregnancy and childbirth are dynamic journeys that require continuous observation to ensure the safety and health of both mother and baby. Antepartum monitoring refers to the assessment and tracking of maternal and fetal well-being before labor begins, while intrapartum monitoring takes place during labor, tracking real-time progress and identifying any emerging risks.

At Stork Hospital, Hyderabad, our vigilant antepartum and intrapartum monitoring systems help us stay one step ahead of complications, making sure every birth is as safe and smooth as possible—whether low-risk or high-risk. We are known for being one of the most trusted maternity hospitals in Hyderabad, offering patient-first care experiences and advanced treatment hospital with 24/7 care.`,

            overview: {
                heading: "Why Choose Stork Hospital for Monitoring Services in Hyderabad?",
                intro: "At Stork, we believe that good outcomes start with great observation. Our antepartum and intrapartum monitoring systems are designed to provide both clinical accuracy and emotional assurance.",
                items: [
                    "Expert Fetal Medicine & Obstetric Care Team",
                    "Advanced Monitoring Equipment (NST, CTG, Dopplers)",
                    "Round-the-Clock Surveillance for High-Risk Pregnancies",
                    "Real-Time Reporting and Immediate Action Protocols",
                    "Hospital with caring nursing staff and supportive infrastructure",
                    "Labor & Delivery Suite Linked with NICU and OT for Emergency Access"
                ]
            },
            fullDescription: [],

            conditionsHeading: "What Does Monitoring Help With?",
            conditionsTreated: [
                "Fetal growth restriction (IUGR)",
                "Preterm labor risks",
                "Gestational hypertension or preeclampsia",
                "Gestational diabetes and its impact on fetal health",
                "Decreased fetal movements",
                "Abnormal fetal heart rate patterns",
                "Uterine contractions and their efficiency during labor",
                "Cord entanglement or placental insufficiency",
                "Labor progression stalls or fetal distress"
            ],

            procedureHeading: "What to Expect at Stork Hospital",
            procedureSteps: [
                {
                    title: "Antepartum Monitoring (Before Labor)",
                    description: "Includes Non-Stress Test (NST) to measure fetal heart rate/movements, Ultrasound & Doppler Scans for growth/fluid checks, Biophysical Profile (BPP), and maternal vitals tracking. Emphasized in the third trimester."
                },
                {
                    title: "Intrapartum Monitoring (During Labor)",
                    description: "Continuous Electronic Fetal Monitoring (EFM) for heart rate patterns, Tocometry for contraction strength/frequency, frequent Cervical Assessments, and ongoing maternal vital signs monitoring to ensure safety."
                },
                {
                    title: "Real-Time Decision Making",
                    description: "Our team continually evaluates findings to adjust the birth plan instantly, ensuring the safest delivery method (vaginal or C-section) based on fetal and maternal well-being."
                }
            ],

            benefitsHeading: "Who Benefits from These Services?",
            benefits: [
                "Standard care for all pregnancies, especially in the final trimester",
                "High-risk pregnancies (twins, IVF, history of complications)",
                "Mothers with chronic conditions (diabetes, thyroid)",
                "Cases with abnormal scan results or reduced fetal activity",
                "Labor with prolonged duration or irregular contractions"
            ],

            risks: [],
            recoveryTimeline: [
                "Immediate Postpartum: Continuous observation of maternal vitals and uterine contraction patterns.",
                "Newborn Monitoring: Tracking vitals and breathing immediately after birth.",
                "Reassessment: Checking fetal health if any labor interventions were used.",
                "Follow-up: Scheduled scans and counseling based on delivery outcomes."
            ],

            faqHeading: "FAQs – Antepartum & Intrapartum Monitoring",
            faqs: [
                {
                    question: "Is fetal monitoring safe for my baby?",
                    answer: "Yes. Tests like NST and EFM are non-invasive and widely used to safely track your baby’s condition."
                },
                {
                    question: "Do I need monitoring if my pregnancy is low-risk?",
                    answer: "Absolutely. Routine monitoring helps confirm healthy fetal development and ensures early detection if anything changes."
                },
                {
                    question: "Will I be monitored continuously during labor?",
                    answer: "Depending on your case, we may use continuous or intermittent monitoring. High-risk cases typically require continuous observation."
                },
                {
                    question: "Can these tests predict how I will deliver?",
                    answer: "Monitoring helps us understand fetal well-being and labor progress, which in turn supports the safest delivery plan—vaginal or C-section."
                }
            ],

            customCta: {
                heading: "Book Your Consultation Today",
                description: "Book an appointment online at Stork Hospital to ensure your monitoring journey is tailored to your unique pregnancy needs. For diagnostic center in Hyderabad or 24/7 emergency care in Kondapur, trust the expertise of Stork Hospital.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Continuous",
                anesthesia: "Not Applicable",
                hospitalStay: "Varies",
                recoveryTime: "Immediate",
                successRate: "Early Detection"
            },
            reviewedBy: {
                name: "Dr. Neha Gupta",
                role: "Senior Obstetrician",
                experience: "14+ Years Experience"
            }
        }
    }


    if (slug === "appendicitis") {
        return {
            slug: slug,
            title: "Appendectomy – Appendix Removal Surgery at Stork Hospital, Hyderabad",
            subheading: "Swift Relief from Appendicitis with Advanced Surgical Expertise",
            breadcrumbTitle: "Appendectomy",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Appendicitis occurs when the appendix becomes inflamed, often resulting in sharp abdominal pain and potential health risks. At Stork Multispecialty Hospital, Hyderabad, we provide prompt and professional appendix removal surgery (appendectomy) to protect patients from further complications.

Our hospital is equipped to deliver emergency and planned appendectomies for both adults and children using modern surgical techniques.`,

            overview: {
                heading: "Why Stork Hospital for Appendix Surgery in Hyderabad?",
                intro: "At Stork, we ensure timely intervention supported by experienced surgeons and rapid diagnostics:",
                items: [
                    "Accomplished appendectomy surgeons in Hyderabad trained in both traditional and laparoscopic methods",
                    "24/7 emergency department for urgent cases",
                    "Walk-in consultation near Kondapur with priority admission support",
                    "Complete diagnostic setup including scans, blood work, and monitoring tools",
                    "Pediatric and adult care pathways",
                    "Recognized Hyderabad hospital accepting insurance for appendicitis surgeries"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Understanding Appendectomy",
            conditionsTreated: [
                "Sudden inflammation (acute appendicitis)",
                "Suspected or confirmed appendix rupture",
                "Repeat right lower abdominal pain episodes causing discomfort",
                "Prevention of serious issues like abscesses or peritonitis"
            ],

            procedureHeading: "What to Expect – Surgical Options & Patient Experience",
            procedureSteps: [
                {
                    title: "Evaluation & Diagnosis",
                    description: "Immediate or scheduled evaluation by a general surgeon in Hyderabad, followed by clinical and imaging tests for confirmation."
                },
                {
                    title: "Laparoscopic Appendectomy",
                    description: "Uses small incisions for less pain, quicker healing, and faster return to normal life. This is the preferred method for most patients."
                },
                {
                    title: "Open Appendectomy",
                    description: "Used in complex or ruptured appendix cases. A larger incision allows for thorough cleaning and treatment of infection."
                },
                {
                    title: "Recovery & Observation",
                    description: "General anesthesia is administered. Post-op rest and observation typically lasts for 24–48 hours in our dedicated care units."
                },
                {
                    title: "Discharge",
                    description: "Discharge with medications and a clear follow-up schedule. We offer zero waiting time hospital services for time-sensitive surgeries."
                }
            ],

            benefitsHeading: "What Makes Stork the Right Choice?",
            benefits: [
                "Rapid diagnosis and surgical response during emergencies",
                "Minimal pain and scarring with laparoscopic techniques",
                "Child-friendly and adult-focused surgical teams",
                "Dedicated pre-operative and post-operative care units",
                "Efficient and stress-free treatment journey"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Appendix Surgery at Stork",
            faqs: [
                {
                    question: "How quickly should appendicitis be treated?",
                    answer: "Immediately. Delaying surgery increases the risk of appendix rupture and serious infection."
                },
                {
                    question: "Is surgery painful or difficult to recover from?",
                    answer: "Surgery is safe and recovery is relatively fast, especially with minimally invasive methods."
                },
                {
                    question: "Are children safe during appendix surgery?",
                    answer: "Yes. Our pediatric surgical team ensures safe and comfortable care for children."
                },
                {
                    question: "Does insurance cover this procedure?",
                    answer: "Absolutely. As a Hyderabad hospital accepting insurance, we guide patients through the claim process seamlessly."
                }
            ],

            customCta: {
                heading: "Need Emergency Appendix Surgery?",
                description: "Don’t delay care if you have severe lower abdominal pain, nausea, or fever. Visit Stork Hospital to consult a trusted appendectomy specialist in Hyderabad and receive immediate attention from our surgical care team.",
                buttonText: "Book Consultation Today"
            },
            meta: {
                duration: "45-90 Minutes",
                anesthesia: "General Anesthesia",
                hospitalStay: "1-2 Days",
                recoveryTime: "1-2 Weeks",
                successRate: "99%"
            },
            reviewedBy: {
                name: "Dr. Vikram Reddy",
                role: "Senior General Surgeon",
                experience: "18+ Years Experience"
            }
        }
    }



    if (slug === "arthroscopy-surgery") {
        return {
            slug: slug,
            title: "Arthroscopy Surgery – Stork Hospital, Hyderabad",
            subheading: "Precision Joint Care with Minimal Invasiveness",
            breadcrumbTitle: "Arthroscopy",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Arthroscopy is a modern surgical method that allows doctors to look inside and treat a joint using tiny incisions and a camera called an arthroscope. The camera projects detailed images of the joint onto a screen, helping surgeons perform targeted repairs with minimal disruption to surrounding tissues. Because the approach is less invasive than traditional open surgery, patients typically experience faster recovery, smaller scars, and fewer complications.

At Stork Multispecialty Hospital, Hyderabad, our orthopedic surgeons perform arthroscopy on the knee, shoulder, hip, ankle, and elbow to address injuries, remove damaged tissue, and restore smooth, pain-free motion.`,

            overview: {
                heading: "Why Patients Trust Stork Hospital for Arthroscopy",
                intro: "",
                items: [
                    "Specialist orthopedic surgeons with expertise in sports medicine and joint repair",
                    "State-of-the-art diagnostic center in Hyderabad offering advanced MRI, ultrasound, and X-ray facilities",
                    "Advanced surgical center equipped with the latest arthroscopic technology",
                    "24/7 emergency hospital near Hitech City for accident and injury cases",
                    "Insurance accepted at Stork Hospital with upfront cost estimates",
                    "Walk-in clinic near Kondapur for immediate orthopedic evaluation",
                    "Comprehensive post-surgery rehabilitation tailored to each patient’s needs"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Conditions Commonly Treated with Arthroscopy",
            conditionsTreated: [
                "Meniscus or cartilage tears in the knee",
                "Torn or damaged ligaments (ACL, PCL, labrum)",
                "Rotator cuff injuries",
                "Removal of loose bone or cartilage fragments",
                "Synovitis (inflammation inside the joint)",
                "Joint stiffness and restricted range of motion",
                "Early management of arthritis-related joint changes"
            ],

            procedureHeading: "Our Step-by-Step Arthroscopy Approach",
            procedureSteps: [
                {
                    title: "Before the Procedure",
                    description: "Detailed orthopedic consultation and physical assessment. Imaging to identify the exact cause of joint problems. Discussion of surgical plan, recovery period, and outcome expectations."
                },
                {
                    title: "During the Procedure",
                    description: "Small cuts made around the joint area. Insertion of the arthroscope to visualize joint structures. Specialized tools used to trim, repair, or remove damaged tissue."
                },
                {
                    title: "After the Procedure",
                    description: "Minimal pain and swelling compared to open surgery. Faster mobility and return to light activities. Rehabilitation program to rebuild strength and restore flexibility."
                }
            ],

            benefitsHeading: "Your Recovery with Stork Hospital",
            benefits: [
                "Consultation with an orthopedic specialist",
                "Pre-operative diagnostics and planning",
                "Arthroscopic surgery using advanced equipment",
                "Short hospital stay — many patients go home the same day",
                "Structured physiotherapy for lasting joint health"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Arthroscopy Surgery",
            faqs: [
                {
                    question: "Does arthroscopy hurt?",
                    answer: "Pain is minimal, and most discomfort is well-controlled with medication."
                },
                {
                    question: "How soon can I resume daily activities?",
                    answer: "For many patients, recovery takes just a few weeks, though it depends on the joint treated."
                },
                {
                    question: "Can I walk after knee arthroscopy?",
                    answer: "Yes, walking is often possible within 24 hours after surgery."
                },
                {
                    question: "Is this procedure covered by insurance?",
                    answer: "Yes. Stork Hospital accepts a wide range of insurance providers and offers full cost transparency."
                }
            ],

            customCta: {
                heading: "Book Your Arthroscopy Appointment",
                description: "If joint pain or stiffness is limiting your mobility, expert help is available. Book an appointment at Stork Hospital to meet an arthroscopy surgery specialist in Hyderabad and get a customized treatment plan for faster, safer recovery.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "60-90 Minutes",
                anesthesia: "General / Regional",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "2-4 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rajeshwar Rao",
                role: "Senior Orthopedic Surgeon",
                experience: "20+ Years Experience"
            }

        }

    }

    if (slug === "back-pain") {
        return {
            slug: slug,
            title: "Back Pain Treatment – Stork Hospital, Hyderabad",
            subheading: "Expert Spinal Care to Restore Strength and Mobility",
            breadcrumbTitle: "Back Pain",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Back pain can significantly interfere with daily life, from routine movement to restful sleep. Whether it’s the result of muscle fatigue, spinal issues, injuries, or prolonged sitting, chronic or acute back pain needs expert attention. At Stork Hospital, Hyderabad, we provide cutting-edge, patient-centric care that addresses the source of the problem—not just the symptoms.

Our specialists are known for advanced, non-invasive and minimally invasive back pain treatment in Hyderabad, with the goal of long-term recovery and prevention.`,

            overview: {
                heading: "Why Stork Hospital for Back & Spine Care?",
                intro: "At Stork Hospital, every treatment plan begins with an in-depth clinical evaluation and advanced imaging (MRI, CT, or X-ray) to pinpoint the origin of your discomfort.",
                items: [
                    "Multidisciplinary team of orthopedic doctors, physiatrists, and pain consultants",
                    "Precision-guided diagnosis and customized rehabilitation programs",
                    "Access to modern physiotherapy and recovery equipment under one roof",
                    "Focused education for patients to maintain lifelong spinal health",
                    "Recognized for reliable back pain relief in Hyderabad"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Root Causes of Back Pain",
            conditionsTreated: [
                "Overstressed or strained back muscles",
                "Herniated or slipped spinal discs pressing on nerves",
                "Degeneration of spinal discs over time",
                "Spinal stenosis causing nerve compression",
                "Imbalanced posture and prolonged desk work",
                "Fragile bones due to osteoporosis",
                "Accidents, falls, or repetitive sports injuries"
            ],

            procedureHeading: "How We Diagnose & Treat Back Pain",
            procedureSteps: [
                {
                    title: "Non-Surgical Therapies",
                    description: "Custom physiotherapy programs, medications for pain/inflammation, image-guided corticosteroid injections, and supportive techniques like heat therapy, TENS, and ultrasound. Includes ergonomic coaching."
                },
                {
                    title: "Minimally Invasive Spine Procedures",
                    description: "Selective nerve root or facet joint blocks, Radiofrequency procedures to deactivate painful nerves, and Endoscopic procedures for disc decompression. Targeted interventions with shorter downtime."
                },
                {
                    title: "Surgical Intervention",
                    description: "Surgery is only considered when structural problems severely impair mobility or cause persistent neurological symptoms."
                }
            ],

            benefitsHeading: "Recovery Journey & Preventative Planning",
            benefits: [
                "Many patients report improvements within just a few therapy sessions",
                "Strengthening exercises and guided stretching help prevent recurrence",
                "Progress is monitored closely for lasting outcomes",
                "Diet, physical habits, and work ergonomics are factored into your care plan"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "Common Questions Answered",
            faqs: [
                {
                    question: "Can back pain be resolved without surgery?",
                    answer: "Yes. Most patients respond well to conservative and targeted treatments."
                },
                {
                    question: "When should I visit a spine specialist?",
                    answer: "If the pain lasts more than a few days, or if there’s numbness, tingling, or weakness in your limbs, seek expert care."
                },
                {
                    question: "How important is posture?",
                    answer: "Correct posture reduces unnecessary spinal strain and prevents chronic pain."
                },
                {
                    question: "How long does recovery take?",
                    answer: "Depending on the condition, improvement may be seen in as little as 2 to 4 weeks."
                }
            ],

            customCta: {
                heading: "Don't let back pain limit your lifestyle",
                description: "Choose Stork Hospital, Hyderabad for proven spine care solutions tailored to your needs. Schedule a consultation and take your first step toward pain-free living.",
                buttonText: "Schedule Consultation"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Local",
                hospitalStay: "Outpatient",
                recoveryTime: "2-4 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Arun Kumar",
                role: "Senior Spine Specialist",
                experience: "15+ Years Experience"
            }

        }

    }

    if (slug === "balanitis") {
        return {
            slug: slug,
            title: "Balanitis Treatment – Stork Hospital, Hyderabad",
            subheading: "Specialised Care for Inflammation of the Glans Penis",
            breadcrumbTitle: "Balanitis",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Balanitis refers to swelling and irritation of the glans (head) of the penis, and in many cases, it can also involve the foreskin. The condition often presents with redness, tenderness, and discomfort, and in some cases, difficulty passing urine or engaging in sexual activity. While balanitis is more common among uncircumcised men, it can affect individuals of any age.

At Stork Multispecialty Hospital, Hyderabad, our urology team offers discreet, respectful, and results-driven care for balanitis. We focus not only on easing symptoms but also on identifying the underlying cause to prevent future episodes.`,

            overview: {
                heading: "Why Men Choose Stork Hospital for Balanitis Treatment",
                intro: "",
                items: [
                    "Experienced urologists with a focus on male genital health and infections",
                    "Modern diagnostic center in Hyderabad offering lab tests, swabs, and urine analysis for accurate identification of the cause",
                    "Advanced surgical center for cases that require minor corrective procedures",
                    "24/7 emergency hospital near Hitech City for severe swelling, infection, or pain",
                    "Insurance accepted at Stork Hospital where applicable",
                    "Walk-in clinic near Kondapur for private consultations without long wait times",
                    "Holistic treatment approach that combines medical therapy, hygiene guidance, and preventive strategies"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Common Causes of Balanitis",
            conditionsTreated: [
                "Inadequate cleaning under the foreskin, leading to bacterial or fungal overgrowth",
                "Yeast infections (Candida) — a leading cause, especially in diabetics",
                "Allergic or irritant reactions to soaps, detergents, latex, or lubricants",
                "Sexually transmitted infections (STIs) such as herpes or gonorrhoea",
                "Skin conditions including psoriasis, eczema, or lichen sclerosus",
                "Elevated blood sugar levels, which promote infections"
            ],

            procedureHeading: "Balanitis Treatment at Stork Hospital",
            procedureSteps: [
                {
                    title: "Medical Management",
                    description: "Prescription antifungal creams or oral medications for yeast infections, antibiotics for bacterial causes, topical steroid creams to control inflammation, and antihistamines for allergic triggers."
                },
                {
                    title: "Lifestyle & Hygiene Care",
                    description: "Gentle washing with warm water — avoiding harsh soaps and perfumed cleansers. Keeping the foreskin clean and dry. Strict blood sugar control for diabetic patients."
                },
                {
                    title: "Surgical Solutions",
                    description: "In recurring or severe cases: Circumcision (removes the foreskin to eliminate the area where infections persist) or Preputioplasty (a foreskin-preserving alternative for select patients)."
                }
            ],

            benefitsHeading: "Recovery and Long-Term Prevention",
            benefits: [
                "Most cases clear within 5–7 days with appropriate treatment",
                "Consistent hygiene practices are crucial for preventing recurrence",
                "Completing the full course of prescribed medication ensures complete recovery",
                "Periodic check-ups for men with recurrent infections or underlying health issues"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Balanitis",
            faqs: [
                {
                    question: "Is balanitis sexually transmitted?",
                    answer: "Not always. While STIs can cause balanitis, many cases are due to poor hygiene or non-infectious skin conditions."
                },
                {
                    question: "Can balanitis resolve without treatment?",
                    answer: "Mild cases may improve with better hygiene, but medical treatment speeds up healing and prevents complications."
                },
                {
                    question: "Does circumcision eliminate the risk?",
                    answer: "It significantly reduces the likelihood of recurrent balanitis, especially in men prone to infections."
                },
                {
                    question: "Is it a sign of cancer?",
                    answer: "Balanitis itself is not cancer, but untreated, chronic inflammation can lead to other complications, so prompt care is important."
                }
            ],

            customCta: {
                heading: "Book a Private Consultation for Balanitis",
                description: "If you are experiencing redness, swelling, or discomfort in the penis, schedule a confidential appointment at Stork Hospital to meet a specialist urologist in Hyderabad for expert diagnosis and safe, effective treatment",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "15-30 Minutes",
                anesthesia: "None",
                hospitalStay: "Outpatient",
                recoveryTime: "5-7 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Narender Kumar",
                role: "Senior Urologist",
                experience: "12+ Years Experience"

            }
        }

    }

    if (slug === "balanoposthitis") {
        return {
            slug: slug,
            title: "Balanoposthitis Treatment – Stork Hospital, Hyderabad",
            subheading: "Specialised Care for Inflammation of the Glans and Foreskin",
            breadcrumbTitle: "Balanoposthitis",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Balanoposthitis is a condition where both the glans (head) of the penis and the foreskin become inflamed. It is often seen in uncircumcised men and can result in pain, swelling, redness, and difficulty retracting the foreskin. The condition can be caused by infections, allergies, skin disorders, or poor hygiene.

At Stork Multispecialty Hospital, Hyderabad, we provide discreet, respectful, and comprehensive treatment for balanoposthitis — aiming to relieve symptoms quickly while addressing the root cause to prevent recurrence.`,

            overview: {
                heading: "Why Choose Stork Hospital for Balanoposthitis Care",
                intro: "",
                items: [
                    "Experienced urologists skilled in diagnosing and managing foreskin and penile conditions",
                    "Diagnostic center in Hyderabad with advanced lab and imaging facilities for accurate cause detection",
                    "Advanced surgical center for cases requiring circumcision or corrective procedures",
                    "24/7 emergency hospital near Hitech City for severe pain or infection",
                    "Insurance accepted at Stork Hospital for eligible treatments",
                    "Walk-in clinic near Kondapur for confidential same-day consultations",
                    "Preventive care advice to reduce chances of future flare-ups"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Causes of Balanoposthitis",
            conditionsTreated: [
                "Poor genital hygiene leading to bacterial or fungal growth",
                "Yeast infections (Candida), common in diabetic patients",
                "Sexually transmitted infections (STIs)",
                "Allergic reactions to soaps, detergents, lubricants, or latex condoms",
                "Chronic skin disorders such as eczema, psoriasis, or lichen sclerosus",
                "Tight foreskin (phimosis) preventing adequate cleaning"
            ],

            procedureHeading: "Treatment Options at Stork Hospital",
            procedureSteps: [
                {
                    title: "Medical Management",
                    description: "Antifungal or antibiotic creams depending on the infection. Mild steroid creams to reduce inflammation. Antihistamines for allergic reactions."
                },
                {
                    title: "Lifestyle and Hygiene Measures",
                    description: "Gentle daily cleaning with warm water, avoiding harsh soaps. Managing underlying conditions such as diabetes. Avoiding known irritants like scented products or chemical cleansers."
                },
                {
                    title: "Surgical Solutions",
                    description: "For recurrent or severe cases: Circumcision to remove the foreskin and prevent recurring inflammation, or Preputioplasty as a foreskin-preserving alternative."
                }
            ],

            benefitsHeading: "Recovery and Aftercare",
            benefits: [
                "Most patients improve within 5–10 days of treatment",
                "Maintain proper hygiene and keep the area dry",
                "Complete all prescribed medications to prevent recurrence",
                "Follow-up visits for chronic or severe cases"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Balanoposthitis",
            faqs: [
                {
                    question: "Is balanoposthitis contagious?",
                    answer: "It can be if caused by infections such as yeast or STIs, but not all cases are contagious."
                },
                {
                    question: "Can it be cured without surgery?",
                    answer: "Yes, most cases respond well to medication and improved hygiene. Surgery is only for recurrent or severe cases."
                },
                {
                    question: "Does circumcision prevent balanoposthitis?",
                    answer: "Yes, it greatly reduces the risk of recurrence."
                },
                {
                    question: "Is it dangerous if left untreated?",
                    answer: "Chronic balanoposthitis can lead to scarring, narrowing of the foreskin, and urinary problems."
                }
            ],

            customCta: {
                heading: "Book Your Balanoposthitis Consultation",
                description: "If you have redness, swelling, or difficulty retracting the foreskin, book an appointment at Stork Hospital to meet a specialist urologist in Hyderabad for prompt diagnosis and effective treatment.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "15-30 Minutes",
                anesthesia: "None",
                hospitalStay: "Outpatient",
                recoveryTime: "5-10 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Narender Kumar",
                role: "Senior Urologist",
                experience: "12+ Years Experience"
            }
        }
    }

    if (slug === "bariatric-surgery") {
        return {
            slug: slug,
            title: "Weight Loss & Bariatric Surgery – Stork Hospital, Hyderabad",
            subheading: "Achieve Lasting Health Through Safe Surgical Weight Loss",
            breadcrumbTitle: "Bariatric Surgery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `For many individuals struggling with obesity, sustained weight loss through diet and exercise alone may be difficult or ineffective. At Stork Multispecialty Hospital, Hyderabad, we offer advanced bariatric surgery solutions that support your transformation journey—physically, emotionally, and medically.

Our focus goes beyond weight loss. We aim to reverse obesity-linked health issues and enhance your overall quality of life through structured, safe, and supportive care.`,

            overview: {
                heading: "Why Stork Hospital for Bariatric Surgery in Hyderabad?",
                intro: "At Stork, you receive world-class treatment paired with compassionate guidance, every step of the way.",
                items: [
                    "Highly trained bariatric and metabolic surgeons in Hyderabad with years of laparoscopic expertise",
                    "Pre-operative assessments and psychological counseling",
                    "Modern, minimally invasive surgical techniques for reduced recovery time",
                    "Integrated care with endocrinologists, dietitians, and physiotherapists",
                    "Walk-in consultations near Kondapur and quick scheduling",
                    "Recognized as a Hyderabad hospital accepting insurance for bariatric and related services",
                    "We’re proud to offer affordable weight loss surgery packages in Hyderabad designed with transparency and patient care in mind"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Conditions Treated & Health Benefits",
            conditionsTreated: [
                "Severe Obesity (BMI > 40, or > 35 with complications)",
                "Type 2 Diabetes Mellitus (T2DM)",
                "Hypertension (High Blood Pressure)",
                "Sleep Apnea and Respiratory Issues",
                "Polycystic Ovary Syndrome (PCOS) and Infertility",
                "Orthopedic complications and Joint Pain"
            ],

            procedureHeading: "Our Surgical Weight Loss Options",
            procedureSteps: [
                {
                    title: "Sleeve Gastrectomy",
                    description: "Removes part of the stomach to limit intake and reduce hunger hormones. A common restrictive procedure."
                },
                {
                    title: "Gastric Bypass (Roux-en-Y)",
                    description: "Alters food pathway to decrease absorption and curb appetite. Often considered the gold standard for weight loss."
                },
                {
                    title: "Mini Gastric Bypass",
                    description: "A simplified version of the gastric bypass with similar weight loss benefits and fewer risks for select patients."
                },
                {
                    title: "Revisional Surgery",
                    description: "For patients needing adjustments or corrections from prior weight loss surgeries to improve outcomes."
                }
            ],

            benefitsHeading: "Benefits You Can Expect from Bariatric Surgery",
            benefits: [
                "Effective weight loss and better weight maintenance compared to diet alone",
                "Improvement or resolution of diabetes, high blood pressure, PCOS, and sleep apnea",
                "Less pressure on joints, reducing orthopedic complications and pain",
                "Increased self-confidence, stamina, and overall mood",
                "We also provide lifelong care through post-surgery weight management programs"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Bariatric Services at Stork Hospital",
            faqs: [
                {
                    question: "Am I a good candidate for bariatric surgery?",
                    answer: "You may qualify if you have a BMI over 40, or over 35 with associated health problems. Our team performs a full evaluation."
                },
                {
                    question: "How safe is the procedure?",
                    answer: "With an experienced surgical team and modern equipment, bariatric surgery is a low-risk, high-reward intervention for many patients."
                },
                {
                    question: "Will I need to follow a special diet after surgery?",
                    answer: "Yes. Our dietitian will guide you through each stage—liquid, soft food, and then healthy solids—to ensure optimal healing and weight loss."
                },
                {
                    question: "Does my insurance cover weight loss surgery?",
                    answer: "We are among the top hospitals in Hyderabad accepting insurance, and we help patients understand and access their benefits."
                }
            ],

            customCta: {
                heading: "Take the First Step Toward Better Health",
                description: "You don’t have to battle obesity alone. Schedule your consultation at Stork Hospital and meet a skilled bariatric surgeon in Hyderabad who will guide you toward safe, effective weight loss and a healthier future.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "1-2 Hours",
                anesthesia: "General Anesthesia",
                hospitalStay: "2-3 Days",
                recoveryTime: "2-4 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. V. N. Reddy",
                role: "Senior Bariatric Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "cancer-care") {
        return {
            slug: slug,
            title: "Cancer Care – Stork Hospital, Hyderabad",
            subheading: "What is Cancer Care in Women’s Health?",
            breadcrumbTitle: "Cancer Care",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Women face a unique set of cancer risks throughout their lives—from cervical and breast cancer to ovarian and uterine malignancies. At Stork Hospital, Hyderabad, our cancer care services focus on early detection, precision diagnosis, and compassionate treatment designed exclusively for women. We ensure that patients not only receive timely care but also feel supported every step of the way.

As a multispecialty hospital in Telangana, Stork offers end-to-end diagnostic and surgical oncology services, backed by an experienced team and state-of-the-art infrastructure.`,

            overview: {
                heading: "Why Choose Stork Hospital for Women’s Cancer Care in Hyderabad?",
                intro: "Stork Hospital is trusted by women across Hyderabad for our expertise in gynecologic health and early cancer detection. Here’s what sets us apart:",
                items: [
                    "NABH-accredited hospital with in-house diagnostics",
                    "Senior OB-GYNs and surgical specialists",
                    "Focus on minimally invasive and uterus-sparing surgeries when possible",
                    "Dedicated women’s care units for privacy and comfort",
                    "Affordable treatment packages and insurance coverage support",
                    "Option to book appointments online at Stork Hospital"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Who Should Prioritize Cancer Screening?",
            conditionsTreated: [
                "Women aged 21+ (for Pap smears and HPV tests)",
                "Women aged 40+ (for breast exams and mammograms)",
                "Those with family history of cancer",
                "Patients with genetic predispositions (e.g., BRCA mutation)",
                "Individuals with PCOS, endometriosis, or chronic inflammation"
            ],

            procedureHeading: "What to Expect at Stork Hospital",
            procedureSteps: [
                {
                    title: "Screening & Diagnosis",
                    description: "Pap smears and HPV testing, Breast exams, ultrasound, and mammography referrals, Transvaginal scans and pelvic assessments, Biopsy and histopathology evaluation, Genetic counselling and risk profiling."
                },
                {
                    title: "Treatment & Surgical Options",
                    description: "Cervical or uterine polyp removal, Hysterectomy for early-stage cancers, Referral-based oncologic surgery and chemotherapy, Post-surgical recovery support."
                },
                {
                    title: "Follow-Up & Ongoing Care",
                    description: "Recurrence monitoring through scans and tests, Emotional health and survivorship counselling, Nutritional support and physiotherapy."
                }
            ],

            benefitsHeading: "When is Cancer Screening or Treatment Needed?",
            benefits: [
                "Abnormal Pap smears or cervical cell changes",
                "Breast lumps, discharge, or pain",
                "Irregular vaginal bleeding or pelvic pain",
                "Family history of gynecologic or breast cancer",
                "Postmenopausal bleeding or bloating",
                "Suspicious imaging or biopsy findings"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Cancer Care at Stork Hospital",
            faqs: [
                {
                    question: "Should I get screened even without symptoms?",
                    answer: "Yes. Routine screenings like Pap smears and breast exams help detect changes before symptoms appear."
                },
                {
                    question: "What happens if my Pap smear is abnormal?",
                    answer: "We’ll guide you through follow-up tests like colposcopy or biopsy and provide a tailored treatment plan."
                },
                {
                    question: "Is surgery always required for gynecologic cancer?",
                    answer: "Not always. Some cases are managed with surveillance, medication, or referral-based oncology treatments."
                },
                {
                    question: "Does insurance cover screenings and treatments?",
                    answer: "Yes. We accept major providers and also offer maternity packages with cancer screening add-ons."
                }
            ],

            customCta: {
                heading: "Take the First Step Toward Better Health",
                description: "If you're looking for trusted, early-stage cancer screening or treatment, book an appointment at Stork Hospital—a place where patient-first care meets advanced women’s oncology in Hyderabad.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None or General",
                hospitalStay: "Varies",
                recoveryTime: "Varies",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Sujatha Chelluri",
                role: "Senior Gyneocologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "chronic-disease-management") {
        return {
            slug: slug,
            title: "Chronic Disease Management – Stork Hospital, Hyderabad",
            subheading: "Long-Term, Personalized Care for Lasting Health",
            breadcrumbTitle: "Chronic Disease Management",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Chronic diseases are medical conditions that persist for months or years, often requiring regular treatment and monitoring. While some can be controlled with lifestyle changes alone, others need a combination of medications, routine check-ups, and specialist care. Examples include diabetes, heart disease, asthma, arthritis, kidney disorders, and endocrine problems.

At Stork Multispecialty Hospital, Hyderabad, we design chronic care programs around each patient’s individual needs. Our specialists combine accurate diagnostics, ongoing treatment, and lifestyle guidance to help you manage symptoms, avoid complications, and improve your quality of life.`,

            overview: {
                heading: "Why Patients Trust Stork Hospital for Chronic Disease Care",
                intro: "We provide comprehensive, long-term care focused on stability and quality of life.",
                items: [
                    "Highly skilled doctors in internal medicine, cardiology, pulmonology, endocrinology, and more",
                    "Fully equipped diagnostic center in Hyderabad for timely investigations and monitoring",
                    "Advanced surgical center for chronic conditions that require operative management",
                    "24/7 emergency hospital near Hitech City for sudden health flare-ups",
                    "Insurance accepted at Stork Hospital with cost clarity before starting treatment",
                    "Fast access through same-day appointments and a walk-in clinic near Kondapur",
                    "Coordinated care teams including dietitians, physiotherapists, and mental health experts"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Conditions We Commonly Manage",
            conditionsTreated: [
                "Heart and vascular problems – hypertension, heart failure, coronary artery disease",
                "Hormonal and metabolic disorders – diabetes, thyroid problems, adrenal gland issues",
                "Chronic respiratory illnesses – COPD, asthma",
                "Kidney conditions – chronic kidney disease, post-dialysis follow-up",
                "Bone and joint disorders – arthritis, osteoporosis",
                "Neurological problems – epilepsy, stroke recovery, Parkinson’s disease",
                "Autoimmune disorders – lupus, rheumatoid arthritis"
            ],

            procedureHeading: "Our Approach to Long-Term Management",
            procedureSteps: [
                {
                    title: "Initial Assessment",
                    description: "In-depth consultation and review of medical history, Blood tests, imaging, and other diagnostic tools for baseline health evaluation, Lifestyle and risk factor assessment."
                },
                {
                    title: "Treatment & Monitoring",
                    description: "Customized medication schedules, Dietary advice and exercise planning tailored to your condition, Vaccinations and preventive screenings, Education on recognizing early warning signs."
                },
                {
                    title: "Team-Based Care",
                    description: "Seamless referrals to multiple specialties when needed, Holistic support for both physical and mental well-being."
                }
            ],

            benefitsHeading: "Your Care Process at Stork Hospital",
            benefits: [
                "First consultation with a specialist",
                "Creation of a personalized care plan",
                "Regular monitoring and scheduled check-ups",
                "Adjustments to treatment based on progress",
                "Ongoing support to reduce disease progression"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Chronic Disease Management",
            faqs: [
                {
                    question: "Can long-term conditions be reversed?",
                    answer: "Some can be resolved completely, but many are managed over time to control symptoms and avoid complications."
                },
                {
                    question: "How often should I visit the doctor for chronic disease follow-up?",
                    answer: "Frequency depends on your condition and treatment plan, but regular visits are essential."
                },
                {
                    question: "Can lifestyle changes help reduce medication use?",
                    answer: "Yes. For certain conditions, healthy lifestyle habits may lower medication needs or improve results."
                },
                {
                    question: "Is this care covered by insurance?",
                    answer: "Yes. Stork Hospital accepts leading insurance plans and provides cost transparency."
                }
            ],

            customCta: {
                heading: "Book Your Chronic Disease Consultation",
                description: "Don’t let a long-term health condition control your life. Book an appointment at Stork Hospital to meet with our chronic disease management experts in Hyderabad and get the personalized care you need for a healthier future.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "Ongoing",
                anesthesia: "None",
                hospitalStay: "Outpatient / Inpatient",
                recoveryTime: "Varies",
                successRate: "High Control Rate"
            },
            reviewedBy: {
                name: "Dr. Srikanth Goud",
                role: "Senior General Physician",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "circumcision") {
        return {
            slug: slug,
            title: "Circumcision – Stork Hospital, Hyderabad",
            subheading: "Modern, Safe, and Comfortable Circumcision for Children and Adults",
            breadcrumbTitle: "Circumcision",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Circumcision is a surgical process where the foreskin (the fold of skin covering the head of the penis) is removed. It is carried out for different reasons — including medical conditions like phimosis, chronic infections, or hygiene concerns, as well as religious or cultural traditions.

At Stork Multispecialty Hospital, Hyderabad, we perform circumcision using advanced surgical and laser techniques that prioritize patient safety, minimize discomfort, and promote faster healing. Our team is skilled in treating both infants and adults, offering personalized care from consultation to recovery.`,

            overview: {
                heading: "Why Stork Hospital is the Preferred Choice",
                intro: "We offer advanced techniques for minimal discomfort and faster recovery.",
                items: [
                    "Experienced urologists and pediatric surgeons with a high success rate",
                    "Comprehensive diagnostic center in Hyderabad for pre-procedure checks",
                    "Advanced surgical center with laser and stapler circumcision technology",
                    "24/7 emergency hospital near Hitech City for urgent medical needs",
                    "Insurance accepted at Stork Hospital with complete billing transparency",
                    "Walk-in clinic near Kondapur for quick access to consultations",
                    "Detailed aftercare guidance to ensure a smooth recovery"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Medical Indications for Circumcision",
            conditionsTreated: [
                "Phimosis – inability to retract the foreskin",
                "Paraphimosis – foreskin stuck behind the glans, causing swelling",
                "Frequent urinary tract infections (UTIs)",
                "Chronic inflammation (balanitis)",
                "Preventive measure for better penile hygiene and reduced infection risk"
            ],

            procedureHeading: "Circumcision Methods at Stork Hospital",
            procedureSteps: [
                {
                    title: "Traditional surgical circumcision",
                    description: "Safe, precise removal of foreskin with sutures."
                },
                {
                    title: "Laser circumcision",
                    description: "Minimal bleeding, quick healing, and reduced swelling."
                },
                {
                    title: "Stapler circumcision",
                    description: "Advanced device-based procedure ensuring uniform results and less discomfort."
                }
            ],

            benefitsHeading: "Recovery and Aftercare Steps",
            benefits: [
                "Complete evaluation and informed consent before surgery",
                "Local or general anesthesia for a painless experience",
                "Post-procedure dressing and hygiene instructions",
                "Pain relief and infection prevention medications",
                "Follow-up appointments to check wound healing"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Circumcision",
            faqs: [
                {
                    question: "Does the procedure hurt?",
                    answer: "With anesthesia, the surgery is painless, and post-surgical discomfort is minimal and manageable."
                },
                {
                    question: "When will I recover fully?",
                    answer: "Children typically heal within a week, while adults may require 7–10 days."
                },
                {
                    question: "Is circumcision safe for adults?",
                    answer: "Yes, it can be done at any age with excellent safety outcomes."
                },
                {
                    question: "Will insurance cover the cost?",
                    answer: "If the procedure is done for medical necessity, Stork Hospital accepts most insurance plans."
                }
            ],

            customCta: {
                heading: "Book Your Circumcision Consultation",
                description: "For safe and advanced circumcision services, book an appointment at Stork Hospital to meet a urologist in Hyderabad and discuss the best surgical option for you or your child.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "30-45 Minutes",
                anesthesia: "Local or General",
                hospitalStay: "Day Care / Outpatient",
                recoveryTime: "1 Week",
                successRate: "Very High"
            },
            reviewedBy: {
                name: "Dr. Narender Kumar",
                role: "Senior Urologist",
                experience: "12+ Years Experience"
            }
        }
    }

    if (slug === "av-fistula") {
        return {
            slug: slug,
            title: "AV Fistula Surgery – Stork Hospital, Hyderabad",
            subheading: "Trusted Vascular Access for Long-Term Dialysis Success",
            breadcrumbTitle: "AV Fistula",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `An AV (arteriovenous) fistula is a surgical connection created between an artery and a vein, most commonly in the forearm or upper arm. It’s the gold-standard access for patients who require regular hemodialysis due to chronic kidney disease. At Stork Multispecialty Hospital, Hyderabad, we specialize in AV fistula creation surgeries that ensure strong, durable, and safe vascular access.

Our skilled vascular and nephrology teams collaborate to provide effective solutions that support uninterrupted dialysis care.`,

            overview: {
                heading: "Why Stork Hospital is Preferred for AV Fistula Surgery in Hyderabad",
                intro: "We focus on delivering expert care with minimal risk and long-term results:",
                items: [
                    "Board-certified vascular surgeons in Hyderabad with extensive experience in AV access creation",
                    "Pre-surgical evaluations and vein mapping for personalized planning",
                    "Walk-in vascular evaluations near Kondapur for quick access to specialists",
                    "State-of-the-art diagnostic tools including Doppler and imaging support",
                    "Comfortable surgical experience under local or regional anesthesia",
                    "Post-op care integrated with your dialysis schedule",
                    "Easy insurance handling from a trusted Hyderabad hospital accepting insurance"
                ]
            },
            fullDescription: [],

            conditionsHeading: "What is an AV Fistula and Why It’s Important",
            conditionsTreated: [
                "Allows repeated needle insertions during dialysis without damaging veins",
                "Increased blood flow ensures veins grow stronger for better outcomes",
                "Reliable and long-lasting access",
                "Reduced chances of clot formation",
                "Lower risk of infection compared to temporary catheters",
                "Higher efficiency in blood filtration during dialysis"
            ],

            procedureHeading: "Types of AV Access Options & Care Pathway",
            procedureSteps: [
                {
                    title: "Radiocephalic Fistula",
                    description: "Created near the wrist; ideal for early-stage dialysis patients."
                },
                {
                    title: "Brachiocephalic Fistula",
                    description: "Formed near the elbow for stronger blood flow."
                },
                {
                    title: "AV Grafts",
                    description: "Used when natural veins aren’t suitable, made with a synthetic tube. Our vascular surgeon will select the best access based on your anatomy."
                },
                {
                    title: "Step-by-Step Care Pathway",
                    description: "1. Meet with a vascular access expert in Hyderabad. 2. Ultrasound and vein analysis. 3. Surgery under anesthesia (1–2 hours). 4. Monitoring and same-day discharge. 5. Maturation period (4-6 weeks) before use."
                }
            ],

            benefitsHeading: "Why Patients Trust Stork for AV Fistula Surgery",
            benefits: [
                "Advanced vein mapping and assessment techniques",
                "High rates of fistula maturity and durability",
                "Thorough post-op education and access maintenance support",
                "Comprehensive kidney care under one roof",
                "Coordinated care between surgery, nephrology, and dialysis"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – AV Fistula Creation at Stork Hospital",
            faqs: [
                {
                    question: "Can I start dialysis immediately after surgery?",
                    answer: "Not usually. The fistula needs 4–6 weeks to mature before use."
                },
                {
                    question: "What if my veins are too narrow or weak?",
                    answer: "We may consider AV grafts or alternative access techniques based on your vascular condition."
                },
                {
                    question: "How long does an AV fistula last?",
                    answer: "With good care, it can last for many years—often longer than other access methods."
                },
                {
                    question: "Is this surgery covered under insurance?",
                    answer: "Yes, and as a Hyderabad hospital accepting insurance, we assist with claim filing and approvals."
                }
            ],

            customCta: {
                heading: "Book Your AV Fistula Evaluation Today",
                description: "If you’re beginning dialysis or need to replace your current access, schedule a consultation with an AV fistula specialist in Hyderabad at Stork Hospital. We’ll help you receive safe, long-lasting vascular access with complete care at every stage.",
                buttonText: "Schedule Consultation"
            },
            meta: {
                duration: "60-90 Minutes",
                anesthesia: "Local / Regional",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "2-4 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Srinivas Rao",
                role: "Senior Vascular Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "breast-lump-surgery") {
        return {
            slug: slug,
            title: "Breast Lump Diagnosis & Surgical Care – Stork Hospital, Hyderabad",
            subheading: "Thorough Evaluation and Tailored Solutions for Breast Lumps",
            breadcrumbTitle: "Breast Lump",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Discovering a lump in the breast can trigger concern—but with timely, expert care, most lumps are found to be non-cancerous and fully treatable. At Stork Multispecialty Hospital, Hyderabad, we provide individualized, end-to-end breast lump diagnosis and surgical care designed to relieve anxiety and restore peace of mind.

From clinical breast exams to advanced imaging and surgical excision, our goal is early detection, comfort, and clarity at every step.`,

            overview: {
                heading: "Why Women Choose Stork Hospital for Breast Lump Treatment in Hyderabad",
                intro: "We combine advanced facilities, skilled professionals, and women-centered sensitivity:",
                items: [
                    "Highly experienced female breast surgeons and consultants in Hyderabad handling both benign and malignant conditions",
                    "Modern diagnostics like 3D mammograms, high-frequency ultrasounds, and in-clinic needle biopsies",
                    "Walk-in breast health assessments near Kondapur—no long waits, no delays",
                    "Private and dignified consultations designed for women’s comfort",
                    "Recognized as a trusted Hyderabad hospital accepting insurance for lump evaluations and surgical procedures"
                ]
            },
            fullDescription: [],

            conditionsHeading: "What Causes a Breast Lump?",
            conditionsTreated: [
                "Fibroadenomas – smooth, rubbery, benign growths often in younger women",
                "Cysts – fluid-filled sacs often linked to hormonal changes",
                "Lipomas – slow-growing fat-based masses",
                "Inflammatory lumps from mastitis or blocked ducts",
                "Hormonal swelling during menstrual cycle or pregnancy",
                "Cancerous tumors (less common but serious)"
            ],

            procedureHeading: "Diagnostic Process and Surgical Treatment Options",
            procedureSteps: [
                {
                    title: "Physical Evaluation",
                    description: "Physical breast evaluations by female clinicians trained in early detection."
                },
                {
                    title: "Imaging & Biopsy",
                    description: "Same-day imaging using ultrasound and mammography. FNAC (Fine Needle Aspiration) or Tru-Cut biopsy when necessary."
                },
                {
                    title: "Surgical Treatment",
                    description: "Outpatient surgery for non-cancerous lumps with cosmetic closure. Seamless transition to oncology services if cancer is suspected."
                }
            ],

            benefitsHeading: "Advantages of Choosing Stork for Breast Lump Management",
            benefits: [
                "Full suite of diagnostics and surgical services under one roof",
                "Cosmetic-focused surgeries with short healing time",
                "Minimal scarring with attention to breast aesthetics",
                "Focus on long-term breast health and patient education",
                "Top-rated multispecialty hospital for women in Hyderabad"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "Common Questions About Breast Lumps",
            faqs: [
                {
                    question: "Should I be worried if I find a lump?",
                    answer: "Not necessarily. Most breast lumps are non-cancerous. But medical review is crucial."
                },
                {
                    question: "Is the procedure invasive or painful?",
                    answer: "Most removals are quick and minimally invasive with local anesthesia."
                },
                {
                    question: "Can I get my tests and surgery done in one hospital?",
                    answer: "Yes. We offer one-stop breast lump evaluation and treatment."
                },
                {
                    question: "Does insurance cover breast lump procedures?",
                    answer: "Yes. We are a Hyderabad hospital accepting insurance, and we support you through claims and approvals."
                }
            ],

            customCta: {
                heading: "Book Your Consultation Today",
                description: "If you’ve noticed any lump, change, or discomfort in your breast, don’t delay evaluation. Visit Stork Hospital to meet a trusted breast lump consultant in Hyderabad and take a confident step toward clarity and health.",
                buttonText: "Schedule Assessment"
            },
            meta: {
                duration: "30-60 Minutes",
                anesthesia: "Local / Sedation",
                hospitalStay: "Day Care",
                recoveryTime: "1-3 Days",
                successRate: "High Accuracy"
            },
            reviewedBy: {
                name: "Dr. Anjali",
                role: "Senior Surgical Oncologist",
                experience: "15+ Years Experience"
            }
        }


    }

    if (slug === "c-section") {
        return {
            slug: slug,
            title: "C-Section (Cesarean Delivery) – Stork Hospital, Hyderabad",
            subheading: "Safe, Planned, and Emergency Cesarean Deliveries with Expert Maternity Care",
            breadcrumbTitle: "C-Section",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `A Cesarean section, or C-section, is a surgical method of childbirth used when vaginal delivery is not possible or safe. At Stork Multispecialty Hospital, Hyderabad, we offer both elective and emergency C-sections, performed with the highest standards of safety, precision, and maternal care.

Our focus is on supporting mothers physically and emotionally throughout the process—with quick recovery, gentle handling, and expert-led care.`,

            overview: {
                heading: "Why Choose Stork Hospital for Cesarean Deliveries in Hyderabad?",
                intro: "We’re recognized for our well-equipped maternity services and 24/7 surgical readiness:",
                items: [
                    "Senior obstetric surgeons in Hyderabad with expertise in all types of C-sections",
                    "Walk-in delivery consultation near Kondapur—ideal for emergency or scheduled cases",
                    "Dedicated operating theatres for maternity surgeries",
                    "Neonatal and anesthetic team on standby during every procedure",
                    "Post-op care including lactation and recovery support",
                    "Trusted Hyderabad hospital accepting insurance for cesarean deliveries"
                ]
            },
            fullDescription: [],

            conditionsHeading: "When is a C-Section Recommended?",
            conditionsTreated: [
                "Breech or transverse baby position",
                "Placenta previa or low-lying placenta",
                "Multiple births (twins or more)",
                "Maternal complications like high blood pressure or gestational diabetes",
                "Previous cesarean deliveries",
                "Fetal distress during labor"
            ],

            procedureHeading: "How We Perform Cesarean Delivery at Stork",
            procedureSteps: [
                {
                    title: "Pre-delivery Planning",
                    description: "Pre-delivery planning with a C-section specialist. Admission on scheduled date or during labor."
                },
                {
                    title: "Preparation",
                    description: "Pre-surgical evaluation including vitals, labs, and fetal monitoring."
                },
                {
                    title: "Procedure",
                    description: "Performed under spinal or general anesthesia in our sterile OT. Baby delivered safely within 30–45 minutes."
                },
                {
                    title: "Recovery",
                    description: "Post-op recovery with nursing care and baby bonding time."
                }
            ],

            benefitsHeading: "What Sets Our C-Section Services Apart?",
            benefits: [
                "24/7 readiness for emergency cesarean deliveries",
                "Advanced infection control and post-op protocols",
                "Family-inclusive care in private maternity suites",
                "Emotional and breastfeeding support post-surgery",
                "Gentle techniques that reduce pain and speed up healing"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Cesarean Births at Stork Hospital",
            faqs: [
                {
                    question: "Is a C-section safe?",
                    answer: "Yes. With proper surgical care and monitoring, C-sections are a safe way to deliver."
                },
                {
                    question: "How long is the hospital stay?",
                    answer: "Usually 2–4 days depending on recovery."
                },
                {
                    question: "Can I breastfeed after a C-section?",
                    answer: "Absolutely. Our team helps initiate breastfeeding shortly after birth."
                },
                {
                    question: "Is the surgery covered under insurance?",
                    answer: "Yes. We are a Hyderabad hospital accepting maternity insurance, and we help handle claims."
                }
            ],

            customCta: {
                heading: "Schedule Your Delivery with Confidence",
                description: "If you need a planned or emergency cesarean birth, trust Stork Hospital’s experienced cesarean delivery team in Hyderabad to guide you with skill, care, and compassion every step of the way.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "45-60 Minutes",
                anesthesia: "Spinal / Epidural",
                hospitalStay: "3-4 Days",
                recoveryTime: "4-6 Weeks",
                successRate: "High Safety"
            },
            reviewedBy: {
                name: "Dr. Roberts",
                role: "Senior Obstetrician",
                experience: "25+ Years Experience"
            }
        }


    }

    if (slug === "cancer-pain-management") {
        return {
            slug: slug,
            title: "Cancer Pain Management – Stork Hospital, Hyderabad",
            subheading: "Individualized, Compassionate Relief for Cancer-Associated Pain",
            breadcrumbTitle: "Cancer Pain Management",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Cancer can be physically and emotionally overwhelming—and pain should not compound the experience. At Stork Multispecialty Hospital, Hyderabad, we provide expert-driven, customized cancer pain relief solutions designed to ease suffering while maintaining dignity and peace of mind.

With an integrated team of oncologists, pain physicians, and palliative care experts, we address all dimensions of cancer-related discomfort—safely, promptly, and empathetically.`,

            overview: {
                heading: "What Makes Stork Hospital a Preferred Destination for Cancer Pain Management in Hyderabad?",
                intro: "We blend clinical excellence with emotional sensitivity to deliver tailored, holistic care:",
                items: [
                    "Skilled cancer pain specialists in Hyderabad with deep knowledge in interventional and medical pain control",
                    "Image-guided procedures for precise and effective relief",
                    "Quick-access consultations near Kondapur for urgent symptom management",
                    "Seamless collaboration with oncology, radiology, and support care teams",
                    "Onsite lab and imaging through our modern diagnostic center in Hyderabad",
                    "Recognized as a top Hyderabad hospital accepting insurance for eligible treatments"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Understanding the Source of Cancer Pain",
            conditionsTreated: [
                "Tumor growth compressing tissues",
                "Nerve infiltration",
                "Post-operative healing pain",
                "Side effects of chemotherapy or radiation",
                "General cancer-related discomfort"
            ],

            procedureHeading: "Our Multi-Layered Pain Relief Strategy",
            procedureSteps: [
                {
                    title: "Medicinal Management",
                    description: "Tailored regimens using analgesics, opioids, and adjunct therapies."
                },
                {
                    title: "Targeted Pain Procedures",
                    description: "Nerve blocks, neurolytic techniques, and radiofrequency ablation for complex cases."
                },
                {
                    title: "Minimally Invasive Options",
                    description: "Including epidural infusions and intrathecal pumps when appropriate."
                },
                {
                    title: "Mental Wellness Integration",
                    description: "In-house counselors supporting patients and families emotionally."
                }
            ],

            benefitsHeading: "Advantages of Choosing Stork Hospital for Cancer Pain Care",
            benefits: [
                "Custom-formulated treatment plans based on patient condition and disease stage",
                "Focus on reducing heavy medication reliance when possible",
                "Enhanced sleep quality, daily function, and emotional resilience",
                "Family-inclusive approach to care and recovery",
                "Centralized, efficient support at our multispecialty hospital in Hyderabad"
            ],

            risks: [],
            recoveryTimeline: [
                "Consultation with a seasoned pain relief doctor for cancer in Hyderabad",
                "Thorough examination and symptom mapping",
                "A structured, individualized pain care plan aligned with your oncology team",
                "Ongoing review, therapy optimization, and supportive counseling"
            ],

            faqHeading: "Frequently Asked Questions – Cancer Pain Services at Stork",
            faqs: [
                {
                    question: "Is it possible to eliminate cancer pain completely?",
                    answer: "Yes, in many cases pain can be effectively controlled or dramatically reduced using our multimodal methods."
                },
                {
                    question: "Are opioids always necessary?",
                    answer: "Not necessarily. Our team uses the safest and most effective combination of medications and alternatives."
                },
                {
                    question: "Does Stork offer emotional support as well?",
                    answer: "Absolutely. We offer psychological counseling, caregiver guidance, and holistic support as part of our service."
                },
                {
                    question: "What’s the insurance process like?",
                    answer: "We are a Hyderabad hospital accepting insurance, and we provide hands-on assistance with pre-approvals and paperwork."
                }
            ],

            customCta: {
                heading: "Reclaim Comfort with Advanced Pain Management",
                description: "You don’t have to accept pain as part of the cancer journey. Schedule a visit with our cancer pain specialists at Stork Hospital, and discover a personalized path to freedom from discomfort.",
                buttonText: "Schedule Consultation"
            },
            meta: {
                duration: "Varies",
                anesthesia: "Varies",
                hospitalStay: "Day Care / Inpatient",
                recoveryTime: "Immediate Relief",
                successRate: "High Effectiveness"
            },
            reviewedBy: {
                name: "Dr. Kumar",
                role: "Senior Pain Specialist",
                experience: "15+ Years Experience"
            }
        }

    }


    if (slug === "chemo-port-insertion") {
        return {
            slug: slug,
            title: "Chemo Port Insertion – Stork Hospital, Hyderabad",
            subheading: "Safe, Painless Access for Ongoing Chemotherapy Treatments",
            breadcrumbTitle: "Chemo Port Insertion",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `For cancer patients undergoing long-term chemotherapy, repeated needle pricks and vein access can be painful and stressful. A chemo port (port-a-cath) is a small device surgically implanted under the skin to provide easy and reliable access to veins. At Stork Multispecialty Hospital, Hyderabad, we offer safe, hygienic chemo port insertions under the care of skilled surgical and oncology teams.

Our goal is to make your treatment journey smoother, with less discomfort and fewer complications.`,

            overview: {
                heading: "Why Choose Stork Hospital for Chemo Port Placement in Hyderabad?",
                intro: "We provide end-to-end care—from consultation to follow-up—under one roof.",
                items: [
                    "Experienced oncology surgeons in Hyderabad trained in port-a-cath insertion",
                    "Fully sterile operation theaters and strict infection control protocols",
                    "Image-guided port placement for precision and safety",
                    "Same-day procedure with minimal downtime",
                    "Walk-in consultations near Kondapur and priority appointments",
                    "Patient education on port care and maintenance",
                    "A trusted Hyderabad hospital accepting insurance for oncology procedures"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Who Needs a Chemo Port?",
            conditionsTreated: [
                "Patients needing frequent chemotherapy infusions",
                "Requiring long-term IV medications",
                "Having poor peripheral vein access",
                "Experiencing skin irritation or vein scarring from repeated IVs"
            ],

            procedureHeading: "What to Expect During Chemo Port Placement",
            procedureSteps: [
                {
                    title: "Preparation",
                    description: "Pre-procedure evaluation and imaging. Performed under local anesthesia or light sedation."
                },
                {
                    title: "Insertion",
                    description: "Port is inserted near the collarbone area. A catheter is threaded into a large central vein using ultrasound or X-ray guidance."
                },
                {
                    title: "Completion",
                    description: "Post-procedure care and dressing. The entire procedure typically takes under 60 minutes."
                }
            ],

            benefitsHeading: "Post-Procedure Care and Usage",
            benefits: [
                "Port can be accessed within 24–48 hours post-surgery",
                "Regular flushing prevents blockage or clot formation",
                "Minimal scarring and low maintenance with proper hygiene",
                "Reduces the need for repeated needle sticks during treatment",
                "Nursing staff educates each patient on at-home care and cleaning"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Chemo Port Surgery at Stork",
            faqs: [
                {
                    question: "Is chemo port insertion painful?",
                    answer: "It’s performed under local or light sedation; patients typically feel minimal discomfort."
                },
                {
                    question: "How long does a chemo port last?",
                    answer: "Ports can remain functional for months or even years, depending on the treatment plan."
                },
                {
                    question: "Is the procedure covered by insurance?",
                    answer: "Yes. We are a Hyderabad hospital accepting insurance, and we help with claims processing."
                },
                {
                    question: "Will the port affect daily activities?",
                    answer: "No. Most patients can continue daily routines without issue, avoiding only strenuous chest activities."
                }
            ],

            customCta: {
                heading: "Make Chemotherapy Simpler and More Comfortable",
                description: "If you or a loved one needs ongoing infusion treatment, consider the benefits of a chemo port. Book an appointment at Stork Hospital, Hyderabad, and speak to our chemo port specialists about the best care plan for your journey.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "45-60 Minutes",
                anesthesia: "Local / Sedation",
                hospitalStay: "Day Care",
                recoveryTime: "1-2 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Anjali",
                role: "Senior Surgical Oncologist",
                experience: "15+ Years Experience"
            }
        }
    }


    if (slug === "chemotherapy") {
        return {
            slug: slug,
            title: "Chemotherapy Services – Stork Hospital, Hyderabad",
            subheading: "Compassionate, Comprehensive Chemotherapy Care for Every Cancer Journey",
            breadcrumbTitle: "Chemotherapy",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Chemotherapy remains one of the most widely used treatments for cancer. At Stork Multispecialty Hospital, Hyderabad, we offer patient-centered chemotherapy services with a focus on safety, comfort, and support. Whether part of a curative plan or palliative care, our team ensures that every treatment cycle is as smooth and effective as possible.

We aim to reduce side effects, provide emotional reassurance, and improve your overall quality of life throughout the treatment journey.`,

            overview: {
                heading: "Why Choose Stork Hospital for Chemotherapy in Hyderabad?",
                intro: "Your safety and comfort are our priorities from the first consultation to the final infusion.",
                items: [
                    "Highly experienced medical oncologists in Hyderabad with expertise in various cancer types",
                    "Personalized chemo protocols based on cancer stage, patient condition, and global guidelines",
                    "Onsite diagnostic center in Hyderabad for lab tests and imaging before and during therapy",
                    "Chemotherapy day care unit with comfortable, sanitized infusion chairs",
                    "Continuous monitoring by trained oncology nurses",
                    "Walk-in consultations near Kondapur and priority appointments for cancer patients",
                    "Complete support with claims at a Hyderabad hospital accepting insurance"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Types of Chemotherapy We Offer",
            conditionsTreated: [
                "Neoadjuvant and adjuvant chemotherapy",
                "Palliative chemotherapy for advanced-stage cancers",
                "Combination chemotherapy protocols",
                "Targeted chemotherapy (with monoclonal antibodies)",
                "Oral chemotherapy and maintenance therapy"
            ],

            procedureHeading: "What to Expect During Chemotherapy",
            procedureSteps: [
                {
                    title: "Pre-chemo Workup",
                    description: "Blood tests, imaging, and treatment briefing to ensure readiness."
                },
                {
                    title: "Infusion Day",
                    description: "Anti-nausea meds, IV line or chemo port access, and drug administration."
                },
                {
                    title: "Observation & Discharge",
                    description: "Continuous monitoring during infusion and discharge on the same day (for most sessions)."
                },
                {
                    title: "Post-chemo Care",
                    description: "Dietary advice, fatigue management, and 24/7 helpline for any issues."
                }
            ],

            benefitsHeading: "Supportive Therapies and Side Effect Management",
            benefits: [
                "Anti-nausea and anti-fatigue protocols",
                "Regular monitoring of liver, kidney, and blood counts",
                "Hair loss prevention counseling and cold cap availability (if applicable)",
                "Access to psychologists and nutritionists for holistic care",
                "Private areas for patients who prefer low-stimulation sessions"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Chemotherapy Services at Stork",
            faqs: [
                {
                    question: "How many chemo cycles will I need?",
                    answer: "This depends on your cancer type, response, and staging. Your oncologist will explain your roadmap."
                },
                {
                    question: "Are chemotherapy side effects severe?",
                    answer: "Not always. Newer protocols are better tolerated and supported by medications."
                },
                {
                    question: "Can I work during treatment?",
                    answer: "In some cases, yes. We guide patients on safe activity levels based on their condition."
                },
                {
                    question: "Is chemotherapy covered under insurance?",
                    answer: "Yes. We’re a Hyderabad hospital accepting insurance, and our admin team helps manage approvals."
                }
            ],

            customCta: {
                heading: "Start Your Treatment in a Safe, Supportive Environment",
                description: "At Stork Hospital, we don’t just deliver chemotherapy—we support your entire cancer journey. Book a consultation today with our chemotherapy specialists in Hyderabad and take the next step with confidence and care.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "2-4 Hours",
                anesthesia: "None",
                hospitalStay: "Day Care",
                recoveryTime: "Varies",
                successRate: "Evidence-Based"
            },
            reviewedBy: {
                name: "Dr. Rao",
                role: "Senior Medical Oncologist",
                experience: "20+ Years Experience"
            }
        }
    }


    if (slug === "ectopic-pregnancy-surgery") {
        return {
            slug: slug,
            title: "Ectopic Pregnancy Care – Stork Hospital, Hyderabad",
            subheading: "Expert Diagnosis & Gentle Treatment for High-Risk Early Pregnancies",
            breadcrumbTitle: "Ectopic Pregnancy Care",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `An ectopic pregnancy happens when a fertilized egg implants somewhere outside the uterus—most often in a fallopian tube. While uncommon, it can become serious or even life-threatening if not detected early. At Stork Multispecialty Hospital, Hyderabad, we focus on swift, safe, and sensitive management of ectopic pregnancies, ensuring your safety and preserving fertility whenever possible.

Our compassionate care combines high-precision diagnosis with emotional and physical support.`,

            overview: {
                heading: "Why Stork is Trusted for Ectopic Pregnancy Support in Hyderabad",
                intro: "Women choose us for our speed, privacy, and dedicated women’s health expertise:",
                items: [
                    "Senior OB-GYN consultants and emergency gynecologists in Hyderabad",
                    "Walk-in early pregnancy evaluation near Kondapur, no prior appointment needed",
                    "Rapid diagnostics including β-hCG levels and pelvic ultrasound",
                    "Tailored treatment: medication or laparoscopy, based on clinical stage",
                    "Calm, private recovery zones with supportive nursing",
                    "Fully licensed Hyderabad hospital accepting insurance for gynecologic emergencies"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Warning Signs to Watch For",
            conditionsTreated: [
                "Intense pain in the lower abdomen, especially one-sided",
                "Light to moderate bleeding not linked to periods",
                "Dizziness, weakness, or shoulder pain (a rare internal bleeding indicator)",
                "History of previous ectopic pregnancy or tubal surgery"
            ],

            procedureHeading: "How Stork Handles Ectopic Pregnancy – Step by Step",
            procedureSteps: [
                {
                    title: "Consultation & Diagnostics",
                    description: "Meet with an experienced specialist. Run labs (β-hCG) and ultrasound to confirm location."
                },
                {
                    title: "Medical Management",
                    description: "Methotrexate injection for early-stage, stable ectopics to dissolve the pregnancy safely."
                },
                {
                    title: "Surgical Intervention",
                    description: "Laparoscopic intervention if rupture or instability is suspected, focusing on fertility preservation."
                },
                {
                    title: "Follow-up & Support",
                    description: "Follow-up hormone checks to confirm resolution. Fertility consultation and mental wellness support."
                }
            ],

            benefitsHeading: "What Makes Our Care Different?",
            benefits: [
                "Diagnosis and treatment started within hours of your visit",
                "Laparoscopy-first approach to minimize recovery time",
                "Dedicated psychological counseling for you and your partner",
                "A fully equipped women-focused emergency unit in Hyderabad",
                "Personalized recovery journey with compassionate support"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Ectopic Pregnancy Treatment",
            faqs: [
                {
                    question: "Can this type of pregnancy survive?",
                    answer: "No. It’s unsafe for both the mother and embryo and must be addressed quickly."
                },
                {
                    question: "Will I be able to conceive again?",
                    answer: "In most cases, yes. Our team will guide you on safe timing and planning."
                },
                {
                    question: "Do all cases require surgery?",
                    answer: "No. Early detection allows for medical treatment in many instances."
                },
                {
                    question: "Is this treatment covered by insurance?",
                    answer: "Yes. As a Hyderabad hospital accepting insurance, we’ll help with all paperwork and claims."
                }
            ],

            customCta: {
                heading: "Don’t Delay – Early Response Saves Lives",
                description: "If you're facing unusual pain or bleeding in early pregnancy, act fast. Consult Stork Hospital’s leading ectopic pregnancy doctors in Hyderabad for respectful, expert-driven care in a fully supportive setting.",
                buttonText: "Consult Now"
            },
            meta: {
                duration: "45-60 Minutes (Surgery)",
                anesthesia: "General (Surgery)",
                hospitalStay: "1-2 Days",
                recoveryTime: "1-2 Weeks",
                successRate: "High Safety"
            },
            reviewedBy: {
                name: "Dr. Sarah",
                role: "Senior Gynecologist",
                experience: "18+ Years Experience"
            }
        }
    }


    if (slug === "endoscopic-keyhole-discectomy") {
        return {
            slug: slug,
            title: "Endoscopic Keyhole Discectomy – Minimally Invasive Spine Relief at Stork Hospital, Hyderabad",
            subheading: "A Modern Solution to Herniated Disc Pain",
            breadcrumbTitle: "Endoscopic Keyhole Discectomy",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Back pain due to disc herniation or nerve compression can drastically affect your daily life, mobility, and work. At Stork Multispecialty Hospital, Hyderabad, we offer endoscopic keyhole discectomy—an advanced spine procedure performed through a tiny incision using an endoscope, offering quick recovery with minimal disruption.

This technique provides precise disc decompression while preserving surrounding tissues, making it ideal for patients seeking rapid relief without the risks of traditional open surgery.`,

            overview: {
                heading: "Why Trust Stork Hospital for Endoscopic Spine Surgery in Hyderabad?",
                intro: "Our team of spine specialists is trained in cutting-edge endoscopic methods, combining surgical accuracy with compassionate care.",
                items: [
                    "Fellowship-trained spine surgeons in Hyderabad experienced in keyhole discectomy",
                    "Advanced spinal imaging for precise diagnosis",
                    "Access to our in-house diagnostic center in Hyderabad (MRI, CT scan)",
                    "Same-day consultation near Kondapur available for urgent care",
                    "Comprehensive insurance support for spine surgeries",
                    "Post-surgical physiotherapy and spine rehabilitation in one facility",
                    "We are one of the Hyderabad hospitals accepting insurance and known for efficient, affordable spine care solutions"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Understanding the Procedure: What is Endoscopic Keyhole Discectomy?",
            conditionsTreated: [
                "Herniated or bulging discs",
                "Sciatica (leg pain caused by nerve compression)",
                "Lumbar disc prolapse",
                "Spinal stenosis (narrowing of the spinal canal)"
            ],

            procedureHeading: "Step-by-Step Treatment Flow at Stork Hospital",
            procedureSteps: [
                {
                    title: "Evaluation",
                    description: "Detailed evaluation by a spinal surgery expert in Hyderabad using advanced imaging (MRI/CT)."
                },
                {
                    title: "Surgery",
                    description: "Day-care or short-stay surgery. Performed through a tiny (<1 cm) incision using an endoscope under local or general anesthesia."
                },
                {
                    title: "Discharge",
                    description: "Discharge within hours (or next day), based on recovery."
                },
                {
                    title: "Rehab",
                    description: "Personalized post-surgery physiotherapy and lifestyle coaching."
                }
            ],

            benefitsHeading: "Advantages of Choosing Minimally Invasive Discectomy at Stork",
            benefits: [
                "Reduced post-op pain and faster return to normal life",
                "Less visible scarring and improved cosmetic outcome",
                "Quicker recovery and minimal hospital stay",
                "Lower risks of surgical complications or infection",
                "Holistic spine care—starting from diagnostics to post-op rehab"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Keyhole Discectomy at Stork Hospital",
            faqs: [
                {
                    question: "Am I a good candidate for this surgery?",
                    answer: "If you suffer from a herniated disc not relieved by physiotherapy or medications, you may benefit from this minimally invasive solution."
                },
                {
                    question: "How safe is the endoscopic method?",
                    answer: "It’s a highly effective and safe option with fewer side effects, reduced tissue damage, and quicker healing."
                },
                {
                    question: "When can I resume work after surgery?",
                    answer: "Most patients are back to light work within a week and full activity within 2–3 weeks."
                },
                {
                    question: "Will insurance cover this procedure?",
                    answer: "Yes. We assist patients with pre-authorization. As a Hyderabad hospital accepting insurance, we handle complete documentation for eligible plans."
                }
            ],

            customCta: {
                heading: "Take the First Step Toward a Pain-Free Back",
                description: "If back or leg pain is limiting your life, consult with our skilled spine surgeons in Hyderabad at Stork Hospital. Book your appointment today to explore if endoscopic discectomy is the right solution for your spinal condition.",
                buttonText: "Book Spine Consultation"
            },
            meta: {
                duration: "60-90 Minutes",
                anesthesia: "Local / General",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "1-2 Weeks",
                successRate: "High Success"
            },
            reviewedBy: {
                name: "Dr. Reddy",
                role: "Senior Spine Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }


    if (slug === "endometriosis-surgery") {
        return {
            slug: slug,
            title: "Endometriosis Treatment – Stork Hospital, Hyderabad",
            subheading: "Gentle Relief for Persistent Pelvic Pain and Fertility Challenges",
            breadcrumbTitle: "Endometriosis Treatment",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Endometriosis is a condition where tissue resembling the uterine lining grows outside the uterus—on ovaries, fallopian tubes, or pelvic walls—causing pain, inflammation, and sometimes infertility. At Stork Multispecialty Hospital, Hyderabad, we provide holistic care for women facing mild to complex endometriosis, focusing on accurate diagnosis, long-term relief, and reproductive wellness.

We aim to reduce pain, restore function, and improve overall quality of life.`,

            overview: {
                heading: "Why Stork is a Top Choice for Endometriosis Care in Hyderabad",
                intro: "Our facility is known for combining cutting-edge diagnostics with compassionate women-centric care:",
                items: [
                    "Experienced gynecologists specialized in endometriosis management in Hyderabad",
                    "Walk-in appointments for pelvic pain near Kondapur with no referral required",
                    "Advanced pelvic imaging and diagnostic laparoscopy options",
                    "Comprehensive treatments: hormonal therapy, minimally invasive surgery, fertility care",
                    "Discreet consultations with an empathetic all-women team",
                    "Reputed Hyderabad hospital accepting insurance for women’s health procedures"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Signs You May Have Endometriosis",
            conditionsTreated: [
                "Severe cramping or painful periods",
                "Pain during or after sexual intercourse",
                "Chronic lower back or pelvic pain",
                "Unexplained fatigue or bloating",
                "Difficulty becoming pregnant",
                "Spotting or heavy menstrual bleeding"
            ],

            procedureHeading: "Our Endometriosis Diagnosis & Treatment Protocol",
            procedureSteps: [
                {
                    title: "Consultation",
                    description: "One-on-one consultation with a top-rated endometriosis doctor. Non-invasive scans and pelvic exams."
                },
                {
                    title: "Care Plan",
                    description: "Custom care plan tailored to severity and goals. Includes hormonal treatments or pain management."
                },
                {
                    title: "Surgery (if needed)",
                    description: "Laparoscopic surgery to remove or destroy endometrial implants."
                },
                {
                    title: "Support",
                    description: "Support for women trying to conceive. Ongoing monitoring, lifestyle adjustments, and emotional support."
                }
            ],

            benefitsHeading: "What Makes Stork’s Endometriosis Program Unique?",
            benefits: [
                "Patient-first consultations in a stress-free setting",
                "Surgery only when necessary, with minimally invasive options preferred",
                "Holistic recovery care including stress management and nutrition advice",
                "One of the few Hyderabad gynecology hospitals with full endometriosis programs",
                "Personalized care at every step"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Endometriosis Treatment at Stork",
            faqs: [
                {
                    question: "Can endometriosis be permanently treated?",
                    answer: "While there's no cure, we can significantly manage and control symptoms with tailored care."
                },
                {
                    question: "Do all patients need laparoscopy?",
                    answer: "Not always. Some cases are managed medically unless surgery becomes necessary."
                },
                {
                    question: "What is the recovery time after surgery?",
                    answer: "Most laparoscopic procedures have a short recovery of 7–14 days."
                },
                {
                    question: "Can I still conceive if I have endometriosis?",
                    answer: "Yes. With the right treatment, many women go on to have successful pregnancies."
                },
                {
                    question: "Is insurance accepted for treatment?",
                    answer: "Yes. We’re a Hyderabad hospital accepting insurance for gynecological treatments."
                }
            ],

            customCta: {
                heading: "Take the First Step Toward Relief",
                description: "Chronic pelvic pain shouldn’t be ignored. Book your consultation with Hyderabad’s trusted endometriosis specialists at Stork Hospital and get care that’s clinically advanced and emotionally supportive.",
                buttonText: "Schedule Consultation"
            },
            meta: {
                duration: "Varies",
                anesthesia: "Varies",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "1-2 Weeks",
                successRate: "High symptom relief"
            },
            reviewedBy: {
                name: "Dr. Sarah",
                role: "Senior Gynecologist",
                experience: "18+ Years Experience"
            }
        }
    }


    if (slug === "fracture-surgery") {
        return {
            slug: slug,
            title: "Fracture and Bone Injury Care – Stork Hospital, Hyderabad",
            subheading: "Prompt, Expert Fracture Care for Faster Healing",
            breadcrumbTitle: "Fracture Care",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Bone fractures, whether from falls, accidents, or sports injuries, can disrupt your daily life and cause intense pain. At Stork Multispecialty Hospital, Hyderabad, we provide quick and specialized treatment for a wide spectrum of fractures—from minor cracks to severe bone breaks—so you can recover safely and confidently.

Our orthopedic team focuses on restoring mobility with tailored treatment backed by advanced diagnostics and experienced hands.`,

            overview: {
                heading: "Why Stork Hospital is Trusted for Fracture Treatment in Hyderabad",
                intro: "We offer swift care combined with orthopedic precision and compassionate support:",
                items: [
                    "Round-the-clock availability for urgent bone injury treatment in Hyderabad",
                    "Highly experienced orthopedic doctors in Hyderabad handling surgical and non-surgical fracture repair",
                    "In-house imaging facilities (X-ray, CT, MRI) via our fully-equipped diagnostic center in Hyderabad",
                    "Pain control, physiotherapy, and recovery monitoring",
                    "Hassle-free insurance assistance and pricing clarity",
                    "Walk-in options near Kondapur without long waiting periods",
                    "We are also a reputed Hyderabad hospital accepting insurance for fracture-related treatments"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Common Fractures We Manage",
            conditionsTreated: [
                "Hairline and simple closed fractures",
                "Compound (open) fractures",
                "Stress and overuse injuries",
                "Greenstick fractures in children",
                "Breaks in hips, wrists, ankles, knees, and major joints"
            ],

            procedureHeading: "How We Treat Bone Injuries at Stork",
            procedureSteps: [
                {
                    title: "Assessment",
                    description: "Quick assessment and imaging to understand the extent of the injury."
                },
                {
                    title: "Stabilization",
                    description: "Stabilization of the injury site to prevent further damage."
                },
                {
                    title: "Treatment",
                    description: "Personalized treatment options: casting, traction, or surgical fixation (pinning, plating)."
                },
                {
                    title: "Recovery",
                    description: "Pain relief, mobility exercises, and regular follow-ups to ensure proper healing."
                }
            ],

            benefitsHeading: "Advantages of Choosing Stork for Bone Injury Care",
            benefits: [
                "Early detection and treatment to reduce long-term risks",
                "Advanced procedures like pinning, plating, and external fixation when needed",
                "Specialized fracture care for kids and seniors",
                "Supervised physiotherapy for optimal recovery",
                "Centralized services under one roof for convenience"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Bone Fracture Treatment at Stork",
            faqs: [
                {
                    question: "Is surgery always required for fractures?",
                    answer: "No. Many fractures heal well with non-surgical methods like casting or bracing."
                },
                {
                    question: "Will treatment be painful?",
                    answer: "We use local or general anesthesia and follow modern pain control protocols to ensure comfort."
                },
                {
                    question: "How soon can I resume normal activity?",
                    answer: "Depending on the type of fracture, most patients see recovery within 6 to 12 weeks."
                },
                {
                    question: "Does insurance cover fracture treatments?",
                    answer: "Yes. As a Hyderabad hospital accepting insurance, we help guide you through the approval and claim process."
                }
            ],

            customCta: {
                heading: "Walk In, Get Treated, Heal Strong",
                description: "When fractures happen, timely care makes all the difference. Visit Stork Hospital’s orthopedic team for dependable bone injury treatment. Book an appointment or walk in today—we’re here to help you recover right from the start.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "Local / General",
                hospitalStay: "Day Care / Inpatient",
                recoveryTime: "6-12 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Kumar",
                role: "Senior Orthopedic Surgeon",
                experience: "25+ Years Experience"
            }
        }
    }


    if (slug === "gynecomastia-surgery") {
        return {
            slug: slug,
            title: "Gynecomastia Surgery – Stork Hospital, Hyderabad",
            subheading: "Restore Confidence with Safe Male Breast Reduction",
            breadcrumbTitle: "Gynecomastia Surgery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Gynecomastia is a common condition that causes enlargement of breast tissue in men, often leading to discomfort, self-consciousness, or emotional distress. At Stork Multispecialty Hospital, Hyderabad, we offer advanced and minimally invasive surgical treatments to effectively correct gynecomastia and help you regain a natural masculine chest appearance.

We understand that gynecomastia is more than just a cosmetic concern—it’s about restoring comfort and self-esteem.`,

            overview: {
                heading: "Why Choose Stork Hospital for Gynecomastia Surgery in Hyderabad?",
                intro: "Our expert plastic and cosmetic surgeons specialize in body contouring for men, ensuring discreet, safe, and satisfying results.",
                items: [
                    "Experienced gynecomastia surgeons in Hyderabad with years of cosmetic surgery expertise",
                    "Day-care procedure with minimal downtime",
                    "Scar-minimizing techniques for smooth aesthetic outcomes",
                    "Walk-in consultation facility near Kondapur",
                    "Transparent pricing with insurance guidance for applicable cases",
                    "Complete post-op care with on-site dressing and recovery support",
                    "We’re recognized among Hyderabad hospitals accepting insurance and offer safe, affordable male breast reduction"
                ]
            },
            fullDescription: [],

            conditionsHeading: "What Causes Gynecomastia?",
            conditionsTreated: [
                "Hormonal imbalances",
                "Certain medications",
                "Obesity",
                "Liver disease or lifestyle habits",
                "Puberty-induced or adult-onset gynecomastia"
            ],

            procedureHeading: "How We Treat Gynecomastia at Stork Hospital",
            procedureSteps: [
                {
                    title: "Liposuction",
                    description: "Removes excess fatty tissue to contour the chest."
                },
                {
                    title: "Gland Excision",
                    description: "Removes firm breast gland tissue causing projection."
                },
                {
                    title: "Minimal-Scar Techniques",
                    description: "Performed via small incisions for aesthetic outcomes."
                },
                {
                    title: "Anesthesia",
                    description: "Typically done under local or general anesthesia and completed within 1–2 hours."
                }
            ],

            benefitsHeading: "Benefits of Gynecomastia Surgery",
            benefits: [
                "More contoured and masculine chest appearance",
                "Boost in self-confidence and body image",
                "Relief from pain, tightness, or tenderness",
                "Minimal downtime and fast return to routine",
                "Coordinated surgical and aftercare services all in one place"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Gynecomastia Correction at Stork",
            faqs: [
                {
                    question: "Is the surgery permanent?",
                    answer: "Yes. Once glandular tissue is removed, the results are typically long-lasting, especially with a healthy lifestyle."
                },
                {
                    question: "Is there visible scarring?",
                    answer: "We use hidden incisions and advanced closure techniques to minimize visible scars."
                },
                {
                    question: "Can I go home the same day?",
                    answer: "Yes. It’s a day-care procedure, and most patients are discharged within hours of surgery."
                },
                {
                    question: "Is the procedure covered by insurance?",
                    answer: "It depends on the medical justification. We assist in documentation and offer EMI options. We are a Hyderabad hospital accepting insurance for eligible procedures."
                }
            ],

            customCta: {
                heading: "Book Your Private Consultation",
                description: "If gynecomastia is affecting your confidence or daily comfort, book an appointment at Stork Hospital today. Consult a skilled gynecomastia surgeon in Hyderabad and explore your personalized treatment options in a supportive, judgment-free environment.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "1-2 Hours",
                anesthesia: "Local / General",
                hospitalStay: "Day Care",
                recoveryTime: "3-5 Days",
                successRate: "High Satisfaction"
            },
            reviewedBy: {
                name: "Dr. Arjun",
                role: "Senior Cosmetic Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }


    if (slug === "hydrocelectomy") {
        return {
            slug: slug,
            title: "Hydrocelectomy – Stork Hospital, Hyderabad",
            subheading: "Safe, Same-Day Surgical Relief for Hydrocele Discomfort",
            breadcrumbTitle: "Hydrocelectomy",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `A hydrocele is a fluid-filled sac around the testicle that causes painless swelling in the scrotum. Though not typically dangerous, it can lead to discomfort, heaviness, or embarrassment over time. At Stork Multispecialty Hospital, Hyderabad, we offer minimally invasive hydrocelectomy procedures to remove hydroceles safely and effectively.

Our urology team ensures accurate diagnosis, short surgery time, fast discharge, and discreet, patient-centered care.`,

            overview: {
                heading: "Why Choose Stork Hospital for Hydrocelectomy in Hyderabad?",
                intro: "Our urology services combine surgical skill with efficiency and empathy:",
                items: [
                    "Leading urologists in Hyderabad experienced in hydrocele and scrotal surgeries",
                    "Use of regional or short general anesthesia for patient comfort",
                    "Walk-in hydrocele consultation near Kondapur for rapid access",
                    "Minimal scarring with cosmetic techniques",
                    "Same-day discharge in most cases",
                    "Recognized Hyderabad hospital accepting insurance for hydrocelectomy and related care"
                ]
            },
            fullDescription: [],

            conditionsHeading: "What is a Hydrocele?",
            conditionsTreated: [
                "Noticeable scrotal swelling or heaviness",
                "Discomfort during physical activity",
                "Embarrassment or anxiety due to the bulge",
                "Adult-onset hydroceles from injury or infection"
            ],

            procedureHeading: "How We Treat Hydroceles at Stork",
            procedureSteps: [
                {
                    title: "Evaluation",
                    description: "Physical exam and scrotal ultrasound (if needed) by an experienced specialist."
                },
                {
                    title: "Surgery",
                    description: "30–45-minute procedure with sterile technique under anesthesia."
                },
                {
                    title: "Discharge",
                    description: "Same-day discharge in 4–6 hours with home care guidance."
                },
                {
                    title: "Follow-up",
                    description: "Suture removal or check-up in 7–10 days."
                }
            ],

            benefitsHeading: "Benefits of Hydrocele Surgery at Stork",
            benefits: [
                "Daycare procedure—no hospital stay required",
                "Minimal pain and fast healing",
                "Scar-conscious techniques for long-term comfort",
                "Trusted care at a reputed multispecialty hospital",
                "Privacy, dignity, and reassurance throughout treatment"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Hydrocele & Surgery",
            faqs: [
                {
                    question: "Is a hydrocele dangerous?",
                    answer: "No, but it can grow large and uncomfortable. Surgery is the definitive treatment."
                },
                {
                    question: "Will the surgery hurt?",
                    answer: "It’s done under anesthesia. Most patients report only mild post-op discomfort."
                },
                {
                    question: "Can the hydrocele return?",
                    answer: "Recurrence is rare if proper surgical technique is followed."
                },
                {
                    question: "Is insurance accepted for this procedure?",
                    answer: "Yes. We are a Hyderabad hospital accepting insurance, and we help with claim processing."
                }
            ],

            customCta: {
                heading: "Book Your Hydrocele Consultation Now",
                description: "Don't let a hydrocele affect your comfort or confidence. Visit Stork Hospital to meet a trusted hydrocelectomy surgeon in Hyderabad and get relief with expert care in a modern, respectful environment.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "30-45 Minutes",
                anesthesia: "Regional / General",
                hospitalStay: "Day Care",
                recoveryTime: "1-2 Weeks",
                successRate: "Very High"
            },
            reviewedBy: {
                name: "Dr. Rao",
                role: "Senior Urologist",
                experience: "15+ Years Experience"
            }
        }
    }


    if (slug === "hysterectomy") {
        return {
            slug: slug,
            title: "Hysterectomy Surgery – Stork Hospital, Hyderabad",
            subheading: "Expert Uterus Removal Surgery with Minimal Downtime",
            breadcrumbTitle: "Hysterectomy",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `A hysterectomy is a surgical procedure to remove the uterus, done to treat various gynecological conditions such as fibroids, endometriosis, or abnormal bleeding. At Stork Multispecialty Hospital, Hyderabad, we offer advanced laparoscopic, abdominal, and vaginal hysterectomy procedures tailored to each woman’s health needs.

Our priority is safe surgery, minimal discomfort, and quick recovery—delivered by experienced specialists in a private and supportive environment.`,

            overview: {
                heading: "Why Choose Stork for Hysterectomy in Hyderabad?",
                intro: "We’re recognized for high-precision, compassionate women’s surgical care:",
                items: [
                    "Skilled gynecologic surgeons in Hyderabad with decades of experience",
                    "Walk-in consultation for hysterectomy near Kondapur",
                    "Minimally invasive laparoscopic and vaginal surgery options",
                    "Modern operation theatres with infection control protocols",
                    "Female-centric recovery zones for peace and privacy",
                    "Trusted Hyderabad hospital accepting insurance for gynecological surgeries"
                ]
            },
            fullDescription: [],

            conditionsHeading: "When is Hysterectomy Recommended?",
            conditionsTreated: [
                "Symptomatic uterine fibroids",
                "Persistent abnormal uterine bleeding",
                "Uterine prolapse",
                "Endometriosis or adenomyosis",
                "Cancer of uterus, cervix, or ovaries (in select cases)"
            ],

            procedureHeading: "Types of Hysterectomy We Perform",
            procedureSteps: [
                {
                    title: "Total Hysterectomy",
                    description: "Removal of uterus and cervix."
                },
                {
                    title: "Subtotal (Partial) Hysterectomy",
                    description: "Uterus removed, cervix left intact."
                },
                {
                    title: "Radical Hysterectomy",
                    description: "Done in cancer cases, includes removal of surrounding tissues."
                },
                {
                    title: "Laparoscopic Hysterectomy",
                    description: "Minimally invasive, performed through small incisions for faster recovery."
                },
                {
                    title: "Vaginal Hysterectomy",
                    description: "Performed through the vaginal canal with no abdominal cut."
                }
            ],

            benefitsHeading: "What Makes Our Care Unique?",
            benefits: [
                "Minimally invasive focus to reduce pain and scarring",
                "Quick recovery with early discharge in most cases",
                "Comfortable, woman-focused inpatient setup",
                "Personal guidance from start to recovery",
                "Top-rated female reproductive health hospital in Hyderabad"
            ],

            risks: [],
            recoveryTimeline: [
                "Pre-surgery: Consultation, diagnosis, and health screening (bloodwork, ultrasound).",
                "Surgery: Done under general or spinal anesthesia in sterile conditions.",
                "Recovery: Monitoring and post-operative care for 1–3 days in recovery ward.",
                "Post-discharge: At-home recovery plan and follow-up schedule."
            ],

            faqHeading: "FAQs – Hysterectomy at Stork Hospital",
            faqs: [
                {
                    question: "Will I stop having periods after the surgery?",
                    answer: "Yes. Once the uterus is removed, menstrual periods will stop permanently."
                },
                {
                    question: "Will it affect my hormones?",
                    answer: "If ovaries are removed, menopause may begin. If ovaries are retained, hormone levels may remain stable."
                },
                {
                    question: "How long is the recovery?",
                    answer: "Most patients recover in 2–6 weeks depending on the surgical method."
                },
                {
                    question: "Is this covered under insurance?",
                    answer: "Yes. We are a Hyderabad hospital accepting insurance for hysterectomy surgeries."
                }
            ],

            customCta: {
                heading: "Consult with Confidence",
                description: "If you’re dealing with ongoing uterine problems, speak to a hysterectomy expert in Hyderabad at Stork Hospital. We’re here to provide gentle, informed care tailored to your health and comfort.",
                buttonText: "Schedule Consultation"
            },
            meta: {
                duration: "1-3 Hours",
                anesthesia: "General / Spinal",
                hospitalStay: "1-3 Days",
                recoveryTime: "2-6 Weeks",
                successRate: "High Safety"
            },
            reviewedBy: {
                name: "Dr. Sarah",
                role: "Senior Gynecologist",
                experience: "18+ Years Experience"
            }
        }
    }


    if (slug === "kyphoplasty") {
        return {
            slug: slug,
            title: "Kyphoplasty – Stork Hospital, Hyderabad",
            subheading: "Minimally Invasive Relief for Spinal Compression Fractures",
            breadcrumbTitle: "Kyphoplasty",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Kyphoplasty is an advanced, minimally invasive procedure designed to treat painful vertebral compression fractures caused by conditions such as osteoporosis, spinal injuries, or certain cancers. The procedure not only relieves pain but also helps restore the height and stability of the fractured vertebra, improving mobility and quality of life.

At Stork Multispecialty Hospital, Hyderabad, our spine specialists use the latest kyphoplasty techniques to ensure precise treatment, faster recovery, and minimal discomfort for patients.`,

            overview: {
                heading: "Why Choose Stork Hospital for Kyphoplasty",
                intro: "Our spine team combines expertise with advanced technology for optimal results:",
                items: [
                    "Highly experienced spine surgeons and interventional specialists",
                    "Advanced surgical center equipped with modern imaging guidance systems",
                    "24/7 hospital near Hitech City for emergency spinal care",
                    "In-house imaging facilities (X-ray, CT, MRI) via our diagnostic center",
                    "Walk-in clinic near Kondapur for prompt evaluation of back injuries",
                    "Comprehensive rehabilitation and physiotherapy support after surgery",
                    "Insurance accepted at Stork Hospital with complete claim support"
                ]
            },
            fullDescription: [],

            conditionsHeading: "When Kyphoplasty is Recommended",
            conditionsTreated: [
                "Painful vertebral compression fractures due to osteoporosis",
                "Spinal fractures from traumatic injuries",
                "Collapse of vertebra from certain cancers or tumors",
                "Fractures that haven’t responded to medication and rest"
            ],

            procedureHeading: "How Kyphoplasty Works",
            procedureSteps: [
                {
                    title: "Assessment and Imaging",
                    description: "X-rays or MRI scans confirm the fracture and plan the procedure."
                },
                {
                    title: "Anesthesia",
                    description: "Local or general anesthesia for patient comfort."
                },
                {
                    title: "Balloon Insertion",
                    description: "A small balloon is inserted into the fractured vertebra and inflated to restore its height."
                },
                {
                    title: "Bone Cement Injection",
                    description: "Special bone cement is injected to stabilize and strengthen the vertebra."
                },
                {
                    title: "Closure",
                    description: "The incision is closed with minimal stitches or adhesive strips."
                }
            ],

            benefitsHeading: "Benefits of Kyphoplasty",
            benefits: [
                "Rapid pain relief in most patients",
                "Restores lost vertebral height",
                "Stabilizes the spine and prevents further collapse",
                "Minimally invasive with small incisions",
                "Faster recovery compared to open spine surgery"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Kyphoplasty",
            faqs: [
                {
                    question: "Is kyphoplasty painful?",
                    answer: "The procedure is usually pain-free due to anesthesia, and most patients experience quick relief afterward."
                },
                {
                    question: "How long does kyphoplasty take?",
                    answer: "Generally 30–60 minutes per treated vertebra."
                },
                {
                    question: "Can the fracture return after kyphoplasty?",
                    answer: "The treated vertebra is stabilized, but other vertebrae may still be at risk if osteoporosis is not managed."
                },
                {
                    question: "Will my insurance cover it?",
                    answer: "Yes, Stork Hospital accepts most insurance plans for kyphoplasty."
                }
            ],

            customCta: {
                heading: "Book Your Kyphoplasty Consultation",
                description: "If you have persistent back pain from a spinal fracture, book an appointment at Stork Hospital to meet a spine specialist in Hyderabad and explore whether kyphoplasty is right for you.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "30-60 Minutes",
                anesthesia: "Local / General",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "1-2 Weeks",
                successRate: "High Pain Relief"
            },
            reviewedBy: {
                name: "Dr. Reddy",
                role: "Senior Spine Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }


    if (slug === "lipoma-removal") {
        return {
            slug: slug,
            title: "Lipoma & Sebaceous Cyst Removal – Stork Hospital, Hyderabad",
            subheading: "Safe, Minimal-Scar Removal of Lumps and Bumps",
            breadcrumbTitle: "Lipoma Removal",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Lipomas and sebaceous cysts are common non-cancerous lumps that can appear anywhere on the body. While often harmless, they can cause discomfort, pain, or cosmetic concern. At Stork Multispecialty Hospital, Hyderabad, we offer quick, safe, and effective removal of these skin lumps with minimal scarring. We prioritize techniques that ensure complete removal to prevent recurrence.`,

            overview: {
                heading: "Why Choose Stork for Lipoma & Cyst Removal?",
                intro: "We provide expert care for all minor surgical procedures:",
                items: [
                    "Expert dermatologists and general surgeons in Hyderabad",
                    "We uphold zero waiting time for minor skin surgeries in Hyderabad, prioritizing prompt care",
                    "Minimal scar techniques for cosmetic results",
                    "Safe, sterile environment for all minor procedures",
                    "Post-procedure instructions and follow-up within 7–10 days",
                    "Support with wound care, suture removal, and insurance claim"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Common Lumps We Treat",
            conditionsTreated: [
                "Lipoma (Soft, fatty lump under the skin)",
                "Sebaceous Cyst (Blocked gland, may get infected)",
                "Dermoid Cyst",
                "Benign skin tumors",
                "Skin abscess needing drainage"
            ],

            procedureHeading: "How We Remove Lipomas & Cysts",
            procedureSteps: [
                {
                    title: "Consultation & Check",
                    description: "Physical exam to confirm diagnosis and rule out complications."
                },
                {
                    title: "Anesthesia",
                    description: "Local anesthesia is administered for a painless experience."
                },
                {
                    title: "Excision",
                    description: "Careful incision to remove the entire lump and sac to prevent recurrence."
                },
                {
                    title: "Closure",
                    description: "Fine sutures or surgical glue used for minimal scarring."
                }
            ],

            benefitsHeading: "Benefits of Removal at Stork",
            benefits: [
                "Quick 20-30 minute procedure",
                "Same-day discharge (Day Care)",
                "Permanent removal of bothering lumps",
                "Histopathology testing if needed for peace of mind",
                "Hassle-free insurance support"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Lipoma & Sebaceous Cyst Removal",
            faqs: [
                {
                    question: "Are lipomas and cysts dangerous?",
                    answer: "Not usually, but they should be examined to rule out complications or infection."
                },
                {
                    question: "How long is the recovery?",
                    answer: "Most patients resume daily activities the same or next day."
                },
                {
                    question: "Can it reappear after removal?",
                    answer: "If fully excised (including the sac), recurrence is rare."
                },
                {
                    question: "Is insurance accepted?",
                    answer: "Yes. As a Hyderabad hospital accepting insurance, we’ll help with all formalities."
                }
            ],

            customCta: {
                heading: "Schedule Your Skin Lump Check",
                description: "If you’ve discovered a new lump or an old one is growing or causing discomfort, don’t delay. Book a consult with Stork Hospital’s lipoma and cyst specialist in Hyderabad today and take a confident step toward relief and reassurance.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "20-30 Minutes",
                anesthesia: "Local Anesthesia",
                hospitalStay: "Day Care / Outpatient",
                recoveryTime: "1-2 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Suresh",
                role: "General & Laparoscopic Surgeon",
                experience: "12+ Years Experience"
            }
        }
    }


    if (slug === "mtp") {
        return {
            slug: slug,
            title: "Safe Abortion & Family Planning – Stork Hospital, Hyderabad",
            subheading: "Confidential, Compassionate Reproductive Health Services for Women",
            breadcrumbTitle: "MTP & Family Planning",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `At Stork Multispecialty Hospital, Hyderabad, we believe that every woman deserves access to informed and respectful reproductive care. Our facility offers legal and safe abortion services (MTP) and comprehensive family planning options in a secure, judgment-free setting.

From choosing a contraceptive method to seeking guidance for an unplanned pregnancy, our women’s health specialists provide complete support at every stage.`,

            overview: {
                heading: "Why Women Trust Stork for Reproductive Health in Hyderabad",
                intro: "We combine medical expertise with respectful and private care:",
                items: [
                    "Experienced gynecologists specializing in MTP and contraception in Hyderabad",
                    "Walk-in family planning support near Kondapur with same-day appointments",
                    "Legal termination services in accordance with the MTP Act (up to 24 weeks in eligible scenarios)",
                    "Both non-surgical and surgical procedures available",
                    "Discreet, all-female care team in a comforting environment",
                    "Fully certified Hyderabad hospital accepting insurance for eligible procedures"
                ]
            },
            fullDescription: [],

            conditionsHeading: "What We Offer in Family Planning & MTP",
            conditionsTreated: [
                "Medical abortion using prescribed medications with doctor supervision",
                "Surgical abortion (vacuum aspiration) for early-stage pregnancies",
                "Counseling on birth control pills, IUDs, implants, and injectables",
                "Emergency contraceptive pills (ECP)",
                "Permanent options like tubal ligation or laparoscopic sterilization"
            ],

            procedureHeading: "Our Process for MTP at Stork",
            procedureSteps: [
                {
                    title: "Consultation",
                    description: "One-on-one session with a registered MTP doctor. Evaluation including pregnancy test and overall health review."
                },
                {
                    title: "Decision",
                    description: "Choosing the safest termination option suited to the patient’s condition."
                },
                {
                    title: "Procedure",
                    description: "Done in a sterile, private setting—either medically or surgically."
                },
                {
                    title: "Recovery",
                    description: "Recovery guidance and optional birth control counseling."
                }
            ],

            benefitsHeading: "Supportive Approach to Family Planning",
            benefits: [
                "Female professionals available for personalized counseling",
                "Private consultation areas and short waiting times",
                "Recognized Hyderabad center for confidential contraception and abortion",
                "Friendly guidance in choosing the right contraceptive method",
                "Every service is delivered with counseling, privacy, and informed consent"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Abortion & Birth Control at Stork",
            faqs: [
                {
                    question: "Is abortion allowed in India?",
                    answer: "Yes. Under the MTP Act, it is permitted for various medical and social reasons up to 24 weeks (under qualifying conditions)."
                },
                {
                    question: "Will my details be confidential?",
                    answer: "Absolutely. We provide discreet services in a secure environment."
                },
                {
                    question: "Is the procedure painful?",
                    answer: "Some discomfort is common with medical abortion. Surgical options are performed under local or general anesthesia."
                },
                {
                    question: "Can I start birth control after an abortion?",
                    answer: "Yes. We help you choose and begin the method right away."
                }
            ],

            customCta: {
                heading: "Schedule a Private Consultation Today",
                description: "If you need guidance about terminating a pregnancy or planning your future family, speak to the family planning team at Stork Hospital in Hyderabad. We offer expert, respectful care for your most personal decisions.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "Varies",
                hospitalStay: "Day Care / Outpatient",
                recoveryTime: "1-3 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Sarah",
                role: "Senior Gynecologist",
                experience: "18+ Years Experience"
            }
        }
    }


    if (slug === "painless-delivery") {
        return {
            slug: slug,
            title: "Painless Normal Delivery – Stork Hospital, Hyderabad",
            subheading: "Empowered, Low-Pain Birth Through Modern Maternity Care",
            breadcrumbTitle: "Painless Delivery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Every mother deserves a beautiful birth experience—not one filled with fear or overwhelming pain. At Stork Multispecialty Hospital, Hyderabad, our goal is to provide pain-minimized natural deliveries using epidural anesthesia in a safe, supportive, and medically advanced environment.

We tailor every birth journey with care, compassion, and confidence to help you welcome your baby with joy.`,

            overview: {
                heading: "Why Hyderabad Mothers Trust Stork for Painless Normal Delivery",
                intro: "Expecting parents choose us for our combination of skilled care, accessibility, and maternity comfort:",
                items: [
                    "Highly qualified obstetricians and anesthetists in Hyderabad, on duty 24x7",
                    "Walk-in epidural consultations near Kondapur without long waits",
                    "Personalized pain relief using safe, adjustable epidural methods",
                    "Continuous monitoring of fetal and maternal health using advanced tools",
                    "Warm, experienced female nursing staff through labor stages",
                    "Leading Hyderabad hospital accepting insurance for maternity services"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Understanding Painless Delivery",
            conditionsTreated: [
                "Significant pain reduction during active labor",
                "Calm, composed experience with less exhaustion",
                "Better energy and control during the pushing phase",
                "Preferred option for women with anxiety, prolonged labor, or previous traumatic deliveries"
            ],

            procedureHeading: "The Stork Approach to Comfortable Labor",
            procedureSteps: [
                {
                    title: "Consultation",
                    description: "Initial meeting with our painless delivery experts. Detailed counseling on how the epidural works and safety assurances."
                },
                {
                    title: "Administration",
                    description: "Administering the epidural at the right stage of labor by a senior anesthetist."
                },
                {
                    title: "Monitoring",
                    description: "Full-time observation of contractions, vitals, and baby’s well-being."
                },
                {
                    title: "Delivery",
                    description: "Natural vaginal delivery supported by obstetricians and labor nurses."
                }
            ],

            benefitsHeading: "How We Enhance Your Birthing Experience",
            benefits: [
                "24-hour availability of maternity professionals and anesthetic support",
                "Private labor rooms with amenities to reduce stress and promote comfort",
                "Female labor nurses trained to provide emotional reassurance",
                "Customized plans for high-risk cases, first-time mothers, or VBACs",
                "Services prioritize both safety and emotional comfort"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Epidural Labor at Stork Hospital",
            faqs: [
                {
                    question: "Is the epidural completely safe?",
                    answer: "Yes, it is a widely used and well-researched pain relief technique. Our team follows all safety protocols."
                },
                {
                    question: "Will I lose control during labor?",
                    answer: "Not at all. You’ll feel reduced pain but retain full awareness and participation."
                },
                {
                    question: "How soon can I walk after the delivery?",
                    answer: "Mobility returns gradually—typically within a few hours post-birth."
                },
                {
                    question: "Is this delivery type covered by insurance?",
                    answer: "Yes. We are a Hyderabad hospital accepting insurance for deliveries, and we help streamline the paperwork."
                }
            ],

            customCta: {
                heading: "Take the First Step Toward a Calm Delivery",
                description: "Start planning for a smoother labor today. Connect with Stork Hospital’s painless delivery team in Hyderabad and take control of your childbirth journey with expert, empathetic care.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Labor Duration",
                anesthesia: "Epidural",
                hospitalStay: "2-3 Days",
                recoveryTime: "4-6 Weeks",
                successRate: "High Comfort"
            },
            reviewedBy: {
                name: "Dr. Sarah",
                role: "Senior Obstetrician",
                experience: "18+ Years Experience"
            }
        }
    }






    if (slug === "rhinoplasty") {
        return {
            slug: slug,
            title: "Rhinoplasty – Stork Hospital, Hyderabad",
            subheading: "Enhancing Nose Shape and Breathing Function",
            breadcrumbTitle: "Rhinoplasty",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Rhinoplasty, often referred to as a “nose reshaping” surgery or “nose job,” is a procedure that modifies the structure of the nose to improve its appearance, function, or both. Some patients choose rhinoplasty for cosmetic improvements—such as refining the nose shape or size—while others undergo the surgery to correct medical concerns like breathing difficulties, structural deformities, or injuries.

At Stork Multispecialty Hospital, Hyderabad, our ENT and facial plastic surgery team blends medical precision with aesthetic artistry, ensuring results that look natural while supporting healthy nasal airflow.`,

            overview: {
                heading: "Why Stork Hospital is a Preferred Choice for Rhinoplasty",
                intro: "We offer comprehensive care for nasal aesthetics and function:",
                items: [
                    "Expert ENT surgeons and facial plastic specialists experienced in all rhinoplasty techniques",
                    "Advanced surgical suites with precision instruments for safer, more predictable results",
                    "Customized surgical planning to suit each patient’s facial proportions and goals",
                    "24/7 hospital near Hitech City for complete surgical care and monitoring",
                    "Insurance accepted at Stork Hospital for reconstructive and functional procedures",
                    "Walk-in clinic near Kondapur for easy access to consultations and follow-up visits"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Different Types of Rhinoplasty Offered",
            conditionsTreated: [
                "Aesthetic Rhinoplasty: Improves nose appearance by altering size, symmetry, and contour",
                "Functional Rhinoplasty: Addresses breathing issues by correcting internal nasal structure problems like a deviated septum",
                "Reconstructive Rhinoplasty: Repairs damage from trauma, previous surgeries, or congenital defects",
                "Secondary (Revision) Rhinoplasty: Refines or corrects results from earlier nose surgery"
            ],

            procedureHeading: "How the Rhinoplasty Procedure is Performed",
            procedureSteps: [
                {
                    title: "Initial Consultation",
                    description: "Detailed discussion of expectations, physical assessment, and digital imaging if needed."
                },
                {
                    title: "Anesthesia",
                    description: "Administered locally or generally for patient comfort."
                },
                {
                    title: "Surgical Technique",
                    description: "Performed through open (external incision) or closed (internal incision) approaches."
                },
                {
                    title: "Reshaping",
                    description: "Adjusting cartilage, bone, or soft tissue to achieve the desired shape and function."
                },
                {
                    title: "Closure and Healing",
                    description: "The nose is supported with a splint or dressing for proper healing."
                }
            ],

            benefitsHeading: "Advantages of Rhinoplasty",
            benefits: [
                "Enhances facial harmony and overall profile",
                "Corrects functional breathing problems (e.g., deviated septum)",
                "Repairs damage caused by trauma or birth defects",
                "Long-lasting improvement in both form and function",
                "Boosts self-confidence"
            ],

            risks: [],
            recoveryTimeline: [
                "Mild swelling and bruising typically subside within 1–2 weeks",
                "Splint removal within a week after surgery",
                "Return to light activities in several days; avoid intense exercise for 3–4 weeks",
                "Final results emerge as swelling gradually resolves over several months"
            ],

            faqHeading: "FAQs – Rhinoplasty",
            faqs: [
                {
                    question: "Does rhinoplasty hurt?",
                    answer: "Pain is generally minimal and well-controlled with medication."
                },
                {
                    question: "Can it improve breathing problems?",
                    answer: "Yes. Functional rhinoplasty specifically aims to enhance airflow while maintaining or improving appearance."
                },
                {
                    question: "Is it covered by insurance?",
                    answer: "Coverage is possible for medically necessary or reconstructive procedures; cosmetic rhinoplasty is usually self-funded."
                },
                {
                    question: "Will results last a lifetime?",
                    answer: "Yes, results are permanent, though natural aging may slightly alter nose shape."
                }
            ],

            customCta: {
                heading: "Book a Rhinoplasty Consultation",
                description: "If you’re considering improving your nose’s appearance or function, book an appointment at Stork Hospital to meet a rhinoplasty specialist in Hyderabad and receive a tailored treatment plan.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "1.5-3 Hours",
                anesthesia: "General / Local",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "1-2 Weeks",
                successRate: "High Satisfaction"
            },
            reviewedBy: {
                name: "Dr. Srinivas",
                role: "Senior ENT & Plastic Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }


    if (slug === "thyroidectomy") {
        return {
            slug: slug,
            title: "Thyroidectomy (Thyroid Removal Surgery) – Stork Hospital, Hyderabad",
            subheading: "Safe & Specialized Surgical Care for Thyroid Disorders",
            breadcrumbTitle: "Thyroidectomy",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `When thyroid problems interfere with your health, comfort, or appearance, surgery may be the best solution. At Stork Multispecialty Hospital, Hyderabad, we provide safe, precise, and minimally invasive thyroidectomy procedures for patients with benign nodules, goiters, thyroid cancer, or overactive thyroid glands.

Our ENT and endocrine surgery teams are experienced in managing complex thyroid conditions with care tailored to each patient’s needs.`,

            overview: {
                heading: "Why Choose Stork Hospital for Thyroidectomy in Hyderabad?",
                intro: "Our multidisciplinary approach ensures accurate diagnosis, expert surgical execution, and holistic recovery:",
                items: [
                    "Skilled thyroid surgeons in Hyderabad with experience in both partial and total thyroidectomy",
                    "Advanced diagnostics: ultrasound, FNAC, and thyroid function testing under one roof",
                    "Walk-in ENT consultation near Kondapur with short waiting time",
                    "Minimally invasive and nerve-sparing surgical techniques",
                    "Post-surgical hormone management and follow-up support",
                    "Transparent billing and support from a Hyderabad hospital accepting insurance"
                ]
            },
            fullDescription: [],

            conditionsHeading: "What is Thyroidectomy?",
            conditionsTreated: [
                "Enlarged thyroid (goiter) causing breathing/swallowing issues",
                "Thyroid nodules or cysts",
                "Hyperthyroidism (overactive thyroid)",
                "Thyroid malignancies or suspected cancer"
            ],

            procedureHeading: "Your Thyroidectomy Journey at Stork Hospital",
            procedureSteps: [
                {
                    title: "Initial Evaluation",
                    description: "Evaluation and imaging with an ENT or endocrine surgeon, including blood work and FNAC."
                },
                {
                    title: "Pre-operative",
                    description: "Counseling and anesthesia planning."
                },
                {
                    title: "Surgery",
                    description: "Usually performed under general anesthesia using refined techniques to preserve vocal cord nerves and parathyroid glands."
                },
                {
                    title: "Recovery",
                    description: "24–48 hours of observation, then discharge with instructions. Regular post-op checkups for voice and calcium monitoring."
                }
            ],

            benefitsHeading: "Benefits of Thyroid Surgery at Stork",
            benefits: [
                "Accurate diagnosis and surgery by ENT-endocrine collaboration",
                "Reduced risk of hoarseness or nerve injury",
                "Personalized hormone replacement therapy if needed",
                "Enhanced healing through minimally invasive approach",
                "Coordinated care across diagnostics, surgery, and endocrinology"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Thyroid Surgery at Stork",
            faqs: [
                {
                    question: "Is thyroid surgery painful?",
                    answer: "It’s performed under anesthesia, and most patients report mild discomfort post-op. Pain is manageable with medication."
                },
                {
                    question: "Will I need lifelong medication after thyroidectomy?",
                    answer: "Only if your entire thyroid is removed. We provide hormone therapy and ongoing monitoring if required."
                },
                {
                    question: "Will there be a visible scar?",
                    answer: "Our surgeons use minimal incision techniques. Scars are discreet and fade over time with proper care."
                },
                {
                    question: "Is thyroid surgery covered under insurance?",
                    answer: "Yes. We are among the Hyderabad hospitals accepting insurance and offer assistance with documentation."
                }
            ],

            customCta: {
                heading: "Book a Thyroid Surgery Consultation",
                description: "If you’ve been advised thyroid surgery or experiencing persistent thyroid issues, schedule a consultation at Stork Hospital. Meet with a trusted thyroidectomy specialist in Hyderabad and explore your options for safe and effective treatment.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "2-3 Hours",
                anesthesia: "General Anesthesia",
                hospitalStay: "1-2 Days",
                recoveryTime: "2-3 Weeks",
                successRate: "High Support"
            },
            reviewedBy: {
                name: "Dr. Srinivas",
                role: "Senior ENT & Endocrine Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }


    if (slug === "prostatomegaly") {
        return {
            slug: slug,
            title: "Prostatomegaly (BPH) Treatment – Stork Hospital, Hyderabad",
            subheading: "Expert Urology Care for Enlarged Prostate Relief",
            breadcrumbTitle: "Prostatomegaly (BPH)",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Prostatomegaly, commonly known as Benign Prostatic Hyperplasia (BPH), is a non-cancerous enlargement of the prostate gland that affects a significant number of aging men. At Stork Multispecialty Hospital, Hyderabad, we offer specialized diagnosis and treatment for BPH to help patients regain bladder control, reduce discomfort, and improve their quality of life.

With advanced diagnostics and minimally invasive treatment options, we provide safe, personalized care that brings lasting relief.`,

            overview: {
                heading: "Why Stork Hospital is a Trusted Name for BPH Treatment in Hyderabad",
                intro: "Our experienced urologists take a comprehensive and compassionate approach to prostate care:",
                items: [
                    "Experienced urologists in Hyderabad specializing in prostate disorders",
                    "Advanced diagnostics including ultrasound, uroflowmetry, and PSA tests",
                    "Minimally invasive and laser treatment options",
                    "Walk-in clinic near Kondapur for quick consultation",
                    "Post-treatment support with medication guidance and lifestyle modification",
                    "Insurance assistance available for eligible cases"
                ]
            },
            fullDescription: [],

            conditionsHeading: "What is BPH (Benign Prostatic Hyperplasia)?",
            conditionsTreated: [
                "Frequent or urgent need to urinate",
                "Weak or interrupted urine stream",
                "Difficulty starting urination",
                "Incomplete bladder emptying",
                "Nighttime urination (nocturia)",
                "Prevention of urinary tract infections, bladder stones, or kidney damage"
            ],

            procedureHeading: "BPH Treatments Available at Stork Hospital",
            procedureSteps: [
                {
                    title: "Medication Therapy",
                    description: "Alpha-blockers and 5-alpha-reductase inhibitors to relax muscles and shrink the prostate."
                },
                {
                    title: "Minimally Invasive Procedures",
                    description: "Including Transurethral Resection of the Prostate (TURP) and laser surgery for long-term relief."
                },
                {
                    title: "UroLift Procedure",
                    description: "A less invasive option to lift and hold the prostate tissue away from the urethra."
                },
                {
                    title: "Post-op Recovery",
                    description: "Full monitoring, diet plans, and physiotherapy support as needed."
                }
            ],

            benefitsHeading: "Benefits of BPH Treatment at Stork Hospital",
            benefits: [
                "Quick relief from bothersome urinary symptoms",
                "Preservation of sexual and urinary function",
                "Shorter recovery time with day-care surgical options",
                "Ongoing urology care for prevention of recurrence",
                "Integrated services under one roof"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Prostate Enlargement Treatment at Stork Hospital",
            faqs: [
                {
                    question: "Is prostate enlargement dangerous?",
                    answer: "While not cancerous, BPH can cause serious urinary issues and should be evaluated by a urologist."
                },
                {
                    question: "How do I know which treatment is right for me?",
                    answer: "Your treatment is chosen based on your prostate size, age, overall health, and symptom severity."
                },
                {
                    question: "Will I need surgery for BPH?",
                    answer: "Not always. Many men benefit from medication or non-surgical interventions."
                },
                {
                    question: "Is the treatment covered under insurance?",
                    answer: "Yes. As a Hyderabad hospital accepting insurance, we guide patients through eligibility and pre-approval."
                }
            ],

            customCta: {
                heading: "Don’t Ignore Prostate Symptoms – Get Checked Today",
                description: "If you’re experiencing urinary discomfort, book a consultation at Stork Hospital with a top urologist in Hyderabad. Early treatment for BPH can protect your bladder, kidneys, and overall wellness.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Local / Spinal",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "1-2 Weeks",
                successRate: "High Relief"
            },
            reviewedBy: {
                name: "Dr. Rao",
                role: "Senior Urologist",
                experience: "15+ Years Experience"
            }
        }
    }


    if (slug === "uterine-fibroids-surgery") {
        return {
            slug: slug,
            title: "Uterine Fibroid Solutions – Stork Hospital, Hyderabad",
            subheading: "Relieving Discomfort and Restoring Reproductive Health",
            breadcrumbTitle: "Uterine Fibroids",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Uterine fibroids are benign (non-cancerous) tumors that grow within or on the uterus. These growths, while common, may lead to discomfort, excessive bleeding, and fertility issues. At Stork Multispecialty Hospital, Hyderabad, we specialize in identifying and treating fibroids with medical therapies and minimally invasive surgeries, always prioritizing your comfort and health goals.

We create individualized treatment strategies so women can reclaim control over their wellness and reproductive plans.`,

            overview: {
                heading: "Why Women Prefer Stork for Fibroid Care in Hyderabad",
                intro: "We’re known for gentle, patient-centered care and surgical precision:",
                items: [
                    "Skilled gynecologists for fibroid treatment in Hyderabad",
                    "Walk-in fibroid consultations near Kondapur – no referral needed",
                    "High-resolution imaging tools (Ultrasound, MRI) for accurate fibroid detection",
                    "A full spectrum of care: from hormone therapy to laparoscopic surgery",
                    "Calm, comforting facilities designed for women’s health",
                    "Recognized Hyderabad hospital accepting insurance for gynecology surgeries"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Recognizing Fibroid Symptoms",
            conditionsTreated: [
                "Menstrual cycles that are heavy or prolonged",
                "Pressure or fullness in the lower abdomen",
                "Discomfort in the lower back or pelvis",
                "Frequent urge to urinate",
                "Pain during intercourse",
                "Challenges in conceiving or carrying a pregnancy to term"
            ],

            procedureHeading: "How We Treat Fibroids at Stork",
            procedureSteps: [
                {
                    title: "Initial Evaluation",
                    description: "Consultation with a fibroid specialist and detailed pelvic imaging to assess number, size, and location."
                },
                {
                    title: "Medical Management",
                    description: "Hormonal medications to shrink or manage fibroids and control symptoms."
                },
                {
                    title: "Surgical Intervention",
                    description: "Laparoscopic myomectomy (removal with uterine preservation) or Hysterectomy (for severe/recurrent cases)."
                },
                {
                    title: "Recovery Support",
                    description: "Guidance on future family planning and regular follow-ups."
                }
            ],

            benefitsHeading: "What Sets Stork Apart?",
            benefits: [
                "Conservative approach: surgery only when necessary",
                "Emphasis on minimally invasive methods for faster recovery",
                "Supportive team helping women through physical and emotional effects",
                "Complete care: from diagnosis to fertility preservation",
                "Women-centric hospital prioritizing comfort and privacy"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Fibroid Management at Stork Hospital",
            faqs: [
                {
                    question: "Are uterine fibroids life-threatening?",
                    answer: "No, but they can lead to major health concerns like anemia or infertility if not treated properly."
                },
                {
                    question: "Can I still have children after fibroid surgery?",
                    answer: "Yes. Uterus-preserving surgeries like myomectomy maintain fertility."
                },
                {
                    question: "Are all fibroids treated surgically?",
                    answer: "Not at all. Many asymptomatic or small fibroids are managed with medication and monitoring."
                },
                {
                    question: "Is insurance accepted for fibroid procedures?",
                    answer: "Yes. We are a Hyderabad hospital accepting insurance for women’s surgical care."
                }
            ],

            customCta: {
                heading: "Book Your Appointment Today",
                description: "Struggling with unexplained pain or bleeding? Consult the best fibroid removal doctors in Hyderabad at Stork Hospital. We’ll help you regain comfort and clarity—on your terms.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / General",
                hospitalStay: "Day Care / 1-2 Days",
                recoveryTime: "1-3 Weeks",
                successRate: "High Success"
            },
            reviewedBy: {
                name: "Dr. Sarah",
                role: "Senior Gynecologist",
                experience: "18+ Years Experience"
            }
        }
    }


    if (slug === "vertebroplasty") {
        return {
            slug: slug,
            title: "Vertebroplasty – Precision Spine Care at Stork Hospital, Hyderabad",
            subheading: "Rapid Relief for Painful Vertebral Fractures Without Open Surgery",
            breadcrumbTitle: "Vertebroplasty",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `When sudden, sharp back pain strikes due to a vertebral compression fracture, vertebroplasty offers a fast, minimally invasive path to relief. At Stork Multispecialty Hospital, Hyderabad, our expert spine intervention team provides targeted, image-guided vertebroplasty—helping patients stand, walk, and breathe easier within hours.

Whether caused by osteoporosis, injury, or spinal tumors, this advanced treatment helps restore strength to fractured bones and brings back mobility.`,

            overview: {
                heading: "Why Stork Hospital is a Leader in Vertebroplasty in Hyderabad",
                intro: "We’re trusted by patients and referring physicians alike for spinal fracture care because:",
                items: [
                    "Skilled vertebroplasty consultants in Hyderabad with interventional radiology and spine specialization",
                    "Quick-access spine fracture consultations near Kondapur",
                    "Real-time fluoroscopy and CT-assisted precision",
                    "High patient success rate and minimal complications",
                    "Full post-procedure recovery plan and pain management",
                    "We’re a Hyderabad hospital accepting insurance for spine stabilization procedures"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Understanding Vertebroplasty – What It Involves",
            conditionsTreated: [
                "Osteoporotic spine fractures",
                "Fractures due to minor falls or stress injuries",
                "Vertebral collapse caused by cancer metastasis",
                "Prevents spinal deformity and restores normal movement"
            ],

            procedureHeading: "How the Procedure Works at Stork",
            procedureSteps: [
                {
                    title: "Spine Assessment",
                    description: "Assessment by a senior vertebroplasty doctor and imaging scans (MRI/CT) to locate affected vertebrae."
                },
                {
                    title: "Preparation",
                    description: "Patient positioned for optimal access and given light sedation."
                },
                {
                    title: "Cement Injection",
                    description: "Guided insertion of a needle and injection of bone-strengthening cement into the weakened vertebra."
                },
                {
                    title: "Recovery",
                    description: "Observation for a few hours before discharge. Patients often report dramatic pain reduction immediately."
                }
            ],

            benefitsHeading: "What Are the Benefits?",
            benefits: [
                "Fast and lasting pain relief",
                "Stabilizes the fracture and prevents future collapse",
                "Increases spine stability without open surgery",
                "Outpatient or short-stay treatment",
                "Reduces need for long-term pain medication"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "Common Questions – Vertebroplasty at Stork",
            faqs: [
                {
                    question: "Will this procedure fix a broken spine permanently?",
                    answer: "It doesn’t “fix” the bone fully but stabilizes it, preventing pain and worsening collapse."
                },
                {
                    question: "Can elderly patients undergo vertebroplasty?",
                    answer: "Yes. It’s commonly done for seniors with osteoporosis-related fractures."
                },
                {
                    question: "How long will I need to rest after the procedure?",
                    answer: "Most resume daily activities within 1–2 days."
                },
                {
                    question: "Does insurance cover vertebroplasty?",
                    answer: "Yes. Our Hyderabad spine unit accepts insurance for vertebral fracture care."
                }
            ],

            customCta: {
                heading: "Regain Strength, Comfort & Movement",
                description: "Don’t let a spine fracture keep you in pain or immobile. Book your evaluation at Stork Hospital with Hyderabad’s leading vertebroplasty team. We’ll help you walk tall again—without delay.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "1 Hour",
                anesthesia: "Local Sedation",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "1-2 Days",
                successRate: "High Relief"
            },
            reviewedBy: {
                name: "Dr. Rao",
                role: "Senior Interventional Radiologist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "corn-removal") {
        return {
            slug: slug,
            title: "Corn Removal – Stork Hospital, Hyderabad",
            subheading: "Relief from Painful Foot Corns with Expert Care",
            breadcrumbTitle: "Corn Removal",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Corns are thickened areas of skin that develop due to repeated pressure or friction, most commonly on the feet or toes. They can cause discomfort, pain while walking, and even lead to infections if ignored. While some corns may improve with simple home care, stubborn or painful corns often require professional removal to ensure relief and prevent recurrence.

At Stork Multispecialty Hospital, Hyderabad, our podiatry and dermatology specialists provide safe and effective corn removal using advanced techniques that protect surrounding healthy skin while addressing the root cause.`,

            overview: {
                heading: "Why Choose Stork Hospital for Corn Removal",
                intro: "Expert care for foot health and skin conditions.",
                items: [
                    "Specialist doctors with expertise in foot health and skin conditions",
                    "Advanced diagnostic center in Hyderabad for assessing underlying causes like foot deformities or gait issues",
                    "State-of-the-art surgical center for painless, precise removal",
                    "Walk-in clinic near Kondapur for quick consultations and treatments",
                    "Insurance accepted at Stork Hospital for eligible procedures",
                    "Advice on footwear and foot care to prevent future corns"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Causes & Symptoms",
            conditionsTreated: [
                "Wearing tight, ill-fitting shoes",
                "Walking or standing for long periods without proper support",
                "High-heeled footwear causing toe compression",
                "Abnormal foot structure or bone alignment",
                "Thick, rough patches of skin with raised, hardened bumps",
                "Tenderness or pain when pressure is applied"
            ],

            procedureHeading: "Treatment Options at Stork Hospital",
            procedureSteps: [
                {
                    title: "Non-Surgical Care",
                    description: "Professional debridement (shaving down thickened skin), Use of protective padding or orthotic insoles to reduce pressure, Moisturizing treatments to soften skin."
                },
                {
                    title: "Surgical Care",
                    description: "Precise surgical removal under sterile conditions for recurrent or severe corns, Correction of underlying bone or foot deformities if needed."
                },
                {
                    title: "Preventive Guidance",
                    description: "Proper footwear recommendations, Foot hygiene and care instructions, Lifestyle modifications to reduce pressure points."
                }
            ],

            benefitsHeading: "Recovery and Aftercare",
            benefits: [
                "Most patients walk comfortably immediately after treatment",
                "Avoid wearing tight shoes during healing",
                "Maintain foot hygiene to prevent recurrence",
                "Schedule periodic foot check-ups if prone to corns"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Corn Removal",
            faqs: [
                {
                    question: "Can I remove a corn at home?",
                    answer: "Home remedies may help mild cases, but professional care ensures safe and complete removal."
                },
                {
                    question: "Is the procedure painful?",
                    answer: "No. We use painless techniques with local anesthesia if needed."
                },
                {
                    question: "How soon can I walk after removal?",
                    answer: "Most patients can walk immediately with minimal discomfort."
                },
                {
                    question: "Will the corn come back?",
                    answer: "It can, if the cause (such as ill-fitting footwear) is not addressed."
                }
            ],

            customCta: {
                heading: "Book Your Corn Removal Appointment",
                description: "If you have a painful or recurring corn, visit Stork Hospital to consult with a specialist in Hyderabad for quick, effective, and lasting relief.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "15-30 Minutes",
                anesthesia: "None or Local",
                hospitalStay: "Outpatient",
                recoveryTime: "Immediate",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Srikanth Goud",
                role: "Senior Podiatrist",
                experience: "10+ Years Experience"
            }
        }
    }

    if (slug === "diabetic-foot-ulcers") {
        return {
            slug: slug,
            title: "Diabetic Foot Ulcer – Stork Hospital, Hyderabad",
            subheading: "Dedicated Foot Health for Diabetic Patients",
            breadcrumbTitle: "Diabetic Foot Ulcer",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `A diabetic foot ulcer is a wound that forms on the foot of someone living with diabetes, often due to a combination of nerve damage, poor circulation, and slow healing. Many patients don’t feel pain from these ulcers because of diabetic neuropathy, allowing the wound to worsen before it’s noticed. Without urgent and proper care, the infection risk is high, and in severe cases, amputation may become necessary.

At Stork Multispecialty Hospital, Hyderabad, our diabetic foot care program brings together wound healing expertise, vascular assessment, and blood sugar management under one roof. Our mission is to close wounds faster, prevent complications, and protect patients’ long-term mobility and independence.`,

            overview: {
                heading: "Why Patients Trust Stork Hospital for Diabetic Foot Ulcer Care",
                intro: "Comprehensive care for diabetic foot health.",
                items: [
                    "Expert medical team including diabetologists, vascular surgeons, and podiatry-trained nurses",
                    "In-house diagnostic center in Hyderabad for imaging, vascular studies, and infection testing",
                    "Advanced surgical center for complex wound repair, grafting, or reconstructive surgery",
                    "24/7 emergency hospital near Hitech City for urgent diabetic wound cases",
                    "Insurance accepted at Stork Hospital with all costs explained upfront",
                    "Walk-in clinic near Kondapur for same-day ulcer screening and advice",
                    "Prevention-focused follow-up plans tailored to each patient"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Recognizing the Warning Signs Early",
            conditionsTreated: [
                "An open sore or ulcer that lingers or worsens",
                "Foot swelling, redness, or increased warmth",
                "Drainage, odor, or signs of infection",
                "Loss of sensation, tingling, or burning in the feet",
                "Skin tone changes or visible deformities in the foot shape"
            ],

            procedureHeading: "How We Manage Diabetic Foot Ulcers",
            procedureSteps: [
                {
                    title: "Assessment",
                    description: "Comprehensive examination of both feet, Blood glucose testing and optimization, Evaluation of blood flow with Doppler or angiographic studies."
                },
                {
                    title: "Wound Treatment",
                    description: "Careful cleaning and debridement to remove damaged tissue, Antibiotics for active or potential infection, Moisture-balanced dressings to speed up healing, Pressure relief using orthopedic footwear or casts."
                },
                {
                    title: "Advanced Options",
                    description: "Skin grafts or local flap surgeries for persistent wounds, Vascular procedures to improve blood supply when circulation is poor, Hyperbaric oxygen therapy for stubborn or high-risk ulcers."
                }
            ],

            benefitsHeading: "Your Care Journey with Us",
            benefits: [
                "Immediate check-up by a diabetic foot specialist",
                "Testing to identify circulation issues and infection risk",
                "Creation of a custom care plan addressing wound healing and diabetes control",
                "Frequent monitoring to track healing progress",
                "Education and preventive strategies for long-term foot protection"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Diabetic Foot Ulcer",
            faqs: [
                {
                    question: "Why do these ulcers form in diabetics?",
                    answer: "High blood sugar over time damages nerves and narrows blood vessels, reducing sensation and healing ability."
                },
                {
                    question: "Can they heal completely?",
                    answer: "Yes, with prompt and consistent treatment, many ulcers heal fully, although prevention is always the best approach."
                },
                {
                    question: "How do I prevent them?",
                    answer: "Daily self-inspection, good footwear, and stable blood sugar levels are key."
                },
                {
                    question: "Will my insurance cover the costs?",
                    answer: "Yes. Stork Hospital accepts most major insurance providers and gives cost details before starting treatment."
                }
            ],

            customCta: {
                heading: "Schedule Your Diabetic Foot Assessment",
                description: "If you notice any foot wound, swelling, or signs of infection, act quickly. Book an appointment at Stork Hospital to see a diabetic foot care specialist in Hyderabad and get advanced treatment that safeguards your health and mobility.",
                buttonText: "Schedule Assessment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "Local / None",
                hospitalStay: "Outpatient / Inpatient",
                recoveryTime: "Weeks to Months",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Srikanth Goud",
                role: "Senior Podiatrist",
                experience: "10+ Years Experience"
            }
        }
    }

    if (slug === "diagnostic-procedure") {
        return {
            slug: slug,
            title: "Diagnostic Procedures – Stork Hospital, Hyderabad",
            subheading: "What are Diagnostic Procedures in Pregnancy?",
            breadcrumbTitle: "Diagnostic Procedures",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Accurate diagnosis is the cornerstone of safe and successful pregnancy care. Diagnostic procedures during pregnancy allow our medical team to monitor fetal development, detect potential complications early, and guide treatment decisions at every stage. At Stork Hospital, Hyderabad, we offer a wide range of advanced diagnostic services tailored for expectant mothers ensuring every step of your journey is informed, supported, and safe.

Our center is a trusted diagnostic center in Hyderabad, recognized for our lab tests available at hospital, real-time reporting, and ultrasound and x-ray diagnostic facilities under one roof.`,

            overview: {
                heading: "Why Are Diagnostic Tests Important During Pregnancy?",
                intro: "Prenatal diagnostic testing helps detect conditions before they become serious.",
                items: [
                    "Early detection of genetic or chromosomal abnormalities",
                    "Monitoring fetal growth and development",
                    "Identifying risks like gestational diabetes or preeclampsia",
                    "Evaluating amniotic fluid, placenta position, and fetal heartbeat",
                    "Detecting infections or anemia in the mother",
                    "Regular testing is a key part of pregnancy care in Hyderabad, especially in high-risk or IVF pregnancies"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Who Should Consider These Procedures?",
            conditionsTreated: [
                "Are over 35 years of age",
                "Have a family history of genetic disorders",
                "Had abnormal scan results in previous pregnancies",
                "Conceived via IVF or IUI",
                "Experience symptoms such as reduced fetal movement or high blood pressure"
            ],

            procedureHeading: "What to Expect at Stork Hospital",
            procedureSteps: [
                {
                    title: "Routine Prenatal Diagnostics",
                    description: "Blood Tests (CBC, blood sugar, thyroid profile), Urine analysis and infection screening, Blood type and Rh compatibility tests."
                },
                {
                    title: "Ultrasound Imaging",
                    description: "Early pregnancy scan (6–8 weeks), NT scan (11–14 weeks), Anomaly scan (18–22 weeks), Growth scans in the third trimester."
                },
                {
                    title: "Fetal Assessment & Monitoring",
                    description: "Non-Stress Test (NST), Biophysical Profile (BPP), Doppler Ultrasound, Kick count tracking support."
                },
                {
                    title: "Genetic & Special Screenings",
                    description: "Double/Triple Marker Testing, Non-Invasive Prenatal Testing (NIPT), Amniocentesis (in select cases)."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital for Diagnostic Care?",
            benefits: [
                "NABH-accredited diagnostic facility within the hospital",
                "Real-time fetal monitoring and immediate reporting",
                "Skilled radiologists and fetal medicine consultants",
                "Clean, safe, and woman-friendly environment",
                "Affordable treatment packages for routine scans and reports"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Diagnostic Procedures",
            faqs: [
                {
                    question: "Are all these tests mandatory during pregnancy?",
                    answer: "Not all, but your doctor will recommend specific tests based on your pregnancy profile and risk level."
                },
                {
                    question: "Are ultrasound scans safe for my baby?",
                    answer: "Yes, ultrasound is a safe and essential tool used globally to monitor pregnancy."
                },
                {
                    question: "Can I get reports on the same day?",
                    answer: "In most cases, yes. Our in-house lab and imaging team offer fast turnaround for reports."
                },
                {
                    question: "Is insurance accepted for diagnostic services?",
                    answer: "Yes. We accept major providers and also offer maternity packages with insurance coverage."
                }
            ],

            customCta: {
                heading: "Schedule Your Diabetic Foot Assessment",
                description: "If you notice any foot wound, swelling, or signs of infection, act quickly. Book an appointment at Stork Hospital to see a diabetic foot care specialist in Hyderabad and get advanced treatment that safeguards your health and mobility.",
                buttonText: "Schedule Assessment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Local",
                hospitalStay: "Outpatient",
                recoveryTime: "Immediate",
                successRate: "High Accuracy"
            },
            reviewedBy: {
                name: "Dr. Latha",
                role: "Senior Radiologist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "dvt") {
        return {
            slug: slug,
            title: "Deep Vein Thrombosis (DVT) – Stork Hospital, Hyderabad",
            subheading: "Immediate, Expert Attention for Blood Clots in the Deep Veins",
            breadcrumbTitle: "DVT",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Deep Vein Thrombosis is a condition where a blood clot forms in a deep vein, most often in the legs. This blockage can disrupt circulation and cause swelling, discomfort, and skin color changes. The greatest danger occurs if a part of the clot travels to the lungs, creating a pulmonary embolism, which is a medical emergency. Quick action and proper treatment are essential to prevent life-threatening complications.

At Stork Multispecialty Hospital, Hyderabad, our vascular care team combines rapid diagnostics, advanced treatment options, and preventive strategies to manage DVT effectively. Whether it’s an emergency case or a high-risk patient seeking prevention, our approach ensures timely, comprehensive care.`,

            overview: {
                heading: "Why Patients Rely on Stork Hospital for DVT Management",
                intro: "Comprehensive vascular care for clot management.",
                items: [
                    "Dedicated vascular specialists trained in both medical and interventional clot care",
                    "Advanced diagnostic center in Hyderabad with Doppler ultrasound and high-resolution imaging",
                    "State-of-the-art surgical center for catheter-based clot removal when required",
                    "24/7 emergency hospital near Hitech City for urgent vascular events",
                    "Insurance accepted at Stork Hospital with complete price transparency",
                    "Same-day access via our walk-in clinic near Kondapur",
                    "Long-term prevention plans tailored for patients prone to recurrent clots"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Common Signs That May Indicate DVT",
            conditionsTreated: [
                "Unexplained swelling in one leg, especially the calf",
                "Persistent leg pain or tenderness when walking or standing",
                "Warmth or reddish-blue discoloration over the affected area",
                "A heavy, dragging sensation in the leg"
            ],

            procedureHeading: "Our Step-by-Step Approach to Treating DVT",
            procedureSteps: [
                {
                    title: "Accurate Diagnosis",
                    description: "Review of symptoms and medical history, Doppler ultrasound to pinpoint clot location and assess blood flow, Blood tests like D-dimer to support or rule out the diagnosis."
                },
                {
                    title: "Medical Treatment",
                    description: "Blood thinners to stop clot growth and reduce the risk of further clots, Clot-busting medications for severe or high-risk cases, Compression stockings to improve circulation and reduce swelling."
                },
                {
                    title: "Minimally Invasive & Surgical Options",
                    description: "Catheter-directed thrombolysis to break down clots directly at the site, Venous stenting if a narrowed vein contributes to clot formation."
                }
            ],

            benefitsHeading: "Your DVT Care Journey at Stork Hospital",
            benefits: [
                "Immediate vascular evaluation upon arrival",
                "Ultrasound or imaging to confirm diagnosis",
                "Tailored treatment plan — medication, intervention, or both",
                "Education on lifestyle adjustments to prevent future episodes",
                "Scheduled follow-up visits for ongoing monitoring"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Deep Vein Thrombosis Treatment",
            faqs: [
                {
                    question: "Is DVT dangerous if left untreated?",
                    answer: "Yes. It can lead to serious complications like pulmonary embolism, which can be life-threatening."
                },
                {
                    question: "What causes DVT?",
                    answer: "Risk factors include prolonged inactivity, certain medical conditions, injury to a vein, or a genetic tendency to clot."
                },
                {
                    question: "How long will I need treatment?",
                    answer: "Treatment duration varies, but many patients need blood thinners for 3–6 months or longer."
                },
                {
                    question: "Will insurance cover my treatment?",
                    answer: "Yes. Stork Hospital accepts major insurance policies and provides full cost clarity in advance."
                }
            ],

            customCta: {
                heading: "Book an Urgent DVT Assessment",
                description: "If you notice swelling, pain, or warmth in one leg, don’t delay. Book an appointment at Stork Hospital to see a vascular specialist in Hyderabad and receive expert, timely care for Deep Vein Thrombosis.",
                buttonText: "Book Urgent Assessment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Local",
                hospitalStay: "Outpatient / Inpatient",
                recoveryTime: "Weeks to Months",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Abhinav Reddy",
                role: "Senior Vascular Surgeon",
                experience: "12+ Years Experience"
            }
        }
    }

    if (slug === "ear-surgery") {
        return {
            slug: slug,
            title: "Ear Surgery – Stork Hospital, Hyderabad",
            subheading: "Restoring Hearing, Comfort, and Ear Health with Expert Surgical Care",
            breadcrumbTitle: "Ear Surgery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Ear surgery refers to a variety of procedures performed to treat conditions affecting the outer, middle, or inner ear. These surgeries can help correct structural problems, repair damage from injury or infection, improve hearing, and prevent future ear-related complications.

At Stork Multispecialty Hospital, Hyderabad, our ENT surgeons perform ear surgeries using advanced microsurgical techniques and high-precision instruments. We provide individualized surgical plans, whether it’s for a child with recurrent ear infections or an adult with chronic ear problems, ensuring safe, effective, and lasting results.`,

            overview: {
                heading: "Why Choose Stork Hospital for Ear Surgery",
                intro: "Experienced ENT specialists skilled in routine and complex ear surgeries.",
                items: [
                    "Experienced ENT specialists skilled in both routine and complex ear surgeries",
                    "Fully equipped advanced surgical center with sterile operating theatres",
                    "In-house diagnostic center in Hyderabad for hearing tests, imaging, and endoscopic ear evaluation",
                    "24/7 emergency hospital near Hitech City for urgent ENT care",
                    "Insurance accepted at Stork Hospital with transparent billing practices",
                    "Same-day ENT appointments and walk-in clinic near Kondapur for quick consultations",
                    "Comfortable recovery rooms with attentive post-operative nursing care"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Types of Ear Surgeries We Perform",
            conditionsTreated: [
                "Myringoplasty – Repair of a perforated eardrum",
                "Tympanoplasty – Restoration of middle ear structure and hearing",
                "Mastoidectomy – Removal of infected mastoid bone cells",
                "Stapedectomy – Surgery for hearing loss due to otosclerosis",
                "Otoplasty – Cosmetic reshaping of the outer ear",
                "Removal of ear tumors or growths",
                "Insertion of ventilation tubes for chronic ear fluid"
            ],

            procedureHeading: "Our Surgical Approach",
            procedureSteps: [
                {
                    title: "Pre-Surgical Evaluation",
                    description: "ENT consultation with detailed ear examination, Hearing tests, imaging (CT/MRI), and other diagnostics as needed, Discussion of surgical options, risks, benefits, and recovery expectations."
                },
                {
                    title: "During Surgery",
                    description: "Performed under general or local anesthesia depending on procedure type, Use of high-powered microscopes for accuracy and minimal tissue trauma, Precise, targeted treatment of the affected ear structures."
                },
                {
                    title: "Post-Surgical Care",
                    description: "Pain management and infection prevention measures, Step-by-step ear care instructions, Follow-up visits for wound checks and hearing assessments, Advice on activities, water precautions, and long-term ear health."
                }
            ],

            benefitsHeading: "Your Treatment Journey at Stork Hospital",
            benefits: [
                "ENT evaluation and diagnostic testing",
                "Confirmation of surgical need and planning",
                "Pre-operative clearance and hospital admission",
                "Ear surgery performed by skilled ENT surgeons",
                "Hospital stay (day-care or 1–2 nights, depending on procedure)",
                "Follow-up appointments to monitor healing and results"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Ear Surgery",
            faqs: [
                {
                    question: "Will my hearing improve after surgery?",
                    answer: "In many cases, yes. Improvement depends on the type of ear problem and the extent of any existing damage."
                },
                {
                    question: "Is ear surgery painful?",
                    answer: "You won’t feel pain during the procedure, and any post-surgical discomfort is controlled with medication."
                },
                {
                    question: "How long does recovery take?",
                    answer: "Recovery varies by surgery type — some patients return to normal activities in a few days, while others may need a few weeks."
                },
                {
                    question: "Is insurance accepted for ear surgery?",
                    answer: "Yes. Stork Hospital works with leading insurance providers and offers upfront cost details before admission."
                }
            ],

            customCta: {
                heading: "Book Your ENT Surgery Consultation",
                description: "If you have chronic ear infections, hearing loss, or structural ear problems, surgery may be the most effective solution. Book an appointment at Stork Hospital to consult an ENT specialist in Hyderabad and get a tailored treatment plan in a safe, advanced surgical setting.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "Varies",
                anesthesia: "General / Local",
                hospitalStay: "Day-care / 1-2 Days",
                recoveryTime: "Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rao",
                role: "Senior ENT Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "elbow-pain") {
        return {
            slug: slug,
            title: "Elbow Pain Treatment – Stork Hospital, Hyderabad",
            subheading: "Understanding Elbow Pain and Its Impact",
            breadcrumbTitle: "Elbow Pain",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `The elbow plays a crucial role in daily arm function, and pain in this area can hinder simple tasks like lifting, bending, or even writing. Whether due to sports injury, nerve compression, arthritis, or repetitive motion, elbow pain needs expert evaluation and timely treatment. At Stork Multispecialty Hospital, Hyderabad, we specialize in diagnosing and managing all types of elbow pain with a personalized care approach.

If you're looking for expert elbow pain treatment in Hyderabad, our orthopedic team ensures accurate diagnosis, compassionate care, and long-term relief.`,

            overview: {
                heading: "Why Stork Hospital for Elbow Care in Hyderabad?",
                intro: "Integrated orthopedic care for complex elbow disorders.",
                items: [
                    "Stork Hospital offers integrated orthopedic care with specialized focus on upper limb conditions",
                    "Experienced orthopedic surgeon in Hyderabad with upper limb expertise",
                    "In-house diagnostics: Digital X-ray, ultrasound, MRI",
                    "Surgical and non-surgical treatment pathways",
                    "Walk-in clinic near Kondapur with short wait times",
                    "Hospitals accepting insurance in Hyderabad for orthopedic services",
                    "Post-treatment physiotherapy and occupational therapy support"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Conditions We Commonly Treat",
            conditionsTreated: [
                "Tennis elbow (lateral epicondylitis)",
                "Golfer’s elbow (medial epicondylitis)",
                "Elbow fractures or dislocations",
                "Olecranon bursitis",
                "Ulnar nerve entrapment (cubital tunnel syndrome)",
                "Osteoarthritis and rheumatoid arthritis of the elbow",
                "Ligament injuries and instability"
            ],

            procedureHeading: "Your Consultation and Treatment Journey",
            procedureSteps: [
                {
                    title: "Evaluation & Diagnosis",
                    description: "Evaluation by a leading orthopedic specialist in Hyderabad, Diagnostic imaging (X-ray, MRI, Ultrasound) if required, Detailed assessment of mobility and pain levels."
                },
                {
                    title: "Non-Surgical Management",
                    description: "Medication management (NSAIDs, muscle relaxants), Physical therapy to improve flexibility and strength, Bracing or splinting to restrict motion and support healing."
                },
                {
                    title: "Advanced Interventions",
                    description: "Corticosteroid injections for inflammation and pain control, Elbow arthroscopy (minimally invasive surgical procedure) when conservative measures fail, Post-procedure physiotherapy for optimal recovery."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital?",
            benefits: [
                "Focus on pain relief, joint function restoration, and prevention of recurrence",
                "Personalized treatment plans tailored to age and activity level",
                "Comprehensive diagnostic center and orthopedic unit under one roof",
                "Affordable orthopedic treatment and patient-first care",
                "Online doctor consultation available for initial evaluation"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Elbow Pain Services",
            faqs: [
                {
                    question: "Is tennis elbow a serious condition?",
                    answer: "While not dangerous, it can become chronic and limit daily activity without proper treatment."
                },
                {
                    question: "When is surgery needed for elbow problems?",
                    answer: "Surgery is considered if symptoms don’t improve with medications, therapy, or bracing."
                },
                {
                    question: "Can I consult a doctor online for elbow pain?",
                    answer: "Yes, we offer online doctor consultation in Hyderabad for initial evaluation and follow-up discussions."
                },
                {
                    question: "Do you provide insurance support?",
                    answer: "Yes, we are among the Hyderabad hospitals accepting insurance, covering most orthopedic services and diagnostics."
                }
            ],

            customCta: {
                heading: "Book an Appointment Today",
                description: "If elbow pain is disrupting your routine, don’t wait. Book an appointment at Stork Hospital to meet an experienced orthopedic surgeon in Hyderabad and begin your journey to recovery with confidence.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Local / General",
                hospitalStay: "Outpatient / Day-care",
                recoveryTime: "Weeks to Months",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Kiran Kumar",
                role: "Senior Orthopedic Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "enlarged-prostate") {
        return {
            slug: slug,
            title: "Enlarged Prostate (BPH) – Stork Hospital, Hyderabad",
            subheading: "Comprehensive Care for Benign Prostatic Hyperplasia",
            breadcrumbTitle: "Enlarged Prostate",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `An enlarged prostate, medically referred to as Benign Prostatic Hyperplasia (BPH), is a non-cancerous increase in the size of the prostate gland, commonly seen in men over 50. The prostate encircles the urethra, and when it grows in size, it can squeeze the urinary passage, leading to problems such as a weak urine stream, frequent trips to the bathroom, or difficulty starting urination.

At Stork Multispecialty Hospital, Hyderabad, our urology experts offer a full spectrum of BPH treatments — from early diagnosis and medical management to advanced laser and minimally invasive surgical options — all tailored to the patient’s individual needs.`,

            overview: {
                heading: "Why Patients Prefer Stork Hospital for BPH Treatment",
                intro: "A full spectrum of BPH treatments from early diagnosis to advanced surgery.",
                items: [
                    "Specialist urologists with years of experience in diagnosing and treating prostate disorders",
                    "Modern diagnostic center in Hyderabad equipped with PSA testing, uroflowmetry, and high-resolution prostate imaging",
                    "Advanced surgical center offering laser prostate surgery, TURP, and other latest techniques",
                    "24/7 emergency hospital near Hitech City for urgent urinary retention or complications",
                    "Insurance accepted at Stork Hospital with clear cost estimates",
                    "Walk-in clinic near Kondapur for same-day specialist consultations",
                    "Long-term monitoring and preventive care programs to maintain prostate health"
                ]
            },
            fullDescription: [
                "**Causes and Risk Factors**",
                "Hormonal changes related to aging, Hereditary predisposition to prostate enlargement, Co-existing conditions such as diabetes, heart disease, or obesity, Lifestyle factors including poor diet, lack of exercise, and high alcohol or caffeine intake."
            ],

            conditionsHeading: "Signs and Symptoms",
            conditionsTreated: [
                "Weak or interrupted urine stream",
                "Straining or difficulty initiating urination",
                "Sudden urge to urinate",
                "Frequent urination, particularly at night (nocturia)",
                "Sensation of incomplete bladder emptying"
            ],

            procedureHeading: "Treatment Options Available at Stork Hospital",
            procedureSteps: [
                {
                    title: "Lifestyle Advice & Medical Therapy",
                    description: "Dietary adjustments to reduce bladder irritation, Medications to relax prostate muscles or reduce gland size."
                },
                {
                    title: "Minimally Invasive Procedures",
                    description: "Laser Prostate Surgery – Removal or vaporization of excess tissue with minimal bleeding, TURP (Transurethral Resection of the Prostate) – Standard surgical method using a resectoscope inserted via the urethra."
                },
                {
                    title: "Advanced Surgical Approaches (for severe cases)",
                    description: "Recommended for patients with significant obstruction or complications such as bladder stones or kidney damage."
                }
            ],

            benefitsHeading: "Recovery and Aftercare",
            benefits: [
                "Most minimally invasive treatments allow discharge within 24 hours",
                "Noticeable improvement in urinary flow often seen within days",
                "Avoiding heavy lifting, cycling, or prolonged sitting during early recovery",
                "Regular follow-ups to track progress and prevent recurrence"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Enlarged Prostate (BPH)",
            faqs: [
                {
                    question: "Does BPH mean prostate cancer?",
                    answer: "No. BPH is a benign condition, though similar symptoms may require cancer screening to rule out malignancy."
                },
                {
                    question: "Can BPH be managed without surgery?",
                    answer: "Yes, many mild cases improve with medications and lifestyle modifications."
                },
                {
                    question: "When is surgery recommended?",
                    answer: "When symptoms are severe, medication fails, or complications such as urinary retention occur."
                },
                {
                    question: "Is treatment for BPH covered by insurance?",
                    answer: "Yes. Stork Hospital accepts most major insurance policies for both medical and surgical BPH treatments."
                }
            ],

            customCta: {
                heading: "Book Your BPH Consultation Today",
                description: "If urinary difficulties are affecting your daily life, schedule an appointment at Stork Hospital to meet a specialist urologist in Hyderabad and discuss personalized solutions for managing an enlarged prostate.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Spinal / General",
                hospitalStay: "Day-care / 1-2 Days",
                recoveryTime: "Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Dilip Kumar",
                role: "Senior Urologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "eswl") {
        return {
            slug: slug,
            title: "ESWL (Extracorporeal Shock Wave Lithotripsy) – Stork Hospital, Hyderabad",
            subheading: "Non-Invasive and Effective Kidney Stone Treatment",
            breadcrumbTitle: "ESWL",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Extracorporeal Shock Wave Lithotripsy (ESWL) is a modern, non-surgical procedure used to break kidney stones into tiny fragments using focused shock waves. Once broken down, these smaller pieces pass naturally through the urinary tract. ESWL is an excellent option for patients with small to medium-sized stones that are difficult to pass but do not require invasive surgery.

At Stork Multispecialty Hospital, Hyderabad, our expert urologists perform ESWL using the latest high-precision equipment to ensure accuracy, safety, and quick recovery.`,

            overview: {
                heading: "Why Choose Stork Hospital for ESWL",
                intro: "Non-invasive kidney stone treatment with high success rates.",
                items: [
                    "Specialist urologists with advanced ESWL training and years of experience",
                    "Fully equipped diagnostic center in Hyderabad for accurate stone detection and measurement",
                    "Advanced surgical center with state-of-the-art ESWL machines",
                    "24/7 emergency hospital near Hitech City for urgent urological care",
                    "Insurance accepted at Stork Hospital with complete billing transparency",
                    "Walk-in clinic near Kondapur for quick evaluation and scheduling",
                    "Comprehensive aftercare to reduce recurrence risk"
                ]
            },
            fullDescription: [
                "**When ESWL is Recommended**",
                "Stones measuring up to 2 cm in diameter, Stones located in the kidney or upper ureter, Patients seeking a non-invasive alternative to surgery, Cases where stones cause pain, bleeding, or infection."
            ],

            conditionsHeading: "The ESWL Procedure",
            conditionsTreated: [
                "Evaluation – Imaging tests such as ultrasound or CT scan to determine stone size and location",
                "Anesthesia or Sedation – To ensure comfort during the procedure",
                "Shock Wave Delivery – High-energy waves targeted at the stone to break it into smaller pieces",
                "Natural Passage – Fragments pass through urine over the next few days or weeks",
                "Follow-Up – Repeat imaging to ensure stones are cleared"
            ],

            procedureHeading: "Recovery and Aftercare",
            procedureSteps: [
                {
                    title: "Immediate Recovery",
                    description: "Resume normal activities within 1–2 days, Pain medication if needed for mild discomfort."
                },
                {
                    title: "Hydration",
                    description: "Drink plenty of water to flush out fragments."
                },
                {
                    title: "Precautions",
                    description: "Avoid strenuous exercise until cleared by the doctor, Follow-up visits to monitor kidney health and prevent recurrence."
                }
            ],

            benefitsHeading: "Benefits of ESWL at Stork Hospital",
            benefits: [
                "No incisions or stitches",
                "Quick recovery with same-day discharge",
                "Minimal discomfort during and after the procedure",
                "High success rate for small and medium-sized stones",
                "Reduced risk of complications compared to surgery"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – ESWL",
            faqs: [
                {
                    question: "Is ESWL painful?",
                    answer: "Mild discomfort may occur, but anesthesia or sedation keeps you comfortable during the procedure."
                },
                {
                    question: "How long does the procedure take?",
                    answer: "Most ESWL sessions take 45–60 minutes."
                },
                {
                    question: "Will I need more than one session?",
                    answer: "Some patients require multiple sessions depending on stone size and hardness."
                },
                {
                    question: "Does insurance cover ESWL?",
                    answer: "Yes, if recommended for medical reasons. Stork Hospital accepts most insurance policies."
                }
            ],

            customCta: {
                heading: "Book Your ESWL Appointment",
                description: "If you have kidney stones and want a non-invasive treatment, book an appointment at Stork Hospital to meet a urologist in Hyderabad and learn if ESWL is right for you.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "45-60 Minutes",
                anesthesia: "Sedation / Local",
                hospitalStay: "Day-care",
                recoveryTime: "1-2 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Dilip Kumar",
                role: "Senior Urologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "fertility-services") {
        return {
            slug: slug,
            title: "Fertility Services – Stork Hospital, Hyderabad",
            subheading: "Your Journey to Parenthood Begins Here",
            breadcrumbTitle: "Fertility Services",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `At Stork Hospital, Hyderabad, we understand the emotional, physical, and psychological journey couples go through when facing fertility challenges. Our fertility services are designed to provide personalized care, compassionate support, and the latest in reproductive medicine—all under one roof. Whether you’re just starting your journey or seeking advanced options, we’re here to support you at every step.

As one of the most trusted fertility care hospitals in Hyderabad, our team of fertility specialists, embryologists, and counselors work collaboratively to create customized treatment plans that align with your goals, health needs, and values.`,

            overview: {
                heading: "Comprehensive Fertility Treatments We Offer",
                intro: "Evidence-based fertility services from basic support to advanced IVF.",
                items: [
                    "Ovulation induction and cycle monitoring",
                    "Intrauterine insemination (IUI)",
                    "In-vitro fertilization (IVF)",
                    "Intracytoplasmic sperm injection (ICSI)",
                    "Fertility preservation (egg, sperm, embryo freezing)",
                    "Donor egg and sperm programs",
                    "Preimplantation genetic testing (PGT)",
                    "Reproductive surgeries (laparoscopy, hysteroscopy)"
                ]
            },
            fullDescription: [
                "**When Should You See a Fertility Specialist?**",
                "If you and your partner have been trying to conceive for more than 6–12 months without success, or if you have a known reproductive condition, seeking help early can make a significant difference. Consider a consultation if: You are over 30 and haven’t conceived after 6 months of trying, You have irregular or absent menstrual cycles, You’ve experienced multiple miscarriages, You’ve been diagnosed with endometriosis or PCOS, There’s a known sperm issue or male fertility concern, You’re planning to delay pregnancy and wish to preserve fertility."
            ],

            conditionsHeading: "Personalized Diagnosis & Planning",
            conditionsTreated: [
                "Hormonal profiling and ultrasound scans",
                "Semen analysis and advanced sperm function testing",
                "Ovarian reserve testing (AMH levels, antral follicle count)",
                "Tubal patency tests (HSG or saline infusion sonography)",
                "Laparoscopy for evaluation and treatment of reproductive conditions"
            ],

            procedureHeading: "Holistic Support Beyond Treatment",
            procedureSteps: [
                {
                    title: "Advanced Technologies",
                    description: "Time-lapse embryo imaging for selection accuracy, Blastocyst culture and embryo vitrification, Laser-assisted hatching and embryo biopsy, PGT-A and PGT-M for chromosomal or genetic concerns."
                },
                {
                    title: "Emotional & Physical Support",
                    description: "Nutrition and lifestyle guidance, Stress management and mindfulness programs, Fertility yoga and pelvic wellness classes, Follow-up counseling and post-treatment care."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital for Fertility Care?",
            benefits: [
                "Dedicated fertility specialists and embryology lab on-site",
                "Personalized treatment cycles tailored to your condition",
                "Transparent, ethical communication throughout the process",
                "Supportive environment with emotional counseling available",
                "Affordable IVF and IUI packages",
                "Insurance-accepted fertility treatments in Hyderabad",
                "Discreet, compassionate care for every patient"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Fertility Services at Stork Hospital",
            faqs: [
                {
                    question: "How long does a fertility evaluation take?",
                    answer: "Initial tests and consultations typically take a few days, depending on your cycle phase."
                },
                {
                    question: "What is the success rate of IVF at Stork Hospital?",
                    answer: "Success rates vary by age and health factors, but we maintain competitive rates comparable to global standards."
                },
                {
                    question: "Is fertility treatment painful or risky?",
                    answer: "Most procedures are minimally invasive and well-tolerated. We explain all steps and risks clearly before starting."
                },
                {
                    question: "Can I freeze my eggs or sperm if I’m not ready for pregnancy?",
                    answer: "Yes. We offer fertility preservation services for medical or personal reasons."
                }
            ],

            customCta: {
                heading: "Take the first step toward building your family",
                description: "Book a consultation with our fertility specialists at Stork Hospital—Hyderabad’s trusted destination for reproductive care.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Sedation",
                hospitalStay: "Outpatient",
                recoveryTime: "Immediate / Days",
                successRate: "Variable"
            },
            reviewedBy: {
                name: "Dr. Sunitha Reddy",
                role: "Senior Fertility Specialist",
                experience: "18+ Years Experience"
            }
        }
    }

    if (slug === "sinus") {
        return {
            slug: slug,
            title: "FESS Surgery – Functional Endoscopic Sinus Surgery at Stork Hospital, Hyderabad",
            subheading: "Minimally Invasive Relief for Chronic Sinus Problems",
            breadcrumbTitle: "FESS Surgery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Functional Endoscopic Sinus Surgery (FESS) is a modern, minimally invasive procedure used to treat chronic sinusitis and other sinus-related issues that do not respond to medication. At Stork Multispecialty Hospital, Hyderabad, our ENT specialists use advanced endoscopic technology to open blocked sinus pathways, restore natural drainage, and relieve persistent symptoms.

FESS offers precise treatment with minimal discomfort, faster healing, and improved long-term sinus health.`,

            overview: {
                heading: "Why Choose Stork Hospital for FESS in Hyderabad",
                intro: "Advanced endoscopic sinus surgery for lasting relief.",
                items: [
                    "Expert ENT surgeons for FESS in Hyderabad",
                    "Walk-in sinus evaluations near Kondapur for quick access to care",
                    "High-definition nasal endoscopes for accurate treatment",
                    "Customized anesthesia and recovery plans",
                    "Comprehensive post-surgery follow-up to prevent recurrence",
                    "Recognized Hyderabad hospital accepting insurance for ENT surgeries"
                ]
            },
            fullDescription: [
                "**Conditions Treated with FESS**",
                "Chronic sinusitis unresponsive to medication, Nasal polyps, Recurrent sinus infections, Fungal sinusitis, Sinus blockages caused by anatomical issues, Mucoceles and other sinus growths."
            ],

            conditionsHeading: "Our FESS Surgery Process at Stork",
            conditionsTreated: [
                "Thorough ENT consultation with nasal endoscopy and imaging",
                "Personalized surgical planning based on your diagnosis",
                "Endoscopic surgery performed under general anesthesia",
                "Removal of blockages and restoration of natural sinus drainage",
                "Same-day discharge in most cases, with detailed recovery guidance"
            ],

            procedureHeading: "Benefits of FESS Surgery at Stork",
            procedureSteps: [
                {
                    title: "Minimally Invasive",
                    description: "Targeted treatment with minimal tissue damage."
                },
                {
                    title: "Quick Recovery",
                    description: "Short recovery period and less post-surgery discomfort."
                },
                {
                    title: "Long-Term Relief",
                    description: "Reduced dependence on long-term medications, Improved breathing and overall quality of life."
                }
            ],

            benefitsHeading: "Benefits of FESS Surgery at Stork",
            benefits: [
                "Targeted treatment with minimal tissue damage",
                "Short recovery period and less post-surgery discomfort",
                "Long-term relief from chronic sinus symptoms",
                "Reduced dependence on long-term medications",
                "Improved breathing and overall quality of life"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – FESS Surgery at Stork Hospital",
            faqs: [
                {
                    question: "Is FESS painful?",
                    answer: "No. The surgery is done under anesthesia, ensuring comfort."
                },
                {
                    question: "How long is the recovery?",
                    answer: "Most patients resume normal activities within a week."
                },
                {
                    question: "Is FESS safe for all ages?",
                    answer: "Yes, though it’s most commonly performed on adults and teenagers."
                },
                {
                    question: "Is it covered by insurance?",
                    answer: "Yes. We are a Hyderabad hospital accepting insurance for ENT procedures."
                }
            ],

            customCta: {
                heading: "Clear Your Sinus Blockages Safely",
                description: "If you have ongoing sinus problems that don’t improve with medication, book a consultation for FESS surgery at Stork Hospital, Hyderabad. Our expert ENT team ensures precise, safe, and effective treatment for lasting relief.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "1-2 Hours",
                anesthesia: "General Anesthesia",
                hospitalStay: "Day-care / 1 Day",
                recoveryTime: "1 Week",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rao",
                role: "Senior ENT Surgeon",
                experience: "25+ Years Experience"
            }
        }
    }

    if (slug === "foot-or-ankle-pain") {
        return {
            slug: slug,
            title: "Expert Foot & Ankle Pain Management – Stork Hospital, Hyderabad",
            subheading: "Your Path to Relief from Foot & Ankle Pain",
            breadcrumbTitle: "Foot & Ankle Pain",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Every step matters. Discomfort or pain in your feet or ankles can quickly interfere with daily routines—from morning walks to work commutes. At Stork Multispecialty Hospital, Hyderabad, we recognize the importance of healthy movement and provide advanced care for foot and ankle conditions using evidence-based practices and personalized treatment.

For patients seeking reliable foot and ankle pain treatment in Hyderabad, our multidisciplinary care team ensures swift diagnosis and effective relief through both medical and physical therapy options.`,

            overview: {
                heading: "Why Trust Stork Hospital for Lower Limb Pain?",
                intro: "Integrated orthopedic services for reliable foot and ankle care.",
                items: [
                    "Renowned foot and ankle orthopedic specialists in Hyderabad",
                    "Precision diagnostics with in-house X-rays, MRI, and ultrasound",
                    "Customized treatment plans for athletes, seniors, and professionals",
                    "Structured physiotherapy support for every stage of recovery",
                    "Walk-in availability near Kondapur and same-day appointments",
                    "Full insurance support for orthopedic and rehabilitation services"
                ]
            },
            fullDescription: [
                "**What We Treat – Conditions Covered**",
                "Ligament injuries and chronic ankle sprains, Plantar fasciitis and heel spurs, Achilles tendon ruptures and inflammation, Foot fractures and stress-related bone injuries, Flat foot, high arches, and other structural issues, Bunions, hammertoes, and deformities, Joint inflammation due to arthritis or gout, Diabetic foot care and neuropathic complications."
            ],

            conditionsHeading: "How We Approach Foot & Ankle Treatment",
            conditionsTreated: [
                "Medication therapy: Anti-inflammatory drugs, pain relief",
                "Rehab services: Range of motion exercises, strength building, posture correction",
                "Custom orthotic devices: Insoles, bracing, and supportive footwear",
                "Surgical correction: Arthroscopy, tendon repair, deformity correction if required",
                "Recovery guidance: Post-surgical rehab and progress monitoring"
            ],

            procedureHeading: "What Happens During Your Visit",
            procedureSteps: [
                {
                    title: "Assessment",
                    description: "Assessment by a top orthopedic consultant in Hyderabad."
                },
                {
                    title: "Diagnostics",
                    description: "Appropriate imaging or diagnostic testing."
                },
                {
                    title: "Plan Review",
                    description: "A detailed review of treatment options."
                },
                {
                    title: "Implementation",
                    description: "Setup of rehab, therapy, or surgical procedures as needed."
                }
            ],

            benefitsHeading: "Patient Benefits",
            benefits: [
                "Swift diagnosis and effective relief",
                "Minimizing patient wait time",
                "Affordable and accessible care",
                "Restore movement and prevent recurrence",
                "Environment focused on recovery"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "Patient FAQs – Foot & Ankle Services",
            faqs: [
                {
                    question: "How do I know if my foot pain needs medical attention?",
                    answer: "If pain persists beyond a few days or causes swelling, instability, or reduced mobility, it’s time to see a specialist."
                },
                {
                    question: "Can foot and ankle conditions heal without surgery?",
                    answer: "Yes, many respond to therapy, rest, and supportive devices. Surgery is reserved for severe cases or failed conservative care."
                },
                {
                    question: "Do you provide care for diabetic foot issues?",
                    answer: "Yes. We offer preventive foot screenings, wound care, and vascular assessments for diabetic patients."
                },
                {
                    question: "Is my orthopedic care covered under insurance?",
                    answer: "Yes. As a trusted Hyderabad hospital accepting insurance, Stork supports insurance-linked diagnostics, treatment, and follow-ups."
                }
            ],

            customCta: {
                heading: "Let’s Get You Back on Track",
                description: "You don’t have to live with pain or restricted movement. Book an appointment at Stork Hospital today to consult a leading orthopedic surgeon in Hyderabad and take confident steps toward recovery and better foot health.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Local",
                hospitalStay: "Outpatient",
                recoveryTime: "Varies",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Abhinandan",
                role: "Senior Orthopedic Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "foreskin-infection") {
        return {
            slug: slug,
            title: "Foreskin Infection – Stork Hospital, Hyderabad",
            subheading: "Expert Diagnosis and Treatment for Foreskin-Related Infections",
            breadcrumbTitle: "Foreskin Infection",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `A foreskin infection occurs when bacteria, fungi, or viruses cause irritation, redness, swelling, or pain in the foreskin. It is often linked to poor hygiene, underlying health conditions, or sexually transmitted infections. In many cases, the infection also affects the glans penis (balanitis) or both the glans and foreskin (balanoposthitis).

At Stork Multispecialty Hospital, Hyderabad, our experienced urologists offer confidential, accurate diagnosis and targeted treatments for foreskin infections, aiming for quick relief, prevention of complications, and long-term genital health.`,

            overview: {
                heading: "Why Choose Stork Hospital for Foreskin Infection Care",
                intro: "Specialist urological care for effective treatment and relief.",
                items: [
                    "Specialist urologists with expertise in male genital and foreskin disorders",
                    "Diagnostic center in Hyderabad for precise identification of the infection’s cause",
                    "Advanced surgical center for cases requiring circumcision or corrective procedures",
                    "24/7 emergency hospital near Hitech City for severe infections or swelling",
                    "Insurance accepted at Stork Hospital for eligible procedures",
                    "Walk-in clinic near Kondapur for private, same-day consultations"
                ]
            },
            fullDescription: [
                "**Causes of Foreskin Infections**",
                "Poor genital hygiene, Fungal infections (Candida), Bacterial infections, STIs, Allergic reactions, Tight foreskin (phimosis), Diabetes or immune conditions.",
                "**Symptoms of Foreskin Infection**",
                "Redness and swelling of the foreskin, Pain during urination or sexual activity, Discharge with foul odor, Itching, burning, or soreness, Difficulty retracting the foreskin."
            ],

            conditionsHeading: "Treatment Options at Stork Hospital",
            conditionsTreated: [
                "Medical Treatment: Antifungal creams, antibiotics, antiviral therapy, mild steroid creams",
                "Lifestyle & Hygiene: Gentle daily cleaning, keeping dry, sugar management in diabetics",
                "Surgical Intervention: Circumcision to prevent recurrence, Preputioplasty for preservation"
            ],

            procedureHeading: "Recovery and Aftercare",
            procedureSteps: [
                {
                    title: "Healing Time",
                    description: "Most infections clear within 5–10 days with proper treatment."
                },
                {
                    title: "Hygiene",
                    description: "Continue hygiene practices to avoid recurrence."
                },
                {
                    title: "Medication",
                    description: "Complete all prescribed medications."
                },
                {
                    title: "Follow-up",
                    description: "Return for follow-up if symptoms persist or worsen."
                }
            ],

            benefitsHeading: "Benefits of Treatment",
            benefits: [
                "Quick relief from pain and itching",
                "Prevention of complications",
                "Long-term genital health",
                "Reduced recurrence risk",
                "Confidential and expert care"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Foreskin Infection",
            faqs: [
                {
                    question: "Is a foreskin infection contagious?",
                    answer: "It can be if caused by STIs or fungal infections, but not all cases are transmissible."
                },
                {
                    question: "Can it heal on its own?",
                    answer: "Mild cases may improve with better hygiene, but medical care ensures faster recovery and prevents complications."
                },
                {
                    question: "Does circumcision prevent foreskin infections?",
                    answer: "Yes, circumcision significantly reduces the risk of recurring infections."
                },
                {
                    question: "Is it linked to cancer?",
                    answer: "No, but repeated untreated infections can cause scarring and other complications."
                }
            ],

            customCta: {
                heading: "Book Your Foreskin Infection Consultation",
                description: "If you have swelling, pain, or discharge under the foreskin, book an appointment at Stork Hospital to meet a specialist urologist in Hyderabad for expert care and lasting relief.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Local",
                hospitalStay: "Outpatient",
                recoveryTime: "5-10 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Nanda Kishore",
                role: "Senior Urologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "frenuloplasty-surgery") {
        return {
            slug: slug,
            title: "Frenuloplasty Surgery – Stork Hospital, Hyderabad",
            subheading: "Advanced Surgical Solution for Short or Tight Penile Frenulum",
            breadcrumbTitle: "Frenuloplasty Surgery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Frenuloplasty is a simple yet effective procedure designed to treat a condition known as frenulum breve — where the band of tissue (frenulum) connecting the underside of the penis to the foreskin is too short or tight. This condition can lead to discomfort during erections, tearing of the skin, or difficulty retracting the foreskin.

At Stork Multispecialty Hospital, Hyderabad, our urology specialists perform frenuloplasty using modern surgical techniques to ensure minimal discomfort, quicker healing, and preservation of natural appearance and function.`,

            overview: {
                heading: "Why Patients Trust Stork Hospital for Frenuloplasty",
                intro: "Expert care for foreskin-preserving procedures.",
                items: [
                    "Expert urologists with extensive experience in men’s health and foreskin-preserving procedures",
                    "Advanced surgical center in Hyderabad with precision tools for safe, effective treatment",
                    "24/7 emergency hospital near Hitech City for urgent urological issues",
                    "Insurance accepted at Stork Hospital with upfront pricing and no hidden costs",
                    "Walk-in clinic near Kondapur for private and discreet consultations",
                    "End-to-end care — from evaluation and surgery to recovery and long-term results"
                ]
            },
            fullDescription: [
                "**When Frenuloplasty is Needed**",
                "Persistent pain or tightness during erections, Frequent tearing or scarring of the frenulum, Difficulty in retracting the foreskin comfortably, Desire to treat frenulum issues without undergoing circumcision.",
                "**Advantages of Frenuloplasty at Stork Hospital**",
                "Retains the foreskin while releasing tension in the frenulum, Performed under local or general anesthesia for complete comfort, Minimal downtime — most patients resume light activities within days, Improved sexual comfort and flexibility, Daycare procedure with same-day discharge."
            ],

            conditionsHeading: "Indications for Surgery",
            conditionsTreated: [
                "Frenulum Breve (Short Frenulum)",
                "Pain during intercourse due to tight frenulum",
                "Recurrent tearing or bleeding of the frenulum",
                "Difficulty retracting foreskin due to frenulum tightness"
            ],

            procedureHeading: "How Frenuloplasty is Performed",
            procedureSteps: [
                {
                    title: "Initial Consultation",
                    description: "Physical examination and diagnosis by a specialist urologist."
                },
                {
                    title: "Anesthesia Administration",
                    description: "Local or general anesthesia depending on patient preference."
                },
                {
                    title: "Frenulum Release",
                    description: "A small incision made to loosen or lengthen the frenulum."
                },
                {
                    title: "Suturing",
                    description: "Dissolvable stitches placed for natural healing."
                },
                {
                    title: "Post-Operative Care",
                    description: "Detailed instructions on hygiene and recovery activities."
                }
            ],

            benefitsHeading: "Benefits of Treatment",
            benefits: [
                "Retains the foreskin",
                "Minimal discomfort",
                "Quicker healing",
                "Preservation of sensation",
                "Improved function"
            ],

            risks: [],
            recoveryTimeline: [
                "Return to work/routine: 2–3 days",
                "Avoid sexual activity: 4–6 weeks",
                "Keep area clean and dry"
            ],

            faqHeading: "FAQs – Frenuloplasty Surgery",
            faqs: [
                {
                    question: "Is frenuloplasty a painful procedure?",
                    answer: "No. The surgery is pain-free under anesthesia, with only mild tenderness afterward."
                },
                {
                    question: "Will it reduce sensitivity?",
                    answer: "No. Sensitivity is maintained, and many men experience increased comfort post-procedure."
                },
                {
                    question: "Is circumcision required?",
                    answer: "Not usually. Frenuloplasty allows the foreskin to be preserved."
                },
                {
                    question: "Does insurance cover the procedure?",
                    answer: "Yes. Stork Hospital works with most insurance plans to cover medically necessary cases."
                }
            ],
            customCta: {
                heading: "Book Your Frenuloplasty Consultation",
                description: "If a short frenulum is affecting your comfort or sexual health, schedule a confidential consultation at Stork Hospital to meet a specialist urologist in Hyderabad and discuss your treatment options.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "30-45 Min",
                anesthesia: "Local / General",
                hospitalStay: "Daycare",
                recoveryTime: "2-3 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Nanda Kishore",
                role: "Senior Urologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "gallstone") {
        return {
            slug: slug,
            title: "Gallstone Surgery – Stork Hospital, Hyderabad",
            subheading: "Effective Surgical Solutions for Gallstone Discomfort",
            breadcrumbTitle: "Gallstone Surgery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Gallstones are solid clusters that form inside the gallbladder, typically made from cholesterol or bile components. Often silent, these stones can cause sudden, sharp abdominal pain or digestive disturbances when they block bile ducts. At Stork Hospital, Hyderabad, we offer accurate diagnosis and expert surgical management to resolve gallstone issues and support lasting digestive wellness.

Our skilled medical team performs laparoscopic gallbladder surgery in Hyderabad, emphasizing precision, comfort, and shorter recovery periods through minimally invasive procedures.`,

            overview: {
                heading: "What Makes Stork Hospital the Right Choice",
                intro: "Trusted center for gallstone surgery in Hyderabad.",
                items: [
                    "Experienced surgeons in advanced keyhole procedures",
                    "Modern diagnostic and surgical infrastructure",
                    "Efficient, patient-friendly hospital processes",
                    "Supportive care before, during, and after surgery",
                    "Trusted center for gallstone surgery in Hyderabad"
                ]
            },
            fullDescription: [
                "**Gallstones: Causes and Symptoms**",
                "Gallstones arise when bile chemistry becomes unbalanced. Symptoms include: Sharp pain under the ribs or right shoulder, Nausea, vomiting, bloating, Yellowish skin or eyes (jaundice), Indigestion after fatty meals.",
                "**Treatment Tailored to Your Needs**",
                "**Laparoscopic Gallbladder Removal (Cholecystectomy):** Minimally invasive, prevents future stones, <60 min procedure, daycare option.",
                "**Non-Surgical Observation:** Reserved for asymptomatic cases, focuses on diet and monitoring."
            ],

            conditionsHeading: "Symptoms & Complications",
            conditionsTreated: [
                "Sharp abdominal pain",
                "Nausea and vomiting",
                "Jaundice (yellow skin/eyes)",
                "Indigestion after fatty meals",
                "Gallbladder infection or pancreatitis"
            ],

            procedureHeading: "Recovery and Lifestyle After Surgery",
            procedureSteps: [
                {
                    title: "Immediate Post-Op",
                    description: "Temporary soreness that subsides in a day or two."
                },
                {
                    title: "Short-Term Recovery",
                    description: "Return to light activity and meals within a couple of days."
                },
                {
                    title: "Full Recovery",
                    description: "Full recovery usually achieved within 1–2 weeks."
                },
                {
                    title: "Long-Term Diet",
                    description: "Most patients have no long-term dietary restrictions."
                }
            ],

            benefitsHeading: "Benefits of Laparoscopic Surgery",
            benefits: [
                "Minimally invasive (small cuts)",
                "Less pain than open surgery",
                "Quicker recovery",
                "Daycare or short-stay",
                "Prevents future stone formation"
            ],

            risks: [],
            recoveryTimeline: [
                "Light activity: 2-3 days",
                "Full recovery: 1-2 weeks",
                "Diet: Normal diet soon after"
            ],

            faqHeading: "FAQs – Gallstone Surgery Insights",
            faqs: [
                {
                    question: "Do I need surgery if I have gallstones?",
                    answer: "Only if they cause symptoms or complications. Otherwise, monitoring may be sufficient."
                },
                {
                    question: "Will gallstones reoccur post-surgery?",
                    answer: "No. Removal of the gallbladder prevents new stone formation in that area."
                },
                {
                    question: "Is the laparoscopic method safe?",
                    answer: "Absolutely. It’s minimally invasive, low-risk, and widely preferred for quicker healing."
                },
                {
                    question: "Do I need a long-term diet change after surgery?",
                    answer: "Minor adjustments are helpful early on, but most people resume regular diets."
                }
            ],

            customCta: {
                heading: "Choose Lasting Comfort and Expert Care",
                description: "Book your gallstone consultation at Stork Hospital—Hyderabad’s leading center for gallbladder health.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "45-60 Min",
                anesthesia: "General",
                hospitalStay: "Daycare / 1 Day",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Venu Gopal",
                role: "Senior Surgical Gastroenterologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "gastrointestinal-issues") {
        return {
            slug: slug,
            title: "Gastrointestinal Issues – Stork Hospital, Hyderabad",
            subheading: "Complete Digestive Health Care for All Ages",
            breadcrumbTitle: "GI Issues",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Gastrointestinal (GI) issues involve the digestive tract, including the esophagus, stomach, intestines, liver, pancreas, and gallbladder. Those conditions can cause discomfort, affect nutrient absorption, and impact overall well-being. At Stork Multispecialty Hospital, Hyderabad, our gastroenterologists and digestive health specialists provide comprehensive care for a wide range of GI conditions, focusing on accurate diagnosis, effective treatment, and preventive strategies.`,

            overview: {
                heading: "Why Choose Stork Hospital for Gastrointestinal Care",
                intro: "Comprehensive GI care with advanced diagnostics and treatment.",
                items: [
                    "Experienced gastroenterologists and GI surgeons",
                    "In-house diagnostic center for endoscopy, colonoscopy, and imaging",
                    "Advanced surgical center for minimally invasive procedures",
                    "24/7 emergency care for GI bleeding or severe pain",
                    "Transparent cost estimates and insurance acceptance",
                    "Same-day consultations and walk-in clinic options",
                    "Multidisciplinary approach with dietitians and specialists"
                ]
            },
            fullDescription: [
                "**Understanding GI Health**",
                "Common causes of GI issues include infections, lifestyle factors, chronic diseases, and structural abnormalities. Early diagnosis is key to preventing complications.",
                "**Comprehensive Care Approach**",
                "We offer a full spectrum of services from medical management of acid reflux and IBS to advanced surgical interventions for gallstones and GI cancers."
            ],

            conditionsHeading: "Gastrointestinal Issues We Treat",
            conditionsTreated: [
                "Acid reflux (GERD) and heartburn",
                "Gastritis and peptic ulcers",
                "IBS and Inflammatory Bowel Disease (IBD)",
                "Gallstones and bile duct disorders",
                "Pancreatitis and liver diseases",
                "Gastrointestinal infections",
                "Constipation, diarrhea, and bloating",
                "GI cancers (stomach, colon, liver, pancreas)"
            ],

            procedureHeading: "Our Treatment Approach",
            procedureSteps: [
                {
                    title: "Comprehensive Diagnosis",
                    description: "Physical exam, symptom review, and advanced testing like endoscopy, colonoscopy, ultrasound, and CT/MRI."
                },
                {
                    title: "Medical Management",
                    description: "Medications to control acidity or infection, along with dietary modifications and nutritional support."
                },
                {
                    title: "Advanced Interventions",
                    description: "Endoscopic procedures for polyp removal or stricture dilation, and interventional radiology if needed."
                },
                {
                    title: "Surgical Solutions",
                    description: "Laparoscopic surgery for conditions like gallstones, hernias, or appendicitis when medical management isn't enough."
                }
            ],

            benefitsHeading: "Benefits of Expert GI Care",
            benefits: [
                "Accurate diagnosis of root causes",
                "Effective symptom relief",
                "Prevention of long-term complications",
                "Minimally invasive treatment options",
                "Personalized diet and lifestyle guidance"
            ],

            risks: [],
            recoveryTimeline: [
                "Diagnosis: Same day or 24-48 hours",
                "Medical Treatment: Immediate start",
                "Surgical Recovery: Varies by procedure"
            ],

            faqHeading: "FAQs – Gastrointestinal Issues",
            faqs: [
                {
                    question: "When should I see a doctor for digestive issues?",
                    answer: "Seek help if you have persistent pain, unexplained weight loss, blood in stool, or difficulty swallowing."
                },
                {
                    question: "Are all GI issues diet-related?",
                    answer: "No. While diet is a major factor, infections, genetics, and other diseases also play significant roles."
                },
                {
                    question: "Can lifestyle changes prevent GI conditions?",
                    answer: "Yes. A balanced diet, hydration, exercise, and avoiding tobacco/alcohol help maintain digestive health."
                },
                {
                    question: "Is treatment covered by insurance?",
                    answer: "Yes. Stork Hospital accepts most insurance plans and offers cost clarity before starting treatment."
                }
            ],

            customCta: {
                heading: "Book Your Digestive Health Consultation",
                description: "If you’re struggling with digestive discomfort, don’t ignore the signs. Book an appointment at Stork Hospital to consult a gastroenterology specialist.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "20-30 Min (Consult)",
                anesthesia: "None / Sedation",
                hospitalStay: "Outpatient",
                recoveryTime: "Immediate",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Venu Gopal",
                role: "Senior Surgical Gastroenterologist",
                experience: "20+ Years Experience"
            }
        }
    }



    if (slug === "headache-or-migraine") {
        return {
            slug: slug,
            title: "Headache & Migraine Relief Center – Stork Hospital, Hyderabad",
            subheading: "Comprehensive Care for Headaches and Migraines",
            breadcrumbTitle: "Headache & Migraine",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Recurring headaches and migraines can greatly impact your ability to function and enjoy life. While some episodes are mild and occasional, others can become persistent and debilitating. At Stork Multispecialty Hospital, Hyderabad, we provide targeted treatment for all forms of headache disorders, using a mix of clinical expertise, modern diagnostics, and personalized care strategies.`,

            overview: {
                heading: "Why Stork Hospital is a Trusted Name for Headache Care",
                intro: "Specialized care for chronic and complex neurological conditions.",
                items: [
                    "Dedicated neurologist in Hyderabad with expertise in headache disorders",
                    "Access to on-site CT, MRI, EEG, and brain imaging",
                    "Holistic headache management, from medicines to trigger prevention",
                    "Proven therapies including nerve blocks for resistant cases",
                    "Walk-in clinic near Kondapur for timely consultations",
                    "Insurance-friendly hospital with broad coverage",
                    "Fast, accurate diagnosis in a zero-wait environment"
                ]
            },
            fullDescription: [
                "**Understanding Headache Disorders**",
                "Headaches can range from tension-type discomfort to debilitating migraines. Accurate diagnosis is crucial for effective treatment.",
                "**Patient-Centric Approach**",
                "Whether you’re experiencing episodic migraines, tension headaches, or complex neurological triggers, our experienced neurologists aim to provide effective and sustainable relief using a compassionate approach.",
                "**Holistic Solutions**",
                "We not only treat symptoms but also explore and address underlying causes through lifestyle modifications, medication, and advanced therapies."
            ],

            conditionsHeading: "Headache Types Treated at Stork Hospital",
            conditionsTreated: [
                "Migraines (with or without visual aura)",
                "Chronic daily headaches",
                "Cluster and thunderclap headaches",
                "Tension-related headaches",
                "Sinus-triggered headaches",
                "Rebound headaches (medication overuse)",
                "Secondary headaches (infections, hypertension, tumors)"
            ],

            procedureHeading: "Tailored Headache & Migraine Treatments",
            procedureSteps: [
                {
                    title: "Neurologic Consultation",
                    description: "Evaluation of patterns, frequency, and possible causes by an expert neurologist."
                },
                {
                    title: "Imaging & Testing",
                    description: "Brain scans (CT/MRI) and lab analysis to rule out structural causes."
                },
                {
                    title: "Pharmacological Treatment",
                    description: "Acute and preventive migraine medications tailored to your needs."
                },
                {
                    title: "Advanced Procedures",
                    description: "Nerve blocks or Botox injections for severe, resistant cases."
                }
            ],

            benefitsHeading: "Benefits of Specialized Care",
            benefits: [
                "Accurate diagnosis of headache type",
                "Effective pain relief strategies",
                "Identification of triggers",
                "Prevention of chronic recurrence",
                "Improved quality of life"
            ],

            risks: [],
            recoveryTimeline: [
                "Consultation: Same day",
                "Pain Relief: Variable based on treatment",
                "Follow-up: As recommended"
            ],

            faqHeading: "FAQs – Headache & Migraine Care",
            faqs: [
                {
                    question: "How do I know if my headache is serious?",
                    answer: "Consult a neurologist if headaches are frequent, severe, sudden-onset, or disrupt daily life."
                },
                {
                    question: "Can migraines be permanently cured?",
                    answer: "While a permanent cure may not be possible, most sufferers find significant relief with proper treatment."
                },
                {
                    question: "Do you provide online consultations?",
                    answer: "Yes. We offer online doctor consultations in Hyderabad for both new and follow-up patients."
                },
                {
                    question: "Does insurance cover headache treatment?",
                    answer: "Yes. We accept most insurance plans for neurological care, including diagnostics and consultation."
                }
            ],

            customCta: {
                heading: "Take Control of Your Health",
                description: "Don’t let migraine or chronic headaches rule your life. Book an appointment at Stork Hospital to consult a highly experienced neurologist.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "20-30 Min (Consult)",
                anesthesia: "None",
                hospitalStay: "Outpatient",
                recoveryTime: "Immediate",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Srikanth",
                role: "Senior Neurologist",
                experience: "15+ Years Experience"
            }
        }
    }



    if (slug === "hernia") {
        return {
            slug: slug,
            title: "Hernia Surgery – Stork Hospital, Hyderabad",
            subheading: "Precise Repair for Lasting Relief",
            breadcrumbTitle: "Hernia Surgery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `A hernia is a common condition where an internal organ or tissue pushes through a weak spot in the muscle, often appearing as a visible bulge. At Stork Hospital, Hyderabad, we specialize in modern hernia treatment that blends precision surgery with a patient-first approach. Whether mild or recurrent, our surgeons ensure timely diagnosis, advanced treatment, and a smooth road to recovery.`,

            overview: {
                heading: "Why Patients Trust Stork Hospital for Hernia Care",
                intro: "Expert surgical care with a focus on quick recovery and minimal recurrence.",
                items: [
                    "Board-certified general and laparoscopic surgeons",
                    "Advanced laparoscopic hernia repair techniques",
                    "Female-friendly environment and support staff",
                    "Transparent communication and detailed recovery guidance",
                    "Insurance tie-ups and assistance with paperwork",
                    "Minimally invasive options for quicker healing",
                    "Trusted outcomes for recurrent hernia cases"
                ]
            },
            fullDescription: [
                "**Understanding Hernias**",
                "While some hernias start painlessly, they may enlarge or become problematic over time, leading to discomfort or complications like strangulation. Surgical correction is often the only permanent solution.",
                "**Our Surgical Expertise**",
                "We offer both laparoscopic (keyhole) and open repair surgeries, tailored to your condition. Mesh reinforcement is commonly used to strengthen the area and prevent recurrence."
            ],

            conditionsHeading: "Common Types of Hernias We Treat",
            conditionsTreated: [
                "Inguinal Hernia (Groin, common in men)",
                "Umbilical Hernia (Navel, post-pregnancy/children)",
                "Femoral Hernia (Upper thigh, common in women)",
                "Hiatal Hernia (Stomach/Diaphragm, reflux-linked)",
                "Incisional Hernia (Previous surgical sites)",
                "Recurrent Hernias",
                "Complex Abdominal Wall Hernias"
            ],

            procedureHeading: "Your Treatment Journey",
            procedureSteps: [
                {
                    title: "Consultation & Evaluation",
                    description: "Comprehensive physical exam and imaging to determine the type and severity of the hernia."
                },
                {
                    title: "Surgical Planning",
                    description: "Choosing the best approach—Laparoscopic or Open—based on your health condition."
                },
                {
                    title: "The Procedure",
                    description: "Most surgeries are day-care procedures performed under anesthesia using advanced tools and mesh reinforcement."
                },
                {
                    title: "Recovery & Aftercare",
                    description: "Laparoscopic patients often resume light activity in 3–5 days, with complete healing in 2–4 weeks."
                }
            ],

            benefitsHeading: "Benefits of Modern Hernia Repair",
            benefits: [
                "Minimally invasive techniques (Laparoscopy)",
                "Reduced post-operative pain",
                "Quicker return to daily activities",
                "Lower risk of recurrence with mesh",
                "Minimal scarring"
            ],

            risks: [],
            recoveryTimeline: [
                "Hospital Stay: Day-care or 1 Day",
                "Light Activity: 3–5 Days",
                "Full Recovery: 2–4 Weeks"
            ],

            faqHeading: "FAQs – Hernia Surgery",
            faqs: [
                {
                    question: "How do I know if I need surgery?",
                    answer: "Surgery is recommended if the hernia causes pain, grows, or impacts daily life."
                },
                {
                    question: "Is laparoscopic surgery painful?",
                    answer: "It generally involves less pain and faster healing compared to open surgery."
                },
                {
                    question: "Can the hernia return after surgery?",
                    answer: "Mesh reinforcement and precise techniques significantly minimize recurrence risks."
                },
                {
                    question: "When can I return to work?",
                    answer: "Light activity typically resumes in a few days; intense tasks may take 3–4 weeks."
                }
            ],

            customCta: {
                heading: "Get Expert Hernia Care",
                description: "Don't let a hernia disrupt your life. Schedule your consultation today at Stork Hospital—Hyderabad’s trusted name in hernia surgery.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "45-90 Min",
                anesthesia: "General / Spinal",
                hospitalStay: "Daycare / 1 Day",
                recoveryTime: "2-4 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Venu Gopal",
                role: "Senior General & Laparoscopic Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }



    if (slug === "high-risk-pregnancy") {
        return {
            slug: slug,
            title: "High-Risk Pregnancy Management – Stork Hospital, Hyderabad",
            subheading: "Advanced Maternal-Fetal Care for Safe Delivery",
            breadcrumbTitle: "High-Risk Pregnancy",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Not all pregnancies follow the same path. A high-risk pregnancy involves additional medical challenges that could affect the mother, the baby, or both. At Stork Hospital, Hyderabad, we transform uncertainty into reassurance with advanced maternal-fetal care, constant monitoring, and an expert team, helping mothers-to-be move confidently through complex pregnancies toward safe delivery.`,

            overview: {
                heading: "Why Stork Hospital is the Preferred Center for High-Risk Pregnancies",
                intro: "Choosing the right hospital could mean the difference between complication and confidence.",
                items: [
                    "Senior Consultants in Maternal-Fetal Medicine",
                    "Real-Time Diagnostics & In-House Lab",
                    "Level 3 NICU for immediate newborn support",
                    "Emergency Obstetric Response Team available 24/7",
                    "Holistic Support: Nutrition, physiotherapy, and emotional well-being",
                    "Seamless continuity from first trimester to postnatal care",
                    "Highly rated for safe delivery and private rooms"
                ]
            },
            fullDescription: [
                "**What is High-Risk Pregnancy Management?**",
                "It involves specialized care for pregnancies with additional health risks due to pre-existing conditions, age, or complications. Our goal is early detection and management to ensure the best possible outcome.",
                "**Who Should Consider This Care?**",
                "It is recommended for women over 35, those with chronic illnesses (diabetes, hypertension), multiple pregnancies (twins/triplets), history of miscarriage, or IVF conceptions."
            ],

            conditionsHeading: "Conditions We Help Manage",
            conditionsTreated: [
                "Chronic illnesses (Diabetes, Hypertension, Thyroid)",
                "Advanced maternal age (35+) or teen pregnancies",
                "Multiple fetuses (twins, triplets)",
                "History of miscarriages or preterm births",
                "Placenta Previa, Accreta, or Abruption",
                "Autoimmune conditions (Lupus, etc.)",
                "Preeclampsia or Eclampsia risks",
                "Fetal growth restriction or defects"
            ],

            procedureHeading: "What to Expect at Stork Hospital",
            procedureSteps: [
                {
                    title: "Comprehensive Risk Review",
                    description: "Initial evaluation, detailed fetal scans, and risk mapping with genetic screenings if advised."
                },
                {
                    title: "Multi-Specialty Oversight",
                    description: "Joint care by obstetricians, fetal medicine experts, and neonatologists with frequent monitoring."
                },
                {
                    title: "In-Hospital Support",
                    description: "Admissions for observation if needed (e.g., high BP), with NICU-ready backup."
                },
                {
                    title: "Safe Delivery Planning",
                    description: "Strategic timing and mode of delivery with a dedicated labor and anesthetic team on standby."
                }
            ],

            benefitsHeading: "Post-Delivery Recovery & Care",
            benefits: [
                "Postnatal health monitoring for mother and baby",
                "Lactation support for C-section or NICU cases",
                "Emotional health check-ins",
                "Newborn growth monitoring",
                "Long-term follow-up planning"
            ],

            risks: [],
            recoveryTimeline: [
                "Monitoring: Frequent",
                "Delivery Stay: Varies",
                "NICU Support: Available"
            ],

            faqHeading: "FAQs – High-Risk Pregnancy at Stork Hospital",
            faqs: [
                {
                    question: "Does a high-risk label mean I will need a C-section?",
                    answer: "Not necessarily. Many high-risk pregnancies can still have vaginal deliveries based on evaluation."
                },
                {
                    question: "Will I be admitted in advance?",
                    answer: "Only if close inpatient observation is required; otherwise, care is outpatient-based."
                },
                {
                    question: "How often will I need check-ups?",
                    answer: "Frequency increases with risk, ranging from biweekly to weekly in later stages."
                },
                {
                    question: "Can I have a healthy baby with a high-risk pregnancy?",
                    answer: "Absolutely. With timely, expert oversight, many women deliver healthy babies."
                }
            ],

            customCta: {
                heading: "Expert Care for Your Pregnancy",
                description: "To learn more, book an appointment at Stork Hospital or consult our gynecologist for a complete risk review and management plan.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Ongoing Care",
                anesthesia: "N/A",
                hospitalStay: "Varies",
                recoveryTime: "Postnatal",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Neelima",
                role: "Senior Consultant Obstetrician",
                experience: "15+ Years Experience"
            }
        }
    }



    if (slug === "hip-pain") {
        return {
            slug: slug,
            title: "Hip Pain Treatment – Stork Hospital, Hyderabad",
            subheading: "Relief and Recovery for Better Mobility",
            breadcrumbTitle: "Hip Pain Treatment",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Hip pain can range from mild discomfort to debilitating stiffness, often affecting movement, balance, and overall mobility. Whether it’s due to age-related arthritis, injury, or overuse, ignoring persistent hip pain can lead to complications. At Stork Multispecialty Hospital, Hyderabad, we offer comprehensive diagnosis and treatment for all types of hip-related issues—delivered with clinical precision and a patient-first mindset.`,

            overview: {
                heading: "Why Stork Hospital is a Trusted Choice for Hip Pain Relief",
                intro: "A holistic approach emphasizing accurate diagnosis and tailored treatment.",
                items: [
                    "Senior orthopedic surgeons with hip specialization",
                    "High-end imaging: digital X-rays, MRIs, and ultrasound",
                    "Expertise in non-surgical and surgical approaches",
                    "Dedicated physiotherapy and rehab programs",
                    "Walk-in clinic for same-day doctor appointments",
                    "Insurance accepted for diagnostics and procedures",
                    "Affordable orthopedic packages with no waiting time"
                ]
            },
            fullDescription: [
                "**Understanding Hip Pain**",
                "Hip pain can stem from various causes like arthritis, injuries, or structural issues. Early intervention is key to preventing long-term mobility loss.",
                "**Comprehensive Care Continuum**",
                "From initial physical evaluation and advanced imaging to personalized medication, therapy, or surgical intervention, we support your journey to a pain-free life."
            ],

            conditionsHeading: "Common Causes of Hip Pain We Treat",
            conditionsTreated: [
                "Osteoarthritis and inflammatory arthritis",
                "Hip fractures or dislocations",
                "Labral tears and cartilage damage",
                "Bursitis and tendonitis",
                "Hip impingement syndrome",
                "Sports injuries and overuse syndromes",
                "Post-surgical hip pain",
                "Avascular necrosis (AVN)"
            ],

            procedureHeading: "Our Comprehensive Management Approach",
            procedureSteps: [
                {
                    title: "Consultation & Diagnostics",
                    description: "Evaluation by a leading orthopedic surgeon and on-site imaging to pinpoint the cause."
                },
                {
                    title: "Conservative Management",
                    description: "Anti-inflammatories, pain control medications, and targeted physiotherapy for strength and flexibility."
                },
                {
                    title: "Interventional Therapies",
                    description: "Corticosteroid or PRP injections to reduce inflammation and promote healing."
                },
                {
                    title: "Surgical Solutions",
                    description: "Minimally invasive arthroscopy or joint replacement (partial/total) when conservative methods fail."
                }
            ],

            benefitsHeading: "Benefits of Expert Hip Care",
            benefits: [
                "Significant pain reduction",
                "Improved joint mobility and balance",
                "Personalized recovery plans",
                "Access to advanced surgical options",
                "Comprehensive rehabilitation under one roof"
            ],

            risks: [],
            recoveryTimeline: [
                "Diagnosis: Same day",
                "Therapy: Ongoing",
                "Surgery Recovery: Varies by procedure"
            ],

            faqHeading: "FAQs – Hip Pain Treatment",
            faqs: [
                {
                    question: "Can hip pain be treated without surgery?",
                    answer: "Yes. Many cases respond to medications, lifestyle changes, and physiotherapy."
                },
                {
                    question: "How do I know if I need a hip replacement?",
                    answer: "If pain limits daily activities and resists conservative treatment, replacement may be suggested."
                },
                {
                    question: "Is hip arthroscopy painful?",
                    answer: "It’s minimally invasive with quicker recovery than open surgery. Most patients resume tasks within weeks."
                },
                {
                    question: "Do you accept insurance for hip treatment?",
                    answer: "Yes. We accept insurance for orthopedic procedures and diagnostics."
                }
            ],

            customCta: {
                heading: "Take the First Step Toward a Pain-Free Life",
                description: "Hip pain shouldn’t stop you from living fully. Book an appointment at Stork Hospital to meet with the best orthopedic surgeon in Hyderabad.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "20-30 Min (Consult)",
                anesthesia: "N/A",
                hospitalStay: "Outpatient",
                recoveryTime: "Variable",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Raghu",
                role: "Senior Orthopedic Surgeon",
                experience: "18+ Years Experience"
            }
        }
    }



    if (slug === "hip-replacement-surgery") {
        return {
            slug: slug,
            title: "Hip Replacement Surgery – Stork Hospital, Hyderabad",
            subheading: "Advanced Solutions for Lasting Relief",
            breadcrumbTitle: "Hip Replacement Surgery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Hip Replacement Surgery, or total hip arthroplasty, is a procedure where damaged hip joint portions are replaced with durable artificial implants. It’s typically for advanced arthritis or severe injury limiting movement. At Stork Multispecialty Hospital, Hyderabad, we combine modern surgical technology with orthopedic expertise to restore pain-free mobility and improve quality of life.`,

            overview: {
                heading: "Why Patients Prefer Stork Hospital for Hip Replacement",
                intro: "Modern surgical technology combined with proven orthopedic expertise.",
                items: [
                    "Orthopedic surgeons with years of joint replacement experience",
                    "State-of-the-art diagnostic center for X-ray, MRI, and CT",
                    "Advanced surgical center with precision navigation",
                    "24/7 emergency hospital near Hitech City",
                    "Insurance accepted with complete price transparency",
                    "Walk-in clinic for prompt consultations",
                    "Structured physiotherapy programs for faster rehab"
                ]
            },
            fullDescription: [
                "**What is Hip Replacement Surgery?**",
                "It involves replacing damaged bone and cartilage with a high-quality artificial implant. The goal is to relieve pain, improve stability, and restore normal movement.",
                "**Signs You Might Need Surgery**",
                "Persistent pain, difficulty walking or bending, limited range of motion, and severe joint damage visible on imaging are key indicators."
            ],

            conditionsHeading: "When is Hip Replacement Advised?",
            conditionsTreated: [
                "Advanced Osteoarthritis",
                "Rheumatoid Arthritis",
                "Post-traumatic Arthritis",
                "Avascular Necrosis (AVN)",
                "Severe Hip Fractures",
                "Hip Dysplasia",
                "Ankylosing Spondylitis"
            ],

            procedureHeading: "How We Perform Hip Replacement",
            procedureSteps: [
                {
                    title: "Assessment & Planning",
                    description: "Comprehensive evaluation and imaging to create a tailored surgical plan."
                },
                {
                    title: "The Procedure",
                    description: "Removing damaged tissue and placing a durable implant with alignment correction for stability."
                },
                {
                    title: "Minimally Invasive Techniques",
                    description: "Prioritizing smaller incisions and tissue preservation for quicker recovery."
                },
                {
                    title: "Post-Surgery Care",
                    description: "Pain management, early mobilization, and guided physiotherapy to restore strength."
                }
            ],

            benefitsHeading: "Benefits of Modern Hip Replacement",
            benefits: [
                "Restored pain-free mobility",
                "Improved joint stability and balance",
                "Long-lasting implant durability (15-20 years)",
                "Quicker return to daily activities",
                "Enhanced quality of life"
            ],

            risks: [],
            recoveryTimeline: [
                "Walking: 1-2 Days (with aid)",
                "Light Activity: 6-12 Weeks",
                "Full Recovery: Varies"
            ],

            faqHeading: "FAQs – Hip Replacement Surgery",
            faqs: [
                {
                    question: "How long can a hip replacement last?",
                    answer: "With proper care, most modern implants last between 15–20 years."
                },
                {
                    question: "When will I start walking again?",
                    answer: "Most patients are encouraged to walk with assistance within 1–2 days after surgery."
                },
                {
                    question: "When can I resume daily tasks?",
                    answer: "Generally, light activities can be resumed in 6–12 weeks, depending on recovery speed."
                },
                {
                    question: "Is the surgery covered under insurance?",
                    answer: "Yes. We work with a wide network of insurance providers and ensure cost transparency."
                }
            ],

            customCta: {
                heading: "Book Your Hip Replacement Consultation",
                description: "Don’t let hip pain keep you from living life to the fullest. Book an appointment at Stork Hospital to consult a specialist.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "1-2 Hours",
                anesthesia: "General / Spinal",
                hospitalStay: "3-5 Days",
                recoveryTime: "6-12 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Raghu",
                role: "Senior Joint Replacement Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }



    if (slug === "hoodecomy") {
        return {
            slug: slug,
            title: "Hoodectomy – Stork Hospital, Hyderabad",
            subheading: "Precision Intimate Surgery for Comfort and Confidence",
            breadcrumbTitle: "Hoodectomy",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Hoodectomy, also called clitoral hood reduction, is a delicate cosmetic procedure designed to remove excess skin around the clitoris for improved aesthetics, sensation, or hygiene. At Stork Hospital, Hyderabad, we approach this procedure with utmost precision, empathy, and privacy—ensuring that your comfort, safety, and outcomes remain our highest priorities.`,

            overview: {
                heading: "Why Women Choose Stork Hospital for Hoodectomy",
                intro: "Specialized cosmetic gynecology services in a private, supportive environment.",
                items: [
                    "Highly skilled female surgeons with cosmetic gynecology experience",
                    "Absolute discretion and personalized care",
                    "Pain-minimized procedures with advanced techniques",
                    "Private recovery and short hospital stays",
                    "Transparent pricing and ethical guidance",
                    "Focus on both functional and aesthetic satisfaction"
                ]
            },
            fullDescription: [
                "**What is a Hoodectomy?**",
                "The clitoral hood is a natural fold of skin covering the clitoris. Excess skin here can cause discomfort, reduced sensitivity, or hygiene issues. Hoodectomy removes this redundant skin to enhance function and appearance while preserving sensitivity.",
                "**Who Might Benefit?**",
                "Women experiencing discomfort, reduced stimulation, hygiene issues due to trapped moisture, or those desiring a more balanced vulvar appearance may consider this procedure."
            ],

            conditionsHeading: "Reasons for Considering Hoodectomy",
            conditionsTreated: [
                "Discomfort during intimacy or movement",
                "Reduced clitoral sensitivity",
                "Difficulty maintaining hygiene",
                "Trapped moisture or irritation",
                "Aesthetic concerns or self-consciousness",
                "Asymmetry of the clitoral hood"
            ],

            procedureHeading: "How We Perform Hoodectomy",
            procedureSteps: [
                {
                    title: "Pre-Procedure Consultation",
                    description: "Private discussion with an expert surgeon to review expectations and evaluate anatomy."
                },
                {
                    title: "The Procedure",
                    description: "Performed under local anesthesia (30–60 mins), involving fine surgical removal of excess tissue."
                },
                {
                    title: "Precision Techniques",
                    description: "Ensures no visible scarring and preservation of nerve function."
                },
                {
                    title: "Recovery & Aftercare",
                    description: "Mild swelling for 3-5 days; return to non-strenuous activity in 2-3 days."
                }
            ],

            benefitsHeading: "Benefits of Hoodectomy",
            benefits: [
                "Improved aesthetic appearance",
                "Enhanced clitoral sensitivity",
                "Better hygiene and comfort",
                "increased confidence",
                "Minimal downtime"
            ],

            risks: [],
            recoveryTimeline: [
                "Procedure Time: 30-60 Mins",
                "Back to Activity: 2-3 Days",
                "Full Recovery: 3-4 Weeks"
            ],

            faqHeading: "FAQs – Hoodectomy",
            faqs: [
                {
                    question: "Will this procedure affect clitoral sensitivity?",
                    answer: "No. It is designed to preserve sensory nerves while improving access."
                },
                {
                    question: "Is hoodectomy purely cosmetic?",
                    answer: "Not always. Many choose it for physical comfort and hygiene improvement."
                },
                {
                    question: "Can I combine this with labiaplasty?",
                    answer: "Yes. It is often done alongside labiaplasty for full rejuvenation."
                },
                {
                    question: "Is anesthesia required?",
                    answer: "Usually local anesthesia is sufficient, with optional sedation for comfort."
                }
            ],

            customCta: {
                heading: "Rediscover Comfort and Confidence",
                description: "Book a private consultation at Stork Hospital—Hyderabad’s destination for advanced intimate procedures.",
                buttonText: "Book Private Consultation"
            },
            meta: {
                duration: "30-60 Min",
                anesthesia: "Local / Sedation",
                hospitalStay: "Outpatient",
                recoveryTime: "3-4 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Neelima",
                role: "Senior Cosmetic Gynecologist",
                experience: "15+ Years Experience"
            }
        }
    }



    if (slug === "hydrocele") {
        return {
            slug: slug,
            title: "Hydrocele Treatment – Stork Hospital, Hyderabad",
            subheading: "Advanced and Gentle Solutions for Relief",
            breadcrumbTitle: "Hydrocele Treatment",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `A hydrocele occurs when fluid collects around one or both testicles, leading to swelling. While generally painless, it can cause heaviness or discomfort. At Stork Multispecialty Hospital, Hyderabad, our expert urologists specialize in diagnosing and treating hydroceles using modern, minimally invasive surgical techniques that ensure quick recovery.`,

            overview: {
                heading: "Why Patients Trust Stork Hospital for Hydrocele Care",
                intro: "Expert urological care with a focus on minimal disruption to daily life.",
                items: [
                    "Specialized urologists with extensive hydrocelectomy experience",
                    "Fully equipped diagnostic center for accurate evaluation",
                    "Advanced surgical center offering minimally invasive techniques",
                    "24/7 emergency hospital for urgent concerns",
                    "Insurance accepted with clear, upfront cost estimates",
                    "Walk-in clinic for easy, same-day consultations",
                    "Complete aftercare support for complication-free recovery"
                ]
            },
            fullDescription: [
                "**What is a Hydrocele?**",
                "It's a collection of fluid around the testicle, often causing painless swelling. While common in newborns, it can persist or develop in adults due to injury or inflammation.",
                "**Treatment Approach**",
                "We offer watchful waiting for mild cases and minimally invasive hydrocelectomy for persistent ones, ensuring optimal outcomes and fast healing."
            ],

            conditionsHeading: "Causes and Symptoms",
            conditionsTreated: [
                "Congenital Hydrocele (Incomplete closure)",
                "Scrotal Injury or Trauma",
                "Infection or Inflammation",
                "Soft Swelling in Scrotum",
                "Heaviness or Fullness Sensation",
                "Mild Discomfort during activity"
            ],

            procedureHeading: "Treatment Approaches",
            procedureSteps: [
                {
                    title: "Watchful Waiting",
                    description: "Regular monitoring for infants and mild cases that may resolve naturally."
                },
                {
                    title: "Hydrocelectomy (Surgery)",
                    description: "Removal of fluid and sac repair under anesthesia for persistent cases."
                },
                {
                    title: "Minimally Invasive Techniques",
                    description: "Small incisions to reduce post-surgery downtime and discomfort."
                },
                {
                    title: "Recovery & Aftercare",
                    description: "Day-care procedure with same-day discharge and quick return to light activities."
                }
            ],

            benefitsHeading: "Benefits of Expert Treatment",
            benefits: [
                "Relief from heaviness and discomfort",
                "Improved scrotal appearance",
                "Prevention of potential complications",
                "Quick recovery with minimal scarring",
                "Low recurrence rate"
            ],

            risks: [],
            recoveryTimeline: [
                "Surgery: Day-care",
                "Light Activity: 1 Week",
                "Full Recovery: 2-3 Weeks"
            ],

            faqHeading: "FAQs – Hydrocele",
            faqs: [
                {
                    question: "Is a hydrocele harmful?",
                    answer: "Usually not, but it can cause discomfort and should be evaluated to rule out other conditions."
                },
                {
                    question: "What is the recovery time?",
                    answer: "Most patients resume light activities within a week and normal routines in 1–2 weeks."
                },
                {
                    question: "Can hydroceles return after treatment?",
                    answer: "Recurrence is uncommon when the procedure is performed by skilled surgeons."
                },
                {
                    question: "Does insurance cover the surgery?",
                    answer: "Yes. We accept most insurance plans for hydrocele surgery."
                }
            ],

            customCta: {
                heading: "Get Expert Evaluation",
                description: "If you have scrotal swelling or discomfort, schedule a consultation with a specialist urologist at Stork Hospital.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "30-45 Min",
                anesthesia: "Local / General",
                hospitalStay: "Daycare",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Venu Gopal",
                role: "Senior Urologist",
                experience: "20+ Years Experience"
            }
        }
    }



    if (slug === "hymenoplasty") {
        return {
            slug: slug,
            title: "Hymenoplasty – Stork Hospital, Hyderabad",
            subheading: "Discreet Reconstructive Surgery for Personal Healing",
            breadcrumbTitle: "Hymenoplasty",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Hymenoplasty is a delicate and respectful surgical procedure to restore the hymen—a thin layer of tissue at the vaginal entrance. At Stork Hospital, Hyderabad, we create a safe, judgment-free space where your decision is met with understanding, privacy, and expert care.`,

            overview: {
                heading: "Why Choose Stork Hospital for Hymenoplasty?",
                intro: "A private, supportive environment led by an all-women surgical team.",
                items: [
                    "All-women surgical and care team for complete comfort",
                    "Focused on emotional safety and surgical quality",
                    "Completely private surgical rooms and recovery areas",
                    "Clear communication and ethical care",
                    "100% confidential billing and medical records",
                    "Minimally invasive techniques for fast healing"
                ]
            },
            fullDescription: [
                "**About the Procedure**",
                "Hymenoplasty, also called hymenal reconstruction, involves careful suturing or reshaping of hymenal tissue. It aims to recreate a natural-looking hymen, offering personal peace of mind or respecting cultural expectations.",
                "**Who is a Good Candidate?**",
                "You may consider this if your hymen ruptured due to sports or other reasons, you are preparing for a cultural event, or you seek personal healing. We prioritize privacy and respect."
            ],

            conditionsHeading: "Reasons for Consideration",
            conditionsTreated: [
                "Rupture due to sports/activity",
                "Cultural or family expectations",
                "Personal healing after trauma",
                "Desire for emotional closure",
                "Restoration of natural state"
            ],

            procedureHeading: "What to Expect",
            procedureSteps: [
                {
                    title: "Private Consultation",
                    description: "A personal session with a female surgeon to review expectations without pressure."
                },
                {
                    title: "The Surgery",
                    description: "Performed under local anesthesia (30–45 mins) using absorbable sutures."
                },
                {
                    title: "Technique",
                    description: "Repairing or grafting tissue to recreate a natural look with no visible scarring."
                },
                {
                    title: "Recovery",
                    description: "Light soreness for 1–2 days; return to work/daily life usually within 2 days."
                }
            ],

            benefitsHeading: "Benefits of Choosing Stork",
            benefits: [
                "Natural-looking results",
                "Complete confidentiality",
                "Emotional and physical healing",
                "Safe, judgment-free environment",
                "Expert all-women team"
            ],

            risks: [],
            recoveryTimeline: [
                "Procedure: 30-45 Mins",
                "Back to Work: 2 Days",
                "Avoid Intimacy: 6 Weeks"
            ],

            faqHeading: "FAQs – Hymen Repair",
            faqs: [
                {
                    question: "Will the results look natural?",
                    answer: "Yes, our technique ensures that the restored hymen closely mimics its natural state."
                },
                {
                    question: "Is this procedure painful?",
                    answer: "Only mild discomfort, easily managed with medications."
                },
                {
                    question: "How long before an event should I schedule it?",
                    answer: "We suggest scheduling it 4 to 6 weeks in advance of any important event."
                },
                {
                    question: "Will this affect fertility or hormones?",
                    answer: "No. The hymen is unrelated to internal reproductive organs."
                }
            ],

            customCta: {
                heading: "Reclaim Your Comfort",
                description: "Book your private hymenoplasty consultation today at Stork Hospital—Hyderabad’s premier center for intimate and respectful women’s health services.",
                buttonText: "Book Private Consultation"
            },
            meta: {
                duration: "30-45 Min",
                anesthesia: "Local",
                hospitalStay: "Outpatient",
                recoveryTime: "1-2 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Neelima",
                role: "Senior Gynecologist",
                experience: "15+ Years Experience"
            }
        }
    }



    if (slug === "incisional-hernia") {
        return {
            slug: slug,
            title: "Incisional Hernia Surgery – Stork Hospital, Hyderabad",
            subheading: "Dedicated Surgical Repair for Post-Surgery Abdominal Wall Defects",
            breadcrumbTitle: "Incisional Hernia Surgery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `An incisional hernia occurs when tissue protrudes through a weak area in the abdominal muscles, often at the site of a previous surgical incision. At Stork Hospital, Hyderabad, we deliver tailored surgical care to repair incisional hernias and strengthen the abdominal wall for lasting results. We specialize in laparoscopic repair for minimal scarring and faster recovery.`,

            overview: {
                heading: "Why Choose Stork Hospital for Hernia Surgery?",
                intro: "Expertise in abdominal wall reconstruction with a focus on durability and comfort.",
                items: [
                    "Highly experienced surgeons specializing in hernia repair",
                    "State-of-the-art sterile operation theatres",
                    "Premium quality mesh for durable, long-lasting repair",
                    "Comprehensive care from diagnosis through rehabilitation",
                    "Preferred hospital for complex hernia repairs in Hyderabad",
                    "Minimally invasive options for faster healing"
                ]
            },
            fullDescription: [
                "**What Leads to Incisional Hernia Formation?**",
                "Weakened tissues or improperly healed incisions from past surgeries can give way to internal pressure, allowing fat or bowel to bulge through. This can happen months or years later.",
                "**Symptoms to Watch For**",
                "A noticeable bulge at a scar site, discomfort during activity, or a sense of heaviness are common signs. Left untreated, it can lead to complications like bowel entrapment."
            ],

            conditionsHeading: "Symptoms & Risk Factors",
            conditionsTreated: [
                "Bulge at previous surgical scar",
                "Discomfort during coughing/bending",
                "Sense of abdominal pressure",
                "Localized redness or sensitivity",
                "Previous abdominal surgery",
                "Weakened abdominal wall"
            ],

            procedureHeading: "Surgical Options",
            procedureSteps: [
                {
                    title: "Assessment",
                    description: "Tailored surgical approach based on medical history, hernia size, and location."
                },
                {
                    title: "Laparoscopic Repair",
                    description: "Small incisions to place mesh; results in minimal trauma and faster recovery (< 2 hours)."
                },
                {
                    title: "Open Surgical Repair",
                    description: "Ideal for large/complex hernias; allows thorough reinforcement of the affected area."
                },
                {
                    title: "Recovery",
                    description: "Walking encouraged within 24-48 hours; light duties resume in 10-14 days."
                }
            ],

            benefitsHeading: "Benefits of Surgical Repair",
            benefits: [
                "Prevention of serious complications (strangulation)",
                "Relief from pain and discomfort",
                "Strengthened abdominal wall",
                "Minimal scarring (Laparoscopic)",
                "Durable, long-lasting results with quality mesh"
            ],

            risks: [],
            recoveryTimeline: [
                "Hospital Stay: 1 Day",
                "Light Duties: 10-14 Days",
                "Avoid Heavy Lifting: 4-6 Weeks"
            ],

            faqHeading: "FAQs – Incisional Hernia",
            faqs: [
                {
                    question: "Why do incisional hernias occur post-surgery?",
                    answer: "They typically result from poor healing or increased pressure on the previous surgical site."
                },
                {
                    question: "Can I delay surgery if it doesn't hurt?",
                    answer: "It’s not advisable as complications like strangulation may develop silently."
                },
                {
                    question: "Is mesh safe for repairing hernias?",
                    answer: "Yes. Modern meshes are biocompatible and support natural tissue integration."
                },
                {
                    question: "How can I prevent recurrence?",
                    answer: "Follow recovery protocols, avoid strain, and attend scheduled follow-ups."
                }
            ],

            customCta: {
                heading: "Take Proactive Steps",
                description: "Contact Stork Hospital, Hyderabad, for expert evaluation and reliable surgical care. Your recovery starts here.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "1-2 Hours",
                anesthesia: "General",
                hospitalStay: "1-2 Days",
                recoveryTime: "4-6 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Venu Gopal",
                role: "Senior General Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }



    if (slug === "inguinal-hernia") {
        return {
            slug: slug,
            title: "Inguinal Hernia Surgery – Stork Hospital, Hyderabad",
            subheading: "Specialized Groin Hernia Treatment for Faster, Safer Recovery",
            breadcrumbTitle: "Inguinal Hernia Surgery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `An inguinal hernia arises when tissue pushes through a weak spot in the lower abdominal wall, typically near the groin. It leads to a visible lump and discomfort. At Stork Hospital, Hyderabad, we provide advanced, patient-focused care with laparoscopic solutions for effective repair and minimal scarring.`,

            overview: {
                heading: "Why Choose Stork Hospital for Inguinal Hernia Repair",
                intro: "Leading provider of laparoscopic inguinal hernia surgery in Hyderabad.",
                items: [
                    "Expert surgical team with focused hernia repair experience",
                    "Modern operating rooms and cutting-edge equipment",
                    "Step-by-step patient care from diagnosis to recovery",
                    "Use of top-grade surgical mesh for reinforced repair",
                    "Trusted choice for inguinal hernia treatment in Hyderabad",
                    "Minimally invasive options for faster healing"
                ]
            },
            fullDescription: [
                "**Recognizing the Signs and Causes**",
                "Inguinal hernias are caused by muscle weakness and strain. They can be 'Indirect' (congenital) or 'Direct' (developed later). Symptoms include a noticeable groin bulge, heaviness, and pain during movement.",
                "**Why Surgery is Needed**",
                "They do not heal on their own. If left untreated, they can worsen and lead to complications like strangulation. Surgery is the only effective treatment."
            ],

            conditionsHeading: "Types & Symptoms",
            conditionsTreated: [
                "Indirect Inguinal Hernia",
                "Direct Inguinal Hernia",
                "Visible Groin Bulge",
                "Heaviness in Abdomen",
                "Pain when lifting/bending",
                "Abdominal Wall Weakness"
            ],

            procedureHeading: "Tailored Surgical Approaches",
            procedureSteps: [
                {
                    title: "Laparoscopic Repair",
                    description: "Minimally invasive keyhole surgery using a camera and mesh for reinforcement. Less pain and quick recovery."
                },
                {
                    title: "Open Hernia Repair",
                    description: "Traditional method for larger/complex hernias. Single incision for direct access and reliable long-term results."
                },
                {
                    title: "Mesh Reinforcement",
                    description: "High-quality surgical mesh is used to strengthen the weak area and prevent recurrence."
                },
                {
                    title: "Recovery",
                    description: "Light walking encouraged immediately; return to desk jobs in a week."
                }
            ],

            benefitsHeading: "Benefits of Expert Repair",
            benefits: [
                "Minimal scarring (Laparoscopic)",
                "Faster healing and return to normal life",
                "Long-term comfort and relief",
                "Reliable repair with low recurrence",
                "Prevention of serious complications"
            ],

            risks: [],
            recoveryTimeline: [
                "Hospital Stay: 1 Day",
                "Light Work: 7 Days",
                "Full Recovery: 2-3 Weeks"
            ],

            faqHeading: "FAQs – Inguinal Hernia",
            faqs: [
                {
                    question: "Can inguinal hernias heal without an operation?",
                    answer: "No. Surgery is necessary to correct the condition and prevent complications."
                },
                {
                    question: "How long will I need to recover?",
                    answer: "Recovery is generally 7–14 days for laparoscopic cases; open surgery may take slightly longer."
                },
                {
                    question: "Is surgical mesh safe?",
                    answer: "Yes. Mesh is medically approved, durable, and integrates well with body tissue."
                },
                {
                    question: "Is hernia recurrence common?",
                    answer: "No, recurrence is rare when patients follow post-surgery instructions."
                }
            ],

            customCta: {
                heading: "Don’t Ignore Groin Pain",
                description: "Choose Stork Hospital for reliable, advanced inguinal hernia surgery in Hyderabad. Book your appointment today.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "45-90 Min",
                anesthesia: "General / Spinal",
                hospitalStay: "1 Day",
                recoveryTime: "2-3 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Venu Gopal",
                role: "Senior General Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }



    if (slug === "umbilical-hernia") {
        return {
            slug: slug,
            title: "Umbilical Hernia Repair – Stork Hospital, Hyderabad",
            subheading: "Expert Care for Naval Hernias in Adults & Children",
            breadcrumbTitle: "Umbilical Hernia Repair",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `An umbilical hernia occurs when tissue bulges out through the navel (belly button). It is common in infants but also affects adults, especially after pregnancy or due to abdominal strain. At Stork Hospital, Hyderabad, we offer specialized umbilical hernia repair using both open and laparoscopic techniques to ensure safety, minimal scarring, and effective results.`,

            overview: {
                heading: "Why Choose Stork Hospital for Umbilical Hernia Repair?",
                intro: "Our general surgery team provides comprehensive hernia care with a focus on patient comfort:",
                items: [
                    "Expert hernia surgeons specializing in abdominal wall reconstruction",
                    "Advanced laparoscopic setup for minimally invasive repair",
                    "Pediatric-friendly facilities for treating hernias in children",
                    "24/7 emergency care for incarcerated or strangulated hernias",
                    "Transparent pricing packages and insurance support"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Symptoms and Risk Factors",
            conditionsTreated: [
                "Visible bulge near the naval that increases with coughing or straining",
                "Pain or pressure at the hernia site",
                "History of multiple pregnancies or abdominal surgery",
                "Obesity or chronic heavy lifting",
                "Risk of strangulation (emergency condition)"
            ],

            procedureHeading: "How We Treat Umbilical Hernias",
            procedureSteps: [
                {
                    title: "Diagnosis",
                    description: "Physical examination and ultrasound/CT scan if needed to assess hernia size."
                },
                {
                    title: "Repair Procedure",
                    description: "Performed under anesthesia. The bulging tissue is pushed back, and the abdominal wall is strengthened with stitches or mesh."
                },
                {
                    title: "Recovery",
                    description: "Same-day discharge for most cases. Quick return to normal activities with minimal restrictions."
                }
            ],

            benefitsHeading: "Benefits of Timely Repair",
            benefits: [
                "Prevention of complications like bowel obstruction",
                "Relief from pain and aesthetic improvement",
                "Low recurrence rate with modern mesh techniques",
                "Safe, routine procedure with high success rates"
            ],

            risks: [],
            recoveryTimeline: [
                "Discharge: Same day or next day",
                "Return to Work: 3-5 days (desk job)",
                "Full Activity: 2-3 weeks (avoid heavy lifting)"
            ],

            faqHeading: "FAQs – Umbilical Hernia",
            faqs: [
                {
                    question: "Do all umbilical hernias need surgery?",
                    answer: "In adults, surgery is usually recommended as they don't heal on their own and can enlarge."
                },
                {
                    question: "Is mesh always used?",
                    answer: "Mesh is commonly used in adults to prevent recurrence, but small hernias may be stitched."
                },
                {
                    question: "Can I get pregnant after this surgery?",
                    answer: "Yes, but it is often advised to wait until after completing your family to prevent recurrence."
                }
            ],

            customCta: {
                heading: "Consult a Hernia Specialist",
                description: "If you have a naval bulge or pain, don't ignore it. Book a consultation at Stork Hospital for expert evaluation and safe umbilical hernia repair in Hyderabad.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "45-60 Minutes",
                anesthesia: "General / Spinal / Local",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Venu Gopal",
                role: "Senior General Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "intragastric-balloon") {
        return {
            slug: slug,
            title: "Intragastric Balloon Procedure – Stork Hospital, Hyderabad",
            subheading: "Lose Weight Safely Without Surgery",
            breadcrumbTitle: "Intragastric Balloon",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `The intragastric balloon is an FDA-approved, non-invasive weight loss treatment designed to help you reduce appetite and achieve sustainable weight loss. At Stork Multispecialty Hospital, Hyderabad, we offer this procedure for individuals looking for a medically supported method to lose weight without anesthesia, stitches, or long hospital stays.`,

            overview: {
                heading: "Why Choose Stork Hospital for Gastric Balloon Procedures?",
                intro: "Complete, patient-centered care from pre-procedure to post-removal lifestyle coaching.",
                items: [
                    "Trained bariatric specialists with endoscopic expertise",
                    "Personalized consultations and weight loss planning",
                    "Full access to diagnostic services under one roof",
                    "Walk-in consultation facility near Kondapur",
                    "Transparent weight loss treatment packages",
                    "Insurance accepted for diagnostics (where applicable)",
                    "Focus on results with minimized discomfort"
                ]
            },
            fullDescription: [
                "**What is it and How Does it Work?**",
                "A soft, inflatable silicone balloon is placed in the stomach via endoscopy and filled with saline. It occupies space, reducing hunger and food intake.",
                "**Procedure Details**",
                "No incisions required. Done under mild sedation in <30 minutes. The balloon is removed after 6 months."
            ],

            conditionsHeading: "Ideal Candidates",
            conditionsTreated: [
                "BMI between 27 and 35",
                "Overweight but not ready for surgery",
                "Seeking non-surgical weight loss",
                "Need for appetite control",
                "Commitment to lifestyle changes"
            ],

            procedureHeading: "Step-by-Step Process",
            procedureSteps: [
                {
                    title: "Initial Assessment",
                    description: "Evaluation with a non-surgical weight loss specialist and pre-procedure health screening."
                },
                {
                    title: "Placement",
                    description: "20–30 minute endoscopic session to place and fill the balloon under mild sedation."
                },
                {
                    title: "Monitoring",
                    description: "Regular nutrition counseling and weight tracking during the 6-month placement period."
                },
                {
                    title: "Removal",
                    description: "Simple endoscopic removal after 6 months to reset eating patterns."
                }
            ],

            benefitsHeading: "Benefits of Intragastric Balloon",
            benefits: [
                "Non-surgical with no permanent changes",
                "Decreased food intake & better portion control",
                "Improved energy and physical activity",
                "Reversible with professional support",
                "Access to multidisciplinary weight management team"
            ],

            risks: [],
            recoveryTimeline: [
                "Procedure: < 30 Minutes",
                "Hospital Stay: Same Day Discharge",
                "Full Recovery: 1-2 Days"
            ],

            faqHeading: "FAQs – Intragastric Balloon",
            faqs: [
                {
                    question: "Is this a good alternative to surgery?",
                    answer: "Yes, perfect for those wanting to avoid surgery but needing help with moderate weight loss."
                },
                {
                    question: "How soon will I see results?",
                    answer: "Noticeable changes often start in the first month, with 10%–15% total body weight loss over 6 months."
                },
                {
                    question: "Are there side effects?",
                    answer: "Temporary nausea or cramping may occur in the first few days but usually subsides quickly."
                },
                {
                    question: "Is it covered by insurance?",
                    answer: "Coverage varies; we assist with documentation and offer flexible payment options."
                }
            ],

            customCta: {
                heading: "Begin Your Journey",
                description: "Choose the intragastric balloon at Stork Hospital for a non-surgical, results-driven program. Book your consultation today.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "20-30 Min",
                anesthesia: "Mild Sedation",
                hospitalStay: "Daycare",
                recoveryTime: "1-2 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Venu Gopal",
                role: "Senior Bariatric Specialist",
                experience: "20+ Years Experience"
            }
        }
    }



    if (slug === "kidney-stones") {
        return {
            slug: slug,
            title: "Kidney Stones Treatment – Stork Hospital, Hyderabad",
            subheading: "Effective and Patient-Focused Kidney Stone Care",
            breadcrumbTitle: "Kidney Stones",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Kidney stones are hard mineral deposits that form when urine becomes concentrated. At Stork Multispecialty Hospital, Hyderabad, our urology specialists use advanced diagnostic tools and modern treatment techniques like laser lithotripsy to remove stones safely, relieve symptoms, and prevent recurrence.`,

            overview: {
                heading: "Why Stork Hospital is a Leading Choice",
                intro: "Expert urologists with years of experience in stone management.",
                items: [
                    "Expert urologists with years of experience in stone management",
                    "Fully equipped diagnostic center for accurate detection",
                    "Advanced surgical center (Minimally Invasive & Laser)",
                    "24/7 emergency hospital for urgent cases",
                    "Insurance accepted with transparent cost estimates",
                    "Walk-in clinic for quick specialist access",
                    "Preventive advice tailored to your needs"
                ]
            },
            fullDescription: [
                "**What Causes Kidney Stones?**",
                "Low fluid intake, high sodium/protein diets, and certain health conditions can lead to concentrated urine, allowing crystals to form. While small stones may pass, larger ones need removal.",
                "**Symptoms to Watch For**",
                "Sharp pain in the back or side, pain during urination, and bloody or cloudy urine are common signs. Nausea and fever may indicate infection."
            ],

            conditionsHeading: "Causes and Risk Factors",
            conditionsTreated: [
                "Low fluid intake (Dehydration)",
                "High sodium/protein diet",
                "Obesity/Limited activity",
                "Family history of stones",
                "Recurrent UTIs",
                "Metabolic disorders"
            ],

            procedureHeading: "Treatment Approaches",
            procedureSteps: [
                {
                    title: "Non-Surgical Management",
                    description: "For small stones: Increased hydration, pain relief, and medication to speed up passage."
                },
                {
                    title: "Ureteroscopy (URS)",
                    description: "Removing or breaking stones using a thin scope passed through the urinary tract."
                },
                {
                    title: "Laser Lithotripsy",
                    description: "High-precision laser to fragment stones with minimal tissue impact."
                },
                {
                    title: "PCNL / SWL",
                    description: "For larger stones: Small-incision surgery (PCNL) or sound wave therapy (SWL) to break stones."
                }
            ],

            benefitsHeading: "Recovery and Prevention",
            benefits: [
                "Relief from severe pain",
                "Prevention of kidney damage",
                "Minimally invasive options available",
                "Customized prevention plans",
                "Quick recovery with modern techniques"
            ],

            risks: [],
            recoveryTimeline: [
                "Diagnosis: Immediate",
                "Procedure: 30-60 Mins",
                "Recovery: 1-2 Days"
            ],

            faqHeading: "FAQs – Kidney Stones",
            faqs: [
                {
                    question: "Do all kidney stones require surgery?",
                    answer: "No. Small stones can often pass naturally with medication and hydration."
                },
                {
                    question: "Will the treatment be painful?",
                    answer: "Advanced anesthesia and minimally invasive techniques ensure minimal discomfort."
                },
                {
                    question: "How can I prevent recurrence?",
                    answer: "Stay well-hydrated, eat a balanced diet, and limit excess salt and animal protein."
                },
                {
                    question: "Does insurance cover treatment?",
                    answer: "Yes. Stork Hospital works with most insurance providers for kidney stone care."
                }
            ],

            customCta: {
                heading: "Book Your Consultation",
                description: "If you’re experiencing back pain or urinary difficulty, meet a urologist at Stork Hospital for expert treatment.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "30-60 Min",
                anesthesia: "Spinal / General",
                hospitalStay: "Daycare / 1 Day",
                recoveryTime: "1-2 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Venu Gopal",
                role: "Senior Urologist",
                experience: "20+ Years Experience"
            }
        }
    }



    if (slug === "knee-arthroscopy") {
        return {
            slug: slug,
            title: "Knee Arthroscopy – Stork Hospital, Hyderabad",
            subheading: "Modern Keyhole Surgery for Knee Health",
            breadcrumbTitle: "Knee Arthroscopy",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Knee arthroscopy is a minimally invasive surgical method that uses tiny incisions and a camera (arthroscope) to view and treat problems inside the knee joint. At Stork Multispecialty Hospital, Hyderabad, we use arthroscopy to manage a wide variety of knee issues—from sports-related ligament injuries to early arthritis—allowing patients to recover faster and with less post-operative discomfort.`,

            overview: {
                heading: "Why Stork Hospital is the Go-To for Knee Arthroscopy",
                intro: "Advanced surgical center designed for precision minimally invasive surgery.",
                items: [
                    "Specialized orthopedic surgeons skilled in sports medicine",
                    "In-house diagnostic center with MRI/CT",
                    "Advanced surgical center for precision procedures",
                    "24/7 emergency hospital for knee trauma",
                    "Insurance accepted with upfront, clear billing",
                    "Walk-in clinic for quick access",
                    "Tailored physiotherapy programs"
                ]
            },
            fullDescription: [
                "**What is Knee Arthroscopy?**",
                "It's a minimally invasive procedure using a camera to view and treat knee problems. Real-time visuals allow for highly accurate repairs with minimal disruption to surrounding tissues.",
                "**Conditions Treated**",
                "We treat meniscus tears, ACL/PCL injuries, cartilage damage, loose fragments, synovitis, and early arthritis using this technique."
            ],

            conditionsHeading: "When is it Recommended?",
            conditionsTreated: [
                "Meniscus damage or tears",
                "ACL and PCL ligament injuries",
                "Worn or damaged cartilage",
                "Loose bone/cartilage fragments",
                "Joint lining inflammation (synovitis)",
                "Patella misalignment/instability",
                "Early arthritis intervention"
            ],

            procedureHeading: "Step-by-Step Approach",
            procedureSteps: [
                {
                    title: "Pre-Surgery",
                    description: "Comprehensive evaluation, imaging tests, and preparation guidance."
                },
                {
                    title: "During Surgery",
                    description: "Small incisions made; arthroscope inserted for targeted repair or removal of damaged tissue."
                },
                {
                    title: "After Surgery",
                    description: "Same-day discharge for many; pain/swelling managed with medication and cold therapy."
                },
                {
                    title: "Rehabilitation",
                    description: "Gradual physiotherapy to restore motion and stability."
                }
            ],

            benefitsHeading: "Recovery Journey with Stork",
            benefits: [
                "Minimally invasive procedure",
                "Personalized treatment planning",
                "Faster recovery than open surgery",
                "Less post-operative discomfort",
                "Guided rehabilitation by physiotherapy team"
            ],

            risks: [],
            recoveryTimeline: [
                "Hospital Stay: Daycare / 1 Day",
                "Walking: Within 24 Hours",
                "Full Recovery: 4-6 Weeks"
            ],

            faqHeading: "FAQs – Knee Arthroscopy",
            faqs: [
                {
                    question: "Will I feel pain after surgery?",
                    answer: "Discomfort is mild and well-controlled with prescribed medication."
                },
                {
                    question: "When can I resume walking?",
                    answer: "Most patients start walking with assistance within a day of surgery."
                },
                {
                    question: "How long does recovery take?",
                    answer: "Many people return to regular routines in 4–6 weeks."
                },
                {
                    question: "Does insurance cover this procedure?",
                    answer: "Yes. Stork Hospital works with most insurance providers and offers cost transparency."
                }
            ],

            customCta: {
                heading: "Book Your Appointment Today",
                description: "If knee pain or injury is affecting your daily life, consult a knee arthroscopy specialist at Stork Hospital for advanced, minimally invasive treatment.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "45-90 Min",
                anesthesia: "Spinal / General",
                hospitalStay: "Daycare / 1 Day",
                recoveryTime: "4-6 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Raghu",
                role: "Senior Orthopedic Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }



    if (slug === "knee-pain") {
        return {
            slug: slug,
            title: "Knee Pain Treatment – Stork Hospital, Hyderabad",
            subheading: "Advanced Joint Solutions to Keep You Moving Pain-Free",
            breadcrumbTitle: "Knee Pain Treatment",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Knee pain can significantly impact your ability to stay active, whether it’s walking, bending, or climbing stairs. At Stork Hospital, Hyderabad, we specialize in diagnosing and treating knee-related conditions using a combination of cutting-edge diagnostics, minimally invasive methods, and individualized care to restore comfort and mobility.`,

            overview: {
                heading: "Why Do Knees Hurt?",
                intro: "Knee pain is often the result of underlying mechanical or structural problems.",
                items: [
                    "Ligament sprains or tears (ACL, MCL, PCL, LCL)",
                    "Meniscus injuries from twisting",
                    "Osteoarthritis (progressive joint damage)",
                    "Rheumatoid arthritis (autoimmune)",
                    "Tendonitis or Bursitis (inflammation)",
                    "Sports-related injuries or trauma",
                    "Poor body mechanics or excess weight"
                ]
            },
            fullDescription: [
                "**Evaluation and Personalized Strategy**",
                "We begin with a detailed examination of joint function and pain history. Advanced diagnostics like X-rays, MRI, and ultrasound help us identify the exact source of discomfort.",
                "**Treatment Philosophy**",
                "We emphasize non-surgical approaches first. Surgical correction is only explored when other methods have been exhausted or if the knee is severely damaged."
            ],

            conditionsHeading: "Common Signs & Symptoms",
            conditionsTreated: [
                "Swelling or stiffness",
                "Instability or locking",
                "Reduced range of motion",
                "Pain when walking/bending",
                "Popping or crunching sounds",
                "Redness or warmth"
            ],

            procedureHeading: "Treatment Approaches",
            procedureSteps: [
                {
                    title: "Conservative Care",
                    description: "Physiotherapy, anti-inflammatory medication, and lifestyle coaching to reduce knee stress."
                },
                {
                    title: "Injections & Support",
                    description: "PRP therapy, hyaluronic acid injections, and supportive braces/orthotics."
                },
                {
                    title: "Minimally Invasive",
                    description: "Arthroscopic surgery for precision repair of ligaments and cartilage if needed."
                },
                {
                    title: "Surgical Intervention",
                    description: "Advanced surgical options for severe damage, ensuring long-term relief."
                }
            ],

            benefitsHeading: "Why Stork Hospital is Trusted",
            benefits: [
                "Team of seasoned orthopedic consultants",
                "Integrated care (symptoms + root cause)",
                "Advanced imaging & physiotherapy infrastructure",
                "Emphasis on restoring full function",
                "Recognized top facility for knee care"
            ],

            risks: [],
            recoveryTimeline: [
                "Diagnosis: Immediate",
                "Relief: 2-4 Weeks (Conservative)",
                "Full Recovery: Varies by Condition"
            ],

            faqHeading: "FAQs – Knee Pain Care",
            faqs: [
                {
                    question: "Is surgery needed for all knee pain?",
                    answer: "No. Most knee problems respond well to non-surgical therapies and rehabilitation."
                },
                {
                    question: "What symptoms suggest serious injury?",
                    answer: "Locking, severe swelling, or pain that lingers for over a week should be checked."
                },
                {
                    question: "Can young people have chronic knee pain?",
                    answer: "Yes. Athletes and active individuals of all ages can experience persistent issues."
                },
                {
                    question: "How quickly can I recover?",
                    answer: "Improvements are often felt in 2–4 weeks with consistent care."
                }
            ],

            customCta: {
                heading: "Take the First Step",
                description: "Visit Stork Hospital, Hyderabad, for expert diagnosis, innovative therapies, and long-term relief from knee pain.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "30-45 Min (Consult)",
                anesthesia: "N/A",
                hospitalStay: "Outpatient",
                recoveryTime: "2-4 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Raghu",
                role: "Senior Orthopedic Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }




    if (slug === "labiaplasty") {
        return {
            slug: slug,
            title: "Labiaplasty – Stork Hospital, Hyderabad",
            subheading: "Tailored Aesthetic & Functional Care for Intimate Wellness",
            breadcrumbTitle: "Labiaplasty",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Labiaplasty is a surgical procedure that reshapes or reduces the size of the labia for physical relief, aesthetic refinement, or both. At Stork Hospital, Hyderabad, we offer labiaplasty in a safe, respectful, and fully confidential environment—led by experienced female gynecologists specializing in cosmetic gynecology.`,

            overview: {
                heading: "Understanding Labiaplasty",
                intro: "Labiaplasty involves the precise reshaping of the labia minora (inner lips) or labia majora (outer lips).",
                items: [
                    "Minimize excess tissue causing friction or chafing",
                    "Create a more balanced, symmetrical appearance",
                    "Improve comfort during movement, intimacy, or exercise",
                    "Restore natural look after childbirth or hormonal changes",
                    "Address physical discomfort interfering with daily life"
                ]
            },
            fullDescription: [
                "**Confidential & Compassionate Care**",
                "We recognize the deeply personal nature of this choice. Whether your concerns stem from discomfort, post-pregnancy changes, or body image, our goal is to help you feel more comfortable in your body with results that look and feel natural.",
                "**Who Is This Procedure For?**",
                "Labiaplasty may be right for you if you feel physical irritation while walking/cycling, tight clothing causes pain, or if labial shape affects your self-image."
            ],

            conditionsHeading: "Reasons for Procedure",
            conditionsTreated: [
                "Physical irritation while exercising",
                "Pain/rubbing from tight clothing",
                "Asymmetry due to aging/childbirth",
                "Chronic discomfort or hygiene issues",
                "Self-image concerns"
            ],

            procedureHeading: "How We Approach Labiaplasty",
            procedureSteps: [
                {
                    title: "Consultation & Planning",
                    description: "Personal consultation with a specialist, medical history review, and discussion about expectations and outcomes."
                },
                {
                    title: "The Procedure",
                    description: "Performed under local or short general anesthesia in under 90 minutes. Involves precise trimming, contouring, or sculpting."
                },
                {
                    title: "Recovery & Results",
                    description: "Mild discomfort for 3–5 days. Most return to daily activities within a week. Full healing takes 6–8 weeks."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital?",
            benefits: [
                "All-women surgical team (Cosmetic Gynecology)",
                "Tailored care with absolute discretion",
                "Gentle surgical methods with aesthetic precision",
                "Private recovery rooms and attentive aftercare",
                "Transparent, upfront pricing"
            ],

            risks: [],
            recoveryTimeline: [
                "Procedure: < 90 Minutes (Day Care)",
                "Return to Work: ~1 Week",
                "Full Healing: 6-8 Weeks"
            ],

            faqHeading: "FAQs – Labiaplasty at Stork",
            faqs: [
                {
                    question: "Is this only for cosmetic purposes?",
                    answer: "Not at all—many women seek labiaplasty to reduce chronic discomfort or hygiene issues."
                },
                {
                    question: "Will it affect sensation?",
                    answer: "The surgery is designed to preserve nerve endings and maintain sensitivity."
                },
                {
                    question: "Are the results noticeable?",
                    answer: "Yes, results are natural and refined, often improving both comfort and confidence."
                },
                {
                    question: "Do I need to stay overnight?",
                    answer: "No. Labiaplasty is a day-care procedure. You’ll go home the same day."
                }
            ],

            customCta: {
                heading: "Feel Confident & Comfortable",
                description: "Book a discreet consultation at Stork Hospital—Hyderabad’s trusted name in labiaplasty and women’s intimate care.",
                buttonText: "Book Private Consultation"
            },
            meta: {
                duration: "60-90 Min",
                anesthesia: "Local / Short General",
                hospitalStay: "Day Care (Outpatient)",
                recoveryTime: "1 Week (social)",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. ________________", // Placeholder as none provided, or use generic
                role: "Cosmetic Gynecologist",
                experience: "Expert Team"
            }
        }
    }




    if (slug === "labor-delivery") {
        return {
            slug: slug,
            title: "Labor & Delivery – Stork Hospital, Hyderabad",
            subheading: "Safe, Compassionate, and Expert Care for Your Childbirth Journey",
            breadcrumbTitle: "Labor & Delivery",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Labor and delivery mark the final stages of pregnancy—a life-changing moment that we ensure happens with utmost care, safety, and support at Stork Hospital. Whether it’s a smooth natural birth or a carefully monitored surgical delivery, our team handles every birth story with compassion and clinical precision.`,

            overview: {
                heading: "What is Labor and Delivery?",
                intro: "Labor refers to the body’s natural process of preparing for childbirth through uterine contractions and cervical dilation, culminating in the delivery of the baby.",
                items: [
                    "Natural process managed with expert supervision",
                    "Options for Vaginal or Cesarean delivery",
                    "Focus on safety, comfort, and pain management",
                    "Family-friendly environment with private rooms",
                    "Specialized care for high-risk pregnancies"
                ]
            },
            fullDescription: [
                "**Who Needs Supervised Care?**",
                "Every expecting mother should be under skilled supervision. Our services are especially essential for first-time mothers, high-risk pregnancies, twins/breech presentations, and moms with conditions like gestational diabetes or hypertension.",
                "**The Stork Difference**",
                "We are known as a painless delivery hospital in Hyderabad, offering advanced pain management options like epidurals alongside a supportive, home-like birthing environment."
            ],

            conditionsHeading: "Complications We Manage",
            conditionsTreated: [
                "Prolonged or stalled labor",
                "Breech or abnormal positioning",
                "Fetal distress or irregular heartbeat",
                "Excessive bleeding (PPH)",
                "Cord prolapse or entanglement",
                "Placenta previa or abruption",
                "Emergency Cesarean Sections"
            ],

            procedureHeading: "What to Expect at Stork",
            procedureSteps: [
                {
                    title: "Pre-Labor Evaluation",
                    description: "Assessment of dilation, contractions, and fetal heart rate. Discussion of pain relief options like epidurals."
                },
                {
                    title: "Labor Room Experience",
                    description: "Dedicated private birthing suites with constant monitoring by obstetricians and nurses. Labor support and breathing guidance."
                },
                {
                    title: "Safe Delivery—Your Way",
                    description: "Vaginal birth (spontaneous/induced), Painless delivery (epidural), or C-Section. Immediate skin-to-skin contact encouraged."
                },
                {
                    title: "Post-Delivery Support",
                    description: "Monitoring to prevent bleeding, breastfeeding initiation within the first hour, and emotional support for recovery."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital?",
            benefits: [
                "24/7 On-Call Obstetricians & Anesthetists",
                "Modern Birthing Suites (Mother-Friendly)",
                "Emergency OT Access within Minutes",
                "Neonatologists Present at Every Delivery",
                "Painless Labor Options (Epidural)",
                "Recognized Best Hospital for Delivery"
            ],

            risks: [],
            recoveryTimeline: [
                "Vaginal Birth: Discharge in 24-48 Hours",
                "C-Section: Discharge in 3-4 Days",
                "Full Recovery: ~6 Weeks"
            ],

            faqHeading: "FAQs – Labor & Delivery",
            faqs: [
                {
                    question: "Can I choose how I want to deliver?",
                    answer: "Absolutely. We support your birth preferences while guiding you with medical insight to ensure safety."
                },
                {
                    question: "Is epidural safe during labor?",
                    answer: "Yes, epidural anesthesia is safe and effective for pain relief. Our anesthetists are available 24/7."
                },
                {
                    question: "Will I have the same doctor during delivery?",
                    answer: "Our core obstetric team manages your delivery, ensuring continuity and trust throughout."
                },
                {
                    question: "How soon can I go home?",
                    answer: "For normal delivery, usually 24–48 hours. C-section recoveries may require 3-4 days."
                }
            ],

            customCta: {
                heading: "Plan Your Delivery",
                description: "Experience patient-first care in a supportive, state-of-the-art environment at Stork Hospital.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "Epidural / Spinal / General",
                hospitalStay: "1-4 Days",
                recoveryTime: "6 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Sujatha",
                role: "Senior Obstetrician",
                experience: "20+ Years Experience"
            }
        }
    }




    if (slug === "management-of-infections") {
        return {
            slug: slug,
            title: "Management of Infections – Stork Hospital, Hyderabad",
            subheading: "Comprehensive Care for Acute & Chronic Infections",
            breadcrumbTitle: "Infection Management",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Infections can relieve affect any part of the body and range from mild to life-threatening. At Stork Hospital, Hyderabad, we offer complete infection management combining accurate diagnosis, effective treatment (antibiotic/antiviral), and preventive care for a safe recovery.`,

            overview: {
                heading: "Comprehensive Infection Care",
                intro: "Prompt diagnosis and proper medical management are essential to prevent complications.",
                items: [
                    "Treatment for Bacterial, Viral, Fungal & Parasitic infections",
                    "Management of respiratory, skin, UTI, and gastrointestinal infections",
                    "Advanced diagnostic support (Lab & Imaging)",
                    "24/7 Emergency care for severe complications",
                    "Focus on preventive strategies and vaccination"
                ]
            },
            fullDescription: [
                "**Why Expert Management Matters**",
                "Some infections are mild, while others can become serious if left untreated. Our team ensures every patient receives safe, evidence-based care tailored to their condition—whether it's a simple flu or a complex post-surgical infection.",
                "**Our Approach**",
                "We combine detailed patient history, advanced lab investigations, and targeted medication (antibiotics, antivirals, etc.) to treat the root cause effectively."
            ],

            conditionsHeading: "Common Infections We Treat",
            conditionsTreated: [
                "Respiratory (Pneumonia, Bronchitis, Sinusitis)",
                "Skin & Soft Tissue (Cellulitis, Abscesses)",
                "Urinary Tract Infections (UTIs)",
                "Gastrointestinal (Food poisoning, Gastroenteritis)",
                "Post-surgical & Wound infections",
                "Fungal infections (Skin, Nails)",
                "Pediatric infections"
            ],

            procedureHeading: "Our Treatment Protocol",
            procedureSteps: [
                {
                    title: "Diagnosis",
                    description: "Physical exam plus Lab tests (Blood, Urine, Cultures) and Imaging (X-ray, CT) to identify the pathogen."
                },
                {
                    title: "Medical Management",
                    description: "Targeted antibiotic, antiviral, or antifungal medication. Supportive care (hydration, symptom relief)."
                },
                {
                    title: "Intervention (If Needed)",
                    description: "Incision and drainage for abscesses, wound care, or hospital admission for IV medications in severe cases."
                },
                {
                    title: "Prevention & Follow-up",
                    description: "Monitoring progress, preventing recurrence through hygiene/vaccination, and complete recovery support."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital?",
            benefits: [
                "Experienced Internal Medicine & Infectious Disease Specialists",
                "Advanced Diagnostic Center (Labs/Cultures/Imaging)",
                "24/7 Emergency for urgent complications",
                "Surgical support for deep infections",
                "Transparent billing & Insurance acceptance"
            ],

            risks: [],
            recoveryTimeline: [
                "Viral/Minor: 3-7 Days",
                "Bacterial: 1-2 Weeks (with antibiotics)",
                "Chronic/Severe: Varies by condition"
            ],

            faqHeading: "FAQs – Infection Management",
            faqs: [
                {
                    question: "When should I see a doctor?",
                    answer: "If symptoms worsen quickly, persist for days, or you have high fever, breathing difficulty, or confusion."
                },
                {
                    question: "Do all infections need antibiotics?",
                    answer: "No. Antibiotics only treat bacteria. We prescribe them only when necessary to avoid resistance."
                },
                {
                    question: "Can infections be prevented?",
                    answer: "Yes. Good hygiene, vaccination, and prompt care of minor cuts/illnesses reduce risk significantly."
                },
                {
                    question: "Does insurance cover this?",
                    answer: "Yes. We accept major insurance providers and offer cost transparency."
                }
            ],

            customCta: {
                heading: "Get Prompt Medical Care",
                description: "Book an appointment at Stork Hospital to meet with a specialist and receive safe, effective treatment.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "Consult: 30 Min",
                anesthesia: "N/A (Local for minor procedures)",
                hospitalStay: "Outpatient / Inpatient (Severe)",
                recoveryTime: "Varies",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. ________________",
                role: "Internal Medicine Specialist",
                experience: "Expert Team"
            }
        }
    }

    if (slug === "mastoidectomy") {
        return {
            slug: slug,
            title: "Mastoidectomy – Stork Hospital, Hyderabad",
            subheading: "Expert Ear Surgery for Chronic Infections and Complications",
            breadcrumbTitle: "Mastoidectomy",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `A mastoidectomy is a surgical technique used to remove infected or damaged air cells within the mastoid bone — the bony area just behind your ear. This operation is often recommended when chronic ear infections, cholesteatoma, or bone-related ear diseases cannot be resolved through medications alone.

At Stork Multispecialty Hospital, Hyderabad, we use modern microsurgical tools and highly skilled ENT surgeons to deliver safe and effective mastoid surgery. Our aim is to not only eliminate the infection but also protect your hearing and overall ear function, ensuring a smoother recovery process.`,

            overview: {
                heading: "Why Stork Hospital Stands Out for Mastoidectomy in Hyderabad",
                intro: "",
                items: [
                    "Team of senior ENT specialists experienced in delicate ear operations",
                    "Access to an advanced surgical center with world-class sterilization standards",
                    "On-site diagnostic facilities for CT imaging, hearing evaluations, and endoscopic ear checks",
                    "Round-the-clock emergency care near Hitech City and Kondapur for urgent ENT needs",
                    "Partnerships with major insurance companies for transparent, worry-free billing",
                    "Option for same-day ENT consultation or walk-in clinic services for ear-related emergencies",
                    "Comfortable recovery rooms designed for patient privacy and post-surgical rest"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Common Reasons for Mastoidectomy",
            conditionsTreated: [
                "Long-term middle ear infections that resist treatment",
                "Cholesteatoma causing structural ear damage",
                "Mastoid bone infection or abscess",
                "Ear discharge with progressive hearing loss",
                "Nerve-related issues in the face linked to ear disease",
                "Complications following untreated ear infections"
            ],

            procedureHeading: "How We Approach Mastoid Surgery",
            procedureSteps: [
                {
                    title: "Before Surgery",
                    description: "Thorough consultation with an ENT specialist at Stork Hospital. Detailed diagnostic tests, including hearing assessments and imaging scans. Discussion of surgical benefits, potential risks, and realistic recovery expectations."
                },
                {
                    title: "During Surgery",
                    description: "Carried out under general anesthesia in a sterile operating theatre. Removal of infected mastoid cells with high-precision surgical microscopes. Preservation of unaffected ear structures wherever possible."
                },
                {
                    title: "After Surgery",
                    description: "Pain control and infection prevention through tailored medication. Professional wound care and dressing changes. Post-operative follow-up appointments to check healing and ear function. Long-term ear care guidance to minimize future issues."
                }
            ],

            benefitsHeading: "Your Treatment Pathway at Stork Hospital",
            benefits: [
                "ENT evaluation and imaging tests",
                "Surgical recommendation with full patient counseling",
                "Pre-operative clearance and hospital admission",
                "Mastoidectomy procedure (usually 1–3 hours)",
                "Short recovery stay — often 1–2 nights",
                "Follow-up and monitoring until you are fully healed"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "Frequently Asked Questions",
            faqs: [
                {
                    question: "Will I feel pain after the operation?",
                    answer: "Some mild discomfort is normal, but it is well managed with prescribed pain relief."
                },
                {
                    question: "Can mastoidectomy help with hearing problems?",
                    answer: "Yes, in many cases it prevents further hearing loss and may even improve hearing, depending on the stage of the disease."
                },
                {
                    question: "When can I return to my usual routine?",
                    answer: "Light activities can often be resumed in about a week, but swimming and water contact should be avoided until cleared by your ENT specialist."
                },
                {
                    question: "Does Stork Hospital accept insurance for this surgery?",
                    answer: "Yes. We accept most insurance plans and provide clear, upfront cost estimates before treatment."
                }
            ],

            customCta: {
                heading: "Schedule Your ENT Consultation",
                description: "If you have recurring ear pain, discharge, or changes in hearing, early evaluation is important. Book an appointment at Stork Hospital to consult with an ENT specialist in Hyderabad and learn whether mastoidectomy is the right treatment for you. We deliver precise surgical care backed by advanced technology and a compassionate team.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "1-3 Hours",
                anesthesia: "General Anesthesia",
                hospitalStay: "1-2 Nights",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rakesh Kumar",
                role: "Senior ENT Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "meniscus-tear") {
        return {
            slug: slug,
            title: "Meniscus Tear – Stork Hospital, Hyderabad",
            subheading: "Complete Knee Care from Diagnosis to Recovery",
            breadcrumbTitle: "Meniscus Tear",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `The meniscus is a C-shaped piece of cartilage inside the knee that acts as a shock absorber and helps stabilize the joint. A meniscus tear can happen due to sudden twisting, abrupt changes in direction, heavy lifting, or gradual wear over time. While common in athletes, these injuries can affect anyone and often lead to pain, swelling, stiffness, or restricted movement.

At Stork Multispecialty Hospital, Hyderabad, we provide tailored treatment for meniscus tears — from conservative care to advanced arthroscopic surgery. Our aim is to help patients regain mobility, reduce pain, and protect long-term knee health.`,

            overview: {
                heading: "Why Patients Choose Stork Hospital for Meniscus Treatment",
                intro: "",
                items: [
                    "Highly skilled orthopedic surgeons with sports injury expertise",
                    "Modern diagnostic center in Hyderabad for MRI, X-rays, and other scans",
                    "Advanced surgical center offering minimally invasive arthroscopy",
                    "24/7 emergency hospital near Hitech City for injury-related emergencies",
                    "Insurance accepted at Stork Hospital with transparent pricing",
                    "Walk-in clinic near Kondapur for same-day injury evaluation",
                    "Comprehensive physiotherapy programs to speed recovery"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Causes & Symptoms",
            conditionsTreated: [
                "**Causes**",
                "Sudden pivoting or twisting during sports activities",
                "Squatting deeply or lifting heavy objects",
                "Direct trauma to the knee in accidents",
                "Cartilage weakening due to aging",
                "**Symptoms**",
                "Pain when moving or twisting the knee",
                "Swelling and joint stiffness",
                "Knee locking or catching during movement",
                "Trouble fully extending or bending the knee",
                "A popping sound at the moment of injury"
            ],

            procedureHeading: "How We Treat Meniscus Tears",
            procedureSteps: [
                {
                    title: "Conservative Options",
                    description: "Rest, ice, compression, and elevation (RICE). Anti-inflammatory medicines to control pain and swelling. Targeted physiotherapy to restore strength and stability."
                },
                {
                    title: "Surgical Solutions",
                    description: "Arthroscopic repair for tears that can be preserved. Partial meniscectomy to remove damaged portions. Meniscus transplantation for severe or irreparable damage."
                }
            ],

            benefitsHeading: "Your Care Pathway at Stork Hospital",
            benefits: [
                "Orthopedic consultation and diagnostic imaging",
                "Development of a personalized treatment plan",
                "Non-surgical management or arthroscopic procedure",
                "Guided rehabilitation in our physiotherapy unit",
                "Progress monitoring to ensure safe return to activity"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Meniscus Tear",
            faqs: [
                {
                    question: "Will I need surgery for a meniscus tear?",
                    answer: "Not always. Small tears can heal with rest, therapy, and activity modifications."
                },
                {
                    question: "What’s the recovery time?",
                    answer: "4–6 weeks for partial removal and 2–3 months for a full repair, depending on activity level."
                },
                {
                    question: "How can I avoid a meniscus injury?",
                    answer: "Maintain strong leg muscles, improve flexibility, and use proper movement techniques during sports."
                },
                {
                    question: "Is the treatment covered by insurance?",
                    answer: "Yes. Stork Hospital partners with major insurance providers for orthopedic procedures."
                }
            ],

            customCta: {
                heading: "Book Your Knee Injury Consultation",
                description: "If knee pain, swelling, or locking is interfering with your mobility, get evaluated promptly. Book an appointment at Stork Hospital to see an orthopedic specialist in Hyderabad and receive advanced care for meniscus injuries.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "45-90 Minutes",
                anesthesia: "General / Spinal",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "4-6 Weeks / 3 Months",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Abhinandan",
                role: "Senior Orthopedic Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "mental-health") {
        return {
            slug: slug,
            title: "Mental Health – Stork Hospital, Hyderabad",
            subheading: "Compassionate Care for Emotional and Psychological Well-being",
            breadcrumbTitle: "Mental Health",
            category: "Psychiatry",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Mental health is just as important as physical health. It affects how we think, feel, and behave in daily life, as well as how we cope with stress, build relationships, and make decisions. Mental health conditions can range from temporary stress-related problems to long-term disorders that require ongoing care.

At Stork Multispecialty Hospital, Hyderabad, our team of psychiatrists, psychologists, and mental health professionals provides comprehensive and confidential care. We focus on accurate diagnosis, personalized treatment, and supportive therapy to help patients achieve stability, resilience, and improved quality of life.`,

            overview: {
                heading: "Why Choose Stork Hospital for Mental Health Care",
                intro: "",
                items: [
                    "Experienced psychiatrists and clinical psychologists with expertise in a wide range of conditions",
                    "In-house diagnostic center in Hyderabad for psychological assessments and related health screenings",
                    "24/7 emergency hospital near Hitech City for psychiatric crises and urgent support",
                    "Insurance accepted at Stork Hospital with confidential billing and treatment records",
                    "Same-day appointments and walk-in clinic near Kondapur for quick access to help",
                    "Holistic care integrating therapy, medication, and lifestyle guidance",
                    "Family counseling and caregiver support services"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Mental Health Conditions We Treat",
            conditionsTreated: [
                "Depression and mood disorders",
                "Anxiety disorders and panic attacks",
                "Bipolar disorder",
                "Post-Traumatic Stress Disorder (PTSD)",
                "Schizophrenia and psychotic disorders",
                "Obsessive-Compulsive Disorder (OCD)",
                "Sleep-related mental health conditions",
                "Stress-related problems and burnout",
                "Childhood and adolescent mental health concerns"
            ],

            procedureHeading: "Our Treatment Approach",
            procedureSteps: [
                {
                    title: "Diagnosis and Assessment",
                    description: "Comprehensive mental health evaluation. Standardized psychological testing where needed. Medical and lifestyle history to identify contributing factors."
                },
                {
                    title: "Therapeutic Interventions",
                    description: "Cognitive Behavioral Therapy (CBT) and other evidence-based therapies. Medication management when necessary. Group therapy, support groups, and family counseling."
                },
                {
                    title: "Integrated Care",
                    description: "Collaboration with nutritionists, physiotherapists, and occupational therapists for holistic recovery. Wellness programs including mindfulness, stress management, and coping skills training."
                }
            ],

            benefitsHeading: "Your Care Journey at Stork Hospital",
            benefits: [
                "Confidential consultation with a mental health professional",
                "Comprehensive assessment and diagnosis",
                "Creation of a personalized treatment plan",
                "Regular therapy sessions and medication review",
                "Long-term follow-up and relapse prevention strategies"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Mental Health Services",
            faqs: [
                {
                    question: "Are mental health services confidential?",
                    answer: "Yes. All records and consultations are kept strictly confidential at Stork Hospital."
                },
                {
                    question: "Do all mental health conditions require medication?",
                    answer: "No. Many can be effectively managed with therapy alone or a combination of therapy and lifestyle changes."
                },
                {
                    question: "Can family members be involved in treatment?",
                    answer: "Yes. Family support can play a vital role in recovery, and we offer caregiver counseling sessions."
                },
                {
                    question: "Is treatment covered by insurance?",
                    answer: "Yes. Stork Hospital works with major insurance providers and ensures cost transparency."
                }
            ],

            customCta: {
                heading: "Book Your Mental Health Consultation",
                description: "If you or a loved one is experiencing emotional distress, persistent sadness, anxiety, or changes in behavior, help is available. Book an appointment at Stork Hospital to meet with a mental health specialist in Hyderabad and take the first step towards emotional well-being.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "45-60 Minutes",
                anesthesia: "Not Applicable",
                hospitalStay: "Outpatient / Inpatient",
                recoveryTime: "Varies",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Srikanth",
                role: "Senior Psychiatrist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "metabolic-endocrine-disorders") {
        return {
            slug: slug,
            title: "Metabolic and Endocrine Disorders – Stork Hospital, Hyderabad",
            subheading: "Expert Diagnosis and Treatment for Hormonal and Metabolic Health",
            breadcrumbTitle: "Metabolic Disorders",
            category: "Endocrinology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Metabolic and endocrine disorders occur when the body’s hormones or metabolic processes are out of balance. These conditions may affect growth, energy production, reproduction, and overall health. They are often long-term (chronic) but can be effectively managed with early diagnosis, the right treatment, and ongoing monitoring.

At Stork Multispecialty Hospital, Hyderabad, our endocrinologists and metabolic specialists provide comprehensive care for a wide range of hormone-related and metabolic conditions. We combine advanced diagnostic tools, evidence-based therapies, and personalized care plans to help patients live healthy, active lives.`,

            overview: {
                heading: "Why Choose Stork Hospital for Endocrine and Metabolic Care",
                intro: "",
                items: [
                    "Experienced endocrinologists with expertise in complex hormonal disorders",
                    "State-of-the-art diagnostic center in Hyderabad for hormone testing, imaging, and metabolic assessments",
                    "Access to advanced surgical center for endocrine surgeries when required",
                    "24/7 emergency hospital near Hitech City for urgent complications",
                    "Insurance accepted at Stork Hospital with clear, transparent pricing",
                    "Same-day consultations and walk-in clinic near Kondapur for quick evaluation",
                    "Coordinated care with dietitians, diabetologists, and other specialists"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Conditions We Treat",
            conditionsTreated: [
                "Diabetes mellitus (Type 1, Type 2, and gestational diabetes)",
                "Thyroid disorders (hypothyroidism, hyperthyroidism, goiter)",
                "Adrenal gland disorders (Addison’s disease, Cushing’s syndrome)",
                "Pituitary gland conditions (hormone deficiencies, tumors)",
                "Metabolic syndrome and obesity-related hormonal imbalances",
                "Calcium and bone metabolism disorders (osteoporosis, hyperparathyroidism)",
                "Reproductive endocrine disorders (PCOS, hormonal infertility)"
            ],

            procedureHeading: "Our Treatment Approach",
            procedureSteps: [
                {
                    title: "Diagnosis",
                    description: "Comprehensive medical history and physical examination. Laboratory tests for hormone levels and metabolic markers. Imaging (ultrasound, CT, MRI) for gland evaluation. Specialized stimulation or suppression hormone tests."
                },
                {
                    title: "Medical Management",
                    description: "Hormone replacement or suppression therapy. Medications to regulate metabolism, sugar control, or growth patterns. Nutritional counseling and lifestyle modification plans. Continuous monitoring to fine-tune treatment."
                },
                {
                    title: "Surgical Care (when needed)",
                    description: "Minimally invasive procedures for thyroid, adrenal, or pituitary tumors. Post-surgical rehabilitation and hormone adjustment."
                }
            ],

            benefitsHeading: "Your Care Journey at Stork Hospital",
            benefits: [
                "Specialist consultation and detailed assessment",
                "Diagnostic testing and review of results",
                "Personalized treatment plan with clear goals",
                "Ongoing monitoring and medication adjustments",
                "Preventive care and lifestyle support for long-term health"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Metabolic and Endocrine Disorders",
            faqs: [
                {
                    question: "Are endocrine disorders curable?",
                    answer: "Some can be completely treated, while others require lifelong management with regular monitoring."
                },
                {
                    question: "Do all metabolic problems cause weight gain?",
                    answer: "No. Symptoms vary and depend on the type of condition, which is why accurate testing is important."
                },
                {
                    question: "Can these disorders be managed without medication?",
                    answer: "Certain mild cases can be controlled with lifestyle changes, but many require a combination of medication and healthy living."
                },
                {
                    question: "Does insurance cover treatment?",
                    answer: "Yes. Stork Hospital works with leading insurance providers and ensures full transparency in billing."
                }
            ],

            customCta: {
                heading: "Book Your Endocrinology Consultation",
                description: "If you are experiencing symptoms such as unexplained weight changes, fatigue, irregular periods, or changes in growth and development, don’t delay diagnosis. Book an appointment at Stork Hospital to meet a specialist in Hyderabad and receive expert care for metabolic and endocrine disorders.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "30-60 Minutes",
                anesthesia: "Not Applicable",
                hospitalStay: "Outpatient",
                recoveryTime: "Immediate",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Sandeep",
                role: "Senior Endocrinologist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "minimally-invasive-surgery") {
        return {
            slug: slug,
            title: "Minimally Invasive Surgery – Stork Hospital, Hyderabad",
            subheading: "Modern Surgical Excellence with a Gentle Approach",
            breadcrumbTitle: "Minimally Invasive Surgery",
            category: "General & Laparoscopic", // Matching existing category
            departmentHref: foundCategory.href || "#",
            shortDescription: `Surgery doesn’t have to mean long hospital stays, large scars, or painful recovery. At Stork Hospital, Hyderabad, we specialize in minimally invasive surgical techniques that prioritize your comfort, reduce downtime, and deliver exceptional outcomes. Using cutting-edge tools and highly skilled surgical teams, we provide safe, precise, and effective care tailored specifically for women.

As a leading women’s healthcare facility in Hyderabad, we’re proud to offer advanced laparoscopic and hysteroscopic surgeries that are less invasive, more efficient, and guided by international best practices.

Why Trust Stork Hospital? We are recognized for performing minimally invasive surgeries in Hyderabad with a high success rate and patient satisfaction. Features include expert surgeons with international training, personalized care plans, comfortable post-op recovery rooms, daycare options, and transparent pricing.`,

            overview: {
                heading: "What is Minimally Invasive Surgery (MIS)?",
                intro: "Minimally invasive surgery involves performing operations through tiny incisions using specialized instruments and real-time imaging. Compared to open surgery, it offers:",
                items: [
                    "Reduced pain and discomfort",
                    "Faster recovery and discharge",
                    "Minimal scarring",
                    "Lower risk of infection",
                    "Better aesthetic and functional results"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Procedures We Commonly Perform",
            conditionsTreated: [
                "**Gynecological Procedures**",
                "Total and partial laparoscopic hysterectomy",
                "Myomectomy (removal of fibroids while preserving uterus)",
                "Diagnostic and operative laparoscopy for unexplained pain or infertility",
                "Hysteroscopic removal of polyps, fibroids, and adhesions",
                "Endometriosis excision and treatment",
                "Ectopic pregnancy management",
                "Ovarian cystectomy",
                "Tubal ligation or evaluation"
            ],

            procedureHeading: "Advanced Technology & Recovery",
            procedureSteps: [
                {
                    title: "Advanced Technology for Superior Outcomes",
                    description: "High-definition laparoscopic and hysteroscopic imaging. Specialized energy devices for bloodless surgery. Real-time navigation and tissue mapping. Advanced sterilization and monitoring systems."
                },
                {
                    title: "Your Recovery Journey Matters",
                    description: "Healing is more than just surgical success. We offer step-by-step recovery guides, nutritional counseling, access to physiotherapy and emotional support, and virtual check-ins."
                }
            ],

            benefitsHeading: "Are You a Candidate for MIS?",
            benefits: [
                "Have been diagnosed with fibroids, cysts, or endometriosis",
                "Require a hysterectomy or uterine-preserving treatment",
                "Prefer minimal disruption to work or home life",
                "Want faster healing and smaller scars"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Minimally Invasive Surgery at Stork",
            faqs: [
                {
                    question: "How soon can I resume work after MIS?",
                    answer: "Most women return to regular activities within 5–10 days, depending on the procedure."
                },
                {
                    question: "Is MIS safe for complex conditions like endometriosis?",
                    answer: "Yes. Our advanced tools and skilled team allow us to manage complex cases with great precision."
                },
                {
                    question: "Will I need general anesthesia?",
                    answer: "Most MIS procedures are done under general anesthesia, but they involve shorter operating times and fewer complications."
                },
                {
                    question: "Does my health insurance cover these procedures?",
                    answer: "Yes. Most major plans include minimally invasive gynecologic surgery coverage in Hyderabad."
                }
            ],

            customCta: {
                heading: "Discover surgical care that puts you first",
                description: "Book an appointment at Stork Hospital—where healing is faster, safer, and designed around you.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "1-3 Hours",
                anesthesia: "General Anesthesia",
                hospitalStay: "Day Care / 1 Night",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Latha", // Placeholder, using a common name or existing one
                role: "Senior Laparoscopic Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "monsplasty") {
        return {
            slug: slug,
            title: "Monsplasty – Stork Hospital, Hyderabad",
            subheading: "Gentle Contouring for a More Confident You",
            breadcrumbTitle: "Monsplasty",
            category: "Gynecology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Monsplasty is a focused surgical procedure that helps reduce and tighten the mons pubis—the fatty area above the pubic bone. At Stork Hospital, Hyderabad, we understand that changes in this intimate region can impact body confidence, daily comfort, and even how clothes fit. Whether due to weight shifts, post-pregnancy changes, or aging, our mons reduction surgery offers a safe and subtle solution.

As a top destination for women’s intimate aesthetic procedures in Hyderabad, we ensure the highest standards of privacy, clinical expertise, and patient comfort.`,

            overview: {
                heading: "What is Monsplasty?",
                intro: "Monsplasty (or pubic lift) involves surgical sculpting of the mons pubis to:",
                items: [
                    "Flatten or reduce fullness in the pubic mound",
                    "Remove sagging or loose skin",
                    "Improve proportions with surrounding areas (abdomen, thighs, vulva)",
                    "Enhance comfort and ease of movement"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Is Monsplasty Right for You?",
            conditionsTreated: [
                "The area above your pubic bone protrudes noticeably",
                "You experience friction, irritation, or difficulty with clothing",
                "Skin laxity has developed due to weight loss or childbirth",
                "You’d like improved body symmetry or feel more confident"
            ],

            procedureHeading: "How the Procedure Works",
            procedureSteps: [
                {
                    title: "Consultation Phase",
                    description: "Individualized planning based on your goals and anatomy. Discussion of your medical history, expectations, and outcome options."
                },
                {
                    title: "Surgery Day",
                    description: "Conducted under local anesthesia with optional sedation. Duration: 60–90 minutes depending on the extent of contouring. May include liposuction and/or skin excision. Minimal scarring with careful incision placement."
                },
                {
                    title: "Healing Process",
                    description: "Return to routine activities in 3–5 days. Temporary swelling, soreness, or tightness may occur. Visible improvements within weeks, with full results in 6–8 weeks."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital?",
            benefits: [
                "Female-led surgical team with expertise in intimate body procedures",
                "Private treatment environment designed for comfort",
                "Customized approach tailored to each individual",
                "Clear pricing with no hidden costs"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "Frequently Asked Questions",
            faqs: [
                {
                    question: "Is monsplasty a major surgery?",
                    answer: "It is a minor procedure, often done under local anesthesia, with rapid recovery."
                },
                {
                    question: "Will there be a scar?",
                    answer: "Most incisions are small and hidden in natural folds; scarring is minimal and fades over time."
                },
                {
                    question: "Can this be combined with other procedures?",
                    answer: "Yes. Many patients opt to combine it with a tummy tuck or labiaplasty for comprehensive results."
                },
                {
                    question: "Is the outcome permanent?",
                    answer: "Results are long-lasting, especially with stable weight and lifestyle maintenance."
                }
            ],

            customCta: {
                heading: "Step into confidence and comfort",
                description: "Book a confidential consultation at Stork Hospital—Hyderabad’s center of excellence for monsplasty and women’s intimate rejuvenation.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "60-90 Minutes",
                anesthesia: "Local / Sedation",
                hospitalStay: "Day Care",
                recoveryTime: "3-5 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Latha",
                role: "Senior Plastic Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "myringotomy") {
        return {
            slug: slug,
            title: "Myringotomy – Stork Hospital, Hyderabad",
            subheading: "Gentle Ear Surgery for Lasting Comfort and Clearer Hearing",
            breadcrumbTitle: "Myringotomy",
            category: "ENT",
            departmentHref: foundCategory.href || "#",
            shortDescription: `A myringotomy is a simple yet highly effective ear surgery in which a tiny opening is made in the eardrum to release trapped fluid or infection from the middle ear. This small step can make a big difference — easing discomfort, restoring hearing, and preventing repeated infections.

At Stork Multispecialty Hospital, Hyderabad, our skilled ENT team uses advanced microscopes and fine surgical instruments to carry out myringotomy with precision. In some cases, a soft ventilation tube (also called a grommet) is placed in the eardrum to keep it open for continued drainage and healthier ear function.

Why Many Patients Prefer Stork Hospital for Myringotomy? Senior ENT specialists with years of experience in pediatric and adult ear surgeries. Advanced surgical center designed for accuracy, safety, and patient comfort. Comprehensive diagnostic center in Hyderabad for hearing tests, tympanometry, and imaging. 24/7 emergency hospital near Hitech City to handle urgent ear-related problems. Insurance accepted at Stork Hospital with clear cost estimates before surgery. Quick access to same-day ENT consultations and walk-in clinic near Kondapur. Comfortable, well-equipped private recovery rooms with caring nursing staff.`,

            overview: {
                heading: "What is Myringotomy?",
                intro: "A myringotomy is a simple yet highly effective ear surgery in which a tiny opening is made in the eardrum to release trapped fluid or infection from the middle ear. This small step can make a big difference — easing discomfort, restoring hearing, and preventing repeated infections.",
                items: [
                    "Release trapped fluid or infection from the middle ear",
                    "Ease discomfort and restore hearing",
                    "Prevent repeated infections and complications",
                    "Improve middle ear ventilation and function"
                ]
            },
            fullDescription: [],

            conditionsHeading: "When Do ENT Doctors Recommend Myringotomy?",
            conditionsTreated: [
                "Chronic middle ear infections that keep returning",
                "Ongoing ear pain or fullness due to fluid buildup",
                "Hearing problems caused by fluid in the middle ear",
                "Recurring ear infections in children affecting learning or speech",
                "Balance issues or dizziness linked to middle ear problems",
                "A need for ventilation tubes to stop further infections"
            ],

            procedureHeading: "How We Perform Myringotomy at Stork Hospital",
            procedureSteps: [
                {
                    title: "Before the Procedure",
                    description: "ENT evaluation and middle ear function tests. Hearing assessment and imaging if needed. Step-by-step explanation of the surgery, recovery process, and aftercare."
                },
                {
                    title: "During the Surgery",
                    description: "Performed under local anesthesia for adults or general anesthesia for children. A tiny incision is made in the eardrum under microscopic view. Fluid or pus is gently removed; a tube may be inserted to aid long-term drainage. Procedure usually completed within 15–30 minutes."
                },
                {
                    title: "After the Procedure",
                    description: "Most patients go home the same day. Pain relief medications and ear care instructions provided. Follow-up visits to monitor healing and, if used, remove the tube later. Lifestyle tips to prevent water from entering the ear until fully healed."
                }
            ],

            benefitsHeading: "What to Expect on Your Visit",
            benefits: [
                "ENT consultation and necessary ear tests",
                "Confirmation of need for surgery",
                "Hospital admission and anesthesia preparation",
                "Myringotomy with or without tube insertion",
                "Discharge on the same day for most cases",
                "Review appointments to ensure complete recovery"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Myringotomy at Stork Hospital",
            faqs: [
                {
                    question: "Will the surgery hurt?",
                    answer: "No — the procedure is done under anesthesia. Mild post-procedure soreness is temporary and well-managed."
                },
                {
                    question: "How soon will I hear better?",
                    answer: "If hearing loss was caused by fluid buildup, improvement can often be noticed immediately after surgery."
                },
                {
                    question: "Is the recovery time long?",
                    answer: "Most adults and children are back to regular activities within a day or two, with some ear precautions."
                },
                {
                    question: "Does insurance cover this surgery?",
                    answer: "Yes. Stork Hospital works with leading insurance providers and gives clear details on coverage before your procedure."
                }
            ],

            customCta: {
                heading: "Take the First Step Toward Better Ear Health",
                description: "Persistent ear pain, infections, or hearing problems should never be ignored. Book an appointment at Stork Hospital to meet an ENT specialist in Hyderabad and discuss if myringotomy is the right choice for you or your child.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "15-30 Minutes",
                anesthesia: "Local / General",
                hospitalStay: "Day Care",
                recoveryTime: "1-2 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Narendran",
                role: "Senior ENT Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "nasal-polyps") {
        return {
            slug: slug,
            title: "Nasal Polyps – Stork Hospital, Hyderabad",
            subheading: "Advanced Care for Sinus Comfort and Clear Breathing",
            breadcrumbTitle: "Nasal Polyps",
            category: "ENT",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Nasal polyps are soft, harmless growths that can form in the lining of your nasal passages or sinuses. They usually develop due to ongoing inflammation caused by allergies, asthma, sinus infections, or immune-related conditions. While tiny polyps may go unnoticed, larger ones can block your nasal airway, disrupt breathing, dull your sense of smell, and lead to recurring sinus issues.

At Stork Multispecialty Hospital, Hyderabad, our ENT team offers complete care for nasal polyps — from thorough diagnosis to targeted treatment and preventive follow-up. We use a combination of medical therapy and advanced surgical techniques to restore healthy airflow and reduce the chances of recurrence.`,

            overview: {
                heading: "What are Nasal Polyps?",
                intro: "Nasal polyps are soft, harmless growths that can form in the lining of your nasal passages or sinuses. They usually develop due to ongoing inflammation caused by allergies, asthma, sinus infections, or immune-related conditions.",
                items: [
                    "Block nasal airway and disrupt breathing",
                    "Dull sense of smell",
                    "Lead to recurring sinus issues",
                    "Cause heaviness or discomfort around the eyes"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Common Signs You May Have Nasal Polyps",
            conditionsTreated: [
                "Constant nasal blockage or difficulty breathing through the nose",
                "Reduced or lost sense of smell",
                "Frequent sinus infections or sinus pressure",
                "Ongoing nasal discharge or postnasal drip",
                "Heaviness or discomfort around the eyes and face",
                "Loud snoring or sleep disturbances from nasal obstruction"
            ],

            procedureHeading: "Our Step-by-Step Treatment Plan",
            procedureSteps: [
                {
                    title: "Accurate Diagnosis",
                    description: "Detailed ENT evaluation and nasal endoscopy. CT scan to assess the size and location of polyps. Allergy or immune system assessment if needed."
                },
                {
                    title: "Non-Surgical Management (best for small or early polyps)",
                    description: "Corticosteroid nasal sprays to shrink polyps and control swelling. Short-term oral steroids in more severe cases. Medicines to address allergies, infections, or inflammation triggers."
                },
                {
                    title: "Surgical Management (for larger or stubborn polyps)",
                    description: "Functional Endoscopic Sinus Surgery (FESS) performed under general anesthesia. Gentle removal of polyps while preserving normal sinus tissue. Post-surgery medications to help prevent recurrence."
                }
            ],

            benefitsHeading: "Why Stork Hospital is the Go-To Choice",
            benefits: [
                "ENT surgeons with years of experience in nasal and sinus surgery",
                "Modern advanced surgical center with endoscopic equipment",
                "Full-service diagnostic center in Hyderabad",
                "Preventive care programs including allergy control"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Nasal Polyp Treatment",
            faqs: [
                {
                    question: "Will all nasal polyps require surgery?",
                    answer: "Not always. Many smaller polyps respond well to medication, but persistent or large ones often need surgical removal."
                },
                {
                    question: "Can nasal polyps grow back?",
                    answer: "They can recur, which is why preventive care and follow-up are key parts of our treatment plan."
                },
                {
                    question: "How long is recovery after surgery?",
                    answer: "Most patients feel relief within days, but complete healing typically takes a few weeks."
                },
                {
                    question: "Does insurance cover this treatment?",
                    answer: "Yes. Stork Hospital partners with leading insurance providers and offers transparent cost discussions before any procedure."
                }
            ],

            customCta: {
                heading: "Book a Sinus Health Appointment",
                description: "If you’re tired of living with constant nasal congestion, sinus pressure, or loss of smell, our ENT team can help. Book an appointment at Stork Hospital to consult an ENT specialist in Hyderabad and explore advanced, personalized treatment for nasal polyps.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "1-2 Hours",
                anesthesia: "General Anesthesia",
                hospitalStay: "Day Care / 1 Night",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Narendran",
                role: "Senior ENT Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "neck-pain") {
        return {
            slug: slug,
            title: "Neck Pain Treatment – Stork Hospital, Hyderabad",
            subheading: "Specialized Spine & Muscular Care for Long-Term Neck Relief",
            breadcrumbTitle: "Neck Pain",
            category: "Orthopedics",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Neck pain is more than just a daily nuisance—it can limit your head movement, disturb your sleep, and even radiate into the shoulders or arms. Often caused by poor posture, stress, disc problems, or degenerative changes, neck discomfort can become chronic if not treated properly. At Stork Hospital, Hyderabad, we specialize in diagnosing and treating neck pain through comprehensive, minimally invasive, and holistic care strategies.

We’re a trusted name for neck pain treatment in Hyderabad, offering solutions that go beyond temporary relief to restore strength, comfort, and flexibility.`,

            overview: {
                heading: "What Causes Neck Pain?",
                intro: "The cervical spine is a delicate structure that supports the weight of your head and facilitates motion. Neck pain can originate from a variety of issues, including:",
                items: [
                    "Muscle strain from poor ergonomics or screen time",
                    "Cervical disc herniation or bulging",
                    "Age-related degeneration such as cervical spondylosis",
                    "Pinched nerves causing radiating pain or numbness",
                    "Whiplash injuries from accidents",
                    "Infections, inflammation, or spinal misalignment",
                    "Bad sleeping posture or improper pillow support"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Common Symptoms",
            conditionsTreated: [
                "Stiffness or limited range of motion",
                "Headaches originating from the neck",
                "Tingling or numbness in arms or hands",
                "Shooting pain down the shoulder blades",
                "Chronic ache or soreness"
            ],

            procedureHeading: "How We Diagnose & Treat Neck Pain",
            procedureSteps: [
                {
                    title: "Detailed Evaluation",
                    description: "Review of medical history, physical symptoms, and posture. Advanced diagnostic tools like MRI, X-ray, or CT scan are used when needed to pinpoint the underlying cause."
                },
                {
                    title: "Non-Surgical Treatment Options",
                    description: "Customized neck physiotherapy focused on posture, flexibility, and strength. Anti-inflammatory medication or muscle relaxants for acute pain. Targeted exercises, traction therapy, and ergonomic support tools. Trigger point therapy, heat/cold applications, and TENS therapy. Stress management strategies and sleep posture guidance."
                },
                {
                    title: "Minimally Invasive Procedures",
                    description: "Nerve root injections or epidural steroid injections for nerve compression. Radiofrequency neurotomy for chronic cervical joint pain. Image-guided precision treatments for faster relief."
                },
                {
                    title: "Surgical Intervention",
                    description: "Rarely required but may be considered in cases of disc prolapse, severe compression, or neurological deficits."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital for Neck Pain Care?",
            benefits: [
                "Expert team of spine specialists, neurologists, and rehab professionals",
                "Modern diagnostics and physiotherapy under one roof",
                "Emphasis on movement restoration and long-term spine health",
                "Non-invasive options prioritized over surgical correction",
                "Leading center for neck pain treatment in Hyderabad"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Neck Pain Care at Stork",
            faqs: [
                {
                    question: "Is neck pain always caused by poor posture?",
                    answer: "While posture plays a big role, injuries, disc problems, or arthritis may also be involved."
                },
                {
                    question: "When should I seek professional help?",
                    answer: "If pain persists beyond a week or spreads to arms or hands, medical evaluation is necessary."
                },
                {
                    question: "Can physiotherapy alone relieve neck pain?",
                    answer: "In many cases, yes. Tailored exercises and rehab provide lasting relief."
                },
                {
                    question: "How soon will I feel better?",
                    answer: "Mild to moderate cases often show improvement within 2–3 weeks of treatment."
                }
            ],

            customCta: {
                heading: "Don’t let neck pain limit your movement",
                description: "Visit Stork Hospital, Hyderabad for personalized, expert care that supports your spine and your life.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Local",
                hospitalStay: "Outpatient",
                recoveryTime: "1-3 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Narendran",
                role: "Senior Spine Specialist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "paraphimosis") {
        return {
            slug: slug,
            title: "Paraphimosis – Stork Hospital, Hyderabad",
            subheading: "Emergency Treatment for a Trapped Foreskin",
            breadcrumbTitle: "Paraphimosis",
            category: "Urology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Paraphimosis occurs when the foreskin is pulled back behind the head (glans) of the penis and becomes stuck, making it impossible to return to its normal position. This can cause swelling, severe discomfort, and restricted blood circulation to the glans, which may lead to serious complications if not treated quickly.

At Stork Multispecialty Hospital, Hyderabad, paraphimosis is treated as an urgent urological emergency. Our team of expert urologists uses gentle yet effective techniques to relieve swelling, restore the foreskin, and protect long-term penile health.`,

            overview: {
                heading: "What is Paraphimosis?",
                intro: "Paraphimosis is a urological emergency where the retracted foreskin becomes trapped behind the glans penis, causing swelling and potential circulation restriction.",
                items: [
                    "Foreskin pulled back and stuck behind the glans",
                    "Causes swelling and severe discomfort",
                    "Restricts blood circulation to the glans",
                    "Requires urgent medical attention"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Signs and Symptoms",
            conditionsTreated: [
                "Swelling and redness of the glans penis",
                "Sharp or throbbing pain",
                "Inability to pull the foreskin forward",
                "Discoloration of the glans (bluish or purple)",
                "Difficulty urinating or urinary blockage"
            ],

            procedureHeading: "Treatment Options at Stork Hospital",
            procedureSteps: [
                {
                    title: "Immediate Reduction",
                    description: "Gentle manual repositioning after applying anesthesia or a numbing gel. Use of cold compresses or medical methods to reduce swelling before repositioning."
                },
                {
                    title: "Medication Support",
                    description: "Painkillers and anti-inflammatory drugs. Antibiotics if an infection is present."
                },
                {
                    title: "Surgical Interventions (when needed)",
                    description: "Dorsal slit – a small cut to release the foreskin. Circumcision – a permanent solution for patients with recurring issues."
                }
            ],

            benefitsHeading: "Why Stork Hospital is Trusted for Paraphimosis Care",
            benefits: [
                "Specialist urologists with expertise in penile and foreskin conditions",
                "24/7 emergency hospital near Hitech City",
                "Advanced surgical center equipped for minimally invasive procedures",
                "Insurance accepted with quick approvals"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "FAQs – Paraphimosis",
            faqs: [
                {
                    question: "Is paraphimosis a medical emergency?",
                    answer: "Yes. Delayed treatment can cause permanent damage to the penis."
                },
                {
                    question: "Will it resolve by itself?",
                    answer: "No. Medical intervention is essential."
                },
                {
                    question: "Is circumcision always necessary?",
                    answer: "Not always — it’s recommended for recurrent or severe cases."
                },
                {
                    question: "Does insurance cover the treatment?",
                    answer: "Yes. Stork Hospital accepts most insurance plans for emergency urological care."
                }
            ],

            customCta: {
                heading: "Seek Immediate Help for Paraphimosis",
                description: "If your foreskin is stuck behind the glans and cannot be moved forward, visit Stork Hospital right away to see an experienced urologist in Hyderabad for urgent, expert care.",
                buttonText: "Get Emergency Care"
            },
            meta: {
                duration: "30-60 Minutes",
                anesthesia: "Local / General",
                hospitalStay: "Day Care",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Sujith",
                role: "Senior Urologist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "pcnl") {
        return {
            slug: slug,
            title: "PCNL (Percutaneous Nephrolithotomy) – Stork Hospital, Hyderabad",
            subheading: "Keyhole Surgery for Large and Complex Kidney Stones",
            breadcrumbTitle: "PCNL",
            category: "Urology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Percutaneous Nephrolithotomy (PCNL) is an advanced, minimally invasive “keyhole” procedure designed to remove kidney stones that are too large, numerous, or complex for non-surgical treatments such as ESWL or RIRS. In this method, the surgeon creates a small incision in the back to directly access the kidney and remove stones using a combination of endoscopic instruments and laser or ultrasonic technology.

At Stork Multispecialty Hospital, Hyderabad, our team of expert urologists specializes in performing PCNL with high precision, ensuring faster recovery, minimal discomfort, and excellent outcomes.`,

            overview: {
                heading: "Advantages of PCNL at Stork Hospital",
                intro: "PCNL is a highly effective procedure for large or complex kidney stones, offering several advantages over traditional open surgery.",
                items: [
                    "High success rate in a single procedure",
                    "Minimally invasive approach with reduced tissue trauma",
                    "Shorter hospital stay compared to open stone surgery",
                    "Effective removal of large or hard-to-reach stones",
                    "Quicker return to daily routines"
                ]
            },
            fullDescription: [],

            conditionsHeading: "When PCNL May Be Needed",
            conditionsTreated: [
                "Kidney stones larger than 2 cm in diameter",
                "Multiple stones or “staghorn” calculi occupying large portions of the kidney",
                "Stones that have not responded to other treatments",
                "Severe pain or urinary obstruction due to complex stones",
                "Stones associated with persistent infections"
            ],

            procedureHeading: "How PCNL is Performed",
            procedureSteps: [
                {
                    title: "Pre-Procedure Assessment",
                    description: "Detailed imaging (CT, Ultrasound, X-ray) and blood tests to determine stone size, number, and location."
                },
                {
                    title: "Anesthesia",
                    description: "General anesthesia to keep the patient comfortable throughout the procedure."
                },
                {
                    title: "Small Back Incision",
                    description: "A tiny opening is made in the back to reach the kidney directly."
                },
                {
                    title: "Stone Fragmentation & Removal",
                    description: "Stones are broken with laser or ultrasonic probes and removed through the scope."
                },
                {
                    title: "Temporary Drainage & Post-Procedure Imaging",
                    description: "Placement of a nephrostomy tube or stent if needed. Imaging ensures no stone fragments remain."
                }
            ],

            benefitsHeading: "Why Stork Hospital is a Trusted Choice for PCNL",
            benefits: [
                "Specialist urologists with extensive PCNL expertise",
                "Modern diagnostic center with advanced CT and imaging technology",
                "Advanced surgical center with the latest endoscopic and laser devices",
                "24/7 emergency hospital near Hitech City",
                "Complete post-surgery follow-up for stone prevention"
            ],

            risks: [],
            recoveryTimeline: [
                "Usual hospital stay of 1–2 days",
                "Avoiding heavy lifting or strenuous activity for 1–2 weeks",
                "Staying well-hydrated to prevent stone recurrence",
                "Pain control and antibiotics to aid healing",
                "Scheduled follow-ups to monitor kidney health"
            ],

            faqHeading: "FAQs – PCNL",
            faqs: [
                {
                    question: "Is PCNL a safe surgery?",
                    answer: "Yes. When performed by skilled urologists, it is considered one of the safest procedures for large stones."
                },
                {
                    question: "How long will the procedure take?",
                    answer: "Typically between 1 and 2 hours, depending on the number and complexity of stones."
                },
                {
                    question: "Will there be visible scarring?",
                    answer: "Only a small incision is made, which usually heals with minimal scarring."
                },
                {
                    question: "Is PCNL covered by insurance?",
                    answer: "Yes. Stork Hospital works with most insurance providers for medically necessary stone removal."
                }
            ],

            customCta: {
                heading: "Book Your PCNL Consultation",
                description: "If you have been diagnosed with large or complex kidney stones, schedule an appointment at Stork Hospital to consult a urologist in Hyderabad and explore whether PCNL is the best solution for you.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "1-2 Hours",
                anesthesia: "General Anesthesia",
                hospitalStay: "1-2 Days",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Sujith",
                role: "Senior Urologist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "pelvic-floor-disorders") {
        return {
            slug: slug,
            title: "Pelvic Floor Disorders – Stork Hospital, Hyderabad",
            subheading: "Helping You Regain Comfort and Control",
            breadcrumbTitle: "Pelvic Floor Disorders",
            category: "Gynecology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Pelvic floor disorders (PFDs) affect the support system of a woman’s pelvic organs—bladder, uterus, and rectum. These conditions can significantly disrupt daily life by causing symptoms like urinary leakage, pelvic discomfort, and difficulty with bowel control. At Stork Hospital, Hyderabad, we take a sensitive, comprehensive approach to pelvic health—combining medical expertise with a deep understanding of what women need to feel safe, supported, and healed.

As a recognized women-focused hospital in Hyderabad, we provide accurate diagnosis, modern treatment options, and personalized follow-up for lasting results.`,

            overview: {
                heading: "What Are Pelvic Floor Disorders?",
                intro: "PFDs develop when the pelvic muscles or connective tissues become weak, strained, or injured. Common causes include pregnancy, childbirth, aging, surgery, or repetitive strain.",
                items: [
                    "Accidental urine leakage",
                    "Vaginal bulging or pressure",
                    "Painful urination or bowel movements",
                    "Discomfort during intimacy",
                    "Frequent urge to urinate"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Conditions We Commonly Treat",
            conditionsTreated: [
                "Urinary incontinence (stress, urge, overflow)",
                "Pelvic organ prolapse (uterus, bladder, rectum)",
                "Constipation and fecal incontinence",
                "Chronic pelvic discomfort or heaviness",
                "Painful intercourse (dyspareunia)",
                "Postnatal pelvic floor weakness",
                "Overactive bladder symptoms"
            ],

            procedureHeading: "Our Approach to Pelvic Floor Care",
            procedureSteps: [
                {
                    title: "Advanced Diagnostics",
                    description: "Private consultation with pelvic health experts. Pelvic examination and ultrasound. Bladder testing and imaging as needed. Functional assessment of pelvic muscles."
                },
                {
                    title: "Nonsurgical Options",
                    description: "Pelvic muscle training and guided physiotherapy. Vaginal pessary devices for organ support. Hormonal therapy and medications. Diet and behavior modifications."
                },
                {
                    title: "Minimally Invasive Surgery (if required)",
                    description: "Sling surgery for incontinence control. Vaginal or laparoscopic prolapse repair. Uterus-conserving surgical options."
                }
            ],

            benefitsHeading: "Why Choose Stork for Pelvic Wellness",
            benefits: [
                "Specialists in urogynecology and pelvic rehabilitation",
                "On-site diagnostics and physiotherapy support",
                "Discreet, compassionate treatment environment",
                "Affordable treatment plans and maternity add-ons",
                "Collaboration with most health insurance providers in Hyderabad",
                "Easy-to-book online consultations"
            ],

            risks: [],
            recoveryTimeline: [
                "Detailed home recovery exercises",
                "Scheduled progress reviews and follow-ups",
                "Support for hormonal and emotional well-being",
                "Virtual consults for ongoing guidance"
            ],

            faqHeading: "FAQs – Pelvic Floor Treatment at Stork Hospital",
            faqs: [
                {
                    question: "Can these issues be resolved without surgery?",
                    answer: "Yes, many women improve significantly through conservative care such as physiotherapy and lifestyle changes."
                },
                {
                    question: "Do only older women experience pelvic issues?",
                    answer: "Not at all. These symptoms can arise even in younger women post-childbirth or due to physical strain."
                },
                {
                    question: "How long does surgical recovery usually take?",
                    answer: "Most women recover within a few weeks and resume normal activity with guided care."
                },
                {
                    question: "Are these treatments covered by insurance?",
                    answer: "Yes. We accept most major health plans and also offer maternity packages that include pelvic health checks."
                }
            ],

            customCta: {
                heading: "Don’t let pelvic health concerns go untreated",
                description: "Book a consultation with Stork Hospital, where women’s wellness is cared for with skill and heart in Hyderabad.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Local / General",
                hospitalStay: "Outpatient / Day Care",
                recoveryTime: "Varies",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Latha",
                role: "Senior Gynecologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "perianal-abscess") {
        return {
            slug: slug,
            title: "Perianal Abscess – Stork Hospital, Hyderabad",
            subheading: "Prompt and Expert Care for Perianal Abscesses",
            breadcrumbTitle: "Perianal Abscess",
            category: "Proctology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `A perianal abscess is a painful collection of pus that forms in the tissue surrounding the anus, usually due to infection in a small anal gland. It can cause severe discomfort, swelling, redness, and fever if left untreated. In many cases, a perianal abscess may lead to an anal fistula if not addressed promptly.

At Stork Multispecialty Hospital, Hyderabad, our experienced gastroenterologists and colorectal surgeons provide immediate and effective treatment for perianal abscesses. We focus on quick relief, complete drainage of infection, and prevention of future complications.`,

            overview: {
                heading: "Causes and Risk Factors",
                intro: "Perianal abscesses are often caused by blocked anal glands, but other factors can increase the risk.",
                items: [
                    "Blocked or infected anal glands",
                    "Crohn’s disease or ulcerative colitis",
                    "Injury or trauma to the anal region",
                    "Weakened immune system",
                    "History of anal fistulas or abscesses"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Symptoms of a Perianal Abscess",
            conditionsTreated: [
                "Severe pain near the anus, especially when sitting or moving",
                "Swelling and redness in the perianal area",
                "Warmth and tenderness on touch",
                "Pus or blood discharge from the affected site",
                "Fever, fatigue, and general discomfort"
            ],

            procedureHeading: "Treatment Options at Stork Hospital",
            procedureSteps: [
                {
                    title: "Emergency Drainage Procedure (primary treatment)",
                    description: "Incision and drainage – a small cut is made to release pus and relieve pressure. Performed under local or general anesthesia depending on abscess size and severity."
                },
                {
                    title: "Additional Care",
                    description: "Antibiotics to control infection (when required). Pain management and wound care instructions. Follow-up visits to check healing and detect early signs of fistula formation."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital for Perianal Abscess Treatment",
            benefits: [
                "Highly skilled gastroenterologists and colorectal surgeons",
                "In-house diagnostic center in Hyderabad for accurate imaging",
                "Advanced surgical center for minimally invasive drainage procedures",
                "24/7 emergency hospital near Hitech City for urgent care",
                "Complete aftercare to promote healing and avoid recurrence"
            ],

            risks: [],
            recoveryTimeline: [
                "Immediate assessment and diagnosis",
                "Abscess drainage with sterile technique",
                "Daily wound cleaning and dressing changes",
                "Dietary and hygiene advice to aid healing",
                "Monitoring for recurrence or fistula development"
            ],

            faqHeading: "FAQs – Perianal Abscess",
            faqs: [
                {
                    question: "Can a perianal abscess heal without drainage?",
                    answer: "No, surgical drainage is usually necessary for complete healing."
                },
                {
                    question: "Is the procedure painful?",
                    answer: "Modern anesthesia ensures minimal discomfort during the procedure, and pain is well-managed afterward."
                },
                {
                    question: "Can it turn into a fistula?",
                    answer: "Yes, untreated abscesses can lead to anal fistulas, which require more complex surgery."
                },
                {
                    question: "Is it covered by insurance?",
                    answer: "Yes. Stork Hospital accepts most insurance plans with transparent billing."
                }
            ],

            customCta: {
                heading: "Book Your Perianal Abscess Consultation",
                description: "If you notice pain, swelling, or pus near the anus, book an appointment at Stork Hospital to meet a colorectal specialist in Hyderabad for prompt and effective treatment.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "15-30 Minutes",
                anesthesia: "Local / General",
                hospitalStay: "Day Care",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Latha",
                role: "Senior Proctologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "phimosis") {
        return {
            slug: slug,
            title: "Phimosis – Stork Hospital, Hyderabad",
            subheading: "Gentle and Effective Treatment for Tight Foreskin",
            breadcrumbTitle: "Phimosis",
            category: "Urology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Phimosis occurs when the foreskin cannot be pulled back over the glans (head) of the penis. While it is common in infants and young boys — and usually improves naturally with age — in teenagers and adults it can cause pain, difficulty passing urine, infections, or discomfort during sexual activity. Persistent phimosis can also lead to repeated inflammation such as balanitis or balanoposthitis if left untreated.

At Stork Multispecialty Hospital, Hyderabad, we provide discreet, patient-centered care for phimosis, offering both conservative and surgical treatment options to restore comfort and protect long-term genital health.`,

            overview: {
                heading: "Possible Causes of Phimosis",
                intro: "Phimosis can be caused by various factors, ranging from natural conditions to infections.",
                items: [
                    "Natural tightness in childhood (physiological phimosis)",
                    "Scarring from repeated infections or inflammation (pathological phimosis)",
                    "Poor hygiene beneath the foreskin",
                    "Skin disorders such as lichen sclerosus",
                    "Diabetes and other conditions lowering immunity"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Common Symptoms",
            conditionsTreated: [
                "Difficulty or inability to retract the foreskin",
                "Pain, swelling, or redness during urination or sexual activity",
                "Ballooning of the foreskin while urinating",
                "Recurrent infections under the foreskin",
                "Itching, irritation, or tenderness"
            ],

            procedureHeading: "Phimosis Treatments at Stork Hospital",
            procedureSteps: [
                {
                    title: "Non-Surgical Options",
                    description: "Application of topical steroid creams to gently loosen the foreskin. Medically supervised stretching techniques. Managing infections or inflammation before further treatment."
                },
                {
                    title: "Surgical Solutions",
                    description: "Circumcision – permanent solution by removing the foreskin entirely. Preputioplasty – foreskin-preserving surgery that widens the opening while maintaining natural appearance."
                }
            ],

            benefitsHeading: "Why Patients Choose Stork Hospital for Phimosis Care",
            benefits: [
                "Experienced urologists with expertise in foreskin-related concerns",
                "Modern diagnostic center in Hyderabad for accurate evaluation",
                "Fully equipped advanced surgical center for circumcision",
                "24/7 emergency hospital near Hitech City for urgent urological issues",
                "Walk-in clinic near Kondapur for same-day, confidential consultations"
            ],

            risks: [],
            recoveryTimeline: [
                "Cream treatments may require several weeks for noticeable improvement",
                "Surgical recovery usually takes 7–10 days for most patients",
                "Maintain good hygiene and follow post-treatment instructions closely",
                "Avoid sexual activity, sports, or heavy exercise until medically cleared"
            ],

            faqHeading: "FAQs – Phimosis",
            faqs: [
                {
                    question: "Is phimosis normal in boys?",
                    answer: "Yes, it’s common in early childhood and often resolves naturally."
                },
                {
                    question: "Can phimosis be treated without surgery?",
                    answer: "Yes, many cases respond well to topical creams and stretching under medical supervision."
                },
                {
                    question: "What happens if phimosis is left untreated?",
                    answer: "It can cause repeated infections, urinary problems, and sexual discomfort."
                },
                {
                    question: "Will my insurance cover the surgery?",
                    answer: "Yes. Most insurance providers cover circumcision or corrective surgery when medically necessary."
                }
            ],

            customCta: {
                heading: "Book a Private Consultation for Phimosis",
                description: "If a tight foreskin is causing pain, infections, or difficulty, visit Stork Hospital to consult with an expert urologist in Hyderabad and receive a treatment plan tailored to your needs.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "30-45 Minutes",
                anesthesia: "Local / General",
                hospitalStay: "Day Care / Outpatient",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Sujith",
                role: "Senior Urologist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "piles-hemorrhoids") {
        return {
            slug: slug,
            title: "Piles (Hemorrhoids) – Stork Hospital, Hyderabad",
            subheading: "Advanced, Comfortable Solutions for Hemorrhoids",
            breadcrumbTitle: "Piles (Hemorrhoids)",
            category: "Proctology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Piles, commonly referred to as hemorrhoids, occur when veins in the lower rectum or around the anus become enlarged and swollen. They may be located internally, inside the rectum, or externally, under the skin around the anus. This condition can lead to itching, swelling, discomfort, and bleeding during bowel movements. While early-stage piles can often be controlled with diet and lifestyle adjustments, moderate to severe cases may require medical intervention.

At Stork Multispecialty Hospital, Hyderabad, our gastroenterology and colorectal care team offers minimally invasive and laser-assisted treatments that focus on relieving symptoms, preventing recurrence, and ensuring patient comfort throughout the process.`,

            overview: {
                heading: "Causes of Hemorrhoids",
                intro: "Hemorrhoids can develop due to various factors that increase pressure in the lower rectum.",
                items: [
                    "Straining during bowel movements due to constipation",
                    "Chronic diarrhea or irregular bowel habits",
                    "Prolonged sitting, especially on the toilet",
                    "Pregnancy-related pressure on pelvic blood vessels",
                    "Overweight or sedentary lifestyle",
                    "Aging, which reduces elasticity in rectal tissues"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Warning Signs and Symptoms",
            conditionsTreated: [
                "Discomfort, burning, or itching in the anal region",
                "Bright red blood after passing stool",
                "Swelling or lump formation near the anus",
                "Mucus discharge from the anal opening",
                "Pain when sitting or during bowel movements"
            ],

            procedureHeading: "Treatment Approaches at Stork Hospital",
            procedureSteps: [
                {
                    title: "Lifestyle & Medical Management (for mild piles)",
                    description: "High-fiber diet to soften stools. Increased water intake. Topical medications. Sitz baths. Stool softeners."
                },
                {
                    title: "Minimally Invasive & Surgical Treatments (for advanced cases)",
                    description: "Rubber Band Ligation. Sclerotherapy. Laser Hemorrhoid Surgery. Hemorrhoidectomy (complete removal for large or persistent piles)."
                }
            ],

            benefitsHeading: "Why Patients Choose Stork Hospital for Piles Treatment",
            benefits: [
                "Highly trained gastroenterologists and colorectal surgeons",
                "In-house diagnostic center in Hyderabad for accurate evaluation",
                "Advanced surgical center equipped with laser technology",
                "24/7 emergency hospital near Hitech City for urgent rectal care",
                "Personalized aftercare plans and dietary guidance"
            ],

            risks: [],
            recoveryTimeline: [
                "Comprehensive consultation and diagnosis",
                "Selection of the least invasive yet most effective treatment option",
                "Pain and swelling control post-treatment",
                "Dietary, hydration, and bowel movement guidance",
                "Scheduled follow-up visits"
            ],

            faqHeading: "FAQs – Piles",
            faqs: [
                {
                    question: "Will piles disappear without surgery?",
                    answer: "Small hemorrhoids often improve with diet, hydration, and lifestyle changes, but persistent piles require medical or surgical care."
                },
                {
                    question: "Is laser surgery painful?",
                    answer: "Laser-assisted procedures cause minimal discomfort and allow for faster recovery than traditional surgery."
                },
                {
                    question: "How long before I can return to daily activities?",
                    answer: "Many patients resume light activities within a few days, though full recovery depends on the treatment chosen."
                },
                {
                    question: "Will my insurance cover the cost?",
                    answer: "Yes. Stork Hospital accepts most insurance plans and offers complete transparency in billing."
                }
            ],

            customCta: {
                heading: "Book Your Consultation for Piles Treatment",
                description: "Don’t let piles disrupt your life. Book an appointment at Stork Hospital to see a piles specialist in Hyderabad and explore advanced, minimally invasive solutions for lasting relief.",
                buttonText: "Book Consultation"
            },
            meta: {
                duration: "30-60 Minutes",
                anesthesia: "Local / General",
                hospitalStay: "Day Care / Overnight",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Latha",
                role: "Senior Proctologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "pilonidal-sinus") {
        return {
            slug: slug,
            title: "Pilonidal Sinus – Stork Hospital, Hyderabad",
            subheading: "Advanced, Minimally Invasive Care for Pilonidal Sinus",
            breadcrumbTitle: "Pilonidal Sinus",
            category: "Proctology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `A pilonidal sinus is a small tunnel or tract that forms under the skin near the cleft of the buttocks, often containing hair, debris, and skin fragments. Over time, it can become infected, causing pain, swelling, redness, and discharge of pus or blood. The condition is more common in young adults, people with thick body hair, and those who sit for prolonged periods.

At Stork Multispecialty Hospital, Hyderabad, our experienced surgeons provide precise diagnosis and modern, minimally invasive treatments for pilonidal sinus to ensure quick healing, minimal discomfort, and a low recurrence rate.`,

            overview: {
                heading: "Causes and Risk Factors",
                intro: "Pilonidal sinus is often associated with hair follicles and friction in the natal cleft.",
                items: [
                    "Ingrown hairs trapped beneath the skin",
                    "Prolonged sitting or friction in the buttock area",
                    "Excessive sweating and poor hygiene",
                    "Family history of pilonidal sinus",
                    "Trauma or irritation to the skin near the tailbone"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Symptoms of Pilonidal Sinus",
            conditionsTreated: [
                "Pain or swelling near the cleft of the buttocks",
                "Redness or tenderness in the affected area",
                "Pus or blood discharge from a small opening",
                "Foul odor due to infection",
                "Fever and fatigue in severe cases"
            ],

            procedureHeading: "Treatment Options at Stork Hospital",
            procedureSteps: [
                {
                    title: "Non-Surgical Care (for mild, non-infected cases)",
                    description: "Antibiotics to control infection. Hair removal and hygiene maintenance. Regular wound cleaning."
                },
                {
                    title: "Surgical & Minimally Invasive Procedures (for recurring or severe cases)",
                    description: "Incision and drainage – quick relief for abscess formation. Laser pilonidal sinus surgery – minimally invasive method for reduced downtime. Excision with flap closure – removing the sinus tract and closing with healthy tissue for long-term results."
                }
            ],

            benefitsHeading: "Why Stork Hospital is the Preferred Choice for Pilonidal Sinus Treatment",
            benefits: [
                "Experienced general and colorectal surgeons skilled in advanced techniques",
                "On-site diagnostic center in Hyderabad for accurate assessment",
                "Advanced surgical center with laser-assisted and minimally invasive options",
                "24/7 emergency hospital near Hitech City for prompt medical care",
                "Dedicated wound care and follow-up to prevent recurrence"
            ],

            risks: [],
            recoveryTimeline: [
                "Detailed diagnosis to determine the extent of the sinus",
                "Minimally invasive or surgical procedure tailored to the patient’s condition",
                "Wound care instructions to promote healing",
                "Advice on hygiene, posture, and hair removal to prevent recurrence",
                "Regular follow-ups to monitor progress"
            ],

            faqHeading: "FAQs – Pilonidal Sinus",
            faqs: [
                {
                    question: "Can pilonidal sinus heal without surgery?",
                    answer: "Mild cases may improve temporarily, but surgery is often required to prevent recurrence."
                },
                {
                    question: "Is laser surgery effective?",
                    answer: "Yes, laser-assisted surgery offers faster recovery, less pain, and minimal scarring."
                },
                {
                    question: "How long does recovery take?",
                    answer: "Most patients resume light activities within a few days, depending on the treatment method."
                },
                {
                    question: "Does insurance cover this treatment?",
                    answer: "Yes. Stork Hospital works with most insurance providers and ensures transparent billing."
                }
            ],

            customCta: {
                heading: "Book Your Pilonidal Sinus Consultation",
                description: "If you are experiencing pain, swelling, or discharge near the buttock area, book an appointment at Stork Hospital to meet a specialist in Hyderabad and get safe, effective treatment with lasting results.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "30-45 Minutes",
                anesthesia: "Local / General",
                hospitalStay: "Day Care",
                recoveryTime: "1-3 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Latha",
                role: "Senior Proctologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "postpartum-care") {
        return {
            slug: slug,
            title: "Postpartum Care – Stork Hospital, Hyderabad",
            subheading: "Comprehensive Postnatal Support & Recovery",
            breadcrumbTitle: "Postpartum Care",
            category: "Gynecology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Bringing a baby into the world is a powerful experience, but what follows—the postpartum phase—is equally significant. This period, often overlooked, involves the mother’s physical recovery, emotional adjustment, and adaptation to life with a newborn. At Stork Hospital, Hyderabad, postpartum care is not just a follow-up—it’s a focused, nurturing phase of healing, restoration, and personalized support designed to help new mothers transition smoothly into motherhood.

Our approach is recognized as part of a patient-first care experience, with women’s wellness clinic support and trusted maternity and fertility care under one roof.`,

            overview: {
                heading: "What Does Postpartum Care Help With?",
                intro: "Post-delivery care is essential to detect and manage several health aspects that arise after childbirth.",
                items: [
                    "Healing of cesarean or vaginal delivery wounds",
                    "Managing postpartum bleeding and uterine shrinkage",
                    "Breastfeeding initiation and support",
                    "Mood swings, irritability, or signs of postpartum depression",
                    "Bowel or bladder challenges",
                    "Fatigue, joint discomfort, and sleep irregularities",
                    "Nutrient replenishment and dietary adjustment",
                    "Intimacy, sexual health, and future fertility planning"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Who Should Prioritize Postnatal Support?",
            conditionsTreated: [
                "First-time moms adjusting to physical and emotional changes",
                "Women recovering from surgery or assisted births",
                "Mothers with a history of postpartum complications",
                "Those managing health issues like thyroid imbalance or anemia",
                "Women experiencing feeding difficulties or bonding issues",
                "Families requiring guidance in newborn care"
            ],

            procedureHeading: "What You’ll Receive at Stork Hospital",
            procedureSteps: [
                {
                    title: "Clinical Monitoring & Medical Check-ups",
                    description: "Postnatal reviews during weeks 2 and 6. Monitoring uterus, bleeding, stitches, and vitals. Chronic illness management (thyroid, BP, sugar)."
                },
                {
                    title: "Breastfeeding & Newborn Feeding Support",
                    description: "Assistance with latching and feeding positions. Advice on milk supply issues or discomfort. Introduction to breast pumps or combination feeding (if necessary)."
                },
                {
                    title: "Nutrition & Energy Rebuilding",
                    description: "Recovery-focused diet plans tailored to your needs. Supplement guidance (iron, folic acid, calcium, etc.). Practical hydration and meal strategies for new mothers."
                },
                {
                    title: "Emotional and Mental Health Wellness",
                    description: "Emotional screening for mood disorders or stress. Counselling for anxiety, burnout, or depressive thoughts. Mind-body balance strategies and lifestyle tips."
                },
                {
                    title: "Reproductive Health & Contraception",
                    description: "Personalized birth spacing advice. Discussion of safe contraceptive options. Planning your next pregnancy (if desired)."
                }
            ],

            benefitsHeading: "Why Stork Hospital is the Trusted Name for Postpartum Care",
            benefits: [
                "Trained Postnatal Experts, OB-GYNs, and Lactation Coaches",
                "Emphasis on Whole-Mother Healing—Physical + Emotional",
                "Continuity of Care from Delivery Room to Recovery",
                "Real-Time Breastfeeding Guidance & Family Education",
                "Respectful Listening, Thoughtful Advice, and Non-Judgmental Support",
                "Hospital with caring nursing staff and affordable treatment packages"
            ],

            risks: [],
            recoveryTimeline: [
                "Guidance on newborn sleep and feeding rhythms",
                "Support for pain, bleeding, and personal care at home",
                "Emotional check-ins and advice on returning to work/life routines",
                "Vaccination reminders and pediatric referrals",
                "Ongoing availability for postnatal questions or concerns"
            ],

            faqHeading: "FAQs – Postpartum Care",
            faqs: [
                {
                    question: "How soon should I see a doctor after childbirth?",
                    answer: "Ideally within 10–14 days for your first check-up and again around 6 weeks, unless advised otherwise."
                },
                {
                    question: "I feel “off” emotionally—what should I do?",
                    answer: "Please speak to us. Feeling overwhelmed is common, and our psychologists and counselors are here to support you confidentially."
                },
                {
                    question: "Will you help me with my baby’s sleep and feeding routines?",
                    answer: "Yes. Our postpartum nurses and lactation experts provide detailed guidance on soothing, feeding, and establishing newborn routines."
                },
                {
                    question: "Can I discuss family planning now?",
                    answer: "Absolutely. During your postnatal visits, we help you choose safe and effective birth control options based on your preferences and health."
                }
            ],

            customCta: {
                heading: "Book Your Postpartum Care Appointment",
                description: "To begin your healing journey, book an appointment at Stork Hospital—the best hospital for women’s health in Hyderabad. We’re with you every step of the way.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None",
                hospitalStay: "Outpatient",
                recoveryTime: "6-8 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Latha",
                role: "Senior Gynecologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "prenatal-care") {
        return {
            slug: slug,
            title: "Prenatal Care – Stork Hospital, Hyderabad",
            subheading: "Comprehensive Support for a Healthy Pregnancy",
            breadcrumbTitle: "Prenatal Care",
            category: "Gynecology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Prenatal care is a structured and ongoing medical approach that supports women throughout their pregnancy journey. It involves regular check-ups, timely screenings, nutritional counseling, and continuous monitoring to ensure the well-being of both mother and baby. At Stork Hospital, Hyderabad, we provide holistic prenatal care that combines advanced diagnostics with warmth, empathy, and personalized attention—so every expecting mother feels confident and cared for at every stage.

We are a multispecialty hospital in Telangana offering pregnancy care in Hyderabad, and are known as one of the most trusted maternity hospitals for complete care from conception to delivery.`,

            overview: {
                heading: "Symptoms / Conditions it Helps Manage",
                intro: "While prenatal care is preventive by nature, it also helps detect and manage conditions such as:",
                items: [
                    "Pregnancy-related high blood pressure or diabetes",
                    "Anemia and thyroid imbalances",
                    "Abnormal fetal growth or low amniotic fluid",
                    "Placenta-related concerns",
                    "Risks of preterm labor or miscarriage",
                    "Genetic or chromosomal concerns (through early screenings)",
                    "PCOS management, thyroid issues, or chronic illness"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Who Should Receive Prenatal Care?",
            conditionsTreated: [
                "All pregnant women, from the moment of conception",
                "Women above 35 or under 18 years of age",
                "Those with previous pregnancy complications",
                "Women managing chronic health conditions (e.g., PCOS, diabetes, epilepsy)",
                "Those expecting twins or multiples",
                "Women with a family history of genetic conditions"
            ],

            procedureHeading: "What to Expect at Stork Hospital",
            procedureSteps: [
                {
                    title: "First Trimester (0–12 Weeks)",
                    description: "Confirmation of pregnancy. Baseline health assessments. Nutritional guidance and colic acid supplements. Screening for infections and genetic risks."
                },
                {
                    title: "Second Trimester (13–28 Weeks)",
                    description: "Anomaly scan. Glucose tolerance test. Iron and calcium supplementation. Growth scans. Diet and exercise review."
                },
                {
                    title: "Third Trimester (29 Weeks – Delivery)",
                    description: "Monitoring for labor signs, fetal movement and positioning. Final growth scans and Doppler studies. Birth planning and delivery counseling. Antenatal classes."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital for Prenatal Care in Hyderabad?",
            benefits: [
                "Expert Obstetricians & Maternal-Fetal Medicine Specialists",
                "In-House Labs & Real-Time Ultrasound Imaging",
                "Safe, Private, and Woman-Friendly Infrastructure",
                "24x7 Emergency Support for High-Risk Pregnancies",
                "Wellness Support: Yoga, Diet, Mental Health Counseling",
                "Continuity of Care—from First Scan to Final Push"
            ],

            risks: [],
            recoveryTimeline: [
                "Postnatal check-ups to monitor recovery",
                "Lactation support and breastfeeding guidance",
                "Emotional well-being sessions to manage postpartum stress",
                "Newborn care education for first-time parents",
                "Virtual doctor appointments available"
            ],

            faqHeading: "FAQs about Prenatal Care",
            faqs: [
                {
                    question: "How early should I start prenatal visits?",
                    answer: "Ideally, as soon as you miss your period and confirm pregnancy. Early care ensures early detection of risks."
                },
                {
                    question: "How many prenatal visits are required?",
                    answer: "Typically: Monthly till 28 weeks, Biweekly till 36 weeks, Weekly until delivery."
                },
                {
                    question: "Are prenatal vitamins necessary?",
                    answer: "Yes. Folic acid, iron, calcium, and vitamin D are crucial for fetal development and maternal health."
                },
                {
                    question: "Can I exercise during pregnancy?",
                    answer: "Absolutely! With your doctor’s approval, moderate walking, stretching, and pregnancy yoga are encouraged."
                }
            ],

            customCta: {
                heading: "Book Your Prenatal Care Appointment",
                description: "For complete maternal care, book an appointment at Stork Hospital, the best hospital for women’s health in Hyderabad and your trusted partner in every trimester.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Ongoing",
                anesthesia: "None",
                hospitalStay: "Outpatient",
                recoveryTime: "N/A",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Latha",
                role: "Senior Gynecologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "prostatectomy") {
        return {
            slug: slug,
            title: "Prostatectomy – Stork Hospital, Hyderabad",
            subheading: "Precision Surgery for Prostate Health",
            breadcrumbTitle: "Prostatectomy",
            category: "Urology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `A prostatectomy is a surgical operation in which part or all of the prostate gland is removed. It is often performed to treat prostate cancer, advanced benign prostatic hyperplasia (BPH), or other serious prostate-related conditions affecting urinary or reproductive function. Depending on the patient’s needs, the procedure may be carried out using open surgery, keyhole laparoscopic techniques, or advanced robotic-assisted methods that allow for greater accuracy and faster recovery.

At Stork Multispecialty Hospital, Hyderabad, our team of highly trained urologists provides a complete treatment pathway — from accurate diagnosis and surgical planning to careful post-operative care — ensuring patient comfort, safety, and long-term results.`,

            overview: {
                heading: "When Prostatectomy is Needed",
                intro: "Your doctor may recommend a prostatectomy for conditions such as:",
                items: [
                    "Localized prostate cancer that can be surgically removed",
                    "Severe BPH symptoms not responding to medicines or other procedures",
                    "Significant damage to the prostate from injury or disease",
                    "Bladder and urinary problems caused by prostate enlargement or blockage"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Types of Prostatectomy We Offer",
            conditionsTreated: [
                "Radical Prostatectomy – Complete removal for cancer treatment",
                "Simple Prostatectomy – Removal of enlarged portion for BPH",
                "Minimally Invasive & Robotic Prostatectomy – Less pain, faster healing"
            ],

            procedureHeading: "Surgical Process at Stork Hospital",
            procedureSteps: [
                {
                    title: "Comprehensive Preoperative Check-up",
                    description: "Blood tests, imaging scans, and detailed discussions about surgical options."
                },
                {
                    title: "Anesthesia",
                    description: "Either general or spinal anesthesia to ensure a pain-free procedure."
                },
                {
                    title: "Surgical Removal",
                    description: "Performed using open, laparoscopic, or robotic methods based on the case."
                },
                {
                    title: "Post-Surgery Recovery",
                    description: "Monitoring in a specialized care unit followed by step-by-step rehabilitation advice."
                }
            ],

            benefitsHeading: "Why Patients Prefer Stork Hospital for Prostatectomy",
            benefits: [
                "Expert urologists and uro-oncologists with years of surgical experience",
                "Modern surgical facilities equipped for both open and minimally invasive surgeries",
                "24/7 emergency hospital near Hitech City for urgent post-surgery care",
                "Insurance accepted with smooth claim assistance",
                "Dedicated rehabilitation support"
            ],

            risks: [],
            recoveryTimeline: [
                "Minimally invasive surgery often requires a 1–3 day hospital stay",
                "Temporary catheter placement to help with urination",
                "Gradual return to normal daily activities over 4–6 weeks",
                "Pelvic floor exercises to improve urinary control",
                "Scheduled follow-ups to check healing"
            ],

            faqHeading: "FAQs – Prostatectomy",
            faqs: [
                {
                    question: "Will this surgery affect my sexual performance?",
                    answer: "Some men experience short-term erectile challenges, but with time, medication, or therapy, many return to normal function."
                },
                {
                    question: "Are there alternatives to prostatectomy for cancer?",
                    answer: "Yes. Radiation therapy, hormone treatment, or active surveillance may be possible depending on cancer stage and patient health."
                },
                {
                    question: "When can I resume work?",
                    answer: "For minimally invasive surgery, light work is possible in 2–4 weeks; open surgery may require more recovery time."
                },
                {
                    question: "Is the procedure covered by insurance?",
                    answer: "Yes. Most insurance providers cover medically necessary prostate surgeries, and Stork Hospital offers assistance with the claim process."
                }
            ],

            customCta: {
                heading: "Book Your Prostate Surgery Consultation",
                description: "If you’ve been diagnosed with prostate cancer, severe BPH, or another condition requiring surgical intervention, schedule an appointment at Stork Hospital to meet a specialist urologist in Hyderabad and explore your best treatment options.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "2-4 Hours",
                anesthesia: "General / Spinal",
                hospitalStay: "2-4 Days",
                recoveryTime: "4-6 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Sujith",
                role: "Senior Uro-Oncologist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "rectal-prolapse") {
        return {
            slug: slug,
            title: "Rectal Prolapse – Stork Hospital, Hyderabad",
            subheading: "Specialized Treatment for Comfort and Long-Term Relief",
            breadcrumbTitle: "Rectal Prolapse",
            category: "Proctology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Rectal prolapse happens when the rectum, the last portion of the large intestine, slips from its usual position and protrudes through the anal opening. This may be partial or complete and can occur during bowel movements or even while standing for long periods. Patients often experience discomfort, mucus discharge, bleeding, or a constant feeling of incomplete evacuation. While anyone can develop this condition, it is more frequently seen in older adults, women after multiple deliveries, and people with long-standing constipation.

At Stork Multispecialty Hospital, Hyderabad, we provide accurate diagnosis and modern treatment for rectal prolapse, aiming to restore normal anatomy, improve bowel control, and minimize the chance of recurrence.`,

            overview: {
                heading: "Common Symptoms",
                intro: "Symptoms of rectal prolapse include:",
                items: [
                    "Tissue protruding from the anus, especially after stool passage",
                    "Mucus or blood leakage",
                    "Anal pressure or discomfort",
                    "Loss of bowel control (incontinence)",
                    "Sensation that bowel emptying is incomplete"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Possible Causes of Rectal Prolapse",
            conditionsTreated: [
                "Chronic constipation with excessive straining",
                "Weakness of pelvic floor muscles from aging or childbirth",
                "Persistent diarrhea or bowel irregularities",
                "Nerve injury affecting bowel control",
                "Previous pelvic or rectal surgeries",
                "Underlying medical disorders like cystic fibrosis or spinal injury"
            ],

            procedureHeading: "Treatment Options Available at Stork Hospital",
            procedureSteps: [
                {
                    title: "Non-Surgical Care (for mild cases)",
                    description: "High-fiber diet and good hydration. Stool softeners to prevent strain. Targeted pelvic exercises."
                },
                {
                    title: "Surgical Solutions (for moderate to severe prolapse)",
                    description: "Rectopexy – securing the rectum back into place. Perineal surgery – removing and repairing the prolapsed section. Minimally invasive methods for reduced pain and quicker recovery."
                }
            ],

            benefitsHeading: "Why Stork Hospital is the Right Choice",
            benefits: [
                "Experienced gastroenterologists and colorectal surgeons",
                "Fully equipped diagnostic center for scans and functional tests",
                "Advanced surgical center with laparoscopic and minimally invasive options",
                "24/7 emergency hospital near Hitech City",
                "Insurance accepted with upfront estimates",
                "Rehabilitation guidance for pelvic floor strengthening"
            ],

            risks: [],
            recoveryTimeline: [
                "Detailed evaluation to determine the extent of prolapse",
                "Customized treatment based on patient’s health",
                "Post-surgical care to manage healing and bowel function",
                "Guidance on strengthening pelvic support muscles",
                "Follow-up visits to monitor progress"
            ],

            faqHeading: "FAQs – Rectal Prolapse",
            faqs: [
                {
                    question: "Can it heal without surgery?",
                    answer: "In mild, early cases, lifestyle changes may help, but surgery is often the definitive solution."
                },
                {
                    question: "Is recovery painful?",
                    answer: "Minimally invasive techniques significantly reduce pain and speed up healing."
                },
                {
                    question: "When can normal activities resume?",
                    answer: "Light activities are often possible within 1–2 weeks after surgery."
                },
                {
                    question: "Will insurance cover the cost?",
                    answer: "Yes. Stork Hospital accepts most insurance policies with transparent billing."
                }
            ],

            customCta: {
                heading: "Book Your Rectal Prolapse Consultation",
                description: "If you’re experiencing anal bulging, discomfort, or trouble controlling bowel movements, book an appointment at Stork Hospital to see a colorectal specialist in Hyderabad and receive modern, effective treatment.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "1-3 Hours",
                anesthesia: "General / Spinal",
                hospitalStay: "1-3 Days",
                recoveryTime: "2-4 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Latha",
                role: "Senior Proctologist",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "respiratory-conditions") {
        return {
            slug: slug,
            title: "Respiratory Conditions – Stork Hospital, Hyderabad",
            subheading: "Comprehensive Care for Healthy Lungs and Airways",
            breadcrumbTitle: "Respiratory Conditions",
            category: "Pulmonology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Respiratory conditions affect the lungs, airways, and breathing efficiency. They can range from mild infections to chronic diseases that require lifelong management. Common causes include infections, allergies, smoking, environmental exposure, and genetic factors. Early diagnosis and targeted treatment are essential for preventing complications and improving quality of life.

At Stork Multispecialty Hospital, Hyderabad, our respiratory specialists provide expert care for a wide range of lung and airway disorders. Using advanced diagnostic tools and evidence-based treatments, we help patients manage symptoms, recover from illness, and protect long-term respiratory health.`,

            overview: {
                heading: "Common Symptoms / Conditions",
                intro: "We treat a wide range of respiratory conditions, including:",
                items: [
                    "Asthma and allergy-related breathing problems",
                    "Chronic Obstructive Pulmonary Disease (COPD)",
                    "Pneumonia and bronchitis",
                    "Tuberculosis (TB) and other lung infections",
                    "Interstitial lung disease",
                    "Sleep-related breathing disorders, including sleep apnea",
                    "Post-COVID respiratory complications",
                    "Pulmonary embolism and pleural effusion"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Respiratory Conditions We Treat",
            conditionsTreated: [
                "Asthma",
                "COPD",
                "Pneumonia",
                "Bronchitis",
                "Tuberculosis (TB)",
                "Interstitial Lung Disease",
                "Sleep Apnea",
                "Post-COVID Complications"
            ],

            procedureHeading: "Our Treatment Approach",
            procedureSteps: [
                {
                    title: "Diagnosis",
                    description: "Detailed history, physical exam, pulmonary function tests (spirometry), chest imaging (X-ray, CT), bronchoscopy, and blood tests."
                },
                {
                    title: "Medical Management",
                    description: "Inhalers, nebulizers, medications, antibiotics/antivirals, oxygen therapy, and immunotherapy."
                },
                {
                    title: "Procedural and Surgical Care",
                    description: "Bronchoscopy to remove blockages or collect samples. Thoracentesis to drain excess fluid. Lung biopsies when needed."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital for Respiratory Care",
            benefits: [
                "Experienced pulmonologists and respiratory medicine specialists",
                "In-house diagnostic center with lung function tests and CT scans",
                "Advanced surgical center for bronchoscopy",
                "24/7 emergency hospital for acute respiratory distress",
                "Integrated care with physiotherapists and rehab experts"
            ],

            risks: [],
            recoveryTimeline: [
                "Initial consultation with respiratory specialist",
                "Diagnostic testing and review of findings",
                "Individualized treatment plan and education",
                "Hospital admission if intensive treatment is needed",
                "Follow-up care and rehabilitation"
            ],

            faqHeading: "FAQs – Respiratory Conditions",
            faqs: [
                {
                    question: "When should I see a doctor for breathing problems?",
                    answer: "Seek medical attention if you have persistent shortness of breath, chest pain, or worsening cough."
                },
                {
                    question: "Are all breathing issues related to asthma?",
                    answer: "No. Many different conditions can affect lung function, so accurate diagnosis is important."
                },
                {
                    question: "Can chronic respiratory diseases be cured?",
                    answer: "While some can be fully treated, others can be managed effectively to maintain a good quality of life."
                },
                {
                    question: "Is treatment covered by insurance?",
                    answer: "Yes. Stork Hospital works with most insurance providers and ensures transparent billing before treatment begins."
                }
            ],

            customCta: {
                heading: "Book Your Respiratory Consultation",
                description: "If you are struggling with breathing difficulties, chronic cough, or frequent lung infections, don’t wait for symptoms to worsen. Book an appointment at Stork Hospital to consult a respiratory specialist in Hyderabad and get expert care for your lung health.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Local / General",
                hospitalStay: "Outpatient / Inpatient",
                recoveryTime: "Varies by Condition",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rajesh",
                role: "Senior Pulmonologist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "rirs") {
        return {
            slug: slug,
            title: "RIRS (Retrograde Intrarenal Surgery) – Stork Hospital, Hyderabad",
            subheading: "Advanced, Minimally Invasive Kidney Stone Surgery",
            breadcrumbTitle: "RIRS",
            category: "Urology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Retrograde Intrarenal Surgery (RIRS) is a highly advanced, minimally invasive procedure used to treat kidney stones and other disorders within the kidney. It involves passing a flexible ureteroscope through the urinary tract to directly access the kidney, where stones are fragmented using a laser and removed without the need for cuts or large incisions.

At Stork Multispecialty Hospital, Hyderabad, our skilled urologists use state-of-the-art RIRS technology to provide precise, safe, and effective stone removal with quick recovery times.`,

            overview: {
                heading: "When RIRS is Recommended",
                intro: "RIRS is often recommended for:",
                items: [
                    "Stones located in difficult-to-reach areas of the kidney",
                    "Patients with small to medium-sized stones who are not candidates for ESWL",
                    "Cases where prior treatments have failed",
                    "Individuals seeking a less invasive alternative to open or keyhole surgery"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Benefits of RIRS at Stork Hospital",
            conditionsTreated: [
                "No incisions or external scars",
                "Minimal postoperative pain and quick recovery",
                "High stone clearance rate",
                "Suitable for high-risk patients",
                "Ability to treat stones in both kidneys in a single session"
            ],

            procedureHeading: "The RIRS Procedure",
            procedureSteps: [
                {
                    title: "Evaluation",
                    description: "Detailed imaging to determine stone size, location, and density."
                },
                {
                    title: "Anesthesia",
                    description: "Usually general anesthesia for maximum comfort."
                },
                {
                    title: "Ureteroscope Insertion",
                    description: "A thin, flexible scope is passed through the urethra and bladder into the kidney."
                },
                {
                    title: "Laser Fragmentation",
                    description: "Stones are broken down using a Holmium laser."
                },
                {
                    title: "Stone Removal",
                    description: "Fragments are extracted or allowed to pass naturally."
                },
                {
                    title: "Post-Procedure Check",
                    description: "Stent placement if necessary to help with drainage and healing."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital for RIRS",
            benefits: [
                "Expert urologists trained in advanced endoscopic procedures",
                "On-site diagnostic center with high-resolution imaging",
                "Advanced surgical center equipped with flexible ureteroscopes and Holmium laser",
                "24/7 emergency hospital for urgent kidney stone care",
                "Insurance accepted with transparent cost breakdowns"
            ],

            risks: [],
            recoveryTimeline: [
                "Same-day or next-day discharge in most cases",
                "Resume normal activities in 2–3 days",
                "Pain medication and hydration advice",
                "Follow-up imaging to confirm complete stone clearance",
                "Long-term prevention plan"
            ],

            faqHeading: "FAQs – RIRS",
            faqs: [
                {
                    question: "Is RIRS safe?",
                    answer: "Yes. It is considered one of the safest and least invasive kidney stone removal methods."
                },
                {
                    question: "How long does RIRS take?",
                    answer: "Most procedures last between 60–90 minutes."
                },
                {
                    question: "Will I need a stent?",
                    answer: "In some cases, a temporary stent is placed to ensure proper drainage after the procedure."
                },
                {
                    question: "Does insurance cover RIRS?",
                    answer: "Yes. Stork Hospital accepts most insurance plans for medically necessary RIRS procedures."
                }
            ],

            customCta: {
                heading: "Book Your RIRS Consultation",
                description: "If you are suffering from kidney stones or require advanced kidney surgery, schedule a consultation at Stork Hospital to meet a urologist in Hyderabad and discuss whether RIRS is right for you.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "60-90 Minutes",
                anesthesia: "General",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "2-3 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Sujith",
                role: "Senior Urologist",
                experience: "15+ Years Experience"
            }
        }

        if (slug === "rotator-cuff-repair") {
            return {
                slug: slug,
                title: "Rotator Cuff Repair – Stork Hospital, Hyderabad",
                subheading: "Advanced Shoulder Care for Lasting Relief",
                breadcrumbTitle: "Rotator Cuff Repair",
                category: "Orthopedics",
                departmentHref: foundCategory.href || "#",
                shortDescription: `The rotator cuff is made up of four small muscles and their tendons, all working together to keep the shoulder joint stable and moving smoothly. A tear can occur from a sudden injury, repeated overhead activity, or gradual tendon weakening over time. Such damage often results in persistent shoulder pain, reduced strength, and difficulty lifting or rotating the arm.

At Stork Multispecialty Hospital, Hyderabad, we provide rotator cuff repair using the latest surgical and non-surgical methods. Our aim is to not only fix the injury but also restore full function and prevent future damage. From diagnosis to rehabilitation, each step is carefully planned for the best possible outcome.`,

                overview: {
                    heading: "Common Reasons for a Rotator Cuff Tear",
                    intro: "Rotator cuff tears can be caused by:",
                    items: [
                        "Sports involving heavy shoulder use (cricket, baseball, tennis, swimming)",
                        "Lifting or pulling heavy objects with poor technique",
                        "Sudden falls that place extreme stress on the shoulder",
                        "Age-related tendon degeneration",
                        "Overuse injuries from physically demanding occupations"
                    ]
                },
                fullDescription: [],

                conditionsHeading: "Symptoms That Require a Medical Evaluation",
                conditionsTreated: [
                    "Constant shoulder pain, especially when lying on the injured side",
                    "Weakness when trying to lift or rotate the arm",
                    "Clicking, popping, or grinding sensations in the joint",
                    "Limited motion affecting daily routines like combing hair or dressing"
                ],

                procedureHeading: "Treatment Options at Stork Hospital",
                procedureSteps: [
                    {
                        title: "Conservative Management",
                        description: "Rest, activity modification, anti-inflammatory medicines, and customized physiotherapy."
                    },
                    {
                        title: "Surgical Interventions",
                        description: "Arthroscopic repair (minimally invasive), Mini-open repair, or Traditional open repair for complex injuries."
                    },
                    {
                        title: "Post-Treatment Rehabilitation",
                        description: "Early guided mobility, progressive strengthening exercises, and close follow-up."
                    }
                ],

                benefitsHeading: "Why Stork Hospital Leads in Rotator Cuff Treatment",
                benefits: [
                    "Specialist orthopedic surgeons with years of experience",
                    "On-site diagnostic center for MRI, ultrasound, X-rays",
                    "Advanced surgical center for minimally invasive arthroscopy",
                    "24/7 emergency hospital for trauma care",
                    "Integrated physiotherapy services"
                ],

                risks: [],
                recoveryTimeline: [
                    "Detailed evaluation with advanced imaging",
                    "Tailored treatment plan based on tear size",
                    "Surgical or non-surgical repair",
                    "Rehabilitation with in-house physiotherapy specialists",
                    "Long-term monitoring to prevent reinjury"
                ],

                faqHeading: "FAQs – Rotator Cuff Repair",
                faqs: [
                    {
                        question: "How long will recovery take?",
                        answer: "Full recovery varies from 4–6 months for most patients, depending on the tear’s severity and rehabilitation progress."
                    },
                    {
                        question: "Will every tear need surgery?",
                        answer: "No. Many partial tears heal effectively with physiotherapy and rest."
                    },
                    {
                        question: "When can I return to sports or active work?",
                        answer: "Athletes and active individuals may return to full activity within 4–6 months after surgery."
                    },
                    {
                        question: "Is this treatment covered by insurance?",
                        answer: "Yes. Stork Hospital accepts a wide range of insurance plans and provides upfront cost details."
                    }
                ],

                customCta: {
                    heading: "Book Your Shoulder Consultation Today",
                    description: "Shoulder pain doesn’t have to limit your lifestyle. Book an appointment at Stork Hospital to meet a rotator cuff repair specialist in Hyderabad and begin a treatment plan designed to restore strength, movement, and confidence.",
                    buttonText: "Book Appointment"
                },
                meta: {
                    duration: "1-2 Hours",
                    anesthesia: "General / Regional",
                    hospitalStay: "Day Care / 1 Day",
                    recoveryTime: "4-6 Months",
                    successRate: "High"
                },
                reviewedBy: {
                    name: "Dr. Kiran",
                    role: "Senior Orthopedic Surgeon",
                    experience: "20+ Years Experience"
                }
            }
        }
    }

    if (slug === "septoplasty") {
        return {
            slug: slug,
            title: "Septoplasty – Expert Nasal Septum Correction at Stork Hospital, Hyderabad",
            subheading: "Enhancing Breathing Comfort with Advanced ENT Surgery",
            breadcrumbTitle: "Septoplasty",
            category: "ENT",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Septoplasty is a specialized surgical procedure that corrects a deviated nasal septum—the cartilage and bone partition dividing the nostrils. At Stork Multispecialty Hospital, Hyderabad, our ENT surgeons use refined, minimally invasive techniques to open nasal passages, ease congestion, and improve airflow without changing your nose’s outward appearance.

For patients dealing with chronic nasal obstruction, sleep disturbances, snoring, or repeated sinus infections, septoplasty can offer long-term, life-enhancing benefits.`,

            overview: {
                heading: "Symptoms That May Indicate You Need Septoplasty",
                intro: "You may benefit from septoplasty if you experience:",
                items: [
                    "Difficulty breathing through one or both nostrils",
                    "Chronic nasal congestion and frequent sinus infections",
                    "Ongoing nosebleeds",
                    "Snoring or sleep apnea linked to nasal obstruction",
                    "Headaches or facial pain from septal deviation"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Advantages of Septoplasty at Stork",
            conditionsTreated: [
                "Clear nasal passages and improved breathing",
                "Decrease in snoring and sleep interruptions",
                "Fewer sinus infections",
                "Faster recovery thanks to minimally invasive methods",
                "Long-lasting relief from nasal obstruction"
            ],

            procedureHeading: "The Septoplasty Journey at Stork",
            procedureSteps: [
                {
                    title: "Evaluation",
                    description: "Detailed ENT evaluation, nasal passage examination, and diagnostic scans if required."
                },
                {
                    title: "Surgery",
                    description: "Performed under local or general anesthesia. Precise straightening or repositioning of the septum."
                },
                {
                    title: "Recovery",
                    description: "Discharge the same day or after brief observation. Structured aftercare guidance."
                }
            ],

            benefitsHeading: "Why Stork Hospital Stands Out for Septoplasty in Hyderabad",
            benefits: [
                "Highly experienced ENT specialists",
                "Endoscopic surgical approaches for accuracy",
                "Tailored anesthesia plans for safety",
                "Trusted hospital accepting insurance",
                "Walk-in nasal consultations near Kondapur"
            ],

            risks: [],
            recoveryTimeline: [
                "Most patients notice easier breathing shortly after recovery",
                "Discharge the same day or after brief observation",
                "Return to light routines within a week",
                "Complete healing may take 2–3 weeks"
            ],

            faqHeading: "FAQs – Septoplasty at Stork Hospital",
            faqs: [
                {
                    question: "Will I feel pain during the procedure?",
                    answer: "No. It’s performed under anesthesia to ensure a painless experience."
                },
                {
                    question: "How long before I can return to normal activities?",
                    answer: "Most people return to light routines within a week; complete healing may take 2–3 weeks."
                },
                {
                    question: "Will it change my appearance?",
                    answer: "No. The surgery is internal and does not alter facial structure."
                },
                {
                    question: "Is the cost covered by insurance?",
                    answer: "Yes. We are a Hyderabad hospital accepting insurance for ENT treatments."
                }
            ],

            customCta: {
                heading: "Start Your Path to Easier Breathing",
                description: "If nasal blockage or chronic congestion is affecting your daily comfort, book a septoplasty consultation at Stork Hospital, Hyderabad. Our ENT team is committed to delivering safe, accurate, and lasting solutions.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "45-90 Minutes",
                anesthesia: "General / Local",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "1-3 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Srinivas",
                role: "Senior ENT Surgeon",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "shoulder-arthroscopy") {
        return {
            slug: slug,
            title: "Shoulder Arthroscopy – Stork Hospital, Hyderabad",
            subheading: "Keyhole Shoulder Surgery for Faster, Safer Healing",
            breadcrumbTitle: "Shoulder Arthroscopy",
            category: "Orthopedics",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Shoulder arthroscopy is a modern surgical approach that lets doctors see inside and repair the shoulder joint using only a few small cuts. A thin camera, called an arthroscope, transmits magnified images to a screen, allowing surgeons to work with extreme accuracy while preserving healthy tissue.

At Stork Multispecialty Hospital, Hyderabad, our orthopedic experts use arthroscopy to treat injuries such as rotator cuff tears, cartilage damage, frozen shoulder, and recurrent dislocations. This minimally invasive method helps reduce pain, minimize scarring, and promote a quicker return to daily activities.`,

            overview: {
                heading: "Common Problems Treated with Shoulder Arthroscopy",
                intro: "Shoulder arthroscopy deals with various conditions:",
                items: [
                    "Torn rotator cuff or labrum",
                    "Chronic shoulder instability and repeated dislocations",
                    "Frozen shoulder (adhesive capsulitis)",
                    "Cartilage injury or degeneration",
                    "Bone spurs and floating fragments within the joint",
                    "Shoulder impingement issues",
                    "Joint inflammation (synovitis)"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Benefits of Shoulder Arthroscopy at Stork",
            conditionsTreated: [
                "Minimally invasive with small incisions",
                "Reduced pain and scarring",
                "Quicker return to daily activities",
                "Preservation of healthy tissue",
                "High precision repair"
            ],

            procedureHeading: "Our Shoulder Arthroscopy Process",
            procedureSteps: [
                {
                    title: "Before Surgery",
                    description: "Comprehensive assessment, imaging scans, and patient counseling."
                },
                {
                    title: "During Surgery",
                    description: "Small incisions, arthroscope insertion for real-time visualization, and precision repair."
                },
                {
                    title: "After Surgery",
                    description: "Same-day discharge (mostly), pain management, and gradual physiotherapy."
                }
            ],

            benefitsHeading: "What Makes Stork Hospital a Leader in Shoulder Arthroscopy",
            benefits: [
                "Orthopedic surgeons with advanced training",
                "Fully equipped diagnostic center (MRI, ultrasound, X-ray)",
                "Advanced surgical center with high-precision tools",
                "24/7 emergency hospital for trauma care",
                "On-site physiotherapy and rehabilitation programs"
            ],

            risks: [],
            recoveryTimeline: [
                "Orthopedic consultation and diagnostic imaging",
                "Customized surgical plan",
                "Minimally invasive arthroscopy procedure",
                "Supervised rehabilitation sessions",
                "Follow-ups to ensure complete recovery"
            ],

            faqHeading: "FAQs – Shoulder Arthroscopy",
            faqs: [
                {
                    question: "Will I have pain after the procedure?",
                    answer: "Pain is generally mild and well-controlled with medications."
                },
                {
                    question: "When can I start using my arm again?",
                    answer: "Light activities can typically resume within 4–6 weeks."
                },
                {
                    question: "Do I really need physiotherapy?",
                    answer: "Yes — it’s essential for restoring flexibility, preventing stiffness, and regaining full shoulder function."
                },
                {
                    question: "Is this procedure insurance-covered?",
                    answer: "Yes. Stork Hospital partners with most insurance providers and ensures upfront cost clarity."
                }
            ],

            customCta: {
                heading: "Book Your Appointment for Shoulder Arthroscopy",
                description: "Don’t let persistent shoulder pain hold you back. Book a consultation at Stork Hospital with a shoulder arthroscopy specialist in Hyderabad and start your journey toward pain-free movement.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "60-120 Minutes",
                anesthesia: "General / Regional",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "3-6 Months",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Kiran",
                role: "Senior Orthopedic Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "shoulder-dislocation") {
        return {
            slug: slug,
            title: "Shoulder Dislocation Treatment – Stork Hospital, Hyderabad",
            subheading: "Expert Care for First-Time and Recurrent Dislocations",
            breadcrumbTitle: "Shoulder Dislocation",
            category: "Orthopedics",
            departmentHref: foundCategory.href || "#",
            shortDescription: `A dislocated shoulder occurs when the upper arm bone pops out of the cup-shaped socket that is part of your shoulder blade. At Stork Hospital, we provide comprehensive care for shoulder dislocations, from immediate reduction to long-term rehabilitation, ensuring you regain full stability and function.`,

            overview: {
                heading: "Common Triggers for Shoulder Dislocation",
                intro: "Shoulder dislocations can be caused by:",
                items: [
                    "Contact sports such as rugby, football, or wrestling",
                    "Slipping and falling onto an outstretched arm",
                    "Vehicle accidents causing direct shoulder impact",
                    "Overuse injuries from repetitive overhead movements",
                    "Lax ligaments from previous dislocations or hypermobility"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Signs You May Have a Dislocated Shoulder",
            conditionsTreated: [
                "Sudden and intense pain in the shoulder region",
                "Visible deformity or “out of place” appearance of the joint",
                "Swelling, bruising, and inability to lift or rotate the arm",
                "Numbness or tingling extending into the hand or fingers",
                "Weakness in the affected arm"
            ],

            procedureHeading: "Treatment Methods We Offer",
            procedureSteps: [
                {
                    title: "Immediate Medical Care",
                    description: "Diagnostic imaging, closed reduction (gentle repositioning), and immobilization."
                },
                {
                    title: "Surgical Care",
                    description: "Arthroscopic stabilization or open surgery for severe/recurrent cases."
                },
                {
                    title: "Rehabilitation & Prevention",
                    description: "Structured physiotherapy to rebuild strength and stability training."
                }
            ],

            benefitsHeading: "Why Stork Hospital is the Right Choice for Shoulder Injury Care",
            benefits: [
                "Expert orthopedic surgeons with experience",
                "State-of-the-art diagnostic center (X-ray, MRI, CT)",
                "Advanced surgical center (arthroscopic and open)",
                "24/7 emergency hospital for trauma cases",
                "Insurance accepted with upfront cost information"
            ],

            risks: [],
            recoveryTimeline: [
                "Immediate injury assessment at walk-in clinic or ER",
                "Imaging confirmation",
                "Appropriate non-surgical or surgical intervention",
                "Customized physiotherapy",
                "Long-term follow-up"
            ],

            faqHeading: "FAQs – Shoulder Dislocation",
            faqs: [
                {
                    question: "Is surgery always necessary for a dislocated shoulder?",
                    answer: "No. Many first-time injuries are successfully treated without surgery if the ligaments are intact."
                },
                {
                    question: "How long before I regain full function?",
                    answer: "Mild cases recover in 6–8 weeks, but recurrent injuries or surgical repairs may take 3–4 months."
                },
                {
                    question: "Can it happen again?",
                    answer: "Yes. Previous dislocations increase recurrence risk, but strengthening exercises and stabilization surgery can help."
                },
                {
                    question: "Will my insurance cover treatment?",
                    answer: "Yes. Stork Hospital works with major insurance providers and ensures billing transparency."
                }
            ],

            customCta: {
                heading: "Book Your Shoulder Injury Consultation",
                description: "Prompt treatment is key to preventing long-term instability. Book an appointment at Stork Hospital to meet a shoulder injury specialist in Hyderabad and get advanced care to restore comfort, movement, and confidence.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "General / Sedation",
                hospitalStay: "Day Care / 1 Day",
                recoveryTime: "6 Weeks - 4 Months",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Kiran",
                role: "Senior Orthopedic Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "shoulder-pain") {
        return {
            slug: slug,
            title: "Shoulder Pain Treatment – Stork Hospital, Hyderabad",
            subheading: "Understanding Shoulder Pain and Our Approach",
            breadcrumbTitle: "Shoulder Pain",
            category: "Orthopedics",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Shoulder discomfort is more than an inconvenience—it can limit your mobility, disrupt sleep, and impact daily routines. Whether it stems from injury, joint degeneration, or repetitive strain, effective treatment starts with a precise diagnosis. At Stork Multispecialty Hospital, Hyderabad, we offer advanced, customized care for shoulder pain that focuses on restoring function and comfort.

If you're seeking shoulder pain relief in Hyderabad, our experienced orthopedic team offers both non-invasive therapies and minimally invasive surgical options tailored to your needs.`,

            overview: {
                heading: "Shoulder Conditions We Commonly Treat",
                intro: "Our orthopedic specialists address a wide spectrum of shoulder-related concerns, such as:",
                items: [
                    "Inflammation or tears in the rotator cuff",
                    "Impingement syndrome or shoulder stiffness",
                    "Frozen shoulder (adhesive capsulitis)",
                    "Recurrent dislocation or joint instability",
                    "Bursitis, tendinitis, and joint swelling",
                    "Arthritis in the shoulder joint",
                    "Labral injuries or cartilage damage",
                    "Sports injuries and repetitive motion strain"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Comprehensive Shoulder Pain Solutions at Stork",
            conditionsTreated: [
                "Non-surgical treatments: anti-inflammatory medication, corticosteroid injections",
                "Rehabilitation therapy: individualized physiotherapy",
                "In-house diagnostics: immediate access to imaging",
                "Minimally invasive surgery: including arthroscopic repairs",
                "Reconstructive surgery: for chronic joint instability or trauma"
            ],

            procedureHeading: "How Your Visit Will Proceed",
            procedureSteps: [
                {
                    title: "Evaluation",
                    description: "Evaluation by a leading orthopedic doctor in Hyderabad."
                },
                {
                    title: "Diagnosis",
                    description: "Imaging tests at our modern diagnostic center in Hyderabad."
                },
                {
                    title: "Treatment Plan",
                    description: "A customized care plan tailored to your diagnosis."
                },
                {
                    title: "Recovery",
                    description: "Rehabilitation and follow-up support, as needed."
                }
            ],

            benefitsHeading: "Why Stork Hospital is Your Go-To for Shoulder Pain Care in Hyderabad",
            benefits: [
                "Consult with the best orthopedic specialists",
                "On-site access to high-quality imaging (X-rays, ultrasound, MRI)",
                "Personalized treatment programs",
                "Proficiency in keyhole shoulder surgeries",
                "Convenient walk-in clinic near Kondapur"
            ],

            risks: [],
            recoveryTimeline: [
                "Same-day orthopedic appointments with minimal wait times",
                "Integrated care approach ensuring continuity",
                "Affordable orthopedic care packages",
                "Patient-first experience backed by a committed team"
            ],

            faqHeading: "FAQs – Shoulder Pain Services at Stork Hospital",
            faqs: [
                {
                    question: "Is surgery the only option for shoulder pain?",
                    answer: "No. Many patients respond well to medication, therapy, and guided exercise. Surgery is advised only when necessary."
                },
                {
                    question: "What is arthroscopic shoulder surgery?",
                    answer: "It’s a low-risk, minimally invasive procedure allowing faster healing and less post-operative pain compared to open surgery."
                },
                {
                    question: "Can I consult a doctor online for shoulder pain?",
                    answer: "Yes. We offer online consultations in Hyderabad, making it easy to connect with specialists from home."
                },
                {
                    question: "Is insurance applicable for shoulder treatment?",
                    answer: "Absolutely. We support patients with a wide range of plans and are proud to be a Hyderabad hospital accepting insurance."
                }
            ],

            customCta: {
                heading: "Ready to Feel Better? Book Now",
                description: "Take control of your shoulder health. Book an appointment at Stork Hospital today and consult one of the top orthopedic surgeons in Hyderabad for expert care and lasting relief.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "None / Local / General",
                hospitalStay: "Outpatient / Day Care",
                recoveryTime: "Varies",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Kiran",
                role: "Senior Orthopedic Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "shoulder-replacement") {
        return {
            slug: slug,
            title: "Shoulder Replacement – Stork Hospital, Hyderabad",
            subheading: "Advanced Surgical Solutions for Shoulder Pain and Stiffness",
            breadcrumbTitle: "Shoulder Replacement",
            category: "Orthopedics",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Shoulder replacement surgery, also known as shoulder arthroplasty, involves replacing the worn or damaged parts of the shoulder joint with artificial implants. This procedure is often recommended for patients with advanced arthritis, complex fractures, or severe rotator cuff injuries that no longer respond to medication, physiotherapy, or injections. The goal is to relieve pain, restore smooth movement, and help patients regain normal shoulder function.

At Stork Multispecialty Hospital, Hyderabad, our orthopedic experts specialize in all forms of shoulder replacement — including total, partial, and reverse designs — ensuring every patient receives the most suitable surgical approach.`,

            overview: {
                heading: "When a Shoulder Replacement May Be the Best Option",
                intro: "Shoulder replacement may be recommended for:",
                items: [
                    "End-stage shoulder arthritis (osteoarthritis or rheumatoid arthritis)",
                    "Shoulder joint damage from massive, irreparable rotator cuff tears",
                    "Complex fractures that cannot be repaired effectively",
                    "Avascular necrosis causing bone tissue damage",
                    "Persistent pain and stiffness despite months of non-surgical treatment"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Why Patients Choose Stork Hospital for Shoulder Replacement",
            conditionsTreated: [
                "Specialized orthopedic surgeons with expertise",
                "Modern diagnostic center (MRI, CT, X-rays)",
                "Advanced surgical center (minimally invasive)",
                "24/7 emergency hospital for urgent needs",
                "Insurance accepted with transparent cost breakdowns",
                "Walk-in clinic for fast consultations",
                "Comprehensive physiotherapy services"
            ],

            procedureHeading: "Our Surgical Process",
            procedureSteps: [
                {
                    title: "Before the Surgery",
                    description: "Detailed orthopedic examination, imaging studies, and customized surgical plan."
                },
                {
                    title: "During the Procedure",
                    description: "Removal of damaged bone/cartilage, placement of implant, and proper alignment."
                },
                {
                    title: "After the Surgery",
                    description: "Pain control, early movement exercises, and physiotherapy."
                }
            ],

            benefitsHeading: "Benefits of Shoulder Replacement at Stork",
            benefits: [
                "Relief from chronic shoulder pain",
                "Restored range of motion and function",
                "Improved quality of life",
                "Long-lasting results with modern implants",
                "Expert care from diagnosis to recovery"
            ],

            risks: [],
            recoveryTimeline: [
                "Initial orthopedic assessment and diagnosis",
                "Pre-operative medical clearance and planning",
                "Surgical replacement using advanced techniques",
                "In-hospital recovery and guided exercises",
                "Outpatient physiotherapy for long-term shoulder health"
            ],

            faqHeading: "FAQs – Shoulder Replacement",
            faqs: [
                {
                    question: "How long do shoulder implants last?",
                    answer: "Most modern implants last between 15–20 years when well cared for."
                },
                {
                    question: "When will I be able to use my arm again?",
                    answer: "Light daily activities usually resume within 6–8 weeks, with full recovery in 3–6 months."
                },
                {
                    question: "Will the surgery hurt?",
                    answer: "Pain is controlled with anesthesia and medication, and discomfort lessens significantly after the first weeks."
                },
                {
                    question: "Is the surgery covered under insurance?",
                    answer: "Yes. Stork Hospital accepts a wide range of insurance plans and provides complete cost transparency."
                }
            ],

            customCta: {
                heading: "Book Your Shoulder Replacement Appointment",
                description: "Don’t let shoulder pain affect your independence. Book an appointment at Stork Hospital to meet a shoulder replacement specialist in Hyderabad and discuss the safest, most effective treatment option for your condition.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "2-3 Hours",
                anesthesia: "General Anesthesia",
                hospitalStay: "2-4 Days",
                recoveryTime: "3-6 Months",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Kiran",
                role: "Senior Orthopedic Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }

    if (slug === "sinus-treatment") {
        return {
            slug: slug,
            title: "Sinus Treatment – Advanced Relief at Stork Hospital, Hyderabad",
            subheading: "Restoring Comfort, Breathing, and Quality of Life",
            breadcrumbTitle: "Sinus Treatment",
            category: "ENT",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Sinus problems occur when the hollow cavities in the skull, located around the nose and eyes, become swollen, blocked, or infected. This can cause discomfort, breathing difficulties, and frequent headaches. At Stork Multispecialty Hospital, Hyderabad, our ENT experts specialize in diagnosing and treating acute, chronic, and recurring sinus conditions through a blend of targeted medical care and advanced, minimally invasive surgical options.

Our goal is to address the root cause, ease symptoms, and help patients return to normal breathing without constant discomfort.`,

            overview: {
                heading: "Common Warning Signs of Sinus Issues",
                intro: "You may need sinus treatment if you experience:",
                items: [
                    "Persistent stuffy or blocked nose",
                    "Pressure or pain in the cheeks, forehead, or around the eyes",
                    "Thick nasal discharge or postnasal drip",
                    "Reduced or loss of smell and taste",
                    "Headaches linked to sinus congestion",
                    "Repeated sinus infections within a short span"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Benefits of Our Sinus Treatment",
            conditionsTreated: [
                "Significant and lasting symptom relief",
                "Reduced frequency of sinus infections",
                "Better quality sleep and improved breathing",
                "Short recovery time for surgical procedures",
                "Long-term improvement in nasal health"
            ],

            procedureHeading: "Our Step-by-Step Sinus Care Approach",
            procedureSteps: [
                {
                    title: "Consultation",
                    description: "Detailed ENT consultation with a complete history review."
                },
                {
                    title: "Diagnosis",
                    description: "Nasal endoscopy and/or imaging scans for pinpoint diagnosis."
                },
                {
                    title: "Treatment Plan",
                    description: "Tailored plan including medication, therapy, or FESS for chronic conditions."
                },
                {
                    title: "Follow-up",
                    description: "Visits to ensure recovery and prevent relapse."
                }
            ],

            benefitsHeading: "Why Patients Prefer Stork Hospital for Sinus Care in Hyderabad",
            benefits: [
                "Highly experienced ENT specialists",
                "Walk-in sinus care appointments near Kondapur",
                "In-depth evaluation using nasal endoscopy and CT scans",
                "Full range of treatment options (Medical & Surgical)",
                "Specialized management for allergies and structural issues",
                "Accredited hospital accepting insurance"
            ],

            risks: [],
            recoveryTimeline: [
                "Detailed ENT consultation",
                "Pinpoint diagnosis with endoscopy/imaging",
                "Tailored treatment (medical or surgical)",
                "Short recovery time",
                "Follow-up for long-term relief"
            ],

            faqHeading: "FAQs – Sinus Treatment at Stork",
            faqs: [
                {
                    question: "Will all sinus problems require surgery?",
                    answer: "No. Many cases improve with medication and simple lifestyle changes."
                },
                {
                    question: "Is sinus surgery comfortable and safe?",
                    answer: "Yes. It’s minimally invasive and performed under anesthesia."
                },
                {
                    question: "How can sinus problems be avoided in the future?",
                    answer: "Controlling allergies, staying hydrated, and early treatment of colds can help."
                },
                {
                    question: "Is insurance accepted for sinus procedures?",
                    answer: "Yes. We are a Hyderabad hospital accepting insurance for ENT treatments."
                }
            ],

            customCta: {
                heading: "Breathe Freely with Stork Hospital",
                description: "If sinus pain, congestion, or repeated infections are affecting your life, book a consultation at Stork Hospital’s ENT department in Hyderabad. Our specialized care ensures safe, effective, and lasting relief.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "20-45 Minutes",
                anesthesia: "Local / General",
                hospitalStay: "Day Care / Overnight",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Srinivas",
                role: "Senior ENT Specialist",
                experience: "15+ Years Experience"
            }
        }
    }


    if (slug === "stapler-circumcision") {
        return {
            slug: slug,
            title: "Stapler Circumcision – Stork Hospital, Hyderabad",
            subheading: "Quick, Precise, and Comfortable Circumcision Procedure",
            breadcrumbTitle: "Stapler Circumcision",
            category: "Urology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Stapler circumcision is a modern approach to foreskin removal that uses a specially designed stapler device to perform the procedure with accuracy and minimal discomfort. The method ensures reduced bleeding, shorter surgery time, and faster recovery compared to conventional techniques, making it suitable for both medical and personal reasons.

At Stork Multispecialty Hospital, Hyderabad, our expert urologists and pediatric surgeons use advanced stapler devices to provide safe and effective circumcision for children, adolescents, and adults. Every step — from consultation to aftercare — is tailored to ensure a smooth and stress-free experience.`,

            overview: {
                heading: "When Stapler Circumcision is Recommended",
                intro: "This procedure is often performed for:",
                items: [
                    "Phimosis – foreskin too tight to retract",
                    "Paraphimosis – foreskin trapped causing swelling",
                    "Recurring urinary tract infections (UTIs)",
                    "Chronic inflammation such as balanitis",
                    "Religious, cultural, or hygiene-related preferences"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Why Patients Choose Stork Hospital",
            conditionsTreated: [
                "Specialist urologists with extensive stapler experience",
                "On-site diagnostic center for pre-surgical assessment",
                "Advanced surgical center with latest technology",
                "24/7 emergency hospital assistance",
                "Transparent pricing and insurance accepted",
                "Walk-in clinic for same-day evaluation",
                "Comprehensive post-procedure care"
            ],

            procedureHeading: "How the Procedure is Performed",
            procedureSteps: [
                {
                    title: "Consultation & Evaluation",
                    description: "Detailed examination to confirm suitability."
                },
                {
                    title: "Anesthesia Administration",
                    description: "Local or general, based on patient preference and age."
                },
                {
                    title: "Stapler Placement",
                    description: "Device removes foreskin precisely and seals wound instantly."
                },
                {
                    title: "Immediate Recovery",
                    description: "Patients are usually discharged the same day."
                },
                {
                    title: "Post-Procedure Care",
                    description: "Instructions for hygiene, wound care, and pain management."
                }
            ],

            benefitsHeading: "Advantages of Stapler Circumcision",
            benefits: [
                "Minimal bleeding due to instant sealing",
                "Short procedure time (<15 mins)",
                "Reduced swelling and quick return to daily activities",
                "Less post-operative discomfort",
                "Uniform and aesthetically pleasing results"
            ],

            risks: [],
            recoveryTimeline: [
                "Resume light work/school in 1–2 days",
                "Avoid excessive movement/sports initially",
                "Keep surgical site clean and dry",
                "Take prescribed medications",
                "Scheduled follow-up visits"
            ],

            faqHeading: "FAQs – Stapler Circumcision",
            faqs: [
                {
                    question: "Is the procedure painful?",
                    answer: "With anesthesia, the process is painless, and recovery discomfort is minimal."
                },
                {
                    question: "How fast can I return to normal life?",
                    answer: "Many patients resume routine activities within 48 hours."
                },
                {
                    question: "Is it better than traditional circumcision?",
                    answer: "Yes — the stapler method reduces recovery time, pain, and scarring."
                },
                {
                    question: "Does insurance cover the procedure?",
                    answer: "If performed for a medical condition, Stork Hospital accepts most insurance plans."
                }
            ],

            customCta: {
                heading: "Book Your Stapler Circumcision Consultation",
                description: "For a safe, quick, and advanced circumcision experience, schedule an appointment at Stork Hospital with a specialist urologist in Hyderabad today.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "15 Minutes",
                anesthesia: "Local / General",
                hospitalStay: "Day Care",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Srinivas", // Placeholder based on context
                role: "Senior Urologist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "surgical-interventions") {
        return {
            slug: slug,
            title: "Surgical Interventions – Stork Hospital, Hyderabad",
            subheading: "Understanding Surgical Interventions in Women’s Health",
            breadcrumbTitle: "Surgical Interventions",
            category: "Gynecology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `While many gynecological and obstetric concerns can be managed medically, some require precision-driven surgical solutions. Surgical interventions are crucial in addressing structural complications, ensuring safer pregnancies, and improving reproductive outcomes. At Stork Hospital, Hyderabad, we specialize in modern, minimally invasive procedures designed for faster recovery, reduced risk, and long-term wellness.

Recognized as an advanced surgical center and one of the safest hospitals for surgery in Hyderabad, our hospital combines technology, expertise, and compassion to deliver optimal outcomes.`,

            overview: {
                heading: "When is Surgery Recommended?",
                intro: "Gynecological or obstetric surgery may be needed to:",
                items: [
                    "Remove fibroids, ovarian cysts, or endometrial polyps",
                    "Resolve tubal blockages or ectopic pregnancy",
                    "Conduct cesarean deliveries in complex scenarios",
                    "Treat conditions like endometriosis or pelvic adhesions",
                    "Correct anatomical abnormalities affecting fertility",
                    "Perform hysterectomy for persistent symptoms"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Who Might Need Surgical Intervention?",
            conditionsTreated: [
                "Patients unresponsive to medication/conservative care",
                "Women with chronic pelvic pain or abnormal bleeding",
                "Cases requiring C-sections (fetal/maternal indications)",
                "Structural complications identified via scans",
                "Fertility-related surgical needs"
            ],

            procedureHeading: "Your Surgical Journey at Stork Hospital",
            procedureSteps: [
                {
                    title: "Before Surgery",
                    description: "In-depth diagnostics, review of options, and preoperative counseling."
                },
                {
                    title: "During the Procedure",
                    description: "Performed in sterile OTs using tailored techniques (laparoscopic/open) with continuous monitoring."
                },
                {
                    title: "Postoperative Care",
                    description: "Effective pain relief, mobilization guidance, and hygiene instructions."
                }
            ],

            benefitsHeading: "Why Women Prefer Stork Hospital",
            benefits: [
                "Laparoscopic, Hysteroscopic & Open Surgery Expertise",
                "Senior Surgeons with Proven Outcomes",
                "Accredited Surgical Infrastructure",
                "Enhanced Recovery Protocols & Shorter Stays",
                "Budget-friendly packages with insurance transparency",
                "Private recovery rooms available"
            ],

            risks: [],
            recoveryTimeline: [
                "Post-op checkups and wound management",
                "Nutritional and lifestyle guidance",
                "Physiotherapy referrals when needed",
                "Remote follow-ups via teleconsultation"
            ],

            faqHeading: "FAQs – Surgical Services at Stork Hospital",
            faqs: [
                {
                    question: "Will every surgery be minimally invasive?",
                    answer: "Where possible, yes. However, the approach depends on your condition and what offers the best results."
                },
                {
                    question: "How long will I need to stay post-surgery?",
                    answer: "Usually 1–2 nights, depending on recovery speed and procedure type."
                },
                {
                    question: "Is insurance accepted?",
                    answer: "Absolutely. We work with leading insurers and also offer surgical packages with maternity benefits."
                },
                {
                    question: "How soon can I get back to routine work?",
                    answer: "It varies. Many patients resume light duties within a week; your surgeon will guide you specifically."
                }
            ],

            customCta: {
                heading: "Book Your Surgical Consultation",
                description: "To receive trusted, expert-led care, book an appointment at Stork Hospital—your reliable destination for safe surgical interventions in Hyderabad.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "General / Regional",
                hospitalStay: "1-2 Days",
                recoveryTime: "Varies",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Neelima", // Placeholder based on context
                role: "Senior Gynecologist",
                experience: "20+ Years Experience"
            }
        }
    }


    if (slug === "swollen-penis") {
        return {
            slug: slug,
            title: "Swollen Penis – Stork Hospital, Hyderabad",
            subheading: "Fast, Confidential Care for Penile Swelling",
            breadcrumbTitle: "Swollen Penis",
            category: "Urology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `A swollen penis can be caused by many factors, including infections, allergic reactions, trauma, or underlying medical conditions. Swelling may affect just the shaft, the glans (head), or the foreskin, and it can be accompanied by pain, redness, itching, or difficulty urinating. While mild swelling may resolve on its own, severe or persistent swelling needs prompt medical evaluation to prevent complications.

At Stork Multispecialty Hospital, Hyderabad, our experienced urologists provide discreet, respectful, and effective care to identify the cause and deliver the right treatment — ensuring relief and restoring comfort.`,

            overview: {
                heading: "Causes of a Swollen Penis",
                intro: "Common causes include:",
                items: [
                    "Infections such as balanitis, STIs, or urinary tract infections",
                    "Allergic reactions to latex, lubricants, or hygiene products",
                    "Trauma or injury from accidents, sports, or sexual activity",
                    "Paraphimosis – trapped foreskin restricting blood flow",
                    "Insect bites or skin irritation",
                    "Underlying chronic health conditions such as diabetes"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Why Choose Stork Hospital for Penile Swelling Treatment",
            conditionsTreated: [
                "Specialist urologists experienced in male genital conditions",
                "Diagnostic center with lab tests and imaging",
                "Advanced surgical center for operative intervention",
                "24/7 emergency hospital for urgent treatment",
                "Insurance accepted for covered procedures",
                "Walk-in clinic for private, same-day consultations"
            ],

            procedureHeading: "Treatment Options at Stork Hospital",
            procedureSteps: [
                {
                    title: "Medical Management",
                    description: "Antibiotics/antifungals for infections, antihistamines for allergies, or anti-inflammatory meds."
                },
                {
                    title: "Procedural or Surgical Interventions",
                    description: "Drainage of abscess, circumcision for recurrent cases, or emergency treatment for paraphimosis."
                },
                {
                    title: "Lifestyle & Hygiene Guidance",
                    description: "Advice on gentle cleaning, avoiding irritants, and managing underlying health issues."
                }
            ],

            benefitsHeading: "Symptoms That May Accompany Swelling",
            benefits: [
                "Redness or discoloration",
                "Pain or tenderness",
                "Rash or sores on the penis",
                "Discharge or foul odor from under the foreskin",
                "Difficulty urinating or urinary retention",
                "Fever (in case of infection)"
            ],

            risks: [],
            recoveryTimeline: [
                "Most recover within a few days to two weeks",
                "Follow hygiene practices to prevent recurrence",
                "Complete all prescribed medications",
                "Return for follow-up if swelling persists"
            ],

            faqHeading: "FAQs – Swollen Penis",
            faqs: [
                {
                    question: "When should I see a doctor?",
                    answer: "If swelling is severe, painful, or lasts more than 24–48 hours, seek medical attention immediately."
                },
                {
                    question: "Can swelling go away without treatment?",
                    answer: "Mild cases may resolve naturally, but it’s best to get a proper diagnosis."
                },
                {
                    question: "Is swelling always caused by an infection?",
                    answer: "No. It can also result from injury, allergic reactions, or other non-infectious causes."
                },
                {
                    question: "Does insurance cover treatment?",
                    answer: "Yes. Stork Hospital accepts most insurance plans for necessary medical or surgical treatment."
                }
            ],

            customCta: {
                heading: "Book a Private Consultation",
                description: "If you have swelling, discomfort, or any unusual symptoms, book an appointment at Stork Hospital to meet a specialist urologist in Hyderabad for prompt diagnosis and effective treatment.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "20-30 Min Consultation",
                anesthesia: "None / Local",
                hospitalStay: "Outpatient",
                recoveryTime: "Varies",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Srinivas", // Placeholder
                role: "Senior Urologist",
                experience: "15+ Years Experience"
            }
        }
    }

    if (slug === "throat-surgery") {
        return {
            slug: slug,
            title: "Throat Surgery – Stork Hospital, Hyderabad",
            subheading: "Surgical Expertise for Throat, Voice, and Airway Health",
            breadcrumbTitle: "Throat Surgery",
            category: "ENT",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Throat surgery is an umbrella term for procedures that address problems of the larynx (voice box), airway passages, and related throat structures. These surgeries may be required to restore normal breathing, improve voice quality, treat abnormal growths, or correct swallowing difficulties that have not improved with medicines or therapy.

At Stork Multispecialty Hospital, Hyderabad, our ENT surgeons combine advanced surgical tools with years of clinical experience to deliver safe, precise, and tailored throat surgeries. Every treatment plan is supported by collaboration between ENT experts, speech therapists, and respiratory specialists to give patients complete, end-to-end care.`,

            overview: {
                heading: "Conditions That May Require Throat Surgery",
                intro: "Our ENT department offers surgical solutions for:",
                items: [
                    "Vocal cord nodules, cysts, or polyps",
                    "Benign and malignant throat or laryngeal tumors",
                    "Chronic hoarseness caused by vocal cord changes",
                    "Narrowed airway passages from injury or scar tissue",
                    "Swallowing difficulties due to structural problems",
                    "Tracheal or subglottic narrowing affecting normal breathing"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Why Patients Trust Stork Hospital for Throat Procedures",
            conditionsTreated: [
                "Experienced ENT specialists trained in complex airway and voice surgeries",
                "Access to a modern advanced surgical center with cutting-edge anesthesia",
                "Comprehensive diagnostic center for laryngoscopy, imaging, and voice testing",
                "24/7 emergency hospital for urgent breathing or throat concerns",
                "Insurance accepted with clear and transparent pricing",
                "Same-day ENT consultations and walk-in clinic for immediate assessments",
                "Comfortable recovery suites designed for rest and privacy"
            ],

            procedureHeading: "How We Carry Out Throat Surgeries",
            procedureSteps: [
                {
                    title: "Pre-Surgical Planning",
                    description: "ENT evaluation with laryngoscopy, voice/swallowing assessments, and patient counseling."
                },
                {
                    title: "During the Procedure",
                    description: "General anesthesia in a sterile OT using precision techniques (microscopes/lasers) to reduce trauma."
                },
                {
                    title: "Post-Surgery Care",
                    description: "Pain management, voice-rest guidance, diet adjustments, and speech therapy if recommended."
                }
            ],

            benefitsHeading: "What to Expect in Your Treatment Journey",
            benefits: [
                "ENT specialist consultation and diagnostic evaluation",
                "Personalized surgical plan based on your condition",
                "Admission and pre-operative preparation",
                "Surgery performed by experienced ENT surgeons",
                "Recovery period in a monitored hospital setting",
                "Step-by-step aftercare and follow-up support"
            ],

            risks: [],
            recoveryTimeline: [
                "Pain management and voice-rest guidance",
                "Diet adjustments to protect the throat during healing",
                "Speech or swallowing therapy if recommended",
                "Follow-up visits to check recovery and prevent recurrence"
            ],

            faqHeading: "FAQs – Throat Surgery at Stork Hospital",
            faqs: [
                {
                    question: "Will my voice change permanently?",
                    answer: "In most cases, your voice will recover. In fact, some patients notice clearer and stronger voice quality after healing and therapy."
                },
                {
                    question: "How painful is the recovery?",
                    answer: "Any soreness or discomfort is temporary and well-controlled with prescribed medication."
                },
                {
                    question: "How long will I need to rest?",
                    answer: "This depends on the complexity of the procedure — minor surgeries may require only a few days off, while more advanced ones may need a few weeks."
                },
                {
                    question: "Can I use insurance for throat surgery?",
                    answer: "Yes. Stork Hospital works with top insurers and provides cost estimates in advance."
                }
            ],

            customCta: {
                heading: "Schedule Your ENT Surgery Consultation",
                description: "If you’ve been living with persistent voice issues, breathing difficulties, or swallowing problems, getting timely care is crucial. Book an appointment at Stork Hospital to meet with an ENT specialist in Hyderabad and explore the safest, most effective surgical options for your needs.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "Varies",
                anesthesia: "General",
                hospitalStay: "Varies",
                recoveryTime: "Varies",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rao", // Placeholder
                role: "Senior ENT Surgeon",
                experience: "25+ Years Experience"
            }
        }
    }



    // 3. Return Premium Placeholder Content (Default)
    if (slug === "tonsillectomy") {
        return {
            slug: slug,
            title: "Tonsillectomy – Stork Hospital, Hyderabad",
            subheading: "Relief from Chronic Throat Problems with Expert ENT Care",
            breadcrumbTitle: "Tonsillectomy",
            category: "ENT",
            departmentHref: foundCategory.href || "#",
            shortDescription: `A tonsillectomy is a surgical procedure to remove the tonsils — two oval-shaped pads of tissue at the back of the throat. It’s most commonly performed to treat recurrent throat infections, chronic tonsillitis, or sleep-related breathing issues such as obstructive sleep apnea.

At Stork Multispecialty Hospital, Hyderabad, our ENT specialists perform tonsillectomy with precision and patient comfort in mind. We use advanced surgical techniques that minimize discomfort, reduce recovery time, and ensure long-term relief. Whether for children or adults, our care approach is thorough, safe, and personalized.`,

            overview: {
                heading: "When is Tonsillectomy Recommended?",
                intro: "A tonsillectomy may be advised if you or your child experience:",
                items: [
                    "Repeated episodes of tonsillitis (3 or more in 6 months or 4 in a year)",
                    "Enlarged tonsils causing difficulty in swallowing or breathing",
                    "Sleep apnea due to obstructed airway",
                    "Chronic sore throat or bad breath from tonsil stones (tonsilloliths)",
                    "Complications such as abscess around the tonsils (peritonsillar abscess)"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Why Choose Stork Hospital for Tonsil Surgery",
            conditionsTreated: [
                "Experienced ENT specialists with a strong record in adult and pediatric tonsillectomy",
                "Advanced surgical center equipped with modern anesthesia and monitoring systems",
                "In-house diagnostic center for throat examination and pre-surgical evaluation",
                "24/7 hospital for urgent ENT emergencies and post-operative support",
                "Same-day doctor appointments and walk-in clinic for quick consultation",
                "Insurance accepted with transparent procedure cost estimates",
                "Child-friendly facilities for young patients needing surgery"
            ],

            procedureHeading: "Our Approach to Tonsillectomy",
            procedureSteps: [
                {
                    title: "Pre-Surgical Care",
                    description: "Consultation, throat examination, blood tests, and discussion of benefits/risks."
                },
                {
                    title: "During the Surgery",
                    description: "General anesthesia, removal of tonsils using advanced methods (coblation/electrocautery) to reduce bleeding."
                },
                {
                    title: "Post-Surgical Recovery",
                    description: "Pain management, soft diet guidance, and regular follow-up visits."
                }
            ],

            benefitsHeading: "Your Treatment Journey at Stork Hospital",
            benefits: [
                "ENT evaluation and pre-surgical testing",
                "Surgery scheduling and hospital admission",
                "Tonsillectomy procedure with real-time monitoring",
                "Short hospital stay (same-day discharge in most cases)",
                "Recovery guidance and follow-up appointments"
            ],

            risks: [],
            recoveryTimeline: [
                "Mild throat discomfort is common but well-managed",
                "Most patients recover in 1–2 weeks",
                "Guidance on soft diet and hydration for healing",
                "24/7 emergency support for any post-op concerns"
            ],

            faqHeading: "FAQs – Tonsillectomy at Stork Hospital",
            faqs: [
                {
                    question: "Is the surgery painful?",
                    answer: "Mild throat discomfort is common after surgery but is well-managed with medication."
                },
                {
                    question: "Can adults have a tonsillectomy?",
                    answer: "Yes. While more common in children, adults can also benefit, especially for chronic infections or sleep apnea."
                },
                {
                    question: "How long is recovery?",
                    answer: "Most patients recover in 1–2 weeks, with children often healing faster."
                },
                {
                    question: "Is insurance available for tonsillectomy?",
                    answer: "Yes. Stork Hospital works with leading insurance providers and offers cost transparency before the procedure."
                }
            ],

            customCta: {
                heading: "Book Your ENT Consultation Today",
                description: "If you or your child suffers from frequent throat infections or breathing problems during sleep, it’s time to explore solutions. Book an appointment at Stork Hospital to meet our ENT specialist in Hyderabad and learn how a tonsillectomy can improve health and quality of life.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "30-60 Min",
                anesthesia: "General",
                hospitalStay: "Day Case / 1 Night",
                recoveryTime: "1-2 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rao", // Placeholder
                role: "Senior ENT Surgeon",
                experience: "25+ Years Experience"
            }
        }
    }

    // 3. Return Premium Placeholder Content (Default)
    if (slug === "total-knee-replacement") {
        return {
            slug: slug,
            title: "Total Knee Replacement – Stork Hospital, Hyderabad",
            subheading: "Advanced Solutions for Pain-Free Movement",
            breadcrumbTitle: "Total Knee Replacement",
            category: "Orthopedics",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Total Knee Replacement (TKR), or total knee arthroplasty, is a surgical procedure in which a worn or severely damaged knee joint is replaced with a carefully designed artificial implant. It’s often the preferred treatment for advanced arthritis, traumatic injury, or long-standing joint pain that no longer responds to medication or therapy. The aim is to reduce pain, restore smooth movement, and help patients return to an active lifestyle.

At Stork Multispecialty Hospital, Hyderabad, we combine the expertise of highly trained orthopedic surgeons with modern technology to deliver safer, faster, and more comfortable knee replacement surgeries.`,

            overview: {
                heading: "When You Might Need a Knee Replacement",
                intro: "A knee replacement might be recommended if you experience:",
                items: [
                    "Persistent knee pain that limits daily tasks",
                    "Loss of mobility despite physiotherapy or medication",
                    "Stiffness or swelling that doesn’t improve with rest",
                    "Bow-legged or knock-knee deformity caused by joint damage",
                    "Confirmed end-stage arthritis via diagnostic imaging"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Why Stork Hospital is a Leading Choice for Knee Replacement",
            conditionsTreated: [
                "Specialist orthopedic surgeons skilled in routine and complex knee replacements",
                "In-house diagnostic center offering digital X-rays, CT, and MRI for detailed joint mapping",
                "Advanced surgical center equipped with computer-assisted navigation for precision alignment",
                "24/7 emergency hospital for orthopedic and post-surgical emergencies",
                "Insurance accepted with transparent cost details",
                "Walk-in clinic for quick orthopedic screening and consultations",
                "Dedicated physiotherapy unit to accelerate post-surgical recovery"
            ],

            procedureHeading: "How We Perform Total Knee Replacement at Stork",
            procedureSteps: [
                {
                    title: "Before Surgery",
                    description: "Complete health/mobility assessment, advanced imaging for customization, and patient education."
                },
                {
                    title: "During Surgery",
                    description: "Removal of damaged bone/cartilage, insertion of a tailored prosthetic joint, and precision alignment."
                },
                {
                    title: "After Surgery",
                    description: "Pain relief measures, early walking exercises, and supervised physiotherapy."
                }
            ],

            benefitsHeading: "Your Recovery Timeline at Stork Hospital",
            benefits: [
                "Consultation and diagnostic imaging",
                "Pre-surgical preparation and medical clearance",
                "Surgery using minimally invasive or conventional techniques",
                "Early mobilization with physiotherapy during hospital stay",
                "Ongoing outpatient rehab for full recovery and mobility"
            ],

            risks: [],
            recoveryTimeline: [
                "Many patients walk with assistance within 24–48 hours",
                "Most knee replacements last 15–20 years or longer",
                "Supervised physiotherapy to rebuild strength and range of motion",
                "Regular follow-ups to ensure optimal healing"
            ],

            faqHeading: "FAQs – Total Knee Replacement",
            faqs: [
                {
                    question: "Will I be able to walk soon after surgery?",
                    answer: "Yes. Many patients are able to walk with assistance within 24–48 hours."
                },
                {
                    question: "How durable are modern implants?",
                    answer: "With good care, most knee replacements last 15–20 years or longer."
                },
                {
                    question: "Is the procedure painful?",
                    answer: "Anesthesia and advanced pain control make surgery and recovery more comfortable."
                },
                {
                    question: "Will my insurance plan cover this surgery?",
                    answer: "Yes. Stork Hospital accepts most insurance policies and provides full cost transparency."
                }
            ],

            customCta: {
                heading: "Take the First Step Toward Pain-Free Living",
                description: "If knee pain is limiting your mobility and quality of life, expert help is available. Book an appointment at Stork Hospital to consult a knee replacement specialist in Hyderabad and discover the safest, most effective treatment options for your needs.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "1-2 Hours",
                anesthesia: "General / Spinal",
                hospitalStay: "3-5 Days",
                recoveryTime: "3-6 Months",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rao", // Placeholder
                role: "Senior Orthopedic Surgeon",
                experience: "25+ Years Experience"
            }
        }
    }

    // 3. Return Premium Placeholder Content (Default)
    if (slug === "turbinate-reduction") {
        return {
            slug: slug,
            title: "Turbinate Reduction – Stork Hospital, Hyderabad",
            subheading: "Restoring Easy Breathing with Advanced Nasal Surgery",
            breadcrumbTitle: "Turbinate Reduction",
            category: "ENT",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Inside your nose are small bony structures called turbinates, covered with mucous membrane that helps filter and humidify the air you breathe. When these turbinates become swollen — due to allergies, chronic sinus problems, or structural issues — they can block airflow and cause constant nasal congestion. Turbinate reduction is a surgical procedure to shrink or remove part of the enlarged turbinate tissue, restoring smooth, unobstructed breathing.

At Stork Multispecialty Hospital, Hyderabad, our ENT specialists perform turbinate reduction using safe, precise, and minimally invasive techniques. Our goal is to relieve long-term nasal blockage, reduce sinus infections, and improve your overall breathing comfort.`,

            overview: {
                heading: "When Turbinate Reduction May Be Recommended",
                intro: "Your ENT specialist may suggest this procedure if you have:",
                items: [
                    "Chronic nasal congestion that doesn’t improve with medication",
                    "Breathing difficulty due to enlarged turbinates",
                    "Frequent sinus infections linked to nasal blockage",
                    "Snoring or sleep apnea symptoms worsened by nasal obstruction",
                    "Ongoing allergy-related swelling unresponsive to therapy"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Why Choose Stork Hospital for Turbinate Reduction",
            conditionsTreated: [
                "Experienced ENT surgeons skilled in advanced nasal and sinus procedures",
                "Advanced surgical center with modern endoscopic and radiofrequency equipment",
                "On-site diagnostic center for nasal endoscopy, allergy testing, and imaging",
                "24/7 emergency hospital for urgent ENT care",
                "Insurance accepted with transparent cost details",
                "Same-day ENT consultations and walk-in clinic for quick evaluations",
                "Comprehensive aftercare to prevent recurrence of nasal obstruction"
            ],

            procedureHeading: "Our Surgical Approach",
            procedureSteps: [
                {
                    title: "Diagnosis and Planning",
                    description: "ENT examination, nasal endoscopy, and discussion of procedure type/expected results."
                },
                {
                    title: "During the Procedure",
                    description: "Performed under local/general anesthesia using radiofrequency ablation or partial tissue removal with endoscopic guidance."
                },
                {
                    title: "After the Procedure",
                    description: "Short recovery, nasal saline rinses, pain control, and follow-up visits."
                }
            ],

            benefitsHeading: "Your Treatment Journey at Stork Hospital",
            benefits: [
                "Initial ENT consultation and diagnostic evaluation",
                "Treatment planning based on findings",
                "Procedure scheduling and anesthesia preparation",
                "Turbinate reduction performed by an experienced ENT surgeon",
                "Same-day or overnight hospital stay, depending on procedure type",
                "Regular follow-up to ensure optimal breathing function"
            ],

            risks: [],
            recoveryTimeline: [
                "Short recovery period, often with same-day discharge",
                "Many patients return to daily activities within a few days",
                "Nasal saline rinses to aid healing",
                "Follow-up visits to monitor long-term results"
            ],

            faqHeading: "FAQs – Turbinate Reduction at Stork Hospital",
            faqs: [
                {
                    question: "Is turbinate reduction painful?",
                    answer: "The procedure is performed under anesthesia, and any mild post-operative discomfort is managed with medication."
                },
                {
                    question: "Will this surgery cure my nasal congestion permanently?",
                    answer: "In most cases, it provides long-term relief, though managing allergies and sinus health is still important."
                },
                {
                    question: "How soon can I resume normal activities?",
                    answer: "Many patients return to daily activities within a few days, avoiding strenuous exercise until cleared by the doctor."
                },
                {
                    question: "Is the procedure covered by insurance?",
                    answer: "Yes. Stork Hospital works with leading insurance providers and offers transparent pricing before treatment."
                }
            ],

            customCta: {
                heading: "Book Your Nasal Surgery Consultation",
                description: "If constant nasal congestion or blocked breathing is affecting your quality of life, it’s time to explore permanent solutions. Book an appointment at Stork Hospital to meet an ENT specialist in Hyderabad and find out if turbinate reduction is right for you.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "30-60 Min",
                anesthesia: "Local / General",
                hospitalStay: "Day Case",
                recoveryTime: "3-7 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rao", // Placeholder
                role: "Senior ENT Surgeon",
                experience: "25+ Years Experience"
            }
        }
    }

    // 3. Return Premium Placeholder Content (Default)
    if (slug === "tympanoplasty") {
        return {
            slug: slug,
            title: "Tympanoplasty – Advanced Eardrum Reconstruction at Stork Hospital, Hyderabad",
            subheading: "State-of-the-Art Ear Surgery for Hearing Recovery",
            breadcrumbTitle: "Tympanoplasty",
            category: "ENT",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Tympanoplasty is a refined surgical technique used to repair a perforated or damaged eardrum, restoring hearing clarity and protecting the ear from recurring infections. At Stork Multispecialty Hospital, Hyderabad, our ENT surgeons utilize both microscope-assisted and endoscopic tympanoplasty methods, ensuring exceptional precision, safety, and quicker healing.

Whether the damage stems from chronic infections, injury, or middle ear disorders, we deliver targeted treatment that improves both hearing function and overall comfort.`,

            overview: {
                heading: "Symptoms That Indicate Tympanoplasty Might Be Needed",
                intro: "You may benefit from tympanoplasty if you have:",
                items: [
                    "Persistent or recurrent ear discharge (otorrhea)",
                    "Noticeable hearing loss due to eardrum perforation",
                    "Ear trauma from sudden loud noise, pressure change, or injury",
                    "Chronic otitis media that hasn’t resolved with medication",
                    "Eardrum hole that hasn’t closed naturally over several months"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Why Choose Stork Hospital for Tympanoplasty in Hyderabad",
            conditionsTreated: [
                "Expert ENT surgeons for tympanoplasty with years of specialized experience",
                "High-tech surgical instruments to minimize trauma and enhance precision",
                "Individualized anesthesia protocols for patient comfort",
                "Full-spectrum recovery support, including hearing rehabilitation",
                "Walk-in ENT evaluations for timely diagnosis and advice",
                "Recognized Hyderabad hospital accepting insurance for ENT surgical care"
            ],

            procedureHeading: "Our Tympanoplasty Procedure at Stork",
            procedureSteps: [
                {
                    title: "Comprehensive Assessment",
                    description: "Evaluation with a senior ENT specialist, detailed hearing test (audiometry), and microscopic examination."
                },
                {
                    title: "The Surgery",
                    description: "Performed under local or general anesthesia using a small tissue graft to reconstruct the eardrum."
                },
                {
                    title: "Recovery & Follow-up",
                    description: "Same-day discharge or short stay, followed by structured aftercare to monitor healing and hearing improvement."
                }
            ],

            benefitsHeading: "Key Benefits of Tympanoplasty at Stork",
            benefits: [
                "Significant hearing improvement",
                "Long-term prevention of ear infections",
                "Minimally invasive techniques for faster healing",
                "Little to no visible scarring",
                "Enhanced confidence and daily communication ability"
            ],

            risks: [],
            recoveryTimeline: [
                "Light activities may resume within a week",
                "Complete healing typically takes 2–4 weeks",
                "Most patients notice fewer infections and improved hearing during follow-ups"
            ],

            faqHeading: "FAQs – Tympanoplasty at Stork",
            faqs: [
                {
                    question: "Is the procedure painful?",
                    answer: "No. It’s performed under anesthesia, ensuring you remain comfortable throughout."
                },
                {
                    question: "How soon can I return to normal life?",
                    answer: "Light activities may resume within a week; complete healing typically takes 2–4 weeks."
                },
                {
                    question: "Will my hearing be back to normal?",
                    answer: "Many patients experience major improvement, though final results depend on the severity of damage."
                },
                {
                    question: "Is insurance accepted?",
                    answer: "Yes. We are a Hyderabad hospital accepting insurance for advanced ENT procedures."
                }
            ],

            customCta: {
                heading: "Regain Clear Hearing with Stork Hospital",
                description: "If you’re struggling with hearing loss or chronic ear issues, book a tympanoplasty consultation at Stork Hospital in Hyderabad. Our expert-led, patient-focused approach ensures safe surgery and lasting results.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "1-2 Hours",
                anesthesia: "Local / General",
                hospitalStay: "Day Case",
                recoveryTime: "2-4 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rao", // Placeholder
                role: "Senior ENT Surgeon",
                experience: "25+ Years Experience"
            }
        }
    }

    // 3. Return Premium Placeholder Content (Default)
    if (slug === "ursl") {
        return {
            slug: slug,
            title: "URSL (Ureteroscopic Lithotripsy) – Stork Hospital, Hyderabad",
            subheading: "Advanced Endoscopic Stone Removal",
            breadcrumbTitle: "URSL",
            category: "Urology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Ureteroscopic Lithotripsy (URSL) is a safe and precise minimally invasive method for removing stones from the ureter or kidney. A slim ureteroscope is passed through the urinary passage — via the urethra and bladder — to reach the stone directly. Once located, a Holmium laser is used to break it into tiny fragments, which are then either removed or left to pass naturally through urine.

At Stork Multispecialty Hospital, Hyderabad, our urology team performs URSL with cutting-edge technology, ensuring effective results, minimal discomfort, and quick recovery.`,

            overview: {
                heading: "When URSL is Recommended",
                intro: "A urologist may recommend URSL if you have:",
                items: [
                    "Stones lodged in the ureter causing pain or blockage",
                    "Stones too large to pass on their own",
                    "Cases where stones lead to bleeding, infection, or kidney swelling",
                    "Failed response to medications or shock wave therapy (ESWL)"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Why Choose Stork Hospital for URSL",
            conditionsTreated: [
                "Experienced urologists specializing in advanced endoscopic procedures",
                "Diagnostic center with high-accuracy imaging tools",
                "Advanced surgical center with latest-generation ureteroscopes and laser systems",
                "24/7 emergency hospital for urgent stone-related issues",
                "Insurance accepted with upfront cost clarity",
                "Walk-in clinic for same-day specialist appointments",
                "Complete aftercare and prevention-focused follow-up programs"
            ],

            procedureHeading: "How URSL is Done",
            procedureSteps: [
                {
                    title: "Pre-Surgical Imaging",
                    description: "Ultrasound, X-ray, or CT scan to locate and assess the stone."
                },
                {
                    title: "Anesthesia & Scope Insertion",
                    description: "General or spinal anesthesia. Ureteroscope passed carefully via the urethra to the stone’s location."
                },
                {
                    title: "Laser Fragmentation & Extraction",
                    description: "Holmium laser breaks the stone into fine particles. Fragments are removed or left to pass naturally."
                },
                {
                    title: "Stent Placement",
                    description: "A stent may be placed if required to keep urine flowing and aid healing."
                }
            ],

            benefitsHeading: "Advantages of URSL at Stork Hospital",
            benefits: [
                "No cuts, stitches, or external scars",
                "Short recovery — often back to daily activities within a few days",
                "High success rate in clearing ureteral stones",
                "Option to treat both ureter and kidney stones in one procedure",
                "Minimal post-procedure pain"
            ],

            risks: [],
            recoveryTimeline: [
                "Most patients go home within 24 hours",
                "Normal routine resumed in 1–2 days",
                "Plenty of fluids to flush out remaining stone dust",
                "Avoid strenuous activity until medically cleared",
                "Follow-up imaging to confirm the stone is completely gone"
            ],

            faqHeading: "FAQs – URSL",
            faqs: [
                {
                    question: "Is URSL painful?",
                    answer: "No. It is performed under anesthesia, and any mild discomfort afterward is temporary."
                },
                {
                    question: "How long does URSL take?",
                    answer: "Usually 30–60 minutes, depending on stone size and location."
                },
                {
                    question: "Will I always need a stent?",
                    answer: "Only if the surgeon feels it will improve drainage and healing."
                },
                {
                    question: "Is URSL covered under insurance?",
                    answer: "Yes. Stork Hospital works with most insurance providers."
                }
            ],

            customCta: {
                heading: "Book Your URSL Consultation",
                description: "If you’re struggling with ureteral or kidney stones, book an appointment at Stork Hospital to consult a urologist in Hyderabad and find out if URSL is the right choice for you.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "30-60 Min",
                anesthesia: "General / Spinal",
                hospitalStay: "Day Case / 24 hrs",
                recoveryTime: "2-4 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rao", // Placeholder
                role: "Senior Urologist",
                experience: "25+ Years Experience"
            }
        }
    }

    // 3. Return Premium Placeholder Content (Default)
    if (slug === "vaginoplasty") {
        return {
            slug: slug,
            title: "Vaginoplasty – Stork Hospital, Hyderabad",
            subheading: "Empowering Confidence Through Personalized Care",
            breadcrumbTitle: "Vaginoplasty",
            category: "Gynecology",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Vaginoplasty is a reconstructive or cosmetic surgical procedure aimed at tightening and restoring the vaginal canal and surrounding tissues. At Stork Hospital, Hyderabad, we approach vaginoplasty with sensitivity, skill, and complete confidentiality. Whether performed for medical, aesthetic, or postnatal recovery reasons, our focus is on delivering safe outcomes that improve both physical comfort and emotional well-being.

We are one of the few women-centric hospitals in Hyderabad offering advanced vaginal rejuvenation surgeries in a fully private and supportive environment.`,

            overview: {
                heading: "What is Vaginoplasty?",
                intro: "Vaginoplasty is a minimally invasive surgical technique that repairs and tightens stretched or weakened vaginal tissues. Often chosen by women who’ve experienced childbirth-related trauma or age-related changes, it helps restore muscle tone, improve sexual satisfaction, and enhance self-confidence.",
                items: [
                    "Reconstruction of the vaginal walls",
                    "Removal of excess or lax tissue",
                    "Strengthening of pelvic floor muscles",
                    "Can be performed alone or combined with perineoplasty, labial reduction, or pelvic floor repair"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Who Can Consider Vaginoplasty?",
            conditionsTreated: [
                "Experience reduced vaginal tone after childbirth",
                "Notice loss of sexual satisfaction due to laxity",
                "Have cosmetic concerns about vaginal appearance",
                "Feel discomfort during intercourse",
                "Suffer from pelvic floor weakness or scarring",
                "We offer detailed pre-surgical consultations in a judgment-free zone"
            ],

            procedureHeading: "Our Approach to Surgical Vaginal Rejuvenation",
            procedureSteps: [
                {
                    title: "Pre-Surgical Planning",
                    description: "One-on-one consultation, medical evaluation, pelvic exam, and counseling to clarify goals."
                },
                {
                    title: "During the Procedure",
                    description: "Performed under local or general anesthesia. Usually completed within 60–90 minutes with no visible external scarring."
                },
                {
                    title: "Post-Operative Care",
                    description: "Short recovery (2–4 weeks), prescription for pain management, and follow-up appointments."
                }
            ],

            benefitsHeading: "Why Choose Stork Hospital?",
            benefits: [
                "Experienced female gynecologists and surgeons",
                "Private consultation and recovery rooms",
                "Fully sanitized and modern surgical suites",
                "Strict confidentiality and patient privacy protocols",
                "Emotional counseling and post-surgical support",
                "Insurance-covered options (subject to medical indications)"
            ],

            risks: [],
            recoveryTimeline: [
                "Short recovery period (2–4 weeks for daily activity)",
                "Resume physical intimacy typically after 6 weeks",
                "Pain is well-managed with medications",
                "Long-lasting results especially when paired with pelvic floor exercises"
            ],

            faqHeading: "FAQs – Vaginoplasty at Stork Hospital",
            faqs: [
                {
                    question: "Is vaginoplasty painful?",
                    answer: "Most patients report mild discomfort for a few days. Pain is well-managed with medications."
                },
                {
                    question: "How long before I can resume physical intimacy?",
                    answer: "Typically, 6 weeks after surgery, depending on healing progress."
                },
                {
                    question: "Will the results be permanent?",
                    answer: "Results are long-lasting, especially when paired with pelvic floor strengthening exercises."
                },
                {
                    question: "Is the procedure safe?",
                    answer: "Yes. When performed by trained specialists, vaginoplasty is safe with low risk of complications."
                }
            ],

            customCta: {
                heading: "Take the Next Step in Your Self-Care Journey",
                description: "Book a confidential consultation at Stork Hospital—Hyderabad’s trusted center for advanced vaginal rejuvenation procedures.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "60-90 Min",
                anesthesia: "Local / General",
                hospitalStay: "Day Case / Overnight",
                recoveryTime: "2-4 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Lakshmi", // Placeholder
                role: "Senior Gynecologist",
                experience: "20+ Years Experience"
            }
        }
    }

    // 3. Return Premium Placeholder Content (Default)
    if (slug === "varicose-veins") {
        return {
            slug: slug,
            title: "Varicose Veins – Stork Hospital, Hyderabad",
            subheading: "Advanced Treatment for Healthy, Pain-Free Legs",
            breadcrumbTitle: "Varicose Veins",
            category: "Vascular Surgery",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Varicose veins are enlarged, twisted veins that most often appear in the legs due to faulty valves that allow blood to pool. They can cause aching, swelling, heaviness, and in severe cases, skin changes or ulcers. While often seen as a cosmetic issue, untreated varicose veins can lead to serious complications over time.

At Stork Multispecialty Hospital, Hyderabad, our vascular specialists offer safe, effective treatments for varicose veins, focusing on symptom relief, improved circulation, and prevention of recurrence. We use both minimally invasive techniques and advanced surgical options depending on your needs.`,

            overview: {
                heading: "Symptoms of Varicose Veins",
                intro: "Common signs include:",
                items: [
                    "Visible, bulging veins in the legs or feet",
                    "Aching, throbbing, or heaviness in the legs",
                    "Swelling of ankles or lower legs",
                    "Itching or burning sensation over affected veins",
                    "Night cramps or restless legs",
                    "Skin discoloration or ulcers in advanced stages"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Why Choose Stork Hospital for Varicose Vein Treatment",
            conditionsTreated: [
                "Experienced vascular surgeons skilled in both surgical and non-surgical approaches",
                "State-of-the-art diagnostic center for Doppler ultrasound and vascular imaging",
                "Advanced surgical center for laser, radiofrequency, or micro-surgical procedures",
                "24/7 emergency hospital for vascular emergencies",
                "Insurance accepted with clear pricing and billing",
                "Same-day appointments and walk-in clinic for prompt evaluation",
                "Comprehensive aftercare to prevent future vein problems"
            ],

            procedureHeading: "Our Treatment Approach",
            procedureSteps: [
                {
                    title: "Diagnosis",
                    description: "Physical examination and Doppler ultrasound to assess blood flow and valve function."
                },
                {
                    title: "Non-Surgical Management",
                    description: "Lifestyle modifications, compression stockings, and medications for pain relief."
                },
                {
                    title: "Minimally Invasive & Surgical Treatments",
                    description: "Options include Endovenous Laser Therapy (EVLT), Radiofrequency Ablation (RFA), Sclerotherapy, and Microphlebectomy."
                }
            ],

            benefitsHeading: "Your Care Journey at Stork Hospital",
            benefits: [
                "Initial consultation and vascular assessment",
                "Diagnostic imaging to determine severity",
                "Personalized treatment planning – non-surgical or surgical",
                "Outpatient procedure or hospital-based care as needed",
                "Post-treatment monitoring and follow-up visits"
            ],

            risks: [],
            recoveryTimeline: [
                "Many patients return to normal activities within a few days",
                "Most modern procedures are minimally invasive",
                "Performed under local anesthesia",
                "Follow-up visits to ensure proper healing"
            ],

            faqHeading: "FAQs – Varicose Vein Treatment",
            faqs: [
                {
                    question: "Are varicose veins only a cosmetic issue?",
                    answer: "No. They can cause discomfort, swelling, and complications if not treated."
                },
                {
                    question: "Is treatment painful?",
                    answer: "Most modern procedures are minimally invasive and performed under local anesthesia."
                },
                {
                    question: "How long does recovery take?",
                    answer: "Many patients return to normal activities within a few days, depending on the procedure."
                },
                {
                    question: "Does insurance cover varicose vein treatment?",
                    answer: "Yes. Stork Hospital works with leading insurance providers and offers transparent billing."
                }
            ],

            customCta: {
                heading: "Book Your Varicose Vein Consultation",
                description: "If you have leg pain, swelling, or visible veins, don’t wait for symptoms to worsen. Book an appointment at Stork Hospital to consult a vascular specialist in Hyderabad.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "45-90 Min",
                anesthesia: "Local / Regional",
                hospitalStay: "Day Case",
                recoveryTime: "2-7 Days",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Reddy", // Placeholder
                role: "Senior Vascular Surgeon",
                experience: "20+ Years Experience"
            }
        }
    }

    // 3. Return Premium Placeholder Content (Default)
    if (slug === "vocal-cord-polyps") {
        return {
            slug: slug,
            title: "Vocal Cord Polyps – Stork Hospital, Hyderabad",
            subheading: "Clearer Voice, Better Quality of Life",
            breadcrumbTitle: "Vocal Cord Polyps",
            category: "ENT",
            departmentHref: foundCategory.href || "#",
            shortDescription: `Vocal cord polyps are soft, non-cancerous growths that develop on one or both vocal cords, often due to voice overuse, injury, or prolonged irritation. They can significantly affect voice quality, making speech raspy, weak, or strained. While mild cases may respond to voice therapy and rest, more advanced polyps often require surgical removal to restore normal vocal function.

At Stork Multispecialty Hospital, Hyderabad, our ENT specialists diagnose and treat vocal cord polyps with precision and care. Using advanced microsurgical techniques, we remove polyps while preserving healthy vocal tissue, followed by structured voice rehabilitation for long-term results.`,

            overview: {
                heading: "Symptoms of Vocal Cord Polyps",
                intro: "You may have a vocal cord polyp if you experience:",
                items: [
                    "Persistent hoarseness or voice roughness",
                    "Voice fatigue after speaking for short periods",
                    "Reduced pitch or loss of vocal range",
                    "Throat irritation or a “lump in the throat” feeling",
                    "Frequent need to clear the throat",
                    "Sudden voice changes following strain or shouting"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Why Choose Stork Hospital for Vocal Cord Polyp Treatment",
            conditionsTreated: [
                "Highly experienced ENT specialists in laryngeal microsurgery",
                "Fully equipped advanced surgical center with high-definition laryngoscopy and stroboscopy",
                "Comprehensive diagnostic center for voice analysis and imaging",
                "24/7 emergency hospital near Hitech City for urgent airway or voice issues",
                "Insurance accepted with clear and upfront cost details",
                "Same-day ENT appointments and walk-in clinic for quick access",
                "Integrated care with speech therapists for post-treatment recovery"
            ],

            procedureHeading: "Our Treatment Approach",
            procedureSteps: [
                {
                    title: "Diagnosis",
                    description: "Detailed ENT examination, laryngoscopy, stroboscopy, and voice testing."
                },
                {
                    title: "Non-Surgical Care",
                    description: "Voice rest, speech therapy, proper hydration, and medication for underlying conditions."
                },
                {
                    title: "Surgical Care",
                    description: "Microlaryngoscopic removal under general anesthesia or laser-assisted precision surgery."
                }
            ],

            benefitsHeading: "Your Treatment Journey at Stork Hospital",
            benefits: [
                "ENT consultation and voice assessment",
                "Diagnostic laryngoscopy or stroboscopy",
                "Treatment planning — conservative therapy or surgery",
                "Surgical removal if required",
                "Rehabilitation through structured speech therapy"
            ],

            risks: [],
            recoveryTimeline: [
                "Initial healing may take a couple of weeks",
                "Full voice recovery depends on therapy progress",
                "Most patients regain clear voice quality",
                "Follow-up visits to monitor healing"
            ],

            faqHeading: "FAQs – Vocal Cord Polyps at Stork Hospital",
            faqs: [
                {
                    question: "Can vocal cord polyps heal without surgery?",
                    answer: "Small, early-stage polyps may improve with voice therapy and lifestyle changes, but larger ones typically require surgery."
                },
                {
                    question: "Will my voice sound normal again?",
                    answer: "Most patients regain clear voice quality after treatment, especially when therapy is followed consistently."
                },
                {
                    question: "How long does recovery take?",
                    answer: "Initial healing may take a couple of weeks; full voice recovery depends on therapy progress."
                },
                {
                    question: "Is treatment covered by insurance?",
                    answer: "Yes. Stork Hospital works with major insurers and provides cost transparency before treatment."
                }
            ],

            customCta: {
                heading: "Book Your Voice Care Consultation",
                description: "If you are experiencing persistent voice changes, hoarseness, or throat discomfort, don’t delay. Book an appointment at Stork Hospital to meet an ENT specialist in Hyderabad.",
                buttonText: "Book Appointment"
            },
            meta: {
                duration: "30-60 Min",
                anesthesia: "General",
                hospitalStay: "Day Case",
                recoveryTime: "2-4 Weeks",
                successRate: "High"
            },
            reviewedBy: {
                name: "Dr. Rao", // Placeholder
                role: "Senior ENT Surgeon",
                experience: "25+ Years Experience"
            }
        }
    }

    // 3. Return Premium Placeholder Content (Default)
    return {
        slug: slug,
        title: foundItem.title,
        subheading: `Advanced ${foundItem.title} Care at Stork Hospital`,
        tagline: "Comprehensive treatment by leading specialists",
        category: foundCategory.title,
        departmentHref: foundCategory.href || "#",
        shortDescription: `Advanced ${foundItem.title} treatments provided by leading specialists using state-of-the-art technology for optimal recovery.`,
        fullDescription: [
            `${foundItem.title} is a specialized medical procedure designed to address specific conditions affecting the ${foundItem.body_region || "body"}. At Stork Hospital, our team of expert surgeons and specialists utilize the latest minimally invasive techniques to ensure the best possible outcomes for our patients.`,
            "Our approach focuses on comprehensive care, from initial diagnosis through post-procedure recovery. We understand that every patient is unique, and we tailor our treatment plans to meet individual needs, ensuring safety, comfort, and effective results.",
            "With a track record of success and a patient-centric philosophy, we are committed to restoring your health and quality of life through world-class medical intervention."
        ],
        conditionsTreated: [
            `Chronic pain or discomfort related to ${foundItem.title}`,
            "Reduced mobility or functionality",
            "Inflammation or infection unresponsive to medication",
            "Congenital or acquired structural abnormalities",
            "Trauma-related injuries requiring surgical intervention"
        ],
        procedureSteps: [
            {
                title: "Pre-Procedure Assessment",
                description: "A thorough evaluation including imaging, blood tests, and consultation to ensure you are ready for the procedure."
            },
            {
                title: "Anesthesia & Preparation",
                description: "Administration of appropriate anesthesia (local or general) to ensure a pain-free experience during the surgery."
            },
            {
                title: "The Procedure",
                description: "Our surgeons perform the procedure using precision instruments, minimizing tissue damage and promoting faster healing."
            },
            {
                title: "Closing & Observation",
                description: "Surgical sites are securely closed, and you are moved to a recovery room for close monitoring by our nursing staff."
            }
        ],
        benefits: [
            "Minimally invasive techniques with smaller incisions",
            "Reduced pain and discomfort post-surgery",
            "Shorter hospital stay and faster recovery time",
            "Lower risk of complications and infection",
            "Improved long-term health outcomes and quality of life"
        ],
        risks: [
            "As with any surgical procedure, there are minor risks of infection or bleeding.",
            "Potential reaction to anesthesia (rare).",
            "Temporary swelling or bruising at the surgical site.",
            "Our team takes every precaution to minimize these risks through rigorous safety protocols."
        ],
        recoveryTimeline: [
            "Day 1: Observation and initial rest. Most patients can mobilize with assistance.",
            "Week 1: Gradual return to light daily activities. Pain management as prescribed.",
            "Week 2-4: Follow-up consultation. Resume moderate activities and work (depending on job type).",
            "Month 3: Full recovery and return to all normal physical activities and sports."
        ],
        faqs: [
            {
                question: `How long does the ${foundItem.title} procedure take?`,
                answer: "The duration varies depending on complexity, but typically ranges from 1 to 3 hours. Your surgeon will provide a specific estimate."
            },
            {
                question: "Is the procedure covered by insurance?",
                answer: "Yes, most major insurance plans cover this procedure when medically necessary. Our billing team can assist you with pre-authorization."
            },
            {
                question: "How soon can I drive after surgery?",
                answer: "We generally recommend waiting at least 48-72 hours or until you are off prescription pain medication and feel fully alert."
            },
            {
                question: "Will there be visible scarring?",
                answer: "Our surgeons use techniques to minimize scarring. Incisions are placed strategically, and scars typically fade significantly over time."
            }
        ],
        meta: {
            duration: "Varies by Case",
            anesthesia: "General / Local",
            hospitalStay: "1-2 Days",
            recoveryTime: "1-2 Weeks",
            successRate: "95%+"
        },
        reviewedBy: {
            name: "Dr. Rajesh Sharma", // Placeholder
            role: `Head of ${foundCategory.title}`,
            experience: "20+ Years Experience"
        }
    }
    // Generic Fallback for valid procedures without specific content
    if (foundItem && foundCategory) {
        return {
            slug: slug,
            title: foundItem.title,
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Comprehensive care and advanced treatment for ${foundItem.title} at Stork Hospital.`,
            overview: {
                heading: `About ${foundItem.title}`,
                intro: `Stork Hospital provides expert care for ${foundItem.title}. Our team of specialists ensures the best possible outcomes using advanced medical technology.`,
                items: [
                    "Expert Specialist Care",
                    "Advanced Medical Facilities",
                    "Patient-Centric Approach",
                    "Comprehensive Post-Procedure Support"
                ]
            },
            fullDescription: [],
            conditionsHeading: "Conditions Treated",
            conditionsTreated: [
                `Medical conditions related to ${foundItem.title}`
            ],
            procedureHeading: "What to Expect",
            procedureSteps: [
                {
                    title: "Consultation",
                    description: "Detailed evaluation by our specialists."
                },
                {
                    title: "Procedure",
                    description: "Performed with precision and care."
                },
                {
                    title: "Recovery",
                    description: "Guided recovery plan for optimal health."
                }
            ],
            benefitsHeading: "Benefits",
            benefits: [
                "Experienced Medical Team",
                "State-of-the-art Infrastructure",
                "Personalized Care Plans"
            ],
            risks: [],
            recoveryTimeline: [],
            faqHeading: "Common Questions",
            faqs: [
                {
                    question: "How do I book an appointment?",
                    answer: "You can book an appointment online or call our helper line."
                }
            ],
            meta: {
                duration: "Consult Doctor",
                anesthesia: "Consult Doctor",
                hospitalStay: "Consult Doctor",
                recoveryTime: "Consult Doctor"
            },
            reviewedBy: {
                name: "Stork Medical Board",
                role: "Senior Specialists",
                experience: "Multi-disciplinary Team"
            }
        }
    }

    return null
}

import { HARDCODED_TREATMENTS } from "./hardcoded-treatments"

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
    return HARDCODED_TREATMENTS.flatMap(cat => cat.items.map(item => {
        // Extract slug from href: /treatments/anal-fissure -> anal-fissure
        const slug = item.href.split("/").pop() || ""
        return slug
    }))
}

export function getTreatmentDetail(slug: string): TreatmentDetail | null {
    // 1. Find the treatment in HARDCODED_TREATMENTS to get real title/category
    let foundItem = null
    let foundCategory = null

    for (const cat of HARDCODED_TREATMENTS) {
        const item = cat.items.find(i => i.href.endsWith(`/${slug}`))
        if (item) {
            foundItem = item
            foundCategory = cat
            break
        }
    }

    if (!foundItem || !foundCategory) {
        return null
    }

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
            title: "Appendicitis Surgery – Stork Hospital, Hyderabad",
            subheading: "Precision Care for Sudden Appendix Pain",
            breadcrumbTitle: "Appendicitis",
            category: foundCategory.title,
            departmentHref: foundCategory.href || "#",
            shortDescription: `Appendicitis is a sudden and painful condition where the appendix—a small pouch attached to the large intestine—becomes inflamed. This condition often starts with mild abdominal pain near the belly button, which quickly intensifies and shifts to the lower right side. If untreated, the appendix may burst, leading to serious complications such as widespread infection.

At Stork Hospital, Hyderabad, we provide immediate diagnosis and expert surgical care to manage appendicitis and promote full recovery. Our medical team specializes in laparoscopic appendix surgery in Hyderabad, offering minimally invasive solutions that ensure less discomfort and quicker healing.`,

            overview: {
                heading: "Why Stork Hospital is the Right Choice",
                intro: "",
                items: [
                    "Emergency appendicitis treatment available 24/7",
                    "Surgical experts trained in both open and laparoscopic techniques",
                    "Advanced facilities for diagnostics and operation",
                    "End-to-end care including post-operative support",
                    "Recognized for quality appendix surgery in Hyderabad"
                ]
            },
            fullDescription: [],

            conditionsHeading: "Causes and Warning Signs of Appendicitis",
            conditionsTreated: [
                "Intense abdominal pain on the lower right side",
                "Nausea, vomiting, or lack of hunger",
                "Fever, bloating, and tenderness",
                "Pain that worsens with walking, coughing, or movement",
                "Risk of peritonitis or abscess if not treated quickly"
            ],

            procedureHeading: "Treatment Options Customized to You",
            procedureSteps: [
                {
                    title: "Laparoscopic Appendectomy",
                    description: "A keyhole procedure involving a few small incisions where the appendix is removed with precision tools under camera guidance. Usually completed in under an hour, offering faster discharge and less visible scarring. Preferred method for uncomplicated appendicitis."
                },
                {
                    title: "Open Surgery (When Required)",
                    description: "Chosen when infection has spread or the appendix has ruptured. A single larger incision is made for direct access. Requires longer recovery but ensures thorough infection management."
                }
            ],

            benefitsHeading: "Recovery: What You Can Expect",
            benefits: [
                "Mild discomfort near the surgical site, managed with medication",
                "Gentle movement and small meals can resume within days",
                "Return to work and normal activity in 1–2 weeks",
                "Follow-ups scheduled to track healing and progress"
            ],

            risks: [],
            recoveryTimeline: [],

            faqHeading: "Frequently Asked Questions",
            faqs: [
                {
                    question: "Is surgery necessary for appendicitis?",
                    answer: "Yes. Once inflamed, the appendix must be removed to prevent rupture."
                },
                {
                    question: "How long will recovery take?",
                    answer: "Most patients recover fully within 1 to 2 weeks after laparoscopic surgery."
                },
                {
                    question: "Is laparoscopic surgery the best choice?",
                    answer: "It’s ideal for most cases, offering quicker healing and less pain."
                },
                {
                    question: "Do I need a permanent diet change?",
                    answer: "No. A soft diet may be advised briefly, but normal eating resumes soon."
                }
            ],

            customCta: {
                heading: "Get Prompt Treatment",
                description: "Get prompt treatment for abdominal pain before it escalates. Trust Stork Hospital for safe, experienced appendicitis care in Hyderabad.",
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
}

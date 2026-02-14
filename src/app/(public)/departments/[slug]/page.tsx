import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section } from "@/components/layout/section"
import { ArrowRight, ChevronRight, Activity, Heart, Brain, Stethoscope, Clock, ShieldCheck, Users, Calendar, Phone, Microscope, Bone, Baby, User } from "lucide-react"

// Mock Data for Departments
const departmentsData: Record<string, any> = {
    "cardiology": {
        title: "Cardiology",
        description: "Our Cardiology department offers comprehensive care for heart conditions, ranging from prevention and diagnosis to advanced surgical interventions.",
        icon: Heart,
        services: [
            { title: "Non-Invasive Cardiology", icon: Activity },
            { title: "Interventional Cardiology", icon: Heart },
            { title: "Electrophysiology", icon: Activity },
            { title: "Heart Failure Clinic", icon: Heart },
        ],
        procedures: [
            { title: "Angioplasty & Stenting", desc: "Minimally invasive procedure to open clogged heart arteries." },
            { title: "Coronary Artery Bypass", desc: "Surgery to restore blood flow to the heart muscle." },
            { title: "Pacemaker Implantation", desc: "Device implantation to regulate heart rhythm." },
            { title: "Valve Replacement", desc: "Surgical replacement of damaged heart valves." },
        ],
        doctors: [
            { name: "Dr. Rajesh Kumar", role: "Senior Consultant", exp: "25+ Years", qual: "MBBS, MD, DM (Cardiology)" },
            { name: "Dr. Anita Desai", role: "Interventional Cardiologist", exp: "15+ Years", qual: "MBBS, MD, DNB" },
        ]
    },
    "neurology": {
        title: "Neurology",
        description: "State-of-the-art care for disorders of the nervous system, including the brain, spinal cord, and nerves, led by expert neurologists.",
        icon: Brain,
        services: [
            { title: "Stroke Management", icon: Brain },
            { title: "Epilepsy Clinic", icon: Activity },
            { title: "Movement Disorders", icon: Activity },
            { title: "Headache Clinic", icon: Brain },
        ],
        procedures: [
            { title: "Brain Tumor Surgery", desc: "Advanced neurosurgical removal of brain tumors." },
            { title: "Spine Surgery", desc: "Minimally invasive procedures for spinal conditions." },
            { title: "Deep Brain Stimulation", desc: "Treatment for Parkinson's and other movement disorders." },
            { title: "Thrombectomy", desc: "Emergency removal of blood clots from brain arteries." },
        ],
        doctors: [
            { name: "Dr. Suresh Menon", role: "Lead Neurosurgeon", exp: "20+ Years", qual: "MBBS, MS, MCh (Neurosurgery)" },
            { name: "Dr. Meera Iyer", role: "Consultant Neurologist", exp: "12+ Years", qual: "MBBS, MD, DM (Neurology)" },
        ]
    },
    "orthopedics": {
        title: "Orthopedics",
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
    "pediatrics": {
        title: "Pediatrics",
        description: "Compassionate and comprehensive healthcare for infants, children, and adolescents, delivered in a child-friendly environment.",
        icon: Baby,
        services: [
            { title: "General Pediatrics", icon: Baby },
            { title: "Neonatal Intensive Care", icon: Activity },
            { title: "Pediatric Surgery", icon: Microscope },
            { title: "Vaccination Clinic", icon: ShieldCheck },
        ],
        procedures: [
            { title: "Hernia Repair", desc: "Surgical correction of hernias in children." },
            { title: "Appendectomy", desc: "Surgical removal of the appendix." },
            { title: "Circumcision", desc: "Surgical removal of the foreskin." },
            { title: "Tonsillectomy", desc: "Surgical removal of the tonsils." },
        ],
        doctors: [
            { name: "Dr. Anjali Gupta", role: "Senior Pediatrician", exp: "18+ Years", qual: "MBBS, MD (Pediatrics)" },
            { name: "Dr. Rahul Sharma", role: "Pediatric Surgeon", exp: "14+ Years", qual: "MBBS, MS, MCh (Pediatric Surgery)" },
        ]
    }
}

export default async function DepartmentPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const department = departmentsData[slug.toLowerCase()]

    if (!department) {
        return notFound()
    }

    const Icon = department.icon

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* 1. Breadcrumb & Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <nav className="flex items-center text-sm text-slate-500 mb-4">
                        <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <Link href="/#specialties" className="hover:text-[var(--color-primary)] transition-colors">Departments</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <span className="font-medium text-[var(--color-primary)]">{department.title}</span>
                    </nav>
                </div>
            </div>

            <section className="bg-white pb-12 md:pb-16 pt-6">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="h-20 w-20 rounded-2xl bg-[var(--color-primary)]/5 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                            <Icon className="h-10 w-10" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">{department.title}</h1>
                            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                                {department.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Services Overview */}
            <Section>
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
                        <Activity className="h-6 w-6 text-[var(--color-accent)]" />
                        Key Services
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {department.services.map((service: any, i: number) => (
                            <Card key={i} className="border-slate-200 hover:border-[var(--color-primary)] transition-colors">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                                        <service.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-semibold text-[var(--color-primary)]">{service.title}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* 3. Related Procedures */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
                        <Microscope className="h-6 w-6 text-[var(--color-accent)]" />
                        Common Procedures
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {department.procedures.map((proc: any, i: number) => (
                            <Card key={i} className="group hover:shadow-md transition-all">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                                        {proc.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-4">{proc.desc}</p>
                                    <Button variant="link" className="p-0 h-auto text-[var(--color-accent)] hover:text-[var(--color-primary)]">
                                        View Details <ArrowRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </Section>

            {/* 4. Doctor List */}
            <Section className="bg-white border-t border-slate-100">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-8 flex items-center gap-2">
                    <Stethoscope className="h-6 w-6 text-[var(--color-accent)]" />
                    Meet Our Specialists
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {department.doctors.map((doc: any, i: number) => (
                        <Card key={i} className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow">
                            <div className="h-32 bg-[var(--color-primary)]/5 relative">
                                <div className="absolute -bottom-10 left-6 h-20 w-20 rounded-full bg-white p-1 shadow-sm">
                                    <div className="h-full w-full rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                                        <User className="h-10 w-10" />
                                    </div>
                                </div>
                            </div>
                            <CardContent className="pt-12 pb-6 px-6">
                                <h3 className="text-lg font-bold text-[var(--color-primary)]">{doc.name}</h3>
                                <p className="text-sm font-medium text-[var(--color-accent)] mb-2">{doc.role}</p>
                                <div className="text-xs text-slate-500 space-y-1 mb-4">
                                    <p>{doc.qual}</p>
                                    <p>{doc.exp} Experience</p>
                                </div>
                                <Button className="w-full" variant="outline">View Profile</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* 5. CTA Section */}
            <section className="bg-[var(--color-primary)] py-16 text-white text-center">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold mb-4">Need Expert Medical Advice?</h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Book an appointment with our {department.title} specialists today.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white border-none">
                            Book Appointment <Calendar className="h-4 w-4 ml-2" />
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10">
                            Contact Us <Phone className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    )
}

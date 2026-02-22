import Link from "next/link"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from 'next/cache'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Section } from "@/components/layout/section"
import {
    ArrowRight, ChevronRight, Phone, Calendar,
    CheckCircle2, Star, Quote, MapPin, Clock, User
} from "lucide-react"
import { departmentsData, DEFAULT_FEATURES, DEFAULT_TESTIMONIALS } from "@/lib/data/departments"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/server"
import { BariatricContent } from "@/components/departments/bariatric"
import { CosmeticSurgeryContent } from "@/components/departments/cosmetic-surgery"
import { EmergencyContent } from "@/components/departments/emergency"
import { ENTContent } from "@/components/departments/ent"
import { GeneralMedicineContent } from "@/components/departments/general-medicine"
import { GeneralSurgeryContent } from "@/components/departments/general-surgery"
import { GynaecologyContent } from "@/components/departments/gynaecology"
import { NeurosurgeryContent } from "@/components/departments/neurosurgery"
import { OncologyContent } from "@/components/departments/oncology"
import { OrthopaedicsContent } from "@/components/departments/orthopaedics"
import { PainManagementContent } from "@/components/departments/pain-management"
import { ProctologyContent } from "@/components/departments/proctology"
import { PulmonologyContent } from "@/components/departments/pulmonology"
import { UrologyContent } from "@/components/departments/urology"
import { VascularSurgeryContent } from "@/components/departments/vascular"

export const revalidate = 0;

async function getDepartmentBlogs(departmentSlug: string) {
    const supabase = await createClient()

    // 1. Get Department ID by Slug
    const { data: deptData, error: deptErr } = await supabase
        .from("departments")
        .select("id")
        .eq("slug", departmentSlug)
        .single()

    if (deptErr && deptErr.code !== 'PGRST116') {
        console.error("Error fetching department by slug:", deptErr.message || deptErr)
    }

    if (!deptData?.id) {
        return []
    }

    // 2. Get Related Blogs
    const { data: blogs, error: blogErr } = await supabase
        .from("blogs")
        .select(`
            id, slug, title, excerpt, image_url, category, published_at,
            author:author_id (email),
            blog_departments!inner(department_id)
        `)
        .eq("blog_departments.department_id", deptData.id)
        .eq("status", "Published")
        .order("published_at", { ascending: false })
        .limit(3)

    if (blogErr) {
        console.error("Error fetching related blogs:", blogErr)
    }

    return blogs || []
}

async function getDepartmentVideos(departmentSlug: string) {
    const supabase = await createClient()

    // 1. Get Department ID by Slug
    const { data: deptData } = await supabase
        .from("departments")
        .select("id")
        .eq("slug", departmentSlug)
        .single()

    if (!deptData?.id) return []

    // 2. Get Related Videos
    const { data: videos } = await supabase
        .from("treatment_videos")
        .select(`
            *,
            video_departments!inner(department_id)
        `)
        .eq("video_departments.department_id", deptData.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false })

    return videos || []
}

export default async function DepartmentPage({
    params,
}: {
    params: Promise<{ "category-slug": string }>
}) {
    noStore();
    const resolvedParams = await params;
    const slug = resolvedParams["category-slug"];
    const department = departmentsData[slug.toLowerCase()]

    if (!department) {
        return notFound()
    }

    const Icon = department.icon
    const features = department.features ?? DEFAULT_FEATURES
    const testimonials = department.testimonials ?? DEFAULT_TESTIMONIALS

    const blogs = await getDepartmentBlogs(slug.toLowerCase())

    const s = slug.toLowerCase()
    switch (s) {
        case 'bariatric': return <BariatricContent blogs={blogs} />
        case 'cosmetic-surgery': return <CosmeticSurgeryContent blogs={blogs} />
        case 'emergency': return <EmergencyContent blogs={blogs} />
        case 'ent': return <ENTContent blogs={blogs} />
        case 'general-medicine': return <GeneralMedicineContent blogs={blogs} />
        case 'general-surgery': return <GeneralSurgeryContent blogs={blogs} />
        case 'gynaecology': return <GynaecologyContent blogs={blogs} />
        case 'neurosurgery': return <NeurosurgeryContent blogs={blogs} />
        case 'oncology': return <OncologyContent blogs={blogs} />
        case 'orthopaedics': return <OrthopaedicsContent blogs={blogs} />
        case 'pain-management': return <PainManagementContent blogs={blogs} />
        case 'proctology': return <ProctologyContent blogs={blogs} />
        case 'pulmonology': return <PulmonologyContent blogs={blogs} />
        case 'urology': return <UrologyContent blogs={blogs} />
        case 'vascular': return <VascularSurgeryContent blogs={blogs} />
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">

            {/* 1. HERO SECTION (Enterprise Standard) */}

            <section className="bg-white border-b border-slate-200 pt-32 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        {/* Breadcrumb */}
                        <nav className="flex items-center text-sm font-medium text-slate-500 mb-8">
                            <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link>
                            <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                            <Link href="/services" className="hover:text-[var(--color-accent)] transition-colors">Centers of Excellence</Link>
                            <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                            <span className="text-slate-900 font-semibold">{department.title}</span>
                        </nav>

                        <div className="flex items-start justify-between gap-12">
                            <div>
                                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
                                    {department.title}
                                </h1>
                                <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-10">
                                    {department.description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-5">
                                    <Button size="lg" className="h-14 px-10 text-base font-bold bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full shadow-xl shadow-orange-900/20 transition-all hover:-translate-y-1">
                                        Book Appointment
                                    </Button>
                                    <Button size="lg" variant="outline" className="h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-full">
                                        <Phone className="h-4 w-4 mr-2" /> Emergency: 1066
                                    </Button>
                                </div>
                            </div>

                            {/* Hero Icon/Graphic (Desktop) */}
                            <div className="hidden lg:flex h-48 w-48 rounded-3xl bg-slate-50 border border-slate-100 items-center justify-center flex-shrink-0 text-[var(--color-primary)]">
                                <Icon className="h-24 w-24 opacity-80" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. KEY SERVICES */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="mb-16 max-w-3xl">
                        <span className="text-[var(--color-accent)] font-bold tracking-wider uppercase text-xs mb-3 block">Specialized Care</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Clinical Services</h2>
                        <p className="text-lg text-slate-600 font-light">
                            Our department offers a comprehensive range of services, utilizing the latest medical advancements for accurate diagnosis and effective treatment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {department.services.map((service: any, i: number) => (
                            <div key={i} className="group p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                <div className="h-14 w-14 rounded-xl bg-slate-50 text-[var(--color-primary)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-300">
                                    <service.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                                    {service.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* 3. COMMON PROCEDURES */}
            <Section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <span className="text-[var(--color-accent)] font-bold tracking-wider uppercase text-xs mb-3 block">Treatments</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Common Procedures</h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {department.procedures.map((proc: any, i: number) => (
                            <div key={i} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                                <h3 className="text-lg font-bold text-slate-900 mb-3">{proc.title}</h3>
                                <p className="text-slate-500 mb-6 text-sm leading-relaxed min-h-[60px]">
                                    {proc.desc}
                                </p>
                                <Link href="#" className="inline-flex items-center text-sm font-bold text-[var(--color-accent)] hover:text-[#EA580C] transition-colors">
                                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* 4. DOCTORS SECTION */}
            <Section className="py-24 bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <span className="text-[var(--color-accent)] font-bold tracking-wider uppercase text-xs mb-3 block">Our Team</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Meet Our Specialists</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {department.doctors.map((doc: any, i: number) => (
                            <div key={i} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-orange-100 transition-all duration-300">
                                <div className="h-64 bg-slate-100 relative flex items-center justify-center text-slate-300">
                                    <User className="h-24 w-24" />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-[var(--color-accent)] transition-colors">{doc.name}</h3>
                                    <p className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wide mb-4">{doc.role}</p>
                                    <div className="text-sm text-slate-500 space-y-1 mb-8">
                                        <p>{doc.qual}</p>
                                        <p>{doc.exp} Experience</p>
                                    </div>
                                    <Button className="w-full h-12 rounded-lg bg-white border border-slate-200 text-slate-900 font-bold hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all">
                                        Book Appointment
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* 4.5 RELATED SECION BLOGS */}
            {blogs.length > 0 && (
                <Section className="py-24 bg-white border-t border-slate-200">
                    <div className="container max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                            <div>
                                <h2 className="text-3xl font-bold text-[#0f172a] mb-2">Related Articles</h2>
                                <p className="text-slate-600">Latest insights and information about {department.title}</p>
                            </div>
                            <Link href="/blog" className="text-[#3e7dca] font-semibold flex items-center gap-2 hover:text-[#2e62a3] transition-colors shrink-0">
                                View Full Blog <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full">
                                    <div className="bg-slate-50 rounded-2xl h-full flex flex-col border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                                        <div className="relative h-48 w-full bg-slate-100">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={post.image_url || '/images/blog-placeholder.jpg'}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {post.category && (
                                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#3e7dca] rounded-md shadow-sm">
                                                    {post.category}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#3e7dca] transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-auto pt-4 border-t border-slate-100">
                                                <span className="text-sm font-semibold text-[#ff8202] flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Read Article <ArrowRight className="h-4 w-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            {/* 4.75 FAQ SECTION (Render only if FAQs exist) */}
            {department.faqs && (
                <Section className="py-24 bg-slate-50 border-t border-slate-200">
                    <div className="container max-w-4xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="text-[var(--color-accent)] font-bold tracking-wider uppercase text-xs mb-3 block">Common Questions</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
                        </div>

                        <div className="space-y-6">
                            {department.faqs.map((faq: any, i: number) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all">
                                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-start">
                                        <span className="text-[var(--color-primary)] mr-3 opacity-50">Q.</span>
                                        {faq.q}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed pl-8 border-l-2 border-slate-100 ml-1">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            {/* 5. FOOTER CTA */}
            <section className="bg-[var(--color-primary)] py-24 text-center">
                <div className="container max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                        Ready to Schedule Your Visit?
                    </h2>
                    <p className="text-xl text-slate-300 mb-12 font-light max-w-2xl mx-auto">
                        Our experts are here to provide the best care. Book an appointment online or call us for assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button size="lg" className="h-16 px-12 text-lg font-bold bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full shadow-2xl shadow-orange-900/40">
                            Book Appointment
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold border-white/20 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent">
                            Call 1066
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

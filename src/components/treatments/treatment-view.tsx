"use client"

import { useTreatmentRealtime } from "@/hooks/useTreatmentRealtime"
import { Section } from "@/components/layout/section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, PlayCircle } from "lucide-react"
import Link from "next/link"
import { Treatment } from "@/types"

export default function TreatmentView({ initialData }: { initialData: Treatment }) {
    const treatment = useTreatmentRealtime(initialData)

    if (!treatment) return <div>Loading...</div>

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Breadcrumb & Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <nav className="flex items-center text-sm text-slate-500 mb-4">
                        <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <Link href="/#treatments" className="hover:text-[var(--color-primary)] transition-colors">Treatments</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <span className="font-medium text-[var(--color-primary)]">{treatment.title}</span>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-2">{treatment.title}</h1>
                    <p className="text-slate-600 text-lg max-w-2xl">{treatment.summary}</p>
                </div>
            </div>

            <Section>
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Video Section - Real-time updated */}
                        {treatment.videoId && (
                            <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-lg relative group">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${treatment.videoId}`}
                                    title={treatment.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0"
                                ></iframe>
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-slate max-w-none">
                            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">Overview</h2>
                            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">{treatment.content}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <Card className="bg-[var(--color-primary)] text-white border-none shadow-xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <CardContent className="p-8 relative z-10">
                                <h3 className="text-xl font-bold mb-2">Need a Consultation?</h3>
                                <p className="text-blue-100 mb-6">Book an appointment with our specialists today.</p>
                                <Button variant="secondary" className="w-full bg-white text-[var(--color-primary)] hover:bg-blue-50">
                                    Book Appointment
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Section>
        </div>
    )
}

"use client"

import { useBlogRealtime } from "@/hooks/useBlogRealtime"
import { Section } from "@/components/layout/section"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogList({ initialData }: { initialData: any[] }) {
    const posts = useBlogRealtime(initialData)

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-[var(--color-primary)] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Health Insights & News</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Expert advice, medical breakthroughs, and wellness tips from the specialists at Stork Hospital.
                    </p>
                </div>
            </section>

            {/* Blog Grid - Live Updates */}
            <Section>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <Link key={post.slug + index} href={`/blog/${post.slug}`} className="group h-full">
                            <Card className="h-full flex flex-col border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="relative h-48 w-full bg-slate-200 rounded-t-xl overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] rounded-md shadow-sm">
                                        {post.category}
                                    </div>
                                </div>
                                <CardContent className="flex-1 p-6">
                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 mt-auto">
                                    <span className="text-sm font-semibold text-[var(--color-accent)] flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read Article <ArrowRight className="h-4 w-4" />
                                    </span>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Section>
        </div>
    )
}

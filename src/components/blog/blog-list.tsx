"use client"

import React from "react"
import { useBlogRealtime } from "@/hooks/useBlogRealtime"
import { Section } from "@/components/layout/section"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { BlogPost } from "@/types"

export default function BlogList({ initialData }: { initialData: BlogPost[] }) {
    const posts = useBlogRealtime(initialData)
    const [selectedCategory, setSelectedCategory] = React.useState("All")

    const categories = ["All", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))] as string[]

    const filteredPosts = selectedCategory === "All"
        ? posts
        : posts.filter(p => p.category === selectedCategory)

    const featuredPost = posts[0]
    const remainingPosts = filteredPosts.filter(p => p.id !== (selectedCategory === "All" ? featuredPost?.id : null))

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-white pt-24 pb-16 border-b border-slate-100">
                <div className="container mx-auto px-4 md:px-6 text-center lg:text-left">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                            Health <span className="text-[var(--color-primary)]">Insights</span> & News
                        </h1>
                        <div className="w-20 h-1.5 bg-[var(--color-accent)] mb-8 hidden lg:block rounded-full"></div>
                        <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
                            Expert medical advice, breakthroughs, and wellness tips from the specialists at Stork Hospital.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Article Section */}
            {selectedCategory === "All" && featuredPost && (
                <section className="py-16 bg-slate-50/50">
                    <div className="container mx-auto px-4 md:px-6">
                        <Link href={`/blog/${featuredPost.slug}`} className="group">
                            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col lg:flex-row transition-all duration-500 hover:shadow-2xl">
                                <div className="lg:w-3/5 relative aspect-video lg:aspect-auto overflow-hidden">
                                    <Image
                                        src={featuredPost.image || featuredPost.image_url || '/images/blog-placeholder.jpg'}
                                        alt={featuredPost.title}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute top-6 left-6 z-20">
                                        <span className="bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                            Featured Story
                                        </span>
                                    </div>
                                </div>
                                <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white">
                                    <span className="text-[var(--color-accent)] font-bold text-sm uppercase tracking-widest mb-4">
                                        {featuredPost.category}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-slate-600 text-lg mb-8 line-clamp-3 leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">{featuredPost.author}</div>
                                            <div className="text-xs text-slate-500">{featuredPost.date}</div>
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <span className="inline-flex items-center text-[var(--color-primary)] font-bold gap-2 group-hover:gap-4 transition-all uppercase tracking-widest text-sm">
                                            Read Full Article <ArrowRight className="w-5 h-5" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Category Filter & Blog Grid */}
            <Section className="py-16">
                {/* Category Filter */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2",
                                selectedCategory === cat
                                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg shadow-orange-100"
                                    : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {remainingPosts.map((post, index) => (
                        <Link key={post.slug + index} href={`/blog/${post.slug}`} className="group h-full">
                            <Card className="h-full flex flex-col border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl overflow-hidden bg-white">
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={post.image || post.image_url || '/images/blog-placeholder.jpg'}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-primary)] shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <CardContent className="flex-1 p-8">
                                    <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-5">
                                        <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span>5 MIN READ</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 mt-auto pt-6 border-t border-slate-50">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{post.author}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {remainingPosts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 italic">No more articles found in this category.</p>
                    </div>
                )}
            </Section>
        </div>
    )
}

"use client"

import { useBlogRealtime } from "@/hooks/useBlogRealtime"
import { Section } from "@/components/layout/section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Calendar, User, Tag, Activity } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { VideoSection } from "@/components/treatments/video-section"
import { extractYoutubeId, generateEmbedUrl, generateThumbnailUrl } from "@/lib/youtube-utils"
import { BlogPost } from "@/types"

export default function BlogView({ initialData }: { initialData: BlogPost }) {
    const post = useBlogRealtime(initialData) as BlogPost

    if (!post) return <div>Loading...</div>

    // Prepare video data if youtube_url exists
    const videoId = post.youtube_url ? extractYoutubeId(post.youtube_url) : null
    const video = videoId ? {
        id: videoId,
        title: post.title,
        youtube_embed_url: generateEmbedUrl(videoId),
        thumbnail_url: generateThumbnailUrl(videoId),
        created_at: post.created_at
    } : null

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header / Meta Section */}
            <div className="bg-white pt-24 pb-12">
                <div className="container mx-auto px-4 md:px-6 max-w-[760px]">
                    <Link href="/blog" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-[var(--color-primary)] transition-colors mb-12 uppercase tracking-[0.2em]">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Insights
                    </Link>

                    <div className="space-y-8">
                        <div className="inline-block">
                            <span className="px-4 py-1.5 rounded-full bg-orange-50 text-[var(--color-primary)] text-[10px] font-black tracking-[0.2em] uppercase border border-orange-100">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-[52px] font-bold text-slate-900 leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>

                        {/* Author Info */}
                        <div className="flex items-center gap-5 pt-4 pb-8 border-b border-slate-100">
                            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden border-2 border-white shadow-sm">
                                <User className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="text-lg font-bold text-slate-900 leading-tight">{post.author}</div>
                                <div className="text-sm text-slate-500 font-medium">Stork Specialist • {post.date}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="container mx-auto px-4 md:px-6 max-w-[1000px] mb-16">
                <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                        src={post.image || '/images/blog-default.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative container mx-auto px-4 md:px-6 max-w-[1100px] flex flex-col lg:flex-row gap-12">
                {/* Sticky Share (Desktop) */}
                <aside className="hidden lg:block w-12 sticky top-32 h-fit">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-black text-slate-300 uppercase vertical-text tracking-widest mb-4">Share</span>
                        {[Share2, User, Share2].map((Icon, i) => (
                            <button key={i} className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all transform hover:scale-110 shadow-sm">
                                <Icon className="w-4 h-4" />
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Article Text */}
                <article className="max-w-[760px] mx-auto lg:mx-0 flex-1">
                    {/* Key Highlights Block */}
                    {post.excerpt && (
                        <div className="mb-12 p-8 bg-slate-50 rounded-2xl border-l-[6px] border-[var(--color-accent)] shadow-sm">
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-[var(--color-primary)]" /> Key Highlights
                            </h4>
                            <p className="text-lg text-slate-700 leading-relaxed font-semibold italic">
                                {post.excerpt}
                            </p>
                        </div>
                    )}

                    <div className="prose prose-lg max-w-none prose-slate
                        prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-[17px] prose-p:leading-[1.85] prose-p:text-slate-600 prose-p:mb-8
                        prose-li:text-[17px] prose-li:text-slate-600
                        prose-strong:text-slate-900
                        prose-img:rounded-2xl prose-img:shadow-lg">

                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    {/* Video Section */}
                    {video && (
                        <div className="mt-16 pt-16 border-t border-slate-100">
                            <VideoSection
                                videos={[video]}
                                heading="Watch & Learn"
                                variant="grid"
                            />
                        </div>
                    )}

                    {/* Footer Tags & Share (Mobile Only) */}
                    <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-wrap gap-2">
                            {["Medical Advice", "Specialist Care", "Health Tips"].map(tag => (
                                <span key={tag} className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-500 rounded-full text-[11px] font-bold uppercase tracking-wider border border-slate-100">
                                    <Tag className="h-3 w-3" /> {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex lg:hidden gap-3">
                            <Button variant="outline" size="sm" className="gap-2 rounded-full px-6 font-bold uppercase text-[10px] tracking-widest">
                                <Share2 className="h-4 w-4" /> Share
                            </Button>
                        </div>
                    </div>
                </article>
            </div>

            {/* Related Articles Section */}
            <section className="bg-slate-50 py-24 mt-20">
                <div className="container mx-auto px-4 md:px-6 max-w-[1100px]">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                        <div className="space-y-4">
                            <span className="text-[var(--color-accent)] font-black uppercase tracking-[0.3em] text-xs">More to Explore</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Related <span className="text-[var(--color-primary)]">Insights</span></h2>
                        </div>
                        <Button asChild variant="outline" className="rounded-full px-8 font-bold border-2 hover:bg-[var(--color-primary)] hover:text-white transition-all">
                            <Link href="/blog">View All Articles</Link>
                        </Button>
                    </div>

                    {/* Just reuse the card logic here but with dummy/filtered data for now */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* 3 Related Cards would go here */}
                        <div className="text-slate-400 italic text-sm">Suggested articles loading...</div>
                    </div>
                </div>
            </section>
        </div>
    )
}

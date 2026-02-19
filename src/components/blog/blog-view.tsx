"use client"

import { useBlogRealtime } from "@/hooks/useBlogRealtime"
import { Section } from "@/components/layout/section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Calendar, User, Tag } from "lucide-react"
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
            {/* Hero Header */}
            <div className="bg-slate-50 border-b border-slate-100 py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center space-y-6">
                    <Link href="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[var(--color-primary)] transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
                    </Link>
                    <div className="flex items-center justify-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase">
                            {post.category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-slate-500 text-sm">
                        <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {post.date}</span>
                        <span className="flex items-center gap-2"><User className="h-4 w-4" /> {post.author}</span>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="container mx-auto px-4 md:px-6 max-w-5xl -mt-8 relative z-10">
                <div className="relative aspect-[2/1] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                    <Image src={post.image || '/images/blog-default.jpg'} alt={post.title} fill className="object-cover" priority />
                </div>
            </div>

            {/* Content */}
            <Section className="py-12 md:py-20">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-slate first-letter:text-3xl first-letter:font-bold first-letter:text-[var(--color-primary)]">
                        <p className="lead text-xl text-slate-600 mb-8 font-medium border-l-4 border-[var(--color-accent)] pl-4">
                            {post.excerpt}
                        </p>

                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        {/* Note: In production, sanitize this content or use a markdown renderer */}
                    </div>

                    {/* Video Section */}
                    {video && (
                        <div className="mt-12 -mx-6 md:-mx-12">
                            <VideoSection
                                videos={[video]}
                                heading="Watch Video"
                                variant="grid"
                            />
                        </div>
                    )}

                    {/* Tags & Share */}
                    <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex gap-2">
                            {["Health", "Heart", "Wellness"].map(tag => (
                                <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                                    <Tag className="h-3 w-3" /> {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2 rounded-full">
                                <Share2 className="h-4 w-4" /> Share Article
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}

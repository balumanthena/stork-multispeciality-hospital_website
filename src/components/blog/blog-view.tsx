"use client"

import React, { useEffect, useState, useRef } from "react"
import { useBlogRealtime } from "@/hooks/useBlogRealtime"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Calendar, User, Tag, Activity, ArrowRight, Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { VideoSection } from "@/components/treatments/video-section"
import { extractYoutubeId, generateEmbedUrl, generateThumbnailUrl } from "@/lib/youtube-utils"
import { BlogPost } from "@/types"
import { BlogFAQ } from "./blog-faq"
import { motion, useScroll, useSpring } from "framer-motion"

// Helper to calculate reading time
function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const words = text.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

export default function BlogView({ initialData }: { initialData: BlogPost }) {
    const post = useBlogRealtime(initialData) as BlogPost
    const [activeSection, setActiveSection] = useState<string>("")
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
    const contentRef = useRef<HTMLDivElement>(null)
    const [copied, setCopied] = useState(false)

    // Removed Scroll Progress logic based on user request

    // Parse headings for TOC
    useEffect(() => {
        if (!post.enable_toc || !contentRef.current) return;
        
        // Find all H2 and H3 tags inside the content area
        const elements = contentRef.current.querySelectorAll("h2, h3");
        const parsedHeadings: { id: string; text: string; level: number }[] = [];
        
        elements.forEach((el, index) => {
            const text = el.textContent || "";
            // Create a safe ID if it doesn't have one
            const id = el.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `section-${index}`;
            el.id = id;
            
            parsedHeadings.push({
                id,
                text,
                level: el.tagName === "H2" ? 2 : 3
            });
        });
        
        setHeadings(parsedHeadings);

        // Intersection Observer for Scroll Spy
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [post.content, post.enable_toc]);

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const title = post.title;
        
        if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        if (platform === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!post) return <div>Loading...</div>

    const readingTime = calculateReadingTime(post.content || "");
    const videoId = post.youtube_url ? extractYoutubeId(post.youtube_url) : null
    const video = videoId ? {
        id: videoId,
        title: post.title,
        youtube_embed_url: generateEmbedUrl(videoId),
        thumbnail_url: generateThumbnailUrl(videoId),
        created_at: post.created_at
    } : null

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 relative">
            {/* SEO Schema */}
            {post.enable_faq && post.faq_data && post.faq_data.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": post.faq_data.map((faq: any) => ({
                                "@type": "Question",
                                "name": faq.question,
                                "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
                            }))
                        })
                    }}
                />
            )}
            
            {/* Header / Meta Section */}
            <header className="bg-white pt-24 pb-12 border-b border-slate-200 shadow-sm relative z-10">
                <div className="container mx-auto px-6 max-w-[760px]">
                    <Link href="/insights/articles" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors mb-10">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Articles
                    </Link>

                    <div className="space-y-6">
                        <div className="inline-block">
                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                                {post.category || "Healthcare Insight"}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Author Row */}
                        <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-100">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden border border-slate-200">
                                <User className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <div className="text-base font-bold text-slate-900">{post.author}</div>
                                <div className="text-sm text-slate-500 flex items-center gap-2">
                                    <span>{post.date}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                    <span>{readingTime} min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="container mx-auto px-4 md:px-6 max-w-[1000px] mt-12 mb-16">
                <div className="relative aspect-[2/1] w-full rounded-xl overflow-hidden shadow-lg border border-slate-200/60 bg-white">
                    <Image
                        src={post.image || '/images/blog-default.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Layout: Sidebar + Main Content */}
            <div className="container mx-auto px-4 md:px-6 max-w-[1100px] flex flex-col lg:flex-row gap-12 relative pb-24">
                
                {/* Left Floating Sidebar */}
                <aside className="hidden lg:block w-[240px] shrink-0 relative">
                    <div className="sticky top-32 space-y-10">
                        
                        {/* Share Actions */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Share Article</h4>
                            <div className="flex gap-2">
                                <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors shadow-sm bg-white">
                                    <Twitter className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleShare('linkedin')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors shadow-sm bg-white">
                                    <Linkedin className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors shadow-sm bg-white">
                                    <Facebook className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleShare('copy')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-colors shadow-sm bg-white" title="Copy Link">
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Table of Contents */}
                        {post.enable_toc && headings.length > 0 && (
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4 border-b border-slate-100 pb-3">Contents</h4>
                                <nav className="flex flex-col gap-2.5">
                                    {headings.map((heading) => (
                                        <a
                                            key={heading.id}
                                            href={`#${heading.id}`}
                                            className={`text-sm leading-tight transition-colors ${
                                                activeSection === heading.id 
                                                ? 'text-orange-600 font-bold' 
                                                : 'text-slate-500 hover:text-slate-900'
                                            } ${heading.level === 3 ? 'pl-4 border-l-2 border-slate-100' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }}
                                        >
                                            {heading.text}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Article Text */}
                <article className="max-w-[760px] w-full mx-auto lg:mx-0 flex-1 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200/60" ref={contentRef}>
                    <div className="prose prose-lg max-w-none 
                        prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                        prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                        prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3 prose-h4:font-semibold
                        prose-h5:text-lg prose-h5:mt-6 prose-h5:mb-2
                        prose-h6:text-base prose-h6:mt-6 prose-h6:mb-2
                        prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-lg
                        prose-li:text-slate-700 prose-li:leading-[1.8]
                        prose-a:text-orange-600 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-orange-800
                        prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50/50 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-slate-700 prose-blockquote:text-xl
                        prose-img:rounded-xl prose-img:shadow-md prose-img:my-10 prose-img:border prose-img:border-slate-100
                        prose-hr:my-12 prose-hr:border-slate-200">
                        
                        {/* Render content directly. Shortcodes are stripped. */}
                        <div dangerouslySetInnerHTML={{ 
                            __html: (post.content || "").replace(/<p>\s*\[(toc|faq_section|cta_button)\]\s*<\/p>|\[(toc|faq_section|cta_button)\]/gi, '') 
                        }} />
                    </div>

                    {/* FAQ Section */}
                    {post.enable_faq && post.faq_data && post.faq_data.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-slate-200">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                            <BlogFAQ faqs={post.faq_data} />
                        </div>
                    )}

                    {/* Video Section */}
                    {video && (
                        <div className="mt-16 pt-12 border-t border-slate-200">
                            <VideoSection
                                videos={[video]}
                                heading="Watch & Learn"
                                variant="grid"
                            />
                        </div>
                    )}

                    {/* Inline CTA */}
                    {post.enable_sticky_cta && (
                        <div className="mt-16 pt-12 border-t border-slate-200">
                            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to consult a specialist?</h3>
                                    <p className="text-slate-600">Take the next step in your healthcare journey with our expert team.</p>
                                </div>
                                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 py-6 text-lg shadow-md w-full md:w-auto whitespace-nowrap">
                                    <Link href={post.sticky_cta_link || "/appointments"}>
                                        {post.sticky_cta_text || "Book Appointment"} <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </article>
            </div>
        </div>
    )
}

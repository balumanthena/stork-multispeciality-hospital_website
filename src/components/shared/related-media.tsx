"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Video, PlayCircle, Loader2, X } from "lucide-react"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

function getYouTubeId(url: string) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
}

interface RelatedMediaProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blogs?: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    videos?: any[]
}

export function RelatedMedia({ blogs = [], videos = [] }: RelatedMediaProps) {
    const [isOpen, setIsOpen] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [activeVideo, setActiveVideo] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    if (!blogs.length && !videos.length) return null

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleVideoClick = (video: any, e: React.MouseEvent) => {
        e.preventDefault()
        setActiveVideo(video)
        setIsLoading(true)
        setIsOpen(true)
    }

    return (
        <Section className="py-24 bg-white border-t border-slate-200">
            <div className="container max-w-7xl mx-auto px-6">

                {/* VIDEOS SECTION */}
                {videos && videos.length > 0 && (
                    <div className="mb-20 last:mb-0">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-3 flex items-center gap-2">
                                    <Video className="w-4 h-4" /> Watch & Learn
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Videos</h2>
                            </div>
                            <Link href="/videos">
                                <Button variant="ghost" className="hidden sm:flex items-center text-[#3E7DCA] hover:text-[#2d62a3] hover:bg-blue-50">
                                    View Video Gallery <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {videos.slice(0, 3).map((video) => {
                                const videoId = getYouTubeId(video.youtube_url || "");
                                return (
                                <div key={video.id} className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={(e) => handleVideoClick(video, e)}>
                                    <div className="aspect-video relative overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={video.thumbnail_url || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "/images/video-placeholder.jpg")}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                                            <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-lg" />
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col justify-between items-start bg-slate-900 border-t border-white/10 relative z-10 w-full">
                                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-snug">
                                            {video.title}
                                        </h3>
                                        {/* Modal trigger */}
                                        <button className="text-sm font-semibold text-[#FF8202] flex items-center gap-1 group-hover:gap-2 transition-all mt-2">
                                            Watch Video <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            )})}
                        </div>
                        
                        {/* Video Modal */}
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogContent className="sm:max-w-4xl p-0 bg-black border-none overflow-hidden aspect-video">
                                <VisuallyHidden>
                                    <DialogTitle>{activeVideo?.title || "Video Player"}</DialogTitle>
                                </VisuallyHidden>
                                {activeVideo && (
                                    <div className="w-full h-full relative bg-black">
                                        {/* Action Bar / Floating Close Button */}
                                        <div className="absolute top-4 right-4 z-50">
                                            <button 
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-2 text-white bg-black/60 hover:bg-black/90 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md transition-all border border-white/20 shadow-2xl"
                                            >
                                                <X className="w-4 h-4" strokeWidth={3} /> Close
                                            </button>
                                        </div>

                                        {isLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center z-0">
                                                <Loader2 className="w-10 h-10 text-white/20 animate-spin" />
                                            </div>
                                        )}
                                        <iframe
                                            src={getYouTubeId(activeVideo.youtube_url || "") ? `https://www.youtube.com/embed/${getYouTubeId(activeVideo.youtube_url || "")}?autoplay=1&rel=0` : activeVideo.youtube_embed_url}
                                            title={activeVideo.title}
                                            className="w-full h-full absolute inset-0 z-10"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            onLoad={() => setIsLoading(false)}
                                        />
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                )}

                {/* BLOGS SECTION */}
                {blogs && blogs.length > 0 && (
                    <div className="last:mb-0">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-3 block">Expert Insights</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Related Articles</h2>
                            </div>
                            <Link href="/blog">
                                <Button variant="ghost" className="hidden sm:flex items-center text-[#3E7DCA] hover:text-[#2d62a3] hover:bg-blue-50">
                                    View Full Blog <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.slice(0, 3).map((blog) => (
                                <Link href={`/blog/${blog.slug}`} key={blog.id} className="group flex flex-col h-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-[16/10] relative overflow-hidden bg-slate-200">
                                        {blog.image_url ? (
                                            <Image src={blog.image_url} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                                <span>No image</span>
                                            </div>
                                        )}
                                        {blog.category && (
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#3E7DCA] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                                                    {blog.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                            {blog.published_at && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(blog.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#3E7DCA] transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                                            {blog.excerpt}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-slate-100">
                                            <span className="text-sm font-semibold text-[#FF8202] flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read Article <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </Section>
    )
}

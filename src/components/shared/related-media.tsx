import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Video, PlayCircle } from "lucide-react"

interface RelatedMediaProps {
    blogs?: any[]
    videos?: any[]
}

export function RelatedMedia({ blogs = [], videos = [] }: RelatedMediaProps) {
    if (!blogs.length && !videos.length) return null

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
                            {videos.slice(0, 3).map((video) => (
                                <div key={video.id} className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-video relative overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_url?.split('v=')[1]?.substring(0, 11)}/maxresdefault.jpg`}
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
                                        {/* Modal trigger mapped in parent if needed, or link appropriately */}
                                        <a href={video.youtube_url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#FF8202] flex items-center gap-1 group-hover:gap-2 transition-all mt-2">
                                            Watch on YouTube <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
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


'use client'

import { useState } from "react"
import { Play, Loader2, Video as VideoIcon, MoreVertical } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { cn } from "@/lib/utils"

interface Video {
    id: string
    title: string
    youtube_embed_url: string
    thumbnail_url: string
}

interface VideoSectionProps {
    videos: Video[]
    heading?: string
    variant?: "grid" | "featured" // Simplified variants
}

export function VideoSection({ videos, heading = "Doctor Talk", variant = "grid" }: VideoSectionProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeVideo, setActiveVideo] = useState<Video | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    if (!videos || videos.length === 0) return null

    const handleVideoClick = (video: Video) => {
        setActiveVideo(video)
        setIsLoading(true)
        setIsOpen(true)
    }

    return (
        <section className="py-12 bg-white">
            <div className="container max-w-6xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-serif">
                        {heading}
                    </h2>
                    <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full opacity-80" />
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="group cursor-pointer flex flex-col gap-4"
                            onClick={() => handleVideoClick(video)}
                        >
                            {/* Thumbnail Card */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-100 group-hover:shadow-xl transition-all duration-300">
                                <img
                                    src={video.thumbnail_url || "/images/video-placeholder.jpg"}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                                {/* Top Bar (Logo & Menu) */}
                                <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                                    <div className="bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-slate-900 shadow-sm">
                                        STORK
                                    </div>
                                    <div className="text-white/80 hover:text-white transition-colors">
                                        <MoreVertical className="w-5 h-5 drop-shadow-md" />
                                    </div>
                                </div>

                                {/* Center Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="w-14 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-2xl group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300">
                                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                                    </div>
                                </div>

                                {/* Duration Badge (Mock) */}
                                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                    Watch
                                </div>
                            </div>

                            {/* Video Title */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#3e7dca] transition-colors">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-slate-500 mt-2 font-medium line-clamp-1">
                                    Explanation by Specialist
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Single Dialog for Player */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="sm:max-w-4xl p-0 bg-black border-none overflow-hidden aspect-video">
                        <VisuallyHidden>
                            <DialogTitle>{activeVideo?.title || "Video Player"}</DialogTitle>
                        </VisuallyHidden>
                        {activeVideo && (
                            <div className="w-full h-full relative bg-black">
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center z-0">
                                        <Loader2 className="w-10 h-10 text-white/20 animate-spin" />
                                    </div>
                                )}
                                <iframe
                                    src={`${activeVideo.youtube_embed_url}?autoplay=1&rel=0`}
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

                {/* Schema Markup for ALL videos */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(videos.map(video => ({
                            "@context": "https://schema.org",
                            "@type": "VideoObject",
                            "name": video.title,
                            "thumbnailUrl": video.thumbnail_url,
                            "embedUrl": video.youtube_embed_url,
                            "uploadDate": new Date().toISOString(),
                            "description": `Watch a video about ${video.title} at Stork Hospital.`
                        })))
                    }}
                />
            </div>
        </section>
    )
}

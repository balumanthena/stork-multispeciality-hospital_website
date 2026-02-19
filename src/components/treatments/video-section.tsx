'use client'

import { useState } from "react"
import { Play, Loader2, Video as VideoIcon } from "lucide-react"
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
    variant?: "full" | "compact"
}

export function VideoSection({ videos, variant = "full" }: VideoSectionProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeVideo, setActiveVideo] = useState<Video | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    if (!videos || videos.length === 0) return null

    // For now, we'll feature the first video.
    const featuredVideo = videos[0]

    const VideoThumbnailBody = () => (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div
                        className={cn(
                            "relative overflow-hidden cursor-pointer group shadow-2xl shadow-slate-200/50 border border-slate-100",
                            variant === "full" ? "aspect-video rounded-3xl" : "aspect-video rounded-2xl w-full"
                        )}
                        onClick={() => {
                            setActiveVideo(featuredVideo)
                            setIsLoading(true)
                        }}
                    >
                        {/* Thumbnail */}
                        <img
                            src={featuredVideo.thumbnail_url || "/images/video-placeholder.jpg"}
                            alt={featuredVideo.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors" />

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={cn(
                                "bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300",
                                variant === "full" ? "w-20 h-20" : "w-16 h-16"
                            )}>
                                <Play className={cn(
                                    "text-orange-500 fill-current ml-1",
                                    variant === "full" ? "w-8 h-8" : "w-6 h-6"
                                )} />
                            </div>
                        </div>

                        {/* Duration or Label (Optional) */}
                        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-md">
                            Watch Video
                        </div>
                    </div>
                </DialogTrigger>

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

            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "VideoObject",
                        "name": featuredVideo.title,
                        "thumbnailUrl": featuredVideo.thumbnail_url,
                        "embedUrl": featuredVideo.youtube_embed_url,
                        "uploadDate": new Date().toISOString(),
                        "description": `Watch a video about ${featuredVideo.title} at Stork Hospital.`
                    })
                }}
            />
        </>
    )

    if (variant === "compact") {
        return (
            <div className="my-10 bg-slate-50 border border-slate-100 rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                        <VideoIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Watch: Procedure Overview</h3>
                </div>
                <VideoThumbnailBody />
                <div className="mt-4">
                    <h4 className="font-semibold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">
                        {featuredVideo.title}
                    </h4>
                </div>
            </div>
        )
    }

    // Default Full Width Variant
    return (
        <section className="py-12 bg-white border-t border-slate-100 ml-5 mr-5 rounded-2xl md:ml-0 md:mr-0 md:rounded-none">
            <div className="container max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-8 items-center">

                    {/* Text Side */}
                    <div className="md:w-1/3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            <Play className="w-3 h-3 fill-current" />
                            Watch Video
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            Learn More About This Treatment
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Watch our experts explain the procedure, benefits, and what to expect during your recovery.
                        </p>
                    </div>

                    {/* Video Card Side */}
                    <div className="md:w-2/3 w-full">
                        <VideoThumbnailBody />
                        {/* Video Title Meta */}
                        <div className="mt-4 hidden md:block">
                            <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                                {featuredVideo.title}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

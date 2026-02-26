import Image from "next/image";
import { PlayCircle, Calendar } from "lucide-react";
import { getRecentYouTubeVideos } from "@/lib/youtube";

export async function VideoScrollSection() {
    // Fetch latest 6 videos, using a placeholder channel ID or your actual ID
    const videos = await getRecentYouTubeVideos("UC_x5XG1OV2P6uZZ5FSM9Ttw", 6);

    if (!videos || videos.length === 0) return null;

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6 mb-8">
                <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900 mb-1">
                    Recent Videos
                </h2>
                <p className="text-slate-500 text-sm">
                    Watch our latest medical insights and health tips.
                </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="w-full relative px-6 md:px-0">
                <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-8 md:px-6 xl:px-[calc((100vw-80rem)/2)]">
                    {/* Padding compensator for proper centering logic on large screens */}
                    {videos.map((video) => (
                        <a
                            key={video.id}
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex-shrink-0 w-[280px] sm:w-[320px] snap-start bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                            <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                                <Image
                                    src={video.thumbnailUrl || "/images/placeholder-video.png"}
                                    alt={video.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/90 text-[var(--color-primary)] rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 group-hover:bg-white transition-all">
                                        <PlayCircle className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                                    <PlayCircle className="w-3 h-3 text-red-500 fill-red-500" />
                                    VIDEO
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-semibold text-[15px] text-slate-900 line-clamp-2 leading-[1.3] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                                    {video.title}
                                </h3>
                                <div className="flex items-center gap-1.5 text-slate-500 text-[12px] font-medium">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>
                                        {new Date(video.publishedAt).toLocaleDateString("en-US", {
                                            month: "short", day: "numeric", year: "numeric"
                                        })}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

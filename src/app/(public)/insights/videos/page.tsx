import { createClient } from "@/lib/supabase/server"
import { VideoSection } from "@/components/treatments/video-section"
import { Section } from "@/components/layout/section"
import { Video } from "lucide-react"

export const revalidate = 0

export default async function VideoGalleryPage() {
    const supabase = await createClient()

    const { data: videos, error } = await supabase
        .from('treatment_videos')
        .select('*')
        .eq('is_active', true)
        .eq('show_global', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching videos for gallery:", error)
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 pt-24 pb-12">
            <Section className="bg-white border-b border-slate-100 py-16">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-500">
                            <Video className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">
                            Health & Wellness <span className="text-orange-500">Video Gallery</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            Watch explainers, doctor talks, and insights from our specialists at Stork Multispecialty Hospital.
                            Understand procedures and healthcare tips directly from the experts.
                        </p>
                    </div>
                </div>
            </Section>

            <div className="container max-w-7xl mx-auto px-6 py-12">
                {videos && videos.length > 0 ? (
                    <VideoSection
                        videos={videos}
                        heading="Expert Perspectives"
                    />
                ) : (
                    <div className="py-24 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Video className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-medium text-slate-900">No videos found</h3>
                        <p className="text-slate-500">Check back later for more informative videos.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

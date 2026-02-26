export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
}

export async function getRecentYouTubeVideos(channelId: string, maxResults: number = 3): Promise<YouTubeVideo[]> {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE" || apiKey === '"YOUR_API_KEY_HERE"' || !channelId) {
        console.warn("YouTube API key or Channel ID is missing/placeholder. Skipping fetch.");
        return [];
    }

    try {
        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`,
            { next: { revalidate: 600 } } // revalidate every 10 minutes
        );

        if (!res.ok) {
            throw new Error(`YouTube API error: ${res.statusText}`);
        }

        const data = await res.json();

        return data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || "",
            publishedAt: item.snippet.publishedAt,
        }));
    } catch (error: any) {
        console.warn("Skipping YouTube videos fetch:", error.message || error);
        return [];
    }
}

/**
 * Extracts the YouTube Video ID from various URL formats.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYoutubeId(url: string): string | null {
    if (!url) return null;

    try {
        const parsed = new URL(url)

        // 1️⃣ Standard watch URL
        if (parsed.searchParams.get("v")) {
            return parsed.searchParams.get("v")
        }

        // 2️⃣ Shortened URL
        if (parsed.hostname.includes("youtu.be")) {
            return parsed.pathname.replace("/", "")
        }

        // 3️⃣ Shorts URL
        if (parsed.pathname.includes("/shorts/")) {
            return parsed.pathname.split("/shorts/")[1].split("?")[0]
        }

        // 4️⃣ Embedded URL
        if (parsed.pathname.includes("/embed/")) {
            return parsed.pathname.split("/embed/")[1]
        }

        return null
    } catch {
        // Fallback for invalid URLs or raw IDs
        if (url.length === 11 && !url.includes("/") && !url.includes(".")) {
            return url;
        }
        return null
    }
}

/**
 * Generates the embed URL for a given video ID.
 */
export function generateEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Generates the high-quality thumbnail URL for a given video ID.
 * Falls back to hqdefault if maxresdefault is not available (though we return maxres here).
 */
export function generateThumbnailUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Validates if the string is a valid YouTube URL
 */
export function isValidYoutubeUrl(url: string): boolean {
    return !!extractYoutubeId(url);
}

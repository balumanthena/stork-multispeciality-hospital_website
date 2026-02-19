/**
 * Extracts the YouTube Video ID from various URL formats.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYoutubeId(url: string): string | null {
    if (!url) return null;

    // Regex for YouTube ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
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

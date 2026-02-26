import { createClient } from "@supabase/supabase-js";

// Initialize Subabase client (Server-side appropriate)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image_url: string;
    created_at: string;
    slug: string;
}

export async function getLatestBlogs(limit: number = 3): Promise<BlogPost[]> {
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Supabase credentials missing, returning empty blogs.");
        return [];
    }

    try {
        // Option B: Fetching from Supabase 'blogs' table
        const { data, error } = await supabase
            .from("blogs")
            .select("id, title, excerpt, image_url, created_at, slug")
            .order("created_at", { ascending: false })
            .limit(limit);

        if (error) throw error;

        return data as BlogPost[];
    } catch (error) {
        console.error("Failed to fetch latest blogs:", error);
        return [];
    }
}

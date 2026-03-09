"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteVideo(videoId: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from("treatment_videos")
        .delete()
        .eq("id", videoId)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath("/admin/videos")
}

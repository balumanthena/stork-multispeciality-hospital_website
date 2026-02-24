
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function debug() {
    const departmentSlug = 'cosmetic-surgery'

    // 1. Get Department ID
    const { data: deptData } = await supabase
        .from("departments")
        .select("id")
        .eq("slug", departmentSlug)
        .single()

    console.log("Dept Data:", deptData)

    if (!deptData) {
        console.log("Department not found in DB!")
        return
    }

    // 2. Try the OR query
    const { data: videos, error } = await supabase
        .from("treatment_videos")
        .select(`
            *,
            video_departments(department_id)
        `)
        .eq("is_active", true)
        .or(`show_global.eq.true,video_departments.department_id.eq.${deptData.id}`)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("OR Query Error:", error)
    } else {
        console.log("Videos Count (OR):", videos.length)
        videos.forEach(v => console.log(`- ${v.title} (Global: ${v.show_global})`))
    }

    // 3. Try separate queries to see what exists
    const { data: globalVideos } = await supabase
        .from("treatment_videos")
        .select("*")
        .eq("is_active", true)
        .eq("show_global", true)

    console.log("Global Videos Count:", globalVideos?.length || 0)

    const { data: mappedVideos } = await supabase
        .from("video_departments")
        .select("video_id")
        .eq("department_id", deptData.id)

    console.log("Mapped Videos Count:", mappedVideos?.length || 0)
}

debug()

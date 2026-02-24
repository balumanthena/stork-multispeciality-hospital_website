import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) throw new Error("Missing env vars");

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log("Testing queries...");

    // 1. Departments
    const { error: e1 } = await supabase.from("departments").select("id").limit(1);
    console.log("departments:", e1 || "ok");

    // 2. Treatments
    const { error: e2 } = await supabase.from("treatments").select("id").limit(1);
    console.log("treatments:", e2 || "ok");

    // 3. Treatment Videos
    const { error: e3 } = await supabase.from("treatment_videos").select("*").limit(1);
    console.log("treatment_videos:", e3 || "ok");

    // 4. Video Departments
    const { error: e4 } = await supabase.from("video_departments").select("department_id").limit(1);
    console.log("video_departments:", e4 || "ok");

    // 5. Video Treatments
    const { error: e5 } = await supabase.from("video_treatments").select("treatment_id").limit(1);
    console.log("video_treatments:", e5 || "ok");
}
test();

import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://hvhlxcgryxcormdvjplc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aGx4Y2dyeXhjb3JtZHZqcGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMzgxNTcsImV4cCI6MjA4NjYxNDE1N30.j7hanhgS0vFlJTOaHcEnC1hyYtCvms1gr1vzrA6l9Xc");

async function test() {
    console.log("Departments:");
    console.log(await supabase.from("departments").select("id").limit(1));

    console.log("Treatments:");
    console.log(await supabase.from("treatments").select("id").limit(1));

    console.log("Treatment_Videos:");
    console.log(await supabase.from("treatment_videos").select("*").limit(1));

    console.log("Video_Departments:");
    console.log(await supabase.from("video_departments").select("department_id").limit(1));

    console.log("Video_Treatments:");
    console.log(await supabase.from("video_treatments").select("treatment_id").limit(1));
}
test();

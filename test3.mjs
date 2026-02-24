import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://hvhlxcgryxcormdvjplc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aGx4Y2dyeXhjb3JtZHZqcGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMzgxNTcsImV4cCI6MjA4NjYxNDE1N30.j7hanhgS0vFlJTOaHcEnC1hyYtCvms1gr1vzrA6l9Xc");

async function test() {
    try {
        let videoId = undefined;
        const result = await supabase.from("treatment_videos").select("*").eq("id", videoId).single();
        console.log("Result:", result);
    } catch (e) {
        console.log("Caught:", e);
        console.log("Is Error:", e instanceof Error);
        console.log("JSON:", JSON.stringify(e));
    }
}
test();

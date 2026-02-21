const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function checkSchema() {
    try {
        const res = await fetch(`${url}/rest/v1/profiles?limit=1`, {
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`
            }
        });
        const data = await res.json();
        console.log("Profiles schema check (raw):", JSON.stringify(data));
    } catch (err) {
        console.error("Fetch err:", err);
    }
}
checkSchema();

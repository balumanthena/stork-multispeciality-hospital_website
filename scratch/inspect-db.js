const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
    console.error("Missing environment variables!");
    process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function inspect() {
    console.log("Inspecting schema metadata...");
    
    // Test appointments table
    const { data: appointments, error: appError } = await supabase
        .from('appointments')
        .select('*')
        .limit(1);
    
    console.log("Appointments select result:", { data: appointments, error: appError });

    // Test leads table
    const { data: leads, error: leadError } = await supabase
        .from('leads')
        .select('*')
        .limit(1);
    
    console.log("Leads select result:", { data: leads, error: leadError });

    // Test second_opinions table
    const { data: opinions, error: opinionError } = await supabase
        .from('second_opinions')
        .select('*')
        .limit(1);
        
    console.log("Second Opinions select result:", { data: opinions, error: opinionError });
}

inspect();

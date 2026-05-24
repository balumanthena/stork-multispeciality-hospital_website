import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkPublicRateLimit } from "@/lib/rate-limit-public";

export async function POST(req: Request) {
    try {
        // 1. IP Rate Limiting Check
        const rateLimit = await checkPublicRateLimit({ req });
        if (!rateLimit.allowed) {
            return NextResponse.json({ error: rateLimit.error }, { status: 429 });
        }

        const body = await req.json();
        const { name, phone, type = "General Website Lead", website_url } = body;

        // 2. HoneyPot Bot Protection
        if (website_url) {
            console.warn("Honeypot triggered! Rejected leads bot submission.");
            return NextResponse.json({ success: true, message: "Request processed successfully" }, { status: 200 });
        }

        if (!name || !phone) {
            return NextResponse.json({ success: false, error: "Missing name or phone" }, { status: 400 });
        }

        // 3. Database Persistence (Supabase public.patient_leads table)
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
        try {
            const supabase = createAdminClient();
            const { error: insertError } = await supabase
                .from('patient_leads')
                .insert({
                    name,
                    phone,
                    type: 'lead',
                    message: `Source: ${type}`,
                    ip_address: ip
                });

            if (insertError) {
                console.error("Failed to persist lead in Supabase database:", insertError.message);
            } else {
                console.log("Successfully persisted general lead in database.");
            }
        } catch (dbErr) {
            console.error("Database connection failure (gracefully continuing to SMTP email dispatch):", dbErr);
        }

        // 4. Prepare Hospital Notification Email
        const hospitalHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);">
          <div style="background-color: #ff8202; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">Stork Hospital</h1>
            <p style="color: #fff7ed; margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">New Callback Request</p>
          </div>
          
          <div style="padding: 32px; background-color: #ffffff;">
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              You have received a new lead from the <strong>${type}</strong>.
            </p>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 16px 0; color: #64748b; font-weight: 600; width: 120px;">Patient Name</td>
                  <td style="padding: 16px 0; color: #0f172a; font-weight: 700; font-size: 16px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; color: #64748b; font-weight: 600;">Phone Number</td>
                  <td style="padding: 16px 0;">
                    <a href="tel:${phone}" style="color: #ff8202; text-decoration: none; font-weight: 700; font-size: 18px;">${phone}</a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style="margin-top: 32px; padding: 20px; background-color: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1;">
                <p style="margin: 0; color: #64748b; font-size: 13px; text-align: center;">
                    Please contact the patient as soon as possible to schedule their consultation.
                </p>
            </div>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 16px; text-align: center;">
            <p style="color: #94a3b8; font-size: 11px; margin: 0; text-transform: uppercase; tracking-wider;">
              Generated on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)
            </p>
          </div>
        </div>
      `;

        const skipEmail = req.headers.get('x-qa-skip-email') === 'true' || req.headers.get('x-qa-bypass') === 'true';
        if (skipEmail) {
            return NextResponse.json({ success: true, message: "Lead processed (QA Skip Email)" });
        }

        const result = await sendEmail({
            to: process.env.EMAIL_USER || "storkhospitalsmedia@gmail.com",
            subject: `New Lead Captured: ${name} (${type})`,
            html: hospitalHtml,
        });

        if (!result.success) {
            throw new Error(result.error);
        }

        return NextResponse.json({ success: true, message: "Lead processed and email sent" });
    } catch (e) {
        console.error("Lead submission error:", e);
        return NextResponse.json({ success: false, error: "Failed to process lead" }, { status: 500 });
    }
}

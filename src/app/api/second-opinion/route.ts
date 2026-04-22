import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, specialty, message } = body;

    // Validate required fields
    if (!name || !phone || !specialty || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Hospital Notification Email
    const hospitalHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0F172A; padding: 24px; text-align: center; color: white;">
            <h2 style="margin: 0; color: #FF8202;">New Second Opinion Request</h2>
          </div>
          <div style="padding: 24px;">
            <p>A new second opinion evaluation request has been submitted through the website.</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Patient Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${name}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${phone}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${email || "Not provided"}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Specialty:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${specialty}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background-color: #fefce8; border: 1px solid #fef08a; border-radius: 8px;">
              <p style="margin: 0;"><strong>Diagnosis Summary:</strong></p>
              <p style="margin: 8px 0 0 0;">${message}</p>
            </div>
          </div>
          <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
            Sent via Stork Hospital — Second Opinion Portal
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Patient Confirmation Email
    const patientHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0F172A; padding: 24px; text-align: center; color: white;">
            <h2 style="margin: 0; color: #FF8202;">Second Opinion Request Received</h2>
          </div>
          <div style="padding: 24px;">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to <strong>Stork Multispecialty Hospital</strong> for a second opinion regarding <strong>${specialty}</strong>.</p>
            <p>Your request has been received and assigned to our clinical review board. Here's what happens next:</p>
            <div style="margin: 20px 0; padding: 16px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
              <ul style="margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Our specialist team will review your case details within <strong>24-48 hours</strong>.</li>
                <li style="margin-bottom: 8px;">A coordinator will contact you on <strong>${phone}</strong> to discuss next steps.</li>
                <li>If additional reports are needed, we will guide you through a secure upload process.</li>
              </ul>
            </div>
            <p style="color: #64748b; font-size: 14px;">If you have urgent queries, feel free to reach us directly:</p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://wa.me/917610810819" style="background-color: #22c55e; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Connect on WhatsApp</a>
            </div>
          </div>
          <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
            &copy; 2026 Stork Multispecialty Hospital. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Dispatch Emails
    const hospitalEmail = process.env.EMAIL_USER || "storkhospitalsmedia@gmail.com";

    const [hospitalInfo, patientInfo] = await Promise.all([
      sendEmail({
        to: hospitalEmail,
        subject: `Second Opinion Request: ${name} (${specialty})`,
        html: hospitalHtml,
        replyTo: email || undefined,
      }),
      ...(email
        ? [
            sendEmail({
              to: email,
              subject: "Your Second Opinion Request — Stork Hospital",
              html: patientHtml,
            }),
          ]
        : []),
    ]);

    if (!hospitalInfo.success) {
      console.error("Failed to notify hospital:", hospitalInfo.error);
    }
    if (email && patientInfo && !patientInfo.success) {
      console.error("Failed to notify patient:", patientInfo.error);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Second Opinion API Error:", error);
    return NextResponse.json(
      { error: "An internal error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

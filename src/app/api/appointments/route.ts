import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, department, doctor, date, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !department || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // 1. Prepare Hospital Notification Email
    const hospitalHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #2563eb; padding: 24px; text-align: center; color: white;">
            <h2 style="margin: 0;">New Appointment Request</h2>
          </div>
          <div style="padding: 24px;">
            <p>A new appointment has been booked through the website.</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Patient Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${name}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${phone}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${email}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Department:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${department}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Doctor:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${doctor || "Any Available"}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Preferred Date:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${formattedDate}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background-color: #fefce8; border: 1px solid #fef08a; border-radius: 8px;">
              <p style="margin: 0;"><strong>Message/Notes:</strong></p>
              <p style="margin: 8px 0 0 0;">${message || "No additional notes provided."}</p>
            </div>
          </div>
          <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
            Sent via Stork Hospital Online Booking System
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Prepare Patient Confirmation Email
    const patientHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #2563eb; padding: 24px; text-align: center; color: white;">
            <h2 style="margin: 0;">Appointment Received</h2>
          </div>
          <div style="padding: 24px;">
            <p>Dear ${name},</p>
            <p>Thank you for choosing Stork Multispecialty Hospital. We have received your appointment request for <strong>${department}</strong>.</p>
            <p>Our coordination team will review the availability and call you shortly to confirm your final slot.</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://wa.me/919999988888" style="background-color: #22c55e; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Connect with us on WhatsApp</a>
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
    const [hospitalInfo, patientInfo] = await Promise.all([
      sendEmail({
        to: process.env.EMAIL_USER || "storkhospitalsmedia@gmail.com",
        subject: `New Appointment: ${name} (${department})`,
        html: hospitalHtml,
        replyTo: email
      }),
      sendEmail({
        to: email,
        subject: "Your Appointment Request at Stork Hospital",
        html: patientHtml
      })
    ]);

    if (!hospitalInfo.success) {
      console.error("Failed to notify hospital:", hospitalInfo.error);
    }
    if (!patientInfo.success) {
      console.error("Failed to notify patient:", patientInfo.error);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Appointment API Error:", error);
    return NextResponse.json({ error: "An internal error occurred. Please try again later." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, subject, message } = body;

        // Validate required fields
        if (!name || !phone || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sending to hospital email
            replyTo: email,
            subject: `Website Contact Form: ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0f172a; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Stork Multispeciality Hospital</h1>
            <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">New General Inquiry</p>
          </div>
          
          <div style="padding: 32px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #64748b; font-weight: 600; width: 120px;">Name</td>
                  <td style="padding: 12px 0; color: #0f172a; font-weight: 500;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #64748b; font-weight: 600;">Phone</td>
                  <td style="padding: 12px 0; color: #0f172a; font-weight: 500;">
                    <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #64748b; font-weight: 600;">Email</td>
                  <td style="padding: 12px 0; color: #0f172a; font-weight: 500;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #64748b; font-weight: 600;">Subject</td>
                  <td style="padding: 12px 0; color: #0f172a; font-weight: 500;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #64748b; font-weight: 600; vertical-align: top;">Message</td>
                  <td style="padding: 12px 0; color: #0f172a; line-height: 1.5; white-space: pre-wrap;">${message}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)
            </p>
          </div>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "Contact request sent successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Email send error:", error);
        return NextResponse.json(
            { error: "Failed to send contact request. Please try again later." },
            { status: 500 }
        );
    }
}

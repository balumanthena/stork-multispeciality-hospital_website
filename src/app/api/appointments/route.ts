import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to hospital email
      replyTo: email,
      subject: `New Appointment Booking - Stork Hospital`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0f172a; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Stork Multispeciality Hospital</h1>
            <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">New Appointment Request</p>
          </div>
          
          <div style="padding: 32px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #64748b; font-weight: 600; width: 120px;">Patient Name</td>
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
                  <td style="padding: 12px 0; color: #64748b; font-weight: 600;">Department</td>
                  <td style="padding: 12px 0; color: #0f172a; font-weight: 500;">${department}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #64748b; font-weight: 600;">Doctor</td>
                  <td style="padding: 12px 0; color: #0f172a; font-weight: 500;">${doctor || 'Any Available'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #64748b; font-weight: 600;">Preferred Date</td>
                  <td style="padding: 12px 0; color: #0f172a; font-weight: 500;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #64748b; font-weight: 600; vertical-align: top;">Message</td>
                  <td style="padding: 12px 0; color: #0f172a; line-height: 1.5;">${message || 'No additional message provided.'}</td>
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

    // --- WHATSAPP CLOUD API INTEGRATION ---
    try {
      const whatsappResponse = await fetch("https://graph.facebook.com/v22.0/1002955742901568/messages", {
        method: "POST",
        headers: {
          "Authorization": "Bearer EAAWZC3DLZBtx0BQ7qi72PcQ4kYho5h2v2cCb8qa1h1f6Dpj7Oy9PiBbCuCG4gjFrH5zkmVraJGi0xgDZCTaFX6U6YnqZBAv4DGXjx2HjfJc1JIxAB5rBtrZA5hueqXTlbKioYGsX4NLxkkiuOgfZALVmY4ZCRCoKGC23ywaxloFUjhVtueb7wFo13xReHZBDwGNVRHsHGmkRrDZC4pJZBUrkACnsMfjT7HykWwORekHZCkLWUn3ZC8GlHMUqIADCT44UF5BQCPNZC9jPrME5ZCZBH3CVeka",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "919494408050",
          type: "template",
          template: {
            name: "hello_world",
            language: { code: "en_US" }
          }
        })
      });

      if (!whatsappResponse.ok) {
        const waError = await whatsappResponse.text();
        // We log this but do NOT throw, because if the Email succeeded, the booking is still technically captured.
        console.warn("WhatsApp API failed to send notification:", waError);
      }
    } catch (waRuntimeError) {
      console.error("WhatsApp Request Error:", waRuntimeError);
    }

    return NextResponse.json(
      { success: true, message: "Appointment request sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send appointment request. Please try again later." },
      { status: 500 }
    );
  }
}

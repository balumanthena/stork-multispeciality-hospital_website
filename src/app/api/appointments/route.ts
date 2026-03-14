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
      to: "storkhospitalsmedia@gmail.com",
      replyTo: email,
      subject: "New Appointment Booking – Stork Hospital",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Appointment Request</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f5;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                
                <!-- Main Container -->
                <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header Section -->
                  <tr>
                    <td style="background-color: #2563eb; padding: 32px 24px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">Stork Multispeciality Hospital</h1>
                      <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 15px; font-weight: 500;">New Appointment Request</p>
                    </td>
                  </tr>

                  <!-- Body Content -->
                  <tr>
                    <td style="padding: 32px 24px;">
                      
                      <!-- Section 1: Patient Details -->
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 16px;">
                            <h2 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Patient Details</h2>
                            <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;"><strong style="color: #0f172a; display: inline-block; width: 60px;">Name:</strong> ${name}</p>
                            <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;"><strong style="color: #0f172a; display: inline-block; width: 60px;">Phone:</strong> <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></p>
                            <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #0f172a; display: inline-block; width: 60px;">Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
                          </td>
                        </tr>
                      </table>

                      <!-- Section 2: Appointment Information -->
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 16px;">
                            <h2 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Appointment Information</h2>
                            <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;"><strong style="color: #0f172a; display: inline-block; width: 100px;">Department:</strong> ${department}</p>
                            <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;"><strong style="color: #0f172a; display: inline-block; width: 100px;">Doctor:</strong> ${doctor || "Any Available"}</p>
                            <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #0f172a; display: inline-block; width: 100px;">Preferred Date:</strong> ${date}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Section 3: Additional Notes -->
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fffbeb; border-radius: 8px; border: 1px solid #fde68a;">
                        <tr>
                          <td style="padding: 16px;">
                            <h2 style="margin: 0 0 8px 0; color: #92400e; font-size: 15px; font-weight: bold;">Notes:</h2>
                            <p style="margin: 0; color: #b45309; font-size: 14px; line-height: 1.5;">${message || "No additional notes provided by the patient."}</p>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer Section -->
                  <tr>
                    <td style="background-color: #f1f5f9; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center;">
                      <h3 style="margin: 0 0 4px 0; color: #334155; font-size: 14px; font-weight: bold;">Stork Multispeciality Hospital</h3>
                      <p style="margin: 0 0 12px 0; color: #64748b; font-size: 13px;">Survey No 14 & 15, NH44<br>Kompally, Hyderabad</p>
                      
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center">

                            <p style="margin: 0; color: #64748b; font-size: 13px;"><strong style="color: #334155;">Phone:</strong> <a href="tel:+919999988888" style="color: #2563eb; text-decoration: none;">+91 99999 88888</a></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError: any) {
      console.warn("Nodemailer failed to send email. Check credentials:", emailError.message);
      // We do NOT throw here so that the frontend still succeeds and triggers the WhatsApp redirect.
    }

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
      { error: error.message || "Failed to send appointment request. Please try again later." },
      { status: 500 }
    );
  }
}

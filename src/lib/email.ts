import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS?.replace(/\s/g, ''), // Strip spaces from app password
  },
})

interface SendEmailParams {
  to: string
  subject: string
  otp: string
  hospitalName?: string
}

export async function sendOTPEmail({ to, subject, otp, hospitalName = 'Stork Multispecialty Hospital' }: SendEmailParams) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .content {
          background-color: #f8fafc;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          border: 1px solid #e2e8f0;
        }
        .otp-code {
          font-size: 36px;
          font-weight: 800;
          color: #ff8202;
          letter-spacing: 8px;
          margin: 20px 0;
          padding: 10px;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #64748b;
        }
        .btn {
          display: inline-block;
          padding: 12px 24px;
          background-color: #ff8202;
          color: #ffffff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="color: #0f172a;">Password Reset Request</h2>
        </div>
        <div class="content">
          <p style="color: #475569; font-size: 16px;">Hello,</p>
          <p style="color: #475569; font-size: 16px;">We received a request to reset your admin password for <strong>${hospitalName}</strong>.</p>
          <p style="color: #475569; font-size: 14px; margin-top: 20px;">Your verification code is:</p>
          <div class="otp-code">${otp}</div>
          <p style="color: #ef4444; font-size: 13px; font-weight: 600;">This code will expire in 5 minutes.</p>
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${hospitalName}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: `"Stork Hospital Security" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  })
}

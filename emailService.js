require("dotenv").config();
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
});

async function sendContactEmail({ name, email, eventDate, inquiry, message}) {
    return transporter.sendMail({
  from: '"Website Contact" <no-reply@>',
  to: "kunleoshodi856@gmail.com",
  subject: `New Contact Message from ${name}`,
  html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>New Contact Message</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Card Container -->
          <table width="600" cellpadding="0" cellspacing="0" 
            style="background:#ffffff;border-radius:12px;
                   box-shadow:0 8px 24px rgba(0,0,0,0.08);
                   overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background:#111827;padding:24px 32px;">
                <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">
                  📩 New Contact Submission
                </h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">

                <p style="margin:0 0 24px 0;color:#6b7280;font-size:14px;">
                  You’ve received a new message from your website contact form.
                </p>

                <!-- Info Box -->
                <table width="100%" cellpadding="0" cellspacing="0"
                  style="background:#f9fafb;border-radius:8px;padding:20px;">
                  
                  <tr>
                    <td style="padding-bottom:12px;">
                      <strong style="color:#111827;">Name:</strong><br/>
                      <span style="color:#374151;">${name}</span>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:12px;">
                      <strong style="color:#111827;">Email:</strong><br/>
                      <span style="color:#374151;">${email}</span>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:12px;">
                      <strong style="color:#111827;">Event Date:</strong><br/>
                      <span style="color:#374151;">${eventDate}</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong style="color:#111827;">Inquiry:</strong><br/>
                      <span style="color:#374151;line-height:1.6;">
                        ${inquiry}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong style="color:#111827;">Message:</strong><br/>
                      <span style="color:#374151;line-height:1.6;">
                        ${message}
                      </span>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f4f6f8;padding:20px 32px;
                         font-size:12px;color:#9ca3af;text-align:center;">
                This message was sent from your website contact form.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `,
});
}

module.exports = { sendContactEmail };
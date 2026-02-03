import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "RMVS <onboarding@resend.dev>",
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, "")
    });

    if (error) {
      console.error("Resend error:", error);
      return { ok: false as const, error: error.message };
    }

    return { ok: true as const, data };
  } catch (err) {
    console.error("Email send error:", err);
    return { ok: false as const, error: "Failed to send email" };
  }
}

export function contactNotificationTemplate(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${data.name} (${data.email})</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <hr />
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br />")}</p>
  `;
  
  return {
    subject: `[RMVS Contact] ${data.subject}`,
    html,
    text: `New Contact Form Submission\n\nFrom: ${data.name} (${data.email})\nSubject: ${data.subject}\n\nMessage:\n${data.message}`
  };
}

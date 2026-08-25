import { NextResponse } from "next/server";
import { contactSchema, zodFieldErrors } from "@/lib/forms/schemas";
import { sendEmail, contactNotificationTemplate } from "@/lib/email/send";
import { sendSmsNotification } from "@/lib/sms/send";
import { clientIpFrom, sendMetaCapiEvent } from "@/lib/meta-capi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Please fix the errors below.",
          fieldErrors: zodFieldErrors(result.error)
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, event_id } = result.data;

    // Send notification email to owner
    const notifyEmail = process.env.NOTIFY_EMAIL || "RMonaghanVentureStudios@rmvs.org";
    const template = contactNotificationTemplate({ name, email, subject, message });
    
    const emailResult = await sendEmail({
      to: notifyEmail,
      subject: template.subject,
      html: template.html,
      text: template.text
    });

    if (!emailResult.ok) {
      console.error("Failed to send notification email:", emailResult.error);
    }

    await sendSmsNotification({
      body: `RMVS Contact: ${name} (${email}) — ${subject}`,
    });

    if (event_id) {
      await sendMetaCapiEvent({
        eventName: "Lead",
        eventId: event_id,
        eventSourceUrl: request.headers.get("referer") || "https://rmvs.org/contact",
        email,
        name,
        clientIp: clientIpFrom(request),
        userAgent: request.headers.get("user-agent") || undefined,
      });
    }

    return NextResponse.json({
      message: "Thanks for reaching out! I'll get back to you as soon as possible.",
      data: { sent: true }
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

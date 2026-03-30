/**
 * Optional SMS notification via Twilio.
 * Only active when TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
 * TWILIO_FROM_NUMBER, and TWILIO_TO_NUMBER are all set.
 */

interface SmsParams {
  body: string;
}

function isTwilioConfigured(): boolean {
  return !!(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_FROM_NUMBER &&
    process.env.TWILIO_TO_NUMBER
  );
}

export async function sendSmsNotification({ body }: SmsParams) {
  if (!isTwilioConfigured()) return { ok: true as const, skipped: true };

  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const from = process.env.TWILIO_FROM_NUMBER!;
  const to = process.env.TWILIO_TO_NUMBER!;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: from, To: to, Body: body }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Twilio SMS error:", err);
      return { ok: false as const, error: err };
    }

    return { ok: true as const, skipped: false };
  } catch (err) {
    console.error("SMS send error:", err);
    return { ok: false as const, error: "Failed to send SMS" };
  }
}

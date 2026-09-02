import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/send";
import { sendSmsNotification } from "@/lib/sms/send";
import { sendMetaCapiEvent } from "@/lib/meta-capi";

/**
 * Stripe webhook — the server-side source of truth for deposit_paid.
 *
 * Point a Stripe webhook endpoint at /api/stripe-webhook with the
 * `checkout.session.completed` event and set STRIPE_WEBHOOK_SECRET.
 * Client-side InitiateCheckout remains a diagnostic; only this confirms
 * money actually moved. Signature verification is implemented directly
 * (HMAC-SHA256 per Stripe's spec) so no Stripe SDK dependency is needed.
 */

const TOLERANCE_SECONDS = 5 * 60;

function verifyStripeSignature(payload: string, header: string, secret: string): boolean {
  const parts = new Map(
    header.split(",").map((p) => {
      const [k, ...v] = p.split("=");
      return [k, v.join("=")] as const;
    }),
  );
  const timestamp = parts.get("t");
  const signature = parts.get("v1");
  if (!timestamp || !signature) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > TOLERANCE_SECONDS) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");
  try {
    return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
  } catch {
    return false;
  }
}

interface CheckoutSession {
  id: string;
  amount_total?: number | null;
  currency?: string | null;
  customer_details?: { email?: string | null; name?: string | null } | null;
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ message: "Webhook not configured" }, { status: 501 });
  }

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";
  if (!verifyStripeSignature(payload, signature, secret)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  let event: { id: string; type: string; data?: { object?: CheckoutSession } };
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data?.object;
    const email = session?.customer_details?.email ?? undefined;
    const name = session?.customer_details?.name ?? undefined;
    const amount =
      typeof session?.amount_total === "number"
        ? `${(session.amount_total / 100).toFixed(2)} ${(session.currency ?? "usd").toUpperCase()}`
        : "unknown amount";

    // deposit_paid — confirmed server-side by Stripe, keyed to the checkout
    // session so retries of the same webhook dedupe at Meta.
    await sendMetaCapiEvent({
      eventName: "Purchase",
      eventId: session?.id ?? event.id,
      eventSourceUrl: "https://rmvs.org/services",
      email,
      name,
    });

    const notifyEmail = process.env.NOTIFY_EMAIL || "RMonaghanVentureStudios@rmvs.org";
    await sendEmail({
      to: notifyEmail,
      subject: `[RMVS] Payment received — ${amount}`,
      html: `<h2>Stripe payment confirmed</h2><p><strong>From:</strong> ${name ?? "unknown"} (${email ?? "no email"})</p><p><strong>Amount:</strong> ${amount}</p><p><strong>Session:</strong> ${session?.id ?? event.id}</p>`,
      text: `Stripe payment confirmed\nFrom: ${name ?? "unknown"} (${email ?? "no email"})\nAmount: ${amount}\nSession: ${session?.id ?? event.id}`,
    });
    await sendSmsNotification({
      body: `RMVS payment: ${amount} from ${name ?? email ?? "unknown"}`,
    });
  }

  return NextResponse.json({ received: true });
}

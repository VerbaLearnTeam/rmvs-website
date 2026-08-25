import { createHash } from "crypto";

const GRAPH = "https://graph.facebook.com/v21.0";

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function splitName(name: string): { fn?: string; ln?: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { fn: sha256(parts[0]) };
  return {
    fn: sha256(parts[0]),
    ln: sha256(parts.slice(1).join(" ")),
  };
}

type CapiEvent = {
  eventName: "Lead" | "Schedule" | "InitiateCheckout" | "PageView";
  eventId: string;
  eventSourceUrl?: string;
  email?: string;
  name?: string;
  clientIp?: string;
  userAgent?: string;
};

/**
 * Server-side Conversions API. No-ops until META_CAPI_ACCESS_TOKEN is set.
 * Hashes PII with SHA-256 before it leaves the process. Never throws into
 * the request path — a CAPI outage must not fail a lead.
 */
export async function sendMetaCapiEvent(event: CapiEvent): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const token = process.env.META_CAPI_ACCESS_TOKEN?.trim();
  if (!pixelId || !token) return;

  const user_data: Record<string, string> = {};
  if (event.email) user_data.em = sha256(event.email);
  Object.assign(user_data, splitName(event.name ?? ""));
  if (event.clientIp) user_data.client_ip_address = event.clientIp;
  if (event.userAgent) user_data.client_user_agent = event.userAgent;

  const payload: {
    data: unknown[];
    test_event_code?: string;
  } = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl || "https://rmvs.org/",
        action_source: "website",
        user_data,
      },
    ],
  };

  const testCode = process.env.META_CAPI_TEST_EVENT_CODE?.trim();
  if (testCode) payload.test_event_code = testCode;

  try {
    const url = `${GRAPH}/${pixelId}/events?access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("meta capi error:", res.status, body.slice(0, 400));
    }
  } catch (err) {
    console.error("meta capi failed:", err);
  }
}

export function clientIpFrom(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || undefined;
  return request.headers.get("x-real-ip") || undefined;
}

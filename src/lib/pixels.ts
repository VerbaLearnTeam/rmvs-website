"use client";

/**
 * Ad-platform event tracking for Meta + Reddit pixels.
 *
 * The base pixels are injected by <AdPixels /> only when
 * NEXT_PUBLIC_META_PIXEL_ID / NEXT_PUBLIC_REDDIT_PIXEL_ID are set at build
 * time — until then every helper here is a safe no-op, so conversion calls
 * can be wired up before the ad accounts exist.
 */

type CanonicalEvent =
  | "ContactFormSubmit"
  | "ScheduleCall"
  | "InitiateCheckout"
  | "Lead";

/** canonical event -> [Meta standard event, Reddit event] */
const EVENT_MAP: Record<CanonicalEvent, [string, string]> = {
  ContactFormSubmit: ["Contact", "Lead"],
  ScheduleCall: ["Schedule", "Custom"],
  InitiateCheckout: ["InitiateCheckout", "AddToCart"],
  Lead: ["Lead", "Lead"],
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    rdt?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: CanonicalEvent, data?: Record<string, unknown>) {
  const [meta, reddit] = EVENT_MAP[event];
  try {
    window.fbq?.("track", meta, data);
    if (reddit === "Custom") {
      window.rdt?.("track", "Custom", { customEventName: event, ...data });
    } else {
      window.rdt?.("track", reddit, data);
    }
  } catch {
    /* tracking must never break the page */
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const UTM_STORAGE_KEY = "rmvs_utms";

/** First-touch UTM capture: call once per page load; stores the first UTM
 *  set seen this session so attribution survives in-site navigation. */
export function captureUtms() {
  try {
    if (sessionStorage.getItem(UTM_STORAGE_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) utms[k] = v;
    }
    if (Object.keys(utms).length) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));
    }
  } catch {
    /* storage unavailable */
  }
}

export function getUtms(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** Human-readable attribution line for lead notification emails. */
export function utmSummaryLine(): string {
  const utms = getUtms();
  if (!Object.keys(utms).length) return "Attribution: direct / organic";
  return `Attribution: ${UTM_KEYS.filter((k) => utms[k])
    .map((k) => `${k}=${utms[k]}`)
    .join(", ")}`;
}

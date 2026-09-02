"use client";

/**
 * Ad-platform event tracking for Meta + Reddit pixels (plus Plausible
 * custom goals when the script is present).
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
  | "Lead"
  | "RedlineEngaged"
  | "RedlineStarted"
  | "PhoneClick";

/** canonical event -> [Meta event, isMetaCustom, Reddit event] */
const EVENT_MAP: Record<CanonicalEvent, [string, boolean, string]> = {
  ContactFormSubmit: ["Lead", false, "Lead"],
  ScheduleCall: ["Schedule", false, "Custom"],
  InitiateCheckout: ["InitiateCheckout", false, "AddToCart"],
  Lead: ["Lead", false, "Lead"],
  // Diagnostic engagement events — custom on every platform, never a
  // campaign's primary conversion.
  RedlineEngaged: ["redline_engaged", true, "Custom"],
  RedlineStarted: ["redline_started", true, "Custom"],
  PhoneClick: ["Contact", false, "Custom"],
};

export function newEventId(): string {
  return crypto.randomUUID();
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    rdt?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
  }
}

export function trackEvent(event: CanonicalEvent, data?: Record<string, unknown>) {
  const [meta, metaCustom, reddit] = EVENT_MAP[event];
  const eventID =
    typeof data?.eventID === "string" && data.eventID ? data.eventID : newEventId();
  const rest = { ...(data ?? {}) };
  delete rest.eventID;
  try {
    window.fbq?.(metaCustom ? "trackCustom" : "track", meta, rest, { eventID });
    if (reddit === "Custom") {
      window.rdt?.("track", "Custom", { customEventName: event, eventID, ...rest });
    } else {
      window.rdt?.("track", reddit, { eventID, ...rest });
    }
    window.plausible?.(event, { props: rest });
  } catch {
    /* tracking must never break the page */
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid", "fbclid", "msclkid"] as const;
const ATTR_STORAGE_KEY = "rmvs_attribution";
const LEGACY_UTM_KEY = "rmvs_utms";

export interface Attribution {
  [key: string]: string;
}

/** First-touch attribution capture: call once per page load. Stores UTMs,
 *  ad-platform click IDs, referrer, landing page, and landing timestamp so
 *  the full record can be attached to leads, bookings, and payments instead
 *  of being reconstructed later. Persisted in localStorage (first touch
 *  wins) with a sessionStorage fallback. */
export function captureUtms() {
  try {
    const store = pickStore();
    if (!store || store.getItem(ATTR_STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const attr: Attribution = {};
    for (const k of [...UTM_KEYS, ...CLICK_ID_KEYS]) {
      const v = params.get(k);
      if (v) attr[k] = v;
    }
    if (document.referrer && !document.referrer.includes(window.location.hostname)) {
      attr.referrer = document.referrer;
    }
    // Only persist a record once there is actually something to attribute,
    // plus landing context so variants can be compared.
    if (Object.keys(attr).length) {
      attr.landing_page = window.location.pathname;
      attr.landed_at = new Date().toISOString();
      store.setItem(ATTR_STORAGE_KEY, JSON.stringify(attr));
    }
  } catch {
    /* storage unavailable */
  }
}

function pickStore(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    try {
      return window.sessionStorage;
    } catch {
      return null;
    }
  }
}

export function getAttribution(): Attribution {
  try {
    const store = pickStore();
    const raw =
      store?.getItem(ATTR_STORAGE_KEY) ??
      window.sessionStorage.getItem(LEGACY_UTM_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** @deprecated use getAttribution() */
export function getUtms(): Record<string, string> {
  return getAttribution();
}

/** Human-readable attribution line for lead notification emails. */
export function utmSummaryLine(): string {
  const attr = getAttribution();
  const keys = Object.keys(attr);
  if (!keys.length) return "Attribution: direct / organic";
  return `Attribution: ${keys.map((k) => `${k}=${attr[k]}`).join(", ")}`;
}

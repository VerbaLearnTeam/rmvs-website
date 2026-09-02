"use client";

import Image from "next/image";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { newEventId, trackEvent, utmSummaryLine } from "@/lib/pixels";

/* ============================================================
   Scroll-expansion hero.
   The title sits ABOVE the panel (never overlapped — fixes the
   contrast glitch in earlier drafts). As you scroll, the two
   halves of the title spread apart while the panel grows to
   near-fullscreen, then the CTA row fades in.
   ============================================================ */

/** Fixed layout width of the homepage render inside the hero panel.
    The iframe always lays out at desktop width and is scaled to fit
    the panel, so the mini view shows the real desktop homepage. */
const FRAME_W = 1080;

export function ScrollHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const annoARef = useRef<HTMLSpanElement>(null);
  const annoBRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const panel = panelRef.current;
    const sticky = stickyRef.current;
    if (!hero || !panel || !sticky) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ctaRef.current?.classList.add("svc-in");
      panel.classList.add("svc-live");
      sticky.style.setProperty("--hp", "1");
      const w = Math.min(980, window.innerWidth * 0.94);
      panel.style.setProperty("--fs", (w / FRAME_W).toFixed(4));
      return;
    }

    let ticking = false;

    const tick = () => {
      ticking = false;
      const rect = hero.getBoundingClientRect();
      const total = hero.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      const e = 1 - Math.pow(1 - p, 3); // ease-out cubic

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // drives the watercolor wash bloom in CSS
      sticky.style.setProperty("--hp", e.toFixed(4));

      // panel grows from a tall card into a near-fullscreen render.
      // The iframe inside is a FIXED-size desktop render scaled via
      // transform (--fs) — compositor-only, so the nested page never
      // re-lays-out during scroll (this was the source of the jank).
      const wMin = Math.min(420, vw * 0.86);
      const wMax = Math.min(1080, vw * 0.94);
      const w = wMin + (wMax - wMin) * e;

      // Height: take everything the visible viewport allows once the
      // title has shrunk and the sub copy has crossfaded into the CTA
      // row (both overlay the bottom, out of flow — .svc-hero-bottom).
      // Before the hero sticks, part of it sits below the fold (the page
      // offsets content for the fixed header), so size the sticky to the
      // visible remainder to keep everything on screen at load.
      const stickyTop = Math.max(0, sticky.getBoundingClientRect().top);
      const visibleH = vh - stickyTop;
      sticky.style.height = `${visibleH}px`;

      // offsetHeight ignores transforms — apply this frame's title scale
      // analytically (measuring the rect would lag one frame behind)
      const titleH = (titleRef.current?.offsetHeight ?? 80) * (1 - 0.22 * e);
      const subH = subRef.current?.offsetHeight ?? 150;
      const ctaH = ctaRef.current?.offsetHeight ?? 48;
      const gapPx = Math.min(26, Math.max(14, vh * 0.022));
      const bottomH = ctaH + (subH - ctaH) * (1 - e);
      // top pad (92) + title + gap + panel + clearance + bottom block + 18
      const avail = visibleH - 92 - titleH - gapPx - bottomH - 18 - 22;
      const desired = vh * (0.56 + 0.26 * e);
      // floor yields to `avail` on short screens so the panel never grows
      // underneath the absolutely-positioned sub copy / CTA block
      const floor = Math.min(280, Math.max(160, avail));
      const h = Math.max(floor, Math.min(desired, avail));

      panel.style.width = `${w}px`;
      panel.style.height = `${h}px`;
      panel.style.setProperty("--fs", (w / FRAME_W).toFixed(4));

      // title recedes as the render takes the stage: halves drift apart
      // while the whole line shrinks and softens (also keeps it clear of
      // the sticky site header as the panel grows)
      const spread = Math.min(vw * 0.045, 56) * e;
      if (leftRef.current) leftRef.current.style.transform = `translateX(${-spread}px)`;
      if (rightRef.current) rightRef.current.style.transform = `translateX(${spread}px)`;
      if (titleRef.current) {
        titleRef.current.style.transform = `scale(${1 - 0.22 * e})`;
        // on phones the expanded panel fills the screen, so the title must
        // vanish completely or it ghosts behind the fixed site header
        titleRef.current.style.opacity = String(vw <= 768 ? 1 - e : 1 - 0.4 * e);
      }

      // supporting copy fades out early; CTA fades in at the end
      if (subRef.current) {
        const fade = Math.max(0, 1 - p * 2.6);
        subRef.current.style.opacity = String(fade);
        subRef.current.style.pointerEvents = fade > 0.1 ? "auto" : "none";
      }
      ctaRef.current?.classList.toggle("svc-in", p > 0.82);
      // once the render is (nearly) fullscreen, let visitors scroll it
      panel.classList.toggle("svc-live", p > 0.82);

      // annotations only while the panel is still small enough not to collide
      const annoOn = p > 0.18 && p < 0.5 ? "1" : "0";
      if (annoARef.current) annoARef.current.style.opacity = annoOn;
      if (annoBRef.current) annoBRef.current.style.opacity = annoOn;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="svc-hero" ref={heroRef}>
      <div className="svc-hero-sticky" ref={stickyRef}>
        {/* watercolor wash — visible at load, blooms as you scroll */}
        <svg className="svc-wash-defs" width="0" height="0" aria-hidden="true" focusable="false">
          <filter id="svc-watercolor" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011 0.017" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="110" />
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </svg>
        <div className="svc-wash" aria-hidden="true">
          <span className="svc-wash-blob svc-wash-1" />
          <span className="svc-wash-blob svc-wash-2" />
          <span className="svc-wash-blob svc-wash-3" />
          <span className="svc-wash-blob svc-wash-4" />
          <span className="svc-wash-blob svc-wash-5" />
        </div>

        <h1 className="svc-hero-title" aria-label="Your Right Hand Man for the Digital Realm" ref={titleRef}>
          <span className="svc-t-half" ref={leftRef}>
            Your Right Hand Man
          </span>
          <span className="svc-t-half svc-t-grad" ref={rightRef}>
            for the Digital Realm
          </span>
        </h1>

        <div className="svc-hero-panel" ref={panelRef}>
          <div className="svc-mini">
            <div className="svc-mini-bar">
              <span className="svc-mini-dot" />
              <span className="svc-mini-dot" />
              <span className="svc-mini-dot" />
              <span className="svc-mini-url">rmvs.org</span>
            </div>
            <div className="svc-hero-frame-wrap">
              <iframe
                className="svc-hero-frame"
                src="/"
                title="rmvs.org — our live homepage, rendered inside the page"
                loading="eager"
                tabIndex={-1}
              />
            </div>
          </div>
        </div>

        <span className="svc-anno svc-anno-a" ref={annoARef}>
          this is our real homepage,
          <br />
          rendered live — not a screenshot
        </span>
        <span className="svc-anno svc-anno-b" ref={annoBRef}>
          expands to full width
          <br />
          as you scroll
        </span>

        <div className="svc-hero-bottom">
          <div className="svc-hero-sub" ref={subRef}>
            <p>
              RMVS builds the website, wires every technical thing behind it,
              and runs the marketing that fills it. You talk to a person — not
              a ticket queue.
            </p>
            <div className="svc-hero-cta-top">
              <a href="#book" className="svc-btn svc-btn-primary">
                Get started <span className="svc-arrow">›</span>
              </a>
              <a href="#pricing" className="svc-btn svc-btn-ghost">
                See the rate card
              </a>
            </div>
            <div className="svc-scroll-cue">scroll to expand</div>
          </div>

          <div className="svc-hero-cta" ref={ctaRef}>
            <a href="#book" className="svc-btn svc-btn-primary">
              Book a free consult <span className="svc-arrow">›</span>
            </a>
            <a href="#pricing" className="svc-btn svc-btn-ghost">
              See the rate card
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   The Conversion Redline — image-based before/after comparison.

   Both screenshots render the SAME fictional business (Bluevane
   Heating & Cooling — see mockups/content.mjs) through two visual
   systems, captured at matching viewports:
     desktop 1440×900 · mobile 390×844 (2x)

   Interaction: drag the divider (pointer/touch), arrow keys via
   the native range input, or the Show before / Show after
   fallback buttons. First meaningful movement fires the
   diagnostic redline_engaged event (never a campaign conversion).
   ============================================================ */

const REDLINE_VIEWS = {
  desktop: {
    before: "/images/redline/redline-before-desktop.png",
    after: "/images/redline/redline-after-desktop.png",
    width: 2880,
    height: 1800,
    sizes: "(max-width: 1024px) 94vw, 960px",
  },
  mobile: {
    before: "/images/redline/redline-before-mobile.png",
    after: "/images/redline/redline-after-mobile.png",
    width: 780,
    height: 1688,
    sizes: "(max-width: 520px) 86vw, 360px",
  },
} as const;

type RedlineView = keyof typeof REDLINE_VIEWS;

const INITIAL_CUT = 55;

const PHONE_MQ = "(max-width: 768px)";
const subscribePhoneMq = (onChange: () => void) => {
  const mq = window.matchMedia(PHONE_MQ);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const readIsPhone = () => window.matchMedia(PHONE_MQ).matches;
const readIsPhoneServer = () => false;

export function RedlineCompare() {
  const boxRef = useRef<HTMLDivElement>(null);
  const engagedRef = useRef(false);
  // On an actual phone, default to the mobile comparison — it's the
  // more persuasive (and honest) demonstration there.
  const isPhone = useSyncExternalStore(subscribePhoneMq, readIsPhone, readIsPhoneServer);
  const [userView, setUserView] = useState<RedlineView | null>(null);
  const [cut, setCut] = useState(INITIAL_CUT);
  const [animate, setAnimate] = useState(false);
  const view: RedlineView = userView ?? (isPhone ? "mobile" : "desktop");

  const markEngaged = (next: number) => {
    if (!engagedRef.current && Math.abs(next - INITIAL_CUT) > 4) {
      engagedRef.current = true;
      trackEvent("RedlineEngaged", { view });
    }
  };

  const moveTo = (next: number, smooth = false) => {
    const clamped = Math.min(100, Math.max(0, next));
    setAnimate(smooth);
    setCut(clamped);
    markEngaged(clamped);
  };

  const setFromClientX = (clientX: number) => {
    const box = boxRef.current;
    if (!box) return;
    const r = box.getBoundingClientRect();
    moveTo(((clientX - r.left) / r.width) * 100);
  };

  const v = REDLINE_VIEWS[view];

  return (
    <div className="svc-redline">
      <div className="svc-redline-toolbar">
        <div className="svc-redline-tags">
          <span className="svc-cmp-tag svc-tag-before">Before · 2004-era site</span>
          <span className="svc-cmp-tag svc-tag-after">After · RMVS five-day rebuild</span>
        </div>
        <div className="svc-redline-views" role="group" aria-label="Comparison device view">
          {(["desktop", "mobile"] as const).map((k) => (
            <button
              key={k}
              type="button"
              className={`svc-view-btn${view === k ? " svc-view-on" : ""}`}
              aria-pressed={view === k}
              onClick={() => {
                setUserView(k);
                setAnimate(false);
              }}
            >
              {k === "desktop" ? "Desktop" : "Mobile"}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`svc-compare svc-compare-${view}${animate ? " svc-cmp-anim" : ""}`}
        ref={boxRef}
        style={{
          ["--cut" as string]: `${cut}%`,
          aspectRatio: `${v.width} / ${v.height}`,
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") setFromClientX(e.clientX);
        }}
        onPointerDown={(e) => setFromClientX(e.clientX)}
      >
        <div className="svc-cmp-layer">
          <Image
            src={v.before}
            alt={`Before: a dated 2004-era HVAC contractor website (${view} view) for the fictional Bluevane Heating & Cooling`}
            width={v.width}
            height={v.height}
            sizes={v.sizes}
            className="svc-cmp-img"
          />
        </div>

        <div className="svc-cmp-layer svc-cmp-after">
          <Image
            src={v.after}
            alt={`After: the modern RMVS rebuild (${view} view) of the same fictional Bluevane Heating & Cooling website`}
            width={v.width}
            height={v.height}
            sizes={v.sizes}
            className="svc-cmp-img"
          />
        </div>

        <div className="svc-cmp-handle" aria-hidden="true">
          <span className="svc-cmp-grip">&lt;&gt;</span>
        </div>
        <input
          className="svc-cmp-range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(cut)}
          onChange={(e) => moveTo(Number(e.target.value))}
          aria-label="Comparison divider between the old website and the RMVS rebuild — arrow keys move the divider"
        />
      </div>

      <div className="svc-redline-controls">
        <button type="button" className="svc-btn svc-btn-ghost svc-btn-sm" onClick={() => moveTo(100, true)}>
          Show before
        </button>
        <span className="svc-mono-note">drag the divider or use the arrow keys</span>
        <button type="button" className="svc-btn svc-btn-ghost svc-btn-sm" onClick={() => moveTo(0, true)}>
          Show after
        </button>
      </div>

      <p className="svc-redline-disclaimer">
        Fictional website demonstration. The company, personnel, reviews,
        credentials, contact information, and service claims shown are
        illustrative and do not represent an actual RMVS client.
      </p>
    </div>
  );
}

/* ============================================================
   The redline brief — posts to the existing /api/contact route
   (email + SMS notification), with a honeypot for spam.
   Lead fires only after the backend accepts the submission;
   redline_started fires on first focus (diagnostic only).
   ============================================================ */

export function LeadBrief() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const startedRef = useRef(false);

  const onFirstFocus = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("RedlineStarted");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("company_fax")) return; // honeypot

    const name = String(data.get("name") || "").trim();
    const business = String(data.get("business") || "").trim();
    const email = String(data.get("email") || "").trim();
    const vertical = String(data.get("vertical") || "").trim();
    const site = String(data.get("current_site") || "").trim();

    setStatus("sending");
    setError("");
    const eventID = newEventId();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          event_id: eventID,
          subject: `Redline request — ${business || name}`,
          message: [
            `New homepage redline request from the services page.`,
            `Business: ${business || "(not provided)"}`,
            `Industry: ${vertical || "(not provided)"}`,
            `Current homepage: ${site || "(none — new build)"}`,
            utmSummaryLine(),
          ].join("\n"),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(json?.message || "Something went wrong — try again or book a call below.");
        return;
      }
      setStatus("ok");
      // Fires only after the backend accepted the form — dedupes against
      // the server-side Meta CAPI Lead via the shared event ID.
      trackEvent("ContactFormSubmit", { eventID });
      form.reset();
    } catch {
      setStatus("error");
      setError("Network hiccup — try again or book a call below.");
    }
  };

  return (
    <form className="svc-leadform" onSubmit={onSubmit} onFocus={onFirstFocus} noValidate={false}>
      <h3>Get your free homepage redline</h3>
      <p className="svc-mono-note" style={{ marginBottom: 20 }}>
        free · no call required · no obligation · replies same business day
      </p>

      {status === "ok" && (
        <div className="svc-form-ok" role="status">
          Got it — your redline is in the queue. You&apos;ll receive an
          annotated markup of your homepage and a proposed new hero by the
          next business day. Want to talk it through? Book a time below.
        </div>
      )}
      {status === "error" && (
        <div className="svc-form-err" role="alert">
          {error}
        </div>
      )}

      <div className="svc-field">
        <label htmlFor="svc-name">Your name</label>
        <input id="svc-name" name="name" type="text" className="input" autoComplete="name" required minLength={2} placeholder="Jordan Smith" />
      </div>
      <div className="svc-field">
        <label htmlFor="svc-biz">Business name</label>
        <input id="svc-biz" name="business" type="text" className="input" autoComplete="organization" required placeholder="Smith & Co. Plumbing" />
      </div>
      <div className="svc-field">
        <label htmlFor="svc-email">Email</label>
        <input id="svc-email" name="email" type="email" className="input" autoComplete="email" required placeholder="you@yourbusiness.com" />
      </div>
      <div className="svc-field">
        <label htmlFor="svc-type">What do you do?</label>
        <select id="svc-type" name="vertical" className="select" required defaultValue="">
          <option value="" disabled>
            Pick the closest
          </option>
          <option>Trades / home services</option>
          <option>Finance / lending / consulting</option>
          <option>Legal / accounting / insurance</option>
          <option>Health / dental / wellness</option>
          <option>Auto / detailing / shop</option>
          <option>Food / retail / other</option>
        </select>
      </div>
      <div className="svc-field">
        <label htmlFor="svc-site">Your current homepage (optional — no site yet is fine)</label>
        <input id="svc-site" name="current_site" type="url" className="input" placeholder="https://" />
      </div>

      <div className="svc-hp" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="company_fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="svc-btn svc-btn-primary" type="submit" style={{ width: "100%" }} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Redline my homepage"}
      </button>
    </form>
  );
}

/* ============================================================
   Cal.com embed that follows the site theme (and updates live
   when the toggle flips).
   ============================================================ */

const subscribeToTheme = (onChange: () => void) => {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

const readTheme = (): "dark" | "light" =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

// null on the server so we render a placeholder until the theme is known
const readServerTheme = (): "dark" | "light" | null => null;

export function CalEmbed({ calLink }: { calLink: string }) {
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, readServerTheme);

  if (!theme) return <div className="svc-cal-frame" style={{ height: 640 }} />;

  return (
    <div className="svc-cal-frame">
      <iframe
        key={theme}
        src={`${calLink}?embed=true&theme=${theme}`}
        title="Schedule a consultation with RMVS"
        style={{ width: "100%", height: 640, border: 0, display: "block" }}
        loading="lazy"
      />
    </div>
  );
}

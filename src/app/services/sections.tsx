import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { CalEmbed, LeadBrief, RedlineCompare } from "./ServicesInteractive";

/**
 * Shared /services sections, composed by both the full /services page and
 * the focused /redline ad landing pages. Sheet numbers are passed in so
 * each page can keep its own sequence.
 */

export const CAL_LINK = "https://cal.com/rory-monaghan-kip6qs/30min";

export function SheetTag({ no, label }: { no: string; label: string }) {
  return (
    <div className="svc-sheet-tag">
      <span className="svc-no">Sheet {no}</span> {label}
    </div>
  );
}

/* ── The Conversion Redline ─────────────────────────────────── */

const REDLINE_DIFFS = [
  ["Buried offer", "immediate answer"],
  ["Buried email link", "one-tap request and booking"],
  ["Trust below the fold", "proof beside the CTA"],
  ["Fixed-width desktop", "built for the phone"],
];

export function RedlineSheet({ no }: { no: string }) {
  return (
    <section className="svc-sheet" id="redline">
      <div className="container">
        <ScrollReveal>
          <SheetTag no={no} label="the conversion redline" />
          <h2 className="svc-h2">
            Same contractor. Same services. One site gets the call.
          </h2>
          <p className="svc-lede">
            Both sides use the exact same fictional HVAC company — the same
            services, contact details, credentials, and service area. Drag the
            divider to see what changes when customers can understand, trust,
            and act in seconds.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <RedlineCompare />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ul className="svc-redline-diffs" aria-label="What changes between the two sites">
            {REDLINE_DIFFS.map(([from, to]) => (
              <li key={from}>
                <span className="svc-diff-from">{from}</span>
                <span className="svc-diff-arrow" aria-hidden="true">
                  →
                </span>
                <span className="svc-diff-to">{to}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="svc-redline-offer">
            <h3>Want this comparison using your actual business?</h3>
            <p>
              Send your current homepage. You&apos;ll receive an annotated
              redline and a proposed new hero — not a generic sales report.
            </p>
            <a href="#book" className="svc-btn svc-btn-primary">
              Redline my homepage <span className="svc-arrow">›</span>
            </a>
            <span className="svc-mono-note">free · no call required · no obligation</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Field report: Fund Pilot ───────────────────────────────── */

export function FieldReportSheet({ no }: { no: string }) {
  return (
    <section className="svc-sheet svc-sheet-soft" id="work">
      <div className="container">
        <ScrollReveal>
          <SheetTag no={no} label="field report" />
        </ScrollReveal>
        <div className="svc-proof">
          <div>
            <ScrollReveal>
              <h2 className="svc-h2">
                Fund Pilot: from no website to a complete lead-and-payment
                funnel in five days.
              </h2>
              <p className="svc-lede">
                A nationwide SBA-lending consultancy needed social and ad
                traffic turned into qualified, paying consultations — not a
                brochure. They got a five-page conversion site with a
                qualification-gated intake form, booking integration, and a
                secure engagement-fee payment step, with their domain and
                email migrated with zero observed downtime.
              </p>
            </ScrollReveal>
            <div className="svc-case-stats">
              <ScrollReveal>
                <div className="svc-stat">
                  <b>5 days</b>
                  <span>brief → live site</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <div className="svc-stat">
                  <b>5 pages</b>
                  <span>+ qualifying intake</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <div className="svc-stat">
                  <b>0 min</b>
                  <span>observed email downtime</span>
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={200}>
              <p className="svc-mono-note" style={{ marginTop: 24 }}>
                see it live:{" "}
                <a
                  href="https://myfundpilot.com"
                  target="_blank"
                  rel="noopener"
                  className="svc-inline"
                >
                  myfundpilot.com →
                </a>{" "}
                · or{" "}
                <Link href="/projects" className="svc-inline">
                  the deeper portfolio →
                </Link>
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={120}>
            <a
              href="https://myfundpilot.com"
              target="_blank"
              rel="noopener"
              className="svc-case-shot"
              style={{ display: "block" }}
            >
              <Image
                src="/images/projects/fundpilot-home.png"
                alt="Fund Pilot — SBA lending site built by RMVS"
                width={1440}
                height={1000}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ── Process ────────────────────────────────────────────────── */

export function ProcessSheet({ no }: { no: string }) {
  return (
    <section className="svc-sheet svc-sheet-soft" id="process">
      <div className="container">
        <ScrollReveal>
          <SheetTag no={no} label="the build order" />
          <h2 className="svc-h2">Three steps. You never touch a DNS record.</h2>
        </ScrollReveal>
        <div className="svc-steps">
          <ScrollReveal>
            <div className="svc-step svc-step-hot">
              <span className="svc-step-no">STEP 01 — FREE</span>
              <h3>The redline</h3>
              <p>
                Send your current homepage (or just your business name). You
                get an annotated markup and a proposed new hero — what
                we&apos;d change and why — whether or not you hire us.
              </p>
              <span className="svc-step-time">free · next business day</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="svc-step">
              <span className="svc-step-no">STEP 02</span>
              <h3>The build</h3>
              <p>
                Full site, booking, forms, domain, business email, analytics,
                SSL — every technical piece wired and tested. You review it,
                we launch it.
              </p>
              <span className="svc-step-time">5 business days from kickoff</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="svc-step">
              <span className="svc-step-no">STEP 03</span>
              <h3>The engine</h3>
              <p>
                Then we keep it working for you: content posted, ads managed
                with hard budget caps, and a plain-English report every month.
              </p>
              <span className="svc-step-time">ongoing · cancel anytime</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ── Rate card ──────────────────────────────────────────────── */

const buildTiers = [
  {
    name: "Landing Strip",
    use: "one page that books calls",
    price: "$750",
    priceNote: "one-time",
    features: [
      "Single conversion page, built to sell",
      "Booking embed wired to your calendar",
      "Domain, SSL, and analytics handled",
      "Mobile-first, sub-second load",
    ],
    cta: { label: "Start a Landing Strip", href: "https://buy.stripe.com/cNibJ2e7K71zeMQ7H99bO04" },
  },
  {
    name: "Launch Site",
    use: "the full conversion engine",
    price: "from $1,500",
    priceNote: "50% deposit · 5 business days from kickoff",
    features: [
      "4–6 page conversion site with lead forms",
      "Qualification logic on your intake form",
      "Domain, email, and DNS migrated safely",
      "Booking, analytics, backups — all wired",
      "Launch checklist with evidence — nothing half-shipped",
    ],
    cta: { label: "Reserve with deposit", href: "https://buy.stripe.com/5kQ8wQ3t6bhPbAEgdF9bO05" },
    featured: true,
  },
];

const monthlyPlans = [
  {
    name: "Starter",
    use: "keep it live, keep it fast",
    price: "$50",
    priceNote: "per month",
    features: [
      "Hosting, maintenance & backups",
      "Custom domain + SSL",
      "Professional email setup",
      "Google Business + Apple Maps listings",
      "Uptime monitoring",
      "Up to 1 hour of content edits / month",
    ],
    href: "https://buy.stripe.com/00w28s5Be5XvfQU6D59bO00",
  },
  {
    name: "Growth",
    use: "get found, get reviewed, get booked",
    price: "$175",
    priceNote: "per month",
    features: [
      "Everything in Starter",
      "SEO setup + monthly report",
      "Analytics dashboard",
      "Review & reputation management",
      "Calendar / booking integration",
      "Up to 3 hours of site updates / month",
    ],
    href: "https://buy.stripe.com/28EbJ20gUdpXeMQ5z19bO01",
    featured: true,
  },
  {
    name: "Managed Demand",
    use: "we run your marketing engine",
    price: "from $400",
    priceNote: "per month + ad spend",
    flag: "Founding client rate",
    features: [
      "Everything in Growth",
      "8 social posts / month across 2 channels",
      "One managed ad channel (Meta or Google) — 1 campaign, up to 3 creative variants / month",
      "Ad spend billed directly to you — $300+/month recommended",
      "AI chat agent on your site (usage billed at cost)",
      "Lead tracking + monthly plain-English report",
    ],
    href: "https://buy.stripe.com/14A28sbZCclT48c7H99bO02",
  },
];

export function RateCardSheet({ no }: { no: string }) {
  return (
    <section className="svc-sheet" id="pricing">
      <div className="container">
        <ScrollReveal>
          <SheetTag no={no} label="the rate card" />
          <h2 className="svc-h2">Flat numbers. No mystery invoices.</h2>
          <p className="svc-lede">
            Fixed price, fixed scope, evidence-backed delivery. The five-day
            clock starts at kickoff — once the deposit and your required
            materials are in. Every build starts with a free redline if
            you&apos;d rather see the plan first.
          </p>
        </ScrollReveal>

        <div className="svc-tiers">
          {buildTiers.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div className={`svc-tier${t.featured ? " svc-tier-feat" : ""}`} style={{ height: "100%" }}>
                {t.featured && <span className="svc-tier-flag">Most builds</span>}
                <h3>{t.name}</h3>
                <p className="svc-tier-use">{t.use}</p>
                <p className="svc-price">
                  {t.price} <small>{t.priceNote}</small>
                </p>
                <ul>
                  {t.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a href={t.cta.href} className={`svc-btn ${t.featured ? "svc-btn-primary" : "svc-btn-ghost"}`}>
                  {t.cta.label}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <h2 className="svc-h2" style={{ marginTop: 72 }}>
            Monthly plans, defined scope
          </h2>
          <p className="svc-lede">
            Attach to any build — or bring the site you already have. Ad spend
            is always separate from management fees. Cancel any month with 30
            days&apos; notice; you keep the site, domain, and every account.
          </p>
        </ScrollReveal>
        <div className="svc-tiers">
          {monthlyPlans.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div className={`svc-tier${t.featured ? " svc-tier-feat" : ""}`} style={{ height: "100%" }}>
                {t.featured && <span className="svc-tier-flag">Best value</span>}
                {"flag" in t && t.flag && !t.featured && <span className="svc-tier-flag svc-tier-flag-alt">{t.flag}</span>}
                <h3>{t.name}</h3>
                <p className="svc-tier-use">{t.use}</p>
                <p className="svc-price">
                  {t.price} <small>{t.priceNote}</small>
                </p>
                <ul>
                  {t.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a href={t.href} className="svc-btn svc-btn-ghost">
                  Subscribe
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p className="svc-rate-note svc-mono-note">
          managed demand scope flexes with posting volume, creative needs, and
          media budget — final scope is confirmed in writing before you pay ·{" "}
          <a href="#book" className="svc-inline">
            start with the free redline
          </a>
        </p>
      </div>
    </section>
  );
}

/* ── Everything technical is handled ────────────────────────── */

export function TechnicalSheet({ no }: { no: string }) {
  return (
    <section className="svc-sheet svc-plate-section" id="systems">
      <div className="container">
        <SheetTag no={no} label="the boring parts" />
        <h2 className="svc-h2">Everything technical is handled.</h2>
        <p className="svc-lede">
          Domain, hosting, security, email, booking, forms, analytics,
          backups, and migrations are configured and tested for you. You
          retain ownership and receive every login. If it has settings, we
          own the settings — you just never have to touch them.
        </p>

        <details className="svc-tech-details">
          <summary>Technical details — for the curious</summary>
          <div className="svc-tech-body">
            <div className="svc-diag-paths">
              <div className="svc-diag-path svc-path-a">
                <span className="svc-k">PATH A — KEEP WHAT WORKS</span>
                <h3>We wire around it.</h3>
                <p>
                  Happy with your registrar and email? They stay. We plug the
                  new site into your existing systems and touch nothing else.
                </p>
              </div>
              <div className="svc-diag-path svc-path-b">
                <span className="svc-k">PATH B — MIGRATE SAFELY</span>
                <h3>Zero-downtime moves.</h3>
                <p>
                  Domain, email, and DNS moved to the recommended stack —
                  exports and screenshots taken before we touch anything,
                  inbox never blinks.
                </p>
              </div>
              <div className="svc-diag-path svc-path-c">
                <span className="svc-k">PATH C — START FRESH</span>
                <h3>Everything from scratch.</h3>
                <p>
                  No domain, no email, no site? We stand up the whole stack in
                  a week — and hand you the logins to all of it.
                </p>
              </div>
            </div>
            <p className="svc-tech-stack">
              Under the hood: AWS hosting on Amazon&apos;s CloudFront edge
              network — the same delivery rails behind the largest sites on
              the internet — with Route&nbsp;53 DNS, SSL on by default,
              automated backups, Stripe payments, Cal.com booking, Google
              Workspace email, Plausible analytics, and monitoring that pages
              us, not you, if anything blinks. Your domain, files, and
              accounts stay yours — if we ever part ways, everything walks
              with you.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────────────── */

const FAQS = [
  {
    q: "What does “everything handled” actually mean?",
    a: "Domain, DNS, hosting, SSL, business email, booking, forms, analytics, backups, and the migrations between them. If it has settings, we own the settings. You get logins to everything — you just never have to use them.",
  },
  {
    q: "Do I own the site, or do you?",
    a: "You do. Your domain, your files, your ad accounts, your data. If you ever leave, everything transfers cleanly — we'd rather earn the renewal than trap you into it.",
  },
  {
    q: "What if I already have a website?",
    a: "Even better — that's exactly what the free redline is for. Send your current homepage and you'll get an annotated markup showing exactly what we'd change before you decide anything.",
  },
  {
    q: "How fast is “fast”?",
    a: "A Landing Strip goes live within a week. A full Launch Site ships in five business days from kickoff — kickoff being the point where the deposit and your required materials (logo, photos, service details) are in. Every launch comes with a checklist and receipts for each wired-up piece: DNS, email, analytics, booking, payments.",
  },
  {
    q: "Is ad spend included in the monthly plans?",
    a: "No — ad spend is always separate and billed directly to your own ad account, so you see exactly what the platforms charge. Management fees cover strategy, creative, and reporting. We recommend at least $300/month in media budget before turning ads on.",
  },
  {
    q: "Who am I actually working with?",
    a: "Rory Monaghan — founder of RMVS in Pittsburgh — plus the systems behind him. One point of contact, same-day replies during business hours. No account managers, no ticket queues.",
  },
];

export function FaqSheet({ no }: { no: string }) {
  return (
    <section className="svc-sheet" id="faq">
      <div className="container">
        <ScrollReveal>
          <SheetTag no={no} label="straight answers" />
          <h2 className="svc-h2" style={{ margin: "0 auto 8px", textAlign: "center", maxWidth: "none" }}>
            Things owners ask us.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="svc-faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="svc-a">{f.a}</div>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Start here: founder + redline form + booking ───────────── */

export function BookSheet({ no }: { no: string }) {
  return (
    <section className="svc-sheet svc-sheet-soft" id="book">
      <div className="container">
        <ScrollReveal>
          <SheetTag no={no} label="start here" />
        </ScrollReveal>
        <div className="svc-cta-grid">
          <ScrollReveal>
            <div>
              <h2 className="svc-h2">Two minutes of your time. A redline by tomorrow.</h2>
              <p className="svc-lede">
                Send the form and you&apos;ll get an annotated markup of your
                current homepage with a proposed new hero — no payment, no
                pressure, no obligation. Prefer to talk first? Book straight
                onto the calendar below. Same person either way.
              </p>
              <div className="svc-founder">
                <Image
                  src="/images/rory-founder.png"
                  alt="Rory Monaghan, founder of RMVS"
                  width={140}
                  height={140}
                  className="svc-founder-photo"
                />
                <div>
                  <b>You work directly with Rory.</b>
                  <p>
                    Pittsburgh-based founder, developer, and marketer. One
                    point of contact from the first redline through launch and
                    ongoing management.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <LeadBrief />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={150}>
          <CalEmbed calLink={CAL_LINK} />
          <p className="svc-mono-note" style={{ marginTop: 14 }}>
            calendar not loading?{" "}
            <a href={CAL_LINK} target="_blank" rel="noopener" className="svc-inline">
              open the booking page directly →
            </a>{" "}
            or{" "}
            <Link href="/contact" className="svc-inline">
              send a message
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Closer ─────────────────────────────────────────────────── */

export function GetStartedCloser() {
  return (
    <section className="svc-getstarted" aria-label="Ready to get started?">
      <div className="container svc-gs-grid">
        <ScrollReveal>
          <div>
            <h2 className="svc-h2">Ready to see your redline?</h2>
            <p className="svc-lede">
              Send the two-minute form and get an annotated markup of your
              homepage by the next business day — or book a free consult and
              talk it through first.
            </p>
            <div className="svc-gs-ctas">
              <a href="#book" className="svc-btn svc-btn-primary">
                Get my free homepage redline <span className="svc-arrow">›</span>
              </a>
              <a href={CAL_LINK} target="_blank" rel="noopener" className="svc-btn svc-btn-ghost">
                Book a free consult
              </a>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="svc-gs-link">
            <span className="svc-gs-icon" aria-hidden="true">$</span>
            <b>See what you&apos;ll pay</b>
            <p>Flat build prices and defined monthly plans — no hidden fees, no mystery invoices.</p>
            <a href="#pricing" className="svc-inline">
              Pricing details ›
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={180}>
          <div className="svc-gs-link">
            <span className="svc-gs-icon" aria-hidden="true">⇆</span>
            <b>Already have a site?</b>
            <p>See the before/after comparison — then get the same treatment on your own homepage.</p>
            <a href="#redline" className="svc-inline">
              See the redline ›
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

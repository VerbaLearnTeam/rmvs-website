import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import {
  CalEmbed,
  CompareSlider,
  LeadBrief,
  ScrollHero,
} from "./ServicesInteractive";
import GoldEmblem from "./GoldEmblem";
import "./services.css";

export const metadata = {
  title: "Services | RMonaghan Venture Studios",
  description:
    "RMVS builds the website that books your calls, then runs the marketing that fills it. Fixed-price builds on AWS infrastructure, monthly growth plans, and one accountable person — start with a free consult.",
};

const CAL_LINK = "https://cal.com/rory-monaghan-kip6qs/30min";

const STACK = [
  { name: "AWS", role: "hosting" },
  { name: "CloudFront", role: "global CDN" },
  { name: "Route 53", role: "DNS" },
  { name: "Stripe", role: "payments" },
  { name: "Google Workspace", role: "email" },
  { name: "Cal.com", role: "booking" },
  { name: "Plausible", role: "analytics" },
  { name: "Resend", role: "transactional email" },
];

const EXISTING_SYSTEMS = [
  { name: "Domain registrar", detail: "GoDaddy · Squarespace · Bluehost" },
  { name: "Email", detail: "Gmail · Outlook · iCloud custom domain" },
  { name: "Current website", detail: "Wix · WordPress · nothing at all" },
  { name: "Booking & CRM", detail: "Calendly · spreadsheets · a notebook" },
  { name: "Payments", detail: "Square · PayPal · paper invoices" },
];

const RMVS_STACK = [
  { name: "AWS CloudFront", detail: "global CDN hosting" },
  { name: "Route 53", detail: "DNS you never think about" },
  { name: "Google Workspace", detail: "professional email" },
  { name: "Cal.com", detail: "booking on your calendar" },
  { name: "Stripe", detail: "payments & invoicing" },
];

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
    priceNote: "50% deposit to start · 5-day SLA",
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
      "Hosting & maintenance",
      "Custom domain + SSL",
      "Professional email setup",
      "Google Business + Apple Maps",
      "Uptime monitoring",
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
      "SEO setup + monthly reporting",
      "Analytics dashboard",
      "Review & reputation management",
      "Calendar / booking integration",
    ],
    href: "https://buy.stripe.com/28EbJ20gUdpXeMQ5z19bO01",
    featured: true,
  },
  {
    name: "Premium",
    use: "we run your whole digital presence",
    price: "$400",
    priceNote: "per month",
    features: [
      "Everything in Growth",
      "Social media management",
      "Facebook & Instagram ads",
      "AI chat agent on your site",
      "Email marketing & automations",
    ],
    href: "https://buy.stripe.com/14A28sbZCclT48c7H99bO02",
  },
];

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
    a: "Even better — send it with the brief. We'll redline your current homepage so you can see exactly what we'd change before deciding anything.",
  },
  {
    q: "How fast is “fast”?",
    a: "A Landing Strip goes live within a week. A full Launch Site carries a 5-business-day SLA from deposit, with a launch checklist and receipts for every wired-up piece — DNS, email, analytics, booking, payments.",
  },
  {
    q: "Who am I actually working with?",
    a: "Rory Monaghan — founder of RMVS in Pittsburgh — plus the systems behind him. One point of contact, same-day replies during business hours. No account managers, no ticket queues.",
  },
];

export default function ServicesPage() {
  return (
    <main className="svc">
      {/* ── Sheet 01: scroll-expansion hero ─────────────────── */}
      <ScrollHero />

      {/* ── Rails: the stack marquee ────────────────────────── */}
      <section className="svc-rails" aria-label="Infrastructure RMVS sites run on">
        <div className="svc-rails-label">your site runs on the same rails as the big guys</div>
        <div className="svc-marquee">
          <div className="svc-marquee-track">
            {[...STACK, ...STACK].map((s, i) => (
              <span className="svc-railmark" key={`${s.name}-${i}`} aria-hidden={i >= STACK.length}>
                {s.name} <small>{s.role}</small>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sheet 02: the redline ───────────────────────────── */}
      <section className="svc-sheet" id="redline">
        <div className="container">
          <ScrollReveal>
            <div className="svc-sheet-tag">
              <span className="svc-no">Sheet 02</span> the redline
            </div>
            <h2 className="svc-h2">Drag the line. That&apos;s the whole pitch.</h2>
            <p className="svc-lede">
              On the left, the site most service businesses are stuck with. On
              the right, the one we ship in five days. Same business, same
              information — different outcome.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <CompareSlider />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Sheet 03: the build order ───────────────────────── */}
      <section className="svc-sheet svc-sheet-soft" id="process">
        <div className="container">
          <ScrollReveal>
            <div className="svc-sheet-tag">
              <span className="svc-no">Sheet 03</span> the build order
            </div>
            <h2 className="svc-h2">Three steps. You never touch a DNS record.</h2>
          </ScrollReveal>
          <div className="svc-steps">
            <ScrollReveal>
              <div className="svc-step svc-step-hot">
                <span className="svc-step-no">STEP 01 — FREE</span>
                <h3>The consult</h3>
                <p>
                  Thirty minutes on your business and your funnel. You leave
                  knowing exactly what we&apos;d build, what it costs, and when
                  it ships — whether or not you hire us.
                </p>
                <span className="svc-step-time">30 minutes · free</span>
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
                <span className="svc-step-time">5 business days</span>
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

      {/* ── Sheet 04: systems diagram (navy plate) ──────────── */}
      <section className="svc-sheet svc-plate-section svc-plate-dots" id="systems">
        <div className="container">
          <div className="svc-sheet-tag">
            <span className="svc-no">Sheet 04</span> your systems, your call
          </div>
          <h2 className="svc-h2">Keep it. Migrate it. Or start clean.</h2>
          <p className="svc-lede">
            Whatever you&apos;re running today — registrar, email, booking,
            payments — we either wire around it, migrate it to the recommended
            stack with zero downtime, or stand everything up from scratch.
            Your choice, mapped in the free consult.
          </p>

          <div className="svc-diag" aria-label="Diagram: RMVS connects your existing systems to the recommended stack">
            <div className="svc-diag-col svc-diag-left">
              <span className="svc-diag-col-label">What you have now</span>
              {EXISTING_SYSTEMS.map((s) => (
                <div className="svc-chip" key={s.name}>
                  <b>{s.name}</b>
                  <small>{s.detail}</small>
                </div>
              ))}
            </div>

            <div className="svc-diag-mid">
              <span className="svc-diag-hub-note">audit</span>
              <div className="svc-diag-hub">RMVS</div>
              <span className="svc-diag-hub-note">wire · migrate · build</span>
            </div>

            <div className="svc-diag-col svc-diag-right">
              <span className="svc-diag-col-label">The recommended stack</span>
              {RMVS_STACK.map((s) => (
                <div className="svc-chip" key={s.name}>
                  <b>{s.name}</b>
                  <small>{s.detail}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="svc-diag-paths">
            <div className="svc-diag-path svc-path-a">
              <span className="svc-k">PATH A — KEEP WHAT WORKS</span>
              <h3>We wire around it.</h3>
              <p>
                Happy with your registrar and email? They stay. We plug the new
                site into your existing systems and touch nothing else.
              </p>
            </div>
            <div className="svc-diag-path svc-path-b">
              <span className="svc-k">PATH B — MIGRATE SAFELY</span>
              <h3>Zero-downtime moves.</h3>
              <p>
                Domain, email, and DNS moved to the recommended stack — exports
                and screenshots taken before we touch anything, inbox never
                blinks.
              </p>
            </div>
            <div className="svc-diag-path svc-path-c">
              <span className="svc-k">PATH C — START FRESH</span>
              <h3>Everything from scratch.</h3>
              <p>
                No domain, no email, no site? We stand up the whole stack in a
                week — and hand you the logins to all of it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sheet 05: the rate card ─────────────────────────── */}
      <section className="svc-sheet" id="pricing">
        <div className="container">
          <ScrollReveal>
            <div className="svc-sheet-tag">
              <span className="svc-no">Sheet 05</span> the rate card
            </div>
            <h2 className="svc-h2">Flat numbers. No mystery invoices.</h2>
            <p className="svc-lede">
              Fixed price, fixed scope, evidence-backed delivery. Deposit starts
              the clock; every build starts with a free consult if you&apos;d
              rather talk first.
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
              Monthly growth plans
            </h2>
            <p className="svc-lede">
              Attach to any build — or bring the site you already have.
            </p>
          </ScrollReveal>
          <div className="svc-tiers">
            {monthlyPlans.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div className={`svc-tier${t.featured ? " svc-tier-feat" : ""}`} style={{ height: "100%" }}>
                  {t.featured && <span className="svc-tier-flag">Best value</span>}
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
                  <a href={t.href} className={`svc-btn ${t.featured ? "svc-btn-primary" : "svc-btn-ghost"}`}>
                    Subscribe
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="svc-rate-note svc-mono-note">
            need the whole engine — site, care, content, and managed ads? ·{" "}
            <a href="#book" className="svc-inline">
              book a consult
            </a>{" "}
            and we&apos;ll scope it around your business
          </p>
        </div>
      </section>

      {/* ── Sheet 06: delivery network (navy plate) ─────────── */}
      <section className="svc-sheet svc-plate-section" id="network">
        <div className="container">
          <div className="svc-sheet-tag">
            <span className="svc-no">Sheet 06</span> delivery network
          </div>
          <div className="svc-globe-wrap">
            <GoldEmblem />
            <div>
              <h2 className="svc-h2">
                Small business.
                <br />
                Big-league infrastructure.
              </h2>
              <p className="svc-lede">
                Your site is served from Amazon&apos;s CloudFront edge network —
                the same delivery rails behind the largest sites on the internet
                — so it opens instantly whether your customer is across the
                street or across the country.
              </p>
              <div className="svc-net-list">
                <div className="svc-net-item">
                  <span className="svc-k">EDGE</span>
                  <p>
                    Copies of your site cached at hundreds of locations
                    worldwide. Milliseconds away from everyone.
                  </p>
                </div>
                <div className="svc-net-item">
                  <span className="svc-k">SECURE</span>
                  <p>
                    SSL on by default, backups, and monitoring that pages us —
                    not you — if anything blinks.
                  </p>
                </div>
                <div className="svc-net-item">
                  <span className="svc-k">YOURS</span>
                  <p>
                    Your domain, your files, your accounts. If we ever part
                    ways, everything walks with you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sheet 07: field report ──────────────────────────── */}
      <section className="svc-sheet svc-sheet-soft" id="work">
        <div className="container">
          <ScrollReveal>
            <div className="svc-sheet-tag">
              <span className="svc-no">Sheet 07</span> field report
            </div>
          </ScrollReveal>
          <div className="svc-proof">
            <div>
              <ScrollReveal>
                <h2 className="svc-h2">
                  Fund Pilot: from zero web presence to booking machine.
                </h2>
                <p className="svc-lede">
                  A nationwide SBA-lending consultancy needed social and ad
                  traffic turned into qualified, paying consultations — not a
                  brochure. They got a five-page conversion site with a
                  qualification-gated intake form, their email and domain
                  migrated without a minute of downtime, and a scheduler doing
                  the follow-up automatically.
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
                    <span>email downtime in migration</span>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={200}>
                <p className="svc-mono-note" style={{ marginTop: 24 }}>
                  want the deeper portfolio?{" "}
                  <Link href="/projects" className="svc-inline">
                    see all projects →
                  </Link>
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={120}>
              <div className="svc-case-shot">
                <Image
                  src="/images/projects/fundpilot-home.png"
                  alt="Fund Pilot — SBA lending site built by RMVS"
                  width={1440}
                  height={1000}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Sheet 08: straight answers ──────────────────────── */}
      <section className="svc-sheet" id="faq">
        <div className="container">
          <ScrollReveal>
            <div className="svc-sheet-tag">
              <span className="svc-no">Sheet 08</span> straight answers
            </div>
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

      {/* ── Sheet 09: start here ────────────────────────────── */}
      <section className="svc-sheet svc-sheet-soft" id="book">
        <div className="container">
          <ScrollReveal>
            <div className="svc-sheet-tag">
              <span className="svc-no">Sheet 09</span> start here
            </div>
          </ScrollReveal>
          <div className="svc-cta-grid">
            <ScrollReveal>
              <div>
                <h2 className="svc-h2">Two minutes of your time. A plan by tomorrow.</h2>
                <p className="svc-lede">
                  Send the brief and you&apos;ll get a straight answer on what
                  we&apos;d build, what it costs, and when it ships — no
                  payment, no pressure, no obligation. Prefer to talk first?
                  Book straight onto the calendar below. Same person either way.
                </p>
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

      {/* ── Ready to get started? (Stripe-style closer) ─────── */}
      <section className="svc-getstarted" aria-label="Ready to get started?">
        <div className="container svc-gs-grid">
          <ScrollReveal>
            <div>
              <h2 className="svc-h2">Ready to get started?</h2>
              <p className="svc-lede">
                Book a free consult, or send the two-minute brief and get a
                plan by tomorrow — scope, price, and ship date in plain
                English.
              </p>
              <div className="svc-gs-ctas">
                <a href={CAL_LINK} target="_blank" rel="noopener" className="svc-btn svc-btn-primary">
                  Book a free consult <span className="svc-arrow">›</span>
                </a>
                <a href="#book" className="svc-btn svc-btn-ghost">
                  Send the brief
                </a>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="svc-gs-link">
              <span className="svc-gs-icon" aria-hidden="true">$</span>
              <b>See what you&apos;ll pay</b>
              <p>Flat build prices and monthly plans — no hidden fees, no mystery invoices.</p>
              <a href="#pricing" className="svc-inline">
                Pricing details ›
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <div className="svc-gs-link">
              <span className="svc-gs-icon" aria-hidden="true">⇆</span>
              <b>Already have a site?</b>
              <p>Send it with the brief — we&apos;ll redline your homepage before you decide anything.</p>
              <a href="#redline" className="svc-inline">
                See the redline ›
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

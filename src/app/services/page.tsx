import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Services | RMonaghan Venture Studios",
  description:
    "RMVS builds conversion-focused websites and lead engines for service-business owners — then runs the marketing that fills them. Fixed-price builds, monthly growth plans, and a booking link to start today.",
};

const CAL_LINK = "https://cal.com/rory-monaghan-kip6qs/30min";

const buildTiers = [
  {
    name: "Landing Strip",
    price: "$750",
    priceNote: "one-time",
    blurb:
      "A one-page conversion site: your offer, proof, and a booking button — live fast, measured from day one.",
    features: [
      "Single-page conversion site",
      "Booking embed + lead form",
      "Analytics installed & verified",
      "Mobile-first, sub-second load",
    ],
    cta: { label: "Start a Landing Strip", href: "https://buy.stripe.com/cNibJ2e7K71zeMQ7H99bO04" },
  },
  {
    name: "Launch Site",
    price: "from $1,500",
    priceNote: "50% deposit to start · 5-day SLA",
    blurb:
      "The full engine: a 4–6 page conversion site with qualification-gated intake forms, booking, and your domain + email handled end-to-end.",
    features: [
      "4–6 page conversion site",
      "Lead forms with qualification logic",
      "DNS + professional email, done-for-you",
      "Launch checklist with evidence — nothing half-shipped",
    ],
    cta: { label: "Reserve with deposit", href: "https://buy.stripe.com/5kQ8wQ3t6bhPbAEgdF9bO05" },
    featured: true,
  },
];

const monthlyPlans = [
  {
    name: "Starter",
    price: "$50/mo",
    blurb: "Keep it live, keep it running.",
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
    price: "$175/mo",
    blurb: "Get found, get reviewed, get booked.",
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
    price: "$400/mo",
    blurb: "We run your entire digital presence.",
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

const flagshipPoints = [
  "Five-page conversion site with a qualification-gated intake form — bad-fit leads filter themselves out before they reach the calendar",
  "Booking, payments, and scheduling wired in (Cal.com + Stripe)",
  "Domain, professional email, and DNS migration handled with zero downtime",
  "Analytics and conversion tracking on every step of the funnel",
];

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container">
          <span className="badge">Agency Services</span>
          <h1 style={{ maxWidth: "18ch" }}>
            Websites that turn traffic into booked calls.
          </h1>
          <p className="muted" style={{ fontSize: "1.15rem", maxWidth: "58ch", marginTop: 16 }}>
            RMVS builds conversion-focused websites and lead engines for
            service-business owners — then runs the marketing that fills them.
            Not brochures. Landing strips that take a visitor from a social post
            or a search to a booked call on your calendar.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            <a href="#book" className="btn">
              Book a free consult
            </a>
            <a href="#packages" className="btn btn-outline">
              See packages
            </a>
          </div>
        </div>
      </section>

      {/* Flagship work */}
      <section className="section" id="work">
        <div className="container">
          <h2>Recent build: Fund Pilot</h2>
          <p className="muted" style={{ maxWidth: "62ch", marginBottom: 24 }}>
            An SBA-lending consultancy needed social and ad traffic turned into
            qualified, paying consultations. We designed the brand system from
            their logo up, built the site, and engineered the funnel.
          </p>
          <div className="split" style={{ alignItems: "center" }}>
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--glass-border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <Image
                src="/images/projects/fundpilot-home.png"
                alt="Fund Pilot — SBA lending site built by RMVS"
                width={1440}
                height={1000}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            <div className="panel">
              <h3>What shipped</h3>
              <ul className="feature-list">
                {flagshipPoints.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="muted" style={{ marginTop: 16, fontSize: "0.9rem" }}>
                Want the deeper portfolio?{" "}
                <Link href="/projects" style={{ color: "var(--cyan)" }}>
                  See all projects →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" id="testimonials">
        <div className="container">
          <h2>What clients say</h2>
          <div className="cards" style={{ marginTop: 24 }}>
            <div className="card">
              <h3 style={{ fontSize: "2rem", color: "var(--cyan)" }}>5 days</h3>
              <p className="muted">
                Concept to live first draft on the Fund Pilot build — brand
                system, five pages, qualification-gated intake, booking, and
                payments included.
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: "2rem", color: "var(--cyan)" }}>1 referral</h3>
              <p className="muted">
                Every RMVS client so far has come through word of mouth. We
                build so you&apos;ll want to tell someone — and we&apos;ll ask you to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section" id="packages">
        <div className="container">
          <h2>Builds</h2>
          <p className="muted" style={{ marginBottom: 24 }}>
            Fixed price, fixed scope, evidence-backed delivery. Deposit starts
            the clock.
          </p>
          <div className="cards">
            {buildTiers.map((t) => (
              <div
                key={t.name}
                className="card"
                style={t.featured ? { borderColor: "var(--cyan-border)", boxShadow: "var(--shadow-glow)" } : undefined}
              >
                {t.featured && <span className="badge">Most popular</span>}
                <h3>{t.name}</h3>
                <p style={{ fontSize: "1.6rem", fontWeight: 700, margin: "8px 0 2px" }}>{t.price}</p>
                <p className="muted" style={{ fontSize: "0.85rem" }}>{t.priceNote}</p>
                <p className="muted" style={{ margin: "14px 0" }}>{t.blurb}</p>
                <ul className="feature-list">
                  {t.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a href={t.cta.href} className="btn" style={{ marginTop: 18, display: "inline-block" }}>
                  {t.cta.label}
                </a>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: 56 }}>Monthly growth plans</h2>
          <p className="muted" style={{ marginBottom: 24 }}>
            Attach to any build — or bring the site you already have.
          </p>
          <div className="cards">
            {monthlyPlans.map((t) => (
              <div
                key={t.name}
                className="card"
                style={t.featured ? { borderColor: "var(--cyan-border)", boxShadow: "var(--shadow-glow)" } : undefined}
              >
                {t.featured && <span className="badge">Best value</span>}
                <h3>{t.name}</h3>
                <p style={{ fontSize: "1.6rem", fontWeight: 700, margin: "8px 0 2px" }}>{t.price}</p>
                <p className="muted" style={{ margin: "10px 0" }}>{t.blurb}</p>
                <ul className="feature-list">
                  {t.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a href={t.href} className="btn" style={{ marginTop: 18, display: "inline-block" }}>
                  Subscribe
                </a>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 20, fontSize: "0.9rem" }}>
            Need the whole engine — site, care, content, and managed ads?{" "}
            <a href="#book" style={{ color: "var(--cyan)" }}>
              Book a consult
            </a>{" "}
            and we&apos;ll scope a Growth Stack around your business.
          </p>
        </div>
      </section>

      {/* Booking */}
      <section className="section" id="book">
        <div className="container">
          <h2>Book a free 30-minute consult</h2>
          <p className="muted" style={{ maxWidth: "58ch", marginBottom: 24 }}>
            Bring your current site (or the idea for one). You&apos;ll leave the
            call knowing exactly what we&apos;d build, what it costs, and when it
            ships — whether or not you hire us.
          </p>
          <div
            style={{
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--glass-border)",
              background: "var(--bg-card)",
            }}
          >
            <iframe
              src={`${CAL_LINK}?embed=true&theme=dark`}
              title="Schedule a consultation with RMVS"
              style={{ width: "100%", height: 640, border: 0, display: "block" }}
              loading="lazy"
            />
          </div>
          <p className="muted" style={{ marginTop: 14, fontSize: "0.9rem" }}>
            Calendar not loading?{" "}
            <a href={CAL_LINK} target="_blank" rel="noopener" style={{ color: "var(--cyan)" }}>
              Open the booking page directly →
            </a>{" "}
            or <Link href="/contact" style={{ color: "var(--cyan)" }}>send a message</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

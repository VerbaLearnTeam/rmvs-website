import Image from "next/image";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { LeadBrief } from "../services/ServicesInteractive";
import {
  CAL_LINK,
  FieldReportSheet,
  ProcessSheet,
  RateCardSheet,
  RedlineSheet,
} from "../services/sections";
import "../services/services.css";

/**
 * Focused landing page for paid traffic (/redline and industry variants).
 * One dominant action — the free homepage redline — with the comparison,
 * real proof, pricing, process, objections, and the form. No marquee, no
 * infrastructure tour, no unrelated portfolio content before conversion.
 */

export interface RedlineVariant {
  slug: string | null;
  headline: string;
  sub: string;
  eyebrow: string;
}

export const REDLINE_VARIANTS: Record<string, RedlineVariant> = {
  hvac: {
    slug: "hvac",
    eyebrow: "RMVS · websites for HVAC businesses",
    headline: "Websites for HVAC businesses that turn clicks into booked jobs.",
    sub: "A five-day rebuild with click-to-call, online booking, and the proof homeowners look for — handled end to end while you stay on the tools.",
  },
  roofing: {
    slug: "roofing",
    eyebrow: "RMVS · websites for roofing companies",
    headline: "Websites for roofing companies that turn clicks into booked estimates.",
    sub: "A five-day rebuild with click-to-call, estimate booking, and the proof homeowners look for — handled end to end while you stay on the roof.",
  },
  plumbing: {
    slug: "plumbing",
    eyebrow: "RMVS · websites for plumbing companies",
    headline: "Websites for plumbers that turn clicks into booked calls.",
    sub: "A five-day rebuild with click-to-call, online booking, and the proof homeowners look for — handled end to end while you stay on the job.",
  },
  landscaping: {
    slug: "landscaping",
    eyebrow: "RMVS · websites for landscaping companies",
    headline: "Websites for landscapers that turn clicks into booked quotes.",
    sub: "A five-day rebuild with click-to-call, quote requests, and the proof homeowners look for — handled end to end while you stay in the field.",
  },
};

export const DEFAULT_VARIANT: RedlineVariant = {
  slug: null,
  eyebrow: "RMVS · websites + growth systems for service businesses",
  headline: "A five-day website built to turn local clicks into booked jobs.",
  sub: "RMVS handles the website, booking, forms, analytics, domain, and launch. You work directly with Rory — not an account manager or ticket queue.",
};

const OBJECTIONS = [
  {
    q: "Do I own the site, or do you?",
    a: "You do. Your domain, your files, your ad accounts, your data. If you ever leave, everything transfers cleanly.",
  },
  {
    q: "How fast is “fast”?",
    a: "Five business days from kickoff — kickoff being the point where the deposit and your required materials (logo, photos, service details) are in.",
  },
  {
    q: "How much work will I have to do?",
    a: "About an hour: the two-minute form, one kickoff conversation, and a review of the finished site before launch. Everything technical is handled for you.",
  },
  {
    q: "Is ad spend included in the monthly plans?",
    a: "No — ad spend is always separate and billed directly to your own ad account. Management fees cover strategy, creative, and reporting.",
  },
];

export function RedlineLanding({ variant }: { variant: RedlineVariant }) {
  return (
    <main className="svc">
      {/* Direct hero — no scroll theater on the ad path */}
      <section className="svc-sheet svc-adhero">
        <div className="container">
          <div className="svc-hero-eyebrow" style={{ textAlign: "left" }}>
            {variant.eyebrow}
          </div>
          <h1 className="svc-adhero-title">{variant.headline}</h1>
          <p className="svc-lede">{variant.sub}</p>
          <div className="svc-gs-ctas">
            <a href="#book" className="svc-btn svc-btn-primary">
              Get my free homepage redline <span className="svc-arrow">›</span>
            </a>
            <a href="#pricing" className="svc-btn svc-btn-ghost">
              See pricing
            </a>
          </div>
          <div className="svc-hero-price-anchor">
            landing pages from $750 · full sites from $1,500 · you own everything
          </div>
        </div>
      </section>

      <RedlineSheet no="01" />
      <FieldReportSheet no="02" />
      <RateCardSheet no="03" />
      <ProcessSheet no="04" />

      {/* Ownership, timing, and common objections */}
      <section className="svc-sheet" id="faq">
        <div className="container">
          <ScrollReveal>
            <h2 className="svc-h2" style={{ margin: "0 auto 8px", textAlign: "center", maxWidth: "none" }}>
              Ownership, timing, and the fine print.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="svc-faq">
              {OBJECTIONS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="svc-a">{f.a}</div>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Redline form + founder identity */}
      <section className="svc-sheet svc-sheet-soft" id="book">
        <div className="container">
          <div className="svc-cta-grid">
            <ScrollReveal>
              <div>
                <h2 className="svc-h2">Two minutes of your time. A redline by tomorrow.</h2>
                <p className="svc-lede">
                  Send the form and you&apos;ll get an annotated markup of your
                  current homepage with a proposed new hero — no payment, no
                  pressure, no obligation.
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
                      point of contact from the first redline through launch
                      and ongoing management.
                    </p>
                  </div>
                </div>
                <p className="svc-mono-note" style={{ marginTop: 18 }}>
                  prefer to talk first?{" "}
                  <a href={CAL_LINK} target="_blank" rel="noopener" className="svc-inline">
                    book a free consult →
                  </a>
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <LeadBrief />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}

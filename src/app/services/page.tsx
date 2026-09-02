import { ScrollHero } from "./ServicesInteractive";
import {
  BookSheet,
  FaqSheet,
  FieldReportSheet,
  GetStartedCloser,
  ProcessSheet,
  RateCardSheet,
  RedlineSheet,
  TechnicalSheet,
} from "./sections";
import "./services.css";

export const metadata = {
  title: "Services | RMonaghan Venture Studios",
  description:
    "A five-day website built to turn local clicks into booked jobs. RMVS handles the website, booking, forms, analytics, domain, and launch — start with a free homepage redline.",
};

export default function ServicesPage() {
  return (
    <main className="svc">
      {/* ── Sheet 01: scroll-expansion hero ─────────────────── */}
      <ScrollHero />

      {/* ── Sheet 02: the conversion redline ────────────────── */}
      <RedlineSheet no="02" />

      {/* ── Sheet 03: field report (real proof, right after) ── */}
      <FieldReportSheet no="03" />

      {/* ── Sheet 04: the build order ───────────────────────── */}
      <ProcessSheet no="04" />

      {/* ── Sheet 05: the rate card ─────────────────────────── */}
      <RateCardSheet no="05" />

      {/* ── Sheet 06: everything technical is handled ───────── */}
      <TechnicalSheet no="06" />

      {/* ── Sheet 07: straight answers ──────────────────────── */}
      <FaqSheet no="07" />

      {/* ── Sheet 08: start here ────────────────────────────── */}
      <BookSheet no="08" />

      {/* ── Ready to get started? (Stripe-style closer) ─────── */}
      <GetStartedCloser />
    </main>
  );
}

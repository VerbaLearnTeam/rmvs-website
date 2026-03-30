import Link from "next/link";

export const metadata = {
  title: "We Make Pages | RMonaghan Venture Studios",
  description:
    "Flat-rate website builds and full digital presence management for small businesses. Custom sites starting at $500, with ongoing hosting, SEO, ads, and AI chat agent plans.",
};

const services = [
  "Custom website design and development",
  "Hosting, domain, and SSL setup",
  "SEO setup and monthly reporting",
  "Review and reputation management",
  "Social media management and ads",
  "AI chat agent integration",
  "Email marketing and automations (n8n)",
];

export default function WeMakePagesPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>
          <div className="project-header">
            <span className="badge">Web Agency</span>
            <h1>We Make Pages</h1>
            <p className="muted" style={{ fontSize: "1.1rem" }}>
              Websites that actually work.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>About We Make Pages</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              We Make Pages builds websites and manages digital presence for small businesses. One
              flat rate to start ($500), no surprises, no fluff. Sites are custom-designed,
              mobile-first, and typically delivered within 48 hours.
            </p>
            <p className="muted" style={{ marginBottom: 16 }}>
              Beyond the build, three subscription tiers cover everything from basic hosting and
              maintenance (Starter, $50/mo) to full digital operations including SEO, ads, social
              media, AI chat agents, and marketing automations (Premium, $400/mo). Bilingual
              support in English and Spanish.
            </p>
            <p className="muted">
              Co-founded by Rory Monaghan and Luis Prada. No outsourced teams — every site is
              personally built by the founders.
            </p>
          </div>
          <div className="panel">
            <h3>Key Services</h3>
            <ul className="feature-list">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>How It Works</h2>
          <div className="cards">
            <div className="card">
              <h3>Build It</h3>
              <p className="muted">
                Custom website designed around your brand, your audience, and what converts.
                Mobile-first, fast, and clean. Starting at $500.
              </p>
            </div>
            <div className="card">
              <h3>Launch It</h3>
              <p className="muted">
                Domain, hosting, SSL, professional email, Google Business, Apple Maps — everything
                you need to go live and look legit from day one.
              </p>
            </div>
            <div className="card">
              <h3>Grow It</h3>
              <p className="muted">
                SEO, ads, review management, social media, AI chatbots, email marketing — pick what
                you need or let us handle everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Pricing</h2>
          <div className="cards">
            <div className="card">
              <h3>Starter — $50/mo</h3>
              <p className="muted">
                Website hosting and maintenance, custom domain with SSL, professional email setup,
                Google Business and Apple Maps listing, and monthly uptime monitoring.
              </p>
            </div>
            <div className="card">
              <h3>Growth — $175/mo</h3>
              <p className="muted">
                Everything in Starter plus SEO setup with monthly reporting, Google Analytics
                dashboard, review and reputation management, and calendar/booking integration.
              </p>
            </div>
            <div className="card">
              <h3>Premium — $400/mo</h3>
              <p className="muted">
                Everything in Growth plus AI chat agent on your site, social media management,
                Facebook and Instagram ads, email marketing, and marketing automations via n8n.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container panel" style={{ textAlign: "center" }}>
          <h2>Interested in We Make Pages?</h2>
          <p className="muted">
            Every project starts with a free 15-minute strategy call.
          </p>
          <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <a
              className="btn btn-primary"
              href="https://wemakepages.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit wemakepages.com
            </a>
            <Link className="btn btn-outline" href="/contact">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

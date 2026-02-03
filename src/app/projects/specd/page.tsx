import Link from "next/link";

export const metadata = {
  title: "Spec'd | RMonaghan Venture Studios",
  description: "The ultimate mobile companion for car enthusiasts. Track maintenance, log mileage, and digitize your garage."
};

const features = [
  "Vehicle profile dashboard with detailed specs",
  "Smart maintenance tracking with reminders",
  "Mileage intelligence and logging",
  "VIN decoding integration",
  "Photo uploads for personalization",
  "Premium subscriptions via RevenueCat"
];

export default function SpecdPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>
          <div className="project-header">
            <span className="badge">iOS App</span>
            <h1>Spec&apos;d</h1>
            <p className="muted" style={{ fontSize: "1.1rem" }}>
              Your car, fully digitized
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>About Spec&apos;d</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              Spec&apos;d is the ultimate mobile companion for car enthusiasts, collectors, and everyday 
              drivers who want to stay connected to their vehicles in a smarter, cleaner, and more personal way.
            </p>
            <p className="muted" style={{ marginBottom: 16 }}>
              Built with intention and precision, Spec&apos;d transforms car ownership into a streamlined, 
              digital-first experience — combining elegant UI design, practical record-keeping, real-time 
              reminders, and community-focused features.
            </p>
            <p className="muted">
              Whether you&apos;re tracking oil changes on a daily driver, dreaming up a build list for your 
              first project car, or finally buying the keys to your younger self&apos;s fantasy, Spec&apos;d is 
              here to help you own that story.
            </p>
          </div>
          <div className="panel">
            <h3>Core Features</h3>
            <ul className="feature-list">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What&apos;s Inside</h2>
          <div className="cards">
            <div className="card">
              <h3>Vehicle Profiles</h3>
              <p className="muted">
                Create detailed profiles for each vehicle including make, model, year, trim, color, 
                drivetrain, fuel type, and VIN with auto-decoding support.
              </p>
            </div>
            <div className="card">
              <h3>Maintenance Tracking</h3>
              <p className="muted">
                Pre-loaded with realistic default intervals for oil changes, tire rotations, brake 
                inspections, and more. Fully customizable to your needs.
              </p>
            </div>
            <div className="card">
              <h3>Mileage Intelligence</h3>
              <p className="muted">
                Streamlined mileage input flow that prompts next steps, automatic reminder generation, 
                and smart alerts when services are due.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>The Story Behind Spec&apos;d</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              In 2024, Rory bought the car that had lived in his mind since childhood: a chrome orange 
              2005 Lotus Elise. Lightweight, raw, and unmistakably strange, the Elise was chosen for 
              character — the ultimate expression of form following function.
            </p>
            <p className="muted">
              But as he began owning this dream car, Rory noticed a problem: there was no clean, easy, 
              mobile-first way to track everything that mattered. Spreadsheets were clunky. Apps were 
              either too generic or too corporate. So he built Spec&apos;d.
            </p>
          </div>
          <div className="panel">
            <h3>Target Users</h3>
            <ul className="feature-list">
              <li>Automotive enthusiasts</li>
              <li>DIY mechanics and tinkerers</li>
              <li>Used car buyers and flippers</li>
              <li>Aspiring collectors and dreamers</li>
              <li>Anyone wanting to digitize their vehicle</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container panel" style={{ textAlign: "center" }}>
          <h2>Get Spec&apos;d</h2>
          <p className="muted">
            Drive smarter. Log faster. Dream bigger. Your garage, in your pocket.
          </p>
          <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <Link className="btn btn-primary" href="/contact">
              Contact Us
            </Link>
            <Link className="btn btn-outline" href="/privacy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

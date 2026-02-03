import Link from "next/link";

export const metadata = {
  title: "ePrescience | RMonaghan Venture Studios",
  description: "All-in-one learning suite for students. AI-powered study tools, flashcards, and spaced repetition."
};

const features = [
  "AI-powered flashcard generation",
  "Spaced repetition algorithms",
  "Intelligent practice sessions",
  "Progress tracking and analytics",
  "Cross-platform sync",
  "Offline study mode"
];

export default function EPresciencePage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>
          <div className="project-header">
            <span className="badge">iOS App</span>
            <h1>ePrescience</h1>
            <p className="muted" style={{ fontSize: "1.1rem" }}>
              All-in-one learning suite for students
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>About ePrescience</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              ePrescience (formerly VerbaLearn) is an all-in-one learning suite inspired by and born out of 
              frustrations with existing study tools. The app simplifies the modern &quot;study stack&quot; into a 
              single, faster workflow that gives students their time back.
            </p>
            <p className="muted" style={{ marginBottom: 16 }}>
              Built by Rory Monaghan as a solo full-stack developer in 2025, then partnering with Nick & Lex 
              to incorporate and build the company into a world-class software development powerhouse with 
              dedicated teams for testing, marketing, cross-platform development, database management, and 
              legal compliance.
            </p>
            <p className="muted">
              Our approach blends hands-on product engineering with a deep interest in how people actually 
              learn, remember, and perform under pressure.
            </p>
          </div>
          <div className="panel">
            <h3>Key Features</h3>
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
          <h2>Our Commitment</h2>
          <div className="cards">
            <div className="card">
              <h3>Student-Centered Design</h3>
              <p className="muted">
                We pledge to ensure students are involved in all our conversations and decision-making 
                as we evolve as a company.
              </p>
            </div>
            <div className="card">
              <h3>Continuous Evolution</h3>
              <p className="muted">
                The app is built to adapt to the evolving needs of our student users, with regular 
                updates based on direct feedback.
              </p>
            </div>
            <div className="card">
              <h3>Time-Saving Focus</h3>
              <p className="muted">
                Every feature is designed with one goal: give students their time back while helping 
                them learn more effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container panel" style={{ textAlign: "center" }}>
          <h2>Interested in ePrescience?</h2>
          <p className="muted">
            Contact us for beta access or partnership opportunities.
          </p>
          <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <Link className="btn btn-primary" href="/contact">
              Get in Touch
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

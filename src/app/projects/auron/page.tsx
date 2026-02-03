import Link from "next/link";

export const metadata = {
  title: "Auron Tomography Intelligence System | RMonaghan Venture Studios",
  description: "Machine learning system for arterial CT analysis. Automated detection of vascular abnormalities linked to stroke risk."
};

export default function AuronPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>
          <div className="project-header">
            <span className="badge">Medical AI</span>
            <h1>Auron Tomography Intelligence System</h1>
            <p className="muted" style={{ fontSize: "1.1rem" }}>
              Arterial CT intelligence for fast, consistent vascular review
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>About ATIS</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              The Auron Tomography Intelligence System (ATIS) leverages machine learning to automatically 
              analyze CTA brain scans, identify arterial abnormalities linked to stroke risk, and notify 
              clinicians in real time — operating in parallel with standard radiology workflow.
            </p>
            <p className="muted" style={{ marginBottom: 16 }}>
              A proprietary model in development and property of RMonaghan Venture Studios & our partners.
            </p>
            <p className="muted">
              Additional information may be available upon request for investors, clinicians, healthcare 
              organizations, collaborators, and other relevant parties.
            </p>
          </div>
          <div className="panel">
            <h3>Key Capabilities</h3>
            <ul className="feature-list">
              <li>Automated CTA brain scan analysis</li>
              <li>Arterial abnormality detection</li>
              <li>Real-time clinician notifications</li>
              <li>Parallel radiology workflow integration</li>
              <li>Stroke risk identification</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What Auron Does</h2>
          <div className="cards">
            <div className="card">
              <h3>Ingest and Organize</h3>
              <p className="muted">
                Bring arterial CT data into a controlled intake pipeline for iteration and analysis.
              </p>
            </div>
            <div className="card">
              <h3>Segment and Visualize</h3>
              <p className="muted">
                Generate vessel and lesion overlays for interactive exploration by clinicians.
              </p>
            </div>
            <div className="card">
              <h3>Quantify and Review</h3>
              <p className="muted">
                Surface structured outputs and measurements for evaluation and clinical decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container panel" style={{ textAlign: "center" }}>
          <h2>Interested in Auron?</h2>
          <p className="muted">
            For investors, clinicians, healthcare organizations, and collaborators.
          </p>
          <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <a className="btn btn-primary" href="mailto:Rory.Monaghan@auronintelligence.com">
              Contact: Rory.Monaghan@auronintelligence.com
            </a>
            <a 
              className="btn btn-outline" 
              href="https://auron-tomography-intelligence-system-website-production.up.railway.app" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

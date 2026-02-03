import Link from "next/link";

export const metadata = {
  title: "Neura | RMonaghan Venture Studios",
  description: "Smart sleep mask with EOG sensors. Wake at the optimal point in your sleep cycle."
};

const features = [
  "EOG (electrooculography) sensors",
  "Real-time sleep stage detection",
  "Smart temperature sensing",
  "Motion detection",
  "Scheduled wake preferences",
  "Mobile dashboard for tracking"
];

export default function NeuraPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>
          <div className="project-header">
            <span className="badge">Hardware + App</span>
            <h1>Neura</h1>
            <p className="muted" style={{ fontSize: "1.1rem" }}>
              Smarter sleep starts here
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>About Neura</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              Neura is a next-generation sleep companion, designed to wake you at the right moment in your 
              sleep cycle — not just the right time. Using EOG (electrooculography) sensors embedded in a 
              soft, medical-grade sleep mask, Neura detects your sleep stage by monitoring subtle eye movements.
            </p>
            <p className="muted" style={{ marginBottom: 16 }}>
              No more jarring alarms or groggy mornings. Neura gently wakes you within your ideal time window, 
              at the optimal point in your sleep cycle.
            </p>
            <p className="muted">
              <strong>Note:</strong> Neura is a separate entity, not property of RMonaghan Studios. This app 
              prototype is meant to be used in conjunction with the physical device when released by the team 
              at Case Western Reserve University.
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
          <h2>What Makes Neura Different</h2>
          <div className="cards">
            <div className="card">
              <h3>Intelligent Sleep Tracking</h3>
              <p className="muted">
                Unlike generic sleep apps, Neura&apos;s prototype integrates real-time biological signals with 
                smart temperature sensing, motion detection, and scheduled preferences.
              </p>
            </div>
            <div className="card">
              <h3>Designed for Comfort</h3>
              <p className="muted">
                With a compact PCB, breathable materials, and low-power Bluetooth, the prototype was designed 
                for real-world use from night one.
              </p>
            </div>
            <div className="card">
              <h3>Built for Innovation</h3>
              <p className="muted">
                Whether you&apos;re biohacking your routine, managing a demanding lifestyle, or just trying to 
                wake up better, Neura is being built to meet you where you sleep.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container panel" style={{ textAlign: "center" }}>
          <h2>Interested in Neura?</h2>
          <p className="muted">
            Developed in collaboration with Case Western Reserve University.
          </p>
          <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <Link className="btn btn-primary" href="/contact">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

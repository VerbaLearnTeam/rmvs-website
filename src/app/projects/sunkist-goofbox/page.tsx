import Link from "next/link";

export const metadata = {
  title: "Sunkist Goofbox | RMonaghan Venture Studios",
  description: "YouTube channel documenting car ownership, POV drives, and automotive culture."
};

const highlights = [
  "\"Buying a Lotus Elise at 21: A Delightful Disaster\" - The full saga of hunting, purchasing, and first impressions",
  "\"Lotus Elise After 9 Months\" - Real-world ownership reflections and quirks uncovered",
  "Exotic Car POVs - Immersive driving experiences from Rolls-Royce to Lamborghini",
  "DIY maintenance content and gear reviews",
  "Local car meetups and exotic auto tours"
];

export default function SunkistGoofboxPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>
          <div className="project-header">
            <span className="badge">YouTube</span>
            <h1>Sunkist Goofbox</h1>
            <p className="muted" style={{ fontSize: "1.1rem" }}>
              Car culture and storytelling
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>About the Channel</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              Experience high-octane enthusiasm and car-culture storytelling on Sunkist Goofbox, the YouTube 
              channel powered by Rory Monaghan and his vibrant chrome orange 2005 Lotus Elise.
            </p>
            <p className="muted" style={{ marginBottom: 16 }}>
              What began as a personal passion project has grown into a source of POV drives, deep-dive reviews, 
              DIY escapades, and more. The channel name comes from the car itself — nicknamed the &quot;Sunkist 
              Goofbox&quot; for its unmistakably orange color and delightfully impractical nature.
            </p>
            <p className="muted">
              Sunkist Goofbox isn&apos;t just about an orange Lotus — it&apos;s a celebration of passion, chase, 
              and character.
            </p>
          </div>
          <div className="panel">
            <h3>Channel Highlights</h3>
            <ul className="feature-list">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What You&apos;ll Find</h2>
          <div className="cards">
            <div className="card">
              <h3>Authentic Car Ownership</h3>
              <p className="muted">
                Everything from sourcing and buying, to maintaining, repairing, and living with the Elise — 
                warts and all.
              </p>
            </div>
            <div className="card">
              <h3>Immersive Driving POVs</h3>
              <p className="muted">
                High-quality point-of-view videos that put you in the driver&apos;s seat. Hear the engine, 
                feel the excitement, best enjoyed in full screen.
              </p>
            </div>
            <div className="card">
              <h3>Car Culture & Community</h3>
              <p className="muted">
                Exploring local car meetups, exotic auto tours, and hidden collector garages around Pittsburgh 
                and beyond.
              </p>
            </div>
            <div className="card">
              <h3>Hands-On DIY Content</h3>
              <p className="muted">
                Maintenance tips, gear reviews, and practical resources for fellow car geeks who love to wrench.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>Why It Connects</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              Rory&apos;s candid style and attention to detail draw in audiences who crave authenticity over gloss. 
              You&apos;ll laugh when things go sideways, learn along with his maintenance routines, and sit down 
              for ride-along drives that evoke real emotion.
            </p>
            <p className="muted">
              Whether you&apos;re planning your own Lotus purchase, a weekend warrior, or a lifelong car enthusiast, 
              you&apos;ll find inspiration, entertainment, and a welcoming community here.
            </p>
          </div>
          <div className="panel">
            <h3>Coming Soon</h3>
            <ul className="feature-list">
              <li>More deep-dive build videos</li>
              <li>Mod installs and performance tuning</li>
              <li>Featurettes on rare and collectible cars</li>
              <li>Spec&apos;d app integration series</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container panel" style={{ textAlign: "center" }}>
          <h2>Watch on YouTube</h2>
          <p className="muted">
            Subscribe for weekly car content and join the journey.
          </p>
          <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <a 
              className="btn btn-primary" 
              href="https://www.youtube.com/@SunkistGoofbox" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Channel
            </a>
            <Link className="btn btn-outline" href="/projects/specd">
              See Spec&apos;d App
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

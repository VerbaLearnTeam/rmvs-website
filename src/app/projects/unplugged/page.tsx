import Link from "next/link";

export const metadata = {
  title: "Unplugged PGH | RMonaghan Venture Studios",
  description: "Student-run event collective organizing music festivals and community events across Pittsburgh, Cleveland, and New York."
};

const achievements = [
  "Organized 10+ music festivals",
  "Raised over $10,000 for community causes",
  "Partnerships with local nonprofits and artists",
  "Co-founded the Black Lodge Music Venue",
  "Organized the First Annual Oakland Indie Fest",
  "Events across Pittsburgh, Cleveland, and New York"
];

export default function UnpluggedPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>
          <div className="project-header">
            <span className="badge">Events</span>
            <h1>Unplugged PGH</h1>
            <p className="muted" style={{ fontSize: "1.1rem" }}>
              Student-run event management & artists&apos; collective
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>About Unplugged</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              Unplugged PGH is a student-run event management and artists&apos; collective facilitated by students 
              at Pitt, CMU, Columbia University, and Case Western Reserve. The project provides exposure to local 
              artists and organizes festivals often benefitting local nonprofits or creative projects.
            </p>
            <p className="muted" style={{ marginBottom: 16 }}>
              Founded by Rory Monaghan, the project started at the DIY music venue the Black Lodge in South Oakland, 
              then expanded to organizing concerts like Oakland Indie Fest and Unplugged NYC across Pittsburgh, 
              Cleveland, and New York.
            </p>
            <p className="muted">
              Featured in Pitt News and the Pittsburgh Post Gazette.
            </p>
          </div>
          <div className="panel">
            <h3>Achievements</h3>
            <ul className="feature-list">
              {achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What We Do</h2>
          <div className="cards">
            <div className="card">
              <h3>Music Festivals</h3>
              <p className="muted">
                Organizing live music events that bring together local and emerging artists with enthusiastic 
                audiences.
              </p>
            </div>
            <div className="card">
              <h3>Community Events</h3>
              <p className="muted">
                Creating spaces for artists, musicians, and community members to connect, collaborate, and 
                celebrate.
              </p>
            </div>
            <div className="card">
              <h3>Nonprofit Support</h3>
              <p className="muted">
                Many events are organized to benefit local nonprofits, raising funds and awareness for 
                community causes.
              </p>
            </div>
            <div className="card">
              <h3>Artist Exposure</h3>
              <p className="muted">
                Providing platforms for local and emerging artists to showcase their work and grow their 
                audiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container panel" style={{ textAlign: "center" }}>
          <h2>Get Involved</h2>
          <p className="muted">
            Interested in performing, partnering, or attending an event?
          </p>
          <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <Link className="btn btn-primary" href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

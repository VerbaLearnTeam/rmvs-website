import Link from "next/link";

const projects = [
  {
    title: "ePrescience",
    description: "All-in-one learning suite for students. AI-powered study tools, flashcards, and spaced repetition.",
    href: "/projects/eprescience",
    badge: "iOS App"
  },
  {
    title: "Spec'd",
    description: "The ultimate mobile companion for car enthusiasts. Track maintenance, log mileage, and digitize your garage.",
    href: "/projects/specd",
    badge: "iOS App"
  },
  {
    title: "Auron Intelligence",
    description: "Medical AI system for arterial CT analysis. Automated detection of vascular abnormalities.",
    href: "/projects/auron",
    badge: "Medical AI"
  },
  {
    title: "Neura",
    description: "Smart sleep mask with EOG sensors. Wake at the optimal point in your sleep cycle.",
    href: "/projects/neura",
    badge: "Hardware + App"
  },
  {
    title: "Sunkist Goofbox",
    description: "YouTube channel documenting car ownership, POV drives, and automotive culture.",
    href: "/projects/sunkist-goofbox",
    badge: "Content"
  },
  {
    title: "Unplugged PGH",
    description: "Student-run event collective organizing music festivals and community events in Pittsburgh.",
    href: "/projects/unplugged",
    badge: "Events"
  }
];

const skills = [
  "iOS Development (Swift, Xcode)",
  "Full-Stack Web Development",
  "Machine Learning & AI",
  "Firebase & Cloud Infrastructure",
  "API Design & Integration",
  "Product Strategy",
  "UI/UX Design",
  "Automation Engineering"
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="badge">Digital Innovation Lab</span>
            <h1>We solve problems we&apos;ve had ourselves.</h1>
            <p>
              RMonaghan Venture Studios is a cutting-edge digital innovation lab specializing in AI-integrated 
              iOS apps and end-to-end product development. We build elegant, high-performance solutions 
              fueled by creativity and dedication.
            </p>
            <div className="nav-cta" style={{ marginBottom: 18 }}>
              <Link className="btn btn-primary" href="/projects">
                View Projects
              </Link>
              <Link className="btn btn-outline" href="/contact">
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="hero-card">
            <h3>Meet the Founder</h3>
            <p className="muted">
              Rory Monaghan is a neuroscience student at the University of Pittsburgh, full-stack developer, 
              and entrepreneur building AI-integrated products across healthcare, education, and automotive.
            </p>
            <Link className="btn btn-ghost" href="/about" style={{ marginTop: 16 }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Our Projects</h2>
          <p className="muted">
            From empowering students with AI-powered learning tools to helping car enthusiasts manage their 
            collections, our portfolio keeps expanding into new frontiers.
          </p>
          <div className="cards">
            {projects.map((project) => (
              <Link key={project.title} href={project.href} className="card-link">
                <div className="card">
                  <span className="badge" style={{ marginBottom: 12 }}>{project.badge}</span>
                  <h3>{project.title}</h3>
                  <p className="muted">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>What We Do</h2>
            <p className="muted">
              We utilize Xcode and Swift alongside Firebase, Cloudflare, App Store Connect, RevenueCat, 
              Google AdMob, and a diverse array of APIs — enhanced by AI engines like GPT, Claude, Gemini, 
              and Cursor — to build elegant, high-performance solutions.
            </p>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill} className="skill-item">{skill}</div>
              ))}
            </div>
          </div>
          <div className="panel">
            <h3>Our Approach</h3>
            <p className="muted" style={{ marginBottom: 16 }}>
              Backed by an ever-growing network of experts and fueled by creativity and dedication, 
              we tackle tough problems we have experienced ourselves, bringing our products to life 
              with passion and excitement.
            </p>
            <p className="muted">
              From accessible learning platforms to neuroscience-based sleep tools, we&apos;re always 
              exploring new frontiers.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container panel" style={{ textAlign: "center" }}>
          <h2>Let&apos;s Build Something Together</h2>
          <p className="muted">
            Interested in collaborating, investing, or just want to chat about technology?
          </p>
          <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <Link className="btn btn-primary" href="/contact">
              Get in Touch
            </Link>
            <Link className="btn btn-outline" href="/about">
              About Rory
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

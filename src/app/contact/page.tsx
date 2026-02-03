import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | RMonaghan Venture Studios",
  description: "Get in touch with Rory Monaghan. Inquiries about projects, collaborations, investments, or just want to chat."
};

export default function ContactPage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <span className="badge">Get in Touch</span>
          <h1>Contact</h1>
          <p style={{ maxWidth: 600 }}>
            Interested in collaborating, investing, or just want to chat about technology? 
            Fill out the form below or reach out directly.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="panel">
            <h2>Send a Message</h2>
            <p className="muted" style={{ marginBottom: 20 }}>
              Fill out the form and I&apos;ll get back to you as soon as possible.
            </p>
            <ContactForm />
          </div>
          <div>
            <h2>Other Ways to Connect</h2>
            <div className="cards" style={{ marginTop: 14 }}>
              <div className="card">
                <h3>Email</h3>
                <p className="muted">
                  <a href="mailto:rory@rmonaghanstudios.org" style={{ color: "var(--accent)" }}>
                    rory@rmonaghanstudios.org
                  </a>
                </p>
              </div>
              <div className="card">
                <h3>LinkedIn</h3>
                <p className="muted">
                  <a 
                    href="https://www.linkedin.com/in/rory-monaghan-300439260" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)" }}
                  >
                    linkedin.com/in/rory-monaghan
                  </a>
                </p>
              </div>
              <div className="card">
                <h3>YouTube</h3>
                <p className="muted">
                  <a 
                    href="https://www.youtube.com/@SunkistGoofbox" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)" }}
                  >
                    @SunkistGoofbox
                  </a>
                </p>
              </div>
              <div className="card">
                <h3>Auron Intelligence</h3>
                <p className="muted">
                  <a 
                    href="mailto:Rory.Monaghan@auronintelligence.com"
                    style={{ color: "var(--accent)" }}
                  >
                    Rory.Monaghan@auronintelligence.com
                  </a>
                </p>
              </div>
            </div>

            <div className="panel" style={{ marginTop: 20 }}>
              <h3>Looking for Something Specific?</h3>
              <ul className="feature-list">
                <li><strong>Investors:</strong> Reach out about ePrescience or Auron</li>
                <li><strong>Collaborations:</strong> Open to partnerships and projects</li>
                <li><strong>Consulting:</strong> iOS, web, AI/ML development</li>
                <li><strong>Events:</strong> Unplugged PGH performances or partnerships</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

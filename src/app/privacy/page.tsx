export const metadata = {
  title: "Privacy Policy | RMonaghan Venture Studios",
  description: "Privacy policy for RMonaghan Venture Studios and our applications including ePrescience and Spec'd."
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h1>Privacy Policy</h1>
          <p className="muted" style={{ marginBottom: 30 }}>
            Last updated: February 2026
          </p>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Overview</h2>
            <p className="muted">
              RMonaghan Venture Studios LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates this website and 
              develops mobile applications including ePrescience (formerly VerbaLearn) and Spec&apos;d. This Privacy 
              Policy explains how we collect, use, disclose, and safeguard your information.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Information We Collect</h2>
            <h3 style={{ marginTop: 16 }}>Personal Information</h3>
            <p className="muted" style={{ marginBottom: 12 }}>
              When you use our services, we may collect:
            </p>
            <ul className="feature-list">
              <li>Name and email address (when you contact us or create an account)</li>
              <li>Usage data and analytics</li>
              <li>Device information and identifiers</li>
              <li>Information you voluntarily provide</li>
            </ul>

            <h3 style={{ marginTop: 16 }}>App-Specific Data</h3>
            <p className="muted">
              <strong>ePrescience:</strong> Study materials, learning progress, and preferences you create within the app.
            </p>
            <p className="muted">
              <strong>Spec&apos;d:</strong> Vehicle information, maintenance records, and mileage logs you input.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>How We Use Your Information</h2>
            <ul className="feature-list">
              <li>To provide and maintain our services</li>
              <li>To improve and personalize user experience</li>
              <li>To communicate with you about updates and support</li>
              <li>To analyze usage patterns and improve our products</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Data Storage and Security</h2>
            <p className="muted">
              We implement appropriate technical and organizational measures to protect your personal information. 
              Your data may be stored on secure servers provided by Firebase, Cloudflare, and other trusted 
              infrastructure providers.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Third-Party Services</h2>
            <p className="muted" style={{ marginBottom: 12 }}>
              Our applications may use third-party services that collect information:
            </p>
            <ul className="feature-list">
              <li>Firebase (authentication, database, analytics)</li>
              <li>Google AdMob (advertising)</li>
              <li>RevenueCat (subscription management)</li>
              <li>App Store Connect (distribution)</li>
            </ul>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Your Rights</h2>
            <p className="muted" style={{ marginBottom: 12 }}>
              You have the right to:
            </p>
            <ul className="feature-list">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Children&apos;s Privacy</h2>
            <p className="muted">
              Our services are not intended for children under 13. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected such information, 
              please contact us immediately.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Changes to This Policy</h2>
            <p className="muted">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </div>

          <div className="panel">
            <h2>Contact Us</h2>
            <p className="muted">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p style={{ marginTop: 12 }}>
              <a href="mailto:rory@rmonaghanstudios.org" style={{ color: "var(--accent)" }}>
                rory@rmonaghanstudios.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

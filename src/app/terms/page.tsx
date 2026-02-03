export const metadata = {
  title: "Terms of Use | RMonaghan Venture Studios",
  description: "Terms of use for RMonaghan Venture Studios website and applications."
};

export default function TermsPage() {
  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h1>Terms of Use</h1>
          <p className="muted" style={{ marginBottom: 30 }}>
            Last updated: February 2026
          </p>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Agreement to Terms</h2>
            <p className="muted">
              By accessing or using the services provided by RMonaghan Venture Studios LLC (&quot;we,&quot; &quot;us,&quot; 
              or &quot;our&quot;), including our website and mobile applications (ePrescience, Spec&apos;d), you agree 
              to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Use of Services</h2>
            <h3 style={{ marginTop: 16 }}>Permitted Use</h3>
            <p className="muted" style={{ marginBottom: 12 }}>
              You may use our services for lawful purposes only. You agree not to:
            </p>
            <ul className="feature-list">
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
              <li>Reproduce, distribute, or create derivative works without permission</li>
              <li>Use automated systems to access our services without consent</li>
            </ul>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>User Accounts</h2>
            <p className="muted">
              Some of our services may require you to create an account. You are responsible for maintaining 
              the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Intellectual Property</h2>
            <p className="muted">
              All content, features, and functionality of our services, including but not limited to text, 
              graphics, logos, icons, images, audio clips, and software, are the exclusive property of 
              RMonaghan Venture Studios LLC and are protected by copyright, trademark, and other intellectual 
              property laws.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>User Content</h2>
            <p className="muted" style={{ marginBottom: 12 }}>
              When you submit content through our services (such as study materials in ePrescience or vehicle 
              data in Spec&apos;d), you retain ownership of your content. However, you grant us a license to use, 
              store, and process that content to provide our services.
            </p>
            <p className="muted">
              You are solely responsible for the content you submit and represent that you have all necessary 
              rights to submit such content.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Subscriptions and Payments</h2>
            <p className="muted">
              Some features of our applications may require a paid subscription. Payment processing is handled 
              through Apple&apos;s App Store and RevenueCat. Subscription terms, pricing, and cancellation policies 
              are governed by those platforms&apos; terms of service.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Disclaimer of Warranties</h2>
            <p className="muted">
              Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either 
              express or implied. We do not warrant that our services will be uninterrupted, error-free, or 
              completely secure.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Limitation of Liability</h2>
            <p className="muted">
              To the maximum extent permitted by law, RMonaghan Venture Studios LLC shall not be liable for 
              any indirect, incidental, special, consequential, or punitive damages arising from your use of 
              our services.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Indemnification</h2>
            <p className="muted">
              You agree to indemnify and hold harmless RMonaghan Venture Studios LLC and its officers, 
              directors, employees, and agents from any claims, damages, or expenses arising from your use 
              of our services or violation of these terms.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Changes to Terms</h2>
            <p className="muted">
              We reserve the right to modify these Terms of Use at any time. We will notify users of material 
              changes by posting the updated terms on our website. Your continued use of our services after 
              such changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div className="panel" style={{ marginBottom: 24 }}>
            <h2>Governing Law</h2>
            <p className="muted">
              These Terms of Use shall be governed by and construed in accordance with the laws of the 
              Commonwealth of Pennsylvania, United States, without regard to its conflict of law provisions.
            </p>
          </div>

          <div className="panel">
            <h2>Contact Us</h2>
            <p className="muted">
              If you have questions about these Terms of Use, please contact us at:
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

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <Image src="/logo.png" alt="RMVS" width={24} height={24} />
              <span>RMVS</span>
            </div>
            <p style={{ color: "var(--white-dim)", fontSize: "0.88rem", lineHeight: 1.6, maxWidth: 280 }}>
              Digital innovation lab building AI-integrated products across healthcare, education, and developer tooling.
            </p>
          </div>

          <div className="footer-links">
            <span style={{ fontWeight: 600, color: "var(--white-bright)", marginBottom: 4 }}>Navigation</span>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="footer-links">
            <span style={{ fontWeight: 600, color: "var(--white-bright)", marginBottom: 4 }}>Legal</span>
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <a href="https://www.linkedin.com/in/rory-monaghan-300439260" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/VerbaLearnTeam" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} RMonaghan Venture Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

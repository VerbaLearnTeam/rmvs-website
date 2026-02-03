import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-logo">
            <Image
              src="/logo.png"
              alt="RMVS"
              width={28}
              height={28}
              style={{ objectFit: "contain" }}
            />
            RMonaghan Venture Studios
          </div>
          <p className="muted">
            Cutting-edge digital innovation lab specializing in AI-integrated apps and end-to-end product development.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} RMonaghan Venture Studios LLC. All rights reserved.
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { TopBarScroll } from "./TopBarScroll";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function TopBar() {
  return (
    <TopBarScroll>
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-mark">
              <Image
                src="/logo.png"
                alt="RMVS Logo"
                width={32}
                height={32}
                priority
              />
            </span>
            <span className="logo-text">RMVS</span>
          </Link>

          <nav className="nav-links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav-cta">
            <ThemeToggle />
            <Link href="/contact" className="btn btn-nav">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </TopBarScroll>
  );
}

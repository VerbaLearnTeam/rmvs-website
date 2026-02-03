import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <span className="logo-mark">
            <Image
              src="/logo.png"
              alt="RMVS"
              width={32}
              height={32}
              style={{ objectFit: "contain" }}
            />
          </span>
          <span className="logo-text">RMonaghan Venture Studios</span>
        </Link>
        <nav className="nav-links">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="nav-cta">
          <Link className="btn btn-primary" href="/contact">
            Get in Touch
          </Link>
        </div>
      </div>
    </header>
  );
}

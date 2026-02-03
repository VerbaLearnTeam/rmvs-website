"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import AnimatedButton from "./AnimatedButton";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  return (
    <motion.header
      className="site-header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container header-inner">
        <Link href="/" className="logo">
          <motion.span
            className="logo-mark"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/logo.png"
              alt="RMVS"
              width={32}
              height={32}
              style={{ objectFit: "contain" }}
            />
          </motion.span>
          <span className="logo-text">RMonaghan Venture Studios</span>
        </Link>

        <nav className="nav-links">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link key={link.href} href={link.href} className="nav-link-wrapper">
                <motion.span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    color: isActive ? "var(--text)" : undefined,
                  }}
                  whileHover={prefersReducedMotion ? {} : { color: "var(--text)" }}
                  transition={{ duration: 0.15 }}
                >
                  {link.label}
                  {/* Animated underline */}
                  <motion.span
                    style={{
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "var(--accent)",
                      borderRadius: 1,
                      transformOrigin: "left center",
                    }}
                    initial={{ scaleX: isActive ? 1 : 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    whileHover={prefersReducedMotion ? {} : { scaleX: 1 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.span>
              </Link>
            );
          })}
        </nav>

        <div className="nav-cta">
          <AnimatedButton href="/contact" variant="primary">
            Get in Touch
          </AnimatedButton>
        </div>
      </div>
    </motion.header>
  );
}

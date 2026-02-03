"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ScrollReveal>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <motion.div
              className="footer-logo"
              whileHover={prefersReducedMotion ? {} : { x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/logo.png"
                alt="RMVS"
                width={28}
                height={28}
                style={{ objectFit: "contain" }}
              />
              RMonaghan Venture Studios
            </motion.div>
            <p className="muted">
              Cutting-edge digital innovation lab specializing in AI-integrated apps and end-to-end product development.
            </p>
          </div>
          <div className="footer-links">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  style={{ display: "inline-block" }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          color: "var(--accent)",
                          x: 3,
                        }
                  }
                  transition={{ duration: 0.15 }}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>
        </div>
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          &copy; {new Date().getFullYear()} RMonaghan Venture Studios LLC. All rights reserved.
        </motion.div>
      </footer>
    </ScrollReveal>
  );
}

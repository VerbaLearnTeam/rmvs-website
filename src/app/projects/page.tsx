"use client";

import Link from "next/link";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";
import AnimatedButton from "@/components/AnimatedButton";
import HeroBackground from "@/components/HeroBackground";
import { motion, useReducedMotion } from "framer-motion";

const projects = [
  {
    title: "ePrescience",
    tagline: "All-in-one learning suite",
    description: "AI-powered study tools designed for students who want to learn faster and retain more. Features flashcards, spaced repetition, and intelligent practice sessions. Formerly known as VerbaLearn.",
    href: "/projects/eprescience",
    badge: "iOS App",
    status: "Live on App Store",
    appStoreUrl: "https://apps.apple.com/us/app/eprescience/id6748284897"
  },
  {
    title: "Spec'd",
    tagline: "Your car, fully digitized",
    description: "The ultimate mobile companion for car enthusiasts, collectors, and everyday drivers. Track maintenance, log mileage, set reminders, and digitize your entire garage experience.",
    href: "/projects/specd",
    badge: "iOS App",
    status: "Live on App Store"
  },
  {
    title: "Auron Tomography Intelligence System",
    tagline: "Arterial CT intelligence",
    description: "Machine learning system that automatically analyzes CTA brain scans, identifies arterial abnormalities linked to stroke risk, and notifies clinicians in real time.",
    href: "/projects/auron",
    badge: "Medical AI",
    status: "In Development"
  },
  {
    title: "Neura",
    tagline: "Smarter sleep starts here",
    description: "Next-generation smart sleep mask using EOG sensors to detect sleep stages and wake you at the optimal moment. Developed in collaboration with Case Western Reserve University.",
    href: "/projects/neura",
    badge: "Hardware + App",
    status: "Prototype"
  },
  {
    title: "Sunkist Goofbox",
    tagline: "Car culture & storytelling",
    description: "YouTube channel featuring POV drives, car reviews, DIY maintenance content, and the ongoing saga of owning a chrome orange 2005 Lotus Elise.",
    href: "/projects/sunkist-goofbox",
    badge: "YouTube",
    status: "Active"
  },
  {
    title: "Unplugged PGH",
    tagline: "Music festivals & community events",
    description: "Student-run event management collective organizing music festivals and community events across Pittsburgh, Cleveland, and New York. Raised over $10,000 for local nonprofits.",
    href: "/projects/unplugged",
    badge: "Events",
    status: "Active"
  }
];

export default function ProjectsPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main>
      <section className="hero" style={{ position: "relative", overflow: "hidden" }}>
        <HeroBackground />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <motion.span
              className="badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our Work
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Projects & Ventures
            </motion.h1>
            <motion.p
              style={{ maxWidth: 700 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              From empowering students with AI-powered learning tools to helping car enthusiasts manage 
              their collections, our portfolio keeps expanding into new frontiers.
            </motion.p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <StaggerContainer className="cards">
            {projects.map((project) => (
              <StaggerItem key={project.title}>
                <GlassCard href={project.href}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                    <motion.span
                      className="badge"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    >
                      {project.badge}
                    </motion.span>
                    <motion.span
                      className="badge"
                      style={{ background: "rgba(34, 197, 94, 0.12)", color: "#4ade80" }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    >
                      {project.status}
                    </motion.span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="muted" style={{ fontSize: "0.9rem", marginBottom: 8 }}>
                    {project.tagline}
                  </p>
                  <p className="muted">{project.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section">
        <ScrollReveal>
          <div className="container panel" style={{ textAlign: "center" }}>
            <h2>Want to Collaborate?</h2>
            <p className="muted">
              Have an idea or want to work together on something new?
            </p>
            <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
              <AnimatedButton href="/contact" variant="primary">
                Get in Touch
              </AnimatedButton>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

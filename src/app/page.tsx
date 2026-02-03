"use client";

import HeroBackground from "@/components/HeroBackground";
import GlassCard from "@/components/GlassCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import AnimatedButton from "@/components/AnimatedButton";
import { motion, useReducedMotion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  href: string;
  badge: string;
  status?: string;
}

const projects: Project[] = [
  {
    title: "ePrescience",
    description: "All-in-one learning suite for students. AI-powered study tools, flashcards, and spaced repetition.",
    href: "/projects/eprescience",
    badge: "iOS App",
    status: "Live on App Store"
  },
  {
    title: "Spec'd",
    description: "The ultimate mobile companion for car enthusiasts. Track maintenance, log mileage, and digitize your garage.",
    href: "/projects/specd",
    badge: "iOS App",
    status: "Live on App Store"
  },
  {
    title: "Auron Intelligence",
    description: "Medical AI system for arterial CT analysis. Automated detection of vascular abnormalities.",
    href: "/projects/auron",
    badge: "Medical AI"
  },
  {
    title: "Neura",
    description: "Smart sleep mask with EOG sensors. Wake at the optimal point in your sleep cycle.",
    href: "/projects/neura",
    badge: "Hardware + App"
  },
  {
    title: "Sunkist Goofbox",
    description: "YouTube channel documenting car ownership, POV drives, and automotive culture.",
    href: "/projects/sunkist-goofbox",
    badge: "Content"
  },
  {
    title: "Unplugged PGH",
    description: "Student-run event collective organizing music festivals and community events in Pittsburgh.",
    href: "/projects/unplugged",
    badge: "Events"
  }
];

const skills = [
  "iOS Development (Swift, Xcode)",
  "Full-Stack Web Development",
  "Machine Learning & AI",
  "Firebase & Cloud Infrastructure",
  "API Design & Integration",
  "Product Strategy",
  "UI/UX Design",
  "Automation Engineering"
];

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main>
      {/* Hero Section with Animated Background */}
      <section className="hero" style={{ position: "relative", overflow: "hidden" }}>
        <HeroBackground />
        <div className="container hero-grid" style={{ position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <span className="badge">
              Digital Innovation Lab
            </span>
            <h1>
              We solve problems we&apos;ve had ourselves.
            </h1>
            <p>
              RMonaghan Venture Studios is a cutting-edge digital innovation lab specializing in AI-integrated 
              iOS apps and end-to-end product development. We build elegant, high-performance solutions 
              fueled by creativity and dedication.
            </p>
            <div className="nav-cta" style={{ marginBottom: 18 }}>
              <AnimatedButton href="/projects" variant="primary">
                View Projects
              </AnimatedButton>
              <AnimatedButton href="/contact" variant="outline">
                Get in Touch
              </AnimatedButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <GlassCard className="hero-card" href="/about">
              <h3>Meet the Founder</h3>
              <p className="muted">
                Rory Monaghan is a neuroscience student at the University of Pittsburgh, full-stack developer, 
                and entrepreneur building AI-integrated products across healthcare, education, and automotive.
              </p>
              <span className="btn btn-ghost" style={{ marginTop: 16, display: "inline-flex" }}>
                Learn More →
              </span>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <h2>Our Projects</h2>
            <p className="muted">
              From empowering students with AI-powered learning tools to helping car enthusiasts manage their 
              collections, our portfolio keeps expanding into new frontiers.
            </p>
          </ScrollReveal>

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
                    {project.status && (
                      <motion.span
                        className="badge"
                        style={{ background: "rgba(34, 197, 94, 0.12)", color: "#4ade80" }}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      >
                        {project.status}
                      </motion.span>
                    )}
                  </div>
                  <h3>{project.title}</h3>
                  <p className="muted">{project.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section">
        <div className="container split">
          <ScrollReveal>
            <h2>What We Do</h2>
            <p className="muted">
              We utilize Xcode and Swift alongside Firebase, Cloudflare, App Store Connect, RevenueCat, 
              Google AdMob, and a diverse array of APIs — enhanced by AI engines like GPT, Claude, Gemini, 
              and Cursor — to build elegant, high-performance solutions.
            </p>
            <StaggerContainer className="skills-grid">
              {skills.map((skill) => (
                <StaggerItem key={skill}>
                  <motion.div
                    className="skill-item"
                    whileHover={prefersReducedMotion ? {} : { 
                      scale: 1.02,
                      borderColor: "rgba(125, 211, 252, 0.4)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlassCard enableTilt={false}>
              <h3>Our Approach</h3>
              <p className="muted" style={{ marginBottom: 16 }}>
                Backed by an ever-growing network of experts and fueled by creativity and dedication, 
                we tackle tough problems we have experienced ourselves, bringing our products to life 
                with passion and excitement.
              </p>
              <p className="muted">
                From accessible learning platforms to neuroscience-based sleep tools, we&apos;re always 
                exploring new frontiers.
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <ScrollReveal>
          <div className="container panel" style={{ textAlign: "center" }}>
            <h2>Let&apos;s Build Something Together</h2>
            <p className="muted">
              Interested in collaborating, investing, or just want to chat about technology?
            </p>
            <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
              <AnimatedButton href="/contact" variant="primary">
                Get in Touch
              </AnimatedButton>
              <AnimatedButton href="/about" variant="outline">
                About Rory
              </AnimatedButton>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

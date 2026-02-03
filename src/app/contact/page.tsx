"use client";

import ContactForm from "@/components/ContactForm";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";
import HeroBackground from "@/components/HeroBackground";
import { motion } from "framer-motion";

const contactMethods = [
  {
    title: "Email",
    content: "rory.monaghan@eprescience.com",
    href: "mailto:rory.monaghan@eprescience.com",
  },
  {
    title: "LinkedIn",
    content: "linkedin.com/in/rory-monaghan",
    href: "https://www.linkedin.com/in/rory-monaghan-300439260",
  },
  {
    title: "YouTube",
    content: "@SunkistGoofbox",
    href: "https://www.youtube.com/channel/UCXabldsOQzq4tvq5airbQMQ",
  },
  {
    title: "Auron Intelligence",
    content: "Rory.Monaghan@auronintelligence.com",
    href: "mailto:Rory.Monaghan@auronintelligence.com",
  },
];

export default function ContactPage() {
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
              Get in Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Contact
            </motion.h1>
            <motion.p
              style={{ maxWidth: 600 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Interested in collaborating, investing, or just want to chat about technology? 
              Fill out the form below or reach out directly.
            </motion.p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <ScrollReveal>
            <GlassCard enableTilt={false}>
              <h2>Send a Message</h2>
              <p className="muted" style={{ marginBottom: 20 }}>
                Fill out the form and I&apos;ll get back to you as soon as possible.
              </p>
              <ContactForm />
            </GlassCard>
          </ScrollReveal>

          <div>
            <ScrollReveal delay={0.1}>
              <h2>Other Ways to Connect</h2>
            </ScrollReveal>
            <StaggerContainer className="cards" style={{ marginTop: 14 }}>
              {contactMethods.map((method) => (
                <StaggerItem key={method.title}>
                  <GlassCard href={method.href}>
                    <h3>{method.title}</h3>
                    <p style={{ color: "var(--accent)" }}>{method.content}</p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollReveal delay={0.3}>
              <GlassCard enableTilt={false} className="panel" style={{ marginTop: 20 }}>
                <h3>Looking for Something Specific?</h3>
                <ul className="feature-list">
                  <li><strong>Investors:</strong> Reach out about ePrescience or Auron</li>
                  <li><strong>Collaborations:</strong> Open to partnerships and projects</li>
                  <li><strong>Consulting:</strong> iOS, web, AI/ML development</li>
                  <li><strong>Events:</strong> Unplugged PGH performances or partnerships</li>
                </ul>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}

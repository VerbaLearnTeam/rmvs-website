"use client";

import Link from "next/link";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";
import AnimatedButton from "@/components/AnimatedButton";
import HeroBackground from "@/components/HeroBackground";
import { motion, useReducedMotion } from "framer-motion";

const skills = [
  { category: "Mobile Development", items: ["Swift", "Xcode", "iOS", "App Store Connect", "RevenueCat"] },
  { category: "Web Development", items: ["Next.js", "React", "TypeScript", "Node.js", "APIs"] },
  { category: "AI & ML", items: ["GPT", "Claude", "Gemini", "Neural Networks", "Automation"] },
  { category: "Infrastructure", items: ["Firebase", "Cloudflare", "Railway", "PostgreSQL", "Prisma"] },
  { category: "Business", items: ["Product Strategy", "Project Management", "Digital Marketing", "AdMob"] }
];

const roles = [
  {
    title: "Founder & CEO",
    company: "ePrescience",
    description: "Leading product vision and execution for an all-in-one learning suite, simplifying the modern study stack into a single, faster workflow."
  },
  {
    title: "Full-Stack Developer & ML Engineer",
    company: "GapTech",
    description: "Building production-ready mobile and web products end-to-end, specializing in iOS development, scalable backends, and AI-powered workflows."
  },
  {
    title: "Co-Founder",
    company: "Auron Tomography Intelligence System",
    description: "Developing machine learning systems to analyze CTA brain scans and identify arterial abnormalities linked to stroke risk."
  },
  {
    title: "Owner",
    company: "RMonaghan Venture Studios LLC",
    description: "Running a digital innovation lab specializing in AI-integrated iOS apps and end-to-end product development."
  }
];

export default function AboutPage() {
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
              About the Founder
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Rory David Monaghan
            </motion.h1>
            <motion.p
              style={{ maxWidth: 700 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Neuroscience and psychology student at the University of Pittsburgh, full-stack developer, 
              and entrepreneur building AI-integrated products across healthcare, education, and automotive.
            </motion.p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <ScrollReveal>
            <h2>Background</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              Rory Monaghan is the Founder and CEO of ePrescience, inspired by and born out of his 
              frustrations with existing study tools while studying Neuroscience, Psychology, Chemistry, 
              and Mandarin Chinese at the University of Pittsburgh.
            </p>
            <p className="muted" style={{ marginBottom: 16 }}>
              After juggling academics with working a number of day jobs — from retail, making lattes, 
              slapping together sandwiches, and bouncing around on a food truck — he started his first 
              real long-term project, Unplugged, organizing concerts like Oakland Indie Fest across 
              Pittsburgh, Cleveland, and New York.
            </p>
            <p className="muted">
              In his junior year, noticing the rapid evolution of technology with the untapped power of 
              AI and automation, and the corresponding gap between what could exist and what did, he 
              acquired an obsessive passion for learning about and building new technology to bridge those gaps.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlassCard enableTilt={false}>
              <h3>Quick Facts</h3>
              <ul className="feature-list">
                <li>University of Pittsburgh (Neuroscience & Psychology)</li>
                <li>Minors in Chemistry and Mandarin Chinese</li>
                <li>Fluent in Mandarin</li>
                <li>Dual US-EU citizenship</li>
                <li>20+ countries visited in 3 years</li>
                <li>Aspiring EMT and jazz drummer</li>
                <li>Real estate investor in Pittsburgh&apos;s East End</li>
              </ul>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <h2>Current Roles</h2>
          </ScrollReveal>
          <StaggerContainer className="cards">
            {roles.map((role) => (
              <StaggerItem key={role.company}>
                <GlassCard>
                  <motion.span
                    className="badge"
                    style={{ marginBottom: 12 }}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  >
                    {role.company}
                  </motion.span>
                  <h3>{role.title}</h3>
                  <p className="muted">{role.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <h2>Skills & Technologies</h2>
            <p className="muted">
              Full-stack expertise spanning mobile development, web applications, AI/ML, and cloud infrastructure.
            </p>
          </ScrollReveal>
          <StaggerContainer className="cards">
            {skills.map((category) => (
              <StaggerItem key={category.category}>
                <GlassCard enableTilt={false}>
                  <h3>{category.category}</h3>
                  <div className="skills-grid" style={{ marginTop: 12 }}>
                    {category.items.map((skill) => (
                      <motion.span
                        key={skill}
                        className="badge"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <ScrollReveal>
            <h2>Philosophy</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              His approach blends hands-on product engineering with a deep interest in how people actually 
              learn, remember, and perform under pressure. He leads with one goal: simplify complex workflows 
              into single, faster solutions that give people their time back.
            </p>
            <p className="muted">
              That&apos;s why he pledges to ensure users are involved in all conversations and decision-making 
              as his companies evolve.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlassCard enableTilt={false}>
              <h3>Beyond Work</h3>
              <p className="muted" style={{ marginBottom: 16 }}>
                When not building products, Rory works on his side quests: becoming an EMT, drumming in a 
                jazz band, driving cool cars (including his chrome orange 2005 Lotus Elise nicknamed the 
                &quot;Sunkist Goofbox&quot;), and traveling extensively.
              </p>
              <p className="muted">
                He&apos;s also the founder of Unplugged PGH, having organized more than ten music festivals 
                and raised over $10,000 for community causes.
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <ScrollReveal>
          <div className="container panel" style={{ textAlign: "center" }}>
            <h2>Let&apos;s Connect</h2>
            <p className="muted">
              Interested in collaborating, investing, or just want to chat?
            </p>
            <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
              <AnimatedButton href="/contact" variant="primary">
                Get in Touch
              </AnimatedButton>
              <AnimatedButton
                href="https://www.linkedin.com/in/rory-monaghan-300439260"
                variant="outline"
              >
                LinkedIn
              </AnimatedButton>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

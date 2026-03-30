import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { skillCategories, infrastructureSkills } from "@/data/skills";
import { locations } from "@/data/locations";
import Counter from "@/components/home/Counter";
import SkillsOrbit from "@/components/home/SkillsOrbit";
import GlobeDots from "@/components/home/GlobeDots";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectCard from "@/components/shared/ProjectCard";

export default function HomePage() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <section id="hero" className="hero" style={{ position: "relative" }}>
        <div className="container hero-grid">
          <div>
            <span className="badge" style={{ marginBottom: 20 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#4ade80",
                  display: "inline-block",
                }}
              />
              Digital Innovation Lab — Pittsburgh, PA
            </span>

            <h1>We build what we wish existed.</h1>

            <p>
              RMonaghan Venture Studios is a digital innovation lab specializing
              in AI-integrated iOS apps, developer tooling, clinical AI, and
              end-to-end product development. From concept to App Store — fueled
              by creativity and dedication.
            </p>

            <div className="nav-cta" style={{ marginBottom: 24 }}>
              <Link href="/projects" className="btn btn-primary">
                View Projects
              </Link>
              <Link href="/blog" className="btn btn-outline">
                Read the Blog →
              </Link>
            </div>

            <div className="flex gap-12 mt-8">
              <Counter end={6} label="Active Projects" suffix="+" />
              <Counter end={20} label="Countries Visited" suffix="+" />
              <Counter end={3} label="Products Live" />
            </div>
          </div>

          <Link href="/about" className="hero-card" style={{ display: "block" }}>
            <div
              className="overflow-hidden rounded-xl mb-4"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src="/images/rory-founder.png"
                alt="Rory Monaghan, Founder of RMVS"
                width={400}
                height={300}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <h3>Meet the Founder</h3>
            <p
              className="muted"
              style={{ fontSize: "0.92rem", marginBottom: 12 }}
            >
              Rory Monaghan is a neuroscience student at the University of
              Pittsburgh, full-stack developer, and entrepreneur building
              AI-integrated products across healthcare, education, and
              automotive.
            </p>
            <span className="btn btn-ghost" style={{ display: "inline-flex" }}>
              Learn More →
            </span>
          </Link>
        </div>

      </section>

      {/* ─── Trailer ─── */}
      <section id="trailer" className="section">
        <div className="container" style={{ maxWidth: 896, margin: "0 auto" }}>
          <span className="section-label">WATCH</span>
          <div
            className="relative w-full rounded-xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "16 / 9" }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/1NZnxGDy3Uo"
              title="RMVS Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ─── Projects & Ventures ─── */}
      <section id="projects" className="section">
        <div className="container">
          <SectionHeader
            label="PORTFOLIO"
            title="Projects & Ventures"
            description="From empowering students with AI-powered learning tools to helping car enthusiasts manage their collections, our portfolio keeps expanding into new frontiers."
          />
          <div className="cards">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Capabilities / Skills Orbit ─── */}
      <section id="capabilities" className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <SectionHeader
            label="CAPABILITIES"
            title="Tech Stack & Tools"
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <SkillsOrbit />
          </div>

          {/* Server-rendered fallback for crawlers */}
          <div className="sr-only">
            {skillCategories.map((cat) => (
              <div key={cat.name}>
                <h3>{cat.name}</h3>
                <p>{cat.skills.join(", ")}</p>
              </div>
            ))}
            <div>
              <h3>Infrastructure</h3>
              <p>{infrastructureSkills.join(", ")}</p>
            </div>
          </div>

          <noscript>
            <div style={{ marginTop: 32 }}>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                {skillCategories
                  .flatMap((c) => c.skills)
                  .concat(infrastructureSkills)
                  .map((s) => (
                    <li
                      key={s}
                      style={{
                        padding: "6px 14px",
                        background: "var(--glass)",
                        border: "1px solid var(--glass-border)",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.85rem",
                      }}
                    >
                      {s}
                    </li>
                  ))}
              </ul>
            </div>
          </noscript>
        </div>
      </section>

      {/* ─── What We Do ─── */}
      <section className="section">
        <div className="container split">
          <div>
            <SectionHeader
              label="APPROACH"
              title="What We Do"
              description="We utilize Xcode and Swift alongside Firebase, Cloudflare, App Store Connect, RevenueCat, and a diverse array of APIs — enhanced by AI engines like Claude, GPT, Gemini, and Cursor — to build elegant, high-performance solutions."
            />
          </div>
          <div className="glass-card" style={{ cursor: "default" }}>
            <h3>Our Approach</h3>
            <p className="muted" style={{ marginBottom: 16 }}>
              Backed by an ever-growing network of experts and fueled by
              creativity and dedication, we tackle tough problems we have
              experienced ourselves, bringing our products to life with passion
              and excitement.
            </p>
            <p className="muted">
              From accessible learning platforms to neuroscience-based sleep
              tools, we&apos;re always exploring new frontiers.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Blog Preview ─── */}
      <section id="blog" className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <SectionHeader
              label="ENGINEERING BLOG"
              title="Latest Posts"
            />
            <Link href="/blog" className="btn btn-outline">
              View All Posts →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {[
              {
                slug: "segmentation-api",
                title: "Segmentation API: Affordable Image Segmentation for Every Developer",
                pillar: "Tool Review",
                date: "Apr 2, 2026",
                readTime: "10 min read",
              },
              {
                slug: "blacksnow-research",
                title: "BlackSnow Research: The Deterministic World Compiler",
                pillar: "Tool Review",
                date: "Apr 14, 2026",
                readTime: "12 min read",
              },
            ].map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card"
                style={{ display: "block" }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--pillar-tool-review)",
                    marginBottom: 8,
                    display: "block",
                  }}
                >
                  {post.pillar}
                </span>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{post.title}</h3>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--white-dim)",
                  }}
                >
                  {post.date} · {post.readTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Global Network ─── */}
      <section id="global" className="section">
        <div className="container">
          <SectionHeader
            label="GLOBAL REACH"
            title="Building Across Borders"
          />
          <div className="split" style={{ alignItems: "center" }}>
            <GlobeDots />
            <div>
              <p className="muted" style={{ marginBottom: 20 }}>
                RMVS partners span Pittsburgh, Cleveland, New York, Seoul,
                and East Africa. Our network connects builders, researchers, and
                communities across every continent.
              </p>
              <div
                style={{
                  display: "grid",
                  gap: 10,
                }}
              >
                {locations.slice(0, 5).map((loc) => (
                  <div
                    key={loc.city}
                    className="flex items-center gap-3"
                    style={{
                      padding: "10px 14px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border)",
                      background: "var(--glass)",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{loc.flag}</span>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          color: "var(--white-bright)",
                        }}
                      >
                        {loc.city}, {loc.country}
                      </div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--white-dim)",
                        }}
                      >
                        {loc.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="contact" className="section">
        <div className="container" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <h2>Let&apos;s Build Something</h2>
          <p className="muted" style={{ marginBottom: 24 }}>
            Interested in collaborating, investing, or just want to chat about
            technology? We&apos;d love to hear from you.
          </p>
          <div className="nav-cta" style={{ justifyContent: "center" }}>
            <Link href="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
            <a
              href="https://www.linkedin.com/in/rory-monaghan-300439260"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

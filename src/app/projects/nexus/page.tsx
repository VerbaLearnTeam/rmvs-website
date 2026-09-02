import Link from "next/link";
import ProjectPageHeader from "@/components/shared/ProjectPageHeader";

export const metadata = {
  title: "Nexus | RMonaghan Venture Studios",
  description:
    "Nexus is a relationship intelligence platform: CRM, advertising, investors, team, social, and data on one shared graph — provenance on every write, agent-native from day one.",
};

const modules = [
  "CRM — customer relationship management",
  "ARM — advertising & campaign relationships",
  "IRM — investor pipeline",
  "TRM — team & hiring",
  "SRM — social & content",
  "DRM — data intelligence",
  "Companion workspaces: Rolodex, Publishing, Visual Testing",
];

export default function NexusPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>
          <ProjectPageHeader
            stickerSrc="/images/projects/nexus-sticker.png"
            stickerAlt="Nexus sticker — one graph, zero silos"
          >
            <span className="badge">Platform</span>
            <h1>Nexus</h1>
            <p className="muted" style={{ fontSize: "1.1rem" }}>
              Relationship intelligence for the creators and companies building the future.
            </p>
          </ProjectPageHeader>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>About Nexus</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              Nexus replaces the patchwork of CRMs, spreadsheets, schedulers, and ad dashboards
              with one platform built on a single shared relationship graph. Six core modules —
              customers, advertising, investors, team, social, and data — read and write the same
              record model, so no data lives in isolation.
            </p>
            <p className="muted" style={{ marginBottom: 16 }}>
              Every value carries its provenance: where it came from, how confident the system is,
              and the full audit trail behind it. Attribution confidence is shown, not faked —
              modeled numbers are labeled as modeled, derived scores are recomputable, and every
              agent action is auditable in an append-only log.
            </p>
            <p className="muted">
              Nexus is agent-native from the first line of code: a REST API, an MCP server, and a
              TypeScript SDK sit alongside the dashboard, so AI agents are first-class operators of
              the platform rather than bolted-on chatbots.
            </p>
          </div>
          <div className="panel">
            <h3>One graph, six modules</h3>
            <ul className="feature-list">
              {modules.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What Makes It Different</h2>
          <div className="cards">
            <div className="card">
              <h3>Honest attribution</h3>
              <p className="muted">
                Modeled installs show their confidence score. Agent-inferred fields say so. Derived
                lead scores are recomputable. Your data tells the truth, and your CFO can trust the
                numbers.
              </p>
            </div>
            <div className="card">
              <h3>Agent-native architecture</h3>
              <p className="muted">
                REST API, MCP server, and TypeScript SDK from day one. Agents create records,
                automate investor touches, and schedule content — with provenance and audit trails
                on every write.
              </p>
            </div>
            <div className="card">
              <h3>Built-in visual testing</h3>
              <p className="muted">
                Define test suites, capture screenshots across devices, and let VLM analysis catch
                visual regressions before users do. Nexus guards its own UI with it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container panel" style={{ textAlign: "center" }}>
          <h2>Explore Nexus</h2>
          <p className="muted">
            One graph, six modules, honest attribution — see the platform in action.
          </p>
          <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <a
              className="btn btn-primary"
              href="https://nexusrelate.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit nexusrelate.com
            </a>
            <Link className="btn btn-outline" href="/contact">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

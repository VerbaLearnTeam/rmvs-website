import Link from "next/link";

export const metadata = {
  title: "Orchard | RMonaghan Venture Studios",
  description:
    "Agent-native development environment for Apple platforms. Supervise AI agents across code, simulators, browsers, and release pipelines — with evidence, not vibes.",
};

const features = [
  "Runtime slices binding code, Xcode, simulator, and verification",
  "Unified evidence: diffs, screenshots, xcresult, logs, network traces",
  "Executable contracts — machine-checkable definitions of done",
  "Apple-first automation via MCP bridge and XcodeBuildMCP",
  "Agent orchestration with human review checkpoints",
  "Release pipeline: TestFlight, App Store Connect, Xcode Cloud",
];

export default function OrchardPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>
          <div className="project-header">
            <span className="badge">Developer Tools</span>
            <h1>Orchard</h1>
            <p className="muted" style={{ fontSize: "1.1rem" }}>
              The IDE that proves your app works
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>About Orchard</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              Orchard is an agent-native development environment for Apple platforms. It treats
              Xcode as a subsystem — not the product — providing a workspace where AI coding agents
              can see, drive, verify, and ship full-stack iOS apps end-to-end.
            </p>
            <p className="muted" style={{ marginBottom: 16 }}>
              Unlike traditional AI code editors, Orchard is a development operating system built
              around proofs, not vibes. Every agent action produces evidence: which build, which
              device, which screen, which logs, which tests passed. The goal is to make the iOS
              development loop as observable as browser DevTools.
            </p>
            <p className="muted">
              Orchard is currently in early-stage planning and architecture. We are seeking a
              technical co-founder and early design partners.
            </p>
          </div>
          <div className="panel">
            <h3>Key Capabilities</h3>
            <ul className="feature-list">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>How Orchard Works</h2>
          <div className="cards">
            <div className="card">
              <h3>Runtime Slices</h3>
              <p className="muted">
                Isolated lanes per feature or bug — each binding a worktree, Xcode context,
                simulator/device, browser sessions, and acceptance contracts into a single
                pausable, resumable unit.
              </p>
            </div>
            <div className="card">
              <h3>Agent Orchestration</h3>
              <p className="muted">
                Specialized agent roles (planner, implementer, verifier, release manager) share a
                unified event model with human review gates at every critical transition.
              </p>
            </div>
            <div className="card">
              <h3>Evidence, Not Screenshots</h3>
              <p className="muted">
                Every verification step captures structured proof: diffs, xcresult bundles, network
                traces, accessibility audits, and simulator recordings — not just pixel comparisons.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Architecture Layers</h2>
          <div className="cards">
            <div className="card">
              <h3>Canvas OS</h3>
              <p className="muted">
                A zoomable operational map showing repos, tasks, agent runs, simulators, browsers,
                build results, and release status in a single spatial view.
              </p>
            </div>
            <div className="card">
              <h3>Apple Execution Plane</h3>
              <p className="muted">
                Deep integration with xcrun, XcodeBuildMCP, simctl/devicectl, App Store Connect,
                TestFlight, and Xcode Cloud — native where Apple requires it.
              </p>
            </div>
            <div className="card">
              <h3>Verification OS</h3>
              <p className="muted">
                Executable contracts that gate progression: screen checks, accessibility audits,
                snapshot tests, network assertions, and performance budgets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container panel" style={{ textAlign: "center" }}>
          <h2>Interested in Orchard?</h2>
          <p className="muted">
            We&apos;re seeking a technical co-founder (Rust/GPUI or Swift), seed investors, and
            early design partners.
          </p>
          <div className="nav-cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <Link className="btn btn-primary" href="/contact">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

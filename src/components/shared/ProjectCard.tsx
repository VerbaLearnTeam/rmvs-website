import Link from "next/link";
import type { Project } from "@/data/projects";

const statusColors: Record<string, string> = {
  live: "badge-green",
  development: "badge-amber",
  prototype: "badge-purple",
  active: "",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="glass-card" style={{ display: "block" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <span className="badge">{project.badge}</span>
        <span className={`badge ${statusColors[project.status] || ""}`}>
          {project.statusLabel}
        </span>
      </div>
      <h3>{project.title}</h3>
      <p className="muted" style={{ fontSize: "0.92rem", marginBottom: 12 }}>
        {project.description}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono"
            style={{
              fontSize: "0.72rem",
              padding: "3px 8px",
              borderRadius: "var(--radius-sm)",
              background: "var(--white-faint)",
              color: "var(--white-dim)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

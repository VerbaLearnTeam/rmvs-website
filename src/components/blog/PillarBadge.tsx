const pillarColors: Record<string, string> = {
  "Methodology": "var(--pillar-methodology)",
  "Build Log": "var(--pillar-build-log)",
  "Architecture": "var(--pillar-architecture)",
  "Tool Review": "var(--pillar-tool-review)",
  "Industry": "var(--pillar-industry)",
};

export default function PillarBadge({ pillar }: { pillar: string }) {
  const color = pillarColors[pillar] || "var(--cyan)";

  return (
    <span
      className="font-mono"
      style={{
        fontSize: "0.72rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color,
      }}
    >
      {pillar}
    </span>
  );
}

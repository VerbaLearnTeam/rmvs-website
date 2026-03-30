interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <span className="section-label">{label}</span>
      <h2>{title}</h2>
      {description && (
        <p className="muted" style={{ maxWidth: 600, fontSize: "1.05rem", lineHeight: 1.7 }}>
          {description}
        </p>
      )}
    </div>
  );
}

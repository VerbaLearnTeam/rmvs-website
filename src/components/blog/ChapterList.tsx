interface Chapter {
  title: string;
  timestamp: string;
}

interface ChapterListProps {
  chapters: Chapter[];
  onSelect?: (timestamp: string) => void;
}

export default function ChapterList({ chapters, onSelect }: ChapterListProps) {
  if (chapters.length === 0) return null;

  return (
    <nav
      aria-label="Audio chapters"
      style={{
        padding: 20,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        background: "var(--glass)",
      }}
    >
      <h4
        style={{
          fontSize: "0.88rem",
          fontWeight: 600,
          marginBottom: 12,
          color: "var(--white-bright)",
        }}
      >
        Chapters
      </h4>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {chapters.map((ch, i) => (
          <li key={i}>
            <button
              onClick={() => onSelect?.(ch.timestamp)}
              className="w-full text-left flex items-center gap-3 py-2 group"
              style={{
                fontSize: "0.85rem",
                color: "var(--white-dim)",
                transition: "color 0.15s",
              }}
            >
              <span
                className="font-mono"
                style={{ color: "var(--cyan)", fontSize: "0.78rem", minWidth: 45 }}
              >
                {ch.timestamp}
              </span>
              <span className="group-hover:text-white transition-colors">{ch.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

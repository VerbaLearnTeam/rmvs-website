"use client";

import { useState } from "react";

interface ReadListenToggleProps {
  hasAudio: boolean;
  onModeChange?: (mode: "read" | "listen") => void;
}

export default function ReadListenToggle({ hasAudio, onModeChange }: ReadListenToggleProps) {
  const [mode, setMode] = useState<"read" | "listen">("read");

  if (!hasAudio) return null;

  const toggle = (m: "read" | "listen") => {
    setMode(m);
    onModeChange?.(m);
  };

  return (
    <div
      className="inline-flex items-center rounded-full"
      style={{
        border: "1px solid var(--border)",
        background: "var(--glass)",
        padding: 3,
      }}
    >
      <button
        onClick={() => toggle("read")}
        className="font-mono text-xs px-3 py-1.5 rounded-full transition-all"
        style={{
          background: mode === "read" ? "var(--cyan-subtle)" : "transparent",
          color: mode === "read" ? "var(--cyan)" : "var(--white-dim)",
          border: mode === "read" ? "1px solid var(--cyan-border)" : "1px solid transparent",
        }}
      >
        📖 Read
      </button>
      <button
        onClick={() => toggle("listen")}
        className="font-mono text-xs px-3 py-1.5 rounded-full transition-all"
        style={{
          background: mode === "listen" ? "var(--cyan-subtle)" : "transparent",
          color: mode === "listen" ? "var(--cyan)" : "var(--white-dim)",
          border: mode === "listen" ? "1px solid var(--cyan-border)" : "1px solid transparent",
        }}
      >
        🎧 Listen
      </button>
    </div>
  );
}

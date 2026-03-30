"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home", icon: "⌂" },
  { id: "projects", label: "Projects", icon: "◈" },
  { id: "capabilities", label: "Skills", icon: "⟡" },
  { id: "blog", label: "Blog", icon: "✎" },
  { id: "global", label: "Network", icon: "◎" },
  { id: "contact", label: "Contact", icon: "↗" },
];

export default function DockNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-2.5 rounded-2xl"
      style={{
        zIndex: "var(--z-dock)",
        background: "rgba(10, 15, 28, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--glass-border)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          aria-label={s.label}
          className="relative flex items-center justify-center rounded-xl transition-all duration-200 group"
          style={{
            width: 40,
            height: 40,
            background: active === s.id ? "var(--cyan-glow)" : "transparent",
            color: active === s.id ? "var(--cyan)" : "var(--white-dim)",
          }}
        >
          <span className="text-lg" aria-hidden="true">
            {s.icon}
          </span>
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity"
            style={{
              background: "var(--glass)",
              border: "1px solid var(--glass-border)",
              color: "var(--white)",
              fontSize: "0.7rem",
            }}
          >
            {s.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

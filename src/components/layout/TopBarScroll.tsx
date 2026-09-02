"use client";

import { ReactNode, useEffect, useState } from "react";

export function TopBarScroll({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="site-header"
      data-scrolled={scrolled || undefined}
      style={{
        background: scrolled ? "var(--header-bg)" : "transparent",
        borderBottom: scrolled ? undefined : "1px solid transparent",
        // Never toggle backdrop-filter on/off: doing so destroys and
        // recreates the header's compositing layer mid-scroll, which
        // flickers badly over GPU-heavy pages (services hero, redline
        // slider). The blur stays on permanently — invisible at the top
        // since nothing sits under the sticky header at scroll 0 — and
        // only paint-safe properties are transitioned.
        transition:
          "background 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </header>
  );
}

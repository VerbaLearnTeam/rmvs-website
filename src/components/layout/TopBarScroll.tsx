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
      style={{
        background: scrolled
          ? "linear-gradient(180deg, rgba(10, 15, 28, 0.92) 0%, rgba(10, 15, 28, 0.85) 100%)"
          : "transparent",
        borderBottom: scrolled ? undefined : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </header>
  );
}

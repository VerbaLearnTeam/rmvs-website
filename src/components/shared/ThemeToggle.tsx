"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("rmvs-theme");
    if (stored === "light") {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    } else if (!stored) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (!prefersDark) {
        setTheme("light");
        document.documentElement.setAttribute("data-theme", "light");
      }
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("rmvs-theme", next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      style={{ padding: "8px 12px", fontSize: "0.88rem" }}
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
      )}
    </button>
  );
}

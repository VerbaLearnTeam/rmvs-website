"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";

interface SearchablePost {
  slug: string;
  title: string;
  excerpt: string;
  pillar: string;
  tags: string[];
}

export default function BlogSearch({ posts }: { posts: SearchablePost[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "tags", "excerpt", "pillar"],
        threshold: 0.35,
        includeScore: true,
      }),
    [posts]
  );

  const results = query.length > 1 ? fuse.search(query).slice(0, 6) : [];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="font-mono flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
        style={{
          border: "1px solid var(--border)",
          color: "var(--white-dim)",
          background: "var(--glass)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        Search
        <kbd
          className="font-mono"
          style={{
            fontSize: "0.65rem",
            padding: "2px 5px",
            borderRadius: 4,
            border: "1px solid var(--border-hover)",
            color: "var(--white-dim)",
          }}
        >
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        style={{ zIndex: 2000, background: "rgba(0,0,0,0.5)" }}
        onClick={() => {
          setOpen(false);
          setQuery("");
        }}
      />

      {/* Search dialog */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg"
        style={{
          zIndex: 2001,
          background: "var(--bg)",
          border: "1px solid var(--border-hover)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          overflow: "hidden",
        }}
      >
        <div
          className="flex items-center gap-3 px-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--white-dim)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full py-3 bg-transparent outline-none"
            style={{ color: "var(--white)", fontSize: "0.95rem" }}
          />
          <kbd
            className="font-mono"
            style={{
              fontSize: "0.65rem",
              padding: "2px 5px",
              borderRadius: 4,
              border: "1px solid var(--border-hover)",
              color: "var(--white-dim)",
            }}
          >
            ESC
          </kbd>
        </div>

        {results.length > 0 && (
          <div className="py-2" style={{ maxHeight: 320, overflowY: "auto" }}>
            {results.map(({ item }) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className="block px-4 py-3 transition-colors"
                style={{
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--cyan)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {item.pillar}
                </span>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    color: "var(--white-bright)",
                    marginTop: 2,
                  }}
                >
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        )}

        {query.length > 1 && results.length === 0 && (
          <div
            className="px-4 py-8 text-center"
            style={{ color: "var(--white-dim)", fontSize: "0.9rem" }}
          >
            No posts found for &ldquo;{query}&rdquo;
          </div>
        )}
      </div>
    </>
  );
}

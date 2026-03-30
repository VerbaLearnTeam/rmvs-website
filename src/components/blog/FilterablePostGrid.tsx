"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/blog";
import BlogCard from "./BlogCard";

const ALL_PILLARS = ["All", "Methodology", "Build Log", "Architecture", "Tool Review", "Industry"];

export default function FilterablePostGrid({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState("All");

  return (
    <>
      <div
        role="tablist"
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        {ALL_PILLARS.map((p) => (
          <button
            key={p}
            role="tab"
            aria-selected={filter === p}
            onClick={() => setFilter(p)}
            className="font-mono"
            style={{
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              border: `1px solid ${filter === p ? "var(--cyan-border)" : "var(--border)"}`,
              background: filter === p ? "var(--cyan-subtle)" : "transparent",
              color: filter === p ? "var(--cyan)" : "var(--white-dim)",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {posts.map((post) => (
          <div
            key={post.slug}
            style={{
              display:
                filter === "All" || post.pillar === filter ? "block" : "none",
            }}
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </>
  );
}

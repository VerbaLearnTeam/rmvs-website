import Link from "next/link";
import PillarBadge from "./PillarBadge";
import type { BlogPost } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass-card"
      style={{ display: "block" }}
    >
      <PillarBadge pillar={post.pillar} />
      <h3 style={{ fontSize: "1.05rem", margin: "10px 0 8px" }}>
        {post.title}
      </h3>
      <p
        className="muted"
        style={{
          fontSize: "0.88rem",
          lineHeight: 1.6,
          marginBottom: 12,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {post.excerpt}
      </p>
      <div
        className="font-mono"
        style={{
          fontSize: "0.75rem",
          color: "var(--white-dim)",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        <span>·</span>
        <span>{post.readTime}</span>
        {post.audio?.published && (
          <>
            <span>·</span>
            <span>🎧 {post.audio.duration}</span>
          </>
        )}
      </div>
    </Link>
  );
}

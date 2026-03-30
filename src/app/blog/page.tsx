import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { generateBlogSchema } from "@/lib/structured-data";
import FilterablePostGrid from "@/components/blog/FilterablePostGrid";
import BlogSearch from "@/components/blog/BlogSearch";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Engineering Blog",
  description:
    "Technical dispatches from ePrescience, Auron, Orchard, and the RMVS venture studio. Build logs, architecture decisions, tool reviews, and methodology deep-dives.",
  openGraph: {
    title: "Engineering Blog | RMVS",
    description:
      "Technical dispatches from the RMVS venture studio.",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const searchablePosts = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    pillar: p.pillar,
    tags: p.tags,
  }));

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogSchema()) }}
      />
      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
            <div style={{ maxWidth: 680 }}>
              <SectionHeader
                label="ENGINEERING BLOG"
                title="Technical Dispatches"
                description="Build logs, architecture decisions, tool reviews, and methodology deep-dives from ePrescience, Auron, Orchard, and the RMVS venture studio."
              />
            </div>
            <BlogSearch posts={searchablePosts} />
          </div>

          <FilterablePostGrid posts={posts} />

          {/* Server-rendered fallback for crawlers */}
          <div className="sr-only" aria-hidden="false">
            {posts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span>{post.pillar}</span>
                <time dateTime={post.date}>{post.date}</time>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

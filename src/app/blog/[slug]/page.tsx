import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { renderMDX } from "@/lib/mdx";
import { generateArticleSchema, generateFAQSchema } from "@/lib/structured-data";
import PillarBadge from "@/components/blog/PillarBadge";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: ["Rory Monaghan"],
      tags: post.tags,
    },
    alternates: {
      canonical: `https://www.rmvs.org/blog/${post.slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = await renderMDX(post.content);

  const articleSchema = generateArticleSchema(post);
  const faqSchema =
    post.questions_answered && post.questions_answered.length > 0
      ? generateFAQSchema(post)
      : null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <article className="section" style={{ paddingTop: 40 }}>
        <div className="reading-width">
          <Link
            href="/blog"
            className="back-link"
            style={{ marginBottom: 24, display: "inline-flex" }}
          >
            ← Back to Blog
          </Link>

          <header style={{ marginBottom: 40 }}>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 16,
              }}
            >
              <PillarBadge pillar={post.pillar} />
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="font-mono"
                  style={{
                    fontSize: "0.72rem",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--white-faint)",
                    color: "var(--white-dim)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              {post.title}
            </h1>

            <div
              className="font-mono"
              style={{
                fontSize: "0.82rem",
                color: "var(--white-dim)",
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span>Rory Monaghan</span>
              <span>·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.readTime}</span>
              {post.audio?.published && (
                <>
                  <span>·</span>
                  <span>🎧 {post.audio.duration}</span>
                </>
              )}
            </div>
          </header>

          <div>{content}</div>

          {/* Entity mentions */}
          {post.entities && post.entities.length > 0 && (
            <aside
              style={{
                marginTop: 48,
                padding: 24,
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                background: "var(--glass)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.95rem",
                  marginBottom: 16,
                  color: "var(--white-bright)",
                }}
              >
                Mentioned in this article
              </h3>
              <div
                style={{
                  display: "grid",
                  gap: 10,
                }}
              >
                {post.entities.map((entity) => (
                  <a
                    key={entity.name}
                    href={entity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                      fontSize: "0.88rem",
                      color: "var(--white)",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <span>{entity.name}</span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--white-dim)",
                        textTransform: "uppercase",
                      }}
                    >
                      {entity.type}
                    </span>
                  </a>
                ))}
              </div>
            </aside>
          )}
        </div>
      </article>
    </main>
  );
}

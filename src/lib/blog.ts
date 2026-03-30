import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  pillar: string;
  tags: string[];
  excerpt: string;
  featured: boolean;
  status: string;
  readTime: string;
  content: string;
  entities?: Array<{
    name: string;
    type: string;
    url: string;
    description: string;
  }>;
  questions_answered?: string[];
  related_posts?: string[];
  canonical_products?: Array<{ name: string; role: string }>;
  seo?: { title: string; description: string };
  audio?: {
    url: string;
    duration: string;
    chapters: Array<{ title: string; timestamp: string }>;
    published: boolean;
  };
}

function parseMDXFile(filePath: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    if (!data.title || !data.slug) return null;

    const stats = readingTime(content);

    return {
      slug: data.slug,
      title: data.title,
      date: data.date,
      updated: data.updated,
      pillar: data.pillar || "Uncategorized",
      tags: data.tags || [],
      excerpt: data.excerpt || "",
      featured: data.featured || false,
      status: data.status || "draft",
      readTime: stats.text,
      content,
      entities: data.entities,
      questions_answered: data.questions_answered,
      related_posts: data.related_posts,
      canonical_products: data.canonical_products,
      seo: data.seo,
      audio: data.audio,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files
    .map((f) => parseMDXFile(path.join(BLOG_DIR, f)))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const files = [`${slug}.mdx`, `${slug}.md`];

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    if (fs.existsSync(filePath)) {
      return parseMDXFile(filePath);
    }
  }

  return null;
}

export function getPostsByPillar(pillar: string): BlogPost[] {
  return getAllPosts().filter(
    (p) => p.pillar.toLowerCase() === pillar.toLowerCase()
  );
}

export function getAllPillars(): string[] {
  const posts = getAllPosts();
  const pillars = new Set(posts.map((p) => p.pillar));
  return Array.from(pillars);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

import { getAllPosts } from "@/lib/blog";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://www.rmvs.org/blog/${post.slug}</link>
      <guid>https://www.rmvs.org/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.pillar)}</category>
      ${
        post.audio?.published && post.audio.url
          ? `<enclosure url="${escapeXml(post.audio.url)}" type="audio/mpeg" length="0" />`
          : ""
      }
      <itunes:duration>${post.audio?.duration || post.readTime}</itunes:duration>
      <itunes:author>Rory Monaghan</itunes:author>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RMVS Engineering Blog</title>
    <link>https://www.rmvs.org/blog</link>
    <description>Technical dispatches from ePrescience, Auron, Orchard, and the RMVS venture studio.</description>
    <language>en-us</language>
    <managingEditor>rory@rmvs.org (Rory Monaghan)</managingEditor>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://www.rmvs.org/feed.xml" rel="self" type="application/rss+xml"/>
    <itunes:author>Rory Monaghan</itunes:author>
    <itunes:owner>
      <itunes:name>Rory Monaghan</itunes:name>
      <itunes:email>rory@rmvs.org</itunes:email>
    </itunes:owner>
    <itunes:category text="Technology"/>
    <itunes:image href="https://www.rmvs.org/logo.png"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

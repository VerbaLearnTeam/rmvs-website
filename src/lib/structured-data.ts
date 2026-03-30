import type { BlogPost } from "./blog";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RMonaghan Venture Studios",
    alternateName: "RMVS",
    url: "https://www.rmvs.org",
    logo: "https://www.rmvs.org/logo.png",
    description:
      "Digital innovation lab specializing in AI-integrated iOS apps, developer tooling, clinical AI, and end-to-end product development.",
    founder: {
      "@type": "Person",
      name: "Rory Monaghan",
      url: "https://www.rmvs.org/about",
      jobTitle: "Founder & CEO",
      affiliation: {
        "@type": "Organization",
        name: "University of Pittsburgh",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pittsburgh",
      addressRegion: "PA",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.linkedin.com/in/rory-monaghan-300439260",
      "https://github.com/VerbaLearnTeam",
    ],
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rory Monaghan",
    url: "https://www.rmvs.org/about",
    jobTitle: "Founder & CEO",
    worksFor: {
      "@type": "Organization",
      name: "RMonaghan Venture Studios",
      url: "https://www.rmvs.org",
    },
    affiliation: {
      "@type": "Organization",
      name: "University of Pittsburgh",
    },
    knowsAbout: [
      "iOS Development",
      "Artificial Intelligence",
      "Neuroscience",
      "Clinical AI",
      "Product Development",
    ],
    sameAs: [
      "https://www.linkedin.com/in/rory-monaghan-300439260",
      "https://github.com/VerbaLearnTeam",
    ],
  };
}

export function generateArticleSchema(post: BlogPost) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.seo?.description || post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Person",
      name: "Rory Monaghan",
      url: "https://www.rmvs.org/about",
    },
    publisher: {
      "@type": "Organization",
      name: "RMonaghan Venture Studios",
      url: "https://www.rmvs.org",
      logo: {
        "@type": "ImageObject",
        url: "https://www.rmvs.org/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.rmvs.org/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.pillar,
  };

  if (post.audio?.published && post.audio.url) {
    schema.audio = {
      "@type": "AudioObject",
      contentUrl: post.audio.url,
      duration: post.audio.duration,
      encodingFormat: "audio/mpeg",
      name: `${post.title} — Audio Version`,
    };
  }

  return schema;
}

export function generateFAQSchema(post: BlogPost) {
  if (!post.questions_answered || post.questions_answered.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.questions_answered.map((q) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: `See the full answer in our article: ${post.title}`,
        url: `https://www.rmvs.org/blog/${post.slug}`,
      },
    })),
  };
}

export function generateBlogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "RMVS Engineering Blog",
    description:
      "Technical dispatches from ePrescience, Auron, Orchard, and the RMVS venture studio.",
    url: "https://www.rmvs.org/blog",
    publisher: {
      "@type": "Organization",
      name: "RMonaghan Venture Studios",
    },
    blogPost: [],
  };
}

export function generateSoftwareSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "iOS",
    author: {
      "@type": "Organization",
      name: "RMonaghan Venture Studios",
    },
  };
}

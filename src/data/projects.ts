export interface Project {
  title: string;
  slug: string;
  description: string;
  badge: string;
  status: "live" | "development" | "prototype" | "active" | "planning";
  statusLabel: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "VerbaLearn",
    slug: "verbalearn",
    description:
      "All-in-one learning suite for students. AI-powered study tools, flashcards, and spaced repetition.",
    badge: "iOS App",
    status: "live",
    statusLabel: "Live on App Store",
    tags: ["Swift", "CoreML", "Firebase", "RevenueCat"],
  },
  {
    title: "Auron Intelligence",
    slug: "auron",
    description:
      "Medical AI system for arterial CT analysis. Automated detection of vascular abnormalities linked to stroke risk.",
    badge: "Medical AI",
    status: "development",
    statusLabel: "In Development",
    tags: ["Python", "PyTorch", "DICOM", "AWS"],
  },
  {
    title: "Orchard",
    slug: "orchard",
    description:
      "Agent-native development environment for Apple platforms. Supervise AI agents across code, simulators, and release pipelines — with evidence, not vibes. Prototype in testing — reach out for early access.",
    badge: "Developer Tools",
    status: "prototype",
    statusLabel: "Prototype",
    tags: ["Swift", "Rust", "GPUI", "MCP", "Xcode"],
  },
  {
    title: "We Make Pages",
    slug: "wemakepages",
    description:
      "Flat-rate website builds and full digital presence management. One price, no surprises, 48-hour turnaround.",
    badge: "Web Agency",
    status: "live",
    statusLabel: "Live",
    tags: ["React", "Vite", "SEO", "n8n", "AI Chat"],
  },
  {
    title: "Sunkist Goofbox",
    slug: "sunkist-goofbox",
    description:
      "YouTube channel documenting car ownership, POV drives, and automotive culture.",
    badge: "Content",
    status: "active",
    statusLabel: "Active",
    tags: ["Video Production", "Automotive"],
  },
  {
    title: "Unplugged PGH",
    slug: "unplugged",
    description:
      "Student-run event collective organizing music festivals and community events in Pittsburgh.",
    badge: "Events",
    status: "active",
    statusLabel: "Active",
    tags: ["Event Production", "Community"],
  },
];

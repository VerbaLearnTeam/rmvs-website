export interface SkillCategory {
  name: string;
  orbit: "inner" | "middle" | "outer";
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Mobile Development",
    orbit: "inner",
    skills: ["Swift", "Xcode", "iOS", "Metal", "App Store Connect", "RevenueCat"],
  },
  {
    name: "Web Development",
    orbit: "middle",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"],
  },
  {
    name: "AI & ML",
    orbit: "outer",
    skills: ["Claude", "Cursor", "GPT", "Gemini", "ElevenLabs", "Codex"],
  },
];

export const allSkills = skillCategories.flatMap((c) => c.skills);

export const infrastructureSkills = [
  "AWS",
  "Cloudflare",
  "Railway",
  "PostgreSQL",
  "GRDB",
  "Firebase",
];

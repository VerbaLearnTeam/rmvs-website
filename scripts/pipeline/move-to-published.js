#!/usr/bin/env node

/**
 * move-to-published.js — State transition
 *
 * Moves a post from scheduled/ to the root blog directory and
 * updates its status frontmatter from "scheduled" to "published".
 *
 * Usage: node scripts/pipeline/move-to-published.js <path-to-mdx>
 */

const path = process.argv[2];

if (!path) {
  console.error("Usage: node move-to-published.js <path-to-mdx>");
  process.exit(1);
}

console.log(`[move-to-published] Processing: ${path}`);
console.log("[move-to-published] TODO: Move file and update frontmatter status");

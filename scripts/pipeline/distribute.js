#!/usr/bin/env node

/**
 * distribute.js — Cross-posting
 *
 * Cross-posts published articles to external platforms:
 * - Dev.to via API
 * - Hashnode via API
 * - LinkedIn article (draft)
 *
 * Usage: node scripts/pipeline/distribute.js <path-to-mdx>
 *
 * Env: DEVTO_API_KEY, HASHNODE_API_KEY
 */

const path = process.argv[2];

if (!path) {
  console.error("Usage: node distribute.js <path-to-mdx>");
  process.exit(1);
}

console.log(`[distribute] Distributing: ${path}`);
console.log("[distribute] TODO: Implement Dev.to API cross-posting");
console.log("[distribute] TODO: Implement Hashnode API cross-posting");

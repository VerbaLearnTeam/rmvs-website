#!/usr/bin/env node

/**
 * notify-review.js — Slack notification
 *
 * Sends a Slack notification when content is ready for review or published.
 *
 * Usage: node scripts/pipeline/notify-review.js <event-type> <path-to-mdx>
 *
 * Env: SLACK_WEBHOOK_URL
 */

const [eventType, path] = process.argv.slice(2);

if (!eventType || !path) {
  console.error("Usage: node notify-review.js <event-type> <path-to-mdx>");
  process.exit(1);
}

console.log(`[notify-review] Event: ${eventType}`);
console.log(`[notify-review] Post: ${path}`);
console.log("[notify-review] TODO: Implement Slack webhook notification");

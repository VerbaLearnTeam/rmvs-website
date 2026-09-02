/**
 * Captures the four Conversion Redline comparison assets with Playwright:
 *
 *   redline-before-desktop.png  1440×900  (2x)
 *   redline-after-desktop.png   1440×900  (2x)
 *   redline-before-mobile.png    390×844  (2x, mobile emulation — the
 *                                before page has no viewport meta, so it
 *                                renders as a shrunken desktop layout)
 *   redline-after-mobile.png     390×844  (2x)
 *
 * Output goes to ../public/images/redline/.
 * Run: node build.mjs && node shoot.mjs
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const outDir = here("../public/images/redline");
mkdirSync(outDir, { recursive: true });

const shots = [
  { file: "before.html", out: "redline-before-desktop.png", viewport: { width: 1440, height: 900 }, isMobile: false },
  { file: "after.html", out: "redline-after-desktop.png", viewport: { width: 1440, height: 900 }, isMobile: false },
  { file: "before.html", out: "redline-before-mobile.png", viewport: { width: 390, height: 844 }, isMobile: true },
  { file: "after.html", out: "redline-after-mobile.png", viewport: { width: 390, height: 844 }, isMobile: true },
];

const browser = await chromium.launch();
for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: s.viewport,
    deviceScaleFactor: 2,
    isMobile: s.isMobile,
    hasTouch: s.isMobile,
  });
  const page = await ctx.newPage();
  await page.goto(`file://${here(s.file)}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${outDir}/${s.out}` });
  await ctx.close();
  console.log(`captured ${s.out}`);
}
await browser.close();

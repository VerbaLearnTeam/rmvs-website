/**
 * Visual QA captures of the live local build (not committed assets).
 * Scrolls to each section anchor and captures the viewport so
 * ScrollReveal animations have fired. Usage: node qa.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const base = process.argv[2] ?? "http://localhost:3100";
const outDir = fileURLToPath(new URL("./qa", import.meta.url));
mkdirSync(outDir, { recursive: true });

const targets = [
  { path: "/services", name: "services", anchors: ["#redline", "#work", "#pricing", "#systems", "#book"] },
  { path: "/redline", name: "redline", anchors: ["top", "#redline", "#pricing", "#book"] },
  { path: "/projects", name: "projects", anchors: ["top"] },
  { path: "/about", name: "about", anchors: ["top"] },
];

const browser = await chromium.launch();
for (const device of ["desktop", "mobile"]) {
  const ctx = await browser.newContext({
    viewport: device === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: device === "mobile",
    hasTouch: device === "mobile",
  });
  for (const t of targets) {
    const page = await ctx.newPage();
    await page.goto(`${base}${t.path}`, { waitUntil: "networkidle" });
    for (const anchor of t.anchors) {
      if (anchor !== "top") {
        await page.evaluate((a) => {
          document.querySelector(a)?.scrollIntoView({ behavior: "instant", block: "start" });
          window.scrollBy(0, -60);
        }, anchor);
      }
      await page.waitForTimeout(900);
      const suffix = anchor === "top" ? "top" : anchor.slice(1);
      await page.screenshot({ path: `${outDir}/${t.name}-${suffix}-${device}.png` });
    }
    await page.close();
    console.log(`captured ${t.name} (${device})`);
  }
  await ctx.close();
}
await browser.close();

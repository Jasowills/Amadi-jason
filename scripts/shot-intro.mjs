import { chromium } from "playwright";

// Snapshots of the intro / note area at several widths for position review.
const BASE = "http://localhost:5175/";
const browser = await chromium.launch();
for (const w of [1440, 1100, 768, 375]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const el = page.locator(".intro");
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900); // let the draw-in animation finish
  await el.screenshot({ path: `review-final/note-${w}.png` });
  await ctx.close();
}
await browser.close();
console.log("done");

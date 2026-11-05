import { chromium } from "playwright";

// Snapshots of the across (domains) section and elsewhere note for
// comparison with the intro note treatment.
const BASE = "http://localhost:5175/";
const browser = await chromium.launch();
for (const w of [1440, 375]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const el = page.locator("main > section", { hasText: "What I work across" }).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await el.screenshot({ path: `review-final/across-${w}.png` });
  const el2 = page.locator("main > section", { hasText: "Elsewhere" }).first();
  await el2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await el2.screenshot({ path: `review-final/elsewhere-${w}.png` });
  await ctx.close();
}
await browser.close();
console.log("done");

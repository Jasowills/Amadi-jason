import { chromium } from "playwright";

// Viewport-level captures at 1440 so the gutter notes (outside the
// column) are visible, plus 375 for the mobile rhythm.
const BASE = "http://localhost:5175/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
await page.screenshot({ path: "review-final/vp-intro-1440.png" });
const h = await page.evaluate(
  () => document.querySelector(".section-label-row").getBoundingClientRect().top + window.scrollY,
);
await page.evaluate((y) => window.scrollTo(0, y - 100), h);
await page.waitForTimeout(800);
await page.screenshot({ path: "review-final/vp-across-1440.png" });
await page.evaluate(() => {
  document.documentElement.scrollTop = document.documentElement.scrollHeight;
});
await page.waitForTimeout(800);
await page.screenshot({ path: "review-final/vp-bottom-1440.png" });
await page.context().close();
await browser.close();
console.log("done");

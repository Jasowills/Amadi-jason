import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:5175/", { waitUntil: "networkidle" });
await page.evaluate(() => {
  localStorage.setItem("legacy_redirect_visited", "1");
  localStorage.setItem("theme-v2", "light");
});
await page.goto("http://localhost:5175/", { waitUntil: "networkidle" });
await page.waitForTimeout(300);
const before = await page.evaluate(
  () => document.querySelector('[role="img"]')?.getAttribute("aria-label"),
);
await page.click(".board-toggle button:nth-child(2)");
await page.waitForTimeout(150);
const after = await page.evaluate(
  () => document.querySelector('[role="img"]')?.getAttribute("aria-label"),
);
console.log(JSON.stringify({ before, after }, null, 1));
await browser.close();

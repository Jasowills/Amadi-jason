import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 800 } });
await page.goto("http://localhost:5175/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "review-final/vp-intro-1100.png" });
const m = await page.evaluate(() => ({
  gutterVisible: getComputedStyle(document.querySelector(".gutter-note")).display,
  inlineVisible: getComputedStyle(document.querySelector(".inline-note")).display,
  overflowing: document.documentElement.scrollWidth > document.documentElement.clientWidth,
}));
console.log(JSON.stringify(m));
await browser.close();

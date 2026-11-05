import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:5174/", { waitUntil: "load" });
await page.evaluate(() => localStorage.setItem("legacy_redirect_visited", "1"));
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(1500);
console.log(
  await page.evaluate(() => ({ bodyLen: document.body.innerText.length, projects: document.querySelectorAll(".project").length })),
);
await browser.close();

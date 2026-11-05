import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
const bad = [];
page.on("response", (r) => {
  if (r.status() !== 200) {
    bad.push(`${r.status()} ${r.url().slice(0, 130)}`);
  }
});
await page.goto("http://localhost:5174/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
console.log(bad.length ? bad.slice(0, 10).join("\n") : "all 200");
await browser.close();

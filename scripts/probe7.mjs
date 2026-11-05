import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
page.on("response", async (r) => {
  if (r.url().includes("sonar-sdk_browser") && r.status() === 500) {
    const txt = await r.text();
    console.log("len", txt.length, "prefix:", JSON.stringify(txt.slice(0, 900)));
  }
});
await page.goto("http://localhost:5174/", { waitUntil: "load" });
await page.waitForTimeout(1500);
await browser.close();

import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
page.on("response", (r) => {
  if (r.url().includes("sonar-sdk_browser") && r.status() !== 200) {
    console.log("status", r.status(), r.url().slice(0, 130));
  }
});
await page.goto("http://localhost:5174/", { waitUntil: "load" });
await page.waitForTimeout(2000);
await browser.close();

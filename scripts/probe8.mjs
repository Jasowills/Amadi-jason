import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
page.on("response", (r) => {
  if (r.url().includes("sonar-sdk_browser")) {
    console.log("status", r.status());
    r.text().then((t) => console.log("bodylen", t.length, "prefix", t.slice(0, 900))).catch((e) => console.log("read err", String(e)));
  }
});
await page.goto("http://localhost:5174/", { waitUntil: "load" });
await page.waitForTimeout(2000);
await browser.close();

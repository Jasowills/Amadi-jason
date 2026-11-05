import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
page.on("response", (r) => {
  if (r.url().includes("sonar-sdk_browser")) {
    console.log("status", r.status(), r.url().slice(0, 130));
    r.text().then((t) => console.log("len", t.length, "prefix", t.slice(0, 900))).catch((e) => console.log("err", String(e)));
  }
});
await page.goto("http://localhost:5174/", { waitUntil: "load" });
await page.waitForTimeout(2000);
await browser.close();

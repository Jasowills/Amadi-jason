// Verifies the dev server serves the page without the sonar-sdk
// html2canvas import failure.
import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:5173/", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2500);
const html2canvasIssues = errors.filter((e) => /html2canvas|resolve import/i.test(e));
console.log(
  JSON.stringify(
    {
      rendered: await page.evaluate(() => !!document.querySelector(".site-header")),
      errorCount: errors.length,
      html2canvasIssues,
      firstErrors: errors.slice(0, 3),
    },
    null,
    1,
  ),
);
await browser.close();

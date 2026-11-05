import { chromium } from "playwright";
const files = ["final-375-light.png", "final-1440-light.png"];
const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("http://localhost:5175/", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    localStorage.setItem("legacy_redirect_visited", "1");
    localStorage.setItem("theme-v2", "light");
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  for (const width of [375, 768, 1100, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(200);
    await page.screenshot({ path: `review-final/${width}-light.png` });
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      over: [...document.querySelectorAll(".gutter-note, .margin-note")].map((el) => {
        const r = el.getBoundingClientRect();
        return { left: Math.round(r.left), right: Math.round(r.right) };
      }),
    }));
    console.log(width, JSON.stringify(metrics));
  }
  await context.close();
} finally {
  await browser.close();
}

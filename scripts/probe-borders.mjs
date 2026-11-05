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
const bordered = await page.evaluate(() =>
  Array.from(document.querySelectorAll("*"))
    .filter((el) => {
      const cs = getComputedStyle(el);
      return (
        (cs.borderTopStyle !== "none" && parseFloat(cs.borderTopWidth) > 0) ||
        (cs.borderBottomStyle !== "none" &&
          parseFloat(cs.borderBottomWidth) > 0)
      );
    })
    .map((el) => ({
      tag: el.tagName.toLowerCase(),
      cls:
        el.tagName === "svg"
          ? el.getAttribute("class") || "(no class)"
          : String(el.className),
      w: Math.round(el.getBoundingClientRect().width),
      y: Math.round(el.getBoundingClientRect().top),
    })),
);
console.log(JSON.stringify(bordered, null, 1));
await browser.close();

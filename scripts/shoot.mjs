// Captures the reviews in a folder outside the repo (gitignored) so the
// site ships no review artifacts. Set REVIEW_DIR to keep them elsewhere.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:5175";
const REVIEW_DIR =
  process.env.REVIEW_DIR ??
  "/private/var/folders/81/y4t1vltx4jb4qr3y2j2ff8q00000gn/T/opencode/review-captures";
mkdirSync(REVIEW_DIR, { recursive: true });

const WIDTHS = [375, 768, 1100, 1440];
const THEMES = ["light", "dark"];

const browser = await chromium.launch();
try {
  for (const theme of THEMES) {
    for (const width of WIDTHS) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        colorScheme: theme === "dark" ? "dark" : "light",
      });
      const errors = [];
      page.on("pageerror", (e) => errors.push(String(e)));
      await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
      await page.evaluate((t) => {
        localStorage.setItem("theme", t);
      }, theme);
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForTimeout(700);
      const metrics = await page.evaluate(() => {
        const docEl = document.documentElement;
        return {
          theme: docEl.getAttribute("data-theme"),
          scrollWidth: docEl.scrollWidth,
          clientWidth: docEl.clientWidth,
          metaThemeColor: document
            .querySelector('meta[name="theme-color"]')
            ?.getAttribute("content"),
          h1Count: document.querySelectorAll("h1").length,
          hScroll: docEl.scrollWidth > docEl.clientWidth,
          toggleLabel: document
            .querySelector('[aria-label^="Switch"]')
            ?.getAttribute("aria-label"),
        };
      });
      await page.screenshot({
        path: `${REVIEW_DIR}/${width}-${theme}-full.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `${REVIEW_DIR}/${width}-${theme}-viewport.png`,
      });
      // Toggle drives theme, meta and persistence.
      if (width === 1440) {
        const clickToggle = page
          .locator('[aria-label^="Switch"]')
          .first();
        let afterToggle;
        try {
          await clickToggle.click();
          await page.waitForTimeout(350);
          afterToggle = await page.evaluate(() => ({
            theme: document.documentElement.getAttribute("data-theme"),
            stored: localStorage.getItem("theme"),
            meta: document
              .querySelector('meta[name="theme-color"]')
              ?.getAttribute("content"),
            label: document
              .querySelector('[aria-label^="Switch"]')
              ?.getAttribute("aria-label"),
          }));
        } catch {
          afterToggle = { error: true };
        }
        await page.screenshot({
          path: `${REVIEW_DIR}/1440-${theme === "dark" ? "light" : "dark"}-toggled.png`,
        });
        const project = page.locator(".project").first();
        await project.locator("summary").click();
        await page.waitForTimeout(200);
        await page.screenshot({
          path: `${REVIEW_DIR}/1440-${theme}-project-open.png`,
        });
        const opened = await project.evaluate((el) => el.hasAttribute("open"));
        console.log(
          `${width}-${theme}: ${JSON.stringify(metrics)} afterToggle=${JSON.stringify(afterToggle)} open=${opened} errors=${errors.length ? errors.join(" | ") : "none"}`,
        );
        continue;
      }
      console.log(
        `${width}-${theme}: ${JSON.stringify(metrics)} errors=${errors.length ? errors.join(" | ") : "none"}`,
      );
      await page.close();
    }
  }

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "As Black" }).click();
  await page.waitForTimeout(350);
  await page
    .locator(".board-shell")
    .screenshot({ path: `${REVIEW_DIR}/chess-as-black.png` });
  await page.getByRole("button", { name: "As White" }).click();
  await page.waitForTimeout(350);
  await page
    .locator(".board-shell")
    .screenshot({ path: `${REVIEW_DIR}/chess-as-white.png` });

  await page.goto(`${BASE}/notes/adr-001`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${REVIEW_DIR}/note-adr-001-light.png`,
    fullPage: true,
  });
  await page.evaluate(() => localStorage.setItem("theme", "dark"));
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${REVIEW_DIR}/note-adr-001-dark.png`,
    fullPage: true,
  });
  await page.close();

  console.log("captures done");
} finally {
  await browser.close();
}

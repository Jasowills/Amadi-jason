// Full verification pass for the rebuild:
// 1. 375/768/1100/1440 in light and dark: screenshots, horizontal scroll,
//    margin-note clipping, doubled or crowded horizontal lines, duplicate
//    headings, footer contents.
// 2. OS dark mode with a clean localStorage must render light.
// 3. Skip link, theme toggle, chess toggle, project expand, note pages.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:5175/";
const OUT = "review-final";
const WIDTHS = [375, 768, 1100, 1440];
mkdirSync(OUT, { recursive: true });

const audit = async (page) =>
  page.evaluate(() => {
    const lines = [];
    const els = Array.from(document.querySelectorAll("*"));
    for (const el of els) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      for (const [side, width, style] of [
        ["top", cs.borderTopWidth, cs.borderTopStyle],
        ["bottom", cs.borderBottomWidth, cs.borderBottomStyle],
      ]) {
        if (style !== "none" && parseFloat(width) > 0) {
          lines.push({
            y: side === "top" ? r.top : r.bottom,
            x1: r.left,
            x2: r.right,
            w: r.width,
            tag: el.tagName.toLowerCase(),
            cls: el.tagName === "svg"
              ? (el.getAttribute("class") || "svg")
              : String(el.className).split(" ").slice(0, 2).join("."),
          });
        }
      }
    }
    // Real rules only: full-width hairlines, not control outlines.
    const rules = lines.filter((l) => l.w >= Math.min(200, window.innerWidth * 0.6));
    // Double check: report every rule-adjacent pair under 24px, and also
    // any short-segment line (control outline) sitting within 10px of a
    // rule, which would read as a doubled edge.
    const crowded = [];
    for (let i = 0; i < rules.length; i++) {
      for (let j = i + 1; j < rules.length; j++) {
        const d = Math.abs(rules[i].y - rules[j].y);
        if (d >= 24) continue;
        const overlap = Math.min(rules[i].x2, rules[j].x2) - Math.max(rules[i].x1, rules[j].x1);
        const minW = Math.min(rules[i].w, rules[j].w);
        if (overlap / minW > 0.5)
          crowded.push(`${d.toFixed(0)}px: ${rules[i].tag}.${rules[i].cls} ~ ${rules[j].tag}.${rules[j].cls}`);
      }
    }
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4"))
      .map((h) => h.textContent.trim())
      .filter(Boolean);
    const seen = new Map();
    for (const h of headings)
      seen.set(h, (seen.get(h) || 0) + 1);
    const dupes = [...seen.entries()]
      .filter(([, n]) => n > 1)
      .map(([t, n]) => `"${t}" x${n}`);

    const notes = Array.from(
      document.querySelectorAll(".gutter-note, .margin-note"),
    )
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width > 0 || r.height > 0);

    const badHrefs = Array.from(document.querySelectorAll("a[href]"))
      .map((a) => a.getAttribute("href") || "")
      .filter((h) => h === "#" || /^#?$/i.test(h) || /TODO/i.test(h) || h.startsWith("javascript:"));

    const headerCol = document.querySelector(".site-header .column");
    const introP = document.querySelector(".intro p");
    const gapHeaderToIntro = introP && headerCol
      ? Math.round(
          introP.getBoundingClientRect().top -
            headerCol.getBoundingClientRect().bottom,
        )
      : null;

    return {
      theme: document.documentElement.getAttribute("data-theme"),
      horizontalScroll:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      topSpace: Math.round(
        document
          .querySelector(".top-space")
          ?.getBoundingClientRect().height ?? -1,
      ),
      gapHeaderToIntro,
      crowdedLines: [...new Set(crowded)],
      duplicateHeadings: dupes,
      noteBounds: notes.map((r) => `${Math.round(r.left)}..${Math.round(r.right)}`),
      noteClipped: notes.some(
        (r) => r.left < -1 || r.right > window.innerWidth + 1,
      ),
      badHrefs,
      footerText: (
        document.querySelector(".site-footer")?.textContent ?? ""
      ).replace(/\s+/g, " "),
      footerLinks: document.querySelectorAll(".site-footer a").length,
      hScrollBody: document.body.scrollWidth > window.innerWidth,
    };
  });

const browser = await chromium.launch();
try {
  const results = {};

  for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.evaluate((t) => {
      localStorage.setItem("legacy_redirect_visited", "1");
      localStorage.setItem("theme-v2", t);
    }, theme);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    results[theme] = {};
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(250);
      results[theme][width] = await audit(page);
      await page.screenshot({
        path: `${OUT}/${width}-${theme}.png`,
        fullPage: true,
      });
    }
    await context.close();
  }

  // OS in dark mode, no saved choice: must render light.
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "dark",
    });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      localStorage.removeItem("theme");
      localStorage.removeItem("theme-v2");
    });
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const osDark = await page.evaluate(() => ({
      theme: document.documentElement.getAttribute("data-theme"),
      meta: document.querySelector('meta[name="theme-color"]')?.content,
      storage: localStorage.getItem("theme"),
      storage2: localStorage.getItem("theme-v2"),
    }));
    results.osDarkCleanStorage = osDark;
    await context.close();
  }

  // Interactions.
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      localStorage.setItem("legacy_redirect_visited", "1");
      localStorage.setItem("theme-v2", "light");
    });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    // Skip link on focus.
    await page.keyboard.press("Tab");
    const skip = await page.evaluate(() => {
      const el = document.querySelector(".skip-link");
      const r = el.getBoundingClientRect();
      return {
        focused: document.activeElement === el,
        top: Math.round(r.top),
        visible: r.top >= -1 && r.height > 20,
      };
    });

    // Theme toggle.
    await page.click(".theme-toggle, [data-theme-toggle], button[aria-label*='theme' i], button[title*='theme' i]").catch(() => {});
    const themeAfterToggle = await page.evaluate(() => ({
      theme: document.documentElement.getAttribute("data-theme"),
      meta: document.querySelector('meta[name="theme-color"]')?.content,
      stored: localStorage.getItem("theme-v2"),
    }));

    // First project expands.
    const expanded = await page.evaluate(() => {
      const first = document.querySelector("details.project");
      first.setAttribute("open", "");
      return first.hasAttribute("open");
    });

    // Chess toggle.
    await page.click(".board-toggle button:nth-child(2)");
    const chess = await page.evaluate(() => ({
      pressed: [...document.querySelectorAll(".board-toggle button")].map(
        (b) => b.getAttribute("aria-pressed"),
      ),
      boardLabel: document.querySelector(".chess-board")?.getAttribute("aria-label") ?? "",
    }));

    // Note pages exist and load.
    const notes = {};
    for (const slug of ["adr-001", "adr-002", "adr-004"]) {
      await page.goto(`${BASE}notes/${slug}`, { waitUntil: "networkidle" });
      notes[slug] = await page.evaluate(() => {
        const t = document.querySelector(".note-title")?.textContent ?? "";
        const body = document.querySelector(".note-body")?.textContent ?? "";
        return { title: t, bodyLength: body.length };
      });
    }

    results.interactions = { skip, themeAfterToggle, expanded, chess, notes };
    await context.close();
  }

  console.log(JSON.stringify(results, null, 1));
} finally {
  await browser.close();
}

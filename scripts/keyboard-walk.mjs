// Keyboard and focus walkthrough. Tabs from the top of the page and
// records every focus stop, so focus order and visibility are proven, not
// assumed. Also drives the coverage board pin from the keyboard and the
// Escape clearing path.
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:5175";

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const stops = [];
  await page.keyboard.press("Tab");
  for (let i = 0; i < 30; i += 1) {
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute("role"),
        label:
          el.getAttribute("aria-label") ||
          (el.textContent ?? "").trim().slice(0, 60),
        href: el.getAttribute("href"),
        y: Math.round(rect.top),
        outline: getComputedStyle(el).outlineStyle,
        outlineWidth: getComputedStyle(el).outlineWidth,
      };
    });
    if (!info || info.tag === "body") break;
    stops.push(info);
    await page.keyboard.press("Tab");
    await page.waitForTimeout(40);
  }
  console.log("FOCUS ORDER (first 30 stops):");
  stops.forEach((s, i) => console.log(String(i + 1).padStart(2), JSON.stringify(s)));

  // Scroll to the board and tab into it.
  await page.locator("#across").scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const domainLabel = page.getByRole("button", { name: /Pin Distributed systems/ });
  await domainLabel.focus();
  await page.waitForTimeout(120);
  const hoverState = await page.evaluate(() => {
    const rows = [...document.querySelectorAll(".board-table tbody tr")].map((r) =>
      r.getAttribute("class"),
    );
    return rows;
  });
  console.log("after focus on Distributed systems, row classes:", hoverState);

  await domainLabel.press("Enter");
  await page.waitForTimeout(200);
  const pinned = await page.evaluate(() => {
    const projects = [...document.querySelectorAll(".project")].map((p) =>
      p.getAttribute("data-dim"),
    );
    const clear = !!document.querySelector(".clear-pin");
    return { projects, clear };
  });
  console.log("after Enter on the row, project dim flags:", pinned);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  const cleared = await page.evaluate(() => ({
    projects: [
      ...document.querySelectorAll(".project"),
    ].map((p) => p.getAttribute("data-dim")),
    clear: !!document.querySelector(".clear-pin"),
  }));
  console.log("after Escape, project dim flags:", cleared);

  // Chess toggle by keyboard.
  await page.getByRole("button", { name: "As Black" }).focus();
  await page.waitForTimeout(80);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(200);
  const chess = await page.evaluate(() => ({
    pressedBlack: document
      .querySelector('[aria-pressed="true"]')
      ?.textContent,
    label: document
      .querySelector(".board-shell [role='img']")
      ?.getAttribute("aria-label"),
  }));
  console.log("after keyboard Enter on As Black:", chess);

  // Touch targets on a narrow viewport.
  await page.setViewportSize({ width: 375, height: 800 });
  await page.waitForTimeout(300);
  const targets = await page.evaluate(() => {
    const list = [];
    document
      .querySelectorAll(
        ".icon-button, .project-summary, .work-details summary, .board-toggle button, .domain-btn, .board-block",
      )
      .forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0) {
          list.push({
            cls: el.className,
            h: Math.round(r.height),
            w: Math.round(r.width),
          });
        }
      });
    return list;
  });
  const tooSmall = targets.filter((t) => t.h < 40);
  console.log(
    `touch targets measured at 375px: ${targets.length}, under 40px tall: ${tooSmall.length}`,
  );
  tooSmall.forEach((t) => console.log("  SMALL", JSON.stringify(t)));

  console.log("page errors:", errors.length ? errors.join(" | ") : "none");
  await page.close();
} finally {
  await browser.close();
}

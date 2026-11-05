// Adversary attack suite for the portfolio rebuild.
// Scenarios S1..S15, evidence to stdout as structured JSON.
import { chromium } from "playwright";

const BASE = "http://localhost:5175/";
const results = {};
const add = (id, data) => (results[id] = data);

const browser = await chromium.launch();

// --- S1: cold load ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(String(e)));
  await page.goto(BASE, { waitUntil: "networkidle" });
  const s1 = await page.evaluate(() => ({
    theme: document.documentElement.getAttribute("data-theme"),
    meta: document.querySelector('meta[name="theme-color"]')?.content,
    themeV2: localStorage.getItem("theme-v2"),
    oldTheme: localStorage.getItem("theme"),
    h1: document.querySelector("h1")?.textContent,
    sections: document.querySelectorAll("main section").length,
  }));
  add("S1_coldLoad", { ...s1, pageErrors });
  await ctx.close();
}

// --- S2: storage denied (private browsing) ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(String(e)));
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("denied", "SecurityError");
      },
    });
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.click(".icon-button");
  const s2 = await page.evaluate(() => ({
    themeAfterToggle: document.documentElement.getAttribute("data-theme"),
    meta: document.querySelector('meta[name="theme-color"]')?.content,
    rendered: !!document.querySelector(".site-footer"),
  }));
  add("S2_storageDenied", { ...s2, pageErrors });
  await ctx.close();
}

// --- S3: stale legacy "theme" key must be ignored ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await (await ctx.newPage()).goto(BASE, { waitUntil: "domcontentloaded" });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    localStorage.setItem("theme", "dark");
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const s3 = await page.evaluate(() => ({
    theme: document.documentElement.getAttribute("data-theme"),
    legacyKey: localStorage.getItem("theme"),
  }));
  add("S3_staleLegacyKey", s3);
  await ctx.close();
}

// --- S4: rapid toggle clicks, storage stays in sync ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  for (let i = 0; i < 6; i++) {
    await page.click(".icon-button");
  }
  await page.waitForTimeout(150);
  const s4 = await page.evaluate(() => ({
    theme: document.documentElement.getAttribute("data-theme"),
    stored: localStorage.getItem("theme-v2"),
    meta: document.querySelector('meta[name="theme-color"]')?.content,
  }));
  add("S4_rapidToggle", s4);
  await ctx.close();
}

// --- S5: keyboard walk, no focus trap ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const trail = [];
  for (let i = 0; i < 22; i++) {
    await page.keyboard.press("Tab");
    const t = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? `${el.tagName}.${String(el.className).split(" ")[0] || el.getAttribute("aria-label") || ""}` : "none";
    });
    trail.push(t);
  }
  const s5 = { skipLinkFirst: trail[0] === "A.skip-link", trailLength: trail.length };
  add("S5_keyboardWalk", s5);
  await ctx.close();
}

// --- S6: project name link inside summary ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const [popup] = await Promise.all([
    page.waitForEvent("popup", { timeout: 5000 }).catch(() => null),
    page.click(".project-name a"),
  ]);
  const s6Page = await page.evaluate(() => ({
    detailsOpen: document.querySelector("details.project")?.hasAttribute("open"),
  }));
  const s6 = {
    ...s6Page,
    popupUrl: popup ? popup.url() : null,
  };
  if (popup) await popup.close();
  add("S6_summaryLink", s6);
  await ctx.close();
}

// --- S7: open every project row at 375 ---
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 700 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const s7 = await page.evaluate(() => {
    document.querySelectorAll("details.project").forEach((d) => d.setAttribute("open", ""));
    return {
      openCount: document.querySelectorAll("details.project[open]").length,
      horizontalScroll:
        document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  await page.screenshot({ path: "review-final/adv-375-open.png", fullPage: true });
  add("S7_allOpen375", s7);
  await ctx.close();
}

// --- S8: chess toggle rapid clicks ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  for (let i = 0; i < 5; i++) {
    await page.click(".board-toggle button");
  }
  await page.waitForTimeout(100);
  const s8 = await page.evaluate(() => ({
    pressed: [...document.querySelectorAll(".board-toggle button")].map((b) => b.getAttribute("aria-pressed")),
  }));
  add("S8_chessRapid", s8);
  await ctx.close();
}

// --- S9: external hrefs respond (world as other users see it) ---
{
  const targets = [
    "https://github.com/jasowills/prism",
    "https://github.com/jasowills/TIDE",
    "https://github.com/jasowills/TRACE",
    "https://github.com/jasowills/pulse",
    "https://github.com/jasowills/watchDog",
    "https://sonar-dev.vercel.app",
    "https://amadi-jason.vercel.app/",
    "https://github.com/jasowills",
    "https://www.linkedin.com/in/jason-amadi/",
    "https://www.chess.com/member/jasowillls",
  ];
  const s9 = [];
  for (const url of targets) {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "user-agent": "publish-link-check (verify internal project links)" },
        signal: AbortSignal.timeout(9000),
      });
      s9.push({ url, status: res.status });
    } catch (e) {
      s9.push({ url, status: `ERR ${String(e).slice(0, 60)}` });
    }
  }
  add("S9_externalLinks", s9);
}

// --- S10: unknown note slug ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}notes/adr-999`, { waitUntil: "networkidle" });
  const s10 = await page.evaluate(() => ({
    title: document.title,
    showsNotFound: document.body.textContent.includes("No page at that address"),
    backHref: document.querySelector('a[href="/"]')?.getAttribute("href") || null,
  }));
  add("S10_unknownSlug", s10);
  await ctx.close();
}

// --- S11: reduced motion draws in immediately ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const s11 = await page.evaluate(() => {
    const note = document.querySelector(".margin-note");
    return { drawnNow: note?.classList.contains("drawn"), dashoffset: Number(getComputedStyle(note?.querySelector("path") ?? document.body).strokeDashoffset || 0) };
  });
  add("S11_reducedMotion", s11);
  await ctx.close();
}

// --- S12: print emulation ---
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.emulateMedia({ media: "print" });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const s12 = await page.evaluate(() => ({
    headerHidden: getComputedStyle(document.querySelector(".site-header")).display === "none",
    themeColor: getComputedStyle(document.documentElement).getPropertyValue("--bg").trim(),
  }));
  add("S12_print", s12);
  await ctx.close();
}

// --- S13: dist CSS hygiene (gradients, shadows, raster urls, dashes) ---
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const css = await page.evaluate(async () => {
    const links = [...document.querySelectorAll("link[rel='stylesheet']")];
    return (await Promise.all(links.map((l) => fetch(l.href).then((r) => r.text())))).join("\n");
  });
  const s13 = {
    gradients: (css.match(/linear-gradient|radial-gradient|conic-gradient/g) || []).length,
    shadows: (css.match(/box-shadow|text-shadow|drop-shadow/g) || []).length,
    urlRaster: (css.match(/url\([^)]*\.(png|jpe?g|gif|webp)/g) || []).length,
    emDash: css.includes("\u2014"),
    enDash: css.includes("\u2013"),
  };
  add("S13_distCss", s13);
  await ctx.close();
}

// --- S14: built HTML asset refs exist on the server ---
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const missing = [];
  page.on("response", (r) => {
    if (r.status() >= 400) missing.push(`${r.status()} ${r.url()}`);
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.goto(`${BASE}notes/adr-002`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500); // let the analytics beacon fire or not
  add("S14_asset404s", missing);
  await ctx.close();
}

// --- S15: inline script redirect behavior on dev/preview host ---
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    window.location.replace = (u) => {
      window.__replaced = String(u);
    };
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const s15 = await page.evaluate(() => ({
    stayedOn: window.location.host,
    replacedTo: window.__replaced ?? null,
    visitedFlag: localStorage.getItem("legacy_redirect_visited"),
  }));
  add("S15_redirect", s15);
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 1));

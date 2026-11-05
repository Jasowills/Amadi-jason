import { chromium } from "playwright";
const browser = await chromium.launch();
const results = {};

// S10 recheck: unknown note slug title and body.
{
  const page = await (
    await browser.newContext({ viewport: { width: 1440, height: 900 } })
  ).newPage();
  await page.goto("http://localhost:5175/notes/adr-999", { waitUntil: "networkidle" });
  results.S10_fixed = await page.evaluate(() => ({
    title: document.title,
    notFoundText:
      document.querySelector(".notfound")?.querySelector("h2")?.textContent ?? null,
    backHref: document.querySelector('a[href="/"]')?.getAttribute("href") ?? null,
  }));
  await page.goto("http://localhost:5175/notes/adr-001", { waitUntil: "networkidle" });
  results.S10_realStillOk = await page.evaluate(() => ({
    title: document.title,
    noteTitle: document.querySelector(".note-title")?.textContent,
  }));
  await (await page.context()).close();
}

// S13 recheck: no gradients anywhere in the delivered CSS.
{
  const page = await browser.newContext().then((c) => c.newPage());
  await page.goto("http://localhost:5175/", { waitUntil: "networkidle" });
  const css = await page.evaluate(async () => {
    const links = [...document.querySelectorAll("link[rel='stylesheet']")];
    return (
      await Promise.all(links.map((l) => fetch(l.href).then((r) => r.text())))
    ).join("\n");
  });
  results.S13_afterFix = {
    gradients: (css.match(/linear-gradient|radial-gradient|conic-gradient/g) || []).length,
    shadows: (css.match(/box-shadow|text-shadow|drop-shadow/g) || []).length,
  };
  await page.context().close();
}

// u-link microscope: resting hairline, hover wipe direction and timing.
{
  const page = await (
    await browser.newContext({ viewport: { width: 1440, height: 900 } })
  ).newPage();
  await page.goto("http://localhost:5175/", { waitUntil: "networkidle" });
  const link = page.locator(".project-name a").first();
  await link.scrollIntoViewIfNeeded();
  const before = await link.evaluate((el) => {
    const s = getComputedStyle(el, "::after");
    return { transform: s.transform, restLine: getComputedStyle(el, "::before").backgroundColor };
  });
  await page.screenshot({
    path: "review-final/adv-ulink-rest.png",
    clip: { x: 360, y: (await link.boundingBox()).y - 8, width: 400, height: 32 },
  });
  await link.hover();
  await page.waitForTimeout(220);
  const after = await link.evaluate((el) => {
    const s = getComputedStyle(el, "::after");
    return { transform: s.transform };
  });
  await page.screenshot({
    path: "review-final/adv-ulink-hover.png",
    clip: { x: 360, y: (await link.boundingBox()).y - 8, width: 400, height: 32 },
  });
  results.ulink = { before, after };
  await page.context().close();
}

await browser.close();
console.log(JSON.stringify(results, null, 1));

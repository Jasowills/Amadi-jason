import { chromium } from "playwright";

const BASE = "http://localhost:5175/";
const browser = await chromium.launch();
const results = {};

// Desktop: the three confirmed links render with the right hrefs.
{
  const page = await (
    await browser.newContext({ viewport: { width: 1440, height: 900 } })
  ).newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  results.intro = await page.evaluate(() => {
    const mark = [...document.querySelectorAll(".intro a")].find((a) =>
      a.textContent.includes("Marklite"),
    );
    return mark
      ? { href: mark.href, target: mark.target, rel: mark.rel }
      : { missing: true };
  });
  results.elsewhere = await page.evaluate(() => {
    const paragraph = document.querySelector(".elsewhere p");
    const links = [...paragraph.querySelectorAll("a")].map((a) => ({
      text: a.textContent,
      href: a.href,
      target: a.target,
      rel: a.rel,
    }));
    return { text: paragraph.textContent.replace(/\s+/g, " ").trim(), links };
  });
  await page.context().close();
}

// 375: the longer Elsewhere sentence must not overflow.
{
  const page = await (
    await browser.newContext({ viewport: { width: 375, height: 700 } })
  ).newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  results.at375 = await page.evaluate(() => ({
    overflow:
      document.documentElement.scrollWidth > document.documentElement.clientWidth,
    elsewhereWords: document
      .querySelector(".elsewhere p")
      .textContent.replace(/\s+/g, " ")
      .trim(),
  }));
  await page.context().close();
}

// The served llms.txt carries the confirmed handle.
{
  const page = await browser.newContext().then((c) => c.newPage());
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const txt = await page.evaluate(async () => {
    return (await fetch(`${location.origin}/llms.txt`)).text();
  });
  results.llms = {
    chessHandleOk: txt.includes("https://www.chess.com/member/jasowillls"),
    staleHandleGone: !txt.includes("member/jasowills "),
    linkedinOk: txt.includes("https://www.linkedin.com/in/jason-amadi/"),
    markliteNote: txt.includes("Marklite"),
  };
  await page.context().close();
}

await browser.close();
console.log(JSON.stringify(results, null, 1));

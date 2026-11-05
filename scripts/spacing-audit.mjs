import { chromium } from "playwright";

// Rhythm audit. Measures the real geometry against the spacing spec:
// section gaps, row paddings, title-to-description gaps, work expansion
// rhythm, footer line, and the note pages. Tolerance: 2px.
const BASE = "http://localhost:5175/";
const WIDTHS = [1440, 1100, 768, 375];
const TOL = 2;

const browser = await chromium.launch();
const report = {};

const evalGeometry = () => {
  const gap = (a, b) => {
    const x = a.getBoundingClientRect();
    const y = b.getBoundingClientRect();
    return Number((y.top - x.bottom).toFixed(2));
  };
  const inlineGap = (a, b) =>
    Number((b.getBoundingClientRect().top - a.getBoundingClientRect().bottom).toFixed(2));
  const clamp = (n, d = 1) => Number(n.toFixed(d));
  return {
    theme: document.documentElement.getAttribute("data-theme"),
    overflowX:
      document.documentElement.scrollWidth > document.documentElement.clientWidth,
    headerToFirstBlock: (() => {
      const header = document.querySelector(".site-header .column");
      const introP = document.querySelector(".intro p");
      const backLink = document.querySelector(".back-link");
      if (introP) return { kind: "intro-p", gap: gap(header, introP) };
      if (backLink) return { kind: "back-link", gap: gap(header, backLink) };
      return { kind: "notfound", gap: gap(header, document.querySelector(".notfound")) };
    })(),
    sectionGaps: (() => {
      const secs = [...document.querySelectorAll("main > section")];
      const prev = document.querySelector(".intro");
      const gaps = [];
      let cursor = prev ?? secs[0];
      const start = prev ? 0 : 1;
      for (let i = start; i < secs.length; i++) {
        gaps.push({
          to: secs[i].querySelector(".section-label")?.textContent ?? `sec${i}`,
          gap: gap(cursor, secs[i]),
        });
        cursor = secs[i];
      }
      return gaps;
    })(),
    labelToList: (() => {
      const out = {};
      const pairs = [
        ["projects", ".projects .project"],
        ["domains", ".domains .domain-row"],
        ["adrs", ".adr-intro"],
        ["work", ".work-list .work-row"],
      ];
      for (const [name, sel] of pairs) {
        const sec = [...document.querySelectorAll("main > section")].find(
          (s) => s.querySelector(sel),
        );
        if (!sec) continue;
        const labelRow = sec.querySelector(".section-label-row");
        const first = sec.querySelector(sel);
        out[name] =
          first.getBoundingClientRect().top - labelRow.getBoundingClientRect().bottom;
      }
      return out;
    })(),
    rowPaddings: (() => {
      const pick = (el) => {
        const cs = getComputedStyle(el);
        return { top: cs.paddingTop, bottom: cs.paddingBottom };
      };
      return {
        project: pick(document.querySelector(".project-summary")),
        domain: pick(document.querySelector(".domain-row")),
        adr: pick(document.querySelector(".adr-row")),
        work: pick(document.querySelector(".work-row")),
        chess: pick(document.querySelector(".chess-row")),
      };
    })(),
    titleDescGaps: (() => {
      const out = {};
      const dl = document.querySelector(".domain-label");
      const gline = document.querySelector(".domain-line");
      if (dl && gline) out.domain = inlineGap(dl, gline);
      const pn = document.querySelector(".project-name");
      const po = document.querySelector(".project-oneliner");
      if (pn && po) out.project = inlineGap(pn, po);
      const at = document.querySelector(".adr-title");
      const as = document.querySelector(".adr-summary");
      if (at && as) out.adr = inlineGap(at, as);
      const wh = document.querySelector(".work-head");
      const ws = document.querySelector(".work-summary");
      if (wh && ws) out.work = inlineGap(wh, ws);
      return out;
    })(),
    introParaGap: (() => {
      const ps = document.querySelectorAll(".intro p, .note-anchor p");
      if (ps.length < 2) return null;
      return inlineGap(ps[0], ps[1]);
    })(),
    workRhythm: (() => {
      const row = document.querySelector(".work-row");
      if (!row) return null;
      const det = row.querySelector(".work-details");
      const sum = det?.querySelector("summary");
      const ul = det?.querySelector("ul");
      const toggleGap = sum && det ? gap(sum, ul) : null;
      const gaps = [];
      if (ul) {
        const lis = [...ul.querySelectorAll("li")];
        for (let i = 0; i < lis.length - 1; i++) {
          gaps.push({
            gap: inlineGap(lis[i], lis[i + 1]),
            mb: getComputedStyle(lis[i]).marginBottom,
          });
        }
      }
      return {
        detailsMarginTop: det ? getComputedStyle(det).marginTop : null,
        toggleToBullets: toggleGap,
        bulletGaps: gaps,
        rowPadBottom: getComputedStyle(row).paddingBottom,
      };
    })(),
    projectExpanded: (() => {
      const d = document.querySelector(".project-detail");
      if (!d) return null;
      const pad = (() => {
        const cs = getComputedStyle(d);
        return `${cs.paddingTop} ${cs.paddingBottom}`;
      })();
      return { pad };
    })(),
    footer: (() => {
      const secs = [...document.querySelectorAll("main > section")];
      const foot = document.querySelector(".site-footer");
      const col = foot?.querySelector(".column");
      if (!foot || secs.length === 0) return null;
      return {
        gapAboveHairline: gap(secs[secs.length - 1], foot),
        colPadding: col ? getComputedStyle(col).padding : null,
        lineHeight: col ? getComputedStyle(col).lineHeight : null,
        totalHairlineToBottom: clamp(
          document.documentElement.getBoundingClientRect().bottom - foot.getBoundingClientRect().top,
        ),
        deltaBodyEnd: clamp(
          document.body.scrollHeight - document.documentElement.scrollHeight,
        ),
      };
    })(),
    elsewhereNote: (() => {
      const note = document.querySelector(".elsewhere-note");
      const p = document.querySelector(".elsewhere p");
      return note && p ? inlineGap(p, note) : null;
    })(),
  };
};

for (const width of WIDTHS) {
  report[width] = {};
  for (const theme of ["light", "dark"]) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const page = await ctx.newPage();
    await page.addInitScript((t) => {
      localStorage.setItem("theme-v2", t);
    }, theme);
    await page.goto(BASE, { waitUntil: "networkidle" });
    const home = await page.evaluate(evalGeometry);
    // Expanded states: project rows and the first work row.
    await page.evaluate(() => {
      document
        .querySelectorAll("details.project")
        .forEach((d) => d.setAttribute("open", ""));
      const firstWork = document.querySelector(".work-details");
      if (firstWork) firstWork.setAttribute("open", "");
    });
    // Full page captures must show every section rendered, not skipped
    // behind content-visibility, so force render for the capture only.
    await page.addStyleTag({
      content: "main > section { content-visibility: visible !important; }",
    });
    await page.waitForTimeout(120);
    const expanded = await page.evaluate(evalGeometry);
    await page.waitForTimeout(120);
    await page.screenshot({
      path: `review-final/spacing-${width}-${theme}.png`,
      fullPage: true,
    });
    report[width][theme] = { home, expanded };
    await page.context().close();
  }
  // Notes page
  {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}notes/adr-001`, { waitUntil: "networkidle" });
    report[width].note = await page.evaluate(() => {
      const gap = (a, b) =>
        Number(
          (b.getBoundingClientRect().top - a.getBoundingClientRect().bottom).toFixed(2),
        );
      const header = document.querySelector(".site-header .column");
      return {
        headerToBack: header && document.querySelector(".back-link")
          ? gap(header, document.querySelector(".back-link"))
          : null,
      };
    });
    await page.context().close();
  }
}

// Verdicts against the spec tokens (desktop first numbers, mobile second).
const verdicts = [];
const check = (name, value, expected, tol = TOL) => {
  const ok = value !== null && Math.abs(value - expected) <= tol;
  verdicts.push({ name, value, expected, ok });
};

for (const width of WIDTHS) {
  const desktop = width >= 641;
  const track = desktop ? 48 : 40;
  const head = desktop ? 40 : 32;
  const rowY = desktop ? 14 : 12;
  const para = desktop ? 16 : 14;
  const t = report[width].light.home;
  const te = report[width].light.expanded;
  check(`${width} head gap`, t.headerToFirstBlock?.gap, head);
  for (const g of t.sectionGaps) {
    check(`${width} section gap (${g.to})`, g.gap, track);
  }
  for (const [name, v] of Object.entries(t.labelToList)) {
    check(`${width} label hairline to ${name}`, v, 0, 1);
  }
  for (const [name, pad] of Object.entries(t.rowPaddings)) {
    check(`${width} ${name} row top pad`, parseFloat(pad.top), rowY);
    check(`${width} ${name} row bottom pad`, parseFloat(pad.bottom), rowY);
  }
  check(`${width} work expanded bottom pad`, parseFloat(te.rowPaddings.work.bottom), 12);
  for (const [name, v] of Object.entries(t.titleDescGaps)) {
    check(`${width} ${name} title desc gap`, v, 4);
  }
  if (t.introParaGap !== null) {
    check(`${width} intro paragraph gap`, t.introParaGap, para);
  }
  const w = te.workRhythm;
  if (w) {
    check(`${width} work toggle gap`, parseFloat(w.detailsMarginTop), 8);
    if (w.toggleToBullets !== null) {
      check(`${width} toggle to bullets`, Number(w.toggleToBullets), 8, 3);
      for (const b of w.bulletGaps) {
        check(`${width} bullet gap`, b.gap, 8, 3);
      }
    }
  }
  check(`${width} footer gap`, t.footer?.gapAboveHairline, 40);
  check(`${width} elsewhere note attach`, t.elsewhereNote, 4, 2);
  if (report[width].note) {
    check(`${width} note header gap`, report[width].note.headerToBack, head);
  }
}
// Expanded project detail bottom pad is out of the pinned table; report values.
const summaryLine = {
  verdictsFailed: verdicts.filter((v) => !v.ok).length,
  verdictsTotal: verdicts.length,
};
report.verdicts = verdicts;
report.summary = summaryLine;
console.log(JSON.stringify(report, null, 1));
await browser.close();

import sharp from "sharp";
import { mkdirSync } from "node:fs";

// Uniform 160px cells. Each cell = the variant rendered at the given size
// (16, 28, 40, 72), nearest-neighbor upscaled to 160 so the pixel truth of
// that exact size is visible. Rows: variant. Groups: white bg then dark.
mkdirSync("review-final", { recursive: true });

const TEAL = "#0891B2";
const bars = (rows, c) =>
  rows
    .map(
      ([y, h, [x, w]]) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(h / 2, 2)}" fill="${c}"/>`,
    )
    .join("\n  ");

const make = (c, rows) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="${c}"/>
  <path d="M32 54C32 54 16 40 16 26A16 16 0 0 1 48 26C48 40 32 54 32 54Z" fill="#FFFFFF"/>
  ${rows ? bars(rows, c) : ""}
</svg>`;

const VARIANTS = {
  v1_spec4: [
    [18, 4, [22, 20]],
    [25, 4, [25, 14]],
    [32, 4, [28, 8]],
  ],
  v2_bars5: [
    [17, 5, [22, 20]],
    [26, 5, [25, 14]],
    [35, 5, [28, 8]],
  ],
  v2b_low: [
    [18, 5, [22, 20]],
    [27, 5, [25, 14]],
    [36, 5, [28, 8]],
  ],
};

const SIZES = [16, 28, 40, 72];
const CELL = 160;
const COLGAP = 28;
const ROWGAP = 28;
const PAD = 48;
const BGS = [
  ["white", "#FFFFFF"],
  ["dark", "#0F0F10"],
];
const vNames = Object.keys(VARIANTS);

const W = PAD + COLGAP + vNames.length * (CELL + COLGAP) + PAD - COLGAP;
// each bg block: one row of headers height, then variants x sizes rows? simpler: rows = variant, columns = size, blocks = bg
const H =
  PAD + BGS.length * (vNames.length * (CELL + ROWGAP) + 36) + PAD - ROWGAP;

const composites = [];
let cy = PAD;
for (const [bgName, bg] of BGS) {
  for (const vn of vNames) {
    let cx = PAD;
    for (const size of SIZES) {
      const base = await sharp(Buffer.from(make(TEAL, VARIANTS[vn])))
        .resize(size, size)
        .png()
        .toBuffer();
      const mag = await sharp(base)
        .resize(CELL, CELL, { kernel: "nearest" })
        .png()
        .toBuffer();
      composites.push({ input: mag, left: Math.round(cx), top: cy });
      cx += CELL + COLGAP;
    }
    cy += CELL + ROWGAP;
  }
  cy += 36; // spacer between bg blocks
}
await sharp({
  create: { width: W, height: H, channels: 4, background: "#FFFFFF" },
})
  .composite(composites)
  .png()
  .toFile("review-final/tide-variants.png");
console.log(`review-final/tide-variants.png written ${W}x${H}`);

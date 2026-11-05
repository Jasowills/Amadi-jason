import sharp from "sharp";

// The shipped contact sheet: every project logo on white and on the dark
// page color, at 16, 28, 40 and 72px, laid out as the row tile (40) and
// the expanded tile (72) actually display them.
const NAMES = [
  { n: "prism", e: "svg" },
  { n: "tide", e: "svg" },
  { n: "trace", e: "svg" },
  { n: "pulse", e: "svg" },
  { n: "sonar", e: "svg" },
  { n: "jenamee", e: "png" },
];
const SIZES = [16, 28, 40, 72];
const BGS = [["white", "#FFFFFF"], ["dark", "#0F0F10"]];
const CELL = 96;
const PAD = 40;
const W = PAD + 1 + NAMES.length * CELL + (NAMES.length - 1) * 12 + PAD;
const H = PAD + BGS.length * (PAD + SIZES.length * (CELL + 8) + 8) + PAD;

const tasks = [];
for (const [bgName, bg] of BGS) {
  for (const size of SIZES) {
    for (let i = 0; i < NAMES.length; i++) {
      tasks.push([bgName, bg, size, i]);
    }
  }
}

const composites = [];
for (const [bgName, bg, size, i] of tasks) {
  const base = await sharp(`public/logos/${NAMES[i].n}.${NAMES[i].e}`)
    .resize(size, size)
    .png()
    .toBuffer();
  const x = PAD + 1 + i * (CELL + 12) + Math.round((CELL - size) / 2);
  const bgIndex = BGS.findIndex(([n]) => n === bgName);
  const sizeIndex = SIZES.indexOf(size);
  const y =
    PAD +
    bgIndex * (PAD + SIZES.length * (CELL + 8) + 8) +
    PAD +
    sizeIndex * (CELL + 8) +
    Math.round((CELL - size) / 2);
  composites.push({ input: base, left: x, top: y });
}

await sharp({
  create: { width: W, height: H, channels: 4, background: "#FFFFFF" },
})
  .composite(composites)
  .png()
  .toFile("logo-contact-sheet.png");
console.log(`logo-contact-sheet.png written ${W}x${H}`);

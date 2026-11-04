// Renders each hand-authored logo with sharp at 16, 40, 128 and 512px on
// white, the paper surface and the near-black page bg, so legibility at
// favicon scale is proven rather than assumed. Outputs to LOGO_REVIEW_DIR
// (default: logo-review/) so renders do not ship with the site.
// Run with `npm run logos` (needs sharp).
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const LOGOS = [
  "prism",
  "tide",
  "trace",
  "pulse",
  "sonar",
  "marklite-monogram",
  "marklite-monogram-dark",
];
const SIZES = [16, 40, 128, 512];
const BACKGROUNDS = {
  white: "#FFFFFF",
  surface: "#F7F7F5",
  dark: "#0F0F10",
};
const OUT_DIR =
  process.env.LOGO_REVIEW_DIR ??
  "/private/var/folders/81/y4t1vltx4jb4qr3y2j2ff8q00000gn/T/opencode/logo-review-captures";

mkdirSync(OUT_DIR, { recursive: true });

for (const name of LOGOS) {
  for (const size of SIZES) {
    const base = await sharp(`public/logos/${name}.svg`)
      .resize(size, size)
      .png()
      .toBuffer();
    for (const [bg, color] of Object.entries(BACKGROUNDS)) {
      const composited = await sharp({
        create: { width: size, height: size, channels: 4, background: color },
      })
        .composite([{ input: base }])
        .png()
        .toBuffer();
      const file = `${OUT_DIR}/${name}-${size}-${bg}.png`;
      await sharp(composited).toFile(file);
      console.log(file);
    }
  }
}

console.log(`rendered ${LOGOS.length * SIZES.length * 3} files into ${OUT_DIR}`);

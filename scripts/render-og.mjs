import sharp from "sharp";
await sharp("public/og-image.svg")
  .resize(1200, 630)
  .png()
  .toFile("public/og-image.png");
console.log("public/og-image.png written");

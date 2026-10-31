import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const input = path.resolve("public/images");
const output = path.resolve("public/optimized");
await fs.mkdir(output, { recursive: true });
for (const file of await fs.readdir(input)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  for (const width of [160, 320, 480, 960, 1600]) {
    const dest = path.join(output, `${file}-${width}.webp`);
    try {
      await fs.access(dest);
      continue;
    } catch {}
    await sharp(path.join(input, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 88 })
      .toFile(dest);
  }
}
console.log("Responsive WebP images ready. Original files preserved.");

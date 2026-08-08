/**
 * Trim sheet margins from motif PNGs so card faces fill edge-to-edge.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const motifsRoot = path.join(root, 'src', 'assets', 'motifs');

const WHITE_THRESHOLD = 245;
const MIN_ALPHA = 8;

async function contentBox(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < MIN_ALPHA) continue;
      // Sheet / dashed guides are near-white or pale purple-ish lines — keep colored pixels.
      const nearWhite = r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD;
      const paleGuide = r > 200 && g > 180 && b > 210 && Math.abs(r - b) < 40;
      if (nearWhite || paleGuide) continue;

      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX || maxY < minY) {
    return null;
  }

  // Slight inset so residual anti-aliased sheet pixels disappear.
  const pad = 2;
  minX = Math.max(0, minX + pad);
  minY = Math.max(0, minY + pad);
  maxX = Math.min(width - 1, maxX - pad);
  maxY = Math.min(height - 1, maxY - pad);

  return {
    left: minX,
    top: minY,
    width: Math.max(1, maxX - minX + 1),
    height: Math.max(1, maxY - minY + 1),
  };
}

async function trimFile(filePath) {
  const input = await fs.promises.readFile(filePath);
  const box = await contentBox(input);
  if (!box) {
    console.warn('skip (empty):', filePath);
    return;
  }

  const meta = await sharp(input).metadata();
  const almostFull =
    box.left <= 2 &&
    box.top <= 2 &&
    box.width >= (meta.width ?? 0) - 4 &&
    box.height >= (meta.height ?? 0) - 4;

  if (almostFull) {
    return;
  }

  await sharp(input)
    .extract(box)
    .png()
    .toFile(filePath);
  console.log(
    'trimmed',
    path.relative(root, filePath),
    `${meta.width}x${meta.height} -> ${box.width}x${box.height}`,
  );
}

async function main() {
  const themes = await fs.promises.readdir(motifsRoot);
  for (const theme of themes) {
    const dir = path.join(motifsRoot, theme);
    const stat = await fs.promises.stat(dir);
    if (!stat.isDirectory()) continue;
    const files = (await fs.promises.readdir(dir)).filter((f) => f.endsWith('.png'));
    for (const file of files) {
      // Keep back motifs if any remain; SVG backs are preferred.
      await trimFile(path.join(dir, file));
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

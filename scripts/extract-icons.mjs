/**
 * Extract icon-only PNGs: remove near-corner background, keep motif, crop tight.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const motifsRoot = path.join(root, 'src', 'assets', 'motifs');

const COLOR_DIST = 38;

function dist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function sampleCornerAverage(data, width, height, channels) {
  const points = [
    [2, 2],
    [width - 3, 2],
    [2, height - 3],
    [width - 3, height - 3],
    [Math.floor(width / 2), 2],
    [2, Math.floor(height / 2)],
  ];
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (const [x, y] of points) {
    const i = (y * width + x) * channels;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    n += 1;
  }
  return [r / n, g / n, b / n];
}

async function extractIcon(filePath) {
  const input = await fs.promises.readFile(filePath);
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const bg = sampleCornerAverage(data, width, height, channels);
  const out = Buffer.from(data);

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * channels;
      const pixel = [out[i], out[i + 1], out[i + 2]];
      const alpha = out[i + 3];
      const isBg = alpha < 10 || dist(pixel, bg) <= COLOR_DIST;
      // Pale purple guide lines from design sheets.
      const isGuide =
        pixel[0] > 170 &&
        pixel[2] > 180 &&
        pixel[1] > 140 &&
        pixel[0] - pixel[1] < 50 &&
        pixel[2] - pixel[1] > 15;

      if (isBg || isGuide) {
        out[i + 3] = 0;
        continue;
      }

      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX || maxY < minY) {
    console.warn('empty after extract:', path.relative(root, filePath));
    return;
  }

  const pad = 4;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const cropW = Math.min(width - left, maxX - minX + 1 + pad * 2);
  const cropH = Math.min(height - top, maxY - minY + 1 + pad * 2);

  // Make square canvas with transparent padding for consistent centering.
  const side = Math.max(cropW, cropH);
  const icon = await sharp(out, { raw: { width, height, channels } })
    .extract({ left, top, width: cropW, height: cropH })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: side,
      height: side,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: icon,
        left: Math.floor((side - cropW) / 2),
        top: Math.floor((side - cropH) / 2),
      },
    ])
    .png()
    .toFile(filePath);

  console.log('icon', path.relative(root, filePath), `${width}x${height} -> ${side}x${side}`);
}

async function main() {
  const themes = await fs.promises.readdir(motifsRoot);
  for (const theme of themes) {
    const dir = path.join(motifsRoot, theme);
    if (!(await fs.promises.stat(dir)).isDirectory()) continue;
    for (const file of await fs.promises.readdir(dir)) {
      if (!file.endsWith('.png') || file.startsWith('_')) continue;
      await extractIcon(path.join(dir, file));
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

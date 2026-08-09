/**
 * Make gameplay motifs sharp at card size:
 * - remove sheet / black card backgrounds
 * - trim to content
 * - upscale onto a 512×512 transparent canvas (lanczos3 + mild sharpen)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const motifsRoot = path.join(root, 'src', 'assets', 'motifs');
const TARGET = 512;
const CONTENT_RATIO = 0.9;
const COLOR_DIST = 42;

function dist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function sampleCorners(data, width, height, channels) {
  const points = [
    [1, 1],
    [width - 2, 1],
    [1, height - 2],
    [width - 2, height - 2],
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

function isGuidePixel(r, g, b) {
  const nearWhite = r >= 242 && g >= 242 && b >= 242;
  const paleGuide = r > 195 && g > 175 && b > 205 && Math.abs(r - b) < 45;
  const dashedGray = Math.abs(r - g) < 12 && Math.abs(g - b) < 12 && r > 160 && r < 235;
  return nearWhite || paleGuide || dashedGray;
}

function isNearBlack(r, g, b, a) {
  return a < 12 || (r < 22 && g < 22 && b < 22);
}

async function enhanceFile(filePath) {
  const input = await fs.promises.readFile(filePath);
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const bg = sampleCorners(data, width, height, channels);
  const bgIsDark = (bg[0] + bg[1] + bg[2]) / 3 < 55;
  const bgIsLight = (bg[0] + bg[1] + bg[2]) / 3 > 220;
  const out = Buffer.from(data);

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * channels;
      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];
      const a = out[i + 3];

      let punch = false;
      if (a < 10) punch = true;
      else if (isGuidePixel(r, g, b)) punch = true;
      else if (bgIsDark && isNearBlack(r, g, b, a)) punch = true;
      else if (bgIsLight && dist([r, g, b], bg) <= COLOR_DIST) punch = true;
      else if (!bgIsDark && !bgIsLight && dist([r, g, b], bg) <= COLOR_DIST) punch = true;

      if (punch) {
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
    return { file: path.basename(filePath), skipped: true, reason: 'no-content' };
  }

  // Keep a tiny fringe so anti-aliased edges survive.
  const fringe = 1;
  minX = Math.max(0, minX - fringe);
  minY = Math.max(0, minY - fringe);
  maxX = Math.min(width - 1, maxX + fringe);
  maxY = Math.min(height - 1, maxY + fringe);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const maxContent = Math.round(TARGET * CONTENT_RATIO);
  const scale = Math.min(maxContent / cropW, maxContent / cropH);
  const resizedW = Math.max(1, Math.round(cropW * scale));
  const resizedH = Math.max(1, Math.round(cropH * scale));
  const left = Math.round((TARGET - resizedW) / 2);
  const top = Math.round((TARGET - resizedH) / 2);

  const cropped = await sharp(out, {
    raw: { width, height, channels: 4 },
  })
    .extract({ left: minX, top: minY, width: cropW, height: cropH })
    .resize(resizedW, resizedH, {
      kernel: 'lanczos3',
      fit: 'fill',
    })
    .sharpen({ sigma: 0.9, m1: 0.6, m2: 0.35 })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: TARGET,
      height: TARGET,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: cropped, left, top }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(filePath);

  return {
    file: path.basename(filePath),
    from: `${width}x${height}`,
    content: `${cropW}x${cropH}`,
    to: `${TARGET}x${TARGET}`,
  };
}

async function main() {
  const themes = fs.readdirSync(motifsRoot).filter((name) => {
    return fs.statSync(path.join(motifsRoot, name)).isDirectory();
  });

  const results = [];
  for (const theme of themes) {
    const dir = path.join(motifsRoot, theme);
    const files = fs
      .readdirSync(dir)
      .filter((name) => name.endsWith('.png') && !name.startsWith('_'));

    for (const file of files) {
      const filePath = path.join(dir, file);
      try {
        results.push({ theme, ...(await enhanceFile(filePath)) });
      } catch (error) {
        results.push({ theme, file, error: String(error) });
      }
    }
  }

  console.table(results);
  console.log(`Enhanced ${results.filter((r) => !r.skipped && !r.error).length} motifs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

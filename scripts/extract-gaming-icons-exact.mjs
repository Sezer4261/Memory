/**
 * Extract the exact Gaming icons from the supplied design-sheet screenshots.
 *
 * The card background is removed with a border-connected flood fill, so white
 * details inside the icons remain intact. Each result is centered on a
 * transparent 1024×1024 canvas and rendered with smooth high-quality resampling.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'src', 'assets', 'motifs', 'gaming');
const targetSize = 1024;
const contentSize = 860;

const sheet1 =
  'C:/Users/konya/.cursor/projects/c-Users-konya-Documents-Weiterbildung-Projekte-Memory/assets/c__Users_konya_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_gaming1-0f03dac1-43f3-43ae-adc2-a967dda19bb8.png';
const sheet2 =
  'C:/Users/konya/.cursor/projects/c-Users-konya-Documents-Weiterbildung-Projekte-Memory/assets/c__Users_konya_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_gaming2-6ef6070f-5b07-4dee-b25f-27a1d276162d.png';

const sources = [
  {
    file: sheet1,
    top: 142,
    height: 72,
    centers: [70, 198, 326, 454, 582, 710, 838, 966],
    width: 60,
    names: [
      'squid_circle',
      'squid_square',
      'squid_triangle',
      'geo_pattern',
      'creeper',
      'mushroom',
      'rubiks',
      'cool_banana',
    ],
  },
  {
    file: sheet2,
    top: 121,
    height: 64,
    centers: [49, 151, 254, 356, 459, 561, 663, 766, 868, 970],
    width: 56,
    names: [
      'controller',
      'pacman_ghost',
      'coin',
      'dungeon_map',
      'medal',
      'pacman',
      'gameboy',
      'puzzle',
      'ace_diamonds',
      'play_button',
    ],
  },
];

function colorDistance(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function sampleBackground(data, width, height) {
  const samples = [];
  const border = 3;

  for (let x = 0; x < width; x += 1) {
    for (let offset = 0; offset < border; offset += 1) {
      for (const y of [offset, height - 1 - offset]) {
        const index = (y * width + x) * 4;
        samples.push([data[index], data[index + 1], data[index + 2]]);
      }
    }
  }

  for (let y = border; y < height - border; y += 1) {
    for (let offset = 0; offset < border; offset += 1) {
      for (const x of [offset, width - 1 - offset]) {
        const index = (y * width + x) * 4;
        samples.push([data[index], data[index + 1], data[index + 2]]);
      }
    }
  }

  samples.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));
  return samples[Math.floor(samples.length / 2)];
}

function removeConnectedCardBackground(data, width, height) {
  const background = sampleBackground(data, width, height);
  const visited = new Uint8Array(width * height);
  const queue = [];

  const canRemove = (x, y) => {
    const index = (y * width + x) * 4;
    const pixel = [data[index], data[index + 1], data[index + 2]];
    const min = Math.min(...pixel);
    const max = Math.max(...pixel);
    return (
      data[index + 3] < 12 ||
      (min > 178 && max - min < 52 && colorDistance(pixel, background) < 82)
    );
  };

  const enqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const key = y * width + x;
    if (visited[key] || !canRemove(x, y)) return;
    visited[key] = 1;
    queue.push(key);
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const key = queue[cursor];
    const x = key % width;
    const y = Math.floor(key / width);
    const index = key * 4;
    data[index + 3] = 0;
    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }
}

function contentBounds(data, width, height) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha < 20) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < minX || maxY < minY) return null;

  return {
    left: Math.max(0, minX - 1),
    top: Math.max(0, minY - 1),
    width: Math.min(width - minX + 1, maxX - minX + 3),
    height: Math.min(height - minY + 1, maxY - minY + 3),
  };
}

async function extractIcon(sheetBuffer, sheetInfo, crop, destination) {
  const { data, info } = await sharp(sheetBuffer, {
    raw: {
      width: sheetInfo.width,
      height: sheetInfo.height,
      channels: sheetInfo.channels,
    },
  })
    .extract(crop)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  removeConnectedCardBackground(data, info.width, info.height);
  const bounds = contentBounds(data, info.width, info.height);
  if (!bounds) throw new Error(`No icon content found for ${destination}`);

  const scale = Math.min(contentSize / bounds.width, contentSize / bounds.height);
  const width = Math.max(1, Math.round(bounds.width * scale));
  const height = Math.max(1, Math.round(bounds.height * scale));

  const resized = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extract(bounds)
    .resize(width, height, {
      fit: 'contain',
      kernel: 'lanczos3',
      withoutEnlargement: false,
    })
    .sharpen({ sigma: 0.7, m1: 0.45, m2: 0.2, x1: 2, y2: 10, y3: 20 })
    .modulate({ brightness: 1.01, saturation: 1.08 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  await sharp({
    create: {
      width: targetSize,
      height: targetSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: resized,
        left: Math.round((targetSize - width) / 2),
        top: Math.round((targetSize - height) / 2),
      },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(destination);

  return `${bounds.width}×${bounds.height} → ${width}×${height}`;
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const results = [];

  for (const source of sources) {
    const { data, info } = await sharp(source.file)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let index = 0; index < source.names.length; index += 1) {
      const name = source.names[index];
      const mushroomLeftPadding = name === 'mushroom' ? 8 : 0;
      const cropWidth = source.width + mushroomLeftPadding;
      const crop = {
        left: Math.round(
          source.centers[index] - source.width / 2 - mushroomLeftPadding,
        ),
        top: source.top,
        width: cropWidth,
        height: source.height,
      };
      const result = await extractIcon(
        data,
        info,
        crop,
        path.join(outputDir, `${name}.png`),
      );
      results.push({ name, result });
    }
  }

  console.table(results);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

/**
 * Extract Gaming theme front-card icons from the design-sheet screenshots.
 * Output: transparent, centered 512×512 PNGs under src/assets/motifs/gaming/
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src', 'assets', 'motifs', 'gaming');
const TARGET = 512;
const CONTENT = 0.86;

const SHEETS = [
  {
    file: 'C:/Users/konya/.cursor/projects/c-Users-konya-Documents-Weiterbildung-Projekte-Memory/assets/c__Users_konya_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_gaming1-598337cf-906e-42fc-979b-ab33ee9c0a20.png',
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
    file: 'C:/Users/konya/.cursor/projects/c-Users-konya-Documents-Weiterbildung-Projekte-Memory/assets/c__Users_konya_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_gaming2-1e423f26-59da-4052-ab10-3e6aa7e21cb2.png',
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

function isWhiteish(r, g, b) {
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  return min > 210 && max - min < 28;
}

function isGuide(r, g, b) {
  // dashed purple borders on the sheet
  return r > 160 && b > 170 && g > 140 && r - g < 55 && b - g > 10 && max3(r, g, b) - min3(r, g, b) < 90;
}

function max3(a, b, c) {
  return Math.max(a, b, c);
}
function min3(a, b, c) {
  return Math.min(a, b, c);
}

async function extractFrontCards(sheetPath, count) {
  const { data, info } = await sharp(sheetPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Front cards sit in the lower half of each dashed column.
  const yStart = Math.floor(height * 0.48);
  const colW = width / count;
  const crops = [];

  for (let i = 0; i < count; i += 1) {
    const x0 = Math.floor(i * colW + colW * 0.12);
    const x1 = Math.floor(i * colW + colW * 0.88);
    const y0 = yStart;
    const y1 = height - 4;

    // Find tight bounds of the light card face inside the column.
    let minX = x1;
    let minY = y1;
    let maxX = x0;
    let maxY = y0;
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        if (isWhiteish(r, g, b)) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX <= minX || maxY <= minY) {
      // Fallback: fixed relative crop inside column.
      minX = Math.floor(i * colW + colW * 0.18);
      maxX = Math.floor(i * colW + colW * 0.82);
      minY = Math.floor(height * 0.52);
      maxY = Math.floor(height * 0.96);
    }

    // Inset slightly to drop rounded-corner / shadow fringe.
    const inset = Math.max(2, Math.round((maxX - minX) * 0.04));
    const left = Math.max(0, minX + inset);
    const top = Math.max(0, minY + inset);
    const w = Math.max(8, maxX - minX + 1 - inset * 2);
    const h = Math.max(8, maxY - minY + 1 - inset * 2);

    crops.push({ left, top, width: w, height: h });
  }

  return { data, info, crops };
}

async function iconFromCrop(raw, info, crop, outPath) {
  const { data, info: croppedInfo } = await sharp(raw, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extract(crop)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = croppedInfo;
  const out = Buffer.from(data);

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;
      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];

      // Punch card face / sheet / guides → keep only the motif.
      if (isWhiteish(r, g, b) || isGuide(r, g, b) || (r > 235 && g > 235 && b > 235)) {
        out[i + 3] = 0;
        continue;
      }

      // Soft near-white anti-alias around icons on light cards.
      if (r > 225 && g > 225 && b > 225 && Math.max(r, g, b) - Math.min(r, g, b) < 18) {
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
    throw new Error(`no motif content for ${path.basename(outPath)}`);
  }

  const fringe = 1;
  minX = Math.max(0, minX - fringe);
  minY = Math.max(0, minY - fringe);
  maxX = Math.min(width - 1, maxX + fringe);
  maxY = Math.min(height - 1, maxY + fringe);
  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;

  const maxSide = Math.round(TARGET * CONTENT);
  const scale = Math.min(maxSide / cw, maxSide / ch);
  // Prefer integer-ish upscale for crisp pixel art (creeper), but lanczos for the rest.
  const rw = Math.max(1, Math.round(cw * scale));
  const rh = Math.max(1, Math.round(ch * scale));
  const left = Math.round((TARGET - rw) / 2);
  const top = Math.round((TARGET - rh) / 2);

  const motifBuf = await sharp(out, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: cw, height: ch })
    .resize(rw, rh, {
      kernel: 'lanczos3',
      fit: 'fill',
    })
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
    .composite([{ input: motifBuf, left, top }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  return { from: `${cw}x${ch}`, to: `${TARGET}x${TARGET}` };
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const results = [];

  for (const sheet of SHEETS) {
    const { data, info, crops } = await extractFrontCards(sheet.file, sheet.names.length);
    for (let i = 0; i < sheet.names.length; i += 1) {
      const name = sheet.names[i];
      const outPath = path.join(outDir, `${name}.png`);
      const meta = await iconFromCrop(data, info, crops[i], outPath);
      results.push({ name, crop: crops[i], ...meta });
    }
  }

  console.table(
    results.map((r) => ({
      name: r.name,
      crop: `${r.crop.width}x${r.crop.height}@${r.crop.left},${r.crop.top}`,
      content: r.from,
      out: r.to,
    })),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(rootDir, '..');
const distDir = path.resolve(projectRoot, 'dist');
const builtApp = path.resolve(distDir, 'app.html');
const openableIndex = path.resolve(projectRoot, 'index.html');
const openableAssets = path.resolve(projectRoot, 'assets');
const distAssets = path.resolve(distDir, 'assets');

if (!existsSync(builtApp)) {
  console.error('Build-Datei dist/app.html wurde nicht gefunden.');
  process.exit(1);
}

let html = readFileSync(builtApp, 'utf8');
html = html
  .replace(/\s*type="module"/g, '')
  .replace(/\s*crossorigin(?:="[^"]*")?/g, '')
  .replace(/<script(?![^>]*\bdefer\b)(\s+src="[^"]+")>/g, '<script defer$1>');

writeFileSync(openableIndex, html, 'utf8');

if (existsSync(openableAssets)) {
  rmSync(openableAssets, { recursive: true, force: true });
}

if (existsSync(distAssets)) {
  mkdirSync(openableAssets, { recursive: true });
  cpSync(distAssets, openableAssets, { recursive: true });
}

console.log('index.html + assets/ aktualisiert – Doppelklick startet das Spiel.');

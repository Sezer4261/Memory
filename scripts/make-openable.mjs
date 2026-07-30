import { copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(rootDir, '..');
const builtApp = path.resolve(projectRoot, 'dist', 'app.html');
const openableIndex = path.resolve(projectRoot, 'index.html');

if (!existsSync(builtApp)) {
  console.error('Build-Datei dist/app.html wurde nicht gefunden.');
  process.exit(1);
}

copyFileSync(builtApp, openableIndex);
console.log('index.html aktualisiert – Doppelklick startet jetzt das Spiel.');

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** Use classic deferred <script> so dist works via file:// (Doppelklick). */
function classicScriptPlugin(): Plugin {
  return {
    name: 'classic-script',
    enforce: 'post',
    transformIndexHtml(html) {
      return html
        .replace(/\s*type="module"/g, '')
        .replace(/\s*crossorigin(?:="[^"]*")?/g, '')
        .replace(/<script(\s+src="[^"]+")>/g, '<script defer$1>');
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [classicScriptPlugin()],
  server: {
    open: '/app.html',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false,
    cssMinify: false,
    modulePreload: false,
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(rootDir, 'app.html'),
      output: {
        format: 'iife',
        name: 'MemoryApp',
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});

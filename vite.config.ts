import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages project site: https://maxnannij.github.io/anthormiga/
  base: process.env.GITHUB_PAGES === 'true' ? '/anthormiga/' : './',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});

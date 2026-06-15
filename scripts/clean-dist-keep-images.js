/**
 * Wipe dist/ but keep dist/assets/images/ so eleventy-img can skip
 * reprocessing unchanged images (output file already exists).
 * Used on Netlify only — see build:netlify in package.json.
 */
const fs = require('node:fs');
const path = require('node:path');

const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  process.exit(0);
}

const assetsDir = path.join(distDir, 'assets');

for (const entry of fs.readdirSync(distDir)) {
  const fullPath = path.join(distDir, entry);

  if (entry === 'assets' && fs.existsSync(assetsDir)) {
    for (const assetEntry of fs.readdirSync(assetsDir)) {
      if (assetEntry === 'images') continue;
      fs.rmSync(path.join(assetsDir, assetEntry), { recursive: true, force: true });
    }
    continue;
  }

  fs.rmSync(fullPath, { recursive: true, force: true });
}

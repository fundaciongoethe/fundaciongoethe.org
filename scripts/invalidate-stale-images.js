/**
 * Delete responsive image variants when the source file was updated in place.
 * Runs after clean-dist-keep-images and before eleventy on Netlify builds.
 */
const fs = require('node:fs');
const path = require('node:path');

const srcRoot = path.resolve(__dirname, '../src/assets/images');
const distRoot = path.resolve(__dirname, '../dist/assets/images');
const imageExt = /\.(jpe?g|png|gif|webp|avif|tiff?|heic)$/i;
const variantRe = /^(.+)-(\d+)w\.(jpe?g|webp)$/i;

function walkImages(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkImages(fullPath, files);
    } else if (imageExt.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function removeVariantsForBasename(basename) {
  if (!fs.existsSync(distRoot)) return 0;

  let removed = 0;

  for (const file of fs.readdirSync(distRoot)) {
    const match = file.match(variantRe);
    if (!match || match[1] !== basename) continue;

    fs.rmSync(path.join(distRoot, file));
    removed++;
  }

  return removed;
}

function outputsAreStale(basename, sourceMtimeMs) {
  if (!fs.existsSync(distRoot)) return false;

  for (const file of fs.readdirSync(distRoot)) {
    const match = file.match(variantRe);
    if (!match || match[1] !== basename) continue;

    const outputMtimeMs = fs.statSync(path.join(distRoot, file)).mtimeMs;
    if (sourceMtimeMs > outputMtimeMs) return true;
  }

  return false;
}

if (!fs.existsSync(distRoot)) {
  process.exit(0);
}

let invalidated = 0;

for (const sourcePath of walkImages(srcRoot)) {
  const basename = path.basename(sourcePath, path.extname(sourcePath));
  const sourceMtimeMs = fs.statSync(sourcePath).mtimeMs;

  if (outputsAreStale(basename, sourceMtimeMs)) {
    invalidated += removeVariantsForBasename(basename);
  }
}

if (invalidated > 0) {
  console.log(`[invalidate-stale-images] removed ${invalidated} outdated variant(s)`);
}

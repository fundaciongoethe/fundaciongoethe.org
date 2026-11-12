const { promises: fsPromises, existsSync } = require('node:fs');
const path = require('node:path');
const ImageImport = require('@11ty/eleventy-img');
const Image = ImageImport?.default ?? ImageImport;

const ogImagesDir = './src/assets/og-images';

/** Convert built OG SVGs to committed JPEGs (skip if JPEG already exists). */
async function svgToJpeg() {
  const socialPreviewImagesDir = 'dist/assets/og-images/';

  if (!existsSync(socialPreviewImagesDir)) {
    console.log('⚠ No OG images dir found');
    return;
  }

  const files = await fsPromises.readdir(socialPreviewImagesDir);
  if (files.length === 0) {
    console.log('⚠ No images found on OG images dir');
    return;
  }

  for (const filename of files) {
    if (!filename.endsWith('.svg')) continue;

    const outputFilename = filename.substring(0, filename.length - 4);
    const jpegPath = path.join(ogImagesDir, `${outputFilename}.jpeg`);
    if (existsSync(jpegPath)) continue;

    await Image(path.join(socialPreviewImagesDir, filename), {
      formats: ['jpeg'],
      outputDir: ogImagesDir,
      filenameFormat: function () {
        return `${outputFilename}.jpeg`;
      },
    });
  }
}

module.exports = { svgToJpeg };

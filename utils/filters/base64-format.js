const fs = require('node:fs');

/** Embed a local image as a data URI for SVG OG templates. */
function base64Format(imagePath) {
  try {
    if (!imagePath || !fs.existsSync(imagePath)) {
      console.warn(`OG image file not found: ${imagePath}`);
      return null;
    }

    const lowerPath = imagePath.toLowerCase();
    const image = fs.readFileSync(imagePath);
    const base64Image = Buffer.from(image).toString('base64');

    if (lowerPath.endsWith('.jpeg') || lowerPath.endsWith('.jpg')) {
      return `data:image/jpeg;base64,${base64Image}`;
    }
    if (lowerPath.endsWith('.png')) {
      return `data:image/png;base64,${base64Image}`;
    }

    console.warn(`Unsupported OG image format: ${imagePath}`);
    return null;
  } catch (error) {
    console.error('Error encoding OG image:', error);
    return null;
  }
}

module.exports = { base64Format };

const htmlmin = require('html-minifier-terser');
const isProduction = process.env.ELEVENTY_ENV === 'production';

module.exports = {
  compressHTML: (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html') && isProduction) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
      return minified;
    }
    return content;
  },
};

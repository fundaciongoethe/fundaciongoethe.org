const htmlmin = require('html-minifier-terser');
const { shouldMinify } = require('./minify-paths.js');

const isProduction = process.env.ELEVENTY_ENV === 'production';

module.exports = {
  compressHTML: (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html') && isProduction && shouldMinify(outputPath)) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
    }
    return content;
  },
};

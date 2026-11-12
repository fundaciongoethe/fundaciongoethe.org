const heroImageUrl = require('../../../utils/hero-image-url.js');

module.exports = {
  eleventyComputed: {
    'heroimg.url': heroImageUrl,
  },
};

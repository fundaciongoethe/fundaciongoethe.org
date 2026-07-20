module.exports = {
  eleventyComputed: {
    'heroimg.url': (data) => {
      if (data.meta.christmas) {
        return './src/assets/images/hero/navidad-2021-hero.jpg';
      } else if (data.meta.summer) {
        return './src/assets/images/hero/verano-hero-26.jpg';
      }
      return './src/assets/images/hero/start.jpg';
    },
  },
};

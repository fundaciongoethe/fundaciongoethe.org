module.exports = {
  eleventyComputed: {
    'heroimg.url': (data) => {
      if (data.meta.christmas) {
        return './src/assets/images/hero/navidad-2021-hero.jpg';
      }
      return './src/assets/images/hero/start.jpg';
    },
  },
};

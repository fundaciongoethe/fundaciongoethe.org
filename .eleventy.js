const filters = require('./utils/filters.js');

// moment cause i cant get it to work with fns repecting DRY
const moment = require('moment');
const markdownIt = require('markdown-it');
const markdownItEmoji = require('markdown-it-emoji').full;

const eleventaFilters = require('./utils/filters/eleventaFilters.js');
const dateFilters = require('./utils/filters/dateFilters.js');

// shortcodes
const youtube = require('./utils/shortcodes/youtube-lite.js');
const audiofile = require('./utils/shortcodes/audio.js');
const videofile = require('./utils/shortcodes/video.js');
const svg = require('./utils/shortcodes/svg.js');

// paired shortcodes
const markdownShortcodes = require('./utils/paired-shortcodes/markdown-shortcodes.js');
const pairedAudio = require('./utils/paired-shortcodes/audio.js');

// async shortcodes
const svgsprite = require('./utils/async-shortcodes/svgsprite');

// transforms
const htmlmin = require('./utils/transforms/htmlmin.js');

// plugins
const pluginRss = require('@11ty/eleventy-plugin-rss');
const Image = require('@11ty/eleventy-img');
const path = require('path');
const embedEverything = require('eleventy-plugin-embed-everything');

module.exports = async function (eleventyConfig) {
  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // This allows Eleventy to watch for file changes during local development.
  eleventyConfig.setUseGitIgnore(false);

  // ab hier altes fundaciongoethe

  Object.keys(eleventaFilters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, eleventaFilters[filterName]);
  });

  Object.keys(dateFilters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, dateFilters[filterName]);
  });

  // date filter (localized)
  eleventyConfig.addNunjucksFilter('date', function (date, format, locale) {
    locale = locale ? locale : 'es';
    moment.locale(locale);
    return moment(date).format(format);
  });

  // Return a randomly picked item from a given array. From 11ty.rocks
  eleventyConfig.addFilter('randomItem', (arr) => {
    arr.sort(() => {
      return 0.5 - Math.random();
    });
    return arr.slice(0, 1);
  });

  // Shortcodes

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`); // current year, stephanie eckles
  eleventyConfig.addShortcode('youtube', youtube);
  eleventyConfig.addShortcode('audiofile', audiofile);
  eleventyConfig.addShortcode('videofile', videofile);

  Object.keys(svg).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, svg[shortcodeName]);
  });

  // Paired Shortcodes

  Object.keys(markdownShortcodes).forEach((shortcodeName) => {
    // markdown shortcodes collection
    eleventyConfig.addPairedShortcode(shortcodeName, markdownShortcodes[shortcodeName]);
  });

  eleventyConfig.addPairedShortcode('pairedAudio', pairedAudio);

  // Async shortcodes

  eleventyConfig.addNunjucksAsyncShortcode('svgsprite', svgsprite);

  // Transforms

  Object.keys(htmlmin).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, htmlmin[transformName]);
  });

  // Plugins

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(embedEverything);

  // eleventy img
  eleventyConfig.addNunjucksAsyncShortcode('Picture', async (src, pcls, cls, alt = '', loading, sizes = '100vw') => {
    let metadata = await Image(src, {
      widths: [170, 420, 550, 770, 1200],
      formats: ['webp', 'jpeg'],
      urlPath: '/assets/images/',
      outputDir: './dist/assets/images/',
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);

        return `${name}-${width}w.${format}`;
      },
    });

    let lowsrc = metadata.jpeg[0];

    return `<picture class="${pcls}">
      ${Object.values(metadata)
        .map((imageFormat) => {
          return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
            .map((entry) => entry.srcset)
            .join(', ')}" sizes="${sizes}">`;
        })
        .join('\n')}
        <img
          src="${lowsrc.url}"
          class="${cls}"
          width="${lowsrc.width}"
          height="${lowsrc.height}"
          alt="${alt}"
          loading="${loading}"
          decoding="async"
         >
      </picture>`;
  });

  eleventyConfig.addNunjucksAsyncShortcode('Image', async function imageShortcode(src, cls, alt) {
    if (alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }

    let metadata = await Image(src, {
      widths: [600],
      formats: ['jpeg'],
      urlPath: '/assets/images/',
      outputDir: './dist/assets/images/',
    });

    let data = metadata.jpeg[metadata.jpeg.length - 1];
    return `<img src="${data.url}" class="${cls}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
  });

  // Collections

  eleventyConfig.addPlugin(require('./utils/collections/collections-config.js'));

  // Custom Watch Targets

  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./utils/*.js');
  eleventyConfig.addWatchTarget('./tailwind.config.js');

  // Passthrough File Copy

  eleventyConfig.addPassthroughCopy('src/assets/fonts/');
  eleventyConfig.addPassthroughCopy('src/assets/svg/');
  eleventyConfig.addPassthroughCopy('src/assets/videos/');
  eleventyConfig.addPassthroughCopy('src/assets/audio/');
  eleventyConfig.addPassthroughCopy('src/assets/pdf/');
  eleventyConfig.addPassthroughCopy('src/assets/images/');
  eleventyConfig.addPassthroughCopy('src/assets/scripts/vendor/');

  // social icons von images zu root

  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/',
  });

  // node modules
  eleventyConfig.addPassthroughCopy({
    'node_modules/lite-youtube-embed/src/lite-yt-embed.js': `assets/lite-yt-embed.js`,
  });

  // Set custom markdown library instance  and support for Emojis in markdown...

  const markdownLib = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,
  }).use(markdownItEmoji);

  eleventyConfig.setLibrary('md', markdownLib);

  // Add layout aliases

  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('home', 'layouts/home.njk');
  eleventyConfig.addLayoutAlias('plain', 'layouts/plain.njk');
  eleventyConfig.addLayoutAlias('evento', 'layouts/evento.njk');
  eleventyConfig.addLayoutAlias('event-archive', 'layouts/event-archive.njk');
  eleventyConfig.addLayoutAlias('artist', 'layouts/artist.njk');
  eleventyConfig.addLayoutAlias('venue', 'layouts/venue.njk');
  eleventyConfig.addLayoutAlias('sponsor', 'layouts/sponsor.njk');
  eleventyConfig.addLayoutAlias('redirect', 'layouts/redirect.njk');
  eleventyConfig.addLayoutAlias('404', 'layouts/404.njk');

  // Opts in to a full deep merge when combining the Data Cascade.
  // @link https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge

  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data',
    },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};

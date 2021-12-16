const filters = require('./utils/filters.js');

const { isAfter, isBefore, format } = require('date-fns');
// moment cause i cant get it to work with fns repecting DRY
const moment = require('moment');
const markdownIt = require('markdown-it');
const markdownItEmoji = require('markdown-it-emoji');

const eleventaFilters = require('./utils/filters/eleventaFilters.js');
const dateFilters = require('./utils/filters/dateFilters.js');

// shortcodes
const youtube = require('./utils/shortcodes/youtube-lite.js');
const audiofile = require('./utils/shortcodes/audio.js');
const svg = require('./utils/shortcodes/svg.js');

// paired shortcodes
const markdownShortcodes = require('./utils/paired-shortcodes/markdown-shortcodes.js');
const pairedAudio = require('./utils/paired-shortcodes/markdown-shortcodes.js');

// ejemplo:   {% audiofile '/assets/podcast/01-derechos.mp3', 'Episodio 1' %}

// async shortcodes
const svgsprite = require('./utils/async-shortcodes/svgsprite');

// transforms
const htmlmin = require('./utils/transforms/htmlmin.js');

// plugins
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const Image = require('@11ty/eleventy-img');
const path = require('path');
const embedEverything = require('eleventy-plugin-embed-everything');
const pluginPWA = require('eleventy-plugin-pwa');

// event validation
const isValidTitle = (title = '') => title.trim().length > 2;
const isValidEvent = (event) => isValidTitle(event.data.title);

// to group all posts by year
const _ = require('lodash');

module.exports = function (eleventyConfig) {
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

  Object.keys(svg).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, svg[shortcodeName]);
  });

  // Paired Shortcodes

  eleventyConfig.addPairedShortcode('pairedAudio', pairedAudio);

  eleventyConfig.addPairedShortcode('pairedaudio', function (pairedaudiofile, pairedaudioname) {
    return `<div class="audio-player" data-song="${pairedaudiofile}"><div class="timeline"><div class="progress"></div></div><div class="controls"><div class="play-container"><div class="toggle-play play"></div></div><div class="time"><div class="current">0:00</div><div class="divider">/</div><div class="length"></div></div><div class="name">${pairedaudioname}</div><div class="volume-container"><div class="volume-button"><div class="volume icono-volumeMedium"></div></div><div class="volume-slider"><div class="volume-percentage"></div></div></div></div></div>`;
  });

  Object.keys(markdownShortcodes).forEach((shortcodeName) => {
    // markdown shortcodes collection
    eleventyConfig.addPairedShortcode(shortcodeName, markdownShortcodes[shortcodeName]);
  });

  // Async shortcodes

  eleventyConfig.addNunjucksAsyncShortcode('svgsprite', svgsprite);

  // Transforms

  Object.keys(htmlmin).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, htmlmin[transformName]);
  });

  // Plugins

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(embedEverything);
  eleventyConfig.addPlugin(pluginPWA);

  // eleventy img
  eleventyConfig.addNunjucksAsyncShortcode('Picture', async (src, pcls, cls, alt, loading, sizes = '100vw') => {
    if (!alt) {
      throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }

    let metadata = await Image(src, {
      widths: [230, 580, 770, 1200],
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
          decoding="async">
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

  // blog es
  eleventyConfig.addCollection('posts_es', function (collection) {
    return collection.getFilteredByGlob('./src/es/noticias/*.md');
  });

  // blog de
  eleventyConfig.addCollection('posts_de', function (collection) {
    return collection.getFilteredByGlob('./src/de/aktuelles/*.md');
  });

  // artists es, randomized on build
  eleventyConfig.addCollection('artists_es', function (collection) {
    return (
      collection
        // Change to the name of your tag
        .getFilteredByGlob('./src/es/artistas/*.md')
        .sort(() => {
          return 0.5 - Math.random();
        })
    );
  });

  // artists de, randomized on build
  eleventyConfig.addCollection('artists_de', function (collection) {
    return (
      collection
        // Change to the name of your tag
        .getFilteredByGlob('./src/de/kuenstler/*.md')
        .sort(() => {
          return 0.5 - Math.random();
        })
    );
  });

  // venues es, randomized on build
  eleventyConfig.addCollection('venues_es', function (collection) {
    return (
      collection
        // Change to the name of your tag
        .getFilteredByGlob('./src/es/lugares/*.md')
        .sort(() => {
          return 0.5 - Math.random();
        })
    );
  });

  // venues de, randomized on build
  eleventyConfig.addCollection('venues_de', function (collection) {
    return (
      collection
        // Change to the name of your tag
        .getFilteredByGlob('./src/de/orte/*.md')
        .sort(() => {
          return 0.5 - Math.random();
        })
    );
  });

  // förderer es, randomized on build
  eleventyConfig.addCollection('sponsors_es', function (collection) {
    return (
      collection
        // Change to the name of your tag
        .getFilteredByGlob('./src/es/patrocinadores/*.md')
        .sort(() => {
          return 0.5 - Math.random();
        })
    );
  });

  // förderer de, randomized on build
  eleventyConfig.addCollection('sponsors_de', function (collection) {
    return (
      collection
        // Change to the name of your tag
        .getFilteredByGlob('./src/de/foerderer/*.md')
        .sort(() => {
          return 0.5 - Math.random();
        })
    );
  });

  // events es
  eleventyConfig.addCollection('events_es', (collectionApi) => {
    return collectionApi.getFilteredByGlob('./src/es/eventos/*.md');
  });

  // events es past sorted by year
  eleventyConfig.addCollection('eventosPasados', (collectionApi) => {
    return _.chain(collectionApi.getFilteredByGlob('./src/es/eventos/*.md'))
      .filter((event) => isValidEvent(event) && isBefore(new Date(event.data.date), new Date()))
      .groupBy((event) => event.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

  eleventyConfig.addCollection('eventosFuturos', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('./src/es/eventos/*.md')
      .filter((event) => isValidEvent(event) && isAfter(new Date(event.data.date), new Date()));
  });

  // events de
  eleventyConfig.addCollection('events_de', (collectionApi) => {
    return collectionApi.getFilteredByGlob('./src/de/events/*.md');
  });

  // events de past sorted by year
  eleventyConfig.addCollection('eventsVergangenheit', (collectionApi) => {
    return _.chain(collectionApi.getFilteredByGlob('./src/de/events/*.md'))
      .filter((event) => isValidEvent(event) && isBefore(new Date(event.data.date), new Date()))
      .groupBy((event) => event.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

  eleventyConfig.addCollection('eventsZukunft', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('./src/de/events/*.md')
      .filter((event) => isValidEvent(event) && isAfter(new Date(event.data.date), new Date()));
  });

  // Custom Watch Targets

  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./utils/*.js');
  eleventyConfig.addWatchTarget('./tailwind.config.js');

  // Passthrough File Copy

  eleventyConfig.addPassthroughCopy('src/assets/fonts/');
  eleventyConfig.addPassthroughCopy('src/assets/svg/');
  eleventyConfig.addPassthroughCopy('src/assets/pdf/');

  // social icons von images zu root
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/site.webmanifest': 'site.webmanifest',
  });
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/favicon.ico': 'favicon.ico',
  });
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/favicon.svg': 'favicon.svg',
  });
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/apple-touch-icon.png': 'apple-touch-icon.png',
  });
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/favicon-32x32.png': 'favicon-32x32.png',
  });
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/favicon-16x16.png': 'favicon-16x16.png',
  });
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/android-chrome-192x192.png': 'android-chrome-192x192.png',
  });
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/android-chrome-512x512.png': 'android-chrome-512x512.png',
  });
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/maskable.png': 'maskable.png',
  });

  // Set custom markdown library instance  and support for Emojis in markdown...

  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  };
  let markdownLib = markdownIt(options).use(markdownItEmoji);
  eleventyConfig.setLibrary('md', markdownLib);

  // Add layout aliases

  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('home', 'layouts/home.njk');
  eleventyConfig.addLayoutAlias('plain', 'layouts/plain.njk');
  eleventyConfig.addLayoutAlias('evento', 'layouts/evento.njk');
  eleventyConfig.addLayoutAlias('eventonoartist', 'layouts/eventonoartist.njk');
  eleventyConfig.addLayoutAlias('eventonoartistnovenue', 'layouts/eventonoartistnovenue.njk');
  eleventyConfig.addLayoutAlias('artist', 'layouts/artist.njk');
  eleventyConfig.addLayoutAlias('venue', 'layouts/venue.njk');
  eleventyConfig.addLayoutAlias('sponsor', 'layouts/sponsor.njk');
  eleventyConfig.addLayoutAlias('redirect', 'layouts/redirect.njk');

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
    templateFormats: ['html', 'njk', 'md', 'pdf'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};

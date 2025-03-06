// to group all posts by year
const lodash = require('lodash');

// event validation
const { isAfter, isBefore, format } = require('date-fns');
const isValidTitle = (title = '') => title.trim().length > 2;
const isValidEvent = (event) => isValidTitle(event.data.title);

module.exports = function (eleventyConfig) {
  // blog es
  eleventyConfig.addCollection('posts_es', function (collection) {
    return collection.getFilteredByGlob('./src/es/noticias/**/*.md');
  });

  // blog de
  eleventyConfig.addCollection('posts_de', function (collection) {
    return collection.getFilteredByGlob('./src/de/aktuelles/**/*.md');
  });

  // artists es, randomized on build
  eleventyConfig.addCollection('artists_es', function (collection) {
    return collection.getFilteredByGlob('./src/es/artistas/**/*.md').sort(() => {
      return 0.5 - Math.random();
    });
  });

  // artists de, randomized on build
  eleventyConfig.addCollection('artists_de', function (collection) {
    return collection.getFilteredByGlob('./src/de/kuenstler/**/*.md').sort(() => {
      return 0.5 - Math.random();
    });
  });

  // venues es, randomized on build
  eleventyConfig.addCollection('venues_es', function (collection) {
    return collection.getFilteredByGlob('./src/es/lugares/**/*.md').sort(() => {
      return 0.5 - Math.random();
    });
  });

  // venues de, randomized on build
  eleventyConfig.addCollection('venues_de', function (collection) {
    return collection.getFilteredByGlob('./src/de/orte/**/*.md').sort(() => {
      return 0.5 - Math.random();
    });
  });

  // förderer es, randomized on build
  eleventyConfig.addCollection('sponsors_es', function (collection) {
    return collection.getFilteredByGlob('./src/es/promotores/**/*.md').sort(() => {
      return 0.5 - Math.random();
    });
  });

  // förderer de, randomized on build
  eleventyConfig.addCollection('sponsors_de', function (collection) {
    return collection.getFilteredByGlob('./src/de/foerderer/**/*.md').sort(() => {
      return 0.5 - Math.random();
    });
  });

  // events es
  eleventyConfig.addCollection('events_es', (collectionApi) => {
    return collectionApi.getFilteredByGlob('./src/es/eventos/**/*.md');
  });

  // events es past sorted by year
  eleventyConfig.addCollection('eventosPasados_es', (collectionApi) => {
    return lodash
      .chain(collectionApi.getFilteredByGlob('./src/es/eventos/**/*.md'))
      .filter((event) => isValidEvent(event) && isBefore(new Date(event.data.date), new Date()))
      .groupBy((event) => event.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

  // events es future sorted by year
  eleventyConfig.addCollection('eventosFuturos_es', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('./src/es/eventos/**/*.md')
      .filter((event) => isValidEvent(event) && isAfter(new Date(event.data.date), new Date()));
  });

  // events de
  eleventyConfig.addCollection('events_de', (collectionApi) => {
    return collectionApi.getFilteredByGlob('./src/de/events/**/*.md');
  });

  // events de past sorted by year
  eleventyConfig.addCollection('eventosPasados_de', (collectionApi) => {
    return lodash
      .chain(collectionApi.getFilteredByGlob('./src/de/events/**/*.md'))
      .filter((event) => isValidEvent(event) && isBefore(new Date(event.data.date), new Date()))
      .groupBy((event) => event.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

  // events de future sorted by year
  eleventyConfig.addCollection('eventosFuturos_de', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('./src/de/events/**/*.md')
      .filter((event) => isValidEvent(event) && isAfter(new Date(event.data.date), new Date()));
  });

  // Generate backlinks from artists & venues to their events
  eleventyConfig.addCollection('eventsByArtistAndVenue', (collectionApi) => {
    let events = collectionApi.getFilteredByGlob(['./src/es/eventos/**/*.md', './src/de/events/**/*.md']);

    let eventsByArtist = {};
    let eventsByVenue = {};

    events.forEach((event) => {
      let artists = Array.isArray(event.data.artist) ? event.data.artist : event.data.artist ? [event.data.artist] : [];
      let venues = Array.isArray(event.data.venue) ? event.data.venue : event.data.venue ? [event.data.venue] : [];

      let locale = event.inputPath.includes('/es/') ? 'es' : 'de';

      artists.forEach((artist) => {
        let artistKey = artist.toLowerCase();
        if (!eventsByArtist[locale]) {
          eventsByArtist[locale] = {};
        }
        if (!eventsByArtist[locale][artistKey]) {
          eventsByArtist[locale][artistKey] = [];
        }
        eventsByArtist[locale][artistKey].push(event);
      });

      venues.forEach((venue) => {
        let venueKey = venue.toLowerCase();
        if (!eventsByVenue[locale]) {
          eventsByVenue[locale] = {};
        }
        if (!eventsByVenue[locale][venueKey]) {
          eventsByVenue[locale][venueKey] = [];
        }
        eventsByVenue[locale][venueKey].push(event);
      });
    });

    return { eventsByArtist, eventsByVenue };
  });
};

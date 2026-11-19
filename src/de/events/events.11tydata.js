const { isBefore } = require('date-fns');
const { resolveLocation } = require('../../../utils/events/event-location.js');
const { buildCalendarShows } = require('../../../utils/events/calendar-shows.js');

module.exports = {
  eleventyComputed: {
    // draft: true → build locally, skip page + collections in production
    permalink: (data) => {
      if (data.draft && process.env.ELEVENTY_ENV === 'production') {
        return false;
      }
      return data.permalink;
    },
    eleventyExcludeFromCollections: (data) => {
      if (data.draft && process.env.ELEVENTY_ENV === 'production') {
        return true;
      }
      return data.eleventyExcludeFromCollections;
    },
    location: (data) => resolveLocation(data),
    calendarShows: (data) => buildCalendarShows(data),
    calendarLinks: {
      isFutureEvent: ({ date: start }) => {
        return isBefore(new Date(), new Date(start));
      },
    },
  },
};

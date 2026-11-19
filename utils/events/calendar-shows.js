const { google, outlook, office365, ics } = require('calendar-link');

function buildShowLinks({ title, description, location, url, start, calcDuration }) {
  const event = {
    title,
    description,
    start,
    duration: [calcDuration, 'hour'],
    location,
    url,
  };
  return {
    start,
    googleLink: google(event),
    outlookLink: outlook(event),
    officeLink: office365(event),
    icsLink: ics(event),
  };
}

/** Primary show first, then each additionalShows entry. */
function buildCalendarShows(data) {
  const { title, description, location, url, date, calcDuration, additionalShows } = data;
  const shows = [
    buildShowLinks({
      title,
      description,
      location,
      url,
      start: date,
      calcDuration,
    }),
  ];

  if (!Array.isArray(additionalShows)) {
    return shows;
  }

  for (const show of additionalShows) {
    shows.push(
      buildShowLinks({
        title,
        description,
        location,
        url,
        start: show.date,
        calcDuration: show.calcDuration != null ? show.calcDuration : calcDuration,
      })
    );
  }

  return shows;
}

module.exports = { buildCalendarShows };

// ponytail: self-check — run: node utils/events/calendar-shows.js
if (require.main === module) {
  const shows = buildCalendarShows({
    title: 'Test',
    description: 'Desc',
    location: 'Sevilla',
    url: 'https://example.com/event',
    date: '2026-11-27 17:00:00',
    calcDuration: 1.17,
    additionalShows: [{ date: '2026-11-27 19:00:00', calcDuration: 1.17 }],
  });
  if (shows.length !== 2) throw new Error(`expected 2 shows, got ${shows.length}`);
  if (!shows[0].googleLink || !shows[1].icsLink) throw new Error('missing calendar links');
  if (shows[0].start !== '2026-11-27 17:00:00' || shows[1].start !== '2026-11-27 19:00:00') {
    throw new Error('unexpected start times');
  }
  console.log('calendar-shows: ok');
}

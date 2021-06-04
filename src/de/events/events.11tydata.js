const { google, outlook, office365, ics } = require("calendar-link");
const { isBefore } = require("date-fns");
const url = "http://localhost:8080";
const location = "Evento de la FG";

function updateDesc(description, url) {
	const newDescription = description
		? `
			Learn with us in the Lunch Dev Community Discord at <a href="${url}">${url}</a>
			${description}
	`
		: `Learn with us in the Lunch Dev Community Discord at <a href="${url}">${url}</a>`;
	return newDescription;
}

module.exports = {
	eleventyComputed: {
		calendarLinks: {
			isFutureEvent: ({ date: start }) => {
				return isBefore(new Date(), new Date(start));
			},
			googleLink: ({ title, description, date: start }) => {
				return google({
					title,
					description: updateDesc(description, url),
					start,
					duration: [1, "hour"],
					location,
					url,
				});
			},
			outlookLink: ({ title, description, date: start }) => {
				return outlook({
					title,
					description: updateDesc(description, url),
					start,
					duration: [1, "hour"],
					location,
					url,
				});
			},
			officeLink: ({ title, description, date: start }) => {
				return office365({
					title,
					description: updateDesc(description, url),
					start,
					duration: [1, "hour"],
					location,
					url,
				});
			},
			icsLink: ({ title, description, date: start }) => {
				return ics({
					title,
					description: updateDesc(description, url),
					start,
					duration: [1, "hour"],
					location,
					url,
				});
			},
		},
	},
};

const { google, outlook, office365, ics } = require("calendar-link");
const { isBefore } = require("date-fns");

module.exports = {
	eleventyComputed: {
		calendarLinks: {
			url: (data) => data.url,
			location: (data) => data.location,
			calcDuration: (data) => data.calcDuration,
			isFutureEvent: ({ date: start }) => {
				return isBefore(new Date(), new Date(start));
			},
			googleLink: ({
				title,
				location,
				calcDuration,
				description,
				date: start,
				url,
			}) => {
				return google({
					title,
					description,
					start,
					duration: [calcDuration, "hour"],
					location,
					url,
				});
			},
			outlookLink: ({
				title,
				location,
				calcDuration,
				description,
				date: start,
				url,
			}) => {
				return outlook({
					title,
					description,
					start,
					duration: [calcDuration, "hour"],
					location,
					url,
				});
			},
			officeLink: ({
				title,
				location,
				calcDuration,
				description,
				date: start,
				url,
			}) => {
				return office365({
					title,
					description,
					start,
					duration: [calcDuration, "hour"],
					location,
					url,
				});
			},
			icsLink: ({
				title,
				location,
				calcDuration,
				description,
				date: start,
				url,
			}) => {
				return ics({
					title,
					description,
					start,
					duration: [calcDuration, "hour"],
					location,
					url,
				});
			},
		},
	},
};

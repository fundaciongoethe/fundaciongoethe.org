const { format } = require("date-fns");
const spanishLocale = require("date-fns/locale/es");

module.exports = {
	niceDate: (niceDate) => {
		return `${format(new Date(niceDate), "PPPP", {
			locale: spanishLocale,
		})}`;
	},
	niceDateShort: (niceDateShort) => {
		return `${format(new Date(niceDateShort), "MMMM d, yyyy", {
			locale: spanishLocale,
		})}`;
	},
	iso8601: (iso8601) => {
		return `${format(new Date(iso8601), "yyyy-MM-dd'T'HH:mm:ss.SSSX", {
			locale: spanishLocale,
		})}`;
	},
	datetime: (datetime) => {
		return `${format(new Date(datetime), "yyyy-MM-dd")}`;
	},
	monthES: (monthES) => {
		return `${format(new Date(monthES), "MMMM", {
			locale: spanishLocale,
		})}`;
	},
	monthShortES: (monthShortES) => {
		return `${format(new Date(monthShortES), "LLL", {
			locale: spanishLocale,
		})}`;
	},
	dayES: (dayES) => {
		return `${format(new Date(dayES), "dd", {
			locale: spanishLocale,
		})}`;
	},
	yearES: (yearES) => {
		return `${format(new Date(yearES), "y", {
			locale: spanishLocale,
		})}`;
	},
	timeES: (timeES) => {
		return `${format(new Date(timeES), "p", {
			locale: spanishLocale,
		})}`;
	},
};

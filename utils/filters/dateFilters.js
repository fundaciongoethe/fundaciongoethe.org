const { format } = require("date-fns");
const spanishLocale = require("date-fns/locale/es");
const germanLocale = require("date-fns/locale/de");

module.exports = {
	datetime: (datetime) => {
		return `${format(new Date(datetime), "yyyy-MM-dd")}`;
	},
	iso8601: (iso8601) => {
		return `${format(new Date(iso8601), "yyyy-MM-dd'T'HH:mm:ss.SSSX")}`;
	},

	// spanische filter

	niceDate_es: (niceDateES) => {
		return `${format(new Date(niceDateES), "PPPP", {
			locale: spanishLocale,
		})}`;
	},
	niceDateShort_es: (niceDateShortES) => {
		return `${format(new Date(niceDateShortES), "MMMM d, yyyy", {
			locale: spanishLocale,
		})}`;
	},
	month_es: (monthES) => {
		return `${format(new Date(monthES), "MMMM", {
			locale: spanishLocale,
		})}`;
	},
	monthShort_es: (monthShortES) => {
		return `${format(new Date(monthShortES), "LLL", {
			locale: spanishLocale,
		})}`;
	},
	day_es: (dayES) => {
		return `${format(new Date(dayES), "dd", {
			locale: spanishLocale,
		})}`;
	},
	year_es: (yearES) => {
		return `${format(new Date(yearES), "y", {
			locale: spanishLocale,
		})}`;
	},
	time_es: (timeES) => {
		return `${format(new Date(timeES), "p", {
			locale: spanishLocale,
		})}`;
	},

	// deutsche filter

	niceDate_de: (niceDateDE) => {
		return `${format(new Date(niceDateDE), "PPPP", {
			locale: germanLocale,
		})}`;
	},
	niceDateShort_de: (monthDE) => {
		return `${format(new Date(monthDE), "MMMM d, yyyy", {
			locale: germanLocale,
		})}`;
	},
	month_de: (monthDE) => {
		return `${format(new Date(monthDE), "MMMM", {
			locale: germanLocale,
		})}`;
	},
	monthShort_de: (monthShortDE) => {
		return `${format(new Date(monthShortDE), "LLL", {
			locale: germanLocale,
		})}`;
	},
	day_de: (dayDE) => {
		return `${format(new Date(dayDE), "dd", {
			locale: germanLocale,
		})}`;
	},
	year_de: (yearDE) => {
		return `${format(new Date(yearDE), "y", {
			locale: germanLocale,
		})}`;
	},
	time_de: (timeDE) => {
		return `${format(new Date(timeDE), "p", {
			locale: germanLocale,
		})}`;
	},
};

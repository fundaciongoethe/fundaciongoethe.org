module.exports = {
	siteURL: process.env.URL || "http://localhost:8080",
	siteName: "Alberto Ballesteros",
	siteType: "Person", // schema
	siteDescription:
		"Soy Alberto Ballesteros, un escritor e intérprete de canciones en castellano. Estamos grabando un nuevo álbum.",
	siteImage: "/assets/images/default.png",
	lang: "es",
	locale: "es_ES",
	authorName: "Alberto Ballesteros",
	authorURL: "https://www.albertoballesteros.com",
	authorEmail: "alberto@albertoballesteros.com",
	twitterSite: "@alberto_ballest",
	twitterCreator: "@lenesaile",
	address: {
		firma: "Alberto Ballesteros",
		street: "c/ Humilladero 25, 2C",
		city: "Madrid",
		state: "Madrid",
		zip: "28005",
		phoneDisplay: "608 208 674",
		phoneCall: " +34608208674",
		email: "alberto@albertoballesteros.com",
	},
	isProduction: process.env.ELEVENTY_ENV === "production",
};

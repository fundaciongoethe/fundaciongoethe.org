module.exports = {
	siteURL: process.env.URL || "http://localhost:8080",
	siteName: "Fundación Goethe",
	siteType: "Organization", // schema
	siteImage: "/assets/images/default.png",
	authorName: "Fundación Goethe",
	authorURL: "https://www.fundaciongoethe.org",
	authorEmail: "info@fundaciongoethe.org",
	twitterSite: "@fundaciongoethe",
	twitterCreator: "@lenesaile",
	address: {
		firma: "Fundación Goethe",
		street: "Calle de Almagro, 9 ",
		city: "Madrid",
		state: "Madrid",
		zip: "28010",
		phoneDisplay: "670 588 264",
		phoneCall: " +34670588264",
		email: "info@fundaciongoethe.org",
	},
	defaultLang: "es",
	languages: [
		{
			label: "ES",
			code: "es",
			localeCode: "es_ES",
		},
		{
			label: "DE",
			code: "de",
			localeCode: "de_DE",
		},
	],
	es: {
		metaTitle: "Fundación Goethe España",
		metaDescription:
			"La Fundación Goethe reúne empresas y empresarios con el fin de promover las relaciones hispano-alemanes a nivel cultural, social, empresarial, económico.",
		back: "Atrás",
		skipText: "Saltar al contenido principal",
		menuButton: "Menú",
		menuText: "Abrir menú principal",
		menuClose: "cerrar",
		invitations: "Recibe invitaciones",
	},
	de: {
		metaTitle: "Fundación Goethe Spanien",
		metaDescription:
			"Wir fördern die spanisch-deutschen Beziehungen kulturell, sozial, gesellschaftlich, unternehmerisch und wirtschaftlich.",
		back: "Zurück",
		skipText: "Zum Hauptinhalt springen",
		menuButton: "Menü",
		menuText: "Hauptmenü öffnen",
		menuClose: "Menü",
		invitations: "Einladungen erhalten",
	},

	isProduction: process.env.ELEVENTY_ENV === "production",
};

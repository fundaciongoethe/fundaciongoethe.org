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
		phoneDisplay: "+34 910 291 992",
		phoneCall: " +34910291992",
		mobileDisplay: "+34 670 588 264",
		mobileCall: " +34670588264",
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
		readingText: "seguir leyendo",
		sponsorSince: "Patrocinador de la Fundación Goethe desde",
		sponsorCoop: "Colaobración especial",
		sponsorCoopContent:
			"Todos nuestros patrocinadores apoyan los eventos de la Fundación Goethe con una aportación anual. Además, existe la posibilidad de colaborar con eventos individuales por separado mediante contribuciones de patrocinio u otros servicios, por ejemplo de carácter logístico o culinario.",
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
		readingText: "weiterlesen",
		sponsorSince: "Förderer der Fundación Goethe seit",
		sponsorCoop: "Besondere Kooperation",
		sponsorCoopContent:
			"Alle unsere Förderer unterstützen die Veranstaltungen der Fundación Goethe mit einem jährlichen Beitrag. Darüber hinaus besteht die Möglichkeit, einzelne Events separat mit Sponsoringbeiträgen oder anderen Leistungen, z.B. logistischen oder kulinarischen Services, zu unterstützen.",
	},

	isProduction: process.env.ELEVENTY_ENV === "production",
};

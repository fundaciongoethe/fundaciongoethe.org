const { isAfter, isBefore, format } = require("date-fns");
// moment cause i cant get it to work with fns repecting DRY
const moment = require("moment");
const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");

// filters
const eleventaFilters = require("./utils/filters/eleventaFilters.js");
const dateFilters = require("./utils/filters/dateFilters.js");

// shortcodes
const youtube = require("./utils/shortcodes/youtube-lite.js");
const audiofile = require("./utils/shortcodes/audio.js");
const svg = require("./utils/shortcodes/svg.js");

// paired shortcodes
const markdownShortcodes = require("./utils/paired-shortcodes/markdown-shortcodes.js");
const pairedAudio = require("./utils/paired-shortcodes/markdown-shortcodes.js");

// ejemplo:   {% audiofile '/assets/podcast/01-derechos.mp3', 'Episodio 1' %}

// async shortcodes
const svgsprite = require("./utils/async-shortcodes/svgsprite");

// transforms
const htmlmin = require("./utils/transforms/htmlmin.js");

// plugins
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");
const embedEverything = require("eleventy-plugin-embed-everything");

// event validation
const isValidTitle = (title = "") => title.trim().length > 2;
const isValidEvent = (event) => isValidTitle(event.data.title);

// config starts
module.exports = function (eleventyConfig) {
	// Filters

	Object.keys(eleventaFilters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, eleventaFilters[filterName]);
	});

	Object.keys(dateFilters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, dateFilters[filterName]);
	});

	// date filter (localized)
	eleventyConfig.addNunjucksFilter("date", function (date, format, locale) {
		locale = locale ? locale : "es";
		moment.locale(locale);
		return moment(date).format(format);
	});

	// Return a randomly picked item from a given array. From 11ty.rocks
	eleventyConfig.addFilter("randomItem", (arr) => {
		arr.sort(() => {
			return 0.5 - Math.random();
		});
		return arr.slice(0, 1);
	});

	// Shortcodes

	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`); // current year, stephanie eckles
	eleventyConfig.addShortcode("youtube", youtube);
	eleventyConfig.addShortcode("audiofile", audiofile);

	Object.keys(svg).forEach((shortcodeName) => {
		eleventyConfig.addShortcode(shortcodeName, svg[shortcodeName]);
	});

	// Paired Shortcodes

	eleventyConfig.addPairedShortcode("pairedAudio", pairedAudio);

	eleventyConfig.addPairedShortcode(
		"pairedaudio",
		function (pairedaudiofile, pairedaudioname) {
			return `<div class="audio-player" data-song="${pairedaudiofile}"><div class="timeline"><div class="progress"></div></div><div class="controls"><div class="play-container"><div class="toggle-play play"></div></div><div class="time"><div class="current">0:00</div><div class="divider">/</div><div class="length"></div></div><div class="name">${pairedaudioname}</div><div class="volume-container"><div class="volume-button"><div class="volume icono-volumeMedium"></div></div><div class="volume-slider"><div class="volume-percentage"></div></div></div></div></div>`;
		}
	);

	Object.keys(markdownShortcodes).forEach((shortcodeName) => {
		// markdown shortcodes collection
		eleventyConfig.addPairedShortcode(
			shortcodeName,
			markdownShortcodes[shortcodeName]
		);
	});

	// Async shortcodes

	eleventyConfig.addNunjucksAsyncShortcode("svgsprite", svgsprite);

	// Transforms

	Object.keys(htmlmin).forEach((transformName) => {
		eleventyConfig.addTransform(transformName, htmlmin[transformName]);
	});

	// Plugins

	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(embedEverything);

	// eleventy img
	eleventyConfig.addNunjucksAsyncShortcode(
		"Picture",
		async (src, cls, alt, sizes = "100vw") => {
			if (!alt) {
				throw new Error(`Missing \`alt\` on myImage from: ${src}`);
			}

			let metadata = await Image(src, {
				widths: [580, 770, 1200],
				formats: ["avif", "webp", "jpeg"],
				urlPath: "/assets/images/",
				outputDir: "./dist/assets/images/",
			});

			let lowsrc = metadata.jpeg[0];

			return `<picture>
        ${Object.values(metadata)
					.map((imageFormat) => {
						return `  <source type="${
							imageFormat[0].sourceType
						}" srcset="${imageFormat
							.map((entry) => entry.srcset)
							.join(", ")}" sizes="${sizes}">`;
					})
					.join("\n")}
          <img
            src="${lowsrc.url}"
						class="${cls}",
            width="${lowsrc.width}"
            height="${lowsrc.height}"
            alt="${alt}"
            loading="lazy"
            decoding="async">
        </picture>`;
		}
	);

	eleventyConfig.addNunjucksAsyncShortcode(
		"Image",
		async function imageShortcode(src, cls, alt) {
			if (alt === undefined) {
				// You bet we throw an error on missing alt (alt="" works okay)
				throw new Error(`Missing \`alt\` on myImage from: ${src}`);
			}

			let metadata = await Image(src, {
				widths: [600],
				formats: ["jpeg"],
				urlPath: "/assets/images/",
				outputDir: "./dist/assets/images/",
			});

			let data = metadata.jpeg[metadata.jpeg.length - 1];
			return `<img src="${data.url}" class="${cls}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
		}
	);

	// Collections

	// blog es
	eleventyConfig.addCollection("posts_es", function (collection) {
		return collection.getFilteredByGlob("./src/es/noticias/*.md");
	});

	// blog de
	eleventyConfig.addCollection("posts_de", function (collection) {
		return collection.getFilteredByGlob("./src/de/aktuelles/*.md");
	});

	// artists es, alphabetically sorted by title
	// eleventyConfig.addCollection("artists_es", function (collection) {
	// 	collection.getFilteredByGlob("./src/es/artistas/*.md").sort((a, b) => {
	// 		if (a.data.title > b.data.title) return -1;
	// 		else if (a.data.title < b.data.title) return 1;
	// 		else return 0;
	// 	});
	// });

	// Returns a list of people ordered by filename
	// eleventyConfig.addCollection("people", (collection) => {
	// 	return collection.getFilteredByGlob("./src/de/people/*.md").sort((a, b) => {
	// 		return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
	// 	});
	// });

	// artists es
	eleventyConfig.addCollection("artists_es", function (collection) {
		return collection.getFilteredByGlob("./src/es/artistas/*.md");
	});

	// artists de
	eleventyConfig.addCollection("artists_de", function (collection) {
		return collection.getFilteredByGlob("./src/de/kuenstler/*.md");
	});

	// venues es
	eleventyConfig.addCollection("venues_es", function (collection) {
		return collection.getFilteredByGlob("./src/es/lugares/*.md");
	});

	// venues de
	eleventyConfig.addCollection("venues_de", function (collection) {
		return collection.getFilteredByGlob("./src/de/orte/*.md");
	});

	// förderer es, randomized on build
	eleventyConfig.addCollection("sponsors_es", function (collection) {
		return (
			collection
				// Change to the name of your tag
				.getFilteredByGlob("./src/es/patrocinadores/*.md")
				.sort(() => {
					return 0.5 - Math.random();
				})
		);
	});

	// förderer de, randomized on build
	eleventyConfig.addCollection("sponsors_de", function (collection) {
		return (
			collection
				// Change to the name of your tag
				.getFilteredByGlob("./src/de/foerderer/*.md")
				.sort(() => {
					return 0.5 - Math.random();
				})
		);
	});

	// events es
	eleventyConfig.addCollection("events_es", (collectionApi) => {
		return collectionApi.getFilteredByGlob("./src/es/eventos/*.md");
	});
	eleventyConfig.addCollection("eventosPasados", (collectionApi) => {
		return collectionApi
			.getFilteredByGlob("./src/es/eventos/*.md")
			.filter(
				(event) =>
					isValidEvent(event) && isBefore(new Date(event.data.date), new Date())
			);
	});
	eleventyConfig.addCollection("eventosFuturos", (collectionApi) => {
		return collectionApi
			.getFilteredByGlob("./src/es/eventos/*.md")
			.filter(
				(event) =>
					isValidEvent(event) && isAfter(new Date(event.data.date), new Date())
			);
	});

	// events de
	eleventyConfig.addCollection("events_de", (collectionApi) => {
		return collectionApi.getFilteredByGlob("./src/de/events/*.md");
	});
	eleventyConfig.addCollection("eventsVergangenheit", (collectionApi) => {
		return collectionApi
			.getFilteredByGlob("./src/de/events/*.md")
			.filter(
				(event) =>
					isValidEvent(event) && isBefore(new Date(event.data.date), new Date())
			);
	});
	eleventyConfig.addCollection("eventsZukunft", (collectionApi) => {
		return collectionApi
			.getFilteredByGlob("./src/de/events/*.md")
			.filter(
				(event) =>
					isValidEvent(event) && isAfter(new Date(event.data.date), new Date())
			);
	});

	// Custom Watch Targets

	eleventyConfig.addWatchTarget("./src/assets");
	eleventyConfig.addWatchTarget("./utils/*.js");
	eleventyConfig.addWatchTarget("./tailwind.config.js");

	// Passthrough File Copy

	eleventyConfig.addPassthroughCopy("src/assets/fonts/");
	eleventyConfig.addPassthroughCopy("src/assets/images/");
	eleventyConfig.addPassthroughCopy("src/assets/svg/");
	eleventyConfig.addPassthroughCopy("src/assets/pdf/");
	eleventyConfig.addPassthroughCopy("src/assets/fonts.min.css");

	// helper files zu root
	eleventyConfig.addPassthroughCopy({
		"src/assets/helperfiles/robots.txt.njk": "robots.txt",
	});
	eleventyConfig.addPassthroughCopy({
		"src/assets/helperfiles/_redirects.njk": "_redirects",
	});
	eleventyConfig.addPassthroughCopy({
		"src/assets/helperfiles/google35901daa0ceb7399.html.njk":
			"google35901daa0ceb7399.html",
	});
	eleventyConfig.addPassthroughCopy({
		"src/assets/helperfiles/sitemap.xml.njk": "sitemap.xml",
	});
	eleventyConfig.addPassthroughCopy({
		"src/assets/helperfiles/robots.txt.njk": "robots.txt",
	});

	// social icons von images zu root
	eleventyConfig.addPassthroughCopy({
		"src/assets/images/favicon/site.webmanifest": "site.webmanifest",
	});
	eleventyConfig.addPassthroughCopy({
		"src/assets/images/favicon/favicon.ico": "favicon.ico",
	});
	eleventyConfig.addPassthroughCopy({
		"src/assets/images/favicon/favicon.svg": "favicon.svg",
	});
	eleventyConfig.addPassthroughCopy({
		"src/assets/images/favicon/apple-touch-icon.png": "apple-touch-icon.png",
	});
	eleventyConfig.addPassthroughCopy({
		"src/assets/images/favicon/favicon-32x32.png": "favicon-32x32.png",
	});
	eleventyConfig.addPassthroughCopy({
		"src/assets/images/favicon/favicon-16x16.png": "favicon-16x16.png",
	});
	eleventyConfig.addPassthroughCopy({
		"src/assets/images/favicon/android-chrome-192x192.png":
			"android-chrome-192x192.png",
	});
	eleventyConfig.addPassthroughCopy({
		"src/assets/images/favicon/android-chrome-512x512.png":
			"android-chrome-512x512.png",
	});

	// Set custom markdown library instance  and support for Emojis in markdown...

	let options = {
		html: true,
		breaks: true,
		linkify: true,
		typographer: true,
	};
	let markdownLib = markdownIt(options).use(markdownItEmoji);
	eleventyConfig.setLibrary("md", markdownLib);

	// Add layout aliases

	eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
	eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
	eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
	eleventyConfig.addLayoutAlias("home", "layouts/home.njk");
	eleventyConfig.addLayoutAlias("plain", "layouts/plain.njk");
	eleventyConfig.addLayoutAlias("evento", "layouts/evento.njk");
	eleventyConfig.addLayoutAlias("artist", "layouts/artist.njk");
	eleventyConfig.addLayoutAlias("venue", "layouts/venue.njk");
	eleventyConfig.addLayoutAlias("sponsor", "layouts/sponsor.njk");
	eleventyConfig.addLayoutAlias("redirect", "layouts/redirect.njk");

	// Opts in to a full deep merge when combining the Data Cascade.
	// @link https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge

	eleventyConfig.setDataDeepMerge(true);

	// have and test a 404 during local dev

	// eleventyConfig.setBrowserSyncConfig({
	// 	notify: true,
	// 	snippetOptions: {
	// 		rule: {
	// 			match: /<\/head>/i,
	// 			fn: function (snippet, match) {
	// 				return snippet + match
	// 			},
	// 		},
	// 	},
	// Set local server 404 fallback
	// callbacks: {
	// 	ready: function (err, browserSync) {
	// 		const content_404 = fs.readFileSync('dist/404.html')

	// 		browserSync.addMiddleware('*', (req, res) => {
	// 			// Provides the 404 content without redirect.
	// 			res.write(content_404)
	// 			res.end()
	// 		})
	// 	},
	// },
	// })

	// paths and templating language

	return {
		dir: {
			input: "src",
			output: "dist",
			includes: "_includes",
			data: "_data",
		},
		passthroughFileCopy: true,
		templateFormats: ["html", "njk", "md"],
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
	};
};

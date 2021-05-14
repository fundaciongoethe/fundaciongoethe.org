const colors = require("tailwindcss/colors");

module.exports = {
	purge: [
		"./src/**/*.html",
		"./src/**/*.njk",
		"./src/**/*.md",
		"./src/**/*.js",
		"./utils/**/*.js",
		"./src/_data/colors.js",
		"./src/_data/structure.js",
	],
	experimental: {
		applyComplexClasses: true,
	},
	future: {
		removeDeprecatedGapUtilities: true,
	},
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			gray: colors.coolGray,
			blue: colors.blue,
			purple: colors.purple,
			yellow: colors.yellow,
			pink: colors.pink,
			teal: colors.teal,
		},
		fontFamily: {
			rock: ["Rockeby Condensed", "Tahoma", "sans-serif"],
			body: ["Source Sans Pro", "sans-serif"],
		},
		extend: {
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
				shake: {
					"0%": { transform: "rotateZ(-3deg)" },
					"100%": { transform: "rotateZ(3deg)" },
				},
				entrance: {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(0%)" },
				},
			},
			animation: {
				wiggle: "wiggle 1s ease-in-out infinite",
				shake: "shake 3s infinite ease alternate-reverse 2s",
				entrance: "entrance 1.6s ease-in-out 0.5s forwards",
			},

			zIndex: {
				"-10": "-10",
				"-20": "-20",
			},
			opacity: (theme) => ({
				5: ".05",
				10: ".1",
				15: ".15",
				20: ".2",
			}),
			// created my own heights so can specify for Heros
			height: (theme) => ({
				"1/2": "50vh",
				"3/4": "75vh",
				"9/10": "90vh",
				"1/1": "100vh",
				"1/3": "calc(100vh / 3)",
				"1/4": "calc(100vh / 4)",
				"1/5": "calc(100vh / 5)",
				96: "24rem",
				112: "28rem",
				128: "32rem",
			}),
		},
	},
	variants: {
		borderWidth: ["responsive", "last"],
		animation: ["responsive", "motion-safe", "motion-reduce"],
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
	],
};

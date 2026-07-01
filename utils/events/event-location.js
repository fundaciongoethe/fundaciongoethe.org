const helpers = require("../../src/_data/helpers.js");

function resolveLocation(data) {
	const locale = data.locale;
	const venueCollection = data.collections?.[`venues_${locale}`];

	if (!venueCollection || !data.venue?.length) {
		return data.location || "";
	}

	const venueItems = helpers.filterCollectionByKeys(venueCollection, data.venue);

	return helpers.resolveEventLocation({
		space: data.space,
		location: data.location,
		venueItems,
		city: data.city,
	});
}

module.exports = { resolveLocation };

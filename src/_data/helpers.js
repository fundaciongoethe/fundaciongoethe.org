module.exports = {
	/**
	 * Returns back some attributes based on whether the
	 * link is active or a parent of an active item
	 *
	 * @param {String} itemUrl The link in question
	 * @param {String} pageUrl The page context
	 * @returns {String} The attributes or empty
	 */
	getLinkActiveState(itemUrl, pageUrl) {
		let response = "";

		if (itemUrl === pageUrl) {
			response = ' aria-current="page"';
		}

		// 21-05-06 erhalte error: TypeError: pageUrl.indexOf is not a function- deshalb erstmal deaktiviert.

		// if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
		// 	response += ' data-state="active"';
		// }

		return response;
	},

	/**
	 * Take an array of keys and return back items that match.
	 * Note: items in the collection must have a key attribute in
	 * Front Matter
	 *
	 * @param {Array} collection 11ty collection
	 * @param {Array} keys collection of keys
	 * @returns {Array} result collection or empty
	 */
	filterCollectionByKeys(collection, keys) {
		return collection.filter((x) => keys.includes(x.data.translationKey));
	},

	resolveEventLocation({ space, location, venueItems, city }) {
		if (space && venueItems?.length) {
			const spaces = venueItems[0].data.spaces;
			if (spaces?.[space]) {
				const eventCity = city || venueItems[0].data.city;
				return eventCity ? `${spaces[space]}, ${eventCity}` : spaces[space];
			}
		}
		return location || "";
	},

	resolveEventSpaceLabel({ space, venueItems }) {
		if (space && venueItems?.length) {
			return venueItems[0].data.spaces?.[space] || "";
		}
		return "";
	},
};

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
};

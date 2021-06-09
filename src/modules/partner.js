module.exports.getLogoUrl = function (user) {
	if (!user) {
		return "/assets/images/logo-fallback.jpg";
	}

	if (user?.logo) {
		return `/assets/images/${user.logo}`;
	}

	return "/assets/images/logo-fallback.jpg";
};

module.exports.getLogoUrl = function (user) {
	if (!user) {
		return "/assets/images/logo-fallback.jpg";
	}

	if (user.avatar_url) {
		return user?.avatar_url;
	}

	if (user?.logo) {
		return `/assets/images/${user.logo}`;
	}

	return "/assets/images/logo-fallback.jpg";
};

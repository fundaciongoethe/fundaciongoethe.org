/** Resolve home hero image from meta.heroImage (shared DE/ES). */
module.exports = function heroImageUrl(data) {
  const hero = data.meta.heroImage || {};
  const images = hero.images || {};
  const season = hero.season || 'default';
  if (season === 'special') {
    return hero.specialImage || images.default;
  }
  return images[season] || images.default;
};

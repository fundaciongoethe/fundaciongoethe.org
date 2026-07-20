/**
 * Paths that get HTML minification in production.
 * Only high-traffic listing / entry pages — full-site minify dominated Netlify builds.
 */
const MINIFY_PATH_SUFFIXES = [
  // Home
  '/de/index.html',
  '/es/index.html',
  // About
  '/de/ueber-uns/index.html',
  '/es/sobre-nosotros/index.html',
  // Events archive
  '/de/events/index.html',
  '/es/eventos/index.html',
  // Venues
  '/de/orte/index.html',
  '/es/lugares/index.html',
  // Artists
  '/de/kuenstler/index.html',
  '/es/artistas/index.html',
  // News archive
  '/de/aktuelles/index.html',
  '/es/noticias/index.html',
  // Contact
  '/de/kontakt/index.html',
  '/es/contacto/index.html',
  // Invitations signup
  '/de/einladungen/index.html',
  '/es/invitaciones/index.html',
];

function shouldMinify(outputPath) {
  if (!outputPath) return false;
  const normalized = outputPath.replace(/\\/g, '/');
  return MINIFY_PATH_SUFFIXES.some((suffix) => normalized.endsWith(suffix));
}

module.exports = {
  MINIFY_PATH_SUFFIXES,
  shouldMinify,
};

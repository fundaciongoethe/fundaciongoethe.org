// by Chris Burnell: https://chrisburnell.com/article/some-eleventy-filters/#markdown-format

const markdownParser = require('markdown-it');

const markdown = markdownParser();

const accessVariants = require('../../src/_data/accessVariants.js');

function resolveAccessData(data, locale) {
  if (!data) return { access: undefined, infobox: undefined };

  const lang = locale && accessVariants[locale] ? locale : 'es';
  const key = data.accessVariant;
  const variant = key && accessVariants[lang] ? accessVariants[lang][key] : undefined;

  const access =
    data.access !== undefined && data.access !== null && data.access !== ''
      ? data.access
      : variant && variant.access
        ? variant.access
        : data.access;

  const infobox =
    data.infobox !== undefined && data.infobox !== null && data.infobox !== ''
      ? data.infobox
      : variant && variant.infobox
        ? variant.infobox
        : data.infobox;

  return { access, infobox };
}

module.exports = {
  markdownFormat: (string) => {
    return markdown.render(string);
  },
  accessFromVariant: (data, locale) => {
    const resolved = resolveAccessData(data, locale);
    return resolved.access;
  },
  infoboxFromVariant: (data, locale) => {
    const resolved = resolveAccessData(data, locale);
    return resolved.infobox;
  },
};

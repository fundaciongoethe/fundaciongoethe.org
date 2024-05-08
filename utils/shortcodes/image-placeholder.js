const Image = require('@11ty/eleventy-img');
const path = require('path');
const htmlmin = require('hhtml-minifier-terser');

// eleventy img placeholder
// example usage:
// {% imagePh heroimg.url, "aspect-square w-full h-auto object-cover rounded-md border", "alt text", "caption text" %}
// {% imagePh "./src/assets/images/111-katze.jpg", "h-44 rounded-tr-xl md:rounded-tr-none md:h-full w-full object-cover md:rounded-b-lg", "Concierto de una gran orquesta", "caption text" %}

const imageShortcodePlaceholder = async (src, cls, alt, caption, loading = 'lazy', sizes = '100vw') => {
  if (!alt) {
    throw new Error(`Missing \`alt\` on myImagePlaceholder from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [170, 420, 770, 1200],
    formats: ['avif', 'webp', 'jpeg'],
    urlPath: '/assets/images/',
    outputDir: './dist/assets/images/',
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);

      return `${name}-${width}w.${format}`;
    },
  });

  let lowsrc = metadata.jpeg[0];

  let imgSrc = src;
  if (!imgSrc.startsWith('.')) {
    const inputPath = this.page.inputPath;
    const pathParts = inputPath.split('/');
    pathParts.pop();
    imgSrc = pathParts.join('/') + '/' + src;
  }

  return htmlmin.minify(
    `<figure class="-mx-6 lg:-mx-24 my-8 md:my-16 lg:my-24">
      <div class="relative" style="background-color: rgba(${color},1);"><picture>
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(', ')}" sizes="${sizes}">`;
      })
      .join('\n')}
      <img
        src="/assets/images/image-placeholder.png"
        data-src="${lowsrc.url}"
        class="${cls} lazy"
        width="${lowsrc.width}"
        height="${lowsrc.height}"
        alt="${alt}"
        decoding="async">
    </picture></div>
    ${caption ? `<figcaption class="py-2 px-6 text-xs text-black">${caption}</figcaption>` : ``}
</figure>`,
    { collapseWhitespace: true }
  );
};

module.exports = imageShortcodePlaceholder;

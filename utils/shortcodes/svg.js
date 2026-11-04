const svgColorDefault = 'text-black';

module.exports = {
  /**
   * ===== SVGs =====
   * This shortcode is used in layouts and can be used in .md content.
   *
   * Set the default color above in the "svgColorDefault" variable.
   *
   * The SVGs MUST exist in the /src/assets/svg/ directory and must me named
   * according to the existing examples.
   *
   * Attributes:
   *    name ; required, must be same as SVG file name in /src/assets/svg/ (without ".svg")
   *    classes : optional but required if you want to control size, color, etc.
   *    hidden : if string exactly matches 'hidden', decorative (aria-hidden, no title)
   *    title: title/desc for svg, a11y (ignored when hidden)
   *    id : if various elements refer to same svg, set unique id (ignored when hidden)
   *
   * Examples:
   *  {% svg "heart", "w-5 h-5 mx-1", visible, "love" %}
   *  {% svg "instagram", "w-5 h-5", hidden %}
   */

  svg: function (name, classes, hidden, title, id) {
    const nameAttr = name ? name : 'piedpiper';
    const classesAttr = classes ? `${classes} fill-current` : `${svgColorDefault} fill-current`;
    const isDecorative = hidden === 'hidden';

    // Decorative: no title / labelledby / role — parent or aria-hidden is enough
    if (isDecorative) {
      return `<svg aria-hidden="true" focusable="false" class="${classesAttr}">
            <use xlink:href="#symbol-${nameAttr}"></use>
            </svg>`;
    }

    const titleAttr = title ? title : `missing title`;
    const uniqueID = id ? id : `id`;
    return `<svg class="${classesAttr}" aria-labelledby="title-${nameAttr}-${uniqueID}" role="img">
            <title id="title-${nameAttr}-${uniqueID}">${titleAttr}</title>
            <use xlink:href="#symbol-${nameAttr}"></use>
            </svg>`;
  },
};

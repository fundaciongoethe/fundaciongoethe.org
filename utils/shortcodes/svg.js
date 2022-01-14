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
   *    hidden : if string exactly matches 'hidden', aria-hiddeen activated, a11y
   *    title: title/desc for svg, a11y
   *    location : optional when used in .md content files
   *
   * Usage by Editors in .md content files:
   *  {% svg "name", "any TailwindCSS classes" %}
   *
   * Examples:
   *  {% svg "heart", "w-5 h-5 mx-1", visible, "love" %}
   *  {% svg "instagram", "w-5 h-5", hidden %}
   */

  svg: function (name, classes, hidden, title, location) {
    const nameAttr = name ? name : 'piedpiper';
    const classesAttr = classes ? `${classes} fill-current` : `${svgColorDefault} fill-current`;
    const ariaHidden = hidden === 'hidden' ? `aria-hidden="true" focusable="false"` : ``;
    const titleAttr = title ? title : `missing title`;
    const locationAttr = location ? location : 'content';
    return `<svg ${ariaHidden} class="${classesAttr}" aria-labelledby="title-${nameAttr}" role="img">

  <title id="title-${nameAttr}">${titleAttr}</title>
                  <use xlink:href="#symbol-${nameAttr}"></use>
              </svg>`;
  },
};

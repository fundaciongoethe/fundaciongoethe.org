const { base64Format } = require('./base64-format.js');

// Per-circle black-ring offsets (varied, Figma-style)
const RING_OFFSETS = [
  { ox: 6, oy: 4 },
  { ox: -5, oy: 7 },
  { ox: 8, oy: -4 },
  { ox: -6, oy: -5 },
  { ox: 4, oy: 8 },
  { ox: -7, oy: 3 },
];

function withOffsets(spots) {
  return spots.map((p, i) => ({ ...p, ...RING_OFFSETS[i % RING_OFFSETS.length] }));
}

/**
 * Large circles, light overlap, pushed down/left so edge circles clip the viewport.
 * Photo clip cuts at the left (x=0) and bottom (y=630).
 */
function positionsFor(count) {
  if (count <= 0) return [];
  if (count === 1) {
    return withOffsets([{ cx: 220, cy: 520, r: 180 }]);
  }
  if (count === 2) {
    return withOffsets([
      { cx: 140, cy: 540, r: 150 },
      { cx: 360, cy: 400, r: 150 },
    ]);
  }
  if (count === 3) {
    return withOffsets([
      { cx: 120, cy: 550, r: 135 },
      { cx: 360, cy: 470, r: 135 },
      { cx: 200, cy: 320, r: 135 },
    ]);
  }
  if (count === 4) {
    return withOffsets([
      { cx: 110, cy: 360, r: 125 },
      { cx: 360, cy: 340, r: 125 },
      { cx: 130, cy: 560, r: 125 },
      { cx: 380, cy: 540, r: 125 },
    ]);
  }
  if (count === 5) {
    return withOffsets([
      { cx: 100, cy: 340, r: 115 },
      { cx: 310, cy: 310, r: 115 },
      { cx: 510, cy: 350, r: 115 },
      { cx: 150, cy: 540, r: 115 },
      { cx: 380, cy: 560, r: 115 },
    ]);
  }
  // 6: two rows — left/bottom clip the viewport
  return withOffsets([
    { cx: 90, cy: 340, r: 108 },
    { cx: 290, cy: 310, r: 108 },
    { cx: 490, cy: 340, r: 108 },
    { cx: 110, cy: 550, r: 108 },
    { cx: 310, cy: 570, r: 108 },
    { cx: 510, cy: 540, r: 108 },
  ]);
}

/**
 * Artist portraits as circular overlays for OG SVGs.
 * Sync on purpose: async filters + {% set %} can drop items in Nunjucks.
 */
function ogArtistCircles(artistItems, bgPath) {
  const withPhotos = (artistItems || [])
    .filter((a) => a?.data?.images?.featured && a.data.images.featured !== bgPath)
    .slice(0, 6);

  const spots = positionsFor(withPhotos.length);
  const circles = [];

  for (let i = 0; i < withPhotos.length; i++) {
    const href = base64Format(withPhotos[i].data.images.featured);
    if (!href) continue;
    circles.push({ ...spots[i], href });
  }

  return circles;
}

module.exports = { ogArtistCircles };

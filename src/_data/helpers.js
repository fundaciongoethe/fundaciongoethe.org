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
    const item = String(itemUrl || '');
    const page = String(pageUrl || '');

    if (item && item === page) {
      return ' aria-current="page"';
    }

    // Section ancestor: visual only (CSS [data-state=active]), not aria-current
    if (item.length > 1 && page.startsWith(item)) {
      return ' data-state="active"';
    }

    return '';
  },

  /**
   * Deterministic festive-star class variants (Tailwind scans this file).
   * @param {string} seed unique per instance (e.g. festiveStarsIdPrefix)
   * @param {boolean} compact archive size
   */
  festiveStarsClasses(seed = 'festive', compact = false) {
    const hash = (s) => {
      let h = 2166136261;
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return h >>> 0;
    };
    const pick = (salt, arr) => arr[hash(String(seed) + salt) % arr.length];

    const colors = [
      'text-yellow-500',
      'text-yellow-500',
      'text-yellow-500',
      'text-yellow-500',
      'text-yellow-600',
      'text-orange-500',
      'text-red-600',
    ];
    const rotates = ['rotate-3', 'rotate-6', 'rotate-12', '-rotate-3', '-rotate-6', '-rotate-12'];
    const translates = [
      '',
      'translate-y-1',
      'translate-y-2',
      '-translate-y-2',
      '-translate-y-1',
      '-translate-x-1',
      'translate-x-1',
    ];
    const opacities = ['', 'opacity-90'];

    const star = (salt, size) =>
      [
        size,
        pick(salt + 'c', colors),
        pick(salt + 'o', opacities),
        pick(salt + 'r', rotates),
        pick(salt + 't', translates),
      ]
        .filter(Boolean)
        .join(' ');

    if (compact) {
      return {
        wrap: [
          pick('w', ['-rotate-12', '-rotate-6', 'rotate-6', 'rotate-12']),
          pick('wt', ['-translate-x-2', '-translate-x-4', '-translate-x-6', '']),
        ]
          .filter(Boolean)
          .join(' '),
        a: star('a', 'h-5 w-5'),
        b: star('b', 'h-6 w-6'),
        c: star('c', 'h-3 w-3'),
      };
    }

    return {
      wrap: pick('w', ['rotate-12', 'rotate-6', '-rotate-6', '-rotate-12', 'rotate-3']),
      a: star('a', 'h-5 w-5'),
      b: star('b', 'h-10 w-10'),
      c: star('c', 'h-4 w-4'),
    };
  },

  /**
   * Take an array of keys and return back items that match.
   * Note: items in the collection must have a key attribute in
   * Front Matter
   *
   * @param {Array} collection 11ty collection
   * @param {Array} keys collection of keys
   * @returns {Array} result collection or empty
   */
  filterCollectionByKeys(collection, keys) {
    if (!collection || !keys) return [];
    return collection.filter((x) => keys.includes(x.data.translationKey));
  },

  resolveEventLocation({ space, location, venueItems, city }) {
    const venueData = venueItems?.[0]?.data;
    const eventCity = city || venueData?.city;
    if (space && venueData?.spaces?.[space]) {
      return eventCity ? `${venueData.spaces[space]}, ${eventCity}` : venueData.spaces[space];
    }
    if (location) {
      return location;
    }
    if (venueData?.address) {
      return eventCity ? `${venueData.address}, ${eventCity}` : venueData.address;
    }
    return '';
  },

  resolveEventSpaceLabel({ space, venueItems }) {
    const spaces = venueItems?.[0]?.data?.spaces;
    if (space && spaces?.[space]) {
      return spaces[space];
    }
    return '';
  },
};

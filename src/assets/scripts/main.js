// alpine import and initialization
import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.data('sortableList', (defaultSort, datasetAttr) => ({
  activeSort: defaultSort || 'random',

  sortBy(type) {
    this.activeSort = type;

    let items = [...document.querySelectorAll(`[data-${datasetAttr}]`)];

    if (type === 'random') {
      items.sort(() => Math.random() - 0.5);
    } else {
      items.sort((a, b) => {
        let aValue = a.getAttribute(`data-${type}`)?.trim().toLowerCase() || '';
        let bValue = b.getAttribute(`data-${type}`)?.trim().toLowerCase() || '';

        return aValue.localeCompare(bValue, 'es', { sensitivity: 'base', ignorePunctuation: true });
      });
    }

    let container = document.querySelector(`ul[role="list"]`);
    container.innerHTML = '';
    items.forEach((item) => container.appendChild(item));
  },
}));

Alpine.start();

(function () {
  'use strict';

  // intersection observer image lazy load

  const images = document.querySelectorAll('img.lazy');

  let options = {
    root: null, // Page as root
    // rootMargin: (top, right bottom, left)
    rootMargin: '1px 1px 1px 1px',
    threshold: 0,
  };

  let fetchImage = function (url) {
    return new Promise(function (resolve, reject) {
      let image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  };
  let loadImage = function (image) {
    let src = image.dataset.src;
    fetchImage(src).then(function () {
      image.classList.add('fade-in');
      image.src = src;
    });
  };
  let handleIntersection = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > 0) {
        loadImage(entry.target);
      }
    });
  };
  // The observer for the images on the page
  let observer = new IntersectionObserver(handleIntersection, options);

  images.forEach(function (img) {
    if ('IntersectionObserver' in window) {
      // LazyLoad images using IntersectionObserver
      observer.observe(img);
    } else {
      // Load all images at once
      loadImage(img);
    }
  });
})();

// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    try {
      navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.error('Service worker registration failed: ', error);
    }
  });
}

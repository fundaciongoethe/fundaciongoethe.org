// alpine import and initialization
import Alpine from 'alpinejs';
window.Alpine = Alpine;
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

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

/* https://embed.im/snow */
var embedimSnow = document.getElementById('embedim--snow');
if (!embedimSnow) {
  function embRand(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }
  var embCSS =
    '.embedim-snow{position: absolute;width: 10px;height: 10px;background: white;border-radius: 50%;margin-top:-10px}';
  var embHTML = '';
  for (i = 1; i < 200; i++) {
    embHTML += '<i class="embedim-snow"></i>';
    var rndX = embRand(0, 1000000) * 0.0001,
      rndO = embRand(-100000, 100000) * 0.0001,
      rndT = (embRand(3, 8) * 10).toFixed(2),
      rndS = (embRand(0, 10000) * 0.0001).toFixed(2);
    embCSS +=
      '.embedim-snow:nth-child(' +
      i +
      '){' +
      'opacity:' +
      (embRand(1, 10000) * 0.0001).toFixed(2) +
      ';' +
      'transform:translate(' +
      rndX.toFixed(2) +
      'vw,-10px) scale(' +
      rndS +
      ');' +
      'animation:fall-' +
      i +
      ' ' +
      embRand(10, 30) +
      's -' +
      embRand(0, 30) +
      's linear infinite' +
      '}' +
      '@keyframes fall-' +
      i +
      '{' +
      rndT +
      '%{' +
      'transform:translate(' +
      (rndX + rndO).toFixed(2) +
      'vw,' +
      rndT +
      'vh) scale(' +
      rndS +
      ')' +
      '}' +
      'to{' +
      'transform:translate(' +
      (rndX + rndO / 2).toFixed(2) +
      'vw, 105vh) scale(' +
      rndS +
      ')' +
      '}' +
      '}';
  }
  embedimSnow = document.createElement('div');
  embedimSnow.id = 'embedim--snow';
  embedimSnow.innerHTML =
    '<style>#embedim--snow{position:fixed;left:0;top:0;bottom:0;width:100vw;height:100vh;overflow:hidden;z-index:9999999;pointer-events:none}' +
    embCSS +
    '</style>' +
    embHTML;
  document.body.appendChild(embedimSnow);
}

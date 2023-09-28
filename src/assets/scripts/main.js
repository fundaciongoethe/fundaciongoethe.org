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

//  ---------------------------- simple audio player
document.querySelectorAll('.audio-player').forEach(createAudioPlayer);

function createAudioPlayer(audioPlayer) {
  const url = audioPlayer.dataset.song;
  const audio = new Audio(url);
  console.log({ audio, audioPlayer, url });

  audio.addEventListener(
    'loadeddata',
    () => {
      audioPlayer.querySelector('.time .length').textContent = getTimeCodeFromNum(audio.duration);
      audio.volume = 0.75;
    },
    false
  );

  //click on timeline to skip around
  const timeline = audioPlayer.querySelector('.timeline');
  timeline.addEventListener(
    'click',
    (e) => {
      const timelineWidth = window.getComputedStyle(timeline).width;
      const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
      audio.currentTime = timeToSeek;
    },
    false
  );

  //check audio percentage and update time accordingly
  setInterval(() => {
    const progressBar = audioPlayer.querySelector('.progress');
    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
    audioPlayer.querySelector('.time .current').textContent = getTimeCodeFromNum(audio.currentTime);
  }, 500);

  //toggle between playing and pausing on button click
  const playBtn = audioPlayer.querySelector('.controls .toggle-play');
  playBtn.addEventListener(
    'click',
    () => {
      if (audio.paused) {
        playBtn.setAttribute('aria-label', 'Pause');
        playBtn.classList.remove('play');
        playBtn.classList.add('pause');
        audio.play();
      } else {
        playBtn.setAttribute('aria-label', 'Play');
        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
        audio.pause();
      }
    },
    false
  );

  //turn 128 seconds into 2:08
  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  }
}

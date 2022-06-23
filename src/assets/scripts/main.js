// alpine import and initialization
import Alpine from 'alpinejs';
window.Alpine = Alpine;
Alpine.start();

// lite-youtube-embed import
import 'lite-youtube-embed';

(function () {
  'use strict';

  // check if proteccion de datos is active

  const checkBox = document.getElementById('mce-group[14393]-14393-0');
  const acceptButton = document.getElementById('mcsend');
  const validate = () => {
    if (checkBox.checked) {
      acceptButton.disabled = false;
      acceptButton.setAttribute('aria-disabled', 'false');
    } else {
      acceptButton.disabled = true;
      acceptButton.setAttribute('aria-disabled', 'true');
    }
  };
  checkBox.addEventListener('click', validate);

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

//  ---------------------------- simple audio player
// document.querySelectorAll('.audio-player').forEach(createAudioPlayer);

// function createAudioPlayer(audioPlayer) {
//   const url = audioPlayer.dataset.song;
//   const audio = new Audio(url);
//   console.log({ audio, audioPlayer, url });

//   audio.addEventListener(
//     'loadeddata',
//     () => {
//       audioPlayer.querySelector('.time .length').textContent = getTimeCodeFromNum(audio.duration);
//       audio.volume = 0.75;
//     },
//     false
//   );

//   const timeline = audioPlayer.querySelector('.timeline');
//   timeline.addEventListener(
//     'click',
//     (e) => {
//       const timelineWidth = window.getComputedStyle(timeline).width;
//       const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
//       audio.currentTime = timeToSeek;
//     },
//     false
//   );

//   const volumeSlider = audioPlayer.querySelector('.controls .volume-slider');
//   volumeSlider.addEventListener(
//     'click',
//     (e) => {
//       const sliderWidth = window.getComputedStyle(volumeSlider).width;
//       const newVolume = e.offsetX / parseInt(sliderWidth);
//       audio.volume = newVolume;
//       audioPlayer.querySelector('.controls .volume-percentage').style.width = newVolume * 100 + '%';
//     },
//     false
//   );

//   setInterval(() => {
//     const progressBar = audioPlayer.querySelector('.progress');
//     progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
//     audioPlayer.querySelector('.time .current').textContent = getTimeCodeFromNum(audio.currentTime);
//   }, 500);

//   const playBtn = audioPlayer.querySelector('.controls .toggle-play');
//   playBtn.addEventListener(
//     'click',
//     () => {
//       if (audio.paused) {
//         playBtn.classList.remove('play');
//         playBtn.classList.add('pause');
//         audio.play();
//       } else {
//         playBtn.classList.remove('pause');
//         playBtn.classList.add('play');
//         audio.pause();
//       }
//     },
//     false
//   );

//   audioPlayer.querySelector('.volume-button').addEventListener('click', () => {
//     const volumeEl = audioPlayer.querySelector('.volume-container .volume');
//     audio.muted = !audio.muted;
//     if (audio.muted) {
//       volumeEl.classList.remove('icono-volumeMedium');
//       volumeEl.classList.add('icono-volumeMute');
//     } else {
//       volumeEl.classList.add('icono-volumeMedium');
//       volumeEl.classList.remove('icono-volumeMute');
//     }
//   });

//   function getTimeCodeFromNum(num) {
//     let seconds = parseInt(num);
//     let minutes = parseInt(seconds / 60);
//     seconds -= minutes * 60;
//     const hours = parseInt(minutes / 60);
//     minutes -= hours * 60;

//     if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
//     return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
//   }
// }

//  ---------------------------- deregister old sw

if (window.navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

// validator.js import

import validator from 'validator';

//  ----------------------------

window.onload = function (event) {
  // form validation

  function inputValidator(id, value) {
    // check email validity
    if (id === 'email') {
      return validator.isEmail(value);
    }
    // check US postal code validity
    if (id === 'postal') {
      return validator.isPostalCode(value, 'US');
    }
    return false;
  }
  const inputs = document.querySelectorAll('#example input');
  inputs.forEach((input) => {
    // fire an event each time an input value changes
    input.addEventListener('input', () => {
      // pass the input value to the validation function
      const valid = inputValidator(input.id, input.value);
      // if not valid set the aria-invalid attribute to true
      if (!valid && input.value.length > 0) {
        this.setAttribute('aria-invalid', 'true');
      }
    });
  });
};

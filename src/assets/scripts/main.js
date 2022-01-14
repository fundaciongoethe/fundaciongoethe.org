import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

//  ---------------------------- intersection observer image lazy load

(function () {
  'use strict';

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

  //click volume slider to change volume
  const volumeSlider = audioPlayer.querySelector('.controls .volume-slider');
  volumeSlider.addEventListener(
    'click',
    (e) => {
      const sliderWidth = window.getComputedStyle(volumeSlider).width;
      const newVolume = e.offsetX / parseInt(sliderWidth);
      audio.volume = newVolume;
      audioPlayer.querySelector('.controls .volume-percentage').style.width = newVolume * 100 + '%';
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
        playBtn.classList.remove('play');
        playBtn.classList.add('pause');
        audio.play();
      } else {
        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
        audio.pause();
      }
    },
    false
  );

  audioPlayer.querySelector('.volume-button').addEventListener('click', () => {
    const volumeEl = audioPlayer.querySelector('.volume-container .volume');
    audio.muted = !audio.muted;
    if (audio.muted) {
      volumeEl.classList.remove('icono-volumeMedium');
      volumeEl.classList.add('icono-volumeMute');
    } else {
      volumeEl.classList.add('icono-volumeMedium');
      volumeEl.classList.remove('icono-volumeMute');
    }
  });

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

//  ---------------------------- s lite youtube embed

class LiteYTEmbed extends HTMLElement {
  connectedCallback() {
    this.videoId = this.getAttribute('videoid');

    let playBtnEl = this.querySelector('.lty-playbtn');
    // A label for the button takes priority over a [playlabel] attribute on the custom-element
    this.playLabel = (playBtnEl && playBtnEl.textContent.trim()) || this.getAttribute('playlabel') || 'Play';

    /**
     * Lo, the youtube placeholder image!  (aka the thumbnail, poster image, etc)
     *
     * See https://github.com/paulirish/lite-youtube-embed/blob/master/youtube-thumbnail-urls.md
     *
     * TODO: Do the sddefault->hqdefault fallback
     *       - When doing this, apply referrerpolicy (https://github.com/ampproject/amphtml/pull/3940)
     * TODO: Consider using webp if supported, falling back to jpg
     */
    if (!this.style.backgroundImage) {
      this.posterUrl = `https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`;
      // Warm the connection for the poster image
      LiteYTEmbed.addPrefetch('preload', this.posterUrl, 'image');

      this.style.backgroundImage = `url("${this.posterUrl}")`;
    }

    // Set up play button, and its visually hidden label
    if (!playBtnEl) {
      playBtnEl = document.createElement('button');
      playBtnEl.type = 'button';
      playBtnEl.classList.add('lty-playbtn');
      this.append(playBtnEl);
    }
    if (!playBtnEl.textContent) {
      const playBtnLabelEl = document.createElement('span');
      playBtnLabelEl.className = 'lyt-visually-hidden';
      playBtnLabelEl.textContent = this.playLabel;
      playBtnEl.append(playBtnLabelEl);
    }

    // On hover (or tap), warm up the TCP connections we're (likely) about to use.
    this.addEventListener('pointerover', LiteYTEmbed.warmConnections, {
      once: true,
    });

    // Once the user clicks, add the real iframe and drop our play button
    // TODO: In the future we could be like amp-youtube and silently swap in the iframe during idle time
    //   We'd want to only do this for in-viewport or near-viewport ones: https://github.com/ampproject/amphtml/pull/5003
    this.addEventListener('click', (e) => this.addIframe());
  }

  // // TODO: Support the the user changing the [videoid] attribute
  // attributeChangedCallback() {
  // }

  /**
   * Add a <link rel={preload | preconnect} ...> to the head
   */
  static addPrefetch(kind, url, as) {
    const linkEl = document.createElement('link');
    linkEl.rel = kind;
    linkEl.href = url;
    if (as) {
      linkEl.as = as;
    }
    document.head.append(linkEl);
  }

  /**
   * Begin pre-connecting to warm up the iframe load
   * Since the embed's network requests load within its iframe,
   *   preload/prefetch'ing them outside the iframe will only cause double-downloads.
   * So, the best we can do is warm up a few connections to origins that are in the critical path.
   *
   * Maybe `<link rel=preload as=document>` would work, but it's unsupported: http://crbug.com/593267
   * But TBH, I don't think it'll happen soon with Site Isolation and split caches adding serious complexity.
   */
  static warmConnections() {
    if (LiteYTEmbed.preconnected) return;

    // The iframe document and most of its subresources come right off youtube.com
    LiteYTEmbed.addPrefetch('preconnect', 'https://www.youtube-nocookie.com');
    // The botguard script is fetched off from google.com
    LiteYTEmbed.addPrefetch('preconnect', 'https://www.google.com');

    // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.
    LiteYTEmbed.addPrefetch('preconnect', 'https://googleads.g.doubleclick.net');
    LiteYTEmbed.addPrefetch('preconnect', 'https://static.doubleclick.net');

    LiteYTEmbed.preconnected = true;
  }

  addIframe() {
    const params = new URLSearchParams(this.getAttribute('params') || []);
    params.append('autoplay', '1');

    const iframeEl = document.createElement('iframe');
    iframeEl.width = 560;
    iframeEl.height = 315;
    // No encoding necessary as [title] is safe. https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#:~:text=Safe%20HTML%20Attributes%20include
    iframeEl.title = this.playLabel;
    iframeEl.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframeEl.allowFullscreen = true;
    // AFAIK, the encoding here isn't necessary for XSS, but we'll do it only because this is a URL
    // https://stackoverflow.com/q/64959723/89484
    iframeEl.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${params.toString()}`;
    this.append(iframeEl);

    this.classList.add('lyt-activated');

    // Set focus for a11y
    this.querySelector('iframe').focus();
  }
}
// Register custom element
customElements.define('lite-youtube', LiteYTEmbed);

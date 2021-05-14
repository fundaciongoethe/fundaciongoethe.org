module.exports = (audiofile, audioname) => {
	return `
<div class="audio-player" data-song="${audiofile}"><div class="timeline"><div class="progress"></div></div><div class="controls"><div class="play-container"><div class="toggle-play play"></div></div><div class="time"><div class="current">0:00</div><div class="divider">/</div><div class="length"></div></div><div class="name">${audioname}</div><div class="volume-container"><div class="volume-button"><div class="volume icono-volumeMedium"></div></div><div class="volume-slider"><div class="volume-percentage"></div></div></div></div></div>
    `;
};

// ejemplo:   {% audiofile '/assets/podcast/01-derechos.mp3', 'Episodio 1' %}

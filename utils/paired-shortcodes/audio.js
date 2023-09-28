const audioPlayer = (pairedaudiofile, pairedaudioname) => {
  return `<div class="audio-player" data-song="${pairedaudiofile}" aria-label="Audio Player" role="region"><div class="timeline"><div class="progress"></div></div><div class="controls"><div class="play-container"><button class="toggle-play play" aria-label="Play"></button></div><div class="time"><div class="current">0:00</div></div><div class="name">${pairedaudioname}</div></div></div>`;
};
module.exports = audioPlayer;

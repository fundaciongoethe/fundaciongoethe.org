module.exports = (videofile) => {
  return `
<video class="w-full aspect-video" width="620" controls poster="${videofile}.jpg"><source src="${videofile}.ogv" type="video/ogg"><source src="${videofile}.webm" type="video/webm"><source src="${videofile}.mp4" type="video/mp4"></video>
`;
};

// ejemplo:   {% videofile '/assets/videos/videoname' %}

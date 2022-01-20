let numberUser = document.querySelector("#userNumber");

let contador = 0;

setInterval(() => (numberUser.innerHTML = contador++), 100);

let numberM = document.querySelector("#userM");

let cont = 100;

setInterval(() => (numberM.innerHTML = cont++), 500);

function makesvg(percentage, inner_text = "") {
  var abs_percentage = Math.abs(percentage).toString();
  var percentage_str = percentage.toString();
  var classes = "";

  if (percentage < 0) {
    classes = "danger-stroke circle-chart__circle--negative";
  } else if (percentage > 0 && percentage <= 30) {
    classes = "warning-stroke";
  } else {
    classes = "success-stroke";
  }

  var svg =
    '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">' +
    '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />' +
    '<circle class="circle-chart__circle ' +
    classes +
    '"' +
    'stroke-dasharray="' +
    abs_percentage +
    ',100"    cx="16.9" cy="16.9" r="15.9" />' +
    '<g class="circle-chart__info">' +
    '   <text class="circle-chart__percent" x="17.9" y="15.5">' +
    percentage_str +
    "%</text>";

  if (inner_text) {
    svg +=
      '<text class="circle-chart__subline" x="16.91549431" y="22">' +
      inner_text +
      "</text>";
  }

  svg += " </g></svg>";

  return svg;
}

(function ($) {
  $.fn.circlechart = function () {
    this.each(function () {
      var percentage = $(this).data("percentage");
      var inner_text = $(this).text();
      $(this).html(makesvg(percentage, inner_text));
    });
    return this;
  };
})(jQuery);

$(function () {
  $(".circlechart").circlechart();
});

// Reference: https://developer.mozilla.org/fr/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

function toggleVideoStatus() {
  video.paused ? video.play() : video.pause();
}

function updatePlayIcon() {
  video.paused
    ? (play.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>')
    : (play.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>');
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  let minutes = Math.floor(video.currentTime / 60);
  if (minutes < 10) minutes = "0" + String(minutes);
  let seconds = Math.floor(video.currentTime % 60);
  if (seconds < 10) seconds = "0" + String(seconds);
  timestamp.innerHTML = `${minutes}:${seconds}`;
}

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);

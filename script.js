"use strict";

const container = document.querySelector(".container");

const video = document.getElementById("video");

const playPause = document.getElementById("play-pause");
const playPauseIcon = document.querySelector("#play-pause img");

const volumeBtn = document.getElementById("volume");
const volumeBar = document.getElementById("volume-bar");
const volumeControl = document.getElementById("volume-control-bar");
const volumeIcon = document.querySelector("#volume img");

const currentTime = document.getElementById("current-time");
const totalDuration = document.getElementById("total-duration");

const backwardsBtn = document.getElementById("backward");
const forwardsBtn = document.getElementById("forward");

const fullscreenBtn = document.getElementById("fullscreen");
const fullscreenBtnIcon = document.querySelector("#fullscreen img");

const durationBar = document.getElementById("duration-bar");
const currentDuration = document.getElementById("current-duration");

let isFullScreen = false;
let isPlaying = false;
let currentVolume;

const fullscreenCheck = () => {
  isFullScreen ? (isFullScreen = false) : (isFullScreen = true);
  if (isFullScreen) {
    container.classList.add("fullscreen");
    fullscreenBtnIcon.src = "./assets/icons/fullscreen_exit.svg";
  } else {
    container.classList.remove("fullscreen");
    fullscreenBtnIcon.src = "./assets/icons/fullscreen.svg";
  }
};

const playVideo = () => {
  video.play();
  isPlaying = true;
  playPauseIcon.src = `./assets/icons/pause.svg`;
};

const pauseVideo = () => {
  video.pause();
  isPlaying = false;
  playPauseIcon.src = `./assets/icons/play_arrow.svg`;
};

//Play-Pause events
playPause.addEventListener("click", () => {
  isPlaying ? pauseVideo() : playVideo();
});

video.addEventListener("click", () => {
  isPlaying ? pauseVideo() : playVideo();
});

window.addEventListener("keypress", (event) => {
  if (event.code === "Space") {
    isPlaying ? pauseVideo() : playVideo();
  }
});

//Fullscreen events
video.addEventListener("dblclick", fullscreenCheck);
fullscreenBtn.addEventListener("click", fullscreenCheck);
window.addEventListener("keypress", (event) => {
  if (event.key === "f" || event.key === "F") {
    fullscreenCheck();
  }
});

//Duration stuff
backwardsBtn.addEventListener("click", () => {
  video.currentTime = video.currentTime - 10;
});

forwardsBtn.addEventListener("click", () => {
  video.currentTime = video.currentTime + 10;
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    video.currentTime = video.currentTime - 10;
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    video.currentTime = video.currentTime + 10;
  }
});

durationBar.addEventListener("click", (event) => {
  const clicked = event.offsetX;
  const totalWidth = durationBar.clientWidth;
  video.currentTime = (clicked / totalWidth) * video.duration;
});

video.addEventListener("timeupdate", () => {
  const { currentTime: cTime, duration } = video;

  const hours = Math.floor(cTime / 3600);
  const minutes = Math.floor(cTime / 60);
  const seconds = Math.floor(cTime % 60);

  const totalHours = Math.floor(duration / 3600);
  const totalMinutes = Math.floor(duration / 60);
  const totalSeconds = Math.floor(duration % 60);

  currentTime.textContent = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  totalDuration.textContent = `${String(totalHours).padStart(2, "0")}:${String(
    totalMinutes
  ).padStart(2, "0")}:${String(totalSeconds).padStart(2, "0")}`;

  if (cTime === duration) {
    isPlaying = false;
    playPauseIcon.src = `./assets/icons/play_arrow.svg`;
  }

  currentDuration.style.width = `${(cTime / duration) * 100}%`;
});

//Volume Stuff
const updateVolume = () => {
  const currentVolume = video.volume;
  const newHeight = `${currentVolume * 100}%`;
  volumeControl.style.height = newHeight;

  if (video.volume == 0) {
    volumeIcon.src = "./assets/icons/no_sound.svg";
  } else if (video.volume < 0.5) {
    volumeIcon.src = "./assets/icons/volume_down.svg";
  } else {
    volumeIcon.src = "./assets/icons/volume_up.svg";
  }
};

volumeBar.addEventListener("click", (event) => {
  const clicked = event.offsetY;
  const totalHeight = volumeBar.clientHeight;
  video.volume = clicked / totalHeight;

  updateVolume();
});

volumeIcon.addEventListener("click", () => {
  if (video.volume !== 0) {
    currentVolume = video.volume;
    video.volume = 0;
  } else {
    video.volume = currentVolume;
  }

  updateVolume();
});

window.addEventListener("keypress", (event) => {
  if (event.key === "m" || event.key === "M") {
    if (video.volume !== 0) {
      currentVolume = video.volume;
      video.volume = 0;
    } else {
      video.volume = currentVolume;
    }

    updateVolume();
  }
});

const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const cover = document.querySelector("#cover");
const audio = document.querySelector("#audio");
const backgroundImage = document.querySelector("#background-image");
const playPauseImage = document.querySelector("#pause");
const artist = document.querySelector("#artist");
const songName = document.querySelector("#song-name");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
let isPlaying = false;
// Songs Array

const songsObj = {
  beyonce: {
    artist: "Beyonce",
    label: "Don't hurt yourself",
  },
  dontstartnow: {
    artist: "Dua Lipa",
    label: "Don't start now",
  },
};

const songs = Object.keys(songsObj);

// Song index

let songIndex = 1;
//

// Audio player functionality

const changeTitle = function (song) {
  artist.innerText = songsObj[song]["artist"];
  songName.innerText = songsObj[song]["label"];
};

const loadSong = function (song) {
  audio.src = `assets/audio/${song}.mp3`;
  cover.src = `assets/img/${song}.png`;
  backgroundImage.src = `assets/img/${song}.png`;
};

const playSong = function () {
  isPlaying = !isPlaying;
  if (isPlaying) {
    audio.play();
    playPauseImage.src = "assets/svg/pause.png";
  } else {
    audio.pause();
    playPauseImage.src = "assets/svg/play.png";
  }
};

const nextSong = function () {
  songIndex++;
  isPlaying = !isPlaying;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  changeTitle(songs[songIndex]);
  playSong();
};

const prevSong = function () {
  songIndex--;
  isPlaying = !isPlaying;
  progress.style.width = `0%`;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  changeTitle(songs[songIndex]);
  playSong();
};

const updateProgress = function (e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

const setProgress = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
};

// Event Listeners

loadSong(songs[songIndex]);
playBtn.addEventListener("click", playSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

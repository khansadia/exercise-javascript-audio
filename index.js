const playlistView = document.querySelector('#playlist-view');
const currentSongView = document.querySelector('#current-song-view');
const audioTag = document.querySelector('#audio-tag');
const headerTitle = document.querySelector('.header-title');
const headerArtist = document.querySelector('.header-artist');
const headerAlbum = document.querySelector('.header-album');
const btn = document.querySelectorAll('.btns>span');
const playBtn = document.querySelector('#play-btn');
const pauseBtn = document.querySelector('#pause-btn');
const timeRange = document.querySelector('#time-range');


// Here song related info (song title, artist, album, file path, etc.)
const playlist = [
  {
    id: "1",
    title: "Higher And Higher",
    artist: "SCREAM INC",
    album: "Inception",
    audioPath: "./assets/Higher_And_Higher_-_Scream_Inc._(3).mp3",
    imgPath: "./assets/Higher_And_Higher_-_Scream_Inc._(3).jpg",
  },
  {
    id: "2",
    title: "Boys,_Girls,_Toys_&_Words",
    artist: "Modern_Pitch",
    album: "Eye Of The Storm",
    audioPath: "./assets/Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.mp3",
    imgPath: "./assets/Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.jpg",
    
  },
  {
    id: "3",
    title: "Not My Problem",
    artist: "ALL MY FRIENDS HATE ME",
    album: "Not My Problem",
    audioPath: "./assets/Not_My_Problem_-_All_My_Friends_Hate_Me.mp3",
    imgPath: "./assets/Not_My_Problem_-_All_My_Friends_Hate_Me.jpg",
  },
  {
    id: "4",
    title: "Old News",
    artist: "HOT FICTION",
    album: "Apply Within",
    audioPath: "./assets/Old_News_-_Hot_Fiction.mp3",
    imgPath: "./assets/Old_News_-_Hot_Fiction.jpg",
  },
  {
    id: "5",
    title: "Peyote",
    artist: "KINEMATIC",
    album: "Kites",
    audioPath: "./assets/Peyote_-_Kinematic.mp3",
    imgPath: "./assets/Peyote_-_Kinematic.jpg",
  },
  {
    id: "6",
    title: "Say Goodbye",
    artist: "VITNE",
    album: "Jupiter",
    audioPath: "./assets/Say_Goodbye_-_VITNE.mp3",
    imgPath: "./assets/Say_Goodbye_-_VITNE.jpg",
  },
];

// Initial setup
// const audio = new Audio();
let currentSongId = '1';
let currentSongIndex = 0;

// Function to render the playlist view
function renderPlaylist() {
  // Display the playlist in the playlist-view element
  playlist.forEach(song => {
    let songHtml = `
    <li class="playlist-item" id=${song.id}>
        <div class="img-container">
            <img src=${song.imgPath} alt="">
        </div>
        <div class="playlist-item-desc">
            <h4 class="playlist-item-title">${song.title}</h4>
            <p class="playlist-item-artist">${song.artist}</p>
            <span class="playlist-item-album">From the album: ${song.album}</span>
        </div>
    </li>
    `;
    playlistView.innerHTML += songHtml;
  })
}

// Function to render the current song view
function renderCurrentSong() {
  let currentSong = playlist[currentSongIndex];
  headerTitle.innerText = currentSong.title;
  headerArtist.innerText = currentSong.artist;
  headerAlbum.innerText = currentSong.album;
}

// Function to choose a song from the playlist
function chooseSong() {
  // Play the song at the given index
  audioTag.src = playlist[currentSongIndex].audioPath;
  audioTag.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
}


// Function to play a song
function playSong() {
  // Play the song at the given index
  audioTag.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
}


// Function to pause the currently playing song
function pauseSong() {
  // Pause the currently playing song
  audioTag.pause();
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

// Function to play the next song
function playNextSong() {
  // Play the next song in the playlist
    currentSongIndex = currentSongIndex + 1;
    chooseSong();
    renderCurrentSong();
}

// Function to play the previous song
function playPreviousSong() {
  // Play the previous song in the playlist
  currentSongIndex = currentSongIndex - 1;
  chooseSong();
  renderCurrentSong();
}

// Function to handle repeat playlist
function repeatPlaylist() {
  // repeat playlist
  currentSongIndex = 0;
  chooseSong();
  renderCurrentSong();
}

// Function to handle shuffle playlist
function toggleShuffle() {
  for (let i = playlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    chooseSong();
    renderCurrentSong();
  }
}


playlistView.addEventListener("click", (e) => {
  e.preventDefault();
  for (let i = 0; i < playlist.length; i++) {
    if (e.target.id === playlist[i].id) {
      currentSongId = playlist[i].id;
      currentSongIndex = playlist.indexOf(playlist[i]);
    }
    chooseSong();
    renderCurrentSong();
  }
});


btn.forEach(x => {
  let btnName = x.getAttribute('id');
  x.addEventListener('click', e => {
    switch (btnName){
      case 'play-btn':
        playSong();
        break;
      case 'pause-btn':
        pauseSong();
        break;
      case 'next-btn':
        playNextSong();
        break;
      case 'previous-btn':
        playPreviousSong();
        break
      case 'repeat-btn':
        repeatPlaylist();
        break
      case 'shuffle-btn':
        toggleShuffle();
        break
    }
  })
})


audioTag.addEventListener('timeupdate', () => {
    const currentTime = audioTag.currentTime;
    const duration = audioTag.duration;
    const percentage = (currentTime / duration) * 100;
    timeRange.value = percentage;
})


timeRange.addEventListener('input', ()=> {
    const percentage = timeRange.value;
    const duration = audioTag.duration;
    const newTime = (percentage / 100) * duration;
    audioTag.currentTime = newTime;
})

audioTag.addEventListener('ended', ()=> {
    currentSongIndex = (currentSongIndex + 1 );
    chooseSong();
    renderCurrentSong();
})


// Initial render
renderPlaylist();
renderCurrentSong();

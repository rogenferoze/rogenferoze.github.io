import AudioPlaylist from "./audioPlayer/audio_playlist.js";
import AudioData from "./audioPlayer/audio_data.js";

let playButtons = document.getElementsByClassName("audio-container");

for (let buttons of playButtons) {
    buttons.onclick = function() {
        let parent = this.parentElement;
        let playlistName = parent.getAttribute("playlistName");
        let playlist = new AudioPlaylist(playlistName);
        for (let child of parent.children) {
            let songCover = child.children[0].src;
            let songSource = child.children[1].src;
            let songName = child.children[2].innerHTML;
            let songArtist = child.children[3].innerHTML;
            playlist.addSong(new AudioData(songName,songArtist,songSource,songCover));
        }
        document.querySelector('audio-player').playlist = playlist;
        let myIndex = 0;
        while (this != this.parentElement.children[myIndex]) {
            myIndex += 1
        }
        document.querySelector('audio-player').currentSongIndex = myIndex;
        document.querySelector('audio-player').playSong(myIndex);
    }
}

document.querySelector('audio-player').playlist = new AudioPlaylist("Random", new AudioData("ANAHEIM", "Rogen", "./songs/ANAHEIM new master.wav"))
document.querySelector('audio-player').playSong(0);
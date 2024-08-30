class AudioPlayer extends HTMLElement {
    constructor(newAudioPlaylist) {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                #audio-player-wrapper,
                #audio-player-wrapper * {
                    padding: 0;
                    margin: 0;
                    font-family: system-ui, arial, sans-serif;
                    text-shadow: 0 2px 10px hsla(0,0%,0%,0.5);
                    color: white;
                }
                #audio-player-wrapper {
                    width: 300px;
                    padding: 21px;
                    background-color: hsla(0,0%,80%,0.4);
                    backdrop-filter: blur(16px);
                    border: 4px solid hsla(0,0%,60%,0.4);
                    border-radius: 16px;
                }
                #audio-data > h3 {
                    margin-top: 7px;
                }
                #audio-data > img {
                    width: 170px;
                    height: 170px;
                    border: 1px solid hsl(0,0%,50%);
                    border-radius: 8px;
                    box-shadow: 0 3px 20px hsla(0,0%,0%,0.25);
                    position: absolute;
                    visibility: collapse;
                }
                #audio-controls > input {
                    margin: 10px 0;
                    width: 100%;
                }
                #audio-buttons-wrapper {
                    display: flex;
                    flex-direction: collumn;
                    justify-content: center;
                    width: 100%;
                    height: fit-content;
                }
                #audio-buttons-wrapper > button {
                    min-width: 30px;
                    min-height: 30px;
                    margin: 2px;
                    background-size: contain;
                    border: none;
                    border-radius: 7px;
                    transition: background-color 100ms;
                }
                #audio-buttons-wrapper > button:hover {
                    background-color: hsla(0,0%,100%,0.2);
                }
                #audio-play-button {
                    background: none;
                    background-image: url("play.png");
                }
                #audio-previous {
                    background: none;
                    background-image: url("skip-previous.png");
                }
                #audio-next {
                    background: none;
                    background-image: url("skip-next.png");
                }

                @media only screen and (max-width: 600px) {
                    #audio-player-wrapper * {
                        padding: 0;
                        margin: 0 !important;
                    }
                    #audio-player-wrapper {
                        padding: 20px 20px;
                        width: 80vw;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    #audio-player-wrapper > * {
                        flex-grow: 1;
                        max-width: 47%;
                    }
                    #audio-controls {
                        max-width: 70%;
                        padding-left: 10px;
                    }
                    #audio-data > img {
                        position: absolute;
                        visibility: collapse;
                    }
                }

                input[type=range] {
                    height: 29px;
                    -webkit-appearance: none;
                    margin: 10px 0;
                    width: 100%;
                    background: transparent;
                }
                input[type=range]:focus {
                    outline: none;
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 8px;
                    cursor: pointer;
                    animate: 0.2s;
                    box-shadow: 0px 0px 0px #000000;
                    background: hsla(0,0%,0%,0.2);
                    border-radius: 5px;
                    border: 0px solid #000000;
                }
                input[type=range]::-webkit-slider-thumb {
                    box-shadow: 0px 0px 0px #000000;
                    border: 3px solid #E0E0E0;
                    height: 17px;
                    width: 17px;
                    border-radius: 7px;
                    background: #FFFFFF;
                    cursor: pointer;
                    -webkit-appearance: none;
                    margin-top: -5px;
                }
                input[type=range]:focus::-webkit-slider-runnable-track {
                    background: hsla(0,0%,0%,0.2);
                }
                input[type=range]::-moz-range-track {
                    width: 100%;
                    height: 8px;
                    cursor: pointer;
                    animate: 0.2s;
                    box-shadow: 0px 0px 0px #000000;
                    background: hsla(0,0%,0%,0.2);
                    border-radius: 5px;
                    border: 0px solid #000000;
                }
                input[type=range]::-moz-range-thumb {
                    box-shadow: 0px 0px 0px #000000;
                    border: 3px solid #E0E0E0;
                    height: 17px;
                    width: 17px;
                    border-radius: 7px;
                    background: #FFFFFF;
                    cursor: pointer;
                }
                input[type=range]::-ms-track {
                    width: 100%;
                    height: 8px;
                    cursor: pointer;
                    animate: 0.2s;
                    background: transparent;
                    border-color: transparent;
                    color: transparent;
                }
                input[type=range]::-ms-fill-lower {
                    background: hsla(0,0%,0%,0.2);
                    border: 0px solid #000000;
                    border-radius: 10px;
                    box-shadow: 0px 0px 0px #000000;
                }
                input[type=range]::-ms-fill-upper {
                    background: hsla(0,0%,0%,0.2);
                    border: 0px solid #000000;
                    border-radius: 10px;
                    box-shadow: 0px 0px 0px #000000;
                }
                input[type=range]::-ms-thumb {
                    margin-top: 1px;
                    box-shadow: 0px 0px 0px #000000;
                    border: 3px solid #E0E0E0;
                    height: 17px;
                    width: 17px;
                    border-radius: 7px;
                    background: #FFFFFF;
                    cursor: pointer;
                }
                input[type=range]:focus::-ms-fill-lower {
                    background: hsla(0,0%,0%,0.2);
                }
                input[type=range]:focus::-ms-fill-upper {
                    background: hsla(0,0%,0%,0.2);
                }
            </style>
            <div id="audio-player-wrapper">
                <div id="audio-data">
                    <img src=""></img>
                    <h3>Unknown</h3>
                    <p>Unknown</p>
                </div>
                <div id="audio-controls">
                    <input id="audio-progress" type="range" value="0"></input>
                    <div id="audio-buttons-wrapper">
                        <button id="audio-previous"></button>
                        <button id="audio-play-button"></button>
                        <button id="audio-next"></button>
                    </div>
                </div>
                <audio id="audio-player"></audio>
            </div>
        `

        this.playlist = newAudioPlaylist;
        this.currentSongIndex = 0;
        this.changingProgress = false;
        this.audioData = this.shadowRoot.getElementById("audio-data");
        this.audioProgress = this.shadowRoot.getElementById("audio-progress");
        this.audioProgress.audioPlayerRef = this.shadowRoot.getElementById("audio-player");
        this.audioProgress.onmousedown = function() {
            document.querySelector("audio-player").toggleChangingProgress();
        }
        this.audioProgress.onchange = function() {
            this.audioPlayerRef.currentTime = this.value;
            document.querySelector("audio-player").toggleChangingProgress();
        }
        this.audioPlayButton = this.shadowRoot.getElementById("audio-play-button");
        this.audioPlayButton.onclick = function() {
            document.querySelector("audio-player").togglePlay();
        }
        this.audioSkipPrevious = this.shadowRoot.getElementById("audio-previous");
        this.audioSkipPrevious.onclick = function() {
            document.querySelector('audio-player').playPrevious();
        };
        this.audioSkipNext = this.shadowRoot.getElementById("audio-next");
        this.audioSkipNext.onclick = function() {
            document.querySelector('audio-player').playNext();
        };
        this.audioPlayer = this.shadowRoot.getElementById("audio-player");
        this.audioPlayer.audioProgressRef = this.audioProgress;
        this.audioPlayer.ontimeupdate = function() {
            if (!document.querySelector('audio-player').changingProgress){        
                this.audioProgressRef.max = this.duration;
                this.audioProgressRef.value = this.currentTime;
            }
        };
        this.audioPlayer.onended = function() {
            document.querySelector('audio-player').playNext();
        }
    }
    toggleChangingProgress() {
        if (this.changingProgress) {
            this.changingProgress = false;
        } else {
            this.changingProgress = true;
        }
    }
    togglePlay() {  
        if (!this.audioPlayer.paused) {
            this.audioPlayer.pause();
            this.audioPlayButton.style.backgroundImage = "url('play.png')";
        } else {
            this.audioPlayer.play();
            this.audioPlayButton.style.backgroundImage = "url('pause.png')";
        }
    }
    playNext() {
        if ((this.currentSongIndex +1) > this.playlist.songList.length -1) {
            this.currentSongIndex = 0;
        } else {
            this.currentSongIndex += 1;
        }
        this.playSong(this.currentSongIndex);
        this.audioPlayButton.style.backgroundImage = "url('pause.png')";
    }
    playPrevious() {
        if ((this.currentSongIndex -1) < 0 ) {
            this.currentSongIndex = this.playlist.songList.length -1;
        } else {
            this.currentSongIndex -= 1;
        }
        this.playSong(this.currentSongIndex);
        this.audioPlayButton.style.backgroundImage = "url('pause.png')";
    }
    playSong(playlistIndex) {
        this.audioData.children[0].src = this.playlist.songList[playlistIndex].coverSource;
        this.audioData.children[1].innerHTML = this.playlist.songList[playlistIndex].name;
        this.audioData.children[2].innerHTML = this.playlist.songList[playlistIndex].artist;
        this.audioPlayer.src = this.playlist.songList[playlistIndex].audioSource;
        let promise = this.audioPlayer.play();
        if (promise !== undefined){
            promise.then(_ => {
                this.audioPlayButton.style.backgroundImage = "url('pause.png')";
            }).catch(error => {
                this.audioPlayButton.style.backgroundImage = "url('play.png')";
            })
        }
    }
}

customElements.define("audio-player", AudioPlayer);
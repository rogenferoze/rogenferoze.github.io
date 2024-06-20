export default class AudioPlaylist {
    constructor(newName, ... songs) {
        this.name = newName;
        this.songList = [];
        for (let song of songs) {
            this.songList.push(song);
        }
    }
    addSong(song){
        this.songList.push(song);
    }
}
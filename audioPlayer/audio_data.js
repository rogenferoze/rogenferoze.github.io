export default class AudioData {
    constructor(newName = "Unknown",newArtist = "Unknown",newAudio,newCover) {
        this.name = newName;
        this.artist = newArtist;
        this.audioSource = newAudio;
        this.coverSource = newCover;
    }   
}
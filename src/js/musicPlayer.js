// --------------- Zarządzanie muzyką  ---------------

import Visualizer from './visualizer';

import startImage from '../assets/player/play.png'
import pauseImage from '../assets/player/pause.png'


export default class MusicPlayer {
    constructor(musicFile, name) {

        this.musicFile = musicFile;
        this.name= name;

        this.Visualizer = new Visualizer();

        this.songInit()
        this.initHTMLElements();
        this.keyboardInit();
    }
    // ----- stworzenie obiektu muzyki -----

    songInit = () => {
        this.song = new Audio()
        this.song.src = this.musicFile;

        this.song.addEventListener('timeupdate', this.update)
    }

    // ----- zmiana utworu -----

    changeSong = (file, name) => {
        this.song.src = file
        this.song.currentTime = 0; 
        this.playImage.src = startImage;

        document.getElementById('fileName').innerHTML = name
    }


    // ------ załadowanie odopowiednich elementów po załadowaniu strony -----

    initHTMLElements = () => {
        window.addEventListener('DOMContentLoaded', (event) => {
            this.playImage = document.getElementById('playImage');

            document.getElementById('fileName').innerHTML = this.name

            this.playButton = document.getElementById('play');
            this.playButton.addEventListener('click', this.start)

            this.volumeInput = document.getElementById('speaker')
            this.volumeInput.addEventListener('input', this.volumeControl)
            this.volumeInput.value = this.song.volume

            this.playImage = document.getElementById('playImage')

            this.timeUpdateDiv = document.getElementById('timeUpdate')

            this.replayButton = document.getElementById('replay');
            this.replayButton.addEventListener('click', this.replay);

            // ----- załadowanie visualizera -----
            this.Visualizer.canvasInit();

        });
    }

    // ----- zdarzenia klawiatura -----

    keyboardInit = () => {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowRight') {
                this.song.currentTime += 5;
            }
            if (e.code === 'ArrowLeft') {
                this.song.currentTime -= 5;
            }
        })
    }

    // ----- start/stop muzyki -----

    start = () => {
        this.Visualizer.analyserInit(this.song)

        if (this.song.paused) {
            this.song.play();
            this.playImage.src = pauseImage
        }
        else {
            this.song.pause();
            this.playImage.src = startImage
        }
    }


    // ----- rozpoczęcie od nowa piosenki -----

    replay = () => {
        this.song.currentTime = 0;
    }

    // ----- kontrola głośności -----

    volumeControl = (e) => {
        this.song.volume = e.target.value
    }

    // ----- pasek postępu piosenki -----

    update = () => {
        this.timeUpdateDiv.style.width = this.song.currentTime / this.song.duration * 100 + '%'
    }
}
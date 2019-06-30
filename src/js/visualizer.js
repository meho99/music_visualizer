// --------------- obsługa viusualizera ---------------

export default class Visuzalizer {
    constructor() {
        this.canvasInit()
    }

    // ----- podstawowa konfiguracja canvasu -----

    canvasInit = () => {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = window.innerWidth * 9 / 10;
        this.canvas.height = window.innerWidth / 3;

        this.ctx = this.canvas.getContext('2d');

        // ----- resize okna -----

        window.addEventListener('resize', this.resize, true)
    }

    // ----- zainicjowanie narzędzi do analizy audio -----

    analyserInit = (file) => {
        this.file = file;

        if (!this.context) {
            this.context = new AudioContext();
            this.analyser = this.context.createAnalyser();
            this.src = this.context.createMediaElementSource(file);
            this.src.connect(this.analyser);
            this.analyser.connect(this.context.destination);

            this.analyser.fftSize = 256;

            this.bufferLength = this.analyser.frequencyBinCount; // ilość rozpoznawanych częstotliwości

            this.dataArray = new Uint8Array(this.bufferLength); // tablica zawierająca natężenie dzwięku na danych częstotliwościach

            this.bar = { // wymiary 'pasków' ilustrujących dane częstotliwości
                width: (this.canvas.width / this.bufferLength) * 1.25,
                height: 0
            }

            this.x = 0;
            this.render()
            
        }
    }

    // ----- zmiana wielkości okna przeglądarki -----

    resize=()=>{

        this.canvas.width = window.innerWidth * 9 / 10;
        this.canvas.height = window.innerWidth / 3;

        this.bar = {
            width: (this.canvas.width / this.bufferLength) * 1.25,
            height: 0
        }
    }

    // ----- animacje -----

    render = () => {
        requestAnimationFrame(this.render)

        this.x = 0;
        this.analyser.getByteFrequencyData(this.dataArray); // pobranie wartości na poszczególnych częstotliwościach w danym momencie odtwarzania utwóru

        this.ctx.fillStyle = 'rgb(29, 29, 29)'; // wyczyszczenie pola canvasu
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // ----- tworzenie animacji 'ilustrowania' muzyki -----

        for (var i = 0; i < this.bufferLength; i++) { 
            this.bar.height = this.dataArray[i] * this.canvas.height / 350

            // nadanie paskom kolorów

            let r = 30+ ((i + 1) * 1.5);
            let g = this.dataArray[i]/3;
            let b = 160- (i*5);

            this.ctx.fillStyle = `rgb(${r},${g},${b})`

            // stworzenie pasków

            this.ctx.fillRect(this.x, this.canvas.height / 2 - this.bar.height / 2, this.bar.width, this.bar.height);

            this.x += this.bar.width * 2 + 1;
        }

    }
}
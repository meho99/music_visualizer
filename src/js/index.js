import MusicPlayer from './musicPlayer'
import '../styles/main.scss'

import defaultSong from '../music/Soft_and_Furious_-_10_-_Melancholic_Ending.mp3';

let Player = new MusicPlayer(defaultSong, 'Soft and Furious- "Melancholic Ending"');

window.addEventListener('DOMContentLoaded', (event) => {
    let file = document.getElementById('file-upload')

    // ----- zmiana pliku -----

    file.addEventListener('change', (e) => {
        if (e.target.files[0] && (e.target.files[0].type === 'audio/mp3' || e.target.files[0].type === 'audio/wav'))
            Player.changeSong(URL.createObjectURL(e.target.files[0]), e.target.files[0].name)
        else
            alert('Choose an mp3 file !')
    })
})


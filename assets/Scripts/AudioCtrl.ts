import { _decorator, Component, Node, AudioClip, AudioSource, director, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioCtrl')
export class AudioCtrl extends Component {
    
    @property({
        type: AudioClip,
        tooltip: 'Audio Clip here'
    })
    public audio_clip: AudioClip[] = [];

    @property({
        type: AudioSource,
        tooltip: 'Audio source here'
    })
    public audio_source: AudioSource = null;


    onPlaySoundEffect(index: number) {
        let audio: AudioClip = this.audio_clip[index];

        this.audio_source.playOneShot(audio);
    }

    pausePlaySoundEffect() {
            this.audio_source.pause();
    }
    
}


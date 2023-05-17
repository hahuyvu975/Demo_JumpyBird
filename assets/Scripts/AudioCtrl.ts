import { _decorator, Component, Node, AudioClip, AudioSource, director, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioCtrl')
export class AudioCtrl extends Component {
    
    @property({
        type: AudioClip,
        tooltip: 'Audio Clip here'
    })
    private audio_clip: AudioClip[] = [];

    @property({
        type: AudioSource,
        tooltip: 'Audio source here'
    })
    private audio_source: AudioSource = null;


    onPlaySoundEffect(index: number): void {
        let audio  = this.audio_clip[index];

        this.audio_source.playOneShot(audio);
    }

    pausePlaySoundEffect(): void {
            this.audio_source.pause();
    }
    
}


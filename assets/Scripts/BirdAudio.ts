import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdAudio')
export class BirdAudio extends Component {
    
    @property({
        type: [AudioClip],
        tooltip: 'Here'
    })
    public clips: AudioClip[] = [];

    @property({
        type: AudioSource,
        tooltip: 'Audio source'
    })
    public audioSource: AudioSource = null;

    onAudioQueue(index: number) {
        let clip: AudioClip = this.clips[index];

        this.audioSource.playOneShot(clip);   
    }
    // play() {
    //     this.audioSource.play();
    // }

    pauseSound() {
        this.audioSource.pause();
        console.log(this.audioSource)
    }
}


import { _decorator, Component, Node, Button, Label, find, game, director, AudioSource } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('MenuGame')
export class MenuGame extends Component {

    @property({
        type: Button
    })
    private btnPlay: Button;

    @property({
        type: Button
    })
    private btnOption: Button;

    @property({
        type: Label
    })
    private labelMenu: Label;

    // @property({
    //     type: AudioSource
    // })
    // public birdAudio: BirdAudio;


    protected PLAYGAME(): void {
        director.loadScene('game')
        // this.gameCtrl.node.active = true;
    }

    protected OPTION(): void {
        director.loadScene('option')

    }
}


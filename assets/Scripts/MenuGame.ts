import { _decorator, Component, Node, Button, Label, find, game, director, AudioSource } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('MenuGame')
export class MenuGame extends Component {

    @property({
        type: Button
    })
    public btnPlay: Button;

    @property({
        type: Button
    })
    public btnOption: Button;

    @property({
        type: Label
    })
    public labelMenu: Label;

    // @property({
    //     type: AudioSource
    // })
    // public birdAudio: BirdAudio;


    PLAYGAME() {
        director.loadScene('game')
        // this.gameCtrl.node.active = true;
    }

   OPTION() {
       director.loadScene('option')

    }
}


import { _decorator, Component, Node, Button, Label, find, game, director } from 'cc';
const { ccclass, property } = _decorator;

import { Bird } from './Bird';
import { Ground } from './Ground';
import { Results } from './Results';
import { GameCtrl } from './GameCtrl';
import { BirdAudio } from './BirdAudio';

@ccclass('MenuGame')
export class MenuGame extends Component {

    @property({
        type: Button
    })
    public btnPlay: Button;

    @property({
        type: Button
    })
    public btnSettings: Button;

    @property({
        type: Label
    })
    public labelMenu: Label;

    // onLoad() {
    //     this.btnPlay.node.on(Button.EventType.CLICK, this.PLAYGAME, this)
    //     // this.gameCtrl.onLoad();
    //     // console.log(this.isPlay);

    //     this.btnSettings.node.on(Button.EventType.CLICK, this.SOUND, this)

    // }

    PLAYGAME() {
        director.loadScene('game')
        // this.gameCtrl.node.active = true;
    }

    SOUND() {
       console.log('Sound');

    }
}


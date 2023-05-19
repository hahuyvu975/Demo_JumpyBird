import { _decorator, Component, Node, Button, Label, find, game, director, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuGame')
export class MenuGame extends Component {

    protected playGame(): void {
        director.loadScene('game')
        // this.gameCtrl.node.active = true;
    }

    protected option(): void {
        director.loadScene('option')
    }
}


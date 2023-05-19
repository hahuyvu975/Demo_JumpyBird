import { _decorator, Component, Node, Button, Label, director, find, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OptionGame')
export class OptionGame extends Component {

    protected backMenu(): void {
        director.loadScene('entry');
    }
}


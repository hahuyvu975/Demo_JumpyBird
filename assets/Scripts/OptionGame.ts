import { _decorator, Component, Node, Button, Label, director, find, Sprite } from 'cc';
const { ccclass, property } = _decorator;

import { ChangeColor } from './ChangeColor';

@ccclass('OptionGame')
export class OptionGame extends Component {
    @property({
        type: Button
    })
    private btnBack: Button;

    @property({
        type: Button
    })
    private btnOK: Button;

    @property({
        type: Label
    })
    private labelChoosen: Label;

    protected BACK_MENU(): void {
        director.loadScene('menu');
    }
    

    // protected OK_MENU(): void {
    //     let temp = this.changeColor.newBird
    //     console.log(temp)
    //     director.addPersistRootNode(this.node);
    //     director.loadScene('game');
    // }
}


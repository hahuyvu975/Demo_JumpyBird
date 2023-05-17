import { _decorator, Component, Node, Button, Label, director } from 'cc';
const { ccclass, property } = _decorator;

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

    protected OK_MENU(): void {
        director.loadScene('menu');
    }
}


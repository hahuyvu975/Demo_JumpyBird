import { _decorator, Component, Node, Button, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuGame')
export class MenuGame extends Component {
   
    @property({
        type: Button
    })
    public playGame: Button;

    @property({
        type: Button
    })
    public settings: Button;

    @property({
        type: Label
    })
    public labelMenu: Label;

}


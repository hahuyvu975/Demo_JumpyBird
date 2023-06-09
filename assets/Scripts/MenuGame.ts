import { Constants } from './Constants';
import { _decorator, Component, director} from 'cc';
const { ccclass, property } = _decorator;


@ccclass('MenuGame')
export class MenuGame extends Component {

    protected playGame(): void {
        director.loadScene(Constants.GameScene);
    }

    protected option(): void {
        director.loadScene(Constants.OptionScene);
    }
}


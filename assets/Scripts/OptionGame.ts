import { _decorator, Component, director} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OptionGame')
export class OptionGame extends Component {

    protected backMenu(): void {
        director.loadScene('entry');
    }
}


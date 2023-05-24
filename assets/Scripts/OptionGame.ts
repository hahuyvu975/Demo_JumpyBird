import { _decorator, Component, director} from 'cc';
const { ccclass, property } = _decorator;

import { Constants } from './Constants';

@ccclass('OptionGame')
export class OptionGame extends Component {

    public backMenu(): void {
        director.loadScene(Constants.EntryScene);
    }
}


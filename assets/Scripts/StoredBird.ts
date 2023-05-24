import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

import { Constants } from './Constants';
import { ChangeColor } from './ChangeColor';

@ccclass('StoredBird')
export class StoredBird extends Component {

    @property({
        type: ChangeColor
    })
    private changeColor: ChangeColor;

    private temp;

    public getTemp() {
        return this.temp;
    }

    protected okMenu(): void  {
        this.temp = this.changeColor.getIndexObj();
        console.log(this.temp);
        director.addPersistRootNode(this.node);
        director.loadScene(Constants.GameScene);
    }
}


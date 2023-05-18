import { _decorator, Component, Node, director } from 'cc';
import { ChangeColor } from './ChangeColor';
const { ccclass, property } = _decorator;

@ccclass('StoredBird')
export class StoredBird extends Component {
    // private green: boolean;
    // private red: boolean;
    // private yellow: boolean;
    private temp = null;

    getTemp() {
        return this.temp;
    }

    @property({
        type: ChangeColor
    })
    private changeColor: ChangeColor;
    

    protected OK_MENU(): void {
        this.temp = this.changeColor.indexObj;
        // console.log(temp)
        director.addPersistRootNode(this.node);
        director.loadScene('game');
    }
}


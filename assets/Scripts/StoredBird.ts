import { _decorator, Component, Node, director } from 'cc';
import { ChangeColor } from './ChangeColor';
const { ccclass, property } = _decorator;

@ccclass('StoredBird')
export class StoredBird extends Component {

    @property({
        type: ChangeColor
    })
    private changeColor: ChangeColor;

    private temp: number;

    public getTemp(): number {
        return this.temp;
    }

    protected okMenu(): void {
        this.temp = this.changeColor.getIndexObj();
        // console.log(temp)
        director.addPersistRootNode(this.node);
        director.loadScene('game');
    }
}


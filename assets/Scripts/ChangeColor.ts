import { _decorator, Component, Node, Button, director, find, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeColor')
export class ChangeColor extends Component {

    private indexObj = null;

    public getIndexObj() {
        return this.indexObj;
    }

    protected onChooseYellow(): void {
        console.log('Yellow')
        this.indexObj = 2;
        console.log(this.indexObj);
    }

    protected onChooseGreen(): void {
        console.log("Green")
        this.indexObj = 1
    }

    protected onChooseRed(): void {
        console.log("Red")
        this.indexObj = 3
        console.log(this.indexObj)
    }
}



import { _decorator, Component, Node, Button, director, find, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeColor')
export class ChangeColor extends Component {
    @property({
        type: Button,
        tooltip: 'btnYellow'
    })
    private btnYellow: Button;

    @property({
        type: Button,
        tooltip: 'btnGreen'
    })
    private btnGreen: Button;

    @property({
        type: Button,
        tooltip: 'btnRed'
    })
    private btnRed: Button;

    public indexObj = null ;
    
    // get valueYellow() {
    //     return this.btnGreen;
    // }

    // get valueGreen() {
    //     return this.btnGreen;
    // }
    
    // get valueRed() {
    //     return this.btnRed;
    // }

    onLoad() {
       
    }

    onChooseYellow(): void {
        console.log("Yellow")
        this.indexObj = 2;
       

        this.btnYellow.node.active = true;
        this.btnGreen.node.active = false;
        this.btnRed.node.active = false;
    }

    onChooseGreen(): void {
        console.log("Green")
        this.indexObj = 1   
        
        this.btnYellow.node.active = false;
        this.btnGreen.node.active = true;
        this.btnRed.node.active = false;
    }

    onChooseRed(): void {
        console.log("Red")
        this.indexObj = 3
        console.log(this.indexObj)
        this.btnYellow.node.active = false;
        this.btnGreen.node.active = false;
        this.btnRed.node.active = true;
    }

    

}



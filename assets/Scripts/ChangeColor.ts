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
    public btnGreen: Button;

    @property({
        type: Button,
        tooltip: 'btnRed'
    })
    private btnRed: Button;

    public newBird = null ;
    
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
        this.newBird = 2;
       

        this.btnYellow.node.active = true;
        this.btnGreen.node.active = false;
        this.btnRed.node.active = false;
    }

    onChooseGreen(): void {
        console.log("Green")
        this.newBird = 1   
        
        this.btnYellow.node.active = false;
        this.btnGreen.node.active = true;
        this.btnRed.node.active = false;
    }

    onChooseRed(): void {
        console.log("Red")
        this.newBird = 3

        this.btnYellow.node.active = false;
        this.btnGreen.node.active = false;
        this.btnRed.node.active = true;
    }

    

}



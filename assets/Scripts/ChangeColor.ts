import { _decorator, Component, Node, Button, director, find, CCInteger, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeColor')
export class ChangeColor extends Component {

    private indexObj;
     
    public getIndexObj(){
        return this.indexObj;
    }

    public getIndex(index : number) : void {
        if(index === 1){
            this.indexObj = index;
            console.log(this.indexObj);
        }else if(index === 2){ 
            this.indexObj = index;
            console.log(this.indexObj);
        }else if(index === 3) {
            this.indexObj = index;
            console.log(this.indexObj);
        }
    }

    public onButtonClick(event: Event, customEventData: string): void {
        console.log(customEventData)
        this.getIndex(parseInt(customEventData));
    }  
}



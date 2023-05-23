import { _decorator, Component} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeColor')
export class ChangeColor extends Component {

    private indexObj;
     
    public getIndexObj(){
        return this.indexObj;
    }

    public getIndex(index : number) : void {
        if(index >= 1 || index <= 3){
            this.indexObj = index;
        } 
    }

    public onButtonClick(event: Event, customEventData: string): void {
        this.getIndex(parseInt(customEventData));
    }  
}



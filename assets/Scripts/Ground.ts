import { _decorator, Component, Node, UITransform} from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node,
        tooltip: 'Ground  is here',
    })
    private ground: Node[] = [];

    // Create ground width variables
    private groundWidth: number[] = [];

    private gameCtrlSpeed = new GameCtrl();
    private gameSpeed: number = 300;

    protected onLoad(): void {
        this.startUp();
    }

    public startUp() {
        for (let i = 0; i < this.groundWidth.length; i++) {
            this.groundWidth.push(this.ground[i].getComponent(UITransform).width);
        }
        for (let i = 0; i < 3; i++) {
            let temp = 320 * i;
            this.ground[i].setPosition(temp, 0, 0);
        }
    }

    protected update(deltaTime: number): void {
        this.gameSpeed = this.gameCtrlSpeed.speed;
        for (let i = 0; i < 3; i++) {
            let x = this.ground[i].position.x;
            x -= this.gameSpeed * deltaTime;
            if(x < -290 ){
                x = 640;
            }
            this.ground[i].setPosition(x, 0, 0);
        }
    }
}

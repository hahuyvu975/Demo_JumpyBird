import { _decorator, Component, Node, Vec3, screen, find, Game, UITransform } from 'cc';
const { ccclass, property } = _decorator;

const random = (min, max) => {
    return Math.random() * (max - min) + min
}

import { GameCtrl } from './GameCtrl';

@ccclass('Pipes')
export class Pipes extends Component {
   
    @property({
        type: Node,
        tooltip: 'Top Pipe'
    })
    private topPipe: Node;
  
    @property({
        type: Node,
        tooltip: 'Bottom Pipe'
    })
    private bottomPipe: Node;

    private tempStartLocationUp: Vec3 = new Vec3(0, 0, 0);
    private tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);
    private scene = screen.windowSize; // set kích thước cửa số trò chơi

    private game ; // tốc độ của đường ống từ GameCtrl
    private pipeSpeed: number // tốc độ cuối cùng của đường ống
    private tempSpeed: number // tốc độ tạm thời

    private isPass: boolean;

    onLoad() {
        this.game = find("GameCtrl").getComponent("GameCtrl");
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
        this.isPass = false
    }

    // xử lý logic đường ống ngẫu nhiên cap hay thấp trong game
    initPos(): void {

        this.tempStartLocationUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width)
        this.tempStartLocationDown.x = (this.topPipe.getComponent(UITransform).width + this.scene.width)

        let gap = random(90,100)
        let topHeight = random (0, 450)

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = (topHeight - (gap *10))

        this.bottomPipe.setPosition(this.tempStartLocationDown);
        this.topPipe.setPosition(this.tempStartLocationUp);

    }

    // sự kiện được update liên tục khi trò chơi đang diễn ra
    update(deltaTime: number): void {

        this.tempSpeed = this.pipeSpeed * deltaTime;

        this.tempStartLocationDown = this.bottomPipe.position;
        this.tempStartLocationUp = this.topPipe.position;

        this.tempStartLocationDown.x -= this.tempSpeed;
        this.tempStartLocationUp.x -= this.tempSpeed;

        this.bottomPipe.setPosition(this.tempStartLocationDown);
        this.topPipe.setPosition(this.tempStartLocationUp);

        if(this.isPass == false && this.topPipe.position.x <= 0) {
            this.isPass = true;
            this.game.passPipe();

           
        }

        if(this.topPipe.position.x < (0 - this.scene.width)){
            this.destroy();
            this.game.createPipe();
            
        }
    }
}


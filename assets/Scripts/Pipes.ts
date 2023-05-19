import { _decorator, Component, Node, Vec3, screen, math, find, UITransform, randomRange } from 'cc';
const { ccclass, property } = _decorator;

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
    private scene = screen.windowSize; // set window size game

    private game: any; // 
    private pipeSpeed: number; // speed of the pipe
    private tempSpeed: number; // speed of the temp

    private isPass: boolean;

    protected onLoad(): void {
        this.game = find("GameCtrl").getComponent('GameCtrl');
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
        this.isPass = false;
    }

    // create random position for the pipe
    protected initPos(): void {
        this.tempStartLocationUp.x = this.topPipe.getComponent(UITransform).width + this.scene.width;
        this.tempStartLocationDown.x = this.bottomPipe.getComponent(UITransform).width + this.scene.width;

        let gap = math.randomRangeInt(90, 100);
        let topHeight = math.randomRangeInt(0, 450);

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = (topHeight - (gap * 10));

        this.bottomPipe.setPosition(this.tempStartLocationDown);
        this.topPipe.setPosition(this.tempStartLocationUp);
    }

    protected update(deltaTime: number): void {
        this.tempSpeed = this.pipeSpeed * deltaTime;

        this.tempStartLocationDown = this.bottomPipe.position;
        this.tempStartLocationUp = this.topPipe.position;
        this.tempStartLocationDown.x -= this.tempSpeed;
        this.tempStartLocationUp.x -= this.tempSpeed;

        this.bottomPipe.setPosition(this.tempStartLocationDown);
        this.topPipe.setPosition(this.tempStartLocationUp);

        if (this.isPass === false && this.topPipe.position.x <= 0) {
            this.isPass = true;
            this.game.passPipe();
        }

        if (this.topPipe.position.x < -960) {
            this.destroy();
            // console.log('123');
            this.game.createPipe();
        }
    }
}


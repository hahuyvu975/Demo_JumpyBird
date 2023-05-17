import { _decorator, Component, Node, CCFloat, Vec3, Animation, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({
        type: CCFloat,
        tooltip: 'how high can they fly'
    })
    private jumpHeight: number = 200;

    @property({
        type: CCFloat,
        tooltip: 'how long can they fly'
    })
    private jumpDuration: number = 0.3;

    private birdAnimation: Animation;
    private birdLocation: Vec3;
    public hitSomething: boolean;



    // getHitSomething(){
    //     return this.hitSomething;
    // }

    onLoad(): void {
        this.resetBird();

        this.birdAnimation = this.getComponent(Animation);
    }
    // init object Vec3 for birdLocation and set position again
    resetBird(): void {
        this.birdLocation = new Vec3(0, 0, 0);
        this.node.setPosition(this.birdLocation);
        this.hitSomething = false;
    }

    fly(): void {
        // this.birdAnimation.stop();
        // tạo hoạt ảnh lên xuống mượt mà hơn
        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), {
                easing: "smooth",
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
            })
            .start();

        this.birdAnimation.play();

    }
}


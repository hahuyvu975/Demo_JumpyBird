import { _decorator, Component, Node, CCFloat, Vec3, Animation, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({
        type: CCFloat,
        tooltip: 'how high can they fly'
    })
    public jumpHeight: number = 200;
    
    @property({
        type: CCFloat,
        tooltip: 'how long can they fly'
    })
    public jumpDuration: number = 0.3;

    public birdAnimation: Animation;
    public birdLocation: Vec3;
    public hitSomething: boolean;

    onLoad() {
        this.resetBird();

        this.birdAnimation = this.getComponent(Animation);
    }
    // khởi tạo đối tượng Vec3 cho birdLocation và set lại vị trí
    resetBird() {
        this.birdLocation = new Vec3(0, 0, 0);
        this.node.setPosition(this.birdLocation);
        this.hitSomething = false;
    }

    fly() {
        // this.birdAnimation.stop();
        // tạo hoạt ảnh lên xuống mượt mà hơn
        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), {easing: "smooth",
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
            })
            .start();
        
            this.birdAnimation.play();

    }
}


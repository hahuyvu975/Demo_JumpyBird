import { StoredBird } from './StoredBird';
import { _decorator, Component, Node, CCInteger, input, Input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact, find, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { AudioCtrl } from './AudioCtrl';
import { MenuGame } from './MenuGame';
// import { Stored } from './Stored';
// import { Stored } from './Stored';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type: Ground,
        tooltip: 'this is ground'
    })
    private ground: Ground

    @property({
        type: Results,
        tooltip: 'results go here'
    })
    private result: Results

    @property({
        type: Bird
    })
    private bird: Bird;

    @property({
        type: PipePool
    })
    private pipeQueue: PipePool;

    @property({
        type: AudioCtrl
    })
    private audioCtrl: AudioCtrl;

    @property({
        type: Node,
        tooltip: 'this is btnSound'
    })
    private btnSound: Node;

    @property({
        type: CCInteger,
    })
    private speed: number = 300;

    @property({
        type: CCInteger,
    })
    private pipeSpeed: number = 200;

    private isOver: boolean;

    // @property({
    //     type: Sprite
    // })
    // birdSprite : Sprite = null;

    getSpeedGameCtrl() {
        return this.speed;
    }

    getBirdColor(): void {
        let colorb = find('StateNode')
        let colorPara = colorb.getComponent(StoredBird)
        console.log(colorPara)
        if (colorPara.temp == 1) {
            let birdSpriteGreen = this.bird.getComponent(Sprite);
            birdSpriteGreen.color = Color.GREEN;
        } else if (colorPara.temp == 2) {
            let birdSpriteYellow = this.bird.getComponent(Sprite);
            birdSpriteYellow.color = Color.YELLOW;
        } else {
            let birdSpriteRed = this.bird.getComponent(Sprite);
            birdSpriteRed.color = Color.RED;
        }
    }
    onLoad() {


        //User need to click for start
        this.initListener();
        //Score will reset  
        this.result.resetScore();
        //..
        this.isOver = true;
        //Game pause when start
        director.pause();
    }

    initListener() {

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {


            if (this.isOver == true) {
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            }
            if (this.isOver == false) {
                this.bird.fly();
                if (this.btnSound.getChildByName('btnOn').active == true) {
                    this.audioCtrl.onPlaySoundEffect(0)
                }

            }
        })

    }

    //testing method DELETE ME IN FINAL VERSION
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.btnSound.getChildByName('btnOn').active = true;
                this.btnSound.getChildByName('btnOff').active = false;
                break;
            case KeyCode.KEY_S:
                this.btnSound.getChildByName('btnOn').active = false;
                this.btnSound.getChildByName('btnOff').active = true;
                break;


        }
    }

    startGame(): void {
        this.result.hideResults();
        director.resume()
        
    }

    gameOver(): void {

        this.result.showResults()
        this.isOver = true;
        director.pause();
        if (this.btnSound.getChildByName('btnOn').active == true) {
            this.audioCtrl.onPlaySoundEffect(3)
        }

    }


    resetGame(): void {
        this.result.resetScore()
        this.pipeQueue.reset()
        this.isOver = false;
        this.startGame()

    }

    //action pass pipe
    passPipe(): void {
        this.result.addScore()
        if (this.btnSound.getChildByName('btnOn').active == true) {
            this.audioCtrl.onPlaySoundEffect(1)
        }
    }

    createPipe(): void {
        this.pipeQueue.addPool();
    }

    // contact 
    contactGroundPipe(): void {
        let collider = this.bird.getComponent(Collider2D)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }

    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        this.bird.hitSomething = true;
        if (this.btnSound.getChildByName('btnOn').active == true) {
            this.audioCtrl.onPlaySoundEffect(2)
        }
    }

    birdStruck(): void {
        this.contactGroundPipe();

        if (this.bird.hitSomething === true) {
            this.gameOver()

        }

    }

    update() {
        if (this.isOver == false) {
            this.birdStruck();

        }

        // không cho con chim xoay ( đang fix)
        // this.speed -= 0.05;
        // this.bird.birdLocation.y += this.speed;

        // var angle = -(this.speed/2) * 30;
        // if (angle >= 30) {
        //     angle = 30;
        // }
        // this.bird.birdLocation.z = angle;
    }
}


import { _decorator, Component, Node, CCInteger, input, Input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact, find, Sprite, Color, Button } from 'cc';
const { ccclass, property } = _decorator;

import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { AudioCtrl } from './AudioCtrl';
import { StoredBird } from './StoredBird';

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({
        type: Results,
        tooltip: 'results go here'
    })
    private result: Results;

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
    private _speed: number = 300;

    public get speed(): number {
        return this._speed;
    }
    
    @property({
        type: CCInteger,
    })
    private _pipeSpeed: number = 200;

    public get pipeSpeed(): number {
        return this._pipeSpeed;
    }
    
    private isOver: boolean;

    protected onLoad(): void {
        //User need to click for start
        this.initListener();
        //Score will reset  
        this.result.resetScore();
        //..
        this.isOver = true;
        //Game pause when start
        director.pause();

        //change color bird
        const color = find('StateNode')
        const colorParam = color.getComponent(StoredBird)
        let spriteBird = this.bird.getComponent(Sprite)
        if(colorParam.getTemp() === 1) {
            let changeColorGreen = spriteBird;
            changeColorGreen.color = Color.GREEN;
        }else if(colorParam.getTemp() === 2){
            let changeColorYellow = spriteBird;
            changeColorYellow.color = Color.YELLOW;
        }else {
            let changeColorRed = spriteBird;
            changeColorRed.color = Color.RED;
        }
    }

    protected initListener(): void {

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isOver === true) {
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            }
            if (this.isOver === false) {
                this.bird.fly();
                if (this.btnSound.getChildByName('btnOn').active === true) {
                    this.audioCtrl.onPlaySoundEffect(0);
                }
            }
        })
    }

    // testing method DELETE ME IN FINAL VERSION
    protected onKeyDown(event: EventKeyboard): void {
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

    protected backMenu(): void {
        director.loadScene('entry');
    }

    protected startGame(): void {
        this.result.hideResults();
        director.resume();
    }

    protected gameOver(): void {
        this.result.showResults();
        this.isOver = true;
        director.pause();
        if (this.btnSound.getChildByName('btnOn').active === true) {
            this.audioCtrl.onPlaySoundEffect(3);
        }
    }

    protected resetGame(): void {
        this.result.resetScore();
        this.pipeQueue.reset();
        this.isOver = false;
        this.startGame();
    }

    //action pass pipe
    public passPipe(): void {
        this.result.addScore();
        if (this.btnSound.getChildByName('btnOn').active === true) {
            this.audioCtrl.onPlaySoundEffect(1);
        }
    }

    public createPipe(): void {
        this.pipeQueue.addPool();
    }

    // contact 
    protected contactGroundPipe(): void {
        let collider = this.bird.getComponent(Collider2D)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        this.bird.hitSomething = true;
        if (this.btnSound.getChildByName('btnOn').active === true) {
            this.audioCtrl.onPlaySoundEffect(2);
        }
    }

    protected birdStruck(): void {
        this.contactGroundPipe();
        if (this.bird.hitSomething === true) {
            this.gameOver();
        }
    }

    protected update(): void {
        if (this.isOver === false) {
            this.birdStruck();
        }
    }
}
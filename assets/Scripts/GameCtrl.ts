import { _decorator, Component, Node, CCInteger, input, Input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';  
import { PipePool } from './PipePool';
import { AudioCtrl } from './AudioCtrl';
import { MenuGame } from './MenuGame';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type: Ground,
        tooltip: 'this is ground'
    })
    public ground: Ground

    @property({
        type: Results,
        tooltip: 'results go here'
    })
    public result: Results

    @property({
        type: Bird
    })
    public bird: Bird;

    @property({
        type: PipePool
    })
    public pipeQueue: PipePool;

    @property({
        type: AudioCtrl
    })
    public audioCtrl: AudioCtrl;

    @property({
        type: Node,
        tooltip: 'this is btnSound'
    })
    public btnSound: Node;

    @property({
        type: CCInteger,
    })
    public speed: number = 300;

    @property({
        type: CCInteger,
    })
    public pipeSpeed: number = 200;

    public isOver: boolean;
    onLoad() {
    
        //User cần click phím để bắt đầu
        this.initListener();
        //Điểm sẽ reset lại 
        this.result.resetScore();
        //..
        this.isOver = true;
        //Trò chơi sẽ pause khi mới vào
        director.pause();
    }

    initListener() {
       
            input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
            
            this.node.on(Node.EventType.TOUCH_START, () => {
             
                if(this.isOver == true) {
                    this.resetGame();
                    this.bird.resetBird();
                    this.startGame();
                }
                if(this.isOver == false) {
                    this.bird.fly();
                    if(this.btnSound.getChildByName('btnOn').active == true){
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

    startGame() {
        this.result.hideResults();
        director.resume()
    }

    gameOver() {

        this.result.showResults()
        this.isOver = true;
        director.pause();
        if(this.btnSound.getChildByName('btnOn').active == true){
            this.audioCtrl.onPlaySoundEffect(3)
        }
        
    }

    resetGame() {
        this.result.resetScore()
        this.pipeQueue.reset()
        this.isOver = false;
        this.startGame()

    }
    
    //vượt qua ống
    passPipe() {
        this.result.addScore()
        if(this.btnSound.getChildByName('btnOn').active == true){
            this.audioCtrl.onPlaySoundEffect(1)
        }
    }

    createPipe() {
        this.pipeQueue.addPool();
    }

    // va chamj
    contactGroundPipe() {
        let collider = this.bird.getComponent(Collider2D)
        if(collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.bird.hitSomething = true;
        if(this.btnSound.getChildByName('btnOn').active == true){
            this.audioCtrl.onPlaySoundEffect(2)
        }
    }

    birdStruck() {
        this.contactGroundPipe();

        if(this.bird.hitSomething === true) {
            this.gameOver()
            
        }

    }

    update() {
        if(this.isOver == false) {
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


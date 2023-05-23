import { _decorator, Component, Label} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {

    @property({
        type: Label
    })
    private scoreLabel: Label;

    @property({
        type: Label
    })
    private highScore: Label;

    @property({
        type: Label,
        tooltip: 'try Again here'
    })
    private resultEnd: Label;

    private maxScore: number = 0;
    private currentScore: number;

    protected updateScore(num: number): void {
        this.currentScore = num;
        this.scoreLabel.string = `${this.currentScore}`;
    }

    public resetScore(): void {
        this.updateScore(0);
        this.hideResults();

    }

    public addScore(): void {
        this.updateScore(this.currentScore + 1);
    }

    public showResults(): void {
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        localStorage.setItem('maxScore', JSON.stringify(this.maxScore));
        this.highScore.string = `High Score: ${this.maxScore}`;
        this.resultEnd.node.active = true;
        this.highScore.node.active = true;
    }

    public hideResults(): void {
        this.highScore.node.active = false;
        this.resultEnd.node.active = false;
    }
}

import { _decorator, Component, Node, Label, director, sys, System } from 'cc';
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
    // arryScore: string[] = [];

    protected updateScore(num: number): void {
        this.currentScore = num; // tham số
        //    if(localStorage.getItem('maxScore') != null) {
        //         localStorage.setItem('maxScore',JSON.stringify(this.maxScore))
        //    }
        this.scoreLabel.string = ('' + this.currentScore);


    }

    resetScore(): void {
        this.updateScore(0)
        // var getDataScore = JSON.parse(localStorage.getItem('maxScore'))
        // this.maxScore = getDataScore;
        this.hideResults();

    }

    addScore(): void {

        this.updateScore(this.currentScore + 1)


    }

    showResults(): void {
        this.maxScore = Math.max(this.maxScore, this.currentScore)
        if (localStorage.getItem('maxScore') || JSON.parse(localStorage.getItem('maxScore')).length === 0) {
            localStorage.setItem('maxScore', JSON.stringify(this.maxScore));
        }
        this.highScore.string = `High Score: ${this.maxScore}`;


        this.resultEnd.node.active = true;
        this.highScore.node.active = true;
    }

    hideResults(): void {
        this.highScore.node.active = false;
        this.resultEnd.node.active = false;
    }

}


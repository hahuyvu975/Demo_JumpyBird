import { _decorator, Component, Node, Label, director, sys, System } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {

    @property({
        type: Label
    })
    public scoreLabel: Label;

    @property({
        type: Label
    })
    public highScore: Label;

    @property({
        type: Label,
        tooltip: 'try Again here'
    })
    public resultEnd: Label;

    maxScore: number = 0;
    currentScore: number;
    // arryScore: string[] = [];

    updateScore(num: number) {
        this.currentScore = num; // tham số
    //    if(localStorage.getItem('maxScore') != null) {
    //         localStorage.setItem('maxScore',JSON.stringify(this.maxScore))
    //    }
        this.scoreLabel.string = ('' + this.currentScore);

        
    }

    resetScore() {
        this.updateScore(0)
        var getDataScore = JSON.parse(localStorage.getItem('maxScore'))
        this.maxScore = getDataScore;
        this.hideResults();

    }

    addScore() {

        this.updateScore(this.currentScore + 1)
        

    }

    showResults() {
        this.maxScore = Math.max(this.maxScore, this.currentScore)
        if(localStorage.getItem('maxScore') || JSON.parse(localStorage.getItem('maxScore')).length === 0){
            localStorage.setItem('maxScore', JSON.stringify(this.maxScore));
        }
        this.highScore.string = `High Score: ${this.maxScore}`;
       

        this.resultEnd.node.active = true;
        this.highScore.node.active = true;
    }

    hideResults() {
        this.highScore.node.active = false;
        this.resultEnd.node.active = false;
    }

}


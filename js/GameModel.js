import {gameState} from "./data/data.js";
import {questions} from "./data/data.js";
import {answersCheck} from "./utils.js";


export default class GameModel {
  constructor(playerName) {
    this.QUESTION_TIME = 30;
    this.playerName = playerName;
    this.state = gameState;
    this.restart();
  }

  restart() {
    this.state = gameState;
  }

  saveAnswer(answer) {
    answer.time = this.QUESTION_TIME - this.state.currentTime;
    this.state.answers.push(answer);
  }

  getCurrentQuestion() {
    return questions[this.state.question];
  }

  incrementCurrentQuestion() {
    this.state.question += 1;
  }

  checkAnswers(answers) {
    return isCorrect = answersCheck(this.state, answers);
  }

  outOfLives() {
    return this.state.lives <= 0;
  }

  outOfQuestions() {
    return this.state.question >= questions.length;
  }

  ifOutOfTimeAndLives() {
    if(this.state.currentTime <= 0 && this.state.lives === 1) {
      this.state.lives -= 1;
      this.state.result = `fail`;
      return true;
    }
  }

  ifOutOfTime() {
    if(this.state.currentTime <= 0 && this.state.lives > 1) {
      this.state.lives -= 1;
      return true;
    }
  }

  readyToFinish() {
    if(this.outOfLives()) {
      this.state.result = `fail`;
      return true;
    }
    if(this.outOfQuestions()) {
      this.state.result = `Победа`;
      return true;
    }
    return false;
  }

  oneSecondTick() {
    this.state.currentTime -= 1;
  }

  resetTime() {
    this.state.currentTime = this.QUESTION_TIME;
  }
}

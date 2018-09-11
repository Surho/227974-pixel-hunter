import {gameState} from "./data/data.js";
import {questions} from "./data/data.js";
import {answersCheck} from "./utils.js";


export default class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.state = gameState;
    this.restart();
  }

  restart() {
    this.state = gameState;
  }

  saveAnswer(answer) {
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
    return this.state.question >= questions.length
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
}

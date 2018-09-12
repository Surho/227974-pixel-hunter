import {gameState} from "./data/data.js";
import {questions} from "./data/data.js";
import {answersCheck} from "./utils.js";

/**
 * всю работу с данными и состоянием
 * слил в модель и далее использовал методы
 * из модели в нашем презентере (GameModel) при
 * любой необходимости из изменять
 */
export default class GameModel {
  constructor(playerName) {
    this.QUESTION_TIME = 30;
    this.playerName = playerName;
    this._state = gameState;
  }

  saveAnswer(answer) {
    answer.time = this.QUESTION_TIME - this._state.currentTime;
    this._state.answers.push(answer);
  }

  getCurrentQuestion() {
    return questions[this._state.question];
  }

  incrementCurrentQuestion() {
    this._state.question += 1;
  }

  checkAnswers(answers) {
    return isCorrect = answersCheck(this._state, answers);
  }

  outOfLives() {
    return this._state.lives <= 0;
  }

  outOfQuestions() {
    return this._state.question >= questions.length;
  }

  ifShouldHurry() {
    return this._state.currentTime <= 5;
  }

  ifOutOfTimeAndLives() {
    if(this._state.currentTime < 0 && this._state.lives === 1) {
      this._state.lives -= 1;
      this._state.result = `Fail 🤦`;
      return true;
    }
    return false;
  }

  ifOutOfTime() {
    if(this._state.currentTime < 0 && this._state.lives > 1) {
      this._state.lives -= 1;
      return true;
    }
    return false;
  }

  readyToFinish() {
    if(this.outOfLives()) {
      this._state.result = `Fail 🤦`;
      return true;
    }
    if(this.outOfQuestions()) {
      this._state.result = `Победа`;
      return true;
    }
    return false;
  }

  setCurrentTime(time) {
    this._state.currentTime = time;
  }

  resetTime() {
    this._state.currentTime = this.QUESTION_TIME;
  }
}

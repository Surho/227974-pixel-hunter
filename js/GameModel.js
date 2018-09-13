import {gameState} from "./data/data.js";
import {questions} from "./data/data.js";
import {answersCheck} from "./utils.js";

/**
 * всю работу с данными и состоянием
 * слил в модель и далее использовал методы
 * из модели в нашем презентере (GameModel) при
 * любой необходимости из изменять
 */

const QUESTION_TIME = 30;

export default class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this._state = Object.assign({}, gameState);
  }

  saveAnswer(answer) {
    answer.time = QUESTION_TIME - this._state.currentTime;
    this._state.answers.push(answer);
  }

  getCurrentQuestion() {
    return questions[this._state.question];
  }

  incrementCurrentQuestion() {
    this._state.question += 1;
  }

  checkAnswers(answers) {
    const isCorrect = answersCheck(this._state, answers);
    return isCorrect;
  }

  outOfLives() {
    return this._state.lives <= 0;
  }

  outOfQuestions() {
    console.log(this._state.question, questions.length)
    return this._state.question >= questions.length;
  }

  ifShouldHurry() {
    return this._state.currentTime <= 5;
  }

  ifOutOfTimeAndLives() {
    if (this._state.currentTime < 0 && this._state.lives === 1) {
      this._state.lives -= 1;
      this._state.result = `Fail 🤦`;
      return true;
    }
    return false;
  }

  ifOutOfTime() {
    if (this._state.currentTime < 0 && this._state.lives > 1) {
      this._state.lives -= 1;
      this.setCurrentTime(QUESTION_TIME);
      return true;
    }
    return false;
  }

  readyToFinish() {
    if (this.outOfLives()) {
      this._state.result = `Fail 🤦`;
      return true;
    }
    if (this.outOfQuestions()) {
      this._state.result = `Победа`;
      return true;
    }
    return false;
  }

  setCurrentTime(time) {
    this._state.currentTime = time;
  }
}

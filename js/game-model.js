import {gameState} from "./data/data.js";

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
    this.data = {};
  }

  answersCheck(...answers) {
    let isCorrect;
    const currentQuestion = this.getCurrentQuestion();
    const questionVariants = currentQuestion.answers.map((answer) => {
      return answer.value;
    });

    if (questionVariants.length === 1) {
      isCorrect = (answers[0] === questionVariants[0]);
    }

    if (questionVariants.length === 2) {
      isCorrect = questionVariants.every((answer, i) => {
        return answer === answers[i];
      });
    }

    if (questionVariants.length === 3) {
      let double = 0;
      questionVariants.forEach((answer) => {
        if (answer === answers[0]) {
          double += 1;
        }
      });
      isCorrect = (double === 2) ? false : true;
    }
    if (isCorrect === false) {
      this._state.lives -= 1;
    }
    return isCorrect;
  }

  saveAnswer(answer) {
    answer.time = QUESTION_TIME - this._state.currentTime;
    this._state.answers.push(answer);
  }

  getCurrentQuestion() {
    return this.data[this._state.question];
  }

  incrementCurrentQuestion() {
    this._state.question += 1;
  }

  outOfLives() {
    return this._state.lives <= 0;
  }

  outOfQuestions() {
    return this._state.question >= this.data.length;
  }

  ifShouldHurry() {
    return this._state.currentTime <= 5;
  }

  ifOutOfTime() {
    if (this._state.currentTime < 0) {
      this._state.lives -= 1;
      this.setCurrentTime(QUESTION_TIME);
      return true;
    }
    return false;
  }

  ifGameEnds() {
    if (this.outOfLives()) {
      this._state.result = `Fail &#128078;`;
      return true;
    }
    if (this.outOfQuestions()) {
      this._state.result = `Победа &#127881;`;
      return true;
    }
    return false;
  }

  setCurrentTime(time) {
    this._state.currentTime = time;
  }
}

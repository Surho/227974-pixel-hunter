import GameView from '../view/game-view.js';
import Header from './header.js';
import {statsLine} from './stats-line.js';
import Application from '../application.js';
import Timer from '../timer.js';

const PictureTypeName = {
  NAME0: `question0`,
  NAME1: `question1`
};

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.timer = new Timer((timeLeft, reset) => {
      this.model.setCurrentTime(timeLeft);

      if (!reset) {
        if (this.model.checkHurry()) {
          this.container.classList.add(`should-Hurry`);
        }
        if (!this.timeCheck()) {
          this.updateHeader();
        }
      }
    }, false);

    this.timer.resetTime();
    this.header = new Header(this.model._state, true).element;
    this.container = document.createElement(`div`);
    this.statsLine = statsLine(this.model._state);

    this.createGameContent = () => {
      this.view = new GameView(this.model.getCurrentQuestion());
      this.initScreen();
      return this.view.element;
    };
    this.gameContent = this.createGameContent();
  }

  initScreen() {
    this.view.onChangeType1 = (value) => {
      let isCorrect = this.model.answersCheck(value);
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: value, isCorrect});
      this.timer.stopCount();
      Application.showGame(this.model);
    };

    let gameChoice0 = null;
    let gameChoice1 = null;
    this.view.onChangeType2 = (value, name) => {
      if (name === PictureTypeName.NAME0) {
        gameChoice0 = value;
      }
      if (name === PictureTypeName.NAME1) {
        gameChoice1 = value;
      }
      if (gameChoice0 && gameChoice1) {
        let isCorrect = this.model.answersCheck(gameChoice0, gameChoice1);
        this.model.incrementCurrentQuestion();
        this.model.saveAnswer({answers: [gameChoice0, gameChoice1], isCorrect});
        this.timer.stopCount();
        Application.showGame(this.model);
      }
    };

    this.view.onClick = (value) => {
      let isCorrect = this.model.answersCheck(value);
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: value, isCorrect});
      this.timer.stopCount();
      Application.showGame(this.model);
    };
  }

  timeCheck() {
    if (this.model.checkTimeEnd()) {
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: null, isCorrect: false});
      Application.showGame(this.model);
      return true;
    }
    return false;
  }

  updateHeader() {
    const newHeader = new Header(this.model._state, true, this.timer);
    this.container.replaceChild(newHeader.element, this.container.firstChild);
    this.header = newHeader;
  }

  startGame() {
    if (this.container.classList.contains(`should-Hurry`)) {
      this.container.classList.remove(`should-Hurry`);
    }
    this.timer.startCount();
  }

  get element() {
    this.container.appendChild(this.header);
    this.container.appendChild(this.gameContent);
    this.container.appendChild(this.statsLine);

    return this.container;
  }
}

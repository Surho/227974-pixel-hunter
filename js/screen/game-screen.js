import GameView from '../view/game-view.js';
import Header from './header.js';
import {statsLine} from './stats-line.js';
import Application from '../application.js';
import Timer from '../timer.js';

const TYPE_2PICTURE_NAME0 = `question0`;
const TYPE_2PICTURE_NAME1 = `question1`;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.timer = new Timer((timeLeft, reset) => {
      this.model.setCurrentTime(timeLeft);

      if (!reset) {
        if (this.model.ifShouldHurry()) {
          this.gameScreen.classList.add(`should-Hurry`);
        }
        this.timeCheck();
        this.updateHeader();
      }
    }, false);

    this.timer.resetTime();
    this.header = new Header(this.model._state, true).element;
    this.gameScreen = document.createElement(`div`);
    this.statsLine = statsLine(this.model._state);

    this.createGameContent = () => {
      this.gameView = new GameView(this.model.getCurrentQuestion());
      this.initScreen();
      return this.gameView.element;
    };
    this.gameContent = this.createGameContent();
  }

  initScreen() {
    this.gameView.onChangeType1 = (value) => {
      let isCorrect = this.model.answersCheck(value);
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: value, isCorrect});
      this.timer.stopCount();
      Application.showGame(this.model);
    };

    let gameChoice0 = null;
    let gameChoice1 = null;
    this.gameView.onChangeType2 = (value, name) => {
      if (name === TYPE_2PICTURE_NAME0) {
        gameChoice0 = value;
      }
      if (name === TYPE_2PICTURE_NAME1) {
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

    this.gameView.onClick = (value) => {
      let isCorrect = this.model.answersCheck(this.model._state, value);
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: value, isCorrect});
      this.timer.stopCount();
      Application.showGame(this.model);
    };
  }

  timeCheck() {
    if (this.model.ifOutOfTime()) {
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: null, isCorrect: false});
      Application.showGame(this.model);
    }
  }

  updateHeader() {
    const newHeader = new Header(this.model._state, true);
    this.gameScreen.replaceChild(newHeader.element, this.gameScreen.firstChild);
    this.header = newHeader;
  }

  startGame() {
    if (this.gameScreen.classList.contains(`should-Hurry`)) {
      this.gameScreen.classList.remove(`should-Hurry`);
    }
    this.timer.startCount();
  }

  get element() {
    this.gameScreen.appendChild(this.header);
    this.gameScreen.appendChild(this.gameContent);
    this.gameScreen.appendChild(this.statsLine);

    return this.gameScreen;
  }
}

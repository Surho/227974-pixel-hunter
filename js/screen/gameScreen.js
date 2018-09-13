import {answersCheck, countFinalStatistics} from '../utils.js';
import GameView from '../view/game-view.js';
import {resizePicsOnScreen} from '../resize.js';
import Header from './header.js';
import {statsLine} from './statsLine.js';
import Application from '../Application.js';
import Timer from '../timer.js';

const TYPE_2PICTURE_NAME0 = `question0`;
const TYPE_2PICTURE_NAME1 = `question1`;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.timer = new Timer((timeLeft) => {
      this.model.setCurrentTime(timeLeft);

      if (this.model.ifShouldHurry()) {
        this.mainContainer.classList.add(`should-Hurry`);
      }

      if (this.timeCheck()) {
        return;
      }

      this.updateHeader()
    });

    this.mainContainer = document.getElementById(`main`);
    this.header = new Header(this.model._state, true);
    this.statsLine = statsLine(this.model._state);

    this.createGameContent = () => {
      this.gameView = new GameView(this.model.getCurrentQuestion());
      this.initScreen();
      resizePicsOnScreen(this.gameView.element);
      return this.gameView.element;
    };
    this.gameContent = this.createGameContent();
  }

  initScreen() {
      this.gameView.onChangeType1 = (value) => {
      let isCorrect = answersCheck(this.model._state, value);
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: value, isCorrect});
      this.updateGame(this.model._state);
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
        let isCorrect = answersCheck(this.model._state, gameChoice0, gameChoice1);
        this.model.incrementCurrentQuestion();
        this.model.saveAnswer({answers: [gameChoice0, gameChoice1], isCorrect});
        this.updateGame(this.model._state);
      }
    };

    this.gameView.onClick = (value) => {
      let isCorrect = answersCheck(this.model._state, value);
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: value, isCorrect});
      this.updateGame(this.model._state);
    };
  }

  timeCheck() {
    if (this.model.ifOutOfTime()) {
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: null, isCorrect: false});
      this.updateGame(this.model._state);
    }

    if (this.model.ifOutOfTimeAndLives()) {
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: null, isCorrect: false});
      this.finish();
      return true;
    }
    return false;
  }

  updateHeader() {
    const newHeader = new Header(this.model._state, true);
    this.mainContainer.replaceChild(newHeader.element, this.mainContainer.firstChild);
    this.header = newHeader;
  }

  finish() {
    this.timer.stopCount();
    const statistics = countFinalStatistics(this.model._state);
    Application.showStats(statistics, this.model._state);
  }

  updateGame() {
    if (this.model.readyToFinish()) {
      this.finish();
      return;
    }
    this.header = new Header(this.model._state, true);
    this.statsLine = statsLine(this.model._state);
    this.gameContent = this.createGameContent();
    this.startGame();
  }

  startGame() {
    this.mainContainer.classList.remove(`should-Hurry`);

    this.timer.startCount();

    this.mainContainer.innerHTML = ``;
    this.mainContainer.appendChild(this.header.element);
    this.mainContainer.appendChild(this.gameContent);
    this.mainContainer.appendChild(statsLine(this.model._state));
  }
}

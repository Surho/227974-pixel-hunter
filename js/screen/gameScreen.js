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
  constructor (model) {
    this.model = model;
    this.timer = new Timer();
    this.mainContainer = document.getElementById(`main`);

    this.header = new Header(this.model.state, true);
    this.statsLine = statsLine(this.model.state);
    this.gameContent = () => {
      this.gameView = new GameView(this.model.getCurrentQuestion());

      this.gameView.onChangeType1 = (value) => {

        let isCorrect = answersCheck(this.model.state, value);

        this.model.incrementCurrentQuestion();
        this.model.saveAnswer({time: Math.random() * 30, answers: value, isCorrect});

        this.updateGame(this.model.state);
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

          let isCorrect = answersCheck(this.model.state, gameChoice0, gameChoice1);

          this.model.incrementCurrentQuestion();
          this.model.saveAnswer({time: Math.random() * 30, answers: [gameChoice0, gameChoice1], isCorrect});

          this.updateGame(this.model.state);
        }
      };

      this.gameView.onClick = (value) => {
        let isCorrect = answersCheck(this.model.state, value);

        this.model.incrementCurrentQuestion();
        this.model.saveAnswer({time: Math.random() * 30, answers: value, isCorrect});

        this.updateGame(this.model.state);
      };

      resizePicsOnScreen(this.gameView.element);

      return this.gameView.element;
    }
  }

  // countTime() {
  //   const TOTAL_TIME = 30
  //   let timer = setInterval(() => {
  //     if(this.model.state.currentTime <= 0) {
  //       clearInterval(timer);
  //     }
  //     this.model.state.currentTime = TOTAL_TIME - 1;
  //     this.updateHeader(this.model.state);
  //   }, 1000)
  // }

  updateHeader(state) {
    this.header = new Header(state, true);
    this.mainContainer.appendChild(this.header.element);
  }

  updateGame(state) {
    if(this.model.readyToFinish()) {
      const statistics = countFinalStatistics(this.model.state, this.model.state.result);
      Application.showStats(statistics, state);
      return;
    };
    this.header = new Header(state, true);
    this.statsLine = statsLine(state);
    this.gameContent();
    this.startGame();
  }

  startGame() {
    // this.countTime();
    this.mainContainer.innerHTML = ``;
    this.mainContainer.appendChild(this.header.element);
    this.mainContainer.appendChild(this.gameContent());
    this.mainContainer.appendChild(statsLine(this.model.state));
  }
};

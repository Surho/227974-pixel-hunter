import {answersCheck} from './utils.js';
import {gameState} from './data/data.js';
import {questions} from './data/data.js';
import {screenChanger} from './screen-changer.js';
import GameScreenView from './gameScreen-view.js';

const TYPE_2PICTURE_NAME0 = `question0`;
const TYPE_2PICTURE_NAME1 = `question1`;

export default class GameScreen {
  constructor(question) {
    this.gameScreen = new GameScreenView(question);

    this.gameScreen.onChangeType1 = () => {
      let target = event.target;
      let isCorrect = answersCheck(gameState, target.value);

      gameState.question += 1;
      gameState.answers.push({time: Math.random() * 30, answers: target.value, isCorrect});

      screenChanger(gameState, questions);
    };

    let gameChoice0 = null;
    let gameChoice1 = null;
    this.gameScreen.onChangeType2 = (evt) => {
      let target = evt.target;
      if (target.name === TYPE_2PICTURE_NAME0) {
        gameChoice0 = target.value;
      }
      if (target.name === TYPE_2PICTURE_NAME1) {
        gameChoice1 = target.value;
      }
      if (gameChoice0 && gameChoice1) {

        let isCorrect = answersCheck(gameState, gameChoice0, gameChoice1);

        gameState.question += 1;
        gameState.answers.push({time: Math.random() * 30, answers: [gameChoice0, gameChoice1], isCorrect});
        screenChanger(gameState, questions);
      }
    };

    this.gameScreen.onClick = () => {
      let target = event.target;
      let isCorrect = answersCheck(gameState, target.dataset.value);

      gameState.question += 1;
      gameState.answers.push({time: Math.random() * 30, answers: target.dataset.value, isCorrect});

      screenChanger(gameState, questions);
    };
  }
}

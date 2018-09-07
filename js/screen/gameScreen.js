import {answersCheck} from '../utils.js';
import {gameState} from '../data/data.js';
import {questions} from '../data/data.js';
import {screenChanger} from '../screen-changer.js';
import GameScreenView from '../view/gameScreen-view.js';
import {resizePicsOnScreen} from '../resize.js';

const TYPE_2PICTURE_NAME0 = `question0`;
const TYPE_2PICTURE_NAME1 = `question1`;

export const gameScreen = (question) => {
  const gameScreenView = new GameScreenView(question);

  gameScreenView.onChangeType1 = (value) => {
    let isCorrect = answersCheck(gameState, value);

    gameState.question += 1;
    gameState.answers.push({time: Math.random() * 30, answers: value, isCorrect});

    screenChanger(gameState, questions);
  };

  let gameChoice0 = null;
  let gameChoice1 = null;
  gameScreenView.onChangeType2 = (value, name) => {
    if (name === TYPE_2PICTURE_NAME0) {
      gameChoice0 = value;
    }
    if (name === TYPE_2PICTURE_NAME1) {
      gameChoice1 = value;
    }
    if (gameChoice0 && gameChoice1) {

      let isCorrect = answersCheck(gameState, gameChoice0, gameChoice1);

      gameState.question += 1;
      gameState.answers.push({time: Math.random() * 30, answers: [gameChoice0, gameChoice1], isCorrect});

      screenChanger(gameState, questions);
    }
  };

  gameScreenView.onClick = (value) => {
    let isCorrect = answersCheck(gameState, value);

    gameState.question += 1;
    gameState.answers.push({time: Math.random() * 30, answers: value, isCorrect});

    screenChanger(gameState, questions);
  };

  resizePicsOnScreen(gameScreenView.element);

  return gameScreenView.element;

};

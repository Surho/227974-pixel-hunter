import {gameState} from './data/data.js';

const main = document.querySelector(`#main`);

export const render = (...elements) => {
  main.innerHTML = ``;
  elements.forEach((element) => {
    main.appendChild(element);
  });
};

export const getElementFromHTML = (str) => {
  const element = document.createElement(`template`);
  element.innerHTML = str;
  return element.content;
};

export const gameStateReset = () => {
  gameState.question = 0;
  gameState.lives = 3;
  gameState.answers = [];
  gameState.result = null;
};

export const countFinalStatistics = (state) => {
  const answerStatistics = {sum: 0, answersOrder: [], fast: 0, normal: 0, slow: 0,
    lives: state.lives, total: 0};

  state.answers.forEach((answer) => {
    if (!answer.isCorrect) {
      answerStatistics.answersOrder.push(`wrong`);
    }

    if (answer.isCorrect) {
      answerStatistics.sum += 100;
      if (answer.time < 10) {
        answerStatistics.answersOrder.push(`fast`);
        answerStatistics.fast += 1;
        answerStatistics.sum += 50;
      }
      if (answer.time > 20) {
        answerStatistics.answersOrder.push(`slow`);
        answerStatistics.slow += 1;
        answerStatistics.sum -= 50;
      }
      if (answer.time >= 10 && answer.time <= 20) {
        answerStatistics.answersOrder.push(`normal`);
        answerStatistics.normal += 1;
      }
    }
  });
  answerStatistics.sum += (state.lives * 50);

  answerStatistics.total = (answerStatistics.normal + answerStatistics.fast + answerStatistics.slow) * 100;

  if (answerStatistics.lives < 0) {
    answerStatistics.total = `fail`;
    answerStatistics.sum = 0;
  }

  answerStatistics.result = state.result;

  return answerStatistics;
};

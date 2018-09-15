import {gameState} from './data/data.js';

const main = document.querySelector(`#main`);

export const render = (...elements) => {
  main.innerHTML = ``;
  elements.forEach((element) => {
    main.appendChild(element);
  });
};

export function gameStateReset() {
  gameState.question = 0;
  gameState.lives = 3;
  gameState.answers = [];
  gameState.result = null;
}

export function countFinalStatistics(state) {
  const answerStatistics = {sum: 0, fast: 0, normal: 0, slow: 0, lives: state.lives};

  state.answers.forEach((answer) => {
    if (answer.isCorrect) {
      answerStatistics.sum += 100;
      if (answer.time < 10) {
        answerStatistics.fast += 1;
        answerStatistics.sum += 50;
      }
      if (answer.time > 20) {
        answerStatistics.slow += 1;
        answerStatistics.sum -= 50;
      }
      if (answer.time >= 10 && answer.time <= 20) {
        answerStatistics.normal += 1;
      }
    }
  });
  answerStatistics.sum += (state.lives * 50);

  answerStatistics.result = state.result;

  return answerStatistics;
}

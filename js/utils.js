import {gameState} from './data/data.js';

const initialValues = {
  LIVES: 3,
  QUESTION_NUMBER: 0
};

const points = {
  CORRECT: 100,
  BONUS: 50
};

const timeBorders = {
  FAST: 10,
  SLOW: 20
};

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
  gameState.question = initialValues.QUESTION_NUMBER;
  gameState.lives = initialValues.LIVES;
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
      answerStatistics.sum += points.CORRECT;
      if (answer.time < timeBorders.FAST) {
        answerStatistics.answersOrder.push(`fast`);
        answerStatistics.fast += 1;
        answerStatistics.sum += points.BONUS;
      }
      if (answer.time > timeBorders.SLOW) {
        answerStatistics.answersOrder.push(`slow`);
        answerStatistics.slow += 1;
        answerStatistics.sum -= points.BONUS;
      }
      if (answer.time >= timeBorders.FAST && answer.time <= timeBorders.SLOW) {
        answerStatistics.answersOrder.push(`normal`);
        answerStatistics.normal += 1;
      }
    }
  });
  answerStatistics.sum += (state.lives * points.BONUS);

  answerStatistics.total = (answerStatistics.normal + answerStatistics.fast + answerStatistics.slow) * points.CORRECT;

  if (answerStatistics.lives < 0) {
    answerStatistics.total = `fail`;
    answerStatistics.sum = 0;
  }

  answerStatistics.result = state.result;

  return answerStatistics;
};

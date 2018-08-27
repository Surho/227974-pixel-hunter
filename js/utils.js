import {gameState} from './data/data.js';
import {questions} from './data/data.js';
import { statsLine } from './statsLine.js';

const main = document.querySelector(`#main`);

/**
 * рендерит конкретный экран element в основной контейнет
 * записанный выше
 * @param {str} str - строка html
 * @return {node} element.content - #documentFragment из строки
 */
export const getElementFromTemplate = (str) => {
  const element = document.createElement(`template`);

  element.innerHTML = str;

  return element.content;
};


/**
 * рендерит конкретный экран
 * @param {node} element - контент экрана, генерируется из
 * функций каждого модуля
 * @param {node} container - куда рендерить
 */

export const render = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

function gameStateReset() {
  gameState.question = 0;
  gameState.lives = 3;
  gameState.answers = [];
}

export const initButtonBack = (screen, backScreen) => {
  const buttonBack = screen.querySelector(`.back`);
  buttonBack.addEventListener(`click`, () => {
    gameStateReset();
    render(backScreen());
  });
};

export function answersCheck(state, ...answers) {
  const questionNumber = state.question;
  const currentQuestion = questions[questionNumber];
  const realAnswers = currentQuestion.answers;


  let isCorrect = realAnswers.every( (answer, i) => {
    if(!answers[i]) return true;
    return answer.value === answers[i];
  });

  if(!isCorrect) {
    state.lives -= 1;
    return false;
  }
  return true;
}


import {gameState} from './data/data.js';
import {questions} from './data/data.js';

const main = document.querySelector(`#main`);
/**
 * рендерит конкретный экран
 * @param {array} elements - элемент(ы), которые
 * последовательно выгружаются в main
 */

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

/**
 * @param {object} state - состояние игры
 * @param {array}  answers -  массив из одного ответа
 * или массив ответов и игрока(в случае экрана  с двумя картинками)
 * @var questionNumber - номер текущего вопроса из gameState
 * @var currentQuestion - соотвествующий вопрос взятый из массива вопросов
 * @var realAnswers - данные вопроса, содержащие value = paint / photo
 */

export function answersCheck(state, ...answers) {
  const questionNumber = state.question;
  const currentQuestion = questions[questionNumber];
  const realAnswers = currentQuestion.answers;

  let isCorrect = realAnswers.every((answer, i) => {
    if (!answers[i]) {
      return true;
    }
    return answer.value === answers[i];
  });

  if (!isCorrect) {
    state.lives -= 1;
    return false;
  }
  return true;
}

/**
 *
 * @param {object} state -состояние игры
 * @param {string} result - строка, победа или fail
 * по результатам игры
 * @return {object} answerStatistics - об  ьект с подробной статистикой
 */
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

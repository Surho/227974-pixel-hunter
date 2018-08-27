import {getElementFromTemplate, initButtonBack, render} from './utils.js';
import {statsLineTemplate} from './statsLine.js';
import {gameState} from './data/data.js';
import greeting from './greeting.js';
import {headerTemplate} from './header.js';

function countFinalScore(state) {
  state.finalScore = {sum: 0, fast: 0, slow: 0};
  let finalScore = state.finalScore;
  state.answers.forEach((answer) => {
    if(answer.isCorrect) {
      finalScore.sum += 100;
      if(answer.time < 10) {
        finalScore.sum += 50;
        finalScore.fast += 1;
      }
      if(answer.time > 20) {
        finalScore.sum -= 50;
        finalScore.slow -= 1;
      }
    }
  });
  finalScore.sum += (state.lives * 50);
  return finalScore;
}

const finalScore = countFinalScore(gameState);

const fastBonusTemplate = (state) => {
  let template;
  if(state.finalScore.fast > 0) {
    template = `
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${state.finalScore.fast}<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${state.finalScore.fast * 50}/td>
    </tr>`
  } else {
    return ``;
  }
  return template;
}

const slowBonusTemplate = (state) => {
  let template;
  if(state.finalScore.slow > 0) {
    template = `
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${state.finalScore.slow}<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">-${state.finalScore.slow * 50}/td>
    </tr>`
  } else {
    return ``;
  }
  return template;
}

const livesBonusTemplate = (state) => {
  let template;
  if(score.lives > 0) {
    template = `
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${state.lives}<span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${state.lives * 50}</td>
    </tr>`
  } else {
    return ``;
  }
  return template;
}

const statisticTemplate = (state) => {
  return `${headerTemplate}
  <section class="result">
    <h2 class="result__title">${state.result}</h2>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${statsLineTemplate(state)}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${finalScore.sum}</td>
      </tr>
      ${fastBonusTemplate(state)}
      ${livesBonusTemplate(state)}
      ${slowBonusTemplate(state)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${gameState.finalScore.sum}</td>
      </tr>
    </table>
  `
}


const stats = () => {
  const elem = getElementFromTemplate(statisticTemplate(gameState));
  initButtonBack(elem, greeting);
  return elem;
};

export default stats;

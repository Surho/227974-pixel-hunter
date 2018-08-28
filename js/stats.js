import {getElementFromTemplate, initButtonBack, render} from './utils.js';
import {statsLineTemplate} from './statsLine.js';
import {gameState} from './data/data.js';
import greeting from './greeting.js';
import {headerTemplate} from './header.js';

function countFinalStatistics(state) {
  const answerStatistics = {sum: 0, fast: 0, normal: 0, slow: 0}
  console.log(state.answers);
  state.answers.forEach((answer) => {
    if(answer.isCorrect) {
      answerStatistics.sum += 100;
      if(answer.time < 10) {
        answerStatistics.fast += 1;
        answerStatistics.sum += 50;
      }
      if(answer.time > 20) {
        answerStatistics.slow += 1;
        answerStatistics.sum -= 50;
      } else {
        answerStatistics.normal += 1;
      }
    }
  });
  answerStatistics.sum += (state.lives * 50);
  return answerStatistics;
}


const fastBonusTemplate = (statistics) => {
  let template;
  if(statistics.fast > 0) {
    template = `
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${statistics.fast}<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${statistics.fast * 50}/td>
    </tr>`
  } else {
    return ``;
  }
  return template;
}

const slowBonusTemplate = (statistics) => {
  let template;
  if(statistics.slow > 0) {
    template = `
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${statistics.slow}<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">-${statistics.slow * 50}/td>
    </tr>`
  } else {
    return ``;
  }
  return template;
}

const livesBonusTemplate = (state) => {
  let template;
  if(state.lives > 0) {
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

const statisticsTemplate = (state, statistics) => {
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
        <td class="result__total">${statistics.normal * 100}</td>
      </tr>
      ${fastBonusTemplate(state)}
      ${livesBonusTemplate(state)}
      ${slowBonusTemplate(state)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${statistics.sum}</td>
      </tr>
    </table>
  `
}

const stats = () => {
  const elem = getElementFromTemplate(statisticsTemplate(gameState, countFinalStatistics(gameState)));
  initButtonBack(elem, greeting);
  return elem;
};

export default stats;

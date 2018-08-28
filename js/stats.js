import {getElementFromTemplate, initButtonBack} from './utils.js';
import greeting from './greeting.js';
import {headerTemplate} from './header.js';

const fastBonusTemplate = (statistics) => {
  let template;
  if (statistics.fast > 0) {
    template = `
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${statistics.fast}<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${statistics.fast * 50}</td>
    </tr>`;
  } else {
    return ``;
  }
  return template;
};

const slowBonusTemplate = (statistics) => {
  let template;
  if (statistics.slow > 0) {
    template = `
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${statistics.slow}<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">-${statistics.slow * 50}</td>
    </tr>`;
  } else {
    return ``;
  }
  return template;
};

const livesBonusTemplate = (statistics) => {
  let template;
  if (statistics.lives > 0) {
    template = `
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${statistics.lives}<span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${statistics.lives * 50}</td>
    </tr>`;
  } else {
    return ``;
  }
  return template;
};


const statisticsTemplate = (statistics) => {
  return `${headerTemplate}
  <section class="result">
    <h2 class="result__title">${statistics.result}</h2>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${statistics.resultLineTemplate}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${(statistics.normal + statistics.fast + statistics.slow) * 100}</td>
      </tr>
      ${fastBonusTemplate(statistics)}
      ${livesBonusTemplate(statistics)}
      ${slowBonusTemplate(statistics)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${statistics.sum}</td>
      </tr>
    </table>`;
};

const stats = (statistics) => {
  const elem = getElementFromTemplate(statisticsTemplate(statistics));
  initButtonBack(elem, greeting);
  return elem;
};

export default stats;

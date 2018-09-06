import StatsLineView from "./statsLine-view.js";
import AbstractView from "./abstract-view.js";

export default class StatsView extends AbstractView {
  constructor(statistics, state) {
    super();
    this.statistics = statistics;
    this.state = state;
  }

  get template() {
    return `<section class="result">
      <h2 class="result__title">${this.statistics.result}</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${new StatsLineView(this.state).template}
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total">${(this.statistics.normal + this.statistics.fast + this.statistics.slow) * 100}</td>
        </tr>
        ${this._fastBonusTemplate(this.statistics)}
        ${this._livesBonusTemplate(this.statistics)}
        ${this._slowBonusTemplate(this.statistics)}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${this.statistics.sum}</td>
        </tr>
      </table>`;
  }

  _fastBonusTemplate(statistics) {
    if (statistics.fast > 0) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${statistics.fast}<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${statistics.fast * 50}</td>
      </tr>`;
    }
    return ``;
  }

  _slowBonusTemplate(statistics) {
    if (statistics.slow > 0) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${statistics.slow}<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">-${statistics.slow * 50}</td>
      </tr>`;
    }
    return ``;
  }

  _livesBonusTemplate(statistics) {
    if (statistics.lives > 0) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${statistics.lives}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${statistics.lives * 50}</td>
      </tr>`;
    }
    return ``;
  }
}

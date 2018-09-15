import StatsLineView from "./statsLine-view.js";
import AbstractView from "./abstract-view.js";

export default class StatsView extends AbstractView {
  constructor(model) {
    super();
    this.state = model._state;
  }

  get template() {
    return `<section class="result">
      <h2 class="result__title">scores are loading...</h2>
    </section>`;
  }

  showResultsTable(score) {
    return `<section class="result">
      <h2 class="result__title">${this.state.result}</h2>
      <table class="result__table">
        ${score.map((it, i) => `
          <tr>
            <td class="result__number">${i}.${it.playerName}</td>
            <td colspan="2">
              ${new StatsLineView(it).template}
            </td>
            <td class="result__points">× 100</td>
            <td class="result__total">${it.total}</td>
          </tr>
          ${this._fastBonusTemplate(it.fast)}
          ${this._livesBonusTemplate(it.lives)}
          ${this._slowBonusTemplate(it.slow)}
          <tr>
            <td colspan="5" class="result__total  result__total--final">${it.sum}</td>
          </tr>`).join(``)}
        </table>
      </section>`;
  }

  _fastBonusTemplate(fast) {
    if (fast > 0) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fast}<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${fast * 50}</td>
      </tr>`;
    }
    return ``;
  }

  _slowBonusTemplate(slow) {
    if (slow > 0) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slow}<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">-${slow * 50}</td>
      </tr>`;
    }
    return ``;
  }

  _livesBonusTemplate(lives) {
    if (lives > 0) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lives}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${lives * 50}</td>
      </tr>`;
    }
    return ``;
  }
}

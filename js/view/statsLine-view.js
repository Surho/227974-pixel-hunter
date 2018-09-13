import AbstractView from "./abstract-view.js";

const QUESTIONS_NUMBER = 10;

export default class StatsLineView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    let stats = ``;
    this.state.answers.forEach((answer) => {
      if (answer.isCorrect === false) {
        stats += `<li class="stats__result stats__result--wrong"></li>\n`;
        return;
      }
      if (answer.time < 10) {
        stats += `<li class="stats__result stats__result--fast"></li>\n`;
        return;
      }
      if (answer.time > 20) {
        stats += `<li class="stats__result stats__result--slow"></li>\n`;
        return;
      }
      stats += `<li class="stats__result stats__result--correct"></li>\n`;
    });

    stats += `${new Array(QUESTIONS_NUMBER - this.state.answers.length).fill(`
    <li class="stats__result stats__result--unknown"></li>\n`).join(``)}`;

    return `<ul class="stats">
      ${stats}
      </ul>`;
  }
}


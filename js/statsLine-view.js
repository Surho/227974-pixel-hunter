import AbstractView from "./abstractView";

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
      if (answer.isCorrect === null) {
        stats += `<li class="stats__result stats__result--unknown"></li>\n`;
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
    return `<ul class="stats">
            ${stats}
           </ul>`;
  };
}


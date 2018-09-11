
import RulesView from '../view/rules-view.js';
import Application from '../Application.js';

export default class RulesScreen {
  constructor() {
    this.rules = new RulesView();
    let playerName = ``;

    this.rules.onNextClick = (evt) => {
      evt.preventDefault();
      Application.showGame(playerName);
    };

    this.rules.onKeyUp = (value, submitButton) => {
      submitButton.disabled = !value;
      playerName = value;
    };
  }

  get element() {
    return this.rules.element;
  }
}


import RulesView from '../view/rules-view.js';
import Application from '../Application.js';

export default class RulesScreen {
  constructor() {
    this.rules = new RulesView();

    this.rules.onNextClick = (playerName) => {
      Application.showGame(playerName);
    };

    this.rules.onKeyUp = (value, submitButton) => {
      submitButton.disabled = !value;
    };
  }

  get element() {
    return this.rules.element;
  }
}

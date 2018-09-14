import RulesView from '../view/rules-view.js';
import Application from '../application.js';
import GameModel from '../game-model.js';

export default class RulesScreen {
  constructor() {
    this.rules = new RulesView();

    this.rules.onNextClick = (evt, playerName) => {
      evt.preventDefault();
      const model = new GameModel(playerName);
      Application.showGame(model);
    };

    this.rules.onKeyUp = (value, submitButton) => {
      submitButton.disabled = !value;
    };
  }

  get element() {
    return this.rules.element;
  }
}

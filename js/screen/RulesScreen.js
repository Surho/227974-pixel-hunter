
import RulesView from '../view/rules-view.js';
import Application from '../Application.js';
import GameModel from '../gameModel.js'

export default class RulesScreen {
  constructor() {
    this.rules = new RulesView();

    this.rules.onNextClick = (evt ,playerName) => {
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

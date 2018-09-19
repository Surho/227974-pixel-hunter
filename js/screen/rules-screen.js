import RulesView from '../view/rules-view.js';
import Application from '../application.js';
import GameModel from '../game-model.js';

export default class RulesScreen {
  constructor() {
    this.view = new RulesView();

    this.view.onNextClick = (playerName) => {
      const model = new GameModel(playerName);
      Application.showGame(model);
    };

    this.view.onKeyUp = (value) => {
      return !value;
    };
  }

  get element() {
    return this.view.element;
  }
}

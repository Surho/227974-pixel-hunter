import {questions, gameState} from '../data/data.js';
import {screenChanger} from '../screen-changer.js';
import RulesView from '../view/rules-view.js';

export default class Rules {
  constructor() {
    this.rules = new RulesView();

    this.rules.onNextClick = () => {
      screenChanger(gameState, questions);
    };

    this.rules.onKeyUp = (value, submitButton) => {
      submitButton.disabled = !value;
    };
  }
}

export const rules = () => {
  return new Rules().rules.element;
};

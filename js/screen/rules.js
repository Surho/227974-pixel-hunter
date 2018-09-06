import {questions, gameState} from '../data/data.js';
import {screenChanger} from '../screen-changer.js';
import RulesView from '../view/rules-view.js';

export const rules = () => {
  const rulesView = new RulesView();

  rulesView.onNextClick = () => {
    screenChanger(gameState, questions);
  };

  rulesView.onKeyUp = (value, submitButton) => {
    submitButton.disabled = !value;
  };

  return rulesView.element;
};

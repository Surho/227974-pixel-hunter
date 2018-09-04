// import {getElementFromTemplate, initButtonBack} from './utils.js';
// import greeting from './greeting.js';
import {questions, gameState} from './data/data.js';
import {screenChanger} from './screen-changer.js';
import Header from './header.js';
import RulesView from './rules-view.js';
import GameScreen from './gameScreen.js';

export default class Rules {
  constructor() {
    this.rules = new RulesView()

    this.rules.onNextClick = () => {
      screenChanger(gameState, questions);
    }

    this.rules.onKeyUp = (evt, buttonNext) => {
      let target = evt.target;
      buttonNext.disabled = !target.value;
    }
  }
}


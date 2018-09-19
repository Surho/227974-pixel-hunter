import HeaderView from '../view/header-view.js';
import {gameStateReset} from '../utils.js';
import Application from '../application.js';

export default class Header {
  constructor(state, isGame, timer) {
    this.view = new HeaderView(state, isGame);

    this.view.onBackButtonClick = () => {
      if (timer) {
        timer.stopCount();
      }
      gameStateReset();
      Application.showGreeting();
    };
  }

  get element() {
    return this.view.element;
  }
}

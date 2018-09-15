import HeaderView from '../view/header-view.js';
import {gameStateReset} from '../utils.js';
import Application from '../application.js';

export default class Header {
  constructor(state, isGame) {
    this.header = new HeaderView(state, isGame);

    this.header.onBackButtonClick = () => {
      gameStateReset();
      Application.showGreeting();
    };
  }

  get element() {
    return this.header.element;
  }
}

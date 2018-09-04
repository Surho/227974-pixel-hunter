import HeaderView from './header-view.js';
import Greeting from './greeting.js';
import {gameStateReset, render} from './utils.js';

export default class Header {
  constructor(isGame, state) {
    this.header = new HeaderView(isGame, state);

    this.header.onBackButtonClick = () => {
      gameStateReset();
      render(new Greeting().greeting.element);
    };
  }
}



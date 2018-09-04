import HeaderView from './header-view.js';
import Greeting from './greeting.js';
import {gameStateReset} from './utils.js';

export default class Header {
  constructor(isGame, state) {
    this.header = new HeaderView(isGame, state);

    this.header.onBackButtonClick = () => {
      main.innerHTML = ``;
      gameStateReset();
      main.appendChild(new Greeting().greeting.element);
    }
  }
}



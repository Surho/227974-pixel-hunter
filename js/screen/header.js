import HeaderView from '../view/header-view.js';
import Greeting from './greeting.js';
import {gameStateReset, render} from '../utils.js';

export default class Header {
  constructor(isGame, state) {
    this.header = new HeaderView(isGame, state);

    this.header.onBackButtonClick = () => {
      gameStateReset();
      render(new Greeting().greeting.element);
    };
  }
}

export const header = (isGame, state) => {
  return new Header(isGame, state).header.element;
};



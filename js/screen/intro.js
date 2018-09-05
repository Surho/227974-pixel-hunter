import IntroView from '../view/intro-view.js';
import Greeting from './greeting.js';
import {render} from '../utils.js';

export default class Intro {
  constructor() {
    this.intro = new IntroView();

    this.intro.onNextClick = () => {
      const greeting = new Greeting().greeting.element;
      render(greeting);
    };
  }
}

export const intro = () => {
  return new Intro().intro.element;
};

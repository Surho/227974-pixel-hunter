import IntroView from './intro-view.js';
import Greeting from './greeting.js';

export default class Intro {
  constructor() {
    this.intro = new IntroView();

    this.intro.onNextClick = () => {
      const greeting = new Greeting().greeting.element;
      this.intro.show(greeting);
    }
  }
}







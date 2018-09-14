import IntroView from '../view/intro-view.js';
import Application from '../application.js';

export default class IntroScreen {
  constructor() {
    this.intro = new IntroView();

    this.intro.onNextClick = () => {
      Application.showGreeting();
    };
  }

  get element() {
    return this.intro.element;
  }
}

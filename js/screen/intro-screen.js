import IntroView from '../view/intro-view.js';
import Application from '../application.js';

export default class IntroScreen {
  constructor() {
    this.view = new IntroView();

    this.view.onNextClick = () => {
      Application.showGreeting();
    };
  }

  get element() {
    return this.view.element;
  }
}


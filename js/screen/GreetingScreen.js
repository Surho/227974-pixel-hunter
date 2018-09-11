import GreetingView from '../view/greeting-view.js';
import Application from '../Application.js';


export default class GreetingScreen {
  constructor() {
    this.greeting = new GreetingView();

    this.greeting.onNextClick = () => {
      Application.showRules();
    };
  }

  get element() {
    return this.greeting.element;
  }
};


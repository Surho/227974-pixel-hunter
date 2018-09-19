import GreetingView from '../view/greeting-view.js';
import Application from '../application.js';


export default class GreetingScreen {
  constructor() {
    this.view = new GreetingView();

    this.view.onNextClick = () => {
      Application.showRules();
    };
  }

  get element() {
    return this.view.element;
  }
}

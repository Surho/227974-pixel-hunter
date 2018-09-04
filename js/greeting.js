import GreetingView from './greeting-view.js';
import Rules from './rules.js';
import Header from './header.js';
import {gameState} from './data/data.js';


export default class Greeting {
  constructor() {
    this.greeting = new GreetingView();

    this.greeting.onNextClick = () => {
      const header = new Header(false, gameState).header.element;
      const rules = new Rules().rules.element;
      this.greeting.show(header,rules);
    }
  }
}


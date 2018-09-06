import GreetingView from '../view/greeting-view.js';
import {rules} from './rules.js';
import {header} from './header.js';
import {gameState} from '../data/data.js';
import {render} from '../utils.js';


export const greeting = () => {
  const greetingView = new GreetingView();

  greetingView.onNextClick = () => {
    render(header(false, gameState), rules());
  };

  return greetingView.element;
};


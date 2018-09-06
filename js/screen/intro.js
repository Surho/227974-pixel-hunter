import IntroView from '../view/intro-view.js';
import {greeting} from './greeting.js';
import {render} from '../utils.js';

export const intro = () => {
  const introView = new IntroView();

  introView.onNextClick = () => {
    render(greeting());
  };

  return introView.element;
};

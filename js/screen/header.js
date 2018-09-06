import HeaderView from '../view/header-view.js';
import {greeting} from './greeting.js';
import {gameStateReset, render} from '../utils.js';

export const header = (isGame, state) => {
  const headerView = new HeaderView(isGame, state);

  headerView.onBackButtonClick = () => {
    gameStateReset();
    render(greeting());
  };

  return headerView.element;
};



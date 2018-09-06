import StatsLineView from '../view/statsLine-view.js';

export const statsLine = (state) => {
  const statsLineView = new StatsLineView(state);
  return statsLineView.element;
};

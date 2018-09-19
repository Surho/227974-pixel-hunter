import StatsLineView from '../view/statsLine-view.js';

export const statsLine = (state) => {
  const view = new StatsLineView(state);
  return view.element;
};

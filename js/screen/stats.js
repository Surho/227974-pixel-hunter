import StatsView from "../view/stats-view.js";

export const stats = (statistics, state) => {
  const statsView = new StatsView(statistics, state);

  return statsView.element;
};

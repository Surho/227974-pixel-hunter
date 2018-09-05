import StatsView from "../view/stats-view.js";

export default class Stats {
  constructor(statistics, state) {
    this.stats = new StatsView(statistics, state);
  }
}

export const stats = (statistics, state) => {
  return new Stats(statistics, state).stats.element;
};

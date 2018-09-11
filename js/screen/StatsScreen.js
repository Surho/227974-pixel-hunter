import StatsView from "../view/stats-view.js";

export default class Stats {
  constructor(statistics, state){
    this.statsView = new StatsView(statistics, state);
  }

  get element() {
    return this.statsView.element;
  }

};

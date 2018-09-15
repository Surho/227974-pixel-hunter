import StatsView from "../view/stats-view.js";

export default class Stats {
  constructor(model) {
    this.statsView = new StatsView(model);
  }

  get element() {
    return this.statsView.element;
  }
}

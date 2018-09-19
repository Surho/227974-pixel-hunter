import StatsView from "../view/stats-view.js";

export default class Stats {
  constructor(model) {
    this.view = new StatsView(model);
  }

  get element() {
    return this.view.element;
  }
}

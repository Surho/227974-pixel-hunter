import StatsView from "./stats-view";

export default class Stats {
  constructor(statistics, state) {
    this.stats = new StatsView(statistics, state)
  }
}

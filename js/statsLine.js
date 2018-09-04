import StatsLineView from './statsLine-view.js';

export default class StatsLine {
  constructor(state) {
    this.statsLine = new StatsLineView(state);
  }
}

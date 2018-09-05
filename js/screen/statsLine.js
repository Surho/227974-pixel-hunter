import StatsLineView from '../view/statsLine-view.js';

export default class StatsLine {
  constructor(state) {
    this.statsLine = new StatsLineView(state);
  }
}

export const statsLine = (state) => {
  return new StatsLine(state).statsLine.element;
};

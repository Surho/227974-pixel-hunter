import ErrorView from "../view/error-view.js";

export default class ErrorScreen {
  constructor(error) {
    this.view = new ErrorView(error);
  }

  get element() {
    return this.view.element;
  }
}
